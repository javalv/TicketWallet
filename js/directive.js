angular.module('directives', [])

    .directive("myNavBar", function () {
        return {
            scope: false,
            restrict: 'EAC',
            replace: true,
            template:
                '<ion-header-bar class="bar-stable" > '+
                '<a class="button button-clear icon tabs-icon-left ion-arrow-left-b" ng-click="$ionicGoBack()" ></a>'+
                '<h1 class="title" ng-bind="headerTitle"></h1>'+
                '<a menu-toggle="right" class="button button-clear icon tabs-icon-right ion-navicon" ></a>'+
                '</ion-header-bar>'
        }
    })

    .directive('myTitle', function(){
        return {
            restrict: 'AE',
            replace:true,
            template:'<h1 class="title" ng-bind="headerTitle"></h1>',
            link: function($scope, $element, $attrs) {

                $scope.$on('$ionicView.beforeEnter', function(event,data) {
                    $scope.headerTitle = data.title;
                });

            }
        }
    })

    .directive('goBackHide', function(){
        return {
            restrict: 'A',
            link: function($scope, $element, $attrs) {

                $scope.$on('$ionicView.beforeEnter', function(event,data) {
                    if(!data.enableBack){//隐藏
                        $scope.isShow = false;
                    }else{
                        $scope.isShow = true;
                    }
                    //console.info(data)
                });

            }
        }
    })

    .directive('myTitleName', function(){
        return {
            restrict: 'A',
            link: function($scope, $element, $attrs) {

            }
        }
    })

    .directive('switchLoad',['$compile','$rootScope', function ($compile,$rootScope) {
        return {
            restrict: 'AE',
            scope: true,
            controller: function ($scope,$rootScope) {

            },
            link: function ($scope, $element, $attrs) {

                var html = '<div style="height:100% ; width: 100%; top:0px; position: absolute; z-index: 65536 ; background-color: rgb(234, 234, 234)"' +
                    ' ng-hide="loadComplete">' +
                    '<p style="position: relative;top: 30%;" class="text-center">' +
                    '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>' +
                    '</p>' +
                    '</div>';
                var el = $compile(html)($scope);
                $element.append(el);

                $scope.loadComplete = false;

                //加载完成
                $rootScope.$on('switch-load-complete', function (event, data) {
                    $scope.loadComplete = true;
                });
            }
        };
    }])

    .directive('qrCode',[ function () {
        return {
            restrict: 'AE',
            scope: {
                refresh : '='
            },
            replace:true,
            template:'<div></div>',
            controller: function ($scope,$rootScope) {
            },
            link: function ($scope, $element, $attrs) {
                console.info($scope.refresh);
                var qrEle = $element[0];

                var qrCode = new QRCode(qrEle,{
                    //width: 220,
                    //height: 220,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });

                var refresh = function (text) {
                    qrCode.makeCode(text);
                    var img = qrEle.lastChild;
                    img.style.margin = 'auto';
                }

                $scope.$watch('refresh',function (value) {
                    refresh(value);
                })

            }
        };
    }])


