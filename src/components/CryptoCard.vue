<template>
  <Card class="crypto-card">
    <template #title>
      {{name}}
    </template>
    <template #content>
      <div class="crypto-card-content">
        <span>${{price}}</span>
        <Button @click="removeCoin" label="Delete" icon="pi pi-trash" class="p-button-danger"/>
      </div>
    </template>
  </Card>
</template>

<script>

import Card from 'primevue/card';
import Button from "primevue/button";

export default {
  name: "CryptoCard",
  components: {
    Card,
    Button
  },
  props: {
    name: {
      type: String,
      default: 'TDC'
    },
    price: {
      type: Number,
      default: 0
    }
  },
  methods: {
    removeCoin() {
      this.$emit('remove')
    },
    goToCoin() {
      this.$router.push({ name: 'coin-detail', params: { coinName: this.name } })
    }
  }
}
</script>

<style scoped>
.crypto-card {
  cursor: pointer;
  text-align: center;
}

.crypto-card:hover {
  background-color: rgba(0, 0, 0, .1);
}

.crypto-card-content {
  display: grid;
  justify-items: center;
  grid-row-gap: 12px;
}
</style>
