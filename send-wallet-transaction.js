/**
 * Send a transaction from a multi-sig wallet at BitGo.
 *
 * Copyright 2019, BitGo, Inc.  All Rights Reserved.
 */
 const BitGoJS = require('bitgo');
 const bitgo = new BitGoJS.BitGo({ env: 'test' });
 const Promise = require('bluebird');
 
 const coin = 'tbtc';
 const basecoin = bitgo.coin(coin);
 // TODO: set your access token here
 const accessToken = 'e794ec975726d7e1aa518ff3ab6593095fa7a73640b295e7e53a6ad6486b4395';
 const walletId = '61f0662af492c00007e55cf831cd8c69';
 //receiveWalletId = '61f0662af492c00007e55cf831cd8c69'
 // TODO: set your passphrase here
 const walletPassphrase = '6ood%7uck!';
 
 Promise.coroutine(function *() {
   bitgo.authenticateWithAccessToken({ accessToken: accessToken });
 
   const walletInstance = yield basecoin.wallets().get({ id: walletId });
 
   const newReceiveAddress1 = yield walletInstance.createAddress();
   
   const newReceiveAddress2 = yield walletInstance.createAddress();
 
   const transaction = yield walletInstance.sendMany({
     recipients: [
       {
         amount: '12341234',
         address: newReceiveAddress1.address,
       },
       {
        amount: '13370000',
        address: newReceiveAddress2.address,
      },
     ],
     walletPassphrase: walletPassphrase,
   });
   const explanation = yield basecoin.explainTransaction({ txHex: transaction.tx });
 
   console.log('Wallet ID:', walletInstance.id());
   console.log('Current Receive Address:', walletInstance.receiveAddress());
   console.log('New Transaction:', JSON.stringify(transaction, null, 4));
   console.log('Transaction Explanation:', JSON.stringify(explanation, null, 4));
 })();