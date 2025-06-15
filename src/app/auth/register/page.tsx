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

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const { createAccount } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await createAccount(data.email, data.password);
      router.push('/profile');
    } catch (err: any) {
      let errorMessage = 'Wystąpił błąd podczas rejestracji';

      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'Ten adres email jest już używany';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Nieprawidłowy adres email';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Hasło jest za słabe - powinno mieć co najmniej 6 znaków';
      }

      setError(errorMessage);
      console.error('Błąd rejestracji:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-300px)] p-4">
      <Card className="w-full max-w-md shadow-lg border-opacity-50">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-2xl font-bold text-center text-blue-500">Rejestracja</CardTitle>
          <CardDescription className="text-center text-base">
            Utwórz konto, aby korzystać z wszystkich funkcji aplikacji
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
              <Label htmlFor="password" className="text-sm font-medium">Hasło</Label>
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Potwierdź hasło</Label>
              <Input
                id="confirmPassword"
                type="password"
                name={register('confirmPassword', {
                  required: 'Potwierdzenie hasła jest wymagane',
                  validate: value => value === password || 'Hasła nie są identyczne'
                }).name}
                onChange={register('confirmPassword').onChange}
                onBlur={register('confirmPassword').onBlur}
                ref={register('confirmPassword').ref}
                className={`${errors.confirmPassword ? 'border-red-500' : ''} h-10 focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Rejestracja...' : 'Zarejestruj się'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 pb-6">
          <p className="text-sm text-muted-foreground">
            Masz już konto?{' '}
            <Link href="/auth/login" className="text-blue-500 hover:text-blue-600 transition-colors font-medium">
              Zaloguj się
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
