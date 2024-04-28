<script setup>
import { ref, onMounted } from 'vue'
import { useHousesStore } from '../store/houses'
import axios from 'axios';
import { useRouter, useRoute } from "vue-router"

const housesStore = useHousesStore();
const router = useRouter();
const route = useRoute();
const houseInfo = ref({
  price: null,
  bedrooms: null,
  bathrooms: null,
  size: null,
  streetName: null,
  houseNumber: null,
  numberAddition: null,
  zip: null,
  city: null,
  constructionYear: null,
  hasGarage: null,
  description: null,
  image: null,
});
const isImageInputOpen = ref(false);
const houseId = route.params.id;
const previewImage = ref();

// fields validation
const isPriceValid = ref(true);
const isBedroomsValid = ref(true);
const isBathroomsValid = ref(true);
const isSizeValid = ref(true);
const isStreetNameValid = ref(true);
const isHouseNumberValid = ref(true);
const isZipValid = ref(true);
const isCityValid = ref(true);
const isConstructionYearValid = ref(true);
const isHasGarageValid = ref(true);
const isDescriptionValid = ref(true);
const isImageValid = ref(true);
const areAllFieldsValid = ref(false);

function validationCheck() {
  isPriceValid.value = !!houseInfo.value.price;
  isBedroomsValid.value = !!houseInfo.value.bedrooms;
  isBathroomsValid.value = !!houseInfo.value.bathrooms;
  isSizeValid.value = !!houseInfo.value.size;
  isStreetNameValid.value = !!houseInfo.value.streetName;
  isHouseNumberValid.value = !!houseInfo.value.houseNumber;
  isZipValid.value = !!houseInfo.value.zip;
  isCityValid.value === !!houseInfo.value.city;
  isConstructionYearValid.value = !!houseInfo.value.constructionYear;
  isHasGarageValid.value = houseInfo.value.hasGarage !== null;
  isDescriptionValid.value = !!houseInfo.value.description;
  isImageValid.value = !!houseInfo.value.image;
}

function checkAreAllFieldsValid() {
  areAllFieldsValid.value = isPriceValid.value &&
    isBedroomsValid.value &&
    isBathroomsValid.value &&
    isSizeValid.value &&
    isStreetNameValid.value &&
    isHouseNumberValid.value &&
    isZipValid.value &&
    isCityValid.value &&
    isConstructionYearValid.value &&
    isHasGarageValid.value &&
    isDescriptionValid.value &&
    isImageValid.value
}

const props = defineProps({
  createNew: {
    required: true,
  },
})

if (props.createNew) {
  houseInfo.value = housesStore.newHouse;
}
if (!props.createNew) {
  assignHouseToEdit();
}

async function assignHouseToEdit() {
  if (housesStore.houseToEdit.id === houseId) {
    assignItems();
  } else {
    await housesStore.getHouseById(houseId).then(() => {
      assignItems(); 
    })
  }
}

function assignItems() {
  housesStore.houseToEdit = {
      id: houseId,
      price: housesStore.houseDetails.price,
      bedrooms: housesStore.houseDetails.rooms.bedrooms,
      bathrooms: housesStore.houseDetails.rooms.bathrooms,
      size: housesStore.houseDetails.size,
      streetName: housesStore.houseDetails.location.street,
      houseNumber: housesStore.houseDetails.location.houseNumber,
      numberAddition: housesStore.houseDetails.location.houseNumberAddition,
      zip: housesStore.houseDetails.location.zip,
      city: housesStore.houseDetails.location.city,
      constructionYear: housesStore.houseDetails.constructionYear,
      hasGarage: housesStore.houseDetails.hasGarage,
      description: housesStore.houseDetails.description,
      image: housesStore.houseDetails.image,
    },
    houseInfo.value = housesStore.houseToEdit;
}

function uploadImage() {
  houseInfo.value.image = previewImage.value;
  isImageInputOpen.value = false;
  image.value = null;
}

function deleteImage() {
  houseInfo.value.image = null;
}

