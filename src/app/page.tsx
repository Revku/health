import ApplicationCard from "@/components/card";
import { Button } from "@/components/ui/button";
import apps from "@/config/apps";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-start justify-center py-[100px]">
        <h1 className="text-left text-4xl md:text-[42px] md:leading-[50px] font-extrabold text-blue-500">
          Miej swoje zdrowie pod&nbsp;kontrolą dzięki Health
        </h1>
        <p className="mt-[25px] max-w-[500px] text-left text-base md:text-[17px]">
          Health oferuje Ci zestaw przydatnych narzędzi, które pomogą Tobie w codziennym kontrolowaniu swojego stanu zdrowia.
        </p>

        <div className="flex gap-2 mt-[30px]">
          <Link href="/#apps">
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              Rozpocznij
            </Button>
          </Link>
          <Link href="https://github.com/Revku/health" target="_blank">
            <Button variant={"outline"} className="flex gap-2">
              <GitHubLogoIcon /><span className="hidden md:inline-block">Współtwórz projekt</span>
            </Button>
          </Link>
        </div>
      </div>

      <div id="apps" className="mt-[50px] grid gap-2 md:grid-cols-2">
        {apps?.map((app) => (
          <ApplicationCard app={app} key={app.name} />
        ))}
      </div>
    </div>
  );
}
