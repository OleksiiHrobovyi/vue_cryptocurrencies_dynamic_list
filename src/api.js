import axios from "axios";

const apiKey = 'a79a4b068c25476dbeb3d72729d3e61065596c33c0e148a7f20cae0f6d0e1a19'

const api = axios.create({
    baseURL: 'https://min-api.cryptocompare.com',
    withCredentials: true,
    headers: {
        authorization: `Apikey ${apiKey}`
    }
})

export function getCoinsPrice(coinNames) {
    const fsyms = coinNames.join(',')
    const tsyms = 'USD'

    return api.get('/data/pricemulti', {
        params: {
            fsyms,
            tsyms
        }
    })
}
