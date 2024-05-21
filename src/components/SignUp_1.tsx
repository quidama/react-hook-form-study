'use client';

import React, { InputHTMLAttributes } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const signUpValuesSchema = z
  .object({
    name: z.string().min(2).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(50),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  });

type SignUpValues = z.infer<typeof signUpValuesSchema>;

const ErrorText = ({ children }: { children?: string }) => (
  <>{children && <p className='text-xs text-red-500 pt-1'>{children}</p>}</>
);

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpValuesSchema),
  });

  type TextFieldParams = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'className'
  > & {
    label: string;
    error?: string;
  };

  const TextField = ({ label, error, ...inputParams }: TextFieldParams) => (
    <>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <input
        {...inputParams}
        className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
      />
      <ErrorText>{error}</ErrorText>
    </>
  );

  return (
    <div>
      <main className='flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-400 to-blue-100 p-12'>
        <div className='w-full max-w-xl rounded-xl bg-gray-50 shadow-lg'>
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
          >
            <div className='flex flex-col items-center justify-center p-8'>
              <h1 className='text-2xl font-bold text-gray-900'>Sign Up</h1>
              <div className='mt-4 w-full'>
                <TextField
                  {...register('name')}
                  label='Name'
                  error={errors.name?.message}
                />
              </div>
              <div className='mt-4 w-full'>
                <label className='block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input
                  {...register('email')}
                  className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
                />
                <ErrorText>{errors.email?.message}</ErrorText>
              </div>
              <div className='mt-4 w-full'>
                <label className='block text-sm font-medium text-gray-700'>
                  Password
                </label>
                <input
                  {...register('password')}
                  className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
                />
                <ErrorText>{errors.password?.message}</ErrorText>
              </div>
              <div className='mt-4 w-full'>
                <label className='block text-sm font-medium text-gray-700'>
                  Confirm Password
                </label>
                <input
                  {...register('confirmPassword')}
                  className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
                />
                <ErrorText>{errors.confirmPassword?.message}</ErrorText>
              </div>
              <div className='mt-4 w-full'>
                <button
                  type='submit'
                  className='w-full rounded-md bg-blue-500 px-3 py-4 text-white focus:bg-blue-600 focus:outline-none'
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
