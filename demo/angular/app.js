/**
 * Created by f on 2016/7/6.
 */
angular.module('myApp', ['directives'])
    .controller('myCtrl', function ($scope) {
        $scope.name = '';

        $scope.$watch('name', function (name1,name2) {
            console.log(name1);
        })


        $scope.doHome = function () {
            console.info('do home');
        }

        $scope.headTitle = "标题";

        $scope.scopeTest = function () {
            console.info("子作用域测试");
            $scope.isActive = !$scope.isActive;
        }

    })
    .controller('childCtrl', function ($scope) {



    })


angular.module('directives', [])
    .directive('myHeader', function () {
        return {
            scope: {
                title : '=',
                left : "@bTextLeft",
                right : "@bTextRight",
                leftF : "&leftFun"
            },
            restrict: 'EAC',
            replace: true,
            template: '<header class="header">' +
            '<button class="header-botton left" ng-bind="left" ng-click="leftF()" ></button>' +
            '<h2 class="header-title" ng-bind="title">' +
            '</h2>' +
            '<button class="header-botton right" ng-bind="right" ></button>' +
            '</header>',
            link: function ($scope,$element,$attr) {

            }
        }

    })
