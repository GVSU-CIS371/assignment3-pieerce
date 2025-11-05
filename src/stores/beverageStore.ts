import { defineStore } from "pinia";
import temps from "../data/tempretures.json";
import bases from "../data/bases.json";
import syrups from "../data/syrups.json";
import creamers from "../data/creamers.json";
import type { BaseBeverageType, SyrupType, CreamerType, BeverageType } from "../types/beverage";

export const useBeverageStore = defineStore("beverageStore", {
  state: () => ({
    temps: temps as string[],
    bases: bases as BaseBeverageType[],
    syrups: syrups as SyrupType[],
    creamers: creamers as CreamerType[],

    currentTemp: temps[0],
    currentBase: bases[0] as BaseBeverageType,
    currentSyrup: syrups[0] as SyrupType,
    currentCreamer: creamers[0] as CreamerType,

    newBeverageName: "",
    beverages: [] as BeverageType[],
    selectedBeverage: null as BeverageType | null,
  }),

  actions: {
    makeBeverage() {
      if (!this.newBeverageName.trim()) return;

      const newDrink: BeverageType = {
        id: crypto.randomUUID(),
        name: this.newBeverageName,
        temp: this.currentTemp,
        base: this.currentBase,
        syrup: this.currentSyrup,
        creamer: this.currentCreamer,
      };

      this.$patch((state) => {
        state.beverages.push(newDrink);
        state.newBeverageName = "";
        state.selectedBeverage = newDrink;
      });
    },

    showBeverage(bev: BeverageType) {
      if (!bev) return;

      this.$patch({
        selectedBeverage: bev,
        currentTemp: bev.temp,
        currentBase: bev.base,
        currentSyrup: bev.syrup,
        currentCreamer: bev.creamer,
      });
    },
  },

  getters: {
    beverageCount: (state) => state.beverages.length,
  },

  persist: true,
});
