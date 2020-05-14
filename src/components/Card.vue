<template>
  <div class="card">
    <div :class="['top-value-suit value-suit', suit]">{{transformValue}}</div>
    <div :class="['card-body', bodyCssClass, suit]"></div>
    <div :class="['bottom-value-suit value-suit', suit]">{{transformValue}}</div>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop() private value!: string;

  @Prop() private suit!: string;

  get transformValue(): string {
    if (this.value === '0') {
      return '10';
    }
    return this.value;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  background-color: white;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 15px 3px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 0px 15px 3px rgba(0,0,0,0.2);
  box-shadow: 0px 0px 15px 3px rgba(0,0,0,0.2);
  height: 240px;
  width: 172px;
  padding: 12px 6px;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 20px 1fr 20px;
}

.value-suit {
  font-family: 'CardCharacters', Arial, Helvetica, sans-serif;
  width: 30px;
  height: 20px;

  &.bottom-value-suit {
    transform: rotate(180deg);
    justify-self: flex-end;
  }

  &:before {
    position: absolute;
    content: ' ';
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height: 30px;
    width: 24px;
    margin-top: 2px;
    margin-left: 24px;
  }
}

.C {
  &:before {
    background-image: url('../assets/C.png');
  }
}

.H {
  &:before {
    background-image: url('../assets/H.png');
  }
}

.S {
  &:before {
    background-image: url('../assets/S.png');
  }
}

.D {
  &:before {
    background-image: url('../assets/D.png');
  }
}
</style>
