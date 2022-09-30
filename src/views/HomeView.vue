<template>
  <v-row>
    <div class="test">
    <p>load...</p>
  </div>
  </v-row>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
  },
}
</script>

<style scoped>
  p {
    font-size: 2em;
    color: var(--color-one);
    text-align: center;
    text-shadow: 1px 2px 1px black;
  }

  .test {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    width: 250px;
    background-color: blueviolet;
    border-radius: 20px;
  }
</style>
