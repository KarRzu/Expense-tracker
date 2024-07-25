import { Link } from "react-router-dom";

export function ExpensesPage() {
  return (
    <div className="flex flex-col gap-2">
      ExpensesPage
      <Link to="/">Home</Link>
    </div>
  );
}
