"use strict";
app.controller('homeCtrl', homeController);

function homeController($window, ApiService, ModalService, DialogService) {
    var vm = this;
    vm.addUser = function () {
        console.log('clicked');
        // var modalInstance = $uibModal.open({
        //     templateUrl: 'view/component/addUserModal/addUser.html',
        //     controller: 'addUserCtrl as mvm'
        // });
        DialogService.addUser(ModalService, ApiService, {}, function (response) {
            DialogService.successDialog("Add user successful!", ModalService, function () {
                $window.location.reload();
            });
        });
    }
}