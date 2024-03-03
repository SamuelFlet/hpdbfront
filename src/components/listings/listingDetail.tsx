import { useLocation } from "react-router-dom";
import { gql, useQuery } from "urql";

const listDetail = gql`
  query ($id: Int!) {
    getListing(id: $id) {
      title
      description
      cost
      photo
      product {
        name
      }
      postedBy {
        name
      }
    }
  }
`;

export default function ListingDetail() {
  const { state } = useLocation();

  const id = parseInt(state.listingid!);
  console.log(id);
  const [result] = useQuery({
    query: listDetail,
    variables: { id },
  });
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <>
      <h2>{data.getListing.title}</h2>
      <h2>{data.getListing.description}</h2>
      <h2>{data.getListing.product.name}</h2>
    </>
  );
}
