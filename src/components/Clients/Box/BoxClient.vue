<template>

        <section class="spacing">
            <div class="card-companies" v-for="client in clients" :key=client.id>
                <v-icon 
                v-if='!client.completed'
                color="#E65F5C"
                style="position: absolute;"
                >
                    mdi-account-clock-outline
                </v-icon>
                {{user}}
                <div class="avatar">
                    <img
                    :src="!client.logo ? require('@/assets/default_image.png') : client.logo"
                    />
                </div>
                <div class="clean_float"></div>
                <div class="infos_clients">
                    <h3 class="title">{{client.company_name}}</h3>
                    <div class="details">
                        <p class="close">Fechado <b>({{client.open}} ás {{client.close}})</b></p>
                        <!-- <v-rating
                :model-value="3.5"
                color="amber"
                dense
                half-increments
                readonly
                size="20"
                ></v-rating> -->
                    </div>
                </div>
                <div class="clean_float"></div>
            </div>
        </section>
</template>
<style scoped>
.spacing {
    margin: auto;
    max-width: 950px;
}

.card-companies{
    color: #ccc;
    border: 1px solid  #ccc;
    border-radius:12px;
    margin-bottom: 10px;
    padding: 10px;
    display: flex;
}
.card-companies .infos_clients{
    float: right;
    width: 85%;
    margin-left: 32px;
}
.card-companies .avatar{
    width: 15%;
    float: left;
}
.card-companies .avatar img{
    width: 100%;
    margin-top: 10px;
}
.open{
    color: rgb(67, 179, 141);
}
.close{
    color: rgb(179, 76, 67);
}

@media screen and (max-width: 1100px){
    .spacing {
        margin: auto 20px;
        max-width: unset;
    }
    .card-companies {
        width: 100%;
        margin-bottom: 10px;
    }
}
</style>
<script>
export default {
    name:'BoxClient',
    props: {
        term_list: String
    },
    data(){
        return{
            clients: []
        }
    },
    methods: {
        getClients(){
            let term = this.term_list 
            this.$axios.get(`${this.$HOST}/v1/users/clients?term=` + term)
            .catch(()=>{
                console.log('Ops, was not possible to get the clients')
            })
            .then((response)=>{
            this.clients = response.data.clients
            })
        }
    },
    mounted(){
        this.getClients()
    }
}
</script>