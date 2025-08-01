export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/issues/:id/edit", "/issues/new"],
};
