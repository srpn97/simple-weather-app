<template>
  <div class="header section">
    <div class="title">
      Simple Weather App
    </div>
    <div v-if="currentRouteName === 'home'" class="search-icon">
      <img @click="showModal = true" src="../assets/search.png" alt="search icon">
    </div>
    <div v-else @click="$router.push('/')" class="search-icon">
      <img src="../assets/home.png" alt="home icon">
    </div>
  </div>
  <SearchModal @close-modal="handleCloseModal()" v-if="showModal"></SearchModal>
</template>

<script>
import SearchModal from './SearchModal.vue'
export default {
  name: "HeaderComponent",
  components: {
    SearchModal,
  },
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  methods: {
    handleCloseModal() {
      this.showModal = false;
    }
  }
};
</script>
<style lang="scss">
.header {
  background-color: #1565C0;
  display: flex;
  justify-content: space-between;

  .title {
    color: #fff;
  }

  .search-icon {
    cursor: pointer;
    img {
      width: 1rem;
    }
  }
}
</style>