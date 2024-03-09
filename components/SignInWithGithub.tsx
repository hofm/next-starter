'use client';

import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

export default function SignInWithGithub() {
  return (
    <Button
      className='mt-6'
      variant='secondary'
      onClick={() =>
        signIn('github', {
          callbackUrl: `${window.location.origin}`,
        })
      }
    >
      Login with Github
    </Button>
  );
}
