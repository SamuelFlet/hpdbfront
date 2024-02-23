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
    if (!(document.getElementById("file") as HTMLInputElement).value) {
      alert("No Image Selected");
      return;
    }
    executeMutation({ name, category, photo });
  }, [executeMutation, name, category, photo]);

  return (
    <div className="grid grid-cols-1 gap-6">
      <h1>New Product</h1>
      <label className="block">
        <span className="text-grey-700">Product Name</span>
        <input
          className="block mt-1 text-black form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="BLON BL-03"
        ></input>
      </label>
      <label className="block">
        <span className="text-grey-700">Category</span>
        <input
          className="block mt-1 text-black form-input"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="IEM"
        ></input>
      </label>
      <label htmlFor="file" className="block">
        <span className="text-grey-700">Product Image</span>
        <input
          className="block mt-1 text-black form-input"
          type="file"
          name="photo"
          accept="image/png, image/jpeg, image/jpg"
          id="file"
          onChange={(e: FormEvent) => {
            const files = (e.target as HTMLInputElement).files;
            if (files && files.length > 0) {
              setPhoto(files[0]);
            }
          }}
        ></input>
      </label>
      <label className="block">
        <button
          type="submit"
          onClick={submit}
          className="p-1 text-black bg-gray-100 border-transparent rounded-md"
          disabled={state.fetching}
        >
          Submit
        </button>
      </label>
    </div>
  );
}
