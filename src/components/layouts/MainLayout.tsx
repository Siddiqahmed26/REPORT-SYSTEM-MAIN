import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';

export default async function LandingLayout({ children }: any) {
  const session = await getServerSession();
  const user = session?.user;
  return (
    <div className='px-6 md:max-w-6xl mx-auto'>
      <nav className='my-6  flex flex-col gap-6 md:flex-row md:gap-0 justify-center md:justify-between'>
        <p className='text-xl text-center'>REPORT SYSTEM</p>
        <div className='flex gap-6 justify-center'>
          {user ? (
            <Link href='/dashboard'>
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href='/auth/sign-in'>
                <Button>Sign in</Button>
              </Link>
              <Link href='/auth/sign-up'>
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
      <div className=''>{children}</div>
      <footer>
        <div className='flex flex-col justify-center  my-6'>
          <p className='text-center'>
            &copy; {new Date().getFullYear()} Report System. All Rights
            Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
