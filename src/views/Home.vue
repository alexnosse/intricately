<template>
  <div class="home">
    <Header :title="computedTitle"/>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Header from '@/components/Header.vue';

@Component({
  components: {
    Header,
  },
})
export default class Home extends Vue {
  title = 'CARDS';

  get computedTitle() {
    this.title = this.$store.state.title;
    return this.title;
  }
}
</script>
