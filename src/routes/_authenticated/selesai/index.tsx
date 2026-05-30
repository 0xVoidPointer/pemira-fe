import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/selesai/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_authenticated/selesai/"!</div>;
}
