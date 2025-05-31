import { Container, Title, Divider, useMantineColorScheme, CloseButton } from '@mantine/core';
import { ReactNode } from 'react';
import classes from './drawer-layout.module.css';
import clsx from 'clsx';

interface DrawerLayoutComposition {
  Header: (props: HeaderProps) => JSX.Element;
  HeaderTitle: (props: HeaderTitleProps) => JSX.Element;
  Content: (props: ContentProps) => JSX.Element;
}

interface DrawerLayoutProps {
  children: ReactNode;
  onClose?: () => void;
}

interface HeaderProps {
  children?: ReactNode;
  onClose?: () => void;
  hideDivider?: boolean;
}

interface HeaderTitleProps {
  children: ReactNode;
}

interface ContentProps {
  children: ReactNode;
}

function Header({ children, onClose, hideDivider }: HeaderProps) {
  const { colorScheme } = useMantineColorScheme();
  return (
    <>
      <div className={clsx(classes.header, { [classes.hideDivider]: hideDivider })}>
        {children}
        {onClose && (
          <CloseButton onClick={onClose} className={classes.closeButton} size="lg" aria-label="Close drawer" />
        )}
      </div>
      {!hideDivider && <Divider color={colorScheme === 'dark' ? 'dark.4' : 'gray.3'} />}
    </>
  );
}

function HeaderTitle({ children }: HeaderTitleProps) {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Title order={1} c={colorScheme === 'dark' ? 'dark.0' : 'blue.8'}>
      {children}
    </Title>
  );
}

function Content({ children }: ContentProps) {
  return <div className={classes.content}>{children}</div>;
}

export const DrawerLayout: ((props: DrawerLayoutProps) => JSX.Element) & DrawerLayoutComposition = Object.assign(
  function DrawerLayout({ children }: DrawerLayoutProps) {
    return (
      <Container fluid className={classes.container}>
        {children}
      </Container>
    );
  },
  {
    Header,
    HeaderTitle,
    Content,
  },
);
