const BitGoJS = require('bitgo');
 const bitgo = new BitGoJS.BitGo({ env: 'test' });

 // TODO: set your access token here
 const accessToken = 'e794ec975726d7e1aa518ff3ab6593095fa7a73640b295e7e53a6ad6486b4395';

 // TODO: set a label for your new wallet here
 const label = 'BitGo Solutions Engineering Challange Challenge - Raphael Sanches';

 // TODO: set your passphrase for your new wallet here
 const passphrase = '6ood%7uck!';

// ETH only- Specify the wallet creation contract version used when creating a wallet contract.
// Use 0 for the old wallet creation, 1 for the new wallet creation, where it is only deployed upon receiving funds.
 const walletVersion = 1;

 // TODO: set your enterprise here
 const enterprise = '';

 const coin = 'tbtc';

 // Create the wallet
async function createWallet() {
  bitgo.authenticateWithAccessToken({ accessToken });

  const walletOptions = {
    label,
    passphrase,
    //walletVersion,
    //enterprise,
  };

  const wallet = await bitgo.coin(coin).wallets().generateWallet(walletOptions);

  const walletInstance = wallet.wallet;

  console.log(`Wallet ID: ${walletInstance.id()}`);
  console.log(`Receive address: ${walletInstance.receiveAddress()}`);

  console.log('BACK THIS UP: ');
  console.log(`User keychain encrypted xPrv: ${wallet.userKeychain.encryptedPrv}`);
  console.log(`Backup keychain xPrv: ${wallet.backupKeychain.prv}`);
}

createWallet().catch((e) => console.error(e));


