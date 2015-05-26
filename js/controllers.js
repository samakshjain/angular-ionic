angular.module('starter.controllers', [])

.controller('AccountCtrl', function($scope, $interval, $ionicSlideBoxDelegate, $http) {
    $scope.flag = {
        first: true,
        second: false,
        third: false,
    };
    
    $scope.slideChanged = function(index) {
        //alert(index);
        switch (index) {
            case 0:
                $scope.flag = {
                    first: true,
                    second: false,
                    third: false,
                };
                break;
            case 1:
                $scope.flag = {
                    first: false,
                    second: true,
                    third: false
                };
                break;
            case 2:
                $scope.flag = {
                    first: false,
                    second: false,
                    third: true
                };
                break;
        }
    };

    var maxSlides = 5;
    var slideCounter = 2;

    var req = {
        method: 'GET',
        url: 'http://119.9.77.8:3000/coupons',

    }
    $http(req).success(function(data) {

        $scope.data = data;
        JSON.stringify(data);


        $ionicSlideBoxDelegate.update();

    });

    $scope.showPopup = function() {
        $scope.data = {}
        $scope.setDefault = function() {
            console.log('Default set', arguments);
            alert("test");
            $scope.$onClose({
                test: 'hello'
            });
        };


        $ionicPopup.show({
            template: '',
            title: 'Pick a default value',
            scope: $scope,

            buttons: [{
                text: 'Awesome',

                onTap: function(e) {
                    return 'awesome';
                }
            }, {
                text: 'Cool',
                onTap: function(e) {
                    return 'cool';
                }
            }, {
                text: 'Cooler',
                onTap: function(e) {
                    return 'cooler';
                }
            }, {
                text: 'Stuff',
                onTap: function(e) {
                    return 'stuff';
                }
            }]
        }).then(function(res) {
            alert("F");
            console.log('Tapped!', res);
        }, function(err) {
            console.log('Err:', err);
        }, function(msg) {
            console.log('message:', msg);
        });


    };


    $scope.dealToggle = false;
    $scope.searchClicked = false;
    $scope.categories = ['cat1',
        'cat2',
        'cat3',
        'cat4',
        'cat5',
        'cat6'
    ];
    $scope.toggleSearch = function() {
        $scope.searchClicked = !($scope.searchClicked);
        $scope.searchText = null;
    };
    // toggle selectedCategories 
    $scope.toggleSelected = function(cat) {
        if ($scope.selectedCategories.indexOf(cat) !== -1) {
            $scope.selectedCategories.pop(cat);
        } else {
            $scope.selectedCategories.push(cat);
        }
    };
    $scope.selectedCategories = [];
    $scope.filterByCat = function(image) {
        if ($scope.selectedCategories.length > 0) {
            return ($scope.selectedCategories.indexOf(image.category) !== -1);
        } else {
            return true;
        }
    };
    $scope.buttonClass1 = 'active-btn';
    $scope.buttonClass2 = 'inactive-btn';

})
.controller('couponCreateCtrl', function($scope, $http) {
    $scope.createCoupon = function(item) {
        var req = {
                method: 'POST',
                url: '119.9.77.8:3000/createcoupon',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "brand": $scope.coupon.brand,
                    "valid_thru": $scope.coupon.valid_thru,
                    "desc": $scope.coupon.desc,
                }
            }
            //console.log(req);
        $http(req).success(function(data) {
            //alert(data);
        });
    }

})
.controller('ItemCtrl', function($scope, $stateParams, itemList) {
    $scope.item = itemList.get($stateParams.itemId);
})
.controller('LoginCtrl', function($scope, $state, $cookieStore, $http) {

    /**
     * SOCIAL LOGIN
     * Facebook and Google
     */
    // FB Login
    $scope.fbLogin = function() {
        FB.login(function(response) {
            if (response.authResponse) {
                getUserInfo();
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {
            scope: 'email,user_photos,user_videos'
        });

        function getUserInfo() {
            // get basic info
            FB.api('/me', function(response) {
                //console.log('Facebook Login RESPONSE: ' + angular.toJson(response));
                // get profile picture
                FB.api('/me/picture?type=normal', function(picResponse) {
                    //console.log('Facebook Login RESPONSE: ' + picResponse.data.url);
                    response.imageUrl = picResponse.data.url;
                    // store data to DB - Call to API
                    // Todo
                    // After posting user data to server successfully store user data locally
                    var user = {};
                    user.name = response.name;
                    user.email = response.email;
                    if (response.gender) {
                        response.gender.toString().toLowerCase() === 'male' ? user.gender = 'M' : user.gender = 'F';
                    } else {
                        user.gender = '';
                    }
                    user.profilePic = picResponse.data.url;
                    $scope.showHideCreateCoupons = !$scope.showHideCreateCoupons;
                    //post to db
                    var req = {
                        method: 'POST',
                        url: "http://119.9.77.8:3000/api/v1/user",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {
                            "name": user.name,
                            "email": user.email,
                            "type": "FB"
                        }
                    }
                    $http(req);
                    $cookieStore.put('userInfo', user);
                    $state.go('account-dash');

                });
            });
        }
    };
    // END FB Login

    // Google Plus Login
    $scope.gplusLogin = function() {
        var myParams = {
            // Replace client id with yours
            'clientid': '797171850718-9soln788cirid252cfohsoci6h64bkbe.apps.googleusercontent.com',
            'cookiepolicy': 'single_host_origin',
            'callback': loginCallback,
            'approvalprompt': 'force',
            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
        };
        gapi.auth.signIn(myParams);

        function loginCallback(result) {
            if (result['status']['signed_in']) {
                var request = gapi.client.plus.people.get({
                    'userId': 'me'
                });
                request.execute(function(resp) {
                    console.log('Google+ Login RESPONSE: ' + angular.toJson(resp));
                    var userEmail;
                    if (resp['emails']) {
                        for (var i = 0; i < resp['emails'].length; i++) {
                            if (resp['emails'][i]['type'] == 'account') {
                                userEmail = resp['emails'][i]['value'];
                            }
                        }
                    }
                    // store data to DB
                    var user = {};
                    user.name = resp.displayName;
                    user.email = userEmail;
                    if (resp.gender) {
                        resp.gender.toString().toLowerCase() === 'male' ? user.gender = 'M' : user.gender = 'F';
                    } else {
                        user.gender = '';
                    }
                    user.profilePic = resp.image.url;
                    $cookieStore.put('userInfo', user);
                    $state.go('account-dash');
                    });
                }
            }
    };
    // END Google Plus Login
})

.controller('WalletCtrl', function($scope, $ionicHistory) {
        $scope.goBack = function(){
            $ionicHistory.goBack();
        }

})
.controller('SettingCtrl', function($scope, $ionicHistory) {
    $scope.goBack = function(){
            $ionicHistory.goBack();
        }
})
.controller('couponDetailsController', function($scope, $ionicHistory) {
    $scope.goBack = function(){
            $ionicHistory.goBack();
        }
})
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})
.controller('favCtrl', function($scope, $http, $ionicSlideBoxDelegate, $ionicHistory) {
    $scope.slideSelect = function(i) {
        $scope.activeSlide = i;
        };
    $http.get('http://119.9.77.8:3000/categories').success(function(data) {
        $scope.categories = data;
        });
    $scope.goBack = function(){
            $ionicHistory.goBack();
        }

})
.controller('messageCtrl', function($scope, $ionicHistory) {
    $scope.goBack = function(){
        $ionicHistory.goBack();
    }
})
.controller('missionDetailController', function($scope, $ionicHistory){
        $scope.goBack = function(){
            $ionicHistory.goBack();
        }
})
    .controller('instructions', function($scope, $interval, $ionicSlideBoxDelegate, $http) {
    $scope.flag = {
        first: true,
        second: false,
        third: false,
    };
    
    $scope.slideChanged = function(index) {
        //alert(index);
        switch (index) {
            case 0:
                $scope.flag = {
                    first: true,
                    second: false,
                    third: false,
                };
                break;
            case 1:
                $scope.flag = {
                    first: false,
                    second: true,
                    third: false
                };
                break;
          
        }
    };

    var maxSlides = 5;
    var slideCounter = 2;

    var req = {
        method: 'GET',
        url: 'http://119.9.77.8:3000/coupons',

    }
    $http(req).success(function(data) {

        $scope.data = data;
        JSON.stringify(data);


        $ionicSlideBoxDelegate.update();

    });

    $scope.showPopup = function() {
        $scope.data = {}
        $scope.setDefault = function() {
            console.log('Default set', arguments);
            alert("test");
            $scope.$onClose({
                test: 'hello'
            });
        };


        $ionicPopup.show({
            template: '',
            title: 'Pick a default value',
            scope: $scope,

            buttons: [{
                text: 'Awesome',

                onTap: function(e) {
                    return 'awesome';
                }
            }, {
                text: 'Cool',
                onTap: function(e) {
                    return 'cool';
                }
            }, {
                text: 'Cooler',
                onTap: function(e) {
                    return 'cooler';
                }
            }, {
                text: 'Stuff',
                onTap: function(e) {
                    return 'stuff';
                }
            }]
        }).then(function(res) {
            alert("F");
            console.log('Tapped!', res);
        }, function(err) {
            console.log('Err:', err);
        }, function(msg) {
            console.log('message:', msg);
        });


    };


    $scope.dealToggle = false;
    $scope.searchClicked = false;
    $scope.categories = ['cat1',
        'cat2',
        'cat3',
        'cat4',
        'cat5',
        'cat6'
    ];
    $scope.toggleSearch = function() {
        $scope.searchClicked = !($scope.searchClicked);
        $scope.searchText = null;
    };
    // toggle selectedCategories 
    $scope.toggleSelected = function(cat) {
        if ($scope.selectedCategories.indexOf(cat) !== -1) {
            $scope.selectedCategories.pop(cat);
        } else {
            $scope.selectedCategories.push(cat);
        }
    };
    $scope.selectedCategories = [];
    $scope.filterByCat = function(image) {
        if ($scope.selectedCategories.length > 0) {
            return ($scope.selectedCategories.indexOf(image.category) !== -1);
        } else {
            return true;
        }
    };
    $scope.buttonClass1 = 'active-btn';
    $scope.buttonClass2 = 'inactive-btn';

})
  
     .controller('notificationcenterController', function($scope){
        
   })
   
   
    .controller('accountDetailController', function($scope, $ionicHistory){
            $scope.goBack = function(){
            $ionicHistory.goBack();
        }
            $scope.data = {};
            $scope.data.columns = [{"id":"1453","name":"Date"},{"id":"1355","name":"Action"},{"id":"0393","name":"Point"},{"id":"3932","name":"Total"}];
            $scope.data.items = [{"1453":"24-12-2011","1355":"test","0393":"21","3932":"20"} ,{"1453":"24-12-2011","1355":"test","0393":"21","3932":"20"}];
    })
   
      .controller('auctionDetailController', function($scope){
            $scope.data = {};
            $scope.data.columns = [{"id":"1453","name":"Date"},{"id":"1355","name":"Action"},{"id":"0393","name":"Point"},{"id":"3932","name":"Total"}];
            $scope.data.items = [{"1453":"Ohad","1355":"11/07/15","0393":"9:48","3932":"53,000,000"},{"1453":"Tomer","1355":"11/07/15","0393":"8:15","3932":"52,000,000"}];
            $scope.data.columns1 = [{"id":"1453","name":"Date"},{"id":"1355","name":"Action"},{"id":"0393","name":"Point"},{"id":"3932","name":"Total"}];
            $scope.data.items1 = [{"1453":"Chrostopher","1355":"11/07/15","0393":"9:58","3932":"54,000,000"}];
   })
   .controller('aboutController', function($scope, $ionicHistory){
       $scope.goBack = function(){
               $ionicHistory.goBack();
           }
   }) ;