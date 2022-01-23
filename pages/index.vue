<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-5 offset-3 p2">
        <h2>Yapılacaklar Listesi</h2>
        <div class="input-group mb-3 mt-3">
          <input
            type="text"
            class="form-control me-2"
            v-model="name"
            @keydown.enter="addList"
          />
          <button class="btn btn-primary" @click="addList">Ekle</button>
        </div>
        <ul
          class="list-group mt-3"
          v-for="(item, i) in this.$store.state.list"
          :key="i"
        >
          <li
            class="list-group-item"
            :class="{
              'list-group-item-success': item.status,
              'list-group-item-primary': !item.status,
            }"
          >
            <input
              class="form-check-input me-2"
              type="checkbox"
              id="flexCheckChecked"
              :checked="item.status"
              @click="clickedCheckBox(i)"
            />
            <div class="position-absolute top-0 end-0 me-3 mt-3">
              <button
                class="btn btn-sm btn-danger bx bxs-trash"
                @click="deletedItem(i)"
              ></button>
            </div>
            <label class="form-check-label mb-3" for="flexCheckChecked">
              {{ i + 1 }}. {{ item.text }}
            </label>
            <figcaption class="blockquote-footer mb-0">
              <cite title="Source Title">{{
                item.status ? "Tamamlandı" : "Tamamlanmadı"
              }}</cite>
            </figcaption>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    clickedCheckBox(value) {
      this.$store.commit("toggle", value);
      this.$store.dispatch("firebaseUpdate", this.$store.state.list);
    },
    deletedItem(value) {
      this.$store.commit("remove", value);
      this.$store.dispatch("firebaseUpdate", this.$store.state.list);
    },
    addList() {
      this.$store.commit("add", this.name);
      this.$store.dispatch("firebaseSet", this.$store.state.list);
      this.name = "";
    },
  },
  mounted() {
    this.$store.dispatch("firebaseGet");
  },
};
</script>
