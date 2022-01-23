import { firebaseURL } from "~/config.js";
export const state = () => {
  return {
    list: [],
  };
};

export const mutations = {
  add(state, text) {
    state.list.push({
      text: text,
      status: false,
    });
  },
  remove(state, i) {
    state.list = state.list.filter((_, index) => index != i);
  },
  toggle(state, i) {
    state.list[i].status = !state.list[i].status;
  },
  parsedData(state, data) {
    data.map((x) => {
      state.list.push(x);
    });
  },
};

export const actions = {
  async firebaseGet(store) {
    console.log("triggered!");
    await this.$axios.$get(firebaseURL).then((res) => {
      store.commit("parsedData", res);
    });
  },
  async firebaseSet(store, data) {
    await this.$axios.$put(firebaseURL, data);
  },
  async firebaseUpdate(store, data) {
    await this.$axios.$delete(firebaseURL);
    await this.$axios.$put(firebaseURL, data);
  },
};
