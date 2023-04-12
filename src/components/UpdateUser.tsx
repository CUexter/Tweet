import {
  ActionIcon,
  Avatar,
  Group,
  Menu,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import {
  IconDots,
  IconMessages,
  IconNote,
  IconPencil,
  IconReportAnalytics,
  IconTrash,
} from "@tabler/icons-react";

interface UsersProps {
  data:
    | {
        id: string;
        name: string | null;
        email: string | null;
        tag_name: string | null;
        profile_picture: string | null;
      }
    | null
    | undefined;
  isOpen: boolean;
}

const UpdateUser = ({ data, isOpen }: UsersProps) => {
  if (isOpen == false) return null;
  const rows = (
    <tr key={data?.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={data?.profile_picture} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {data?.name}
            </Text>
            <Text c="dimmed" fz="xs">
              {data?.email}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Text fz="sm">{data?.email}</Text>
        <Text fz="xs" c="dimmed">
          Email
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <Menu
            transitionProps={{ transition: "pop" }}
            withArrow
            position="bottom-end"
            withinPortal
          >
            <Menu.Target>
              <ActionIcon>
                <IconDots size="1rem" stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconMessages size="1rem" stroke={1.5} />}>
                Send message
              </Menu.Item>
              <Menu.Item icon={<IconNote size="1rem" stroke={1.5} />}>
                Add note
              </Menu.Item>
              <Menu.Item
                icon={<IconReportAnalytics size="1rem" stroke={1.5} />}
              >
                Analytics
              </Menu.Item>
              <Menu.Item
                icon={<IconTrash size="1rem" stroke={1.5} />}
                color="red"
              >
                Terminate contract
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  );

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="md">
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default UpdateUser;
