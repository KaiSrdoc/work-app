import { IconSchema, IconBriefcase } from "@tabler/icons-react";
import { NavbarLink } from "./sidebar/navbar/navbar-link";
import { usePathname } from "next/navigation";

const pages = [
  { icon: IconSchema, label: "Goals", path: "/goals" },
  { icon: IconBriefcase, label: "Work", path: "/work" },
];

export function usePagesLinks() {
  const pathname = usePathname();

  const links = pages.map((link) => (
    <NavbarLink {...link} key={link.label} active={pathname === link.path} />
  ));

  return {
    links,
  };
}
