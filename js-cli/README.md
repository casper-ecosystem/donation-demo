# Donation Demo JS contract client

This is a simple JavaScript client for the Donation Demo contract. It uses the Casper JS SDK to interact with the contract. 

## Usage

```bash
$ npm run scripts:donate -- \
    --owner_keys_path ../smart-contract/user-1-keys/secret_key.pem \
    --keys_algo ed25519 \
    --contract_package_hash <contract_package_hash> \
    --payment_amount 12000000000 \
    --amount 10000000000 \
    --praise "Great job dear barista."    
```
