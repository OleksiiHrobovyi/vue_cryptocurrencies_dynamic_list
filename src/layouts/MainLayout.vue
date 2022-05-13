<template>
  <div class="main-layout">
    <CryptoNavbar/>
    <router-view/>
  </div>
</template>

<script>

import CryptoNavbar from "@/components/CryptoNavbar";

export default {
  name: "MainLayout",
  components: {
    CryptoNavbar
  }
}
</script>

<style>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>

