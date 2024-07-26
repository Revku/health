import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="mb-[20px] text-6xl font-bold">404</h1>
      <p className="text-[17px] font-medium">Nie udało sie odnaleźć strony, której szukasz.</p>

      <Button className="mt-[30px]" variant="outline">
        <Link href="/">Wróć na stronę główną</Link>
      </Button>
    </div>
  );
}
