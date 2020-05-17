<template>
  <div class="card-container">
    <div v-for="item in viewCards" :key="item.code">
      <Card :card="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import CardModel from '@/models/Card';
import {
  orderCards,
} from '@/helpers/card-helper';
@Component({
  components: {
    Card,
  },
})
export default class CardContainer extends Vue {
  get viewCards(): Array<CardModel> {
    const { rotation, cards } = this.$store.state;
    return cards && rotation && orderCards(rotation, cards);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card-container {
  padding: 18px;
  border: 1px solid #ccc;
  background-color: #D8D8D8;
  grid-template-columns: repeat(5, 1fr);
  display: grid;
  grid-gap: 18px;
  justify-items: center;
}
</style>
