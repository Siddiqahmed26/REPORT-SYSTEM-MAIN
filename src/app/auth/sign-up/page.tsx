import AuthLayout from '@/components/layouts/AuthLayout';
import RegisterForm from './RegisterForm';

const SignUp = () => {
  return (
    <AuthLayout pageToRedirect='sign-in'>
      <div className='mt-20 flex justify-center items-center flex-col pb-32'>
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
          Create an account
        </h3>
        <p className='mt-2'>Enter your details below to create your account</p>
        <RegisterForm />
      </div>
    </AuthLayout>
  );
};

export default SignUp;
