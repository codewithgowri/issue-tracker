import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        errors: validation.error.issues,
      },
      { status: 400 }
    );
  }

  const issue = await prisma.issue.update({
    where: { id: Number(id) },
    data: {
      title: validation.data.title,
      description: validation.data.description,
    },
  });

  return NextResponse.json(issue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const issue = await prisma.issue.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json(issue, { status: 200 });
}
