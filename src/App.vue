<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component({
  components: {
  },
})
export default class App extends Vue {
}
</script>
<style lang="scss">

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default padding */
ul[class],
ol[class] {
  padding: 0;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  background-color: #dff4f7;
}

input[type="text"] {
  border-radius: 5px;
  box-shadow: 0px 0px 16px 0px rgba(150, 150, 150, 0.2);
  border: 1px solid #ccc;
  padding: 6px;
}

label {
  font-size: 12px;
  color: #656a6b;
}
/* Remove list styles on ul, ol elements with a class attribute */
ul[class],
ol[class] {
  list-style: none;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img {
  max-width: 100%;
  display: block;
}

/* Natural flow and rhythm in articles by default */
article > * + * {
  margin-top: 1em;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@font-face {
    font-family: 'CardCharacters';
    src: url('assets/fonts/CardCharacters.woff2') format('woff2'),
         url('assets/fonts/CardCharacters.woff') format('woff'),
         url('assets/fonts/CardCharacters.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

</style>
