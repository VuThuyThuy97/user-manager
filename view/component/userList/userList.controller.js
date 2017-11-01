"use strict";
app.controller('userListCtrl', contentCtrl);

function contentCtrl($timeout, $scope, $http, ApiService, ModalService, DialogService) {
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
        DialogService.confirmDialog("User Management", "Delete user " + user.username + "?", ModalService, function (response) {
            if (response) {
                ApiService.deleteUser({idUser: user.idUser}, function (err, success) {
                    if (!err) {
                        DialogService.successDialog("Successful", ModalService, function () {
                            var i = vm.users.indexOf(user);
                            if (i !== -1) {
                                vm.users.splice(i, 1);
                            }
                        });
                    }
                });
            }
        });
    };
    vm.activeToggle = function (user) {
        let title = "User Management";
        let message = "";
        if (user.status === 'Actived') {
            message = "Deactive this user?";
        } else if (user.status === 'Inactive') {
            message = "Active this user?";
        }
        DialogService.confirmDialog(title, message, ModalService, function (response) {
            if (response) {
                DialogService.successDialog("Done", ModalService, function () {
                    if (user.status === 'Actived') {
                        let payload = user;
                        payload.status = 'Inactive'
                        ApiService.editUser(user, function (err, success) {
                            if (!err) {
                                // console.log(success);
                                user.status = 'Inactive';
                            }
                        });
                    } else {
                        let payload = user;
                        payload.status = 'Actived'
                        ApiService.editUser(user, function (err, success) {
                            if (!err) {
                                user.status = 'Actived';
                                // console.log(success);
                            }
                        });
                    }
                });
            }
        });

    }
    vm.editUser = function (user) {
        DialogService.editUser(ModalService, ApiService, user, function (response) {
            DialogService.successDialog("Done", ModalService, function () {
                var i = vm.users.indexOf(user);
                if (i != -1) {
                    vm.users[i] = response;
                }
            });

        });
    }
};