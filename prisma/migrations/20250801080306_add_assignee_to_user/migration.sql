-- AlterTable
ALTER TABLE "issue_tracker"."Issue" ADD COLUMN     "assigneeId" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "issue_tracker"."Issue" ADD CONSTRAINT "Issue_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "issue_tracker"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
