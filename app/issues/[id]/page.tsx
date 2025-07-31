import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/lib/prisma";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsPencilSquare } from "react-icons/bs";
import Markdown from "react-markdown";

interface Props {
  params: Promise<{ id: string }>;
}
const IssueDetails = async ({ params }: Props) => {
  const resolvedParams = await params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(resolvedParams.id),
    },
  });
  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"4"}>
      <Box>
        <Heading as="h1">{issue.title}</Heading>
        <Flex gap={"2"} className="my-3">
          <IssueStatusBadge status={issue.status} />
          <p>{issue?.createdAt.toDateString()}</p>
        </Flex>
        <Card className="prose">
          <Markdown>{issue.description}</Markdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <BsPencilSquare />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetails;
