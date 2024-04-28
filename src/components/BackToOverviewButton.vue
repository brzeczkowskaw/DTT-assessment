<script setup>
import { useRouter } from "vue-router"

const router = useRouter();

function backToOverview() {
  router.push('/');
}
</script>

<template>
  <div>
    <button class="back-button" @click="backToOverview()">
      <img src="../assets/ic_back_grey@3x.png" class="back-button-icon" />
      <p class="back-button-label">Back to overview</p>
    </button>
  </div>
</template>

<style scoped>
.back-button {
  border: none;
  min-width: 20%;
  display: flex;
  align-items: center;
  background: var(--bacground-1-color);
}
</style>