import web3
from stellar_sdk import Server, Keypair, TransactionEnvelope

# Konfigurasi Ethereum dan BSC
w3 = web3.Web3(web3.HTTPProvider('https://bsc-dataseed.binance.org/'))
eth_contract = w3.eth.contract(address="0xYourEthereumContract", abi="YourABI")
bsc_contract = w3.eth.contract(address="0xYourBSCContract", abi="YourABI")

# Konfigurasi Stellar
stellar_server = Server("https://horizon.stellar.org")
stellar_keypair = Keypair.from_secret("Your_Stellar_Secret")

def listen_to_stellar():
    transactions = stellar_server.transactions().for_account(stellar_keypair.public_key()).call()
    for tx in transactions["_embedded"]["records"]:
        if "memo" in tx and "ETH" in tx["memo"]:
            print("Bridging to Ethereum")
            eth_contract.functions.deposit(int(tx["amount"])).transact({'from': "0xYourEthereumAddress"})

def listen_to_bsc():
    event_filter = bsc_contract.events.TransferToStellar.createFilter(fromBlock='latest')
    for event in event_filter.get_new_entries():
        stellar_tx = TransactionEnvelope(event['amount'], stellar_server, stellar_keypair)
        stellar_tx.sign(stellar_keypair)
        stellar_server.submit_transaction(stellar_tx)

if __name__ == "__main__":
    listen_to_stellar()
    listen_to_bsc()


---
