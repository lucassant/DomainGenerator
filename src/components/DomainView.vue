<template>
  <div>
    <b-container
      ><div class="text-left">
        <router-link to="/domains">Voltar</router-link>
        <br />
        <br />
        <h2>{{ domain }}</h2>
      </div></b-container
    >
  </div>
</template>

<script>
export default {
  name: "DomainView",
  props: ["domain"],
  data() {
    return {};
  },
};
</script>

<style>
</style>