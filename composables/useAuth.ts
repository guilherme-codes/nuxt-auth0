export const useAuth = () => {
  const session = useState<any>('user', () => null);

  const getSession = async () => {
    const data = await $fetch('/api/auth');
    session.value = data || null;
  };

  const createSession = async (token: string, refresh_token: string) => {
    const session = await $fetch('/api/auth', {
      method: 'POST',
      body: { token, refresh_token },
    });

    session.value = session;
  };

  const updateSession = async (data: any) => {
    await $fetch('/api/auth', {
      method: 'PATCH',
      body: data,
    });

    await getSession();
  }

  const deleteSession = async () => {
    await $fetch('/api/auth', {
      method: 'DELETE',
    });
    session.value = null;
  };

  
  return { session, createSession, getSession, updateSession, deleteSession };
};
