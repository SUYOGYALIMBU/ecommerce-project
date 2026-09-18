import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type Path = {
  title: string;
  link?: string;
};

const BreadCrumb = ({
  title,
  paths,
}: {
  title?: string;
  paths?: Path[];
}) => {
  const location = useLocation();
  const newPath = location.pathname.split("/").filter(Boolean);

  // Prefer the explicitly provided `paths`.
  // Fall back to the URL segments if none were passed.
  const crumbs: Path[] =
    paths && paths.length > 0
      ? paths
      : newPath.map((segment) => ({
          title: segment.charAt(0).toUpperCase() + segment.slice(1),
          link: `/${segment}`,
        }));

  const heading = title || newPath[0] || "Home";

  return (
    <section className="border-b border-primary-dark/10 bg-dark-white">
      <div className="container py-10 sm:py-12 md:py-14 lg:py-16">
        {/* Page title */}
        <h1 className="font-josefin text-[30px] font-bold capitalize leading-tight text-primary-dark sm:text-[34px] md:text-[36px]">
          {heading}
        </h1>

        {/* Breadcrumb trail */}
        <nav aria-label="Breadcrumb" className="mt-3">
          <ol className="flex flex-wrap items-center gap-1.5 text-[13.5px]">
            <li>
              <Link
                to="/"
                className="font-medium text-gray-500 transition-colors hover:text-primary"
              >
                Home
              </Link>
            </li>

            {crumbs.map((el, index) => {
              const isLast = index === crumbs.length - 1;

              return (
                <li key={`${el.title}-${index}`} className="flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-primary-dark/30" />

                  {isLast || !el.link ? (
                    <span className="font-medium capitalize text-primary-dark">
                      {el.title}
                    </span>
                  ) : (
                    <Link
                      to={el.link}
                      className="font-medium capitalize text-gray-500 transition-colors hover:text-primary"
                    >
                      {el.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default BreadCrumb;