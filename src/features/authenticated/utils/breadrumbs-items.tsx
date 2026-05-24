import { GraduationCap, Home, ScrollText, University } from "lucide-react";

export interface BreadcrumbItemProps {
  name: string;
  step: number;
  icon: React.ReactNode;
}
export const breadcrumbsItems: BreadcrumbItemProps[] = [
  {
    name: "Dashboard",
    step: 2,
    icon: <Home className="size-4" />,
  },
  {
    name: "Visi & Misi",
    step: 3,
    icon: <ScrollText className="size-4" />,
  },
  {
    name: "Pemilihan Universitas",
    step: 4,
    icon: <University className="size-4" />,
  },
  {
    name: "Pemilihan Fakultas",
    step: 5,
    icon: <GraduationCap className="size-4" />,
  },
];
