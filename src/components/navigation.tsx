import Image from "next/image";
import React from "react";

import logo from "@/assets/logo-text.svg";
import Link from "next/link";

import { TokensIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navigation() {
  return (
    <div className="flex w-full flex-row items-center justify-between p-[30px]">
      <Image src={logo} alt="logo" />

      <div className="mt-[30px] flex flex-col gap-[15px] text-center lg:mt-0 lg:flex-row" />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            aria-label="Lista aplikacji"
            className="flex h-[35px] w-[35px] items-center justify-center rounded-sm bg-zinc-900"
          >
            <TokensIcon className="h-[20px] w-[20px]" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Lista aplikacji</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/apps/bmi" className="navitem">
              Kalkulator BMI
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {" "}
            <Link href="/apps/calories" className="navitem">
              Kalkulator Kalorii
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/apps/water" className="navitem">
              Zapotrzebowanie wody
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/apps/whr" className="navitem">
              Kalkulator WHR
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
