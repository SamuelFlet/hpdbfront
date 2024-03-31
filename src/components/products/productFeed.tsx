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
    <div>
      <div className="grid w-full lg:grid-cols-2 xl:grid-cols-3">
        {data.prodfeed.map((prods) => (
          <Link
            to={`../${prods.name}`}
            key={prods.id}
            state={{ prodid: prods.id }}
            className="m-2 mb-4 overflow-hidden h-96 w-96 hover:shadow-xl"
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
              <div className="p-6 font-semibold ">
                <span className="block text-base dark:text-white">{prods.name}</span>
                <span className="block text-sm dark:text-slate-300">{prods.category}</span>
                <div className="flex pt-2">
                  {/* @ts-expect-error Server Component */}
                  <Rating
                    emptySymbol="fa fa-star-o fa-2x dark:text-white"
                    fullSymbol="fa fa-star fa-2x dark:text-white"
                    initialRating={prods.rating[0].avg.slice(0, 4)}
                    readonly
                  />
                  <p className="pl-2 dark:text-slate-300">({prods.rating[0].avg.slice(0, 4)})</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
