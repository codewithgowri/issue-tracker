"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <Skeleton />;
  if (error) return null;
  const handleAssignee = (userId: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assigneeId: userId == "unassigned" ? null : userId,
      })
      .then(() => {
        toast.success("Assignee updated successfully");
      })
      .catch(() => {
        toast.error("Failed to update assignee");
      });
  };

  return (
    <>
      <Select.Root
        onValueChange={handleAssignee}
        defaultValue={issue.assigneeId || "unassigned"}
      >
        <Select.Trigger placeholder="Asignee..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Select Assignee</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};
const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
