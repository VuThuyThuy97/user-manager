// var DialogUtils = require('../../dialogs/DialogUtil');
app.controller('userListCtrl', contentCtrl);

function contentCtrl($timeout, $scope, $http, ApiService, ModalService) {
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

        function ModalController($scope, close) {
            let self = this;
            this.aboutApp = {
                version: "1.0x",
                build: "2017-08-01"
            }
            this.onCancelButtonClicked = function () {
                close(null);
            }
        }

        ModalService.showModal({
            templateUrl: 'view/dialogs/error-dialog/error-dialog-modal.html',
            controller: ModalController,
            controllerAs: 'wiModal'
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (data) {
                $('.modal-backdrop').remove();
                $('body').removeClass('modal-open');

                if (data) {
                    callback(data);
                }
            })
        });
    }
};