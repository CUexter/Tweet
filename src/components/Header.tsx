import {
  Autocomplete,
  Burger,
  Button,
  Group,
  Header,
  createStyles,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome, IconSearch } from "@tabler/icons-react";
import { signIn, useSession } from "next-auth/react";

import AccountHeaderMenu from "./AccountHeaderMenu";
import ToggleDarkMode from "./ToggleDarkModeButton";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

const HeaderSearch = () => {
  const { classes } = useStyles();
  const { data: sessionData } = useSession();

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <IconHome />
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size="1rem" stroke={1.5} />}
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
          />
        </Group>
        <Group>
          <ToggleDarkMode />
          {sessionData === null ? (
            <Button onClick={() => void signIn()} variant="subtle">
              Sign in
            </Button>
          ) : (
            <AccountHeaderMenu />
          )}
        </Group>
      </div>
    </Header>
  );
};
export default HeaderSearch;
