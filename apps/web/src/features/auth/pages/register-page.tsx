import type { JSX } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '~/components/ui/button';
import { Form } from '~/components/ui/form';
import { Spinner } from '~/components/ui/spinner';
import { InputField } from '../components/input-field';
import { SelectField } from '../components/select-field';
import { useAuthForm } from '../hooks/use-auth-form';

export function RegisterPage(): JSX.Element {
  const { form, isLoading, onSubmit } = useAuthForm('register');

  return (
    <Form {...form}>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h1 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            {'Create your account'}
          </h1>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={onSubmit}>
            {['name', 'email', 'password', 'confirmPassword'].map((name) => (
              <InputField
                key={name}
                control={form.control}
                name={name as 'name' | 'email' | 'password' | 'confirmPassword'}
              />
            ))}

            <SelectField control={form.control} name='role' values={['TEACHER', 'STUDENT']} />

            <Button className='w-full font-semibold' type='submit'>
              {isLoading ? (
                <span className='flex justify-center'>
                  <Spinner />
                  {'Creating account...'}
                </span>
              ) : (
                'Create account'
              )}
            </Button>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Already have an account?{' '}
            <Link
              to='/auth/login'
              className='font-semibold leading-6 text-gray-900 hover:underline'
            >
              {'Sign in now'}
            </Link>
          </p>
        </div>
      </div>
    </Form>
  );
}
