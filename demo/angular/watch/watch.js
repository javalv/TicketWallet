/**
 * Created by f on 2016/4/8.
 */
window.document.addEventListener('DOMContentLoaded', function () {
    (function (window) {

        var Scope = function () {
            this.$$watchers = [];
        };

        Scope.prototype.$watch = function (watchExp, listener) {
            this.$$watchers.push({
                watchExp: watchExp,
                listener: listener || function () {
                    console.info('not define listener')
                }
            });
        };

        Scope.prototype.$digest = function () {
            var dirty;

            do {
                dirty = false;

                for (var i = 0; i < this.$$watchers.length; i++) {
                    var newValue = this.$$watchers[i].watchExp(),
                        oldValue = this.$$watchers[i].last;

                    console.info("watch" + i + ":" + newValue);

                    if (oldValue !== newValue) {
                        this.$$watchers[i].listener(newValue, oldValue);

                        dirty = true;

                        this.$$watchers[i].last = newValue;
                    }
                }
            } while (dirty);
        };


        var $scope = new Scope();

        $scope.name = 'Ryan';

        var element = document.querySelectorAll('input');

        function eachApply(){
            var es = [];
            for(var index=0;index < element.length;index++){
                var e = element[index];
                var inputID = e.getAttribute('id');
                addWatch(inputID);

                es.push(e);
            }

            es.forEach(function (item,index) {

                item.addEventListener('keyup',function () {
                    //console.info(item)
                    var inputID = item.getAttribute('id');
                    $scope[inputID] = item.value;
                    $scope.$digest();
                });
            })


            console.info(es);

        }

        eachApply();


        function addWatch(inputID){
            $scope.$watch(function () {
                return $scope[inputID];
            }, function (newValue, oldValue) {

                var e = document.getElementById(inputID);
                console.log('Input value updated - it is now ' + e.value);

                var $ID = document.getElementById('&'+ inputID);

                $ID.innerHTML = newValue;
            });
        }

        window.updateScopeValue = function updateScopeValue() {
            $scope.$digest();
        };
    })(window);

});

