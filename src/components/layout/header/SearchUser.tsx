import type { SelectItemProps } from "@mantine/core";

import { api } from "@/utils/api";
import { Autocomplete } from "@mantine/core";
import { Avatar, Group, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { forwardRef, useState } from "react";

interface ItemProps extends SelectItemProps {
  display_name: string | null;
  tag_name: string | null;
  name: string;
  image: string;
  profile_desc: string | null;
  id: string;
  value: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  (
    { tag_name, display_name, image, profile_desc, name, ...others }: ItemProps,
    ref
  ) => {
    const username = display_name || name;
    const avatar = image ? (
      <Avatar src={image} radius="xl" />
    ) : (
      <Avatar color="blue" radius="xl">
        {username.slice(0, 2).toUpperCase()}{" "}
      </Avatar>
    );
    const tag = tag_name ? "@" + tag_name : "";
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          {avatar}
          <div>
            <Text>
              {username}
              {tag}
            </Text>
            <Text size="xs" color="dimmed">
              {profile_desc}
            </Text>
          </div>
        </Group>
      </div>
    );
  }
);
AutoCompleteItem.displayName = "User search";

const SearchUser = () => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const [debouncedSearchInput] = useDebouncedValue(searchInput, 200, {
    leading: true,
  });

  const { data: searchResult } = api.user.searchUser.useQuery(
    { searchTerm: debouncedSearchInput },
    {
      enabled: searchInput.length >= 2,
    }
  );
  const data =
    searchResult?.map((i) => ({
      ...i,
      value: i.display_name || i.name,
    })) || [];
  return (
    <Autocomplete
      icon={<IconSearch size="1rem" stroke={1.5} />}
      placeholder="Search for user"
      itemComponent={AutoCompleteItem}
      value={searchInput}
      onChange={setSearchInput}
      data={data}
      onItemSubmit={(item) => {
        const { id } = item as unknown as ItemProps;
        void router.replace("profile/" + id);
      }}
      filter={(value, item) => {
        const i = item as unknown as ItemProps;
        const v: string = value.toLowerCase().trim();
        i.tag_name = i.tag_name || "";
        return (
          i.id.toLowerCase().includes(v) ||
          i.value.toLowerCase().includes(v) ||
          i.tag_name.toLowerCase().includes(v)
        );
      }}
    ></Autocomplete>
  );
};

export default SearchUser;
