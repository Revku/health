"use client";

import { useState } from "react";
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
import Message from "@/components/message";
import calculateCalories from "@/utils/calories";
import { Gender } from "@/types/enums";

export default function CaloriesApp() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activity, setActivity] = useState("");
  const [message, setMessage] = useState<{ type: string; title: string; message: string } | null>(
    null,
  );

  const handleSubmit = () => {
    if (!weight || !height || !age || !gender || !activity) {
      setMessage({
        type: "error",
        title: "Nie można obliczyć zapotrzebowania",
        message: "Wszystkie pola są wymagane!",
      });

      return;
    }

    if (
      Number.isNaN(parseInt(weight, 10)) ||
      parseInt(weight, 10) <= 0 ||
      parseInt(weight, 10) > 500
    ) {
      setMessage({
        type: "error",
        title: "Nie można obliczyć zapotrzebowania",
        message: "Waga musi być liczbą większą od zera i mniejszą niż 500!",
      });

      return;
    }

    if (
      Number.isNaN(parseInt(height, 10)) ||
      parseInt(height, 10) <= 0 ||
      parseInt(height, 10) > 250
    ) {
      setMessage({
        type: "error",
        title: "Nie można obliczyć zapotrzebowania",
        message: "Wzrost musi być liczbą większą od zera i mniejszą niż 250!",
      });

      return;
    }

    if (Number.isNaN(parseInt(age, 10)) || parseInt(age, 10) <= 0 || parseInt(age, 10) > 120) {
      setMessage({
        type: "error",
        title: "Nie można obliczyć zapotrzebowania",
        message: "Wiek musi być liczbą większą od zera i mniejszą niż 120!",
      });

      return;
    }

    const calories = calculateCalories(gender as Gender, parseFloat(weight), parseFloat(height), parseInt(age), parseFloat(activity));
    setMessage({
      type: "success",
      title: "Obliczono zapotrzebowanie",
      message: `Twoje zapotrzebowanie kaloryczne wynosi: ${calories} kcal`,
    });
  };

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-fit py-3">
        <CardHeader>
          <CardTitle className="text-xl">Kalkulator Kalorii</CardTitle>
          <CardDescription>
            Oblicz swoje zapotrzebowanie kaloryczne, aby dowiedzieć się, ile kalorii powinieneś
            spożywać.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="formfield">
            <Label>Waga</Label>
            <Input placeholder="Waga" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className="formfield">
            <Label>Wzrost</Label>
            <Input
              placeholder="Wzrost"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="formfield">
            <Label>Wiek</Label>
            <Input placeholder="Wiek" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
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
            <Label>Aktywność fizyczna</Label>
            <Select value={activity} onValueChange={(value) => setActivity(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz aktywność" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1.2">Brak aktywności</SelectItem>
                  <SelectItem value="1.375">Niska aktywność</SelectItem>
                  <SelectItem value="1.55">Średnia aktywność</SelectItem>
                  <SelectItem value="1.725">Wysoka aktywność</SelectItem>
                  <SelectItem value="1.9">Bardzo wysoka aktywność</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="mt-[30px] bg-blue-500 text-white hover:bg-blue-400"
            onClick={handleSubmit}
          >
            Oblicz zapotrzebowanie
          </Button>

          {message && <Message message={message} />}
        </CardContent>
      </Card>
    </div>
  );
}
