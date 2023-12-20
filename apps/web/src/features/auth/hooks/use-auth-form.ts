import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useToast } from '~/components/ui/use-toast';
import { login, register } from '../services/auth-services';
import {
  loginSchema,
  registerSchema,
  type LoginSchema,
  type RegisterSchema,
} from '../utils/schemas';

export function useAuthForm(formType: 'login' | 'register') {
  const form = useForm<typeof formType extends 'login' ? LoginSchema : RegisterSchema>({
    resolver: zodResolver(formType === 'login' ? loginSchema : registerSchema),
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: typeof formType extends 'login' ? LoginSchema : RegisterSchema) => {
      if (formType === 'login') {
        return login(data.email, data.password);
      }

      return register(data.name, data.email, data.password, data.role);
    },
    onSuccess: () => navigate('/home'),
    onError: (error) => {
      console.log(error);

      toast({
        title: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    },
  });

  async function onSubmit(
    formData: typeof formType extends 'login' ? LoginSchema : RegisterSchema,
  ): Promise<void> {
    mutation.mutate(formData);
  }

  return {
    form,
    isLoading: mutation.isPending,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
