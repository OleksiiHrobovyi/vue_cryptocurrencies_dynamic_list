<template>
  <div class="coin-list-wrapper">
    <div class="coin-list-header">
      <div class="coin-list-header-input">
        <input-text :class="{'p-invalid': errorMessage}" placeholder="Enter coin name..." @keydown.enter.native="addCoin" v-model="coinName"/>
        <small v-if="errorMessage" class="p-error">{{ errorMessage }}</small>
      </div>
      <Button @click="addCoin" icon="pi pi-check" :disabled="!coinName" class="p-button-success"/>
    </div>
    <div class="coin-list">
      <CryptoCard
          v-for="(coin, index) in currentPageCoins"
          :key="coin.name"
          :name="coin.name"
          :price="coin.price"
          @remove="deleteCoin(index)"
      />
    </div>
    <Paginator class="coin-list-paginator" :rows="$options.pageSize" :totalRecords="coins.length" @page="onPageChange"></Paginator>
  </div>
</template>

<script>

import CryptoCard from "@/components/CryptoCard";
import Paginator from 'primevue/paginator'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button';
import {getCoinsPrice} from "@/api";

export default {
  name: "CoinList",
  components: {
    CryptoCard, Paginator, InputText, Button
  },
  pageSize: 8,
  coinsLoaderInterval: null,
  data () {
    return {
      coins: [],
      coinName: '',
      currentPage: 1,
      errorMessage: ''
    }
  },
  computed: {
      currentPageCoins() {
      return this.coins.slice(this.currentPage * this.$options.pageSize - 8, this.currentPage * this.$options.pageSize)
    }
  },
  watch: {
    coins() {
      this.saveCoins()
    }
  },
  mounted() {
    const savedCoins = this.getSavedCoins()

    savedCoins.forEach(coinName => {
      this.coins.push({
        name: coinName,
        price: 0
      })
    })

    this.$options.coinsLoaderInterval = setInterval(() => {
      this.loadCoinsData()
    }, 3000)

    this.loadCoinsData()
  },
  beforeDestroy() {
    clearInterval(this.$options.coinsLoaderInterval)
  },
  methods: {
    getSavedCoins() {
      const rawData = localStorage.getItem('coins') || '[]'

      return JSON.parse(rawData)
    },
    deleteCoin(coinIndex) {
      this.coins.splice(coinIndex, 1)
    },
    saveCoins() {
      const coinNames = this.coins.map(coin => coin.name)
      localStorage.setItem('coins', JSON.stringify(coinNames))
    },
    async loadCoinsData() {
      try {
        const coinNames = this.coins.map(coin => coin.name)

        if (coinNames.length === 0) {
          return
        }

        const {data: coinsData} = await getCoinsPrice(coinNames)

        Object.entries(coinsData).forEach(([coinName, coinData]) => {

          const currentCoin = this.coins.find(coin => {
            return coin.name === coinName
          })

          currentCoin.price = coinData.USD
        })

      } catch (e) {
        console.log(e)
      }
    },
    async addCoin() {
      if (!this.coinName) {
        return
      }

      const coinNameCopy = this.coinName.toUpperCase()
      this.coinName = ''

      if (this.coins.find(coin => coin.name === coinNameCopy)) {
        this.errorMessage = `${coinNameCopy} is already added`
        return
      }

      const {data} = await getCoinsPrice([coinNameCopy])

      if (data.Response === 'Error') {
        this.errorMessage = data.Message
        return
      }

      this.coins.unshift({
        name: coinNameCopy,
        price: data[coinNameCopy].USD
      })

      this.errorMessage = ''
    },
    onPageChange({page}) {
      this.currentPage = page + 1
    }
  }
}

</script>

<style scoped>
.coin-list-header {
  margin-bottom: 24px;
  padding-bottom: 24px;
  display: grid;
  align-items: flex-start;
  grid-column-gap: 12px;
  grid-template-columns: 1fr auto;
}

.coin-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: min-content;
  grid-gap: 32px;
}

.coin-list-wrapper {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.coin-list-paginator {
  margin-top: auto;
}

.coin-list-header-input {
  display: grid;
  grid-row-gap: 4px;
}
</style>
