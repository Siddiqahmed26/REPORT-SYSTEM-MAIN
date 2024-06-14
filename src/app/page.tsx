import * as React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import LandingAnimation from '@/components/common/LandingAnimation';

const Index = async () => {
  return (
    <MainLayout>
      <div className=' text-center'>
        <p className='text-3xl md:text-5xl  mt-24 '>
          Community based safety and reporting system
        </p>
        <p className='mt-6 text-md md:w-2/3 mx-auto '>
          A reporting system specifically built for your college/university to
          ensure safety of the students.
        </p>
        <LandingAnimation />
      </div>
    </MainLayout>
  );
};

export default Index;
