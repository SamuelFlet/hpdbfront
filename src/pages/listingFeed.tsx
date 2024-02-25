import { useQuery, gql } from "urql";

/**
 * GraphQL query to fetch feed data including cost, description, photo, title, and information about the user who posted it.
 * @returns GraphQL query string
 */
const listingfeed = gql`
  query {
    feed {
      id
      cost
      description
      photo
      title
      product {
        name
      }
      postedBy {
        name
        email
      }
    }
  }
`;

export default function Listingfeed() {
  const [result] = useQuery({ query: listingfeed });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no...{error.message}</p>;

  return (
    <div>
      <h1 className="text-lg">All Listings</h1>
      <div className="relative flex flex-col min-h-screen pb-12 overflow-hidden">
        <div className="min-h-28">
          <div>
            <div className="flex flex-wrap justify-center">
              {data.feed.map((listings) => (
                <div
                  key={listings.id}
                  className="m-2 overflow-hidden bg-white rounded-lg shadow basis-1/5"
                >
                  <img
                    src={listings.photo}
                    className="object-cover w-full h-52"
                    alt=""
                  />
                  <div className="p-6">
                    <span className="block text-base font-semibold text-slate-400">
                      {listings.title}
                    </span>
                    <span className="block text-sm font-semibold text-slate-600">
                      {listings.product.name}
                    </span>
                    <span className="block text-sm font-semibold text-slate-600">
                      {listings.cost}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
