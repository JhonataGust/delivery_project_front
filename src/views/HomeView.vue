<template>
  <InputSearch @emit-query="make_param"/>
  <BoxClient  :term_list="query_param"/>
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
      param:'',
      query_param: ''
    }
  },
  methods: {
    make_param(param){
      this.query_param = String(param)
    }
  }
}
</script>

<style>

</style>
