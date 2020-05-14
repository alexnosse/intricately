<template>
  <div class="home">
    <form
      id="cards"
      @submit="this.checkForm"
      action="https://vuejs.org/"
      method="post"
    >
      <div class="input-container" v-for="(item, index) in cardsQuantity" :key="index">
        <label>Card {{ index + 1}}</label>
        <input type="text" :id="'input_' + (index +1)" />
      </div>

      <div class="input-container rotation-container">
        <h2>Rotation Card</h2>
        <input type="text" id="rotation_card" />
      </div>

      <button type="submit">Submit</button>

    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';

@Component({
  components: {
    Card,
  },
})
export default class Home extends Vue {
  quantity = 10;

  get cardsQuantity(): Array<any> {
    return new Array(this.quantity);
  }

  checkForm(): void {
    console.log('teste 123 ', this.quantity);
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
      border-radius: 10px;
      padding: 12px;
      font-size: 32px;
    }
  }

}
</style>
