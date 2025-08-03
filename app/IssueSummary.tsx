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
        <Card size={"2"}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              key={status.label}
              href={`/issues?status=${status.label}`}
            >
              {status.label}
            </Link>
            <Text size="5" className="font-bold">
              {status.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
