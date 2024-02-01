import { useCallback, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { gql, useMutation } from 'urql';

const signup = gql`
  mutation ($email: String!, $password: String!) {
    signup(email: "", password: "") {
      token
    }
  }
`;

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
