app.service('userService', userService);

function userService ($http) {
    var url='';
    var service = {};
    service.getCurrentUser = function () {};
    service.isLogin = function () {};
    service.login = function () {};
    service.logout = function () {};
    service.getUsers = function() {
        return $http.get(url+'/users',{params: {}});
    };
    service.deleteUser = function (userid) {
        return $http.delete(url + '/user' + userid);
    };
    service.addUser = function (user) {
        if (user.name) {
            var userToSave = angular.copy(user);
            return $http.post(url + "/users", userToSave, { params: {} })
                .then(function (response) {
                    return response;
                });
        }
    };
    service.deleteUser = function () {};
    service.toggleActivate = function () {};
    return service;
};