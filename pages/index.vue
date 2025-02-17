<script setup lang="ts">
const { session, createSession } = useAuth();

const handleLogin = async () => {
  await createSession('admin', 'password');
};

</script>

<template>
  <div>
    <p v-if="session">Welcome, {{ session }}</p>

    <button  @click="handleLogin">Create Session</button>
    <br><br>
  </div>
</template>
