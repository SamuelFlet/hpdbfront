import { useQuery, gql } from "urql";
import { Link } from "react-router-dom";
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
      condition
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

export default function Listingfeed() {
  const [result] = useQuery({ query: listingfeed });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no...{error.message}</p>;

  return (
    <div>
      <h1 className="text-lg">All Listings</h1>

      <div className="grid w-full grid-cols-1 grid-flow-cols-dense md:grid-cols-2 xl:grid-cols-3">
        {data.feed.map((listings) => (
          <Link
            to={`../${listings.id}-${listings.title}`}
            key={listings.id}
            state={{ listingid: listings.id }}
            className="m-2 overflow-hidden w-96 hover:shadow-2xl bg-slate-100 "
          >
            <div>
              <img
                src={listings.photo}
                className="object-cover w-full h-full"
                alt=""
              />
              <div className="p-6">
                <span className="block text-base font-semibold text-slate-400">
                  {listings.title}
                </span>
                <span className="block text-sm font-semibold text-slate-600">
                  {listings.description}
                </span>
                <span className="block text-sm font-semibold text-slate-600">
                  {listings.condition}
                </span>
                <span className="block text-sm font-semibold text-slate-600">
                  {listings.cost}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
