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
  ) {
    newListing(
      cost: $cost
      title: $title
      description: $description
      file: $photo
      prodid: $prodid
    ) {
      cost
      id
      title
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

export default function Listform() {
  const [result] = useQuery({ query: allProducts });
  const [cost, setCost] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File>();
  const [prodid, setProdid] = useState("");
  const [state, executeMutation] = useMutation(newListing);

  const submit = useCallback(() => {
    executeMutation({ cost, title, description, photo, prodid });
  }, [executeMutation, cost, description, photo, prodid]);

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="grid grid-cols-1 gap-6">
      <h1>New Listing</h1>
      <label className="block">
        <span className="text-grey-700">Listing Title</span>
        <input
          className="block mt-1 text-black form-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blah Blah Blah"
        ></input>
      </label>
      <label className="block">
        <span className="text-grey-700">Listing Description</span>
        <input
          className="block mt-1 text-black form-input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Blah Blah Blah"
        ></input>
      </label>
      <label className="block">
        <span className="text-grey-700">Price</span>
        <input
          className="block mt-1 text-black form-input"
          type="number"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
          step={0.01}
        ></input>
      </label>
      <label className="block">
        <span className="text-grey-700">Product</span>
        <br></br>
        <select
          className="block mt-1 text-black form-input"
          value={prodid}
          onChange={(e) => setProdid(e.target.value)}
        >
          <option>List of Products</option>
          {data.prodfeed.map((prods) => (
            <option key={prods.id} value={prods.id}>
              {prods.name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="file" className="block">
        <span className="text-grey-700">Listing Image</span>
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
