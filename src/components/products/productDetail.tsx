import { useLocation } from "react-router-dom";
import { gql, useQuery } from "urql";
import Rating from "react-rating";
import { Link } from "react-router-dom";
/**
 * GraphQL query to fetch product details and average rating based on the product ID.
 * @param {Int} $id - The ID of the product to fetch details for.
 * @returns The product's category, ID, name, photo, and average rating.
 */
const prodDetail = gql`
  query ($id: Int!) {
    getProduct(id: $id) {
      category
      id
      name
      photo
    }
    avg(id: $id)
  }
`;

const getListings = gql`
  query ($id: Int!) {
    prodlistFeed(id: $id, orderBy: { cost: desc }) {
      id
      title
      description
      cost
      photo
      postedby {
        name
      }
    }
  }
`;

export default function ProdDetail() {
  const { state } = useLocation();

  const id = parseInt(state.prodid!);

  const [result] = useQuery({
    query: prodDetail,
    variables: { id },
  });

  const [result2] = useQuery({
    query: getListings,
    variables: { id },
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <div className="justify-center p-8 md:flex">
        <div className="md:w-[70%] lg:w-[40%]">
          <img
            src={data.getProduct.photo}
            className="object-cover w-full"
            alt=""
          />
        </div>
        <div className="flex pt-4 dark:text-white md:pl-4">
          <div className="w-full">
            <h2 className="font-bold font-notnormal">{data.getProduct.name}</h2>
            <span className="">{data.getProduct.category}</span>
            <div className="flex w-full mt-8">
              <div>
                <div className="flex">
                  {/* @ts-expect-error Server Component */}
                  <Rating
                    emptySymbol="fa fa-star-o fa-2x dark:text-white"
                    fullSymbol="fa fa-star fa-2x dark:text-white"
                    initialRating={data.avg._avg.rating.toFixed(2)}
                    readonly
                  />
                  <p className="pl-2 dark:text-slate-300">
                    ({data.avg._avg.rating.toFixed(2)})
                  </p>
                </div>
                <p>based on {data.avg._count.rating} reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <div className="mb-4 md:text-center">
          <span className="font-bold dark:text-white">
            View all Listings for {data.getProduct.name}
          </span>
        </div>
        <div className="flex flex-col items-center">
          {result2.data?.prodlistFeed.map((prods) => (
            <div className="flex flex-col my-2 border border-black dark:border-white md:flex-row 2 md:max-w-lg rounded-xl">
              <img src={prods.photo} className="max-w-xs rounded-l-xl" />
              <div className="max-w-sm p-4 dark:text-white">
                <p className="text-xl font-bold underline">{prods.title}</p>
                <p className="text-lg">{prods.description}</p>
                <p className="mt-2 font-bold underline">{prods.cost}</p>
                <Link
                  to={`/listings/${prods.id}`}
                  key={prods.id}
                  state={{ listingid: prods.id }}
                  className="inline-flex items-center px-4 py-3 mt-4 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => {
                    window.scroll(0, 0);
                  }}
                >
                  VIEW FULL LISTING
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
