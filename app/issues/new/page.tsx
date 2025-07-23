"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { issueSchema } from "../../validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

// Dynamically import SimpleMDE editor with SSR disabled to avoid 'navigator is not defined' error
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const router = useRouter();
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root
          className="mb-5"
          color="red"
          style={{ minHeight: "2.5rem" }}
        >
          <Callout.Text>{error || "\u00A0"}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-4"
        onSubmit={handleSubmit(async ({ title, description }) => {
          try {
            await axios.post("/api/issues", { title, description });
            router.push("/issues");
          } catch (error) {
            setError("Failed to create issue");
          }
        })}
      >
        <TextField.Root {...register("title")}>
          <TextField.Slot>Title</TextField.Slot>
        </TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE {...field} />}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
