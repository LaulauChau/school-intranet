import { LogOut } from 'lucide-react';
import type { JSX } from 'react';

import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Spinner } from '~/components/ui/spinner';
import { useLogout } from '../hooks/use-logout';
import { useProfile } from '../hooks/use-profile';

export function UserAvatar(): JSX.Element | null {
  const { handleLogout, isLoading: isLogoutLoading } = useLogout();
  const { profile, isLoading: isProfileLoading } = useProfile();

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async function handleClick() {
    await handleLogout();
  }

  if (isProfileLoading) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <span className='inline-flex items-center gap-x-2 text-sm font-semibold leading-6 text-white'>
          <Avatar>
            <AvatarFallback className='bg-primary '>
              {profile?.name?.charAt(0).toUpperCase()}
              {profile?.name?.charAt(1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{capitalizeFirstLetter(profile?.name ?? '')}</span>
        </span>
      </PopoverTrigger>
      <PopoverContent>
        <Button
          variant='outline'
          className='bg-destructive hover:bg-destructive/60 w-full text-left font-semibold'
          onClick={handleClick}
        >
          {isLogoutLoading ? (
            <>
              <Spinner className='mr-2' />
              <span>Logging out...</span>
            </>
          ) : (
            <>
              <LogOut className='mr-2' />
              <span>Log out</span>
            </>
          )}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
