"use client";

import Message from "@/components/message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function WHRApp() {
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState<{ type: string; title: string; message: string } | null>(
    null,
  );

  const handleSubmit = () => {
    if (!waist || !hip || !gender) {
      setMessage({
        type: "error",
        title: "Nie można obliczyć WHR",
        message: "Wszystkie pola są wymagane!",
      });
      return;
    }

    if (Number.isNaN(parseFloat(waist)) || parseFloat(waist) <= 0 || parseFloat(waist) > 500) {
      setMessage({
        type: "error",
        title: "Nie można obliczyć WHR",
        message: "Obwód talii musi być liczbą większą od zera i mniejszą niż 500!",
      });
      return;
    }

    if (Number.isNaN(parseFloat(hip)) || parseFloat(hip) <= 0 || parseFloat(hip) > 500) {
      setMessage({
        type: "error",
        title: "Nie można obliczyć WHR",
        message: "Obwód bioder musi być liczbą większą od zera i mniejszą niż 500!",
      });
      return;
    }

    const waistValue = parseFloat(waist);
    const hipValue = parseFloat(hip);
    const whr = (waistValue / hipValue).toFixed(2);

    let bodyType;
    if (gender === "male") {
      bodyType = parseFloat(whr) < 0.9 ? "gruszki" : "jabłka";
    } else {
      bodyType = parseFloat(whr) < 0.8 ? "gruszki" : "jabłka";
    }

    setMessage({
      type: "success",
      title: "Obliczono WHR",
      message: `Twój współczynnik talia-biodra wynosi: ${whr}. Jest to typ ${bodyType}.`,
    });
  };

  return (
    <div>
      <Card className="py-3">
        <CardHeader>
          <CardTitle className="text-xl">Kalkulator WHR</CardTitle>
          <CardDescription>
            Oblicz swój współczynnik talia-biodra, aby dowiedzieć się, czy masz prawidłową wagę.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="formfield">
            <Label>Płeć</Label>
            <Select value={gender} onValueChange={(value) => setGender(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz płeć" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Mężczyzna</SelectItem>
                  <SelectItem value="female">Kobieta</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="formfield">
            <Label>Obwód talii</Label>
            <Input
              placeholder="Obwód talii"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
            />
          </div>

          <div className="formfield">
            <Label>Obwód bioder</Label>
            <Input
              placeholder="Obwód bioder"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
            />
          </div>

          <Button
            className="mt-[30px] bg-blue-500 text-white hover:bg-blue-400"
            onClick={handleSubmit}
          >
            Oblicz WHR
          </Button>

          {message && <Message message={message} />}
        </CardContent>
      </Card>
    </div>
  );
}
