import { useMutation } from '@tanstack/react-query';

import { useToast } from '~/components/ui/use-toast';
import { logout } from '../services/auth-services';

export function useLogout() {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.location.href = '/login';
    },
    onError: (error) => {
      toast({
        title: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    },
  });

  async function handleLogout(): Promise<void> {
    mutation.mutate();
  }

  return {
    isLoading: mutation.isPending,
    handleLogout,
  };
}
