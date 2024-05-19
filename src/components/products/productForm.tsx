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
    <div className="flex flex-col pt-8 pl-16">
      <h1 className="mb-4 text-2xl dark:text-white">Create New Listing</h1>
      <div className="w-3/4 md:w-1/2">
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium dark:text-white"
            htmlFor="input-label-with-helper-text"
          >
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="input-label-with-helper-text"
            className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="Example Name"
            aria-describedby="hs-input-helper-text"
          />
          <p className="mt-2 text-sm text-gray-500" id="hs-input-helper-text">
            This is the name of the product
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="textarea-label"
            className="block mb-2 text-sm font-medium dark:text-white"
          >
            Product Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="input-label-with-helper-text"
            className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="IEM/TWS"
            aria-describedby="hs-input-helper-text"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="file"
            className="block mb-2 text-sm font-medium dark:text-white"
          >
            Photo of Product
          </label>
          <input
            className="block w-full px-4 py-3 text-sm border-gray-200 shadow-sm pe-11 rounded-e-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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
        </div>
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
    </div>
  );
}
