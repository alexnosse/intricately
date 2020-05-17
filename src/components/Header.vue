<template>
  <div class="header">
      {{headerTitle}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  get headerTitle(): string {
    const { title } = this.$store.state;
    return title;
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  width: 100%;
  background-color: #2A7100;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: yellow;
  text-shadow: 1px 1px 2px rgba(150, 150, 150, 0.88);
  font-family: 'CardCharacters', Arial, Helvetica, sans-serif;
}
</style>
