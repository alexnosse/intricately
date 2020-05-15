<template>
  <div class="deck">
    <CardContainer :cards="pileCards" />
    <hr />

    <Card v-if="rotationValue && rotationSuit" :value="rotationValue" :suit="rotationSuit" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

import { Component, Prop, Vue } from 'vue-property-decorator';

import CardContainer from '@/components/CardContainer.vue';
import Card from '@/components/Card.vue';
@Component({
  components: {
    CardContainer,
    Card,
  },
})
export default class Deck extends Vue {
  // TODO não preciso, o id vai vir da query string
  @Prop() deck!: string;

  @Prop() rotation!: string;

  get rotationValue(): string {
    if (this.rotation) {
      return this.rotation.substring(0, 1);
    }
    return '';
  }

  get rotationSuit(): string {
    if (this.rotation) {
      return this.rotation.substring(this.rotation.length - 1);
    }
    return '';
  }

  get pileCards(): Array<string> {
    if (this.deck) {
      return this.deck.split(',');
    }
    return [];
  }

  mounted(): void {
    this.$store.dispatch('setTitle', 'ORDERED PILE');
    // console.log(this.$route.params);
  }
}

</script>
