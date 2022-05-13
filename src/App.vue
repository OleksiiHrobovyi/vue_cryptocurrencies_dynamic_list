<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>

import MainLayout from '@/layouts/MainLayout'

export default {
  computed: {
    layout() {  // in case if we have 2 or more layouts
      return (this.$route.meta.layout || 'main') + '-layout'
    }
  },

  components: {
    MainLayout
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html, body, #app {
  height: 100%;
}
</style>
