app.controller('addUserCtrl', addUserCtrl);

function addUserCtrl($uibModalInstance, $rootScope, ApiService) {
    var vm = this;
    vm.modal = {
        close: function (result) {
            $uibModalInstance.close(result);
        },
        cancel: function () {
            $uibModalInstance.dismiss('cancel');
        }
    };
    vm.submit = function () {
        vm.formError = "";
        if (!vm.userName || !vm.password || !vm.email || !vm.role || !vm.fullName || !vm.confirmPassword) {
            vm.formError = "All fields required, try again!";
        }
        else if(vm.password!==vm.confirmPassword) {
            console.log(confirmPassword);
            vm.formError = 'Confirm password not match';
        }
        else {
            ApiService.addUser({
                email: vm.email,
                fullname: vm.fullName,
                username: vm.userName,
                password: vm.password,
                role: vm.role
            }, function (error, success) {
                if (error) {
                    vm.formError = 'Fail to add user';
                }
                if(!error) {
                    vm.modal.close();
                }
            })
        }
    }
}