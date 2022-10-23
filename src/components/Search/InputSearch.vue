<template>
    <div class="form">
        <input type="text" placeholder="Procure o que deseja" v-model="search"/>
        <v-btn
        class="search_btn"
        icon="mdi-magnify"
        @click="searchTerm(`/${search}` ,null)"
        >
        </v-btn>
        <div class="filters_container">
            <div class="infos_filter">
                <p>{{filter}}</p>
            </div>
            <div class="filters">
                <p>Filtrar Por</p>
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn
                    v-bind="props"
                    variant="flat"
                    >
                    <v-icon
                    color="#cc"
                    >
                        mdi-filter
                    </v-icon>
                    </v-btn>
                  </template>
                    <v-list v-model="filter">
                    <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    :value="index"
                    >
                        <v-list-item-title @click="searchTerm(item.type,item.title)">{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
            </v-menu>
            </div>
            <div class="clear"></div>
        </div>
        <v-divider style="z-index:3px"></v-divider>
    </div>
</template>
<style scoped>
.infos_filter{
    float: left;
    margin-right: 50px;
    display: inline-flex;
    position: absolute;
    left:10px;
}

.clear{
    clear: both;
}
.filters_container{
    width: 100%;
    height: 35px;
    position: relative;
    display: flex;
    color: #ccc;
}
.filters {
    display: inline-flex;
    position: absolute;
    right: 10px;
    float: right;
    clear: both;
    top: -10px;
}
.filters p{
    margin-top: 10px;

}

.form{
    margin: 20px;
}

.form input{
    margin: 12px 0px;
    width: 80%;
    padding: 8px 5px;
    padding-left: 20px;
    border: 1px solid #ccc;
    border-radius: 20px;
    display: inline-block;
    outline: none;
}  
.form input:focus{
    box-shadow:
  0px 0.1px 2.2px rgba(0, 0, 0, 0.02),
  0px 0.3px 5.3px rgba(0, 0, 0, 0.028),
  0px 0.6px 10px rgba(0, 0, 0, 0.035),
  0px 1.1px 17.9px rgba(0, 0, 0, 0.042),
  0px 2.1px 33.4px rgba(0, 0, 0, 0.05),
  0px 5px 80px rgba(0, 0, 0, 0.07)
;
}

@media only screen and (max-width:800px) {
    .filters p {
    display: none;
}

}
</style>
<script>
export default {
    name:'InputSearch',
    data(){
        return{
            search:'',
            items: [
                { type:1,title: 'Mais Visualizados' },
                { type:2,title: 'Mais Relevantes' },
                { type:3,title: 'Bem Avaliados' },
                { type:4,title: 'Em alta' },
                ],
            filter:'Mais Visualizados'    
        }
    },
    methods: {
        searchTerm(type, filter_name){
            this.filter = filter_name
            this.$emit("emit-query",  type)
        }
    }
}
</script>