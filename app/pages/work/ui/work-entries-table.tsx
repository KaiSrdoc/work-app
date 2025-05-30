import { Table, ActionIcon } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useWorkStore } from "@/app/work.store";

export function WorkEntriesTable() {
  const { workEntries, goals, openEntryForm } = useWorkStore();

  const getGoalTitle = (goalId: string) => {
    return goals.find((goal) => goal.id === goalId)?.title || goalId;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayMonth = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
    });
    return `${dayMonth} ${weekday}`;
  };

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Date</Table.Th>
          <Table.Th>Hours Worked</Table.Th>
          <Table.Th>Money Earned</Table.Th>
          <Table.Th>Goal</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {workEntries.map((entry, index) => (
          <Table.Tr key={index}>
            <Table.Td>{formatDate(entry.date)}</Table.Td>
            <Table.Td>{entry.hours_worked}</Table.Td>
            <Table.Td>{entry.money_earned}€</Table.Td>
            <Table.Td>{getGoalTitle(entry.goal_id)}</Table.Td>
            <Table.Td>
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => openEntryForm(index)}
              >
                <IconEdit size={16} />
              </ActionIcon>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
