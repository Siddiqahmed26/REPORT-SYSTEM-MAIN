import { Toaster } from 'sonner';
import { getServerSession } from 'next-auth';
import LogoutButton from '../common/LogoutButton';
import { Button } from '../ui/button';
import Report from '../common/Report';
import Link from 'next/link';
import SOS from '../common/SOS';

export default async function DashboardLayout({
  option,
  groupId,
  children,
}: any) {
  const session = await getServerSession();
  const user = session?.user;

  return (
    <div>
      <div className='flex flex-col'>
        <div className='w-full xl:max-w-[1500px] mx-auto px-6'>
          <div className='my-6 flex flex-col md:flex-row gap-6  gap-0 justify-between'>
            <div className='flex gap-4 items-center'>
              {user?.email === 'admin@saividya.ac.in' ? (
                <p className='text-xl text-center'>REPORT SYSTEM</p>
              ) : (
                <>
                  {/* SOS */}
                  <SOS />
                  {/* REPORT */}
                  <Report />
                  <Link href={'/history'}>
                    <Button variant={'default'}>History</Button>
                  </Link>
                </>
              )}
            </div>
            <div className='flex flex-row gap-8 items-center'>
              <LogoutButton />
            </div>
          </div>
        </div>
        <div className='w-full xl:max-w-[1500px] mx-auto px-6'>
          <div className='min-h-screen '>{children}</div>
          <footer className='mt-12'>
            <div className='flex flex-col justify-center  my-6'>
              <p className='text-center'>
                &copy; {new Date().getFullYear()} Report System. All Rights
                Reserved.
              </p>
            </div>
          </footer>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
