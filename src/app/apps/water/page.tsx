"use client";

import Message from "@/components/message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function WaterApp() {
  const [weight, setWeight] = useState<string>("");
  const [message, setMessage] = useState<{ type: string; title: string; message: string } | null>(
    null,
  );

  const handleSubmit = () => {
    if (!weight) {
      setMessage({
        type: "error",
        title: "Nie można obliczyć zapotrzebowania",
        message: "Waga jest wymagana!",
      });

      return;
    }

    const water = (parseInt(weight, 10) * 35).toFixed(2);

    setMessage({
      type: "success",
      title: "Obliczono zapotrzebowanie",
      message: `Twoje zapotrzebowanie na wodę wynosi: ${water} ml`,
    });
  };

  return (
    <div>
      <Card className="py-3">
        <CardHeader>
          <CardTitle className="text-xl">Zapotrzebowanie wody</CardTitle>
          <CardDescription>
            Oblicz swoje zapotrzebowanie na wodę, aby dowiedzieć się, ile płynów powinieneś pić
            codziennie.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="formfield">
            <Label>Waga</Label>
            <Input placeholder="Waga" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>

          <Button className="mt-[30px]" onClick={handleSubmit}>
            Oblicz zapotrzebowanie wody
          </Button>

          {message && <Message message={message} />}
        </CardContent>
      </Card>
    </div>
  );
}
