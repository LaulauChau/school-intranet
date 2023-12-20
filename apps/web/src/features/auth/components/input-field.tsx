import type { JSX } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useAuthField } from '../hooks/use-auth-field';

export function InputField<T extends FieldValues>({
  control,
  name,
}: {
  control: Control<T>;
  name: keyof T;
}): JSX.Element {
  const { formatedName, inputType } = useAuthField(name as string);

  return (
    <FormField
      control={control}
      name={name as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='block text-sm font-semibold leading-6 text-gray-900'>
            {formatedName}
          </FormLabel>
          <FormControl>
            <Input
              className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              placeholder={formatedName}
              type={inputType}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
