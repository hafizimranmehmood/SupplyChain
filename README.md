Truffle: 						v5.1.13
Node:							v13.11.0
Web3:							1.2.4
SupplyChain contract Address on the Rinkeby Network: 	0xB8577F24f9bE5E4C9a048052A947FBcE4070A50C
Transaction Hash:    					0xa489e80bcbd9cef013510177bffe1a05d11e858d5cdec36f16d0c829f788c710


-UML diagrams are part of UML directory
-Used Rols library. To utilize access control we need this library. This library allows us to assign roles to different users as well as control who can use certain functions.
-Did not use IPFS

- From project app folder run command [npm run dev]
- From seperate window run command [truffle develop, then compile, migrate, test]

- I added 5 accounts in MetaMask
- Using first account i added roles like (Farmer, Distributor, Retailer, Consumer)
- Using 2nd account as Famer i called the functions (harvestItem, processItem, packItem, sellItem)
- Using 3rd account as Distributor i called functions like (buyItem, shipItem)
- Using 3th account as Retailer i called function receiveItem
- Using 4th account as Consumer i called function purchaseItem

-Logs of deploying the contract to rinkeby also included [truffle-migration.txt]
-I also included screenshot of different steps 

