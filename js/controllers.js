angular.module('controllers', [])

    .controller('firstCtrl', function($scope,$state,$ionicPopover,$window,$ionicNavBarDelegate) {

      $scope.menus = [];
      $scope.$on('to-parent', function(event,data) {
        console.log('listCtrl', data);	   //父级能得到值
        $scope.menus = dalistCtrlta;
      });

      $scope.menuSelected = "person";
      $scope.menuSelect = function (value ) {
        $scope.menuSelected = value;
      }

    })

    .controller('listCtrl', function($scope,$state, $ionicLoading,$timeout,$ionicSlideBoxDelegate,$ionicScrollDelegate) {
      $scope.isActive = true;

      $scope.sides = [
        {
          index:0,
        },
        {
          index:1,
        }
      ];

      $scope.slideChanged = function($index){
        //console.info($index)
        if($index == 0){
          goStart();
        }else if($index == 1){
          goEnd();
        }
      }

      var slideStart = function () {
        $ionicSlideBoxDelegate.slide(0);
        goStart();
      }
      var slideEnd = function () {
        $ionicSlideBoxDelegate.slide(1);
        goEnd();
      }

      $scope.items = [
        {
          id:1,
          name:"李宗盛演唱会",
          time:"2015.10.13 20:00",
          venues:"鸟巢",
          pic:"img/lzs.png",
          seat:"6排 14座"
        },
        {
          id:1,
          name:"李云迪全球音乐会",
          time:"2015.10.13 20:00",
          venues:"工人体育场",
          pic:"img/lyd.jpg",
          seat:"6排 14座"
        },
        {
          id:1,
          name:"周华健全球演唱会",
          time:"2015.10.13 20:00",
          venues:"工人体育场",
          pic:"img/zhj.png",
          seat:"6排 14座"
        },

      ];

      $scope.endItems = [
        {
          id:1,
          name:"周华健全球演唱会",
          time:"2015.10.13 20:00",
          venues:"工人体育场",
          pic:"img/zhj.png",
          seat:"6排 14座"
        },
        {
          id:1,
          name:"周华健全球演唱会",
          time:"2015.10.13 20:00",
          venues:"工人体育场",
          pic:"img/zhj.png",
          seat:"6排 14座"
        },

      ];

      var base = 1;
      $scope.doRefresh = function() {
        var addItems = [
          {
            id:1,
            name:"李宗盛演唱会",
            time:"2015.10.13 20:00",
            venues:"鸟巢",
            pic:"img/lzs.png",
            seat:"6排 14座"
      },
      {
        id:1,
        name:"周华健全球演唱会",
        time:"2015.10.13 20:00",
        venues:"工人体育场",
        pic:"img/zhj.png",
        seat:"6排 14座"
      },

        ];

        for(var i=0;i<addItems.length;i++){
          $scope.items.unshift(addItems[i]);
        }

        $timeout(function () {
          // Stop the ion-refresher from spinning
          $scope.$broadcast("scroll.refreshComplete");

          $ionicScrollDelegate.resize()
          //$ionicScrollDelegate.scrollBottom();
        },5000)


      };


      $scope.goStart = function(){

        $ionicLoading.show({
          template: "loading ..."
        });

        $timeout(function(){

          slideStart();

          $ionicLoading.hide();
        },500);
      },

      //goEnd
      $scope.goEnd = function(){
        $ionicLoading.show({
          template: "loading ..."
        });

        $timeout(function(){
          //for(var i=0;i<10;i++,idx++)
          //$scope.items.unshift("item " + idx);
          //隐藏载入指示器
          slideEnd();
          $ionicLoading.hide();
        },500);
      }

      var goStart = function(){

        $scope.isActive = true;

        $scope.isExpried = {};
      }

      var goEnd = function(){

        $scope.isActive = false;

        $scope.isExpried = {color: "#cacaca"};
      }

      var clear = function(){
        $scope.items = [];
      }

    })


    .controller('detailCtrl', function($scope, $stateParams,$location,$window,$ionicScrollDelegate,$ionicModal,$interval) {

      //console.info("itemId " + $stateParams.id);

      $scope.items =
      [{
        id:1,
        name:"周杰伦演唱会",
        time:"2015.10.13 20:00",
        venues:"工人体育场",
        seat:"6排 14座"
      },
      {
        id:1,
        name:"张学友演唱会",
        time:"2015.10.13 20:00",
        venues:"工人体育场",
        seat:"6排 14座"
      },
        {
          id:1,
          name:"张学友演唱会",
          time:"2015.10.13 20:00",
          venues:"工人体育场",
          seat:"6排 14座"
        },
        {
          id:1,
          name:"张学友演唱会",
          time:"2015.10.13 20:00",
          venues:"工人体育场",
          seat:"6排 14座"
        }]

      var id = $stateParams.id;
      if(id == 1){
        $scope.items = [{
          id:1,
          name:"李云迪演唱会",
          time:"2015.10.13 20:00",
          venues:"工人体育场",
          seat:"6排 14座"
        }]
      }

      var winWidth = $window.screen.width;
      var detailWidth = winWidth - 20;

      var winHeight = $window.screen.height;
      //console.info($window.screen)
      var detailHeight = winHeight - 64 ;
      if(winHeight > 500){
        detailHeight = detailHeight -20 ;
      }
      $scope.detailWidth = {width: detailWidth + "px", height: detailHeight + "px" };

      $scope.bigCodeImgWidth = {width: winWidth - 80 + "px"};

      //console.info("len:" + $scope.items.length)
      var allWidth =  $scope.items.length * winWidth;
      $scope.allWidth = {width: allWidth + "px"};

      $scope.newPage = function () {
        //console.info($location.url())
        $location.url("http://www.baidu.com");
        $window.location.href = "demo/index1.html";
        console.info($location.url())

      };

      //$scope.refresh('123');
      $scope.countdown = 10;
      var timestamp = Date.parse(new Date());
      $scope.refresh = "text:" + timestamp;
      var wait = function () {
        $interval(function () {
          var time = $scope.countdown -- ;
          if(time > 0){
          }else{
            $scope.countdown = 10;
            var timestamp = Date.parse(new Date());
            $scope.refresh = "text:" + timestamp;
          }
          wait();
        },1000,true);
      }
      wait();



      $ionicModal.fromTemplateUrl("my-modal.html", {
        scope: $scope,
        animation: "slide-in-up"
      }).then(function(modal) {
        $scope.modal = modal;
      });


      $scope.openModal = function() {
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };

      $scope.removeModal = function() {
        $scope.modal.remove();
      };
    })


    .controller("mapCtrl",function($scope,$switchLoad){

      $switchLoad.$ready($scope,
          function () {

          }, function () {

            var arrays = new Array(10000);
            for(var index = 0;index<10000;index++){
              arrays[index] = {id:index};
            }
            console.info(arrays.length);

            var currentPosition = {};

            //高德地图
            //基本地图加载
            var map = new AMap.Map("container", {
              resizeEnable: true,
              //center: [116.397428, 39.90923],//地图中心点
              zoom: 13 //地图显示的缩放级别
            });
            //构造路线导航类
            var driving = new AMap.Driving({
              map: map
            });

            var geocoder = new AMap.Geocoder({
              city: "010", //城市，默认：“全国”
              radius: 1000 //范围，默认：500
            });
            //地理编码,返回地理编码结果
            geocoder.getLocation("鸟巢", function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                geocoder_CallBack(result);
                $scope.items = arrays;
              }
            });

            var targetLng ;
            var targetLat;

            //地理编码返回结果展示
            function geocoder_CallBack(data) {
              var resultStr = "";
              //地理编码结果数组
              var geocode = data.geocodes;
              //console.info(geocode)

              targetLng = geocode[0].location.lng;
              targetLat = geocode[0].location.lat;


            }
          }, function () {

          },1000);





    })

    .controller("accountCtrl",function($scope, $ionicModal) {

      $ionicModal.fromTemplateUrl("my-modal.html", {
        scope: $scope,
        animation: "slide-in-up"
      }).then(function(modal) {
        $scope.modal = modal;
      });


      $scope.openModal = function() {
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };

      $scope.removeModal = function() {
        $scope.modal.remove();
      };
    //Cleanup the modal when we are done with it!
      $scope.$on("$destroy", function() {
        console.log('modal.$destroy');
        $scope.modal.remove();
      });
    // Execute action on hide modal
      $scope.$on("modal.hidden", function() {
        // Execute action
        console.log('modal.hidden');
      });
    // Execute action on remove modal
      $scope.$on("modal.removed", function() {
        // Execute action
        console.log('modal.removed');
      });

      //振动
      $scope.vibration = function(){
      }


      $scope.barScan = function () {

      }

      $scope.echo = function () {

      }

    })

    .controller("cameraCtrl",function($scope) {


    });

