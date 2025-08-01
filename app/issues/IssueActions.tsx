"use client";
import { IssueStatus } from "@prisma/client";
import { Button, Flex, Select } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: IssueStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Open", value: IssueStatus.OPEN },
  { label: "Closed", value: IssueStatus.CLOSED },
  { label: "In Progress", value: IssueStatus.IN_PROGRESS },
];
const IssueActions = () => {
  const router = useRouter();
  return (
    <Flex className="mb-5" justify="between">
      <Select.Root
        onValueChange={(status) => {
          const query = status == "all" ? "" : `?status=${status}`;
          router.push(`/issues${query}`);
        }}
      >
        <Select.Trigger placeholder="Filter by status..."></Select.Trigger>
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status.label} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Link href={"/issues/new"}>
        <Button>New Issue</Button>
      </Link>
    </Flex>
  );
};

export default IssueActions;
