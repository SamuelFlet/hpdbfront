import { gql, useQuery } from 'urql';
import { Link } from 'react-router-dom';

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
      <h1 className="text-lg">All Products</h1>
      <div className="relative flex flex-col min-h-screen pb-12 overflow-hidden">
        <div className="min-h-28">
          <div>
            <div className="flex flex-wrap justify-center">
              {data.prodfeed.map((prods) => (
                <Link
                  to={ `../${prods.name}`}
                  key={prods.id}
                  state={{ prodid: prods.id }}
                  className="m-2 overflow-hidden hover:shadow-2xl bg-slate-100 basis-1/5"
                >
                  <div>
                    <img
                      src={prods.photo}
                      className="object-cover w-full h-52"
                      alt=""
                    />
                    <div className="p-6">
                      <span className="block text-base font-semibold text-slate-400">
                        {prods.name}
                      </span>
                      <span className="block text-sm font-semibold text-slate-600">
                        {prods.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
