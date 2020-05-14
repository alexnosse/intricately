<template>
  <div class="deck">
    <CardContainer :cards="['AC', 'KS', '0D', '2H', '2S', '4S', '5C', '7D']" />
  </div>
</template>

<script>
// @ is an alias to /src
import CardContainer from '@/components/CardContainer.vue';

export default {
  name: 'Deck',
  components: {
    CardContainer,
  },
};
</script>
