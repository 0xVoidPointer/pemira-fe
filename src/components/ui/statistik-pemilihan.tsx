import { cn } from "#/lib/utils";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type Variant = "default" | "outline";

interface Props {
	variant?: Variant;
	className?: string;
}

export function StatistikPemilihan({ variant = "default", className }: Props) {
	const variantClass: Record<Variant, string> = {
		default: "bg-primary/5 text-primary ",
		outline: "bg-card text-primary",
	};

	const stats = [
		{
			title: "8.4K",
			description: "Pemilih Terdaftar",
		},
		{
			title: "63%",
			description: "Sudah Memilih",
		},
		{
			title: "5",
			description: "Paslon Terdaftar",
		},
	];

	return (
		<section
			className={cn(
				"mt-8 grid grid-cols-3 grid-rows-1 gap-4 md:mt-0",
				className,
			)}
		>
			{stats.map((stat, index) => (
				<Card
					key={index}
					className={cn(variantClass[variant], "rounded-xl text-center p-0")}
				>
					<CardHeader className="p-4 md:p-6">
						<CardTitle className="mx-auto text-2xl font-bold">
							{stat.title}
						</CardTitle>
						<CardDescription className="text-inherit">
							{stat.description}
						</CardDescription>
					</CardHeader>
				</Card>
			))}
		</section>
	);
}
