import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { gql, useMutation } from "urql";
import { useCallback, useState } from "react";
import { saveAuthData } from "../authStore";
/*/* The `const signup` is a GraphQL mutation query that defines a mutation operation called `signup`.
This mutation takes two variables, `email` and `password`, both of type `String!` (non-null string).
The mutation is used to sign up a user by providing their email and password, and it returns a token
as a response. 
const signup = gql`
  mutation ($email: String!, $password: String!) {
    signup(email: "", password: "") {
      token
    }
  }
`;*/

/* The `const login` is a GraphQL mutation query that defines a mutation operation called `login`. This
mutation takes two variables, `email` and `password`, both of type `String!` (non-null string). */
const login = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [state, executeMutation] = useMutation(login);

  const submit = useCallback(() => {

    executeMutation({ email, password }).then(res =>{
      console.log(res.data?.login?.token)
    });
  }, [executeMutation, email, password]);

  return (
    <div>
      <div className="mx-auto">
        <Form>
          <Form.Group className="mb-3" controlId="productForm.controlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productForm.controlInput1">
            <Form.Label>password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPass(e.target.value)}
              type="text"
            />
          </Form.Group>
          <Button disabled={state.fetching} onClick={submit} type="submit">
            Submit form
          </Button>
        </Form>
      </div>
    </div>
  );
}
