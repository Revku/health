"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BMIApp() {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [message, setMessage] = useState<{ type: string; title: string; message: string } | null>(
    null,
  );

  const handleSubmit = () => {
    if (!weight || !height) {
      setMessage({
        type: "error",
        title: "Nie można oblliczyć BMI",
        message: "Waga i wzrost są wymagane!",
      });

      return;
    }

    const bmi = (parseInt(weight, 10) / (parseInt(height, 10) / 100) ** 2).toFixed(2);

    setMessage({
      type: "success",
      title: "Obliczono BMI",
      message: `Twoje BMI wynosi: ${bmi}`,
    });
  };

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-fit py-3">
        <CardHeader>
          <CardTitle className="text-xl">Kalkulator BMI</CardTitle>
          <CardDescription>
            Oblicz swoje BMI, aby dowiedzieć się, czy Twoja waga jest prawidłowa.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="formfield">
            <Label>Wzrost</Label>
            <Input
              placeholder="Wzrost"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="formfield">
            <Label>Waga</Label>
            <Input placeholder="Waga" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <Button className="mt-[30px]" onClick={handleSubmit}>
            Oblicz BMI
          </Button>
          {message && (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
