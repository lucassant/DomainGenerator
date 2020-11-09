import Vue from "vue"
import Vuex from "vuex"
import gql from "graphql-tag"

import graphqlClient from "../utils/graphql";

Vue.use(Vuex)

const state = {
    items: {
        prefix: [],
        sufix: [],
    },
    domains: [],
}

const mutations = {
    addItem(state, payload) {
        const { item, newItem } = payload;
        state.items[item.type].push(newItem);
    },
    deleteItem(state, payload) {
        const { item } = payload;
        state.items[item.type].splice(state.items[item.type].indexOf(item), 1);
    },
    setItems(state, payload) {
        const { type, items } = payload;
        state.items[type] = items;
    },

}

const actions = {
    async addItem(context, payload) {
        const ADD_ITEM = gql`
    mutation addItem($type: String!, $description: String!) {
      insert_items_one(object: { type: $type, description: $description }) {
        id
        type
        description
      }
    }
  `;
        const item = payload;
        graphqlClient.mutate({
            mutation: ADD_ITEM,
            variables: {
                type: item.type,
                description: item.description,
            },
        })
            .then((response) => {
                const newItem = response.data.insert_items_one;
                context.commit("addItem", { item, newItem });
                context.dispatch("generateDomains");
            });
    },
    async deleteItem(context, payload) {
        const item = payload;
        const DELETE_ITEM = gql`
        mutation deleteItem($id: Int!) {
          delete_items_by_pk(id: $id) {
            id
            type
            description
          }
        }
      `;
        graphqlClient.mutate({
            mutation: DELETE_ITEM,
            variables: {
                id: item.id,
            },
        })
            .then(() => {
                context.commit("deleteItem", { item });
                context.dispatch("generateDomains");
            });
    },
    async getItems(context, payload) {

        const GET_ITEMS = gql`
                  query($type: String!) {
                    items: items(where: { type: { _eq: $type } }) {
                      id
                      type
                      description
                    }
                  }
        `;

        const type = payload;

        return await graphqlClient.query({
            query: GET_ITEMS,
            variables: {
                type: type,
            },
        })
            .then((response) => {
                const query = response.data;
                context.commit("setItems", { type: type, items: query.items });

            });
    },
    async generateDomains(context) {
        context.state.domains = [];

        for (const pref of context.state.items.prefix) {
            for (const suf of context.state.items.sufix) {
                const name = pref.description + suf.description;
                const url = name.toLowerCase();
                const checkout = `https://domains.google.com/registrar/search?searchTerm=${url}&hl=pt#`;
                context.state.domains.push({ name, url, checkout });
            }
        }
    }
}

export default new Vuex.Store({
    state, mutations, actions
})