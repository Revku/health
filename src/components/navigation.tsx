"use client";

import Image from "next/image";
import React from "react";

import logo from "@/assets/logo-icon.svg";
import Link from "next/link";

import { HomeIcon, TokensIcon, PersonIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import apps from "@/config/apps";
import { Button } from "./ui/button";
import ThemeSwitcher from "./theme-switcher";

export default function Navigation() {
  return (
    <div className="flex w-full flex-row items-center justify-between py-[30px]">
      <Link href="/" className="flex items-center gap-[15px]">
        <Image src={logo} alt="logo" className="w-[40px]" />
        <p className="hidden text-xl font-semibold md:block">HEALTH</p>
      </Link>
      <div className="flex gap-[10px]">
        <Link href="/">
          <Button variant="outline" size="icon">
            <HomeIcon className="h-4 w-4" />
          </Button>
        </Link>

        <Link href="/auth/login">
          <Button variant="outline" size="icon">
            <PersonIcon className="h-4 w-4" />
          </Button>
        </Link>

        <ThemeSwitcher />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <TokensIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Lista aplikacji</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {apps?.map((app) => (
              <Link href={`/apps/${app.slug}`} className="navitem" key={app.name}>
                <DropdownMenuItem className="flex gap-[10px]">
                  <Image src={app.icon} className="w-[15px]" alt={app.name} />
                  {app.name}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  );
}

