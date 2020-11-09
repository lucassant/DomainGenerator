<template>
  <div>
    <b-container>
      <b-row>
        <b-col
          ><ListItem
            title="Prefixo"
            type="prefix"
            :items="items.prefix"
            v-on:addItem="addItem"
            v-on:deleteItem="deleteItem"
        /></b-col>
        <b-col
          ><ListItem
            title="Sufixo"
            type="sufix"
            :items="items.sufix"
            v-on:addItem="addItem"
            v-on:deleteItem="deleteItem"
        /></b-col>
      </b-row>
      <br />
      <h5>
        Domínios <b-badge variant="info">{{ domains.length }}</b-badge>
      </h5>
      <b-card>
        <b-list-group>
          <b-list-group-item v-for="domain in domains" :key="domain.name">
            <b-row
              ><b-col>{{ domain.name }}</b-col
              ><b-col class="text-right"
                ><b-button
                  variant="info"
                  :href="domain.checkout"
                  target="_blank"
                  ><span class="fa fa-shopping-cart"></span
                ></b-button>
                &nbsp;
                <b-button variant="info" @click="openDomain(domain)"
                  ><span class="fa fa-search"></span></b-button></b-col></b-row
          ></b-list-group-item>
        </b-list-group>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import ListItem from "./ListItem";
import { mapState, mapActions } from "vuex";

export default {
  name: "DomainList",
  components: {
    ListItem,
  },
  methods: {
    ...mapActions(["addItem", "deleteItem", "getItems", "generateDomains"]),

    openDomain(domain) {
      this.$router.push({
        path: `/domains/${domain.name}`,
      });
    },
  },
  computed: {
    ...mapState(["items", "domains"]),
  },
  created() {
    //faz a requisição e puxa os dados
    Promise.all([this.getItems("prefix"), this.getItems("sufix")]).then(() => {
      this.generateDomains();
    });
  },
};
</script>

<style>
</style>