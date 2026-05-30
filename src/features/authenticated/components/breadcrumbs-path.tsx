import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getRouteApi, Link } from "@tanstack/react-router";
import { breadcrumbsItems } from "../utils/breadrumbs-items";
import * as React from "react";

export function BreadcrumbsPath({ steps = 2 }: { steps?: number }) {
  const routeApi = getRouteApi("/_authenticated/");

  const { visiMisi } = routeApi.useSearch();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbsItems.map((val) => {
          const isActive = steps === val.step;

          return (
            <React.Fragment key={val.step}>
              <BreadcrumbItem>
                {isActive ? (
                  <BreadcrumbPage className="font-semibold flex flex-row items-center justify-center gap-x-2">
                    {val.icon}
                    <span className="hidden sm:inline">{val.name}</span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    asChild
                    className="flex flex-row items-center justify-center gap-x-2"
                  >
                    <Link
                      to="/"
                      search={{
                        steps: val.step,
                        visiMisi,
                      }}
                      resetScroll={false}
                    >
                      {val.icon}
                      <span className="hidden sm:inline">{val.name}</span>
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {val.step !== 5 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
