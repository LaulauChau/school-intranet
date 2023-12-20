import type { JSX } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '~/components/ui/button';
import { Form } from '~/components/ui/form';
import { Spinner } from '~/components/ui/spinner';
import { InputField } from '../components/input-field';
import { useAuthForm } from '../hooks/use-auth-form';

export function LoginPage(): JSX.Element {
  const { form, isLoading, onSubmit } = useAuthForm('login');

  return (
    <Form {...form}>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h1 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            {'Sign in to your account'}
          </h1>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={onSubmit}>
            {['email', 'password'].map((name) => (
              <InputField key={name} control={form.control} name={name as 'email' | 'password'} />
            ))}

            <Button className='w-full font-semibold' type='submit'>
              {isLoading ? (
                <span className='flex justify-center'>
                  <Spinner />
                  {'Logging in...'}
                </span>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Don't have an account?{' '}
            <Link
              to='/auth/register'
              className='font-semibold leading-6 text-gray-900 hover:underline'
            >
              {'Sign up now'}
            </Link>
          </p>
        </div>
      </div>
    </Form>
  );
}
