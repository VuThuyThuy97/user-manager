app.service('DialogService', DialogUtils);

function DialogUtils() {
    let myDialogs = new Object();
    myDialogs.editUser = function ($scope, ModalService, ApiService, user, callback) {
        function ModalController($scope, close) {
            let self = this;
            this.user = user;
            let newUser = self.newUser = {};
            newUser.username = this.user.username;
            newUser.idUser = this.user.idUser;
            newUser.fullname = this.user.fullname;
            newUser.email = this.user.email;
            newUser.newPassword = "";
            newUser.newConfirm = "";
            this.hasErrorPassword = "has-info";
            this.hasErrorRePassword = "has-info";
            let isPassToUpdate = 0;
            this.onCancelButtonClicked = function () {
                close(null);
            }
            this.checkPassword = function () {
                this.hasErrorPassword = "has-success";
                if (newUser.newPassword == newUser.newConfirm) {
                    isPassToUpdate = 1;
                    this.hasErrorRePassword = "has-success";
                } else {
                    isPassToUpdate = 2;
                    this.hasErrorRePassword = "has-error";
                }
            }
            this.updateButtonClick = function () {
                if (isPassToUpdate == 0 || isPassToUpdate == 1) {
                    ApiService.editUser(newUser, function (err, response) {
                        callback(response);
                        close(null);
                    });
                } else {
                    alert("Password is not match");
                }
            }
        }

        ModalService.showModal({
            templateUrl: 'view/dialogs/edit-user/edit-user-modal.html',
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
    myDialogs.confirmDialog = function (titleMessage, confirmMessage, ModalService, callback) {
        function ModalController($scope, close) {
            this.title = titleMessage;
            this.confirmMsg = confirmMessage;
            this.close = function (ret) {
                close(ret);
            }
        }

        ModalService.showModal({
            templateUrl: "view/dialogs/confirm/confirm-modal.html",
            controller: ModalController,
            controllerAs: 'wiModal'
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (ret) {
                $('.modal-backdrop').remove();
                $('body').removeClass('modal-open');
                callback(ret);
            });
        });
    }
    myDialogs.errorDialog = function (errorMessage, ModalService, callback) {
        function ModalController($scope, close) {
            let self = this;
            this.error = errorMessage;
            this.onCloseButtonClicked = function () {
                close(null);
            };
        }

        ModalService.showModal({
            templateUrl: 'view/dialogs/error/error-modal.html',
            controller: ModalController,
            controllerAs: 'wiModal'
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (data) {
                $('.modal-backdrop').remove();
                $('body').removeClass('modal-open');
                if (callback) callback();
            })
        });
    }
    return myDialogs;
}
