import { FormEvent, useCallback, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { gql, useMutation, useQuery } from 'urql';

const newListing = gql`
  mutation ($cost: Float!, $description: String!, $photo: File!, $prodid: ID!) {
    newListing(cost: $cost, description: $description, file: $photo, prodid: $prodid) {
      cost
      id
      description
      photo
      product {
        category
        name
      }
      postedBy {
        email
        name
      }
    }
  }
`;

const allProducts = gql`
  query {
    prodfeed {
      id
      name
    }
  }
`;

export default function Listform() {
  const [result, reexecuteQuery] = useQuery({ query: allProducts });
  const [cost, setCost] = useState(0);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File>();
  const [prodid, setProdid] = useState("");
  const [state, executeMutation] = useMutation(newListing);

  const submit = useCallback(() => {
    executeMutation({ cost, description, photo, prodid });
  }, [executeMutation, cost, description, photo, prodid]);

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <div className="mx-auto">
        <Form>
          <Form.Group className="mb-3" controlId="productForm.controlInput1">
            <Form.Label>Cost</Form.Label>
            <Form.Control
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              type="number"
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productForm.controlInput1">
            <Form.Label>description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="IEM"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product</Form.Label>
            <Form.Select
              value={prodid}
              onChange={(e) => setProdid(e.target.value)}
            >
              <option>List of Products</option>
              {data.prodfeed.map((prods) => (
                <option key={prods.id} value={prods.id}>
                  {prods.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Photo</Form.Label>
            <Form.Control
              type="file"
              onChange={(e: FormEvent) => {
                const files = (e.target as HTMLInputElement).files;
                if (files) setPhoto(files[0]);
                else return;
              }}
            />
          </Form.Group>
          <Button disabled={state.fetching} onClick={submit} type="submit">
            Submit form
          </Button>
        </Form>
      </div>
    </div>
  );
}
