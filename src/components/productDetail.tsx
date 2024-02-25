import { useLocation } from "react-router-dom";
import { gql, useQuery } from "urql";

const prodDetail = gql`
  query ($id: Int!) {
    getProduct(id: $id) {
      category
      id
      name
    }
  }
`;

export default function ProdDetail() {
  const { state } = useLocation();

  const id = parseInt(state.prodid!)
  const [result] = useQuery({
    query: prodDetail,
    variables: { id },
  });
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <>
      <h2>{data.getProduct.name}</h2>
    </>
  );
}
