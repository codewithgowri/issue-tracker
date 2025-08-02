"use client";
import React from "react";
import {
  ArrowLeftIcon,
  DoubleArrowLeftIcon,
  ArrowRightIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  itemCount: number;
  pageSize: number;
}
const Pagination = ({ currentPage, itemCount, pageSize }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  return (
    <Flex align="center" gap="2">
      <Text>
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        onClick={() => {
          changePage(1);
        }}
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        onClick={() => changePage(currentPage - 1)}
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon />
      </Button>
      <Button
        onClick={() => changePage(currentPage + 1)}
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
      >
        <ArrowRightIcon />
      </Button>
      <Button
        onClick={() => changePage(pageCount)}
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
