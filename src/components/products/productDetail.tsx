import { useLocation } from "react-router-dom";
import { gql, useQuery } from "urql";
/**
 * GraphQL query to fetch product details based on the provided ID.
 * @param {Int} $id - The ID of the product to fetch.
 * @returns The product details including category, ID, name, photo, and listings with cost, description, photo, and postedBy details.
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
    prodlistFeed(id: $id, orderBy: {cost: desc} ) {
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
  console.log(data)
  return (
    <div className="block">
      <div className="flex px-16 py-8 shadow-xl">
        <div className="w-full border-r-2 border-slate-300 shad">
          <img
            src={data.getProduct.photo}
            className="object-cover w-full"
            alt=""
          />
        </div>
        <div className="w-full text-center">
          <h2 className="w-full font-bold font-notnormal">
            {data.getProduct.name}
          </h2>
          <br></br>
          <span className="w-full">{data.getProduct.category}</span>
          <br></br>
        </div>
      </div>
      <br></br>

      <div className="px-16 py-8 my-16 shadow-xl">
         {result2.data?.prodlistFeed.map((list) => (
          <div key={list.id} className="flex m-2 border-2 border-slate-950">
            <div className="w-1/5 h-full">
              <img src={list.photo} className="object-cover w-full" alt="" />
            </div>
            <div className="pt-4 pl-8">
              <p>{list.title}</p>
              <p>{list.cost}</p>
              <p>{list.postedby.email}</p>
              <p>{list.postedby.name}</p>
            </div>
          </div>
        ))} 
      </div>
    </div>
  );
}
