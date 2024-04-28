import { defineStore } from "pinia";
import http from '../services/api'

export const useHousesStore = defineStore("housesStore", {
  state: () => ({
    houses: [],
    houseDetails: null,
    houseToDelete: '',
    houseToEdit: {
      id: null,
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
    },
    newHouse: {
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
    },
    isLoading: false,
  }),
  actions: {
    async getAllHouses() {
      if (this.houses.length > 0) {
        return;
      };
      try {
        this.isLoading = true;
        const { data } = await http.get('/houses');
        this.houses = data;
        this.isLoading = false;
      } catch (e) {
        alert(e);
        this.isLoading = false;
      }
    },
    async getHouseById(houseId) {
      this.isLoading = true;
      if (this.houses.length > 0) {
        const house = this.houses.find((house) => house.id.toString() === houseId);
        if (house) {
          this.houseDetails = house;
          this.isLoading = false;
          return;
        }
      };
      try {
        const { data } = await http.get(`/houses/${houseId}`);
        this.houseDetails = data[0];
        this.isLoading = false;
      } catch (e) {
        alert(e);
        this.isLoading = false;
      }
    },
    async uploadNewHouse() {
      this.isLoading = false;
      try {
        const { data } = await http.post('/houses', this.newHouse);
        await this.updatePhoto(data.id, this.newHouse);
        this.isLoading = false;
      } catch (e) {
        alert(e);
        this.isLoading = false;
      }
    },
    async updatePhoto(houseId, body) {
      this.isLoading = false;
      try {
        const { data } = await http.post(`/houses/${houseId}/upload`, body);
        this.isLoading = false;
      } catch (e) {
        alert(e);
        this.isLoading = false;
      }
    },
    async deleteHouse() {
      this.isLoading = false;
      try {
        await http.delete(`/houses/${this.houseToDelete}`);
        this.houseToDelete = '';
        this.houses = [];
        await this.getAllHouses();
        this.isLoading = false;
      } catch (e) {
        alert(e);
        this.isLoading = false;
      }
    },
    async updateHouse() {
      this.isLoading = false;
      try {
        await http.post(`/houses/${this.houseToEdit.id}`, this.houseToEdit);
        await this.updatePhoto(this.houseToEdit.id, this.houseToEdit);
        this.houseToDelete = '';
        this.houses = [];
        await this.getAllHouses();
        this.isLoading = false;
      } catch (e) {
        alert(e);
        this.isLoading = false;
      }
    }
  },
});