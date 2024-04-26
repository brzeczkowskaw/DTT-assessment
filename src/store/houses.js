import { defineStore } from "pinia";
import http from '../services/api'

export const useHousesStore = defineStore("housesStore", {
  state: () => ({
    houses: [],
    houseDetails: null,
    houseToDelete: '',
    houseToEdit: '',
    newHouse: {},
  }),
  actions: {
    async getAllHouses() {
      if (this.houses.length > 0) {
        return;
      };
      try {
        const { data } = await http.get('/houses');
        this.houses = data;
      } catch (e) {
        alert(e)
      }
    },
    async getHouseById(houseId) {
      if (this.houses.length > 0) {
        const house = this.houses.find((house) => house.id.toString() === houseId);
        if (house) {
          this.houseDetails = house;
          return;
        }
      };
      try {
        const { data } = await http.get(`/houses/${houseId}`);
        this.houseDetails = data[0];
      } catch (e) {
        alert(e)
      }
    }
  },
});