import { Card, Flex, Heading } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const IssueDetailsLoadingPage = () => {
  return (
    <div>
      <Heading as="h1" className="max-w-xl">
        <Skeleton />
      </Heading>
      <Flex gap={"2"} className="my-3">
        <Skeleton width={"5rem"} />
        <p>
          <Skeleton width={"8rem"} />
        </p>
      </Flex>
      <Card className="prose">
        <Skeleton count={5} />
      </Card>
    </div>
  );
};

export default IssueDetailsLoadingPage;
