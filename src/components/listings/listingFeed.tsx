import { useQuery, gql } from "urql";
import { Link } from "react-router-dom";


/**
 * GraphQL query to fetch a feed listing with specific fields.
 * Fields returned include id, cost, description, photo, title, condition,
 * product name, and posted by user's name and email.
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
    <div className="grid w-full lg:grid-cols-2 xl:grid-cols-3">
      {data.feed.map((lists) => (
        <Link
          to={`../${lists.id}`}
          key={lists.id}
          state={{ listingid: lists.id }}
          className="m-2 overflow-hidden images hover:shadow-xl"
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
            <div className="p-6 font-semibold ">
              <span className="block text-base dark:text-white">{lists.title}</span>
              <span className="block text-sm dark:text-slate-300">{lists.description}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
  );
}
