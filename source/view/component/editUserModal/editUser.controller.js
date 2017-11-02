app.controller('editUserCtrl', editUserCtrl);
function editUserCtrl (ApiService, $uibModalInstance) {
    var vm = this;
    vm.modal = {
        close: function (result) {
            $uibModalInstance.close(result);
        },
        cancel: function () {
            $uibModalInstance.dismiss('cancel');
        }
    };
    vm.userToEdit = ApiService.userToEdit;
    console.log(vm.userToEdit);
    vm.submit = function () {
        vm.formError = "";
        if(vm.newPassword!==vm.confirmPassword) {
            vm.formError = "Password not match!"
        } else if(!vm.userToEdit.username || !vm.userToEdit.fullname || !vm.userToEdit.email) {
            vm.formError = "All fields required, try again!";
        } else {
            vm.userToEdit.password = vm.newPassword;
            ApiService.editUser(vm.userToEdit, function (error, success) {
                if (error) {
                    vm.formError = 'Fail to edit user';
                }
                if(!error) {
                    vm.modal.close();
                }
                }
            )
        }
    }
}