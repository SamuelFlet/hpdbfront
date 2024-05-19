import { FormEvent, useCallback, useState } from "react";
import { gql, useMutation, useQuery } from "urql";

/**
 * GraphQL mutation for creating a new listing with the specified parameters.
 * @param {Float} $cost - The cost of the listing.
 * @param {String} $title - The title of the listing.
 * @param {String} $description - The description of the listing.
 * @param {File} $photo - The photo file of the listing.
 * @param {ID} $prodid - The product ID associated with the listing.
 * @returns The newly created listing object with its details.
 */
const newListing = gql`
  mutation (
    $cost: Float!
    $title: String!
    $description: String!
    $photo: File!
    $prodid: ID!
    $condition: String!
  ) {
    newListing(
      cost: $cost
      title: $title
      description: $description
      condition: $condition
      file: $photo
      prodid: $prodid
    ) {
      cost
      id
      title
      description
      photo
      condition
      product {
        category
        name
      }
      postedby {
        email
        name
      }
    }
  }
`;

/**
 * GraphQL query to fetch all products from the prodfeed.
 * @returns List of all products.
 */
const allProducts = gql`
  query {
    prodfeed {
      id
      name
    }
  }
`;

const conditions = ["like new", "good", "meh", "for parts"];

export default function Listform() {
  const [result] = useQuery({ query: allProducts });
  const [cost, setCost] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File>();
  const [condition, setCondition] = useState("");
  const [prodid, setProdid] = useState("");
  const [state, executeMutation] = useMutation(newListing);

  const submit = useCallback(() => {
    executeMutation({ cost, title, description, condition, photo, prodid });
  }, [executeMutation, cost, description, condition, photo, prodid]);

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="flex flex-col pt-8 pl-16">
      <h1 className="mb-4 text-2xl dark:text-white">Create New Listing</h1>
      <div className="w-3/4 md:w-1/2">
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium dark:text-white"
            htmlFor="input-label-with-helper-text"
          >
            Listing Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="input-label-with-helper-text"
            className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="Example Title"
            aria-describedby="hs-input-helper-text"
          />
          <p className="mt-2 text-sm text-gray-500" id="hs-input-helper-text">
            This is the title for your listing
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="textarea-label"
            className="block mb-2 text-sm font-medium dark:text-white"
          >
            Listing Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="textarea-label"
            className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            rows={3}
            placeholder="Example description..."
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="product-label"
            className="block mb-2 text-sm font-medium dark:text-white"
          >
            Product
          </label>
          <select
            value={prodid}
            onChange={(e) => setProdid(e.target.value)}
            name="product"
            className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            id="product-label"
          >
            {data.prodfeed.map((prods) => (
              <option key={prods.id} value={prods.id}>
                {prods.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="condition-label"
            className="block mb-2 text-sm font-medium dark:text-white"
          >
            Condition
          </label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            name="condition"
            className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            id="condition-label"
          >
            {conditions.map((cons) => (
              <option key={cons} value={cons}>
                {cons}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="cost-label"
            className="block mb-2 text-sm font-medium dark:text-white"
          >
            Listing Cost
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-4 text-sm text-gray-500 border border-gray-200 min-w-fit rounded-s-md border-e-0 bg-gray-50 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
              CAD$
            </span>
            <input
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              type="number"
              id="cost-label"
              className="block w-full px-4 py-3 text-sm border-gray-200 shadow-sm pe-11 rounded-e-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            />
          </div>
        </div>
        <div className="mb-4">
        <label
            htmlFor="file"
            className="block mb-2 text-sm font-medium dark:text-white"
          >
            Add a photo to your listing
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
``;
