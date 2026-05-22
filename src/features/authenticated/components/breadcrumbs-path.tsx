import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@tanstack/react-router";
import { GraduationCap, Home, ScrollText, University } from "lucide-react";

interface BreadcrumbItemProps {
  name: string;
  step: number;
  icon: React.ReactNode;
}

export function BreadcrumbsPath({ steps = 2 }: { steps?: number }) {
  const breadcrumbsItems: BreadcrumbItemProps[] = [
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

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbsItems.map((val) => {
          return (
            <>
              <BreadcrumbItem key={val.step}>
                <Link
                  to="/"
                  search={{
                    steps: val.step,
                  }}
                >
                  {steps === val.step ? (
                    <BreadcrumbPage className="font-semibold flex flex-row items-center justify-center gap-x-2">
                      {val.icon}
                      <span className="hidden sm:inline">{val.name}</span>
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink className="flex flex-row items-center justify-center gap-x-2">
                      {val.icon}
                      <span className="hidden sm:inline">{val.name}</span>
                    </BreadcrumbLink>
                  )}
                </Link>
              </BreadcrumbItem>
              {val.step !== 5 && <BreadcrumbSeparator />}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
