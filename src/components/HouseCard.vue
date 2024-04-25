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

</script>

<template>
  <div class="house-card">
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
    </div>
  </div>
    
    <!-- {{ housesStore.houses }} -->
</template>

<style scoped>
.house-card {
  display: inline-flex;
  width: 100%;
  margin: 1em 0;
  padding: 1em 1.2em;
  border-radius: 5px;
  background: var(--backgrund-2-color);
  -moz-box-shadow: 0 2px 2px var(--quaternary-color);
  -webkit-box-shadow: 0 2px 2px var(--quaternary-color);
  box-shadow: 2px 2px 2px var(--quaternary-color);
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
}

.listing {
  margin: 0.3em;
}
</style>