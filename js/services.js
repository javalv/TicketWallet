angular.module("services", []).provider('$httpService', [function () {

        //可以在config里面配置的属性
        this.timeout = 10000;
        //this.domain = "http://www.yizhiyouyi.com:8080/yzyy-wx-rest";
        this.domain = "http://localhost:8080/yzyy-wx-rest";

        this.$get = ['$http','$q',function ($http,$q) {

            var that = this;

            var service = {};

            service.get = function (url, params) {
                if (params == null) {
                    params = {};
                }
                var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
                $http({
                    url: that.domain + url,
                    method: "GET",
                    params: params,
                    timeout: that.timeout
                }).
                    success(function (dataResult, status) {
                        doSuccess(dataResult, status, deferred);
                    }).
                    error(function (dataResult, status, headers, config) {
                        doError(status, url, params, deferred);
                    });

                return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
            }

            /***检索专用接口***/
            service.fetch = function (url, params) {
                if (params == null) {
                    params = {};
                }
                var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
                console.log(url);
                $http({
                    url: url,
                    method: "GET",
                    params: params,
                    timeout: that.timeout
                }).
                success(function (dataResult, status) {
                    console.log(dataResult);
                    if (Object.prototype.toString.call(dataResult) == "[object String]") {
                        dataResult = JSON.parse(dataResult);
                    }
                    doSuccess(dataResult, status, deferred);
                }).
                error(function (dataResult, status, headers, config) {
                    doError(status, url, params, deferred);
                });

                return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
            }

            service.post = function (url, post) {
                var deferred = $q.defer();
                $http({
                    url: that.domain + url,
                    method: "POST",
                    data: post,
                    timeout: that.timeout
                }).
                success(function (dataResult, status) {
                    doSuccess(dataResult, status, deferred);
                }).
                error(function (dataResult, status, headers, config) {
                    doError(status, url, post, deferred);
                });
                return deferred.promise;
            }

            return service;


        }];

        //统一的错误异常
        var ERROR_CODE = 500;

        var doSuccess = function (dataResult, status, deferred) {
            if (status != 200) {
                console.error("error status:" + status);//进行数据封装
                createResult(ERROR_CODE, "系统异常", {}, deferred);
                return;
            }
            //console.log(dataResult);
            //统一处理dataResult
            var data = dataResult.data;
            var code = dataResult.status;
            var msg = dataResult.msg;

            createResult(code, msg, data, deferred);
        }

        var doError = function (status, url, params, deferred) {
            console.error("error：status:[" + status + "], [" + url + "], [" + JSON.stringify(params) + "]");
            createResult(ERROR_CODE, "系统异常", {}, deferred);
            return;
        }

        var createResult = function (code, msg, data, deferred) {
            var result = {
                code: code,
                msg: msg,
                data: data
            };
            deferred.resolve(result);// 声明执行成功，即http请求数据成功，可以返回数据了
        }

    }])

    .provider('$switchLoad', function () {

        this.$get = ['$rootScope','$timeout',function ($rootScope,$timeout) {


            var service = {};

            var initMapping = {};
            var doInit = function ($scope,init) {
                if(init){
                    var key = $scope.$id;
                    var times = initMapping[key];
                    if(typeof times == 'undefined' || times == null){//第一次
                        initMapping[key] = 1;
                        init();
                    }
                    else{
                        initMapping[key] = initMapping[key] + 1;
                    }
                }
            }

            /**
             *
             * @param $scope
             * @param init 每个页面只加载一次
             * @param load 当使用缓存时，只加载一次
             * @param refresh 页面每次切换都需要调用一次
             * @param mode
             */
            service.$ready = function ($scope,init,load,refresh,mode) {

                var interval = 1000;
                //默认立即执行
                if(typeof(mode) == 'undefined' || mode == -1){

                    doInit($scope,init);
                    load();
                    refresh();
                    return ;

                }else{
                    interval = mode;
                }

                $timeout(function(){

                    doInit($scope,init);

                    load();

                    refresh();

                    $rootScope.$broadcast("switch-load-complete",{});

                    //不用判断是否有cache,如果没有cache,则不会监听到$ionicView.beforeEnter
                    $scope.$on('$ionicView.beforeEnter', function (data) {
                        $timeout(function(){
                            //console.info("refresh 2");
                            refresh();
                        },interval);
                    })

                },interval)
            }

            return service;

        }]
    });