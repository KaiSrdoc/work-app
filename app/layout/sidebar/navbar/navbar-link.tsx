import { Tooltip, UnstyledButton } from "@mantine/core";
import { Icon } from "@tabler/icons-react";
import { useMantineColorScheme } from "@mantine/core";
import classes from "./navbar-link.module.css";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";

interface NavbarLinkProps {
  icon: Icon;
  label: string;
  active?: boolean;
  onClick?: () => void;
  path?: string;
}

export function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  path,
}: NavbarLinkProps) {
  const { colorScheme } = useMantineColorScheme();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const button = (
    <Link href={path ?? "/"}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
        data-color-scheme={colorScheme}
      >
        <div className={classes.linkInner}>
          <Icon size={20} stroke={1.5} />
          {isMobile && <span className={classes.linkLabel}>{label}</span>}
        </div>
      </UnstyledButton>
    </Link>
  );

  return (
    <Tooltip label={label} position="right" withArrow>
      {button}
    </Tooltip>
  );
}
