app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'view/home.html',
            controller: 'homeCtrl as vm'
        });
});