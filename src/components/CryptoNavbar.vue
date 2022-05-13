<template>
  <div>
    <TabMenu :model="items"/>
  </div>
</template>

<script>

import TabMenu from 'primevue/tabmenu';

export default {
  name: "CryptoNavbar",
  components: {
    TabMenu
  },
  data() {
    return {
      items: [
        {label: 'CoinList', icon: 'pi pi-fw pi-home', to: '/'},
        {label: 'Top coin pairs', icon: 'pi pi-fw pi-calendar', to: '/top'},
      ]
    }
  }
}
</script>
