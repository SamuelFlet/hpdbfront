import { useCallback, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { gql, useMutation } from "urql";

/* The `const signup` is a GraphQL mutation query that defines a mutation operation called `signup`.
This mutation takes two variables, `email` and `password`, both of type `String!` (non-null string).
The mutation is used to sign up a user by providing their email and password, and it returns a token
as a response. */
const signup = gql`
  mutation ($email: String!, $password: String!) {
    signup(email: "", password: "") {
      token
    }
  }
`;


/* The `const login` is a GraphQL mutation query that defines a mutation operation called `login`. This
mutation takes two variables, `email` and `password`, both of type `String!` (non-null string). */
const login = gql`
  mutation ($email: String!, $password: String!) {
    login(email: "", password: "") {
      token
    }
  }
`;

export default function loginForm() {
  return (
    <div>
      <p>Test</p>
    </div>
  );
}
