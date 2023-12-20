import type { JSX } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useAuthField } from '../hooks/use-auth-field';

export function SelectField<T extends FieldValues>({
  control,
  name,
  values,
}: {
  control: Control<T>;
  name: keyof T;
  values: string[];
}): JSX.Element {
  const { formatedName, capitalizeFirstLetter } = useAuthField(name as string);

  return (
    <FormField
      control={control}
      name={name as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='block text-sm font-semibold leading-6 text-gray-900'>
            {formatedName}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={formatedName} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {values.map((value) => (
                <SelectItem key={value} value={value}>
                  {capitalizeFirstLetter(value)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
