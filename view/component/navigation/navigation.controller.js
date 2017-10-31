app.controller('navCtrl', navCtrl);
function navCtrl ($scope, userService, $uibModal) {
    var vm = this;
    this.addUser = function () {
        var modalInstance = $uibModal.open({
           templateUrl: 'view/component/addUserModal/addUser.html',
            controller: 'addUserCtrl as mvm'
        });
    }

}