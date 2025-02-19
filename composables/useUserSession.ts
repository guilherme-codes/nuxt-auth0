import { appendResponseHeader } from 'h3'

export const useUserSession = () => {
  const session = useState<any>('session', () => null);
  const serverEvent = import.meta.server ? useRequestEvent() : null
  const loggedIn = computed(() => !!session.value);

  const fetch = async () => {
    session.value = await useRequestFetch()('/api/auth', {
      headers: {
        accept: 'application/json',
      },  
      retry: false,
    })
  }

  const clearSession = async () => {
    const res = await $fetch.raw('/api/auth', {
      method: 'DELETE',
    });

    const cookies = res.headers.getSetCookie()
    
    if (import.meta.server && serverEvent) {
      for (const cookie of cookies) {
        appendResponseHeader(serverEvent, 'set-cookie', cookie)
      }
    }

    session.value = null;
  };

  
  return { session, clearSession, loggedIn, fetch };
};