async function submitForm() {
  validationCheck();
  checkAreAllFieldsValid();
  if (!areAllFieldsValid.value) {
    return
  }
  try {
    if (props.createNew) {
      console.log('new');
      const newHouseId = await housesStore.uploadNewHouse();
      router.push(`/details/${newHouseId}`);
    } else {
      console.log('edit');
      await housesStore.updateHouse();
      router.push(`/details/${housesStore.houseToEdit.id}`);
    }
  } catch(e) {
    // handled in store
  }
}

</script>

<template>
  <div>
    <form class="form-inputs">
      <div class="input-row-single">
        <div class="input-column">
          <label>
            Street name*
          </label>
          <input
            v-model="houseInfo.streetName"
            class="input-in-form" 
            placeholder="Enter the street name"
            type="text"
            :class="isStreetNameValid ? '' : 'invalid-field'"
          />
          <p class="error-message invalid-field-text" v-if="!isStreetNameValid">Field is required</p>
        </div>
      </div>
      <div class="input-row-double">
        <div class="input-column input-column-left">
          <label>
            House number*
          </label>
          <input 
            v-model="houseInfo.houseNumber"
            class="input-in-form" 
            placeholder="Enter house number"
            type="number"
            :class="isHouseNumberValid ? '' : 'invalid-field'"
            min="1"
          />
          <p class="error-message invalid-field-text" v-if="!isHouseNumberValid">Field is required</p>
        </div>
        <div class="input-column input-column-right">
          <label>
            Addition (optional)
          </label>
          <input 
            v-model="houseInfo.numberAddition"
            class="input-in-form" 
            placeholder="e.g. A"
          />
        </div>
      </div>
      <div class="input-row-single">
        <div class="input-column">
          <label>
            Postal code*
          </label>
          <input 
            v-model="houseInfo.zip"
            class="input-in-form" 
            placeholder="e.g. 1000 AA"
            type="text"
            :class="isZipValid ? '' : 'invalid-field'"
          />
          <p class="error-message invalid-field-text" v-if="!isZipValid">Field is required</p>
        </div>
      </div>
      <div class="input-row-single">
        <div class="input-column">
          <label>
            City*
          </label>
          <input 
            v-model="houseInfo.city"
            class="input-in-form" 
            placeholder="e.g. Utrecht"
            type="text"
            :class="isCityValid ? '' : 'invalid-field'"
          />
          <p class="error-message invalid-field-text" v-if="!isCityValid">Field is required</p>
        </div>
      </div>
      <div class="input-row-double">
        <div class="input-column input-column-left">
          <label>
            Upload picture (PNG or JPG)*
          </label>
          <button v-if="!houseInfo.image" type="button" class="add-image-button" @click="isImageInputOpen = true" :class="isImageValid ? '' : 'invalid-field-image'">
            <img src="../assets/ic_plus_grey@3x.png" class="add-image-plus" />
          </button>
          <p class="error-message invalid-field-text" v-if="!isImageValid">Field is required</p>
          <div v-if="houseInfo.image" class="image-preview-area">
            <img :src="houseInfo.image" class="image-preview" />
            <img src="../assets/ic_clear@3x.png" class="delete-image-icon" @click="deleteImage()" />
          </div>
        </div>
        <div v-if="isImageInputOpen" class="input-column input-column-right column-link">
          <input
            v-model="previewImage"
            class="input-in-form image-input" 
            placeholder="Image link"
            type="text"
          />
          <p class="upload-text" @click="uploadImage()">upload</p>
        </div>
      </div>
      <div class="input-row-single">
        <div class="input-column">
          <label>
            Price*
          </label>
          <input
            v-model="houseInfo.price"
            class="input-in-form" 
            placeholder="e.g. 500000"
            type="number"
            :class="isPriceValid ? '' : 'invalid-field'"
            min="1"
          />
          <p class="error-message invalid-field-text" v-if="!isPriceValid">Field is required</p>
        </div>
      </div>
      <div class="input-row-double">
        <div class="input-column input-column-left">
          <label>
            Size (in m2)*
          </label>
          <input 
            v-model="houseInfo.size"
            class="input-in-form" 
            placeholder="e.g. 120"
            type="number"
            :class="isSizeValid ? '' : 'invalid-field'"
            min="1"
          />
          <p class="error-message invalid-field-text" v-if="!isSizeValid">Field is required</p>
        </div>
        <div class="input-column input-column-right">
          <label>
            Garage*
          </label>
          <select v-model="houseInfo.hasGarage" class="input-in-form" placeholder="Select" :class="isHasGarageValid ? '' : 'invalid-field'">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <p class="error-message invalid-field-text" v-if="!isHasGarageValid">Field is required</p>
        </div>
      </div>
      <div class="input-row-double">
        <div class="input-column input-column-left">
          <label>
            Bedrooms*
          </label>
          <input
            v-model="houseInfo.bedrooms"
            class="input-in-form" 
            placeholder="Number of bedrooms"
            type="number"
            :class="isBedroomsValid ? '' : 'invalid-field'"
            min="1"
          />
          <p class="error-message invalid-field-text" v-if="!isBedroomsValid">Field is required</p>
        </div>
        <div class="input-column input-column-right">
          <label>
            Bathrooms*
          </label>
          <input 
            v-model="houseInfo.bathrooms"
            class="input-in-form" 
            placeholder="Number of bathrooms"
            type="number"
            :class="isBathroomsValid ? '' : 'invalid-field'"
            min="1"
          />
          <p class="error-message invalid-field-text" v-if="!isBathroomsValid">Field is required</p>
        </div>
      </div>
      <div class="input-row-single">
        <div class="input-column">
          <label>
            Construction date*
          </label>
          <input
            v-model="houseInfo.constructionYear"
            class="input-in-form" 
            placeholder="e.g. 1990"
            type="number"
            :class="isConstructionYearValid ? '' : 'invalid-field'"
            min="1990"
          />
          <p class="error-message invalid-field-text" v-if="!isConstructionYearValid">Field is required</p>
        </div>
      </div>
      <div class="input-row-single">
        <div class="input-column">
          <label>
            Description*
          </label>
          <textarea
            v-model="houseInfo.description"
            class="input-in-form" 
            placeholder="Enter description"
            type="text"
            rows="5"
            :class="isDescriptionValid ? '' : 'invalid-field'"
          />
          <p class="error-message invalid-field-text" v-if="!isDescriptionValid">Field is required</p>
        </div>
      </div>
      <div class="submit-row">
        <button 
          class="post-button" 
          type="button" 
          @click="submitForm()"
        >
          {{ props.createNew ? 'Post' : 'Save'}}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-inputs {
  display: flex;
  flex-direction: column;
  @media (max-width: 400px) {
    margin-bottom: 4em;
  }
}

