import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <div className="py-[30px]">
      <Separator orientation="horizontal" className="mb-[30px]" />
      <p className="text-lg font-semibold text-blue-500">Health 2.0</p>
      <div className="flex flex-col md:flex-row md:justify-between">
        <p className="mt-[10px] text-sm">Copyright &copy; 2024 | Wszelkie prawa zastrzeżone</p>
        <p className="mt-[10px] text-sm">Wykonane przez Revku.dev</p>
      </div>
    </div>
  );
}
