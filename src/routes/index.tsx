import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});


function RouteComponent() {
  return <Link to="/auth">auth sini bang</Link>;
}
