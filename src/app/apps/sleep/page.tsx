"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSleepTime, getWakeUpTime } from "@/utils/getSleepTimes";
import React, { useState } from "react";

enum Mode {
  WAKEUP = "wakeup",
  SLEEP = "sleep",
}

export default function SleepApp() {
  const [result, setResult] = useState<{ time: string; cycles: number; sleepTime: number }[]>([]);
  const [error, setError] = useState("");
  const [time, setTime] = useState("");

  const handleCalculate = (mode: Mode) => {
    setError("");
    setResult([]);

    if (!time) {
      setError("Podaj godzinę!");
      return;
    }

    switch (mode) {
      case Mode.WAKEUP:
        setResult(getSleepTime(time));
        break;

      case Mode.SLEEP:
        setResult(getWakeUpTime(time));
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Card className="py-3">
        <CardHeader>
          <CardTitle className="text-xl">Kalkulator cykli snu</CardTitle>
          <CardDescription>
            Oblicz cykle snu, aby obudzić się wypoczętym i pełnym energii!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="formfield">
            <Label>Tryb</Label>
            <Tabs defaultValue="wakeup" className="w-full">
              <TabsList>
                <TabsTrigger value="wakeup" onClick={() => setResult([])}>
                  Chcę wstać o...
                </TabsTrigger>
                <TabsTrigger value="sleep" onClick={() => setResult([])}>
                  Chcę się położyć o...
                </TabsTrigger>
              </TabsList>
              <TabsContent value="wakeup">
                <div className="formfield mt-[30px]">
                  <Label>O której godzinie chcesz wstać?</Label>
                  <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                  {error && <p className="text-[14px] text-red-500">{error}</p>}
                </div>

                <Button
                  className="mt-[30px] bg-blue-500 text-white hover:bg-blue-400"
                  onClick={() => handleCalculate(Mode.WAKEUP)}
                >
                  Oblicz cykl snu
                </Button>

                {result.length > 0 && (
                  <p className="mt-[30px] font-medium text-blue-500">
                    Człowiek potrzebuje około 15 minut aby zasnąć. Jeżeli chcesz wstać o {time},
                    musisz położyć się spać w jednym z wybranych momentów:
                  </p>
                )}
              </TabsContent>
              <TabsContent value="sleep">
                <div className="formfield mt-[30px]">
                  <Label>O której godzinie chcesz się położyć?</Label>
                  <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                  {error && <p className="text-[14px] text-red-500">{error}</p>}
                </div>

                <Button
                  className="mt-[30px] bg-blue-500 text-white hover:bg-blue-400"
                  onClick={() => handleCalculate(Mode.SLEEP)}
                >
                  Oblicz cykl snu
                </Button>

                {result.length > 0 && (
                  <p className="mt-[30px] font-medium text-blue-500">
                    Człowiek potrzebuje około 15 minut aby zasnąć. Jeżeli pójdziesz spać o {time},
                    musisz obudzić się w jednym z wybranych momentów:
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {result.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ilość cykli</TableHead>
                  <TableHead>Czas snu</TableHead>
                  <TableHead>Godzina</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.map((item) => (
                  <TableRow key={item.time} className={`${item.cycles >= 5 && "bg-zinc-900"}`}>
                    <TableCell>{item.cycles} cykli </TableCell>
                    <TableCell>{item.sleepTime} h</TableCell>
                    <TableCell className="flex flex-col items-start justify-start gap-[10px] md:flex-row">
                      {item.time}
                      {item.cycles >= 5 && (
                        <Badge className="cursor-default bg-blue-500 text-white hover:bg-blue-400 md:ml-3">
                          Zalecane
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
