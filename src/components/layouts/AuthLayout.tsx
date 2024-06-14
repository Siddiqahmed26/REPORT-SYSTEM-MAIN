import Link from 'next/link';
import { Button } from '../ui/button';

export default async function LandingLayout({ children, pageToRedirect }: any) {
  return (
    <div className='px-6 md:max-w-6xl mx-auto'>
      <nav className='my-6  flex flex-col gap-6 md:flex-row md:gap-0 justify-center md:justify-between'>
        <Link href={'/'}>
          <p className='text-xl text-center'>REPORT SYSTEM</p>
        </Link>
        {pageToRedirect === 'sign-up' ? (
          <Link href={'/auth/sign-up'}>
            <Button variant='ghost'>Sign Up</Button>
          </Link>
        ) : (
          <Link href={'/auth/sign-in'}>
            <Button variant='ghost'>Sign in</Button>
          </Link>
        )}
      </nav>
      <div>{children}</div>
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
