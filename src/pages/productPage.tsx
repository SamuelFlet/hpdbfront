import { Outlet } from "react-router-dom";

export default function Prodpage() {
  return (
    <div>
      <div className="flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}
