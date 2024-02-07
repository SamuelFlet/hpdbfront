import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { gql, useMutation } from "urql";
import { saveAuthData } from "../authStore";
import { useCallback, useState } from "react";

/**
 * GraphQL mutation for user signup.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns The token generated upon successful signup.
 */
const signup = gql`
  mutation ($email: String!, $password: String!) {
    signup(email: "", password: "") {
      token
    }
  }
`;

export default function Signupform() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [state, executeMutation] = useMutation(signup);

  /**
   * Submits the email and password to execute a mutation and saves the authentication data.
   * @returns None
   */
  const submit = useCallback(() => {
    executeMutation({ email, password }).then((res) => {
      saveAuthData(res.data.login);
    });
  }, [executeMutation, email, password]);

  return (
    <div className="mx-auto">
      <h2>Signup</h2>
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
  );
}
