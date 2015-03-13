angular.module('starter.services', [])

.factory('Chats', function () {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function () {
      return chats;
    },
    remove: function (chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function (chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('itemList', function (){
    var itemlist = [
                      {
                        id : 0,
                        imgurl:'https://dtex4kvbppovt.cloudfront.net/images/1ddd27484ee94475bff83cf81d2bc50d7762508c.13811.png',
                        category : 'cat1',
                        name :'free',
                        desc : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque volutpat id nibh eget convallis. Pellentesque sit amet ultricies ipsum. Suspendisse nec blandit ex, non dictum ipsum. Nulla aliquet tristique hendrerit. Quisque dapibus est faucibus libero elementum cursus. Morbi consectetur augue ut eros malesuada convallis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae'
                      }, {
                        id : 1,
                        imgurl:'https://dtex4kvbppovt.cloudfront.net/images/720121e7462d8c7863b4dd8fa7b5c1089b5f5fb2.33862.png', 
                        category : 'cat2',
                        name : 'discount',
                        desc : 'Suspendisse sed malesuada tortor. Fusce vitae interdum augue. Quisque vulputate luctus mauris, ut viverra dui mollis id. Nullam pulvinar mollis aliquam. Nam vulputate massa ac metus ornare suscipit. Quisque nunc ex, gravida et massa porta, sagittis luctus est.'
                      }, {
                        id : 2,
                        imgurl:'https://dtex4kvbppovt.cloudfront.net/images/877f1c561e735f7b9f419ff9ac79eb8c7481119d.16744.png', 
                        category : 'pat3',
                        name : 'gift',
                        desc : 'Phasellus in diam gravida, egestas lorem tincidunt, tempus metus. Phasellus sit amet nulla id lacus faucibus commodo at eu metus. Proin metus risus, venenatis id tincidunt at, porta accumsan diam. Proin posuere mattis leo, in auctor orci tincidunt vel. '
                      }, {
                        id : 3,
                        imgurl:'https://dtex4kvbppovt.cloudfront.net/images/d11ba0b3095bb19d8092cd29be9cbb9e197671ea.28088.png', 
                        category : 'cat4',
                        name : 'prize',
                        desc : 'Pellentesque suscipit fringilla eros, in dictum sapien tempor et. Phasellus metus massa, pulvinar aliquam ante et, vulputate pulvinar lorem. Phasellus iaculis eget justo in blandit. Aliquam quis ipsum sed nulla pellentesque pharetra quis nec metus. Fusce non vestibulum nunc.'
                      }
                    ];

  return {
    all : function (){
      return itemlist;
    },
    remove :  function(item){
      itemlist.splice(itemlist.indexOf(item),1);
    },
    get : function (itemId){
      for (var i = 0; i<itemlist.length; i++) {
        if (itemlist[i].id === parseInt(itemId)){
          return itemlist[i];
        }
      }
      return null;
    }
  };
});
