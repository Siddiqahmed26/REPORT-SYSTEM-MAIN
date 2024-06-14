import React from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';
import LoginForm from './LoginForm';

const SignIn = () => {
  return (
    <AuthLayout pageToRedirect='sign-up'>
      <div className='mt-20 flex justify-center items-center flex-col pb-32'>
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
          Log in to your account
        </h3>
        <p className='mt-2'>
          Enter your details below to log in to your account
        </p>
        <LoginForm />
      </div>
    </AuthLayout>
  );
};

export default SignIn;
