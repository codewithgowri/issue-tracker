import React from "react";
import IssueForm from "../../_components/IssueForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string } | Promise<{ id: string }>;
}

const IssueEditPage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default IssueEditPage;
