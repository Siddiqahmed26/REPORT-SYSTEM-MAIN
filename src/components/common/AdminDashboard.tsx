import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import ButtonAction from './ButtonAction';

export default async function page() {
  const session = await getServerSession();
  const user = session?.user;

  let tableItems = await prisma.reports.findMany({});

  return (
    <DashboardLayout className='max-w-screen-xl mx-auto px-4 md:px-8'>
      <div className='max-w-lg'>
        <h3 className='text-gray-800 text-xl font-bold sm:text-2xl'>Reports</h3>
        <p className='text-gray-600 mt-2'>
          The list of all incidents reported.
        </p>
      </div>
      <div className='mt-12 shadow-sm border rounded-lg overflow-x-auto'>
        {tableItems.length > 0 ? (
          <table className='w-full table-auto text-sm text-left'>
            <thead className='bg-gray-50 text-gray-600 font-medium border-b'>
              <tr>
                <th className='py-3 px-6'>Descrption</th>
                <th className='py-3 px-6'>Category</th>
                <th className='py-3 px-6'>Coordinates</th>
                <th className='py-3 px-6'>Status</th>
              </tr>
            </thead>
            <tbody className='text-gray-600 divide-y'>
              {tableItems.map((item, idx) => (
                <tr key={idx}>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {item.description || 'NA'}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {item.category}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {item.coordinates}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {item.status === 'pending' ? (
                      <ButtonAction item={item} />
                    ) : (
                      <Button disabled>Cleared</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Data Found</p>
        )}
      </div>
    </DashboardLayout>
  );
}
