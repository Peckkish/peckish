import AppHeader from "@/components/shared/AppHeader.tsx";
import { Outlet } from "react-router-dom";

interface LayoutProps {}

export default function Layout({}: LayoutProps) {
  return (
    <div className={"min-h-screen"}>
      <AppHeader />
      <Outlet />
    </div>
  );
}
