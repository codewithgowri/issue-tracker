import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/lib/prisma";
import { Box, Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Issue, IssueStatus } from "@prisma/client";
import NextLink from "next/link";
import { FaSortAmountDownAlt } from "react-icons/fa";
import Pagination from "@/app/components/Pagination";

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

const Issues = async ({
  searchParams,
}: {
  searchParams: Promise<{
    status: IssueStatus;
    orderBy: keyof Issue;
    page: string;
  }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const statuses = Object.values(IssueStatus);
  const status = statuses.includes(resolvedSearchParams.status)
    ? resolvedSearchParams.status
    : undefined;
  const page = parseInt(resolvedSearchParams.page) || 1;
  const pageSize = 10;
  const orderBy =
    resolvedSearchParams.orderBy &&
    columns.map((column) => column.value).includes(resolvedSearchParams.orderBy)
      ? {
          [resolvedSearchParams.orderBy]: "asc",
        }
      : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy: orderBy,
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
  const itemCount = await prisma.issue.count({
    where: {
      status: status,
    },
  });
  // await delay(3000); // Simulate loading delay

  return (
    <Box>
      <IssueActions />
      <Table.Root variant="surface" mb="5">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.label}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: {
                      ...resolvedSearchParams,
                      orderBy: column.value,
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === resolvedSearchParams.orderBy && (
                  <FaSortAmountDownAlt className="inline " />
                )}
              </Table.ColumnHeaderCell>
            ))}
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
      <Pagination
        currentPage={page}
        itemCount={itemCount}
        pageSize={pageSize}
      />
    </Box>
  );
};

export const dynamic = "force-dynamic";

export default Issues;
