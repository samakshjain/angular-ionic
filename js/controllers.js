angular.module('starter.controllers', [])


.controller('AccountCtrl', function($scope, itemList) {
	$scope.itemlist = itemList.all();
	$scope.remove = function(item) {
	itemList.remove(item); 
	};
	$scope.dealToggle = false;
	$scope.searchClicked = false;
	$scope.categories =['cat1',
						'cat2',
						'cat3',
						'cat4', 
						'cat5', 
						'cat6'];
	$scope.toggleSearch = function(){
		$scope.searchClicked = !($scope.searchClicked);
		$scope.searchText = null;
	};
	// toggle selectedCategories 
	$scope.toggleSelected = function(cat){
		if ($scope.selectedCategories.indexOf(cat) !== -1){
			$scope.selectedCategories.pop(cat);
		}
		else {
			$scope.selectedCategories.push(cat);
		};
	};
	$scope.selectedCategories = [];
	$scope.filterByCat = function(image) {
		if ($scope.selectedCategories.length > 0) {
		return ($scope.selectedCategories.indexOf(image.category) !== -1);
		}
		else {
		return true;
		}
	};
	
})
.controller('ItemCtrl', function($scope, $stateParams, itemList){
	console.log("paprika");
	$scope.item = itemList.get($stateParams.itemId);

})
.controller('LoginCtrl', function(){

})

.controller('WalletCtrl', function(){
		
})
.controller('SettingCtrl', function(){

})
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('messageCtrl', function($scope, Chats){
	$scope.chats = Chats.all();
  	$scope.remove = function(chat) {
    Chats.remove(chat); 
	}
});