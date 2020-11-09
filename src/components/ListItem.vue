<template>
  <div>
    <h5>
      {{ title }} <b-badge variant="info">{{ items.length }}</b-badge>
    </h5>
    <b-card>
      <b-list-group>
        <b-list-group-item v-for="item in items" :key="item.id">
          <b-row
            ><b-col> {{ item.description }}</b-col>
            <b-col class="text-right"
              ><b-button variant="outline-danger" @click="deleteItem(item)"
                ><span class="fa fa-trash"></span></b-button
            ></b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
      <br />
      <b-input-group>
        <b-form-input
          placeholder="Digite o item"
          trim
          v-model="description"
          v-on:keyup.enter="addItem(description, type)"
        ></b-form-input>
        <b-input-group-append>
          <b-button variant="info" @click="addItem(description, type)"
            >+</b-button
          >
        </b-input-group-append>
      </b-input-group>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  data() {
    return {
      description: "",
    };
  },
  props: ["title", "items", "type"],
  methods: {
    addItem(description, type) {
      this.$emit("addItem", { description, type });
      this.description = "";
    },
    deleteItem(item) {
      this.$emit("deleteItem", item);
      this.description = "";
    },
  },
};
</script>

<style>
</style>