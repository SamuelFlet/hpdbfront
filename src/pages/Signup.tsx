import { gql, useMutation } from "urql";
import { useCallback, useState } from "react";
import { saveAuthData } from "../authStore";

/**
 * GraphQL mutation for signing up a user with the provided email, name, and password.
 * @param {string} $email - The email of the user signing up.
 * @param {string} $name - The name of the user signing up.
 * @param {string} $password - The password of the user signing up.
 * @returns The token received after successful signup.
 */
const signup = gql`
  mutation ($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      token
    }
  }
`;

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPass] = useState("");
  const [state, executeMutation] = useMutation(signup);

  /**
   * Submits the email and password to execute a mutation and save the authentication data.
   * @returns None
   */
  const submit = useCallback(() => {
    executeMutation({ email, name, password }).then((res) => {
      try {
        saveAuthData(res.data.signup);
      } catch (error) {
        alert("No User Found");
      }
    });
  }, [executeMutation, email, name, password]);

  return (
    <div className="grid grid-cols-1 gap-6">
      <h1>Signup</h1>
      <label className="block">
        <span className="text-grey-700">Name</span>
        <input
          className="block mt-1 text-black form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </label>
      <label className="block">
        <span className="text-grey-700">Email</span>
        <input
          className="block mt-1 text-black form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </label>
      <label className="block">
        <span className="text-grey-700">Password</span>
        <input
          className="block mt-1 text-black form-input"
          type="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
        ></input>
      </label>
      <label className="block">
        <button
          type="submit"
          onClick={submit}
          className="p-1 text-black bg-gray-100 border-transparent rounded-md"
          disabled={state.fetching}
        >
          Submit
        </button>
      </label>
    </div>
  );
}
