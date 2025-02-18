export const useUserSession = () => {
  const session = useState<any>('session', () => null);

  const clearSession = async () => {
    await $fetch('/api/auth', {
      method: 'DELETE',
    });

    session.value = null;
  };

  const fetch = async () => {
    session.value = await useRequestFetch()('/api/auth', {
      headers: {
        accept: 'application/json',
      },  
      retry: false,
    })
  }


  const loggedIn = computed(() => !!session.value);
  
  return { session, clearSession, loggedIn, fetch };
};
