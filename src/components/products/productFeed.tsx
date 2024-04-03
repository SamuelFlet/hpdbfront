import { gql, useQuery } from "urql";
import { Link } from "react-router-dom";
import Rating from "react-rating";

/**
 * GraphQL query to fetch all products from the prodfeed.
 * @returns List of all products.
 */
const allProducts = gql`
  query {
    prodfeed {
      id
      name
      category
      rating
      photo
    }
  }
`;

export default function Allproducts() {
  const [result] = useQuery({ query: allProducts });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="flex items-center justify-center">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3">
        {data.prodfeed.map((prods) => (
          <Link
            to={`../${prods.name}`}
            key={prods.id}
            state={{ prodid: prods.id }}
            className="p-1 m-2 mb-4 overflow-hidden w-96 hover:shadow-lg"
            onClick={() => {
              window.scroll(0, 0);
            }}
          >
            <div>
              <img
                src={prods.photo}
                className="object-contain w-full h-52"
                alt=""
              />
              <div className="px-6 py-4 font-semibold ">
                <span className="block text-base dark:text-white">
                  {prods.name}
                </span>
                <span className="block text-sm dark:text-slate-400">
                  {prods.category}
                </span>
                <div className="flex pt-2">
                  {/* @ts-expect-error Server Component */}
                  <Rating
                    emptySymbol="fa fa-star-o fa-2x dark:text-white"
                    fullSymbol="fa fa-star fa-2x dark:text-white"
                    initialRating={parseInt(prods.rating[0].avg)}
                    readonly
                  />
                  <p className="pl-2 dark:text-slate-300">
                    ({parseFloat(prods.rating[0].avg).toFixed(2)})
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
