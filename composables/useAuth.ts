export const useAuth = () => {
  const session = useState<any>('user', () => null);

  const getSession = async () => {
    const data = await $fetch('/api/auth');
    session.value = data || null;
  };

  const createSession = async () => {
    const session = await $fetch('/api/auth', {
      method: 'POST',
      body: { token: '1', refresh_token: '2' },
    });

    session.value = session;
  };

  const deleteSession = async () => {
    await $fetch('/api/auth', {
      method: 'DELETE',
    });
    session.value = null;
  };

  
  return { session, createSession, getSession, deleteSession };
};
