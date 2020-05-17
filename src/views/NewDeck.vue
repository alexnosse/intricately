<template>
  <div class="home">
    <Loading :isVisible="isLoading" />
    <form
      id="cards"
      @submit="this.checkForm"
      action="deck"
      method="post"
    >
      <div class="input-container" v-for="(item, index) in cardsQuantity" :key="index">
        <label>Card {{index + 1}}</label>
        <input
          type="text"
          :id="'input_' + (index + 1)"
          v-model="inputs[index]"
          v-on:blur="parseValue"
        />
        <span class="error" v-if="!!errors[index]">
          <span v-if="errors[index] !== 'invalid'">
            Duplicated on card {{parseInt(errors[index], 10) + 1}}
          </span>
          <span v-if="errors[index] === 'invalid'">Invalid Card</span>
        </span>
      </div>

      <div class="input-container rotation-container">
        <h2>Rotation Card *</h2>
        <input type="text" id="rotationCard" name="rotationCard" v-model="rotation" />
        <div class="input-container rotation-container">
          <span class="error" v-if="rotationMissing">
            Rotation card is required
          </span>
          <span class="error" v-if="rotationOnDeck">
            Rotation card is on your deck!
          </span>
        </div>
      </div>

      <input type="hidden" :v-model="validCards" id="validCards" name="validCards" />
      <button type="submit">Submit</button>

    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { isValidCard, parseCardValue } from '@/helpers/card-helper';
import requestsHelper from '@/helpers/requests-helper';
import Loading from '@/components/Loading.vue';
import DeckModel from '../models/Deck';

@Component({
  components: {
    Loading,
  },
})
export default class NewDeck extends Vue {
  quantity = 10;

  errors: Array<string> = [];

  inputs: Array<string> = [];

  rotation = '';

  rotationMissing = false;

  rotationOnDeck = false;

  validCards = '';

  title = 'CARDS';

  isLoading = false;

  mounted(): void {
    this.$store.dispatch('setTitle', 'CARDS');
  }

  get computedTitle() {
    this.title = this.$store.state.title;
    return this.title;
  }

  get cardsQuantity(): Array<number> {
    return new Array(this.quantity);
  }

  parseValue() {
    this.uppercaseAll();
  }

  uppercaseAll() {
    this.inputs = this.inputs.map((val: string) => val.toUpperCase());
    this.rotation = this.rotation.toUpperCase();
  }

  checkForm(e: Event): boolean {
    this.rotationMissing = false;
    this.rotationOnDeck = false;
    let shouldSubmit = true;

    const validCards: Array<string> = [];
    this.errors = new Array(this.quantity).fill('');
    this.rotation = parseCardValue(this.rotation);

    if (isValidCard(this.rotation)) {
      this.inputs.forEach((val: string, index: number) => {
        const cardValue = parseCardValue(val);
        if (isValidCard(cardValue)) {
          const foundIndex = validCards.findIndex((item: string) => item === cardValue);
          if (foundIndex === -1) {
            validCards.push(cardValue);
          } else {
            this.errors[index] = `${foundIndex}`;
            shouldSubmit = false;
          }
        } else {
          this.errors[index] = 'invalid';
        }
      });
    } else {
      this.rotationMissing = true;
    }

    this.rotationOnDeck = validCards.findIndex((item: string) => item === this.rotation) !== -1;

    if (!this.rotationMissing && !this.rotationOnDeck && shouldSubmit) {
      this.isLoading = true;
      requestsHelper.createNewDeck(validCards, this.rotation).then((response: DeckModel) => {
        if (response.deck_id) {
          this.$router.push({
            name: 'Deck',
            params: {
              deckId: response.deck_id,
            },
          });
        } else {
          // TODO: TOAST COMPONENT ERROR
        }
        this.isLoading = false;
      });
    }

    e.preventDefault();
    return false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  padding: 18px;
  >  form {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 18px;
    > .input-container {
      text-align: left;
      padding: 6px;
      display: flex;
      flex-direction: column;
    }
    > .rotation-container {
      grid-column-start: 2;
      grid-column-end: span 3;
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-gap: 18px;
    }
    > button {
      grid-column-start: 3;
      background-color: #1C0063;
      color:#F6E503;
      font-weight: bold;
      border: 0px;
      border-radius: 25px;
      padding: 12px;
      font-size: 32px;
    }
    .error {
      font-size: 12px;
      color: red;
      padding: 0 6px;
    }
  }

}
</style>
