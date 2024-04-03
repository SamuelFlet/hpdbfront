import { useLocation } from "react-router-dom";
import { gql, useQuery } from "urql";
import Rating from "react-rating";

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

/*const getListings = gql`
  query ($id: Int!) {
    prodlistFeed(id: $id, orderBy: { cost: desc }) {
      cost
      description
      title
      photo
      id
      postedby {
        name
      }
      product {
        name
        category
        id
      }
    }
  }
`;*/

export default function ProdDetail() {
  const { state } = useLocation();

  const id = parseInt(state.prodid!);

  const [result] = useQuery({
    query: prodDetail,
    variables: { id },
  });

  /* const [result2] = useQuery({
     query: getListings,
     variables: { id },
   });*/

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  console.log(data.avg);
  return (
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
  );
}
