import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/lib/prisma";
import { Box, Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { IssueStatus } from "@prisma/client";

const Issues = async ({
  searchParams,
}: {
  searchParams: Promise<{ status: IssueStatus }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const statuses = Object.values(IssueStatus);
  const status = statuses.includes(resolvedSearchParams.status)
    ? resolvedSearchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
  });
  // await delay(3000); // Simulate loading delay
  return (
    <Box>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <p className="md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </p>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export const dynamic = "force-dynamic";

export default Issues;
