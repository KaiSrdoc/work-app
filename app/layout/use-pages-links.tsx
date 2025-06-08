import {
  IconFlag,
  IconHammer,
  IconBriefcase,
  IconChecklist,
} from "@tabler/icons-react";
import { NavbarLink } from "./sidebar/navbar/navbar-link";
import { usePathname } from "next/navigation";

const pages = [
  { icon: IconFlag, label: "Goals", path: "/goals" },
  { icon: IconHammer, label: "Work", path: "/work" },
  { icon: IconBriefcase, label: "Projects", path: "/projects" },
  { icon: IconChecklist, label: "Tasks", path: "/tasks" },
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
