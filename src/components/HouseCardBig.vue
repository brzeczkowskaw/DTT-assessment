<script setup>
import { useRouter, useRoute } from "vue-router"
import { ref, computed } from 'vue'
import { useHousesStore } from '../store/houses'


const router = useRouter();
const route = useRoute();
const housesStore = useHousesStore();

const houseId = computed(() => {
  return route.params.id;
})
housesStore.getHouseById(houseId.value);

const showButtons = computed(() => {
  return housesStore.houseDetails.madeByMe ? 'auto' : 'none';
})

const houseHasGarage = computed(() => {
  return housesStore.houseDetails.hasGarage ? 'Yes' : 'No';
})

function numberWithDots(number) {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}

function openDialog() {
  housesStore.houseToDelete = houseId;
  const dialog = document.getElementById('isDeleteDialogOpen')
  dialog.style.display = 'flex';
}

function closeDialog() {
  const dialog = document.getElementById('isDeleteDialogOpen')
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
  await housesStore.getHouseById(houseId._value).then(() => {
    router.push(`/edit/${houseId._value}`);
  });
}
</script>

<template>
  <div class="house-big-card" :loading="housesStore.isLoading" v-if="housesStore.houseDetails">
    <div>
      <img 
        v-if="!!housesStore.houseDetails.image"
        :src="housesStore.houseDetails.image" 
        class="house-image" 
      />
      {{ housesStore.houseDetails.image }}
      <img 
        v-if="housesStore.houseDetails.image === null" 
        src="../assets/img_empty_houses@3x.png"
        class="house-image" 
      />
    </div>
    <div class="info-area">
      <div class="title-row">
        <h2 class="address">{{ housesStore.houseDetails.location.street }} {{ housesStore.houseDetails.location.houseNumber }}</h2>
        <div class="buttons-area buttons-area-mobile" :style="`display: ${showButtons}`">
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
      <div class="info-row">
        <div class="detail-line">
          <img src="../assets/ic_location@3x.png" class="detail-image-loc" />
          <p class="listing-information">
            {{ housesStore.houseDetails.location.zip }} {{ housesStore.houseDetails.location.city }}
          </p>
        </div>
        <div class="detail-line">
          <div class="image-and-text">
            <img src="../assets/ic_price@3x.png" class="detail-image" />
            <p class="listing-information">
              {{ numberWithDots(housesStore.houseDetails.price) }}
            </p>
          </div>
          <div class="image-and-text">
            <img src="../assets/ic_size@3x.png" class="detail-image" />
            <p class="listing-information">
              {{ housesStore.houseDetails.size }} m2
            </p>
          </div>
          <div class="image-and-text">
            <img src="../assets/ic_construction_date@3x.png" class="detail-image" />
            <p class="listing-information">
              Build in {{ housesStore.houseDetails.constructionYear }}
            </p>
          </div>
        </div>
        <div class="detail-line">
          <div class="image-and-text">
            <img src="../assets/ic_bed@3x.png" class="detail-image" />
            <p class="listing-information">
              {{ housesStore.houseDetails.rooms.bedrooms }}
            </p>
          </div>
          <div class="image-and-text">
            <img src="../assets/ic_bath@3x.png" class="detail-image" />
            <p class="listing-information">
              {{ housesStore.houseDetails.rooms.bathrooms }}
            </p>
          </div>
          <div class="image-and-text">
            <img src="../assets/ic_garage@3x.png" class="detail-image" />
            <p class="listing-information">
              {{ houseHasGarage }}
            </p>
          </div>
        </div>
      </div>
      <div class="description-row">
        <p class="listing-information">
          {{ housesStore.houseDetails.description }}
        </p>
      </div>
    </div>
    <dialog id="isDeleteDialogOpen" style="display: none">
      <h2>Delete listing</h2>
      <p class="listing-information">
        Are you sure you want to delete this listing? <br />
        This action cannot be undone.
      </p>
      <button type="button" class="confirm-delete" @click="confirmDelete()">YES, DELETE</button>
      <button type="button" class="cancel-delete" @click="closeDialog()">GO BACK</button>
    </dialog>
  </div>
</template>

<style scoped>
.house-big-card {
  display: block;
  width: -webkit-fill-available;
  margin: 1em 4.5em 0 0;
  background: var(--backgrund-2-color);
}

.buttons-area-mobile {
  @media (max-width: 400px) {
    display: none;
  }
}

.house-image {
  width: 100%;
  @media (max-width: 400px) {
    display: none;
  }
}

.info-area {
  padding: .4em .9em;
  @media (max-width: 400px) {
    width: 100%
  }
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info-row {
  display: block;
}

.description-row {
  padding-right: 1.2em;
  text-align: justify;
}

.address {
  margin: .5em 0;
}

.detail-line {
  display: flex;
  align-items: center;
  height: 30px;
  margin-bottom: .3em;
}

.detail-image-loc {
  height: 20px;
  margin-right: 10px;
}

.image-and-text {
  display: flex;
  align-items: center;
  margin-right: 1.5em;
}
</style>