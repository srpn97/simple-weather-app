<template>
  <div class="home">
    <Tabs></Tabs>
  </div>
</template>

<script>
import TabsComponent from '@/components/TabsComponent'
export default {
  name: "HomeView",
  components: {
    Tabs: TabsComponent,
  },
};
</script>
