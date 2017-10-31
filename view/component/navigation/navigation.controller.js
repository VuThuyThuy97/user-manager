app.controller('navCtrl', navCtrl);

function navCtrl($scope, $uibModal) {
    var vm = this;
    vm.addUser = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'view/component/addUserModal/addUser.html',
            controller: 'addUserCtrl as mvm'
        });
    }
    // vm.currentUser = userService.currentUser();
    vm.currentUser = {
        name: 'Monkey D. Luffy',
        image: 'public/img/luffy.png'
    }
}