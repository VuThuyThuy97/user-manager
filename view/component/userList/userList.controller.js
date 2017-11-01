app.controller('userListCtrl', contentCtrl);

function contentCtrl($timeout, ApiService, $uibModal) {
    var vm = this;
    vm.users = new Array();
    this.$onInit = function () {
        ApiService.getListUser({}, function (err, success) {
            $timeout(function () {
                ApiService.users = success;
                vm.users = ApiService.users;
                console.log(ApiService.users);
            });
        });
    };
    vm.delete = function (user) {
        ApiService.deleteUser({idUser: user.idUser}, function (err, success) {
            if (!err) {
                var i = vm.users.indexOf(user);
                if (i !== -1) {
                    vm.users.splice(i, 1);
                } else {
                    console.log(i);
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
    };
    vm.editUser = function (user) {
        console.log(user);
        ApiService.userToEdit = user;
        var modalInstance = $uibModal.open({
            templateUrl: 'view/component/editUserModal/editUser.html',
            controller: 'editUserCtrl as evm'
        });
    }
}
;