import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../utils/auth';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== 'ADMIN') {
    redirect('/denied');
  }

  return <section className='flex flex-col gap-6'>Admin Page</section>;
}
