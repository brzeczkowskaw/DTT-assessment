import { defineStore } from "pinia";
import axios from "axios";
import http from '../services/api'

export const useHousesStore = defineStore("housesStore", {
  state: () => ({
    houses: [],
    houseToDelete: '',
    houseToEdit: '',
    newHouse: {},
  }),
  actions: {
    async getAllHouses() {
      try {
        const { data } = await http.get('/houses');
        this.houses = data;
        console.log(data);
        return data;
      } catch (e) {
        alert(e)
      }
    }
  },
});