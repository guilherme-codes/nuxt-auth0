<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { loggedIn } = useUserSession();
</script>