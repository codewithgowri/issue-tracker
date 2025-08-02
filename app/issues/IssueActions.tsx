"use client";
import { IssueStatus } from "@prisma/client";
import { Button, Flex, Select } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value: IssueStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Open", value: IssueStatus.OPEN },
  { label: "Closed", value: IssueStatus.CLOSED },
  { label: "In Progress", value: IssueStatus.IN_PROGRESS },
];
const IssueActions = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Flex className="mb-5" justify="between">
      <Select.Root
        defaultValue={searchParams.get("status") || "all"}
        onValueChange={(status) => {
          const params = new URLSearchParams();
          if (status !== "all") {
            params.append("status", status);
          }
          if (searchParams.get("orderBy")) {
            params.append("orderBy", searchParams.get("orderBy")!);
          }

          const query = `?${params.toString()}`;

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
