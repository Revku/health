'use client';

import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProfilePage() {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const [creationDate, setCreationDate] = useState<string>('');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (user?.metadata.creationTime) {
      const date = new Date(user.metadata.creationTime);
      setCreationDate(date.toLocaleDateString('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }));
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Błąd wylogowania:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-500 mb-2">
          Witaj, {user.email?.split('@')[0] || 'Użytkowniku'}!
        </h1>
        <p className="text-base text-muted-foreground">
          Zarządzaj swoim kontem i śledź swoje osiągnięcia zdrowotne
        </p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Twoje konto</TabsTrigger>
          <TabsTrigger value="stats">Statystyki</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">Informacje o koncie</CardTitle>
              <CardDescription>
                Podstawowe informacje dotyczące Twojego konta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                  <p className="text-base">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Data utworzenia konta</p>
                  <p className="text-base">{creationDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                  <Badge className="bg-blue-500 hover:bg-blue-600">Aktywne</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Weryfikacja email</p>
                  <Badge className={user.emailVerified ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"}>
                    {user.emailVerified ? 'Zweryfikowany' : 'Niezweryfikowany'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Wyloguj się
          </Button>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Twoje statystyki zdrowotne</CardTitle>
              <CardDescription>
                Podsumowanie Twoich pomiarów i aktywności
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border border-blue-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-blue-500">BMI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">--</p>
                    <p className="text-sm text-muted-foreground">Nie masz jeszcze pomiarów</p>
                  </CardContent>
                </Card>

                <Card className="border border-blue-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-blue-500">Kalorie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">--</p>
                    <p className="text-sm text-muted-foreground">Nie masz jeszcze pomiarów</p>
                  </CardContent>
                </Card>

                <Card className="border border-blue-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-blue-500">Woda</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">--</p>
                    <p className="text-sm text-muted-foreground">Nie masz jeszcze pomiarów</p>
                  </CardContent>
                </Card>

                <Card className="border border-blue-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-blue-500">Sen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">--</p>
                    <p className="text-sm text-muted-foreground">Nie masz jeszcze pomiarów</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
