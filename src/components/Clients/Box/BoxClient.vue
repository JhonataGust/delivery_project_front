<template>

        <section class="spacing">
            <div class="card-companies" v-for="n in 5" :key="n">
                {{n}}
                <div class="avatar">
                    <img
                    src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
                    />
                </div>
                <div class="clean_float"></div>
                <div class="infos_clients">
                    <h3 class="title">McDonald's</h3>
                    <div class="details">
                        <p class="open">Aberto <b>(12h ás 22h)</b></p>
                        <v-rating
                :model-value="3.5"
                color="amber"
                dense
                half-increments
                readonly
                size="20"
                ></v-rating>
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
    data(){
        return{
            n: 0
        }
    }
}
</script>