import logo from "@/assets/revkudevlogo.svg";
import Image from "next/image";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <div className="py-[30px]">
      <Separator orientation="horizontal" className="mb-[30px]" />
      <p className="text-lg font-semibold text-blue-500">Health Center</p>
      <div className="flex flex-col md:flex-row md:justify-between">
        <p className="mt-[10px] text-sm">
          Open source |{" "}
          <a
            href="https://github.com/Revku/health"
            target="_blank"
            className="font-medium text-blue-500 transition-colors hover:text-blue-400"
          >
            Repozytorium GitHub
          </a>
        </p>
        <p className="mt-[10px] flex gap-2 text-sm">
          <span>Wykonane przez</span>
          <a
            href="https://revku.dev"
            target="_blank"
            className="flex items-center justify-center gap-[5px]"
          >
            <Image src={logo} alt="Revku.dev Logo" className="w-[20px]" />
            <span className="font-medium transition-colors hover:text-red-500">revku.dev</span>
          </a>
        </p>
      </div>
    </div>
  );
}
