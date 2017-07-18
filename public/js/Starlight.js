let app = angular.module('Starlight', ['ionic']);

app.config(['$ionicConfigProvider', '$stateProvider', '$urlRouterProvider',
    function ($ionicConFigProvider, $stateProvider, $urlRouterProvider) {
        $ionicConFigProvider.tabs.position('bottom');
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'tpl/login.html',
                controller: 'loginCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'tpl/register.html',
                controller: 'registerCtrl'
            })
            .state('hot', {
                url: '/hot',
                templateUrl: 'tpl/hot.html',
                controller: 'hotCtrl'
            })
            .state('me', {
                url: '/me',
                templateUrl: 'tpl/me.html',
                controller: 'meCtrl'
            })
            .state('set', {
                url: '/set',
                templateUrl: 'tpl/set.html',
                controller: 'setCtrl'
            })
            .state('upload', {
                url: '/upload',
                templateUrl: 'tpl/upload.html',
                controller: 'uploadCtrl'
            })
            .state('addTags', {
                url: '/addTags',
                templateUrl: 'tpl/add-tags.html',
                controller: 'addTagsCtrl'
            })
            .state('setUser', {
                url: '/setUser',
                templateUrl: 'tpl/set-user.html',
                controller: 'setUserCtrl'
            })
            .state('setLikes', {
                url: '/setLikes',
                templateUrl: 'tpl/set-likes.html',
                controller: 'setLikesCtrl'
            });
        $urlRouterProvider.otherwise('/login');
    }]);

app.controller('starlightCtrl', ['$scope', '$state', '$ionicPopup', function ($scope, $state, $ionicPopup) {
    //公用跳转方法
    $scope.jumpTo = function (desState) {
        $state.go(desState);
    };
    //弹窗
    $scope.showAlert = function (title, template) {
        $ionicPopup.alert({
            title: title,
            template: '<h3>' + template + '</h3>'
        })
    };
}]);

app.controller('loginCtrl', ['$scope', '$http', '$httpParamSerializerJQLike',
    function ($scope, $http, $httpParamSerializerJQLike) {
        // if (localStorage.getItem('userId') !== undefined) {
        //     $scope.jumpTo('hot');
        // }
        $scope.user = {
            uname: '',
            upwd: ''
        };
        $scope.toLogin = function () {
            let result = $httpParamSerializerJQLike($scope.user);
            $http({
                method: 'POST',
                url: '/user/login',
                data: result
            }).success(function (data) {
                if (data.code === 400) {
                    $scope.showAlert('登录失败', data.msg)
                } else if (data.code === 100) {
                    console.log(data.uid);
                    localStorage.setItem('userId', data.uid);
                    localStorage.setItem('userName', data.uname);
                    $scope.jumpTo('hot');
                }
            })
        }
    }]);

app.controller('registerCtrl', ['$scope', '$http', '$httpParamSerializerJQLike',
    function ($scope, $http, $httpParamSerializerJQLike) {
        $scope.newUser = {
            uname: '',
            upwd: '',
            upwd2: ''
        };
        $scope.toRegister = function () {
            let regName = /[a-zA-Z0-9]{3,10}/;
            let regPwd = /[a-zA-Z0-9]{6,18}/;
            if ($scope.newUser.uname === '' || $scope.newUser.upwd === '' || $scope.newUser.upwd2 === '') {
                $scope.showAlert('注册失败', '选项不能为空')
            } else if (!$scope.newUser.uname.match(regName)) {
                $scope.showAlert('注册失败', '用户名格式不正确')
            } else if (!$scope.newUser.upwd.match(regPwd)) {
                $scope.showAlert('注册失败', '密码格式不正确')
            } else if ($scope.newUser.upwd !== $scope.newUser.upwd2) {
                $scope.showAlert('注册失败', '密码不一致')
            } else {
                let result = $httpParamSerializerJQLike($scope.newUser);
                $http({
                    method: 'POST',
                    url: '/user/register',
                    data: result
                }).success(function (data) {
                    if (data.code === 500) {
                        $scope.showAlert('注册失败', data.msg)
                    } else if (data.code === 200) {
                        $scope.jumpTo('login');
                    }
                })
            }
        }
    }]);

app.controller('hotCtrl', ['$scope', '$http', '$httpParamSerializerJQLike',
    function ($scope, $http, $httpParamSerializerJQLike) {
        $scope.hotPic = {};
        $http({
            method: 'GET',
            url: '/sl_hot/content'
        }).success(function (data) {
            $scope.hotPic = data;
        });

        //模糊查询
        $scope.searchTxt = {kw: ''};
        $scope.$watch('searchTxt.kw', function () {
            let result = $httpParamSerializerJQLike($scope.searchTxt);
            $http({
                method: 'POST',
                url: '/sl_hot/search',
                data: result
            }).success(function (data) {
                // $scope.hotPic = data;
                console.log(data);
            })
        });

        //获取该用户收藏的图片
        $scope.likePic = [];
        let result = $httpParamSerializerJQLike({uid: parseInt(localStorage.getItem('userId'))});
        $http({
            method: 'POST',
            url: '/sl_hot/iLike',
            data: result
        }).success(function (data) {
            for (let i = 0; i < data.length; i++) {
                $scope.likePic.push(data[i].pid)
            }
        });

        //判断该图是否被收藏
        $scope.isLike = function (pid) {
            return ($scope.likePic.indexOf(pid) !== -1)
        };

        //收藏图片
        $scope.isCollect = [];
        $scope.collectPic = function (pid) {
            let result = $httpParamSerializerJQLike({
                uid: parseInt(localStorage.getItem('userId')),
                pid: pid
            });
            $http({
                method: 'POST',
                url: '/sl_hot/collect',
                data: result
            }).success(function (data) {
                if (data.code === 200) {
                    $scope.isCollect[pid] = true;
                }
            })
        }
    }]);

app.controller('meCtrl', ['$scope', function ($scope) {
}]);

app.controller('setCtrl', ['$scope', function ($scope) {
}]);

app.controller('uploadCtrl', ['$scope', function ($scope) {
}]);

app.controller('addTagsCtrl', ['$scope', function ($scope) {
}]);

app.controller('setUserCtrl', ['$scope', function ($scope) {
}]);

app.controller('setLikesCtrl', ['$scope', function ($scope) {
}]);

