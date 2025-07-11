import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
}
