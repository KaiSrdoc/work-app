import { IconFlag, IconHammer } from "@tabler/icons-react";
import { NavbarLink } from "./sidebar/navbar/navbar-link";
import { usePathname } from "next/navigation";

const pages = [
  { icon: IconFlag, label: "Goals", path: "/goals" },
  { icon: IconHammer, label: "Work", path: "/work" },
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
