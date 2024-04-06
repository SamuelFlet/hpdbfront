import { useLocation } from "react-router-dom";
import { gql, useQuery } from "urql";

/**
 * GraphQL query to fetch details of a listing based on the provided ID.
 * @param {Int} $id - The ID of the listing to fetch details for.
 * @returns The title, description, cost, photo, product name, and name of the user who posted the listing.
 */
const listDetail = gql`
  query ($id: Int!) {
    getListing(id: $id) {
      title
      description
      cost
      photo
      product {
        name
      }
      postedby {
        name
        email
      }
    }
  }
`;

export default function ListingDetail() {
  const { state } = useLocation();

  const id = parseInt(state.listingid!);
  console.log(id);
  const [result] = useQuery({
    query: listDetail,
    variables: { id },
  });
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  var myLink = document.getElementById("yourLinkId");
  var test = data.getListing.postedby.email;
  myLink?.setAttribute("href", "mailto:" + test);
  return (
    <>
      <div className="justify-center p-8 md:flex">
        <img src={data.getListing.photo} className="md:w-1/3" alt="" />

        <div className="flex pt-4 dark:text-white md:pl-4">
          <div className="w-full">
            <h2 className="text-2xl font-bold underline font-notnormal">
              {data.getListing.title}
            </h2>
            <span className="">{data.getListing.description}</span>
            <p className="text-sm">{data.getListing.product.name}</p>
            <p className="mt-8 text-xl">${data.getListing.cost}</p>
            <p className="mt-8 text-md">
              Email the Seller: {data.getListing.postedby.name}
            </p>
            <a
              className="inline-flex items-center px-4 py-3 mt-4 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              id="yourLinkId"
            >
              SEND EMAIL
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
