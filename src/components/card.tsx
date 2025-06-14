import { AppsItem } from "@/config/apps";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

interface Props {
  app: AppsItem;
}

export default function ApplicationCard({ app }: Props) {
  return (
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
  )
}
