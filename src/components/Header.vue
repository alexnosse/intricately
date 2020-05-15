<template>
  <div class="header">
      {{headerTitle}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  @Prop() private title!: string;

  get headerTitle(): string {
    return this.title ? this.title : 'CARDS';
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  width: 100vw;
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
