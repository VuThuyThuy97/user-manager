app.service('ApiService', Service);
// const BASE_URL = 'http://user.dev.sflow.me:3000';
// var BASE_URL = 'http://localhost:2999';
// var BASE_URL = 'http://dev.sflow.me';
var BASE_URL = 'http://login.sflow.me';

const CREAT_USER = '/user/new';
const EDIT_USER = '/user/edit';
const DELETE_USER = '/user/delete';
const LIST_USER = '/user/list';
const INFO_USER = '/user/info';

function post($http, route, payload, callback) {
    payload.token = 'f82e62d7c3ea69cc12b5cdb8d621dab6';
    let request = {
        url: BASE_URL + route,
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
            'Referrer-Policy': 'no-referrer'
        },
        data: payload
    };
    $http(request).then(function (response) {
        callback(false, response);
    }).catch(function (error) {
        callback(error, null);
    });
}

function Service($http) {
    let myServices = new Object();
    myServices.getListUser = function (payload, callback) {
        post($http, LIST_USER, payload, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                if (response.data.code == 200) {
                    // console.log("Success");
                    callback(false, response.data.content);
                } else {
                    console.log("ERRRRRRRRR");
                    callback(response.data.reason, response.data.content);
                    //dialog loi
                }
            }
        });
    }
    myServices.addUser = function (payload, callback) {
        post($http, CREAT_USER, payload, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                if (response.data.code == 200) {
                    console.log("ADD USER SUCCESS");
                    callback(false, response.data.content);
                } else {
                    //dialog loi
                    callback(true, response.data.content);
                }
            }
        });
    };

    myServices.editUser = function (payload, callback) {
        post($http, EDIT_USER, payload, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                if (response.data.code == 200) {
                    callback(false, response.data.content);
                } else {
                    callback(response.data.reason, response.data.content);
                    //dialog loi
                }
            }
        });
    }

    myServices.infoUser = function (payload, callback) {
        post($http, INFO_USER, payload, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                if (response.data.code == 200) {
                    callback(false, response.data.content);
                } else {
                    callback(response.data.reason, response.data.content);
                    //dialog loi
                }
            }
        });
    }

    myServices.deleteUser = function (payload, callback) {
        post($http, DELETE_USER, payload, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                if (response.data.code == 200) {
                    callback(false, response.data.content);
                } else {
                    callback(response.data.reason, response.data.content);
                    //dialog loi
                }
            }
        });
    }
    // myServices.userToEdit = new Object();
    // myServices.users = new Array();
    return myServices;
}
