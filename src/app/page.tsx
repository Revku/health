import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import apps from "@/config/apps";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="py-[50px]">
        <h1 className="mt-[30px] text-center text-3xl font-bold text-blue-500">
          Witaj w nowej odsłonie Health!
        </h1>
        <p className="mt-[15px] text-center text-[15px]">
          Zadbaj o swoje zdrowie, korzystając z naszych kalkulatorów.
        </p>
      </div>

      <div className="mt-[50px] grid gap-2 md:grid-cols-2">
        {apps?.map((app) => (
          <Card
            className="flex h-full w-full flex-col justify-between bg-blue-500 text-white dark:bg-inherit"
            key={app.name}
          >
            <CardHeader>
              <Image src={app.icon} alt={app.name} className="mx-auto w-[50px] py-[10px]" />
              <CardTitle className="text-center text-xl">{app.name}</CardTitle>
              <CardDescription className="text-center text-gray-100">
                {app.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/apps/${app.slug}`}>
                <Button className="mt-[10px] w-full text-black dark:text-white" variant="outline">
                  Przejdź do kalkulatora
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
