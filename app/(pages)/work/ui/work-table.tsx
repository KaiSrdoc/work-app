import { Table, ActionIcon } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useGetWork } from "../api/use-get-work";
import { useGetGoals } from "../../goals/api/use-get-goals";
import { useWorkStore } from "@/app/work.store";

export function WorkTable() {
  const { data: work = [] } = useGetWork();
  const { data: goals = [] } = useGetGoals();
  const { openWorkForm } = useWorkStore();

  const getGoalTitle = (goalId: number | null) => {
    return goals.find((goal) => goal.id === goalId)?.title || "No goal";
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
        {work.map((entry) => (
          <Table.Tr key={entry.id}>
            <Table.Td>{formatDate(entry.work_date || "")}</Table.Td>
            <Table.Td>{entry.hours_worked}</Table.Td>
            <Table.Td>{entry.money_earned}€</Table.Td>
            <Table.Td>{getGoalTitle(entry.goal_id || null)}</Table.Td>
            <Table.Td>
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => openWorkForm(entry.id)}
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
