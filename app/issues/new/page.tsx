"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

// Dynamically import SimpleMDE editor with SSR disabled to avoid 'navigator is not defined' error
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  return (
    <form
      className="max-w-xl space-y-4"
      onSubmit={handleSubmit(async ({ title, description }) => {
        await axios.post("/api/issues", { title, description });
        router.push("/issues");
      })}
    >
      <TextField.Root {...register("title")}>
        <TextField.Slot>Title</TextField.Slot>
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE {...field} />}
      />
      <Button type="submit">Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
