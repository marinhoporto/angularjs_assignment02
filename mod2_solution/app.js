(function () {
'use strict';
console.log("Init IIFE");

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyCtrl',ToBuyController)
.controller('AlreadyBoughtCtrl', AlreadyBoughtController )
.service('ShoppingListCheckOffSvc', ShoppingListCheckOffService);
console.log("Init controllers and service");

ToBuyController.$inject = ['ShoppingListCheckOffSvc'];
function ToBuyController(ShoppingListCheckOffSvc) {
     console.log("Init ToBuyController");
     var list = this;
     list.items_buy = ShoppingListCheckOffSvc.getBuy();
     console.log("list.items_buy", list.items_buy, "size is: ", list.items_buy.length);
     list.errorMessage;
     list.buyItem = function(itemIndex){
          ShoppingListCheckOffSvc.buyItem(itemIndex);
          if(list.items_buy.length == 0)
              list.errorMessage = "Everything is bought!";
          else
              list.errorMessage = "";
     };
}

 AlreadyBoughtController.$inject = ['ShoppingListCheckOffSvc'];
 function AlreadyBoughtController(ShoppingListCheckOffSvc) {
     console.log("Init AlreadyBoughtController");
     var list = this;
     list.errorMessage = ShoppingListCheckOffSvc.getMessageNothingBought();
     list.items_bought = ShoppingListCheckOffSvc.getBought();
     console.log("list.items_bought", list.items_bought, "size is: ", list.items_bought.length);
 }

function ShoppingListCheckOffService() {
    console.log("Init ShoppingListCheckOffService");
    var service = this;
    service.buy = [{ quantity:8,name:"Cookies" },{ quantity:12,name:"Bagles" },
    { quantity:7,name:"Butter" },{ quantity:13,name:"Cream Cheese" },{ quantity:2,name:"Pasta" }];
    service.bought = [];
    service.errorNothingBought = "Nothing bought yet.";
    console.log("buy: ",service.buy,"bought: ",service.bought);

    service.getMessageNothingBought = function(){
        return service.errorNothingBought;
    }

    service.getBuy = function(){
        return service.buy;
    }

    service.getBought = function(){
        return service.bought;
    }

    service.buyItem = function(itemIndex){
        console.log("Remove item number: ",itemIndex);
        service.bought.push(service.buy[itemIndex]);
        service.buy.splice(itemIndex, 1);
    }
 }

})();
