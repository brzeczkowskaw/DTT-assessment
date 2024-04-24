<script setup>
import { ref } from 'vue'

const mainText = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
const subText = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
</script>

<template>
  <div class="about">
    <div>
      <h1 class="mobile-title">About</h1>
      <h2>About DTT Real Estate</h2>
      <p>{{ mainText }}</p>
      <p>{{ subText }}</p>
      <h2>Design and development</h2>
      <dev class="logo-space">
        <img src="../assets/img_logo_dtt@3x.png" class="logo" />
        <div>
          <p class="contact-text">By DTT</p>
          <a href="http://www.d-tt.nl" class="contact-text">www.d-tt.nl</a>
        </div>
      </dev>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 2rem 7rem;
  display: block;
  @media (max-width: 400px) {
    padding: 2rem;
  }
}

.mobile-title {
  display: none;
  @media (max-width: 400px) {
    display: block;
    text-align: center;
    margin-bottom: 2rem;
  }
}

.logo {
  height: 3.5rem;
  margin-right: 2rem;
  @media (max-width: 400px) {
    height: 2rem;
    margin-right: 1rem;
  }
}

.logo-space {
  display: flex;
  align-items: center;
}

.contact-text {
  padding: 0;
  margin: 0;
}
</style>