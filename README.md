# Stake AUS API
An unofficial wrapper for the Stake Australia share trading platform. Please note this is reversed engineered API as stake does not provide an official API

## Usage

```javascript
let api = new StakeAPI();
let userData = await api.authenticate("user@example.com", "SuperSecretPassword")
let equityPositions = await api.getEquityPositions();
```