import { useQuery } from '@tanstack/react-query';

import { getProfile } from '../services/auth-services';

export function useProfile() {
  const { data, isPending, isFetching } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  return {
    isLoading: isPending || isFetching,
    profile: data,
  };
}
