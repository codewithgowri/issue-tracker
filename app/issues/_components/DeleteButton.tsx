"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RiDeleteBinLine } from "react-icons/ri";

const DeleteButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const handleDelete = async () => {
    await axios.delete(`/api/issues/${issueId}`);
    router.push("/issues");
    router.refresh();
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button>
          <RiDeleteBinLine />
          Delete
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </AlertDialog.Description>
        <Flex className="mt-5" gap={"3"}>
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={handleDelete} color="red" variant="solid">
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteButton;
