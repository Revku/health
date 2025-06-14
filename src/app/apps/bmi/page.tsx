"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Message from "@/components/message";
import calculateBmi from "@/utils/bmi";

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
        title: "Nie można obliczyć BMI",
        message: "Waga i wzrost są wymagane!",
      });
      return;
    }

    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    if (
      Number.isNaN(weightValue) ||
      weightValue <= 0 ||
      Number.isNaN(heightValue) ||
      heightValue <= 0
    ) {
      setMessage({
        type: "error",
        title: "Nie można obliczyć BMI",
        message: "Waga i wzrost muszą być liczbami większymi od zera!",
      });
      return;
    }

    const bmi = calculateBmi(weightValue, heightValue);
    let bodyStatus = "";

    if (parseFloat(bmi) < 18.5) {
      bodyStatus = "niedowaga";
    } else if (parseFloat(bmi) < 24.9) {
      bodyStatus = "prawidłowa waga";
    } else if (parseFloat(bmi) < 29.9) {
      bodyStatus = "nadwaga";
    } else {
      bodyStatus = "otyłość";
    }

    setMessage({
      type: "success",
      title: "Obliczono BMI",
      message: `Twoje BMI wynosi: ${bmi}. Jest to ${bodyStatus}.`,
    });
  };

  return (
    <div className="h-full">
      <Card className="w-full py-3">
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
          <Button
            className="mt-[30px] bg-blue-500 text-white hover:bg-blue-400"
            onClick={handleSubmit}
          >
            Oblicz BMI
          </Button>

          {message && <Message message={message} />}
        </CardContent>
      </Card>
    </div>
  );
}
