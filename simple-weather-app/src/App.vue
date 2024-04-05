<template>
  <Header></Header>
  <router-view />
</template>

<script>
import HeaderComponent from './components/Header.vue';

export default {
  name: "App",
  components: {
    Header: HeaderComponent,
  },
};
</script>

<style lang="scss">
@import url('./styles/fonts.scss');
@import url('./styles/utils.scss');

</style>
