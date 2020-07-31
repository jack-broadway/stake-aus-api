const axios = require('axios');

class StakeAPI {
    constructor(options){
        this.options = {
            api_url: "https://prd-api.stake.com.au/api",
            ...options
        }
        this.http = axios.create({
            baseURL: this.options.api_url,
        });
        this.sessionKey = null;
    }
    async authenticatedGet(url){
        if(this.sessionKey){
            return this.http.get(url, {
                headers: {
                    'Stake-Session-Token': this.sessionKey
                }
            });
        }
        throw "Please authenticate to the API before using this method";
    }
    async authenticate(username, password) {
        let res = await this.http.post('/sessions/createSession', {
            username: username,
            password: password
        }).then(res => res.data);
        this.sessionKey = res.sessionKey;
        return res;
    }
    async getEquityPositions() {
        return this.authenticatedGet('/users/accounts/v2/equityPositions').then(res => res.data);
    }
    async getAccountBalances() {
        return this.authenticatedGet('/users/accounts/cashAvailableForWithdrawal').then(res => res.data);
    }
    async getFxRates() {
        return this.authenticatedGet('/utils/getLatestFxRates').then(res => res.data);
    }
}

module.exports = StakeAPI;