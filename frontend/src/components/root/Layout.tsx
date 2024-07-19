import AppHeader from "@/components/shared/AppHeader.tsx";
import { Outlet } from "react-router-dom";
import AppFooter from "@/components/shared/AppFooter.tsx";

interface LayoutProps {}

export default function Layout({}: LayoutProps) {
  return (
    <div className={"min-h-screen"}>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </div>
  );
}
