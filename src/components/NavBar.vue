
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from "vue-router"

const router = useRouter();
const classNameAbout = ref();
const classNameHouses = ref();
const iconNameAbout = ref();
const iconNameHouses = ref();
const pathName = ref();

pathName.value = window.location.pathname;
classNameHouses.value = pathName.value !== '/about' ? 'active-menu-item' : 'inactive-menu-item'
classNameAbout.value = pathName.value === '/about' ? 'active-menu-item' : 'inactive-menu-item'
iconNameHouses.value = pathName.value !== '/about' ? 'src/assets/ic_mobile_navigarion_home_active@3x.png' : 'src/assets/ic_mobile_navigarion_home@3x.png'
iconNameAbout.value = pathName.value === '/about' ? 'src/assets/ic_mobile_navigarion_info_active@3x.png' : 'src/assets/ic_mobile_navigarion_info@3x.png'

function goToAbout() {
  router.push('/about');
  classNameHouses.value = 'inactive-menu-item';
  classNameAbout.value = 'active-menu-item';
  iconNameHouses.value = 'src/assets/ic_mobile_navigarion_home@3x.png';
  iconNameAbout.value = 'src/assets/ic_mobile_navigarion_info_active@3x.png';
}

function goToHouses() {
  router.push('/');
  classNameHouses.value = 'active-menu-item';
  classNameAbout.value = 'inactive-menu-item';
  iconNameHouses.value = 'src/assets/ic_mobile_navigarion_home_active@3x.png';
  iconNameAbout.value = 'src/assets/ic_mobile_navigarion_info@3x.png';
}
</script>

<template>
  <div>
    <div class="navbar">
      <div class="mobile-navbar">
        <img :src="iconNameHouses" @click="goToHouses()" class="mobile-tab" />
        <img :src="iconNameAbout" @click="goToAbout()" class="mobile-tab" />
      </div>
      <div class="desktop-navbar">
        <img src="../assets/img_logo_dtt@3x.png" class="logo" />
        <div :class="classNameHouses" @click="goToHouses()">Houses</div>
        <div :class="classNameAbout" @click="goToAbout()">About</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  background-color: var(--backgrund-2-color);
  margin: 0;
  padding: 0.5em 7rem;
  display: flex;
  align-items: center;
  -moz-box-shadow: 0 5px 5px rgba(182, 182, 182, 0.75);
  -webkit-box-shadow: 0 5px 5px rgba(182, 182, 182, 0.75);
  box-shadow: 0 5px 5px rgba(182, 182, 182, 0.75);
  @media (max-width: 400px) {
    position: fixed;
    bottom: 0;
    top: unset;
    -moz-box-shadow: 5px 5px 5px 5px rgba(182, 182, 182, 0.75);
    -webkit-box-shadow: 5px 5px 5px 5px rgba(182, 182, 182, 0.75);
    box-shadow: 5px 5px 5px 5px rgba(182, 182, 182, 0.75);
    padding: 0.5rem
  }
}

.logo {
  height: 2rem;
  margin-right: 1.5rem;
}

.desktop-navbar {
  display: flex;
  @media (max-width: 400px) {
    display: none;
  }
}

.mobile-navbar {
  display: none;
  @media (max-width: 400px) {
    display: flex;
    justify-content: space-around;
    width: 100vw;
    align-items: center;
    padding-right: -2em;
  }
}

.mobile-tab {
  height: 1.5rem;
  padding: 0.5em;
}
</style>