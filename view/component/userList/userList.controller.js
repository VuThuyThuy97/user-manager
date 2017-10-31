app.controller('userListCtrl', contentCtrl);

function contentCtrl($timeout, $scope, $http, ApiService) {
    var vm = this;
    vm.users = new Array();
    this.$onInit = function () {
        ApiService.getListUser({}, function (err, success) {
            $timeout(function () {
                vm.users = success;
            });
        });
    };
    vm.delete = function (user) {
        ApiService.deleteUser({idUser: user.idUser}, function (err, success) {
            if (!err) {
                var i = vm.users.indexOf(user);
                if (i !== -1) {
                    vm.users.splice(i, 1);
                }
            }
        });
    };
    vm.activeToggle = function (user) {
        if (user.status === 'Actived') {
            let payload = user;
            payload.status = 'Inactive'
            ApiService.editUser(user, function (err, success) {
                if (!err) {
                    console.log(success);
                    user.status = 'Inactive';
                }
            });
        } else {
            let payload = user;
            payload.status = 'Actived'
            ApiService.editUser(user, function (err, success) {
                if (!err) {
                    user.status = 'Actived';
                    console.log(success);
                }
            });
        }
    }
    vm.editUser = function (user) {
        console.log(user);
        console.log("OPEN DIALOG TO EDIT");
    }
};