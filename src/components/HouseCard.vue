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

</script>

<template>
  <div class="house-card" @click="goToDetails()">
    <div class="image-area">
      <img :src="props.houseItem.image" class="image" />
    </div>
    <div class="info-area">
      <h2 class="listing">{{ props.houseItem.location.street }} {{ props.houseItem.location.houseNumber }} {{ props.houseItem.location.houseNumberAddition }}</h2>
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
      <img src="../assets/ic_edit@3x.png" class="button-image" />
      <img src="../assets/ic_delete@3x.png" class="button-image" />
    </div>
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