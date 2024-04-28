<script setup>
import { useRoute, useRouter } from "vue-router"
import { ref, computed } from 'vue'
import { useHousesStore } from '../store/houses'
import HouseCardBig from '../components/HouseCardBig.vue'
import HouseCard from '../components/HouseCard.vue'
import BackToOverviewButton from '../components/BackToOverviewButton.vue'

const route = useRoute();
const router = useRouter();
const housesStore = useHousesStore();

const house = ref();
const recommendedHouses = ref([]);
const houseId = route.params.id;

housesStore.getHouseById(houseId);
findRandomHouses();

async function findRandomHouses() {
  await housesStore.getAllHouses();
  recommendedHouses.value = [...housesStore.houses];
  recommendedHouses.value = recommendedHouses.value
    .filter((house) => 
    !house.madeByMe 
    && (house.price < housesStore.houseDetails.price
    || house.size > housesStore.houseDetails.size)
  );
  recommendedHouses.value = recommendedHouses.value.slice(0, 3)
}

const showButtons = computed(() => {
  return housesStore.houseDetails.madeByMe ? 'auto' : 'none';
})

function backToOverview() {
  router.push('/');
}

function openDialog() {
  housesStore.houseToDelete = houseId;
  const dialog = document.getElementById('isDeleteDialogOpenMobile');
  dialog.style.display = 'flex';
}

function closeDialog() {
  const dialog = document.getElementById('isDeleteDialogOpenMobile')
  dialog.style.display = 'none';
}

async function confirmDelete() {
  try {
    await housesStore.deleteHouse();
    alert('House listing deleted');
    closeDialog();
    router.push('/');
  } catch(e) {
    // handled in the store
  }
}

async function editItem() {
  await housesStore.getHouseById(housesStore.houseDetails.id).then(() => {
    router.push(`/edit/${housesStore.houseDetails.id}`);
  });
}

</script>

<template>
  <div class="detail-page">
    <div class="page-for-desktop">
      <div>
        <BackToOverviewButton />
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
      <dialog id="isDeleteDialogOpenMobile" style="display: none">
        <h2>Delete listing</h2>
        <p class="listing-information">
          Are you sure you want to delete this listing? <br />
          This action cannot be undone.
        </p>
        <button type="button" class="confirm-delete" @click="confirmDelete()">YES, DELETE</button>
        <button type="button" class="cancel-delete" @click="closeDialog()">GO BACK</button>
      </dialog>
      <img 
        v-if="housesStore.houseDetails.image" 
        :src="housesStore.houseDetails.image" 
        class="house-image" 
      />
      <img 
        v-if="housesStore.houseDetails.image === null" 
        src="../assets/img_empty_houses@3x.png"
        class="house-image" 
      />
      <div class="mobile-buttons-row">
        <button class="back-button-mobile" @click="backToOverview()">
          <img src="../assets/ic_back_white@3x.png" class="back-button-icon" />
        </button>
        <div :style="`display: ${showButtons}`">
          <img 
            src="../assets/ic_edit@3x.png" 
            class="button-image" 
            @click="editItem()"
          />
          <img 
            src="../assets/ic_delete@3x.png" 
            class="button-image" 
            @click="openDialog()" 
          />
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

.page-for-mobile {
  display: none;
  @media (max-width: 400px) {
    display: block;
  }
}

.back-button-mobile {
  border: none;
  background: transparent;
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

#isDeleteDialogOpenMobile {
  z-index: 1000;
}
</style>