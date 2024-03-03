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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [state, executeMutation] = useMutation(login);

  /**
   * Submits the email and password to execute a mutation and save the authentication data.
   * @returns None
   */
  const submit = useCallback(() => {
    executeMutation({ email, password }).then((res) => {
      try {
        saveAuthData(res.data.login);
        window.location.href = "/";
      } catch (error) {
        alert("No User Found");
      }
    });
  }, [executeMutation, email, password]);

  function signup(e) {
    e.preventDefault();
    window.location.href = "/signup";
  }

  return (
    <div>
      <h1>Login</h1>
      <div className="flex flex-wrap justify-center">
        <div className="grid grid-cols-1 gap-6">
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
            <button
              type="button"
              onClick={signup}
              className="p-1 mx-2 text-black bg-gray-100 border-transparent rounded-md"
              disabled={state.fetching}
            >
              Sign Up
            </button>
          </label>
        </div>
      </div>
    </div>
  );
}
