import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/lib/prisma";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsPencilSquare } from "react-icons/bs";
import Markdown from "react-markdown";
import DeleteButton from "../_components/DeleteButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AssigneeSelect from "../_components/AssigneeSelect";

interface Props {
  params: Promise<{ id: string }>;
}
const IssueDetails = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const resolvedParams = await params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(resolvedParams.id),
    },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className={"md:col-span-4"}>
        <Heading as="h1">{issue.title}</Heading>
        <Flex gap={"2"} className="my-3">
          <IssueStatusBadge status={issue.status} />
          <p>{issue?.createdAt.toDateString()}</p>
        </Flex>
        <Card className="prose max-w-full">
          <Markdown>{issue.description}</Markdown>
        </Card>
      </Box>
      {session && (
        <Box>
          <Flex gap={"4"} direction="column">
            <AssigneeSelect issue={issue} />
            <Button>
              <BsPencilSquare />
              <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
            </Button>
            <DeleteButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetails;
