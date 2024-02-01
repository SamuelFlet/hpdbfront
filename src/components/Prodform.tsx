import { FormEvent, useCallback, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { gql, useMutation } from 'urql';


/* The `const newProduct` is a GraphQL mutation query. It defines a mutation operation called `newProd`
that takes three variables: `name` of type `String!`, `category` of type `String!`, and `photo` of
type `File!`. */
const newProduct = gql`
  mutation ($name: String!, $category: String!, $photo: File!) {
    newProd(name: $name, category: $category, file: $photo) {
      id
      name
      category
      photo
    }
  }
`;

export default function Prodform() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState<File>();
  const [state, executeMutation] = useMutation(newProduct);

  const submit = useCallback(() => {
    executeMutation({ name, category, photo });
  }, [executeMutation, name, category, photo]);

  return (
    <div>
      <div className="mx-auto">
        <Form>
          <Form.Group className="mb-3" controlId="productForm.controlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="BLON BL-03"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productForm.controlInput1">
            <Form.Label>Category</Form.Label>
            <Form.Control
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              placeholder="IEM"
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
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
