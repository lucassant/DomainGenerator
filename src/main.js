import Vue from "vue"
import App from "./App.vue"
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue"
import VueRouter from "vue-router"
import Vuex from "vuex"
/*import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"*/

import DomainList from "./components/DomainList"
import DomainView from "./components/DomainView"

import VueApollo from "vue-apollo"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import store from "./stores/store";

Vue.config.productionTip = false

/*const httpLink = new HttpLink({
  uri: "https://vue-apollo-teste.herokuapp.com/v1/graphql"
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})*/

Vue.use(VueApollo)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)
Vue.use(Vuex)

/*const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})*/

const router = new VueRouter({
  routes: [
    {
      path: "/domains",
      component: DomainList
    },
    {
      path: "/domains/:domain",
      component: DomainView,
      props: true
    },
    {
      path: "/",
      redirect: "/domains"
    }
  ]
});

new Vue({
  router,
  //apolloProvider,
  store,
  render: h => h(App)
}).$mount("#app")
