import Pagination from "./components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams.page || "1", 10); // Default to 1 if page is undefined
  const itemCount = 101;
  const pageSize = 100;

  return (
    <Pagination
      currentPage={currentPage}
      itemCount={itemCount}
      pageSize={pageSize}
    />
  );
}
