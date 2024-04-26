<script setup>
import { useRouter, useRoute } from "vue-router"
import { ref, computed } from 'vue'
import { useHousesStore } from '../store/houses'
import HouseCardBig from '../components/HouseCardBig.vue'
import HouseCard from '../components/HouseCard.vue'

const router = useRouter();
const route = useRoute();
const housesStore = useHousesStore();

const house = ref();
const recommendedHouses = ref([]);
const houseId = route.params.id;

findRandomHouses();
housesStore.getHouseById(houseId);

function backToOverview() {
  router.push('/');
}

async function findRandomHouses() {
  await housesStore.getAllHouses();
  for (let i = 0; i <= 2; i++){
    let house = housesStore.houses[Math.floor(Math.random() * housesStore.houses.length)];
    recommendedHouses.value.push(house);
  }
}

const showButtons = computed(() => {
  return housesStore.houseDetails.madeByMe ? 'auto' : 'none';
})

</script>

<template>
  <div class="detail-page">
    <div class="page-for-desktop">
      <div>
        <button class="back-button" @click="backToOverview()">
          <img src="../assets/ic_back_grey@3x.png" class="back-button-icon" />
          <p class="back-button-label">Back to overview</p>
        </button>
      </div>
      <div class="row" v-if="housesStore.houses.length > 0 && housesStore.houseDetails" >
        <div class="house-column">
          <HouseCardBig />
        </div>
        <div class="recommendation-column">
          <h3>Recommended for you</h3>
          <div v-for="(house, index) in recommendedHouses" :key="index">
            <HouseCard :houseItem="house" />
          </div>
        </div>
      </div>
    </div>
    <div class="page-for-mobile" v-if="housesStore.houses.length > 0 && housesStore.houseDetails">
      <img :src="housesStore.houseDetails.image" class="house-image" />
      <div class="mobile-buttons-row">
        <button class="back-button-mobile" @click="backToOverview()">
          <img src="../assets/ic_back_white@3x.png" class="back-button-icon" />
        </button>
        <div :style="`display: ${showButtons}`">
          <img src="../assets/ic_edit@3x.png" class="button-image" />
          <img src="../assets/ic_delete@3x.png" class="button-image" />
        </div>
      </div>
      <div class="details-mobile-card">
        <HouseCardBig />
      </div>
      <div class="recommendation-column">
        <h3>Recommended for you</h3>
        <div v-for="(house, index) in recommendedHouses" :key="index">
          <HouseCard :houseItem="house" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-page {
  padding: 2rem 8rem;
  display: block;
  @media (max-width: 400px) {
    padding: 0;
  }
}

.page-for-desktop {
  display: block;
  @media (max-width: 400px) {
    display: none;
  }
}

.back-button {
  border: none;
  min-width: 20%;
  display: flex;
  align-items: center;
  background: var(--bacground-1-color);
}

.back-button-mobile {
  border: none;
  background: transparent;
}

.back-button-icon {
  height: 18px;
  width: 18px;
  margin-right: 1em;
}

.row {
  display: flex;
}

.house-column {
  width: 70%;
}

.recommendation-column {
  display: block;
  @media (max-width: 400px) {
    padding: 1em 2em;
    margin-bottom: 4em;
  }
}

.house-image {
  width: 100%;
}

.mobile-buttons-row {
  display: flex;
  width: -webkit-fill-available;
  justify-content: space-between;
  align-items: center;
  padding: 1.2em;
  position: absolute;
  top: 3em;
  background: transparent;
}

.details-mobile-card {
  display: none;
  @media (max-width: 400px) {
    display: block;
    width: -webkit-fill-available;
    background: var(--backgrund-2-color);
    margin-top: -4em;
    z-index: 10;
    padding: 1.5em 0 1.5em 1.5em;
    position: relative;
    border-radius: 20px 20px 0 0;
  }
}
</style>