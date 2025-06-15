'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { logIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await logIn(data.email, data.password);
      router.push('/profile');
    } catch (err: any) {
      let errorMessage = 'Wystąpił błąd podczas logowania';

      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = 'Nieprawidłowy email lub hasło';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Zbyt wiele nieudanych prób logowania. Spróbuj ponownie później';
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-300px)] p-4">
      <Card className="w-full max-w-md shadow-lg border-opacity-50">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-2xl font-bold text-center text-blue-500">Logowanie</CardTitle>
          <CardDescription className="text-center text-base">
            Wprowadź dane logowania, aby uzyskać dostęp do swojego konta
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="jan.kowalski@example.com"
                name={register('email', {
                  required: 'Email jest wymagany',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Wprowadź poprawny adres email'
                  }
                }).name}
                onChange={register('email').onChange}
                onBlur={register('email').onBlur}
                ref={register('email').ref}
                className={`${errors.email ? 'border-red-500' : ''} h-10 focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Hasło</Label>
              </div>
              <Input
                id="password"
                type="password"
                name={register('password', {
                  required: 'Hasło jest wymagane',
                  minLength: {
                    value: 6,
                    message: 'Hasło musi mieć co najmniej 6 znaków'
                  }
                }).name}
                onChange={register('password').onChange}
                onBlur={register('password').onBlur}
                ref={register('password').ref}
                className={`${errors.password ? 'border-red-500' : ''} h-10 focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Logowanie...' : 'Zaloguj się'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 pb-6">
          <p className="text-sm text-muted-foreground">
            Nie masz konta?{' '}
            <Link href="/auth/register" className="text-blue-500 hover:text-blue-600 transition-colors font-medium">
              Zarejestruj się
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
