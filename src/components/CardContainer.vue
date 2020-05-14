<template>
  <div class="card-container">
    <div v-for="(item, index) in valesArray" :key="item">
      <Card :value="item" :suit="suitsArray[index]" />
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';

@Component({
  components: {
    Card,
  },
})
export default class CardContainer extends Vue {
  @Prop() private cards!: Array<string>;

  get valesArray(): Array<string> {
    return this.cards.map((card) => card.substring(0, 1));
  }

  get suitsArray(): Array<string> {
    return this.cards.map((card) => card.substring(1, 2));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card-container {
  grid-template-columns: repeat(5, 1fr);
  display: grid;
  grid-gap: 18px;
  justify-items: center;
}
</style>
