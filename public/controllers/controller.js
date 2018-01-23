var myApp = angular.module('myApp', ['ui.router']);
myApp.controller('AppCtrl', ['loggedinState','transactionHistory','selectedProduct', '$rootScope','$timeout','$scope', '$http',"$state", function(loggedinState,transactionHistory,selectedProduct,$rootScope,$timeout,$scope, $http, $state) {
    console.log("Hello World from controller");

  $scope.products = {};
  $scope.currency = "R";
  $scope.selectedProd = selectedProduct.getItem()[0];
  $scope.transaction = {};
  $scope.date = new Date();
  $scope.history = transactionHistory.getItem();
  $scope.showPayForm = false;
  $scope.confirmPurchase = false;
  $rootScope.loggedInUser = loggedinState.getItem();
  /*$scope.isloggedin = $rootScope.loggedInUser.isloggedin;
  $scope.balance = $scope.isloggedin.balance;*/
  $scope.loginError = false;


  var getProducts = function(){
    $http({
          method: 'GET',
          url: '/getProducts'
        }).then(function (success){
          for(a=0;a < success.data.length; a++){
            if(parseFloat(success.data[a].price).toFixed(4) > 111 && parseFloat(success.data[a].price).toFixed(4) < 116){
                 success.data[a].discount = "Get a "+ success.data[a].discount1 +" discount";
                 success.data[a].newPrice = parseFloat(parseFloat(success.data[a].price) - parseFloat(success.data[a].discount1) / 100).toFixed(4);
            }else if(parseFloat(success.data[a].price).toFixed(4) > 120){
                 success.data[a].discount ="Get a "+ success.data[a].discount2 +" discount";
                 success.data[a].newPrice =  parseFloat(parseFloat(success.data[a].price) - parseFloat(success.data[a].discount2) / 100).toFixed(4);
            }else{
                  success.data[a].newPrice = parseFloat(success.data[a].price).toFixed(0);
            }
          };

          $scope.products = success.data;

          console.log($scope.products);
           console.log($scope.loggedInUser);
        },function (error){
          console.log("oops something went wrong");
        });
  }

  $scope.fetchProduct = function(id){
      $http({
          method: 'GET',
          url: '/getProduct/'+id
        }).then(function (success){
        
        for(a=0;a < success.data.length; a++){
            if(success.data[a].price > 111 && success.data[a].price < 116){
                 success.data[a].discount = "Get a 0.25% discount";
                 success.data[a].newPrice = parseInt(success.data[a].price) - 0.25/100;
            }else if(success.data[a].price > 120){
                 success.data[a].discount = "Get a 0.50% discount";
                 success.data[a].newPrice = parseInt(success.data[a].price) - 0.50/100;
            }else{
                  success.data[a].newPrice = success.data[a].price;
            }
          };

          //$scope.selectedProd = success.data;
          selectedProduct.addItem(success.data);
             $state.go('product');
          console.log($scope.selectedProd);
        },function (error){
          console.log("oops something went wrong");
        });
  }

  $scope.getHistory = function(id){
      $http({
          method: 'GET',
          url: '/getHistory/'+$rootScope.loggedInUser[0]._id
        }).then(function (success){

              $scope.history = success.data;

          console.log($scope.history);
          transactionHistory.addItem($scope.history);
      
         // $scope.history.purchases = success.data;
          $state.go('transactionHistory');
        },function (error){
          console.log("oops something went wrong");
        });
    
  }

  $scope.showPayFormToggle = function(val){
    $scope.showPayForm = val;
  }
$scope.showPayConfirmation = function(val){
    $scope.confirmPurchase = val;
  }

  $scope.navigate = function(val){
    console.log(val)
      $state.go(val);
  }

  $scope.getUser = function(obj){
   
      $http({
          method: 'POST',
          url: '/login',
          data: obj
        }).then(function (success){

          console.log(success.data);  

          /*if(success.data.length > 0){*/
             $rootScope.loggedInUser = success.data;
             $rootScope.loggedInUser[0].isloggedin = true;
             $rootScope.isAdmin = success.data[0].isAdmin;
             $rootScope.balance = success.data[0].balance;
             $rootScope.isloggedin = true;

              console.log(success.data);  
              console.log($rootScope.isloggedin);
              console.log($rootScope.balance);
              console.log(success.data[0].balance);
              loggedinState.addItem($rootScope.loggedInUser);

              $state.go('home');

         
        },function (error){
          console.log("oops something went wrong");
        });

      
  }

  $scope.setUser = function(obj){
    
      obj.isAdmin = false;
      obj.balance = 0;

        $http({
          method: 'GET',
          url: '/checkuser/'+obj.username,
          }).then(function (success){
            if(success.data.length){
                console.log("User already exists");
            }else{
              $http({
                  method: 'POST',
                  url: '/register',
                  data: obj
                }).then(function (success){
                  //$scope.getUpdatedUser(success.data[0]._id);       
                  $state.go('login');
                },function (error){
                  console.log("oops something went wrong");
                });
            }
            /*$scope.getUpdatedUser(success.data[0]._id);       
            $state.go('login',{},{reload: true});*/

          },function (error){
            console.log("oops something went wrong");
          });
  }


  $scope.addProduct = function(obj){
      $http({
          method: 'GET',
          url: '/checkuser/'+obj.username,
          }).then(function (success){
            if(success.data.length){
                console.log("User already exists");
            }else{
                $http({
                  method: 'POST',
                  url: '/addProduct',
                  data: obj
                }).then(function (success){

                  getProducts();
                 
                },function (error){
                  console.log("oops something went wrong");
                });
            }
            },function (error){
            console.log("oops something went wrong");
          });
   
     
  }

  

  $scope.getUpdatedUser = function(id){
     $http({
          method: 'GET',
          url: '/getUpdatedUser/'+id
        }).then(function (success){

             $rootScope.loggedInUser = success.data;
             $rootScope.loggedInUser[0].isloggedin = true;
             $rootScope.isAdmin = success.data[0].isAdmin;
             $rootScope.balance = success.data[0].balance;
             $rootScope.isloggedin = true;
             $state.go('home',{},{reload:true});
             loggedinState.addItem($rootScope.loggedInUser);
          
         // $scope.history.purchases = success.data;
        },function (error){
          console.log("oops something went wrong");
        });
  }

  $scope.topUp = function(topUpObj){
    var tempObj = {};

    tempObj.newPrice = topUpObj.amount;
    tempObj.name = topUpObj.name;
    $scope.addHistory(tempObj, false);
    $scope.updateBalance(topUpObj.amount, false)

  }
  $scope.logout = function(){
             $rootScope.loggedInUser = {};
             //$rootScope.loggedInUser[0].isloggedin = false;

             $rootScope.balance = 0;
             $rootScope.isloggedin = false;

             loggedinState.addItem($rootScope.loggedInUser);
             $state.go('home',{},{reload:true});
             
  }

  $scope.updateBalance = function(amount, isPurchase){

    var tempObj = {};
  if(!isPurchase){
    var bal = parseFloat($rootScope.balance);
    var amnt = parseFloat(amount);
    var sum = bal + amnt;
    tempObj.balance = sum.toFixed(2);
  }else{
    tempObj.balance = parseFloat(amount).toFixed(2);
  }

    tempObj.id = $rootScope.loggedInUser[0]._id;



    $http({
          method: 'POST',
          url: '/updateBalance',
          data: tempObj
        }).then(function (success){

          //$scope.selectedProd = success.data;
          //selectedProduct.addItem(success.data);
          $scope.getUpdatedUser(tempObj.id)
          $state.go('transactionSuccess');

        },function (error){
          console.log("oops something went wrong");
        });
  }

  $scope.addHistory = function(obj, isPurchase) {
  
  obj.date = $scope.date;
  obj.userId =  $rootScope.loggedInUser[0]._id;

  if(isPurchase){
    obj.isPurchase = true;
    obj.type = "Purchase"
  }else{
    obj.isPurchase = false;
    obj.type = "Topup"
  }

  $scope.transaction = obj;

      if(obj.isPurchase && obj.newPrice < $rootScope.balance){

        $scope.updateBalance($rootScope.balance - obj.newPrice, true);

      };

  $http({
          method: 'POST',
          url: '/addHistory',
          data: $scope.transaction
        }).then(function (success){

          
          //$scope.selectedProd = success.data;
          //selectedProduct.addItem(success.data);
          $state.go('transactionSuccess');
          console.log($scope.selectedProd);
        },function (error){
          console.log("oops something went wrong");
        });

      }

   $scope.$on('onBeforeUnload', function (e, confirmation) {
        confirmation.message = "All data willl be lost.";
        e.preventDefault();
    });

  getProducts();

}]);﻿ 

  myApp.config(["$stateProvider","$urlRouterProvider",function($stateProvider, $urlRouterProvider) {
  var helloState = {
    name: 'home',
    url: '/',
    templateUrl: 'home.html',
    controller:'AppCtrl'
  }

  var products = {
    name: 'product',
    url: '/product',
    templateUrl: 'product.html',
    controller:'AppCtrl'
  }

  var transactionSuccess = {
    name: 'transactionSuccess',
    url: '/transaction-successful',
    templateUrl: 'transaction-successful.html',
    controller:'AppCtrl'
  }
    var transactionHistory = {
    name: 'transactionHistory',
    url: '/transaction-history',
    templateUrl: 'transaction-history.html',
    controller:'AppCtrl'
  }

   var login = {
    name: 'login',
    url: '/login',
    templateUrl: 'login.html',
    controller:'AppCtrl'
  }

  var profile = {
    name: 'profile',
    url: '/profile',
    templateUrl: 'profile.html',
    controller:'AppCtrl'
  }

  var register = {
    name: 'register',
    url: '/register',
    templateUrl: 'register.html',
    controller:'AppCtrl'
  }

  var admin = {
    name: 'admin',
    url: '/admin',
    templateUrl: 'admin.html',
    controller:'AppCtrl'
  }

/*var nav = { 
    name: 'home.nav', //mandatory. This counter-intuitive requirement addressed in issue #368
         //mandatory
    templateUrl: 'nav.html',
    controller:'AppCtrl'
}*/


    $urlRouterProvider.otherwise("/");
    $stateProvider.state('root',{
      templateUrl: 'home.html'
    });

/*    $stateProvider.state(nav);*/
    $stateProvider.state(admin);
    $stateProvider.state(helloState);
    $stateProvider.state(profile);
    $stateProvider.state(login);
    $stateProvider.state(register);
    $stateProvider.state(products);
    $stateProvider.state(transactionSuccess);
    $stateProvider.state(transactionHistory);

  }]);


