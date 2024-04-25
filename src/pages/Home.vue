<script setup>
import { useHousesStore } from '../store/houses'
import { useRouter } from "vue-router"
import { ref } from 'vue'
import HouseCard from '../components/HouseCard.vue'

const router = useRouter();
const housesStore = useHousesStore();

const searchItem = ref();
const filter = ref();

housesStore.getAllHouses();
function goToCreate() {
  router.push('/create');
}

function searchHouses() {
  console.log(searchItem.value);
}
</script>

<template>
  <div class="home-page">
    <div class="title-row">
      <h1>Houses</h1>
      <button class="add-button" @click="goToCreate">+ CREATE NEW</button>
    </div>
    <div class="filter-row">
      <div class="input_container">
          <input 
            v-model.lazy="searchItem" 
            type="text" 
            class="input-area" 
            placeholder="Search for houses"
            @keyup.enter="searchHouses()"
          >
          <img src="../assets/ic_search@3x.png" class="input_img">
      </div>
    </div>
    <div>
      <div v-for="house in housesStore.houses" :key="house.id">
        <HouseCard :houseItem="house" />
      </div>
    </div>
  </div>
    <!-- {{ housesStore.houses }} -->
</template>

<style scoped>
.home-page {
  padding: 2rem 8rem;
  display: block;
  @media (max-width: 400px) {
    padding: 1.5rem;
  }
}

.title-row {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
}

.filter-row {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2em;
}

.add-button {
  background: var(--primary-color);
  border: none;
  padding: .4em .9em;
  border-radius: 7px;
  color: var(--tertiary-color);
}

.input_container { 
  position: relative;
  padding: 0;
  margin: 0;
  background: var(--tertiary-color);
  border: none;
  border-radius: 5px;
}

.input-area { 
  padding: .5em .9em;
  margin-left: 1.5em;
  background: var(--tertiary-color);
  border: none;
  border-radius: 5px;
}

.input_img {
  position:absolute;
  bottom: 10px;
  left: 10px;
  width:  12px;
  height: 12px;
}
</style>