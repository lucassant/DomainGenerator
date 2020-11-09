<template>
  <div>
    <div id="slogan" class="text-center">
      <h1>NameGenerator</h1>

      <h6 class="text-secondary">Gerador de nomes usando vue.js</h6>
    </div>
    <div id="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import "font-awesome/css/font-awesome.css";

export default {
  name: "Home",
};
</script>

<style>
#slogan {
  margin-top: 30px;
  margin-bottom: 30px;
}

#main {
  background-color: #f1f1f1;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>