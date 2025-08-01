import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
  const newIssue = await prisma.issue.create({
    data: {
      title: validation.data.title,
      description: validation.data.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
