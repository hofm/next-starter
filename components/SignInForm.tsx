'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';

export default function SignInForm() {
  const [email, setEmail] = useState<null | string>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const signInResult = await signIn('email', {
      email,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });

    if (!signInResult?.ok) {
      return toast({
        title: 'Well this did not work...',
        description: 'An error occurred while signing in with email',
        variant: 'destructive',
      });
    }

    return toast({
      title: 'Check your email',
      description: 'A magic link has been sent to you',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-y-2'>
        <Label>Email</Label>
        <Input
          onChange={e => setEmail(e.target.value)}
          name='email'
          type='email'
          placeholder='name@example.com'
        />
      </div>
      <Button type='submit' className='mt-4 w-full'>
        Login with Email
      </Button>
    </form>
  );
}
