<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            :subtitle="uid"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-folder"
            title="Pedidos Aprovados"
            @click="type_list = 1"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-multiple"
            title="Pedidos Prontos"
            @click="type_list = 2"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-star"
            title="Starred"
            value="starred"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main  style="height: 100vh">
      <TableProduct :list_approved="list_approved" :client_uid="uid" :type="type_list" v-if="type_list != 0"></TableProduct>  
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import TableProduct from '@/components/Clients/Manage/TableProduct.vue';

export default {
    name: "ClientManage",
    props: {
        uid: String,
    },
    data() {
        return {
            list_approved: [],
            type: false,
            type_list: 0
        };
    },
    methods: {
        getOrders() {
            this.$axios
                .get(`${this.$HOST}/v1/users/clients/${this.uid}/orders`)
                .catch(() => {
                    this.$router.push('/')
                })
                .then((response) => {
                this.list_approved = response.data.orders;
            });
        },
    },
    mounted() {
        this.getOrders();
    },
    components: { TableProduct }
};
</script>