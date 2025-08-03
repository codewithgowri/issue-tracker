import { IssueStatus } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueSummary = ({
  open,
  closed,
  inProgress,
}: {
  open: number;
  closed: number;
  inProgress: number;
}) => {
  const statuses: { label: IssueStatus; value: number }[] = [
    { label: "OPEN", value: open },
    { label: "CLOSED", value: closed },
    { label: "IN_PROGRESS", value: inProgress },
  ];
  return (
    <Flex gap={"2"}>
      {statuses.map((status) => (
        <Link key={status.label} href={`/issues?status=${status.label}`}>
          <Card size={"2"}>
            <Heading size={"2"}>{status.label}</Heading>
            <Text>{status.value}</Text>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default IssueSummary;
