import { ROUTES } from "@/router/routes";
import { Link } from "react-router-dom";

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-2">
      DashboardPage
      <Link to={ROUTES.auth}>Go to auth </Link>
      <Link to={ROUTES.expenses}>Go to expenses </Link>
      <Link to={ROUTES.settings}>Go to settings </Link>
      <Link to={ROUTES.raports}>Go to raports </Link>
    </div>
  );
}
