import { useQuery, gql } from "urql";
import { Link } from "react-router-dom";

/**
 * GraphQL query to fetch a feed listing with specific fields.
 * Fields returned include id, cost, description, photo, title, condition,
 * product name, and user's name and email.
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
    <div className="flex items-center justify-center">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3">
        {data.feed.map((lists) => (
          <Link
            to={`../${lists.id}`}
            key={lists.id}
            state={{ listingid: lists.id }}
            className="p-1 m-2 mb-4 overflow-hidden hover:shadow-lg"
            onClick={() => {
              window.scroll(0, 0);
            }}
          >
            <div>
              <img
                src={lists.photo}
                className="object-contain w-full h-48"
                alt=""
              />
              <div className="px-6 py-4 font-semibold ">
                <span className="block text-base dark:text-white">
                  {lists.title}
                </span>
                <span className="block text-sm dark:text-slate-300">
                  {lists.description}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
