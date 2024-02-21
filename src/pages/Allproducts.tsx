import { useQuery, gql } from "urql";

/**
 * GraphQL query to fetch all products from the prodfeed.
 * @returns List of all products.
 */
const allProducts = gql`
  query {
    prodfeed {
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
                <div
                  key={prods.id}
                  className="m-2 overflow-hidden bg-white rounded-lg shadow basis-1/5"
                >
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
