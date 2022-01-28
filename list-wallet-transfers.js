/**
 * List all transfers on multi-sig wallets at BitGo for the given coin.
 *
 * This tool will help you see how to use the BitGo API to easily list your
 * BitGo wallets.
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
 
 Promise.coroutine(function *() {
   bitgo.authenticateWithAccessToken({ accessToken: accessToken });
 
   const walletInstance = yield basecoin.wallets().get({ id: walletId });
   const transfers = yield walletInstance.transfers();
 
   console.log('Wallet ID:', walletInstance.id());
   console.log('Current Receive Address:', walletInstance.receiveAddress());
   console.log('Wallet Transactions:', JSON.stringify(transfers, null, 4));
 })();