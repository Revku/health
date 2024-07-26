import { CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface MessageProps {
  message: { type: string; title: string; message: string };
}

export default function Message({ message }: MessageProps) {
  return (
    <div className="mt-[30px]">
      <Alert
        className={`${message.type === "error" ? "border-red-500 text-red-500" : "border-blue-300 text-blue-300"}`}
      >
        {message.type === "error" ? (
          <ExclamationTriangleIcon color="#ef4444" />
        ) : (
          <CheckIcon color="#93c5fd" />
        )}
        <AlertTitle className="text-[15px] font-semibold">{message.title}</AlertTitle>
        <AlertDescription>{message.message}</AlertDescription>
      </Alert>
    </div>
  );
}
