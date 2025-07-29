import React from "react";
import Skeleton from "react-loading-skeleton";

const NewIssueLoading = () => {
  return (
    <div className="max-w-xl ">
      <Skeleton />
      <Skeleton height={"16rem"} />
      <Skeleton />
    </div>
  );
};

export default NewIssueLoading;
