import { Outlet } from "react-router-dom";

export default function Prodpage() {
  return (
      <div>
          <h1>List of posts go here!</h1>
          <Outlet />
      </div>
  )
}