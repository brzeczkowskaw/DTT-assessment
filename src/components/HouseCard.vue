<script setup>
import { useHousesStore } from '../store/houses'
import { useRouter } from "vue-router"
import { ref, computed } from 'vue'

const router = useRouter();
const housesStore = useHousesStore();

const props = defineProps({
  houseItem: {
    required: true,
  }
})

const showButtons = computed(() => {
  return props.houseItem.madeByMe ? 'auto' : 'none';
})

function goToDetails() {
  router.push(`/details/${props.houseItem.id}`)
}

function openDialog() {
  housesStore.houseToDelete = props.houseItem.id;
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
  } catch(e) {
    // handled in the store
  }
}

async function editItem() {
  await housesStore.getHouseById(props.houseItem.id).then(() => {
    router.push(`/edit/${props.houseItem.id}`);
  });
}
</script>

<template>
  <div class="house-card">
    <div class="image-area" @click.prevent="goToDetails()">
      <img 
        v-if="props.houseItem.image"
        :src="props.houseItem.image" 
        class="image" 
      />
      <img 
        v-if="props.houseItem.image === null" 
        src="../assets/img_empty_houses@3x.png"
        class="image-none" 
      />
    </div>
    <div class="info-area" @click.prevent="goToDetails()">
      <h2 class="listing">{{ props.houseItem.location.street }} {{ props.houseItem.location.houseNumber }}{{ props.houseItem.location.houseNumberAddition }}</h2>
      <p class="price listing">
        &euro; {{ props.houseItem.price }}
      </p>
      <p class="listing-information listing">
        {{ props.houseItem.location.zip }} {{ props.houseItem.location.city }}
      </p>
      <div class="info-details" if="props.houseItem.madeByMe">
        <div class="details">
          <img src="../assets/ic_bed@3x.png" class="detail-image" />
          <p class="listing-information">
            {{ props.houseItem.rooms.bedrooms }}
          </p>
        </div>
        <div class="details">
          <img src="../assets/ic_bath@3x.png" class="detail-image" />
          <p class="listing-information">
            {{ props.houseItem.rooms.bathrooms }}
          </p>
        </div>
        <div class="details">
          <img src="../assets/ic_size@3x.png" class="detail-image" />
          <p class="listing-information">
            {{ props.houseItem.size }} m2
          </p>
        </div>
      </div>
    </div>
    <div class="buttons-area" :style="`display: ${showButtons}`">
      <img 
        src="../assets/ic_edit@3x.png" 
        class="button-image" 
        @click="editItem()"
      />
      <img 
        src="../assets/ic_delete@3x.png" 
        class="button-image" 
        @click.prevent="openDialog()" 
      />
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
.house-card {
  display: inline-flex;
  width: -webkit-fill-available;
  margin: 1em 0;
  padding: 1em 1.2em;
  border-radius: 5px;
  background: var(--backgrund-2-color);
  -moz-box-shadow: 0 2px 2px var(--quaternary-color);
  -webkit-box-shadow: 0 2px 2px var(--quaternary-color);
  box-shadow: 2px 2px 2px var(--quaternary-color);
  cursor: pointer;
}

.image {
  width: 8em;
  height: 8em;
  border-radius: 5px;
  object-fit: cover;
}

.image-none {
  width: 8em;
  height: 8em;
  border-radius: 5px;
  object-fit: contain;
}

.image-area {
  margin-right: 1em;
}

.info-area {
  display: block;
  width: 50%;
}

.listing {
  margin: .3em;
}

.info-details {
  display: flex;
}

.details {
  display: inline-flex;
  align-items: center;
  margin-right: .8em;
}
</style>