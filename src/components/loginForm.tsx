import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { gql, useMutation } from "urql";
import { useCallback, useState } from "react";
import { saveAuthData } from "../authStore";

/**
 * GraphQL mutation for logging in a user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Object} - The token generated upon successful login.
 */
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
