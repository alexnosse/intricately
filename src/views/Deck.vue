<template>
  <div class="deck-container">
    <CardContainer />
    <hr />
    <div class="combo-container">
      <h2> Rotation Card: {{rotation.code}}</h2>
      <h2> Full House Combinations:<span v-if="fullHouseCombinations.length === 0"> None</span></h2>
      <ul v-if="fullHouseCombinations.length > 0">
        <li class="combinations" v-for="(item) in fullHouseCombinations" :key="item">
          {{item}}
        </li>
      </ul>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import requestsHelper from '@/helpers/requests-helper';
import { returnFullHouseCombinations } from '@/helpers/card-helper';
import CardContainer from '@/components/CardContainer.vue';
import Card from '@/components/Card.vue';
import data from '@/config/config';
import CardModel from '../models/Card';

@Component({
  components: {
    CardContainer,
    Card,
  },
})
export default class Deck extends Vue {
  rotation: CardModel = {} as CardModel;

  ordered: Array<CardModel> = [];

  get fullHouseCombinations() {
    return returnFullHouseCombinations(this.ordered);
  }

  async mounted() {
    this.$store.dispatch('setTitle', 'ORDERED PILE');
    const { deckId } = this.$route.params;
    const { PileType } = data;
    const rotationResponse = await requestsHelper.getCardsOnPile(deckId, PileType.ROTATION);
    const orderedResponse = await requestsHelper.getCardsOnPile(deckId, PileType.ORDERED);

    this.rotation = rotationResponse.piles.rotation.cards[0] as CardModel;
    this.ordered = orderedResponse.piles.ordered.cards;
    this.$store.dispatch('setCards', this.ordered);
    this.$store.dispatch('setRotation', this.rotation);
  }
}

</script>
<style scoped lang="scss">
  .deck-container,
  .combo-container {
    padding: 18px;
  }

  .combo-container {
    text-align: left;
  }

  .combinations {
    padding-left: 22px;
  }
</style>
