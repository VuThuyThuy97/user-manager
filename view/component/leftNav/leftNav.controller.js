app.controller('leftCtrl', leftCtrl);

function leftCtrl() {
    var vm = this;
    // this.currentUser = userService.currentUser();
    this.currentUser = {
        name: 'Well Insight Admin',
        image: 'public/img/logo.png'
    }
}
