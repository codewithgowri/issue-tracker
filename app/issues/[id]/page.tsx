import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/lib/prisma";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}
const IssueDetails = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  if (!issue) notFound();
  return (
    <div>
      <Heading as="h1">{issue.title}</Heading>
      <Flex gap={"2"} className="my-3">
        <IssueStatusBadge status={issue.status} />
        <p>{issue?.createdAt.toDateString()}</p>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetails;
