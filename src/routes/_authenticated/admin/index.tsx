import { createFileRoute } from '@tanstack/react-router'
// import {setC} from "@tanstack/react-start-server"

export const Route = createFileRoute('/_authenticated/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/admin/"!</div>
}
