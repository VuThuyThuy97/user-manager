"use strict";
app.controller('userListCtrl', contentCtrl);

function contentCtrl($timeout, $scope, $http, ApiService, ModalService, DialogService) {
    var vm = this;
    vm.users = new Array();
    // this.$onInit = function () {
    //     ApiService.getListUser({}, function (err, success) {
    //         if (err) {
    //             DialogService.errorDialog("Error while listig users", ModalService);
    //         } else {
    //             // $timeout(function () {
    //             vm.users = success;
    //             console.log(vm.users);
    //             angular.element(document).ready(function () {
    //                 $(document).ready(function () {
    //                     $('#example').DataTable({});
    //                 });
    //             });
    //             // });
    //         }
    //     });
    // };
    ApiService.getListUser({}, function (err, success) {
        if (err) {

        } else {
            angular.element(document).ready(function () {
                vm.users = success;
                $timeout(function () {
                    $(document).ready(function () {
                        $('#example').DataTable({});
                    });
                });
            })
        }
    });
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
    vm.activeToggle = function (userInfo) {
        let user = userInfo;
        let title = "User Management";
        let message = "";
        let status = "";
        if (user.status === 'Active') {
            message = "Deactive this user?";
            status = "Inactive";
        } else if (user.status === 'Inactive') {
            message = "Active this user?";
            status = "Active";
        }
        DialogService.confirmDialog(title, message, ModalService, function (yes) {
            if (yes) {
                user.status = status;
                ApiService.editUser(user, function (err, response) {
                    if (!err) {
                        DialogService.successDialog("Done", ModalService, function () {
                            var i = vm.users.indexOf(user);
                            if (i != -1) {
                                vm.users[i] = response;
                            }
                        });
                    }
                });
            }
        });

    }
    vm.editUser = function (user) {
        DialogService.editUser(ModalService, ApiService, user, function (response) {
            if (response) {
                DialogService.successDialog("Done", ModalService, function () {
                    var i = vm.users.indexOf(user);
                    if (i != -1) {
                        vm.users[i] = response;
                    }
                });
            }
        });
    }
};