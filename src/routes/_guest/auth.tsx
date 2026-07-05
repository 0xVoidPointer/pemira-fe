import { createFileRoute, isRedirect, redirect } from "@tanstack/react-router";
import { Navbar } from "#/components/ui/navbar";
import { Stepper } from "#/components/ui/stepper";
import { AuthHero, LoginForm } from "#/features/auth";
import { authKeys } from "#/services/auth/keys";

export const Route = createFileRoute("/_guest/auth")({
	component: RouteComponent,
	loader: async ({ context }) => {
		try {
			await context.queryClient.ensureQueryData({
				...authKeys.session,
				staleTime: Infinity,
				retry: false,
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
		<main className="min-h-dvh flex flex-col md:flex-row h-full animate-fade animate-once animate-ease-in-out animate-normal animate-fill-forwards motion-reduce:animate-none">
			<div
				className={
					"px-0 order-last md:order-first flex flex-col items-center relative overflow-hidden bg-background transition-all duration-500 ease-in-out w-full md:w-full flex-1"
				}
			>
				<Navbar />
				<div className="w-full h-full flex-1 flex flex-col justify-between py-12 md:px-12 px-8">
					<Stepper />
					<LoginForm />
					<div className="flex items-center gap-4 rounded-xl border border-primary/10 bg-primary/4 p-5 mt-8 md:mt-0">
						<div className="bg-primary w-[1%] rounded-full self-stretch" />
						<div className="flex flex-col gap-2 flex-1">
							<p className="text-[15px] font-medium leading-relaxed text-foreground/80 md:text-base text-justify">
								Ayo kita sukseskan Pemilihan Umum Raya UDINUS dengan menggunakan
								hak suara anda.
							</p>
							<p className="text-[12px] font-bold uppercase tracking-[0.2em] text-primary/60">
								Suara Rahasia — Hasil Nyata
							</p>
						</div>
					</div>
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
