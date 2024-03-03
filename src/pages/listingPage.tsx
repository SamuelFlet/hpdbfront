import { Outlet } from "react-router-dom";

export default function Listpage() {
  return (
    <div>
      <div className="flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}