<script setup>
import BackToOverviewButton from '../components/BackToOverviewButton.vue'
import Form from '../components/Form.vue'
import { computed, ref } from 'vue'
import { useHousesStore } from '../store/houses'
import { useRouter, useRoute } from "vue-router"

const router = useRouter();
const route = useRoute();

const housesStore = useHousesStore();

const isEditHouse = computed(() => {
  return window.location.pathname.includes('/edit');
})

if (!isEditHouse) {
  const houseId = route.params.id;
  housesStore.getHouseById(houseId);
}

function backToOverview() {
  router.push('/');
}
</script>

<template>
  <div class="edit-page">
    <div class="title-row-desktop">
      <BackToOverviewButton />
      <h1>Edit listing</h1>
    </div>
    <div class="title-row-mobile">
      <div class="mobile-title-button">
        <img src="../assets/ic_back_grey@3x.png" @click="backToOverview()" class="back-button" />
      </div>
      <div class="mobile-title">
        <h1>Edit listing</h1>
      </div>
    </div>
    <div class="form-area" v-if="!housesStore.isLoading">
      <Form :createNew="!isEditHouse" />
    </div>
  </div>
</template>

<style scoped>
.title-row-desktop {
  display: block;
  @media (max-width: 400px) {
    display: none;
  }
}

.mobile-title {
  grid-area: 1/2/3/6;
  display: flex;
  justify-content: center;
}

.mobile-title-button {
  grid-area: 1/1/2/1;
  display: flex;
  align-items: center;
  justify-content: start;
}

.back-button {
  height: 1.2em;
  width: 1.2em;
  cursor: pointer;
}

.title-row-mobile {
  display: none;
  @media (max-width: 400px) {
    display: grid;
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(6, 1fr);
    gap: 0;
    width: 100%;
    height: 100%;
    margin-bottom: 1em;
  }
}

.edit-page {
  background-image: url('../assets/img_background@3x.png');
  background-size: cover;
  max-width: 100vw;
  min-height: 100vh;
  margin-top: -1em;
  padding: 2rem 8rem;
  @media (max-width: 400px) {
    padding: 1.5em;
  }
}

.form-area {
  max-width: 25vw;
  @media (max-width: 800px) {
    min-width: 90%;
  }
}
</style>