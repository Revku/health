import ApplicationCard from "@/components/card";
import apps from "@/config/apps";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-[50px]">
        <h1 className="mt-[30px] text-center text-3xl font-bold text-blue-500">
          Witaj w nowej odsłonie Health!
        </h1>
        <p className="mt-[15px] max-w-[400px] text-center text-[15px]">
          Zadbaj o swoje zdrowie i sprawdź dostępne aplikacje, które pomogą Ci w dbaniu o siebie.
        </p>
      </div>

      <div className="mt-[50px] grid gap-2 md:grid-cols-2">
        {apps?.map((app) => (
          <ApplicationCard app={app} key={app.name} />
        ))}
      </div>
    </div>
  );
}
