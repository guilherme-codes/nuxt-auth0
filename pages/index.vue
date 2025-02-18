<script setup lang="ts">
const { data: session } = await useFetch('/api/auth');
const { createSession } = useAuth();

</script>

<template>
  <div>
    <p v-if="session">session: {{ session }}</p>
    <p v-else>no session</p>
    <button @click="createSession">Create session</button>
  </div>
</template>
