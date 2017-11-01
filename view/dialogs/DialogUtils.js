app.service('DialogService', DialogUtils);

function DialogUtils() {
    let myDialogs = new Object();
    myDialogs.editUser = function ($scope, ModalService, ApiService, user) {
        function ModalController($scope, close) {
            let self = this;
            this.user = user;
            let newUser = self.newUser = {};
            newUser.idUser = this.user.idUser;
            newUser.fullname = this.user.fullname;
            newUser.email = this.user.email;
            newUser.newPassword = "";
            newUser.newConfirm = "";
            this.hasErrorPassword = "has-info";
            this.hasErrorRePassword = "has-info";
            this.onCancelButtonClicked = function () {
                close(null);
            }
            this.updateButtonClick = function () {
                let isPassToUpdate = false;
                if (newUser.newPassword) this.hasErrorPassword = "has-success";
                if (newUser.newPassword == newUser.newConfirm) {
                    isPassToUpdate = true;
                    this.hasErrorRePassword = "has-success";
                    newUser.password = newUser.newPassword;
                } else {
                    this.hasErrorRePassword = "has-error";
                }
                ApiService.editUser(newUser, function () {
                    close(null);
                });
            }
        }

        ModalService.showModal({
            templateUrl: 'view/dialogs/error-dialog/error-dialog-modal.html',
            controller: ModalController,
            controllerAs: 'myModal'
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
    return myDialogs;
}