//////////Service need to move out to seperate js file
  myApp.factory('selectedProduct', function() {
  var sharedproduct = {};

  return {
    addItem: addItem,
    getItem: getItem
  };

  function addItem(item) {
    sharedproduct = item;
  }

  function getItem() {
    return sharedproduct;
  }
});

  myApp.factory('transactionHistory', function() {
  var historyObj = {};

  return {
    addItem: addItem,
    getItem: getItem
  };

  function addItem(item) {
    historyObj = item;
  }

  function getItem() {
    return historyObj;
  }
});

  myApp.factory('beforeUnload', function ($rootScope, $window) {
    // Events are broadcast outside the Scope Lifecycle
    
    $window.onbeforeunload = function (e) {
        var confirmation = {};
        var event = $rootScope.$broadcast('onBeforeUnload', confirmation);
        if (event.defaultPrevented) {
            return confirmation.message;
        }
    };
    
    $window.onunload = function () {
        $rootScope.$broadcast('onUnload');
    };
    return {};
})
.run(function (beforeUnload) {
    // Must invoke the service at least once
});


 myApp.factory('loggedinState', function() {
  var loggedinStateUser = {};

  return {
    addItem: addItem,
    getItem: getItem
  };

  function addItem(item) {
    loggedinStateUser.data = item;
  }

  function getItem() {
    return loggedinStateUser.data;
  }
});