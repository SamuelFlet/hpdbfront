import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { FormEvent, useCallback, useState } from "react";
import { gql, useMutation } from "urql";

/**
 * GraphQL mutation to create a new product with the given name, category, and photo.
 * @param {string} name - The name of the product.
 * @param {string} category - The category of the product.
 * @param {File} photo - The photo file of the product.
 * @returns The ID, name, category, and photo of the newly created product.
 */
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

  /**
   * Submits the form data by executing a mutation with the provided name, category, and photo.
   * @returns None
   */
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
              /**
               * Event handler for the onChange event of an input element.
               * Sets the value of the "photo" state to the selected file from the input element.
               * @param {FormEvent} e - The event object.
               * @returns None
               */
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
