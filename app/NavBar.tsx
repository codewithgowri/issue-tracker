"use client";
import Link from "next/link";
import React from "react";
import classNames from "classnames";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const { data: session, status } = useSession();
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 px-4 h-14 border-b-1 items-center mb-4">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classNames({
                "text-zinc-900": currentPath == link.href,
                "text-zinc-500": currentPath != link.href,
                "hover:text-zinc-800": true,
                "transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status == "authenticated" && (
          <Link href={"/api/auth/signout"}>Sign out</Link>
        )}
        {status == "unauthenticated" && (
          <Link href={"/api/auth/signin"}>Sign in</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
