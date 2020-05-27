<template>
  <v-card width="100%" height="100%" class="mx-auto">
    <v-col cols="12" sm="12">
      <v-text-field v-model="entity.text" counter="10" maxlength="10" label="Entity Name" outlined clearable></v-text-field>
    </v-col>
    <v-col cols="12" sm="12">
      <v-text-field
        v-model="entity.value"
        counter="50"
        maxlength="50"
        label="Entity ID (ex. media_player.foo)"
        outlined
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" align="right">
      <v-btn class="ma-2" depressed color="green" to="/entities">Cancel</v-btn>
      <v-btn class="ma-2" depressed color="primary" @click="save(entity)">Save</v-btn>
    </v-col>
  </v-card>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
import { Entity } from "./Entities.vue";

@Component
export default class EntityAdd extends Vue {
  entity = new Entity();

  save(entity: Entity): void {
    axios.post("/api/entities/", entity).then((res) => {
      if (res.data === "success") {
        this.$router.push("/entities");
      } else {
        alert("Error occured.");
      }
    });
  }
}
</script>
