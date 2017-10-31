app.controller('leftCtrl', leftCtrl);

function leftCtrl() {
    var vm = this;
    // this.currentUser = userService.currentUser();
    this.currentUser = {
        name: 'Monkey D. Luffy',
        image: 'public/img/luffy.png'
    }
}
