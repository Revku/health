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
            className="font-medium text-blue-500 transition-colors hover:text-blue-400"
          >
            Repozytorium GitHub
          </a>
        </p>
        <p className="mt-[10px] text-sm">Wykonane przez Revku.dev</p>
      </div>
    </div>
  );
}
