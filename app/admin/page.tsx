import { redirect } from 'next/navigation';
import { getServerAuthSession } from '../utils/auth';

export default async function AdminPage() {
  const session = await getServerAuthSession();

  if (session?.user.role !== 'ADMIN') {
    redirect('/denied');
  }

  return <section className='flex flex-col gap-6'>Admin Page</section>;
}
