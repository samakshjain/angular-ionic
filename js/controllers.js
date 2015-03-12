angular.module('starter.controllers', [])


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('LoginCtrl', function(){

})

.controller('WalletCtrl', function(){
		
})
.controller('SettingCtrl', function(){

})
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatID);
})

.controller('messageCtrl', function($scope, Chats){
	$scope.chats = Chats.all();
  	$scope.remove = function(chat) {
    Chats.remove(chat); 
	}
});