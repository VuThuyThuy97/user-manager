app.controller('addUserCtrl',addUserCtrl);
function addUserCtrl($uibModalInstance) {
    var vm = this;
    vm.modal = {
        close: function (result){
            $uibModalInstance.close(result);
        },
        cancel: function () {
            $uibModalInstance.dismiss('cancel');
        }
    };
}