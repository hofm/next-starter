import { getServerSession } from 'next-auth';
import { authOptions } from './utils/auth';
import LogoutButton from '@/components/LogoutButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>Next TS Starter</h1>
        {session ? (
          <>
            <p>You are logged in</p>
            <LogoutButton />
          </>
        ) : (
          <div>
            <p>You are not logged in</p>
            <Button asChild>
              <Link href='/auth'>Login</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
