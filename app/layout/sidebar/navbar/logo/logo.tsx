import { IconBriefcase } from "@tabler/icons-react";
import classes from "./logo.module.css";
import Link from "next/link";
import { Tooltip } from "@mantine/core";

interface NavbarLogoProps {
  onClick?: () => void;
}

export function NavbarLogo({ onClick }: NavbarLogoProps) {
  const handleLogoClick = () => {
    onClick?.();
  };

  return (
    <Link href="/">
      <div
        className={classes.logoWrapper}
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        <div className={classes.logoIconWrapper}>
          <Tooltip label="Work App" position="right" withArrow>
            <IconBriefcase size={24} color="white" />
          </Tooltip>
        </div>
      </div>
    </Link>
  );
}
