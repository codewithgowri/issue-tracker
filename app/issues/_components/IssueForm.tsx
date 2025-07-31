"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { issueSchema } from "../../validationSchemas";

// Dynamically import SimpleMDE editor with SSR disabled to avoid 'navigator is not defined' error
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: issue?.title || "",
      description: issue?.description || "",
    },
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        onSubmit={handleSubmit(async (body) => {
          try {
            setLoading(true);
            if (issue) await axios.patch(`/api/issues/${issue.id}`, body);
            else await axios.post("/api/issues", body);
            router.push("/issues");
            router.refresh();
          } catch (error) {
            setLoading(false);
            setError("Failed to create issue");
          }
        })}
      >
        <TextField.Root {...register("title")}>
          <TextField.Slot>Title</TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={loading} type="submit">
          {issue ? "Update Issue" : "Submit New Issue"} {loading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
