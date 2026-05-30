import {
  createFileRoute,
  isRedirect,
  redirect,
} from "@tanstack/react-router";
import { LoginForm, AuthHero, FooterStat } from "#/features/auth";
import { Stepper } from "#/components/ui/stepper";
import { Navbar } from "#/components/ui/navbar";
import { authKeys } from "#/features/auth/api/keys";
import z from "zod";

const authSearchSchema = z.object({
  loginAs: z.enum(["mahasiswa", "panitia"]).catch("mahasiswa"),
});

export const Route = createFileRoute("/_guest/auth")({
  component: RouteComponent,
  validateSearch: authSearchSchema,
  loader: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData({
        ...authKeys.session,
        staleTime: Infinity,
      });
      throw redirect({
        to: "/",
        search: { steps: 2, visiMisi: "DPM" },
      });
    } catch (err) {
      if (isRedirect(err)) throw err;
    }
  },
});

function RouteComponent() {
  return (
    <main className="min-h-dvh flex flex-col md:flex-row h-full">
      <div
        className={
          "px-0 order-last md:order-first flex flex-col items-center relative overflow-hidden bg-background transition-all duration-500 ease-in-out w-full md:w-full flex-1"
        }
      >
        <Navbar />
        <div className="w-full h-full flex-1 flex flex-col justify-between py-12 md:px-12 px-8">
          <Stepper />
          <LoginForm />
          <FooterStat />
        </div>
      </div>
      <div
        className={
          "relative order-first md:order-last overflow-hidden transition-all duration-500 ease-in-out max-h-150 md:max-h-full w-full md:w-1/2 opacity-100"
        }
      >
        <AuthHero />
      </div>
    </main>
  );
}
