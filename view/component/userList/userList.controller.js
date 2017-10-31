app.controller('userListCtrl', contentCtrl);
function contentCtrl (userService, $scope) {
    var vm = this;
    vm.users =[
        {
            name: 'thuy',
            active: true
        },{
            name: 'nhan',
            acive: false
        },{
            name: 'linh',
            active: true
        },{
            name: 'son',
            acive: false
        }
    ];
    vm.delete = function(user) {
        console.log(user);
        // userService.deleteUser(user);
        var i = vm.users.indexOf(user);
        console.log(i);
        if (i !== -1) {
            vm.users.splice(i, 1);
        }
    };
    vm.activeToggle = function (user) {

        if(user.active===true) {
            user.active = false;
        } else {
            user.active = true;
        }
    }
};