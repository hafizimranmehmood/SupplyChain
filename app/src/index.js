import Web3 from "web3";
import supplyChainArtifact from "../../build/contracts/SupplyChain.json";
import './style.css';

const App = {
    web3: null,
    account: null,
    meta: null,
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();

        console.log(
            App.sku,
            App.upc,
            App.ownerID, 
            App.originFarmerID, 
            App.originFarmName, 
            App.originFarmInformation, 
            App.originFarmLatitude, 
            App.originFarmLongitude, 
            App.productNotes, 
            App.productPrice, 
            App.distributorID, 
            App.retailerID, 
            App.consumerID
        );
    },

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = supplyChainArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        supplyChainArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      
      App.readForm();
      App.bindEvents();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

   bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);

        switch(processId) {
            case 1:
                return await App.harvestItem(event);
                break;
            case 2:
                return await App.processItem(event);
                break;
            case 3:
                return await App.packItem(event);
                break;
            case 4:
                return await App.sellItem(event);
                break;
            case 5:
                return await App.buyItem(event);
                break;
            case 6:
                return await App.shipItem(event);
                break;
            case 7:
                return await App.receiveItem(event);
                break;
            case 8:
                return await App.purchaseItem(event);
                break;
            case 9:
                return await App.fetchItemBufferOne(event);
                break;
            case 10:
                return await App.fetchItemBufferTwo(event);
                break;
            case 11:
                return await App.addFarmer();
                break;
            case 12:
                return await App.addDistributor();
                break;
            case 13:
                return await App.addRetailer();
                break;
            case 14:
                return await App.addConsumer();
                break;
            }
    },

    addFarmer: async function () {
        App.ownerID = $("#ownerID").val();
        const { addFarmer } = this.meta.methods;
        await addFarmer(App.originFarmerID).send({from: this.account});
    },

    addDistributor: async function () {
        App.ownerID = $("#ownerID").val();
        const { addDistributor } = this.meta.methods;
        await addDistributor(App.distributorID).send({from: this.account});
    },

    addRetailer: async function () {
        App.ownerID = $("#ownerID").val();
        const { addRetailer } = this.meta.methods;
        await addRetailer(App.retailerID).send({from: this.account});
    },

    addConsumer: async function () {
        App.ownerID = $("#ownerID").val();
        const { addConsumer } = this.meta.methods;
        await addConsumer(App.consumerID).send({from: this.account});
    },

    harvestItem: async function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const { harvestItem } = this.meta.methods;
        var result = await harvestItem(App.upc, 
                App.originFarmerID, 
                App.originFarmName, 
                App.originFarmInformation, 
                App.originFarmLatitude, 
                App.originFarmLongitude, 
                App.productNotes
                ).send({ from: App.originFarmerID });
        
            $("#ftc-item").text(result);
            console.log('harvestItem',result);
        App.showEvent('Harvested', result.transactionHash);
    },

    processItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const { processItem } = this.meta.methods;
        var result = await processItem(App.upc).send({from: App.originFarmerID});
        $("#ftc-item").text(result);
        console.log('processItem',result);
        App.showEvent('Processed', result.transactionHash);
    },
    
    packItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const { packItem } = this.meta.methods;
        var result = await packItem(App.upc).send({from: App.originFarmerID});
      
        $("#ftc-item").text(result);
        console.log('packItem',result);
        App.showEvent('Packed', result.transactionHash);
    },

     sellItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const { sellItem } = this.meta.methods;
        const productPrice = 10000000000;
        var result = await sellItem(App.upc, App.productPrice).send({from: App.originFarmerID});
        $("#ftc-item").text(result);
        console.log('sellItem',result);
        App.showEvent('ForSale', result.transactionHash);
    },

    buyItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const { buyItem } = this.meta.methods;
        const productPrice = 12000000000;
        var result = await buyItem(App.upc).send({from: App.distributorID, value: productPrice});
        $("#ftc-item").text(result);
        console.log('buyItem',result);
        App.showEvent('Sold', result.transactionHash);
        
    },

    shipItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const { shipItem } = this.meta.methods;
        var result = await shipItem(App.upc).send({from: App.distributorID});
        $("#ftc-item").text(result);
        console.log('shipItem',result);
        App.showEvent('Shipped', result.transactionHash);
    },

    receiveItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const { receiveItem } = this.meta.methods;
        var result = await receiveItem(App.upc).send({from: App.retailerID});
        $("#ftc-item").text(result);
        console.log('receiveItem',result);
        App.showEvent('Received', result.transactionHash);
    },

    purchaseItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const { purchaseItem } = this.meta.methods;
        var result = await purchaseItem(App.upc).send({from: App.consumerID});
        $("#ftc-item").text(result);
        console.log('purchaseItem',result);
        App.showEvent('Purchased', result.transactionHash);
    },

    fetchItemBufferOne: async function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        // console.log('upc',App.upc);
        const { fetchItemBufferOne } = this.meta.methods;
        var result = await fetchItemBufferOne(App.upc).call();
        
        $("#ftc-item").text(result);
        console.log('fetchItemBufferOne', result);
    },

    fetchItemBufferTwo: async function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        const { fetchItemBufferTwo } = this.meta.methods;
        var result = await fetchItemBufferTwo(App.upc).call();           
        
        $("#ftc-item").text(result);
        console.log('fetchItemBufferTwo', result);
    },

    showEvent: function (event, transactionHash) {
        $("#ftc-events").append('<li>' + event + ' - ' + transactionHash + '</li>');  
    }

};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
  }

  App.start();
});