.input-in-form {
  border: none;
  width: -webkit-fill-available;
  border-radius: 5px;
  margin: .5em 0;
  padding: .5em .8em;
}

.input-in-form:focus { 
  outline: none;
}

.input-column {
  display: flex;
  flex-direction: column;
}

.input-column-left {
  margin-right: 0.5em;
  @media (max-width: 800px) {
    width: 50%;
  }
}

.input-column-right {
  width: 47%;
}

.input-row-single {
  display: block;
  margin-bottom: .5em;
}

.input-row-double {
  display: flex;
}

.submit-row {
  display: flex;
  justify-content: end;
  align-items: center;
}

.post-button {
  background: var(--primary-color);
  border: none;
  padding: .4em 3.5em;
  border-radius: 7px;
  color: var(--tertiary-color);
}

.add-image-button {
  height: 5em;
  width: 5em;
  margin: 1em 0;
  margin-right: 3em;
  background: transparent;
  border: 1px dashed var(--secondary-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-image-plus {
  height: 1em;
  width: 1em;
  cursor: pointer;
}

.column-link {
  display: flex;
  align-self: center;
}

.upload-text {
  font-size: .8em;
  margin-top: -.6em;
  cursor: pointer;
}

.image-preview-area {
  display: flex;
  width: 5.1em;
  margin: 1em 0 !important;
}

.image-preview {
  height: 5em;
  width: 5em;
  margin: 1em 0 !important;
  margin-right: 3em;
  object-fit: cover;
}

.delete-image-icon {
  height: 1em;
  width: 1em;
  margin-left: -.5em;
  margin-top: .5em;
  cursor: pointer;
}

.invalid-field-text {
  margin-top: -.4em;
}

.invalid-field {
  border: 1px solid var(--primary-color);
}

.invalid-field-image {
  border: 1px dashed var(--primary-color);
}
</style>