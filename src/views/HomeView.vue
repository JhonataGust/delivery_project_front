<template>
  <InputSearch/>
  <div class="spacing"><BoxClient/></div>
</template>

<script>
import InputSearch from "@/components/Search/InputSearch.vue";
import BoxClient from "@/components/Clients/Box/BoxClient.vue";
export default {
  name: 'HomeView',
  components: {
    InputSearch,
    BoxClient
},
  data(){
    return {
    }
  }
}
</script>

<style>
.spacing{
  margin: 0px 10px;
}
</style>
