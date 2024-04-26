<script setup>
import { useHousesStore } from '../store/houses'
import { useRouter } from "vue-router"
import { ref, computed } from 'vue'
import HouseCard from '../components/HouseCard.vue'

const router = useRouter();
const housesStore = useHousesStore();

const searchItem = ref();
const filter = ref();
const housesList = ref();

getHouses();

function goToCreate() {
  router.push('/create');
}

function searchHouses() {
  if (searchItem.value.length === 0) {
    housesList.value = housesStore.houses;
    return;
  }
  housesList.value = housesList.value.filter((item) => {
    if (item.location.city.toLowerCase().includes(searchItem.value.toLowerCase())) {
      return item;
    }
    if (item.location.street.toLowerCase().includes(searchItem.value.toLowerCase())) {
      return item;
    }
    if (item.location.zip.toLowerCase().includes(searchItem.value.toLowerCase())) {
      return item;
    }
    if (item.description.toLowerCase().includes(searchItem.value.toLowerCase())) {
      return item;
    }
  })
}

async function getHouses() {
  await housesStore.getAllHouses();
  housesList.value = JSON.parse(JSON.stringify(housesStore.houses));
}

const priceButtonColor = computed(() => {
  return filter.value === 'price' ? 'var(--primary-color)' : 'var(--quaternary-color)'
})

const sizeButtonColor = computed(() => {
  return filter.value === 'size' ? 'var(--primary-color)' : 'var(--quaternary-color)'
})

function sortPrice() {
  filter.value = filter.value === 'price' ? null : 'price';
  if (filter.value === null) {
    housesList.value = housesStore.houses;
    return;
  }
  housesList.value.sort((a, b) => (a.price > b.price ? 1 : -1));
}

function sortSize() {
  filter.value = filter.value === 'size' ? null : 'size';
  if (filter.value === null) {
    housesList.value = housesStore.houses;
    return;
  }
  housesList.value.sort((a, b) => (a.size > b.size ? 1 : -1));
}
</script>

<template>
  <div class="home-page">
    <div class="title-row-desktop">
      <h1>Houses</h1>
      <button class="add-button" @click="goToCreate">
        <img src="../assets/ic_plus_white@3x.png" class="plus-image" />
        CREATE NEW
      </button>
    </div>
    <div class="title-row-mobile">
      <div class="mobile-title">
        <h1>Houses</h1>
      </div>
      <div class="mobile-title-button">
        <img src="../assets/ic_plus_grey@3x.png" @click="goToCreate" class="plus-button" />
      </div>
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
      <div class="buttons-container">
        <button class="price-button" @click="sortPrice()" :style="`background: ${priceButtonColor}`">Price</button>
        <button class="size-button" @click="sortSize()" :style="`background: ${sizeButtonColor}`">Size</button>
      </div>
    </div>
    <div class="houses-list">
      <div v-for="house in housesList" :key="house.id">
        <HouseCard :houseItem="house" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  padding: 2rem 8rem;
  display: block;
  @media (max-width: 400px) {
    padding: 1.5rem;
  }
}

.title-row-desktop {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
  @media (max-width: 400px) {
    display: none;
  }
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

.mobile-title {
  grid-area: 1/3/2/5;
  display: flex;
  justify-content: center;
}

.mobile-title-button {
  grid-area: 1/6/2/7;
  display: flex;
  align-items: center;
  justify-content: end;
}

.plus-button {
  height: 1.2em;
  width: 1.2em;
  cursor: pointer;
}

.filter-row {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1em;
  @media (max-width: 750px) {
    display: block;
  }
}

.add-button {
  background: var(--primary-color);
  border: none;
  padding: .4em .9em;
  border-radius: 7px;
  color: var(--tertiary-color);
}

.price-button {
  padding: .3em 3em .3em 3em;
  border: none;
  border-radius: 7px 0 0 7px;
  color: var(--tertiary-color);
  @media (max-width: 750px) {
    margin-top: 1em;
    width: 50%;
  }
}

.size-button {
  padding: .3em 3em .3em 3em;
  border: none;
  border-radius: 0 7px 7px 0;
  color: var(--tertiary-color);
  @media (max-width: 750px) {
    margin-top: 1em;
    width: 50%;
  }
}

.input_container { 
  position: relative;
  padding: 0;
  margin: 0;
  background: var(--tertiary-color);
  border: none;
  border-radius: 5px;
  min-width: 30%;
}

.input-area { 
  padding: .5em 1em;
  margin-left: 1.5em;
  background: var(--tertiary-color);
  border: none;
  border-radius: 5px;
  min-width: 85%;
}

input:focus { 
  outline: none;
}

.input_img {
  position:absolute;
  bottom: 10px;
  left: 10px;
  width:  12px;
  height: 12px;
}

.plus-image {
  width:  12px;
  height: 12px;
}

.houses-list {
  margin-bottom: 3em;
}
</style>