import { createFileRoute } from "@tanstack/react-router";
import {
  LoginForm,
  AuthHero,
  Stepper,
  Navbar,
  FooterStat,
} from "#/features/auth";

export const Route = createFileRoute("/auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="min-h-dvh flex flex-col md:flex-row h-full">
      {/*<div
      className={`px-4 md:px-0 order-last md:order-first flex items-center justify-center relative overflow-hidden bg-background transition-all duration-500 ease-in-out ${
        isOpen ? "w-full md:w-full flex-1" : "w-full md:w-1/2"
      }`}
    >
      <div className="w-full max-w-sm flex flex-col justify-center">
        <Stepper />
        <LoginForm />
      </div>
    </div>*/}

      {/*<div
      className={`px-0 order-last md:order-first flex flex-col items-center relative overflow-hidden bg-background transition-all duration-500 ease-in-out ${
        isOpen ? "w-full md:w-full flex-1" : "w-full md:w-1/2"
      }`}
    >*/}
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

      {/*<div
      className={`relative order-first md:order-last overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen
          ? "max-h-0 w-0 md:w-0 mb-0 opacity-0"
          : "max-h-150 md:max-h-full w-full md:w-1/2 opacity-100"
      }`}
    >*/}
      <div
        className={
          "relative order-first md:order-last overflow-hidden transition-all duration-500 ease-in-out max-h-150 md:max-h-full w-full md:w-1/2 opacity-100"
        }
      >
        {/*<button
        onClick={() => setIsOpen((prev) => !prev)}
        className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 z-100 cursor-pointer rounded-full bg-background border border-border p-0.5 text-muted-foreground hover:text-primary transition-colors duration-200"
        aria-label={isOpen ? "Tampilkan hero" : "Sembunyikan hero"}
      >
        <ChevronDown
          className={`md:hidden size-5 transition-transform duration-500 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>*/}
        <AuthHero />
      </div>
    </main>
  );
}
