app.controller('homeCtrl', homeController);

function homeController ($uibModal) {
    var vm = this;
    vm.popupModal = function () {
        console.log('clicked');
        var modalInstance = $uibModal.open({
            templateUrl: 'view/component/addUserModal/addUser.html',
            controller: 'addUserCtrl as mvm'
        });
    }
}