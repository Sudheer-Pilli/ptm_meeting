//dashboard router
var student = angular.module("student", ['ngRoute'])
student.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: '../routePages/home.html',
            controller: 'homeCtrl'
        })
        .when('/displayStudents', {
            templateUrl: '../routePages/displayStudents.html',
            controller: 'displayCtrl'
        })
        .when('/addStudent', {
            templateUrl: '../routePages/addStudent.html',
            controller: 'addCtrl'
        })
        .when('/searchID', {
            templateUrl: '../routePages/searchID.html',
            controller: 'searchCtrl'
        })
        .when('/update', {
            templateUrl: '../routePages/updateStudent.html',
            controller: 'updateCtrl'
        })

})

student.controller('studentCtrl', function($rootScope) {
    $rootScope.meetingModel = {
        meeting_id: '',
        meeting_name: '',
        meeting_time: '',
        set_by: '',
        meeting_link: ''
    };

})

student.controller('displayCtrl', function($scope, $rootScope, $http, $location) {
    $rootScope.studentUpdate = 0
    $http.get('http://localhost:9000/meeting')
        .success((response) => {
            $scope.students = response
        })

    $scope.delStudent = function(id) {
        $http.post('http://localhost:9000/delStudent', { 'id': id })
            .success(() => {
                $location.path = '/'
            })
    }
    $scope.updateStudent = function(meetingModel) {
        meetingModel.meeting_time = formatDate(meetingModel.meeting_time)
        $rootScope.meetingModel = meetingModel
    }
    $scope.addStudent = function() {
        console.log("check")
        $http.post('http://localhost:9000/addMeeting', { 'data': $rootScope.meetingModel })
            .success((response) => {
                console.log("Added successfully");
                $location.path = '/'
            })
    }
})
student.controller('mcaCtrl', function($scope, $rootScope) {
    $rootScope.studentUpdate = 0
    $scope.course = 'MCA'
    $http.get('http://localhost:9000/meeting')
        .success((response) => {
            $scope.students = response
        })
})
student.controller('maleCtrl', function($scope, $rootScope) {
    $rootScope.studentUpdate = 0
    $scope.gender = 'male'
    $scope.grade = 'A'
    $http.get('http://localhost:9000/maleAG')
        .success((response) => {
            $scope.students = response
        })
})
student.controller('searchCtrl', function($scope, $rootScope, $http) {
    $rootScope.studentUpdate = 0
    $http.get('http://localhost:9000/meeting')
        .success((response) => {
            console.log(response);
            $scope.students = response
        })
})
student.controller('searchCtrl', function($scope, $rootScope, $http) {
    $rootScope.studentUpdate = 0
    $http.get('http://127.0.0.1:9000/stuinfo')
        .success((response) => {
            $scope.students = response
        })
})
student.controller('addCtrl', function($scope, $rootScope, $http, $location, $window) {
    console.log("check")
    $scope.meetingModel = $rootScope.meetingModel
    $scope.addmeeting = function() {
        $http.post('http://localhost:9000/addMeeting', { 'data': $scope.meetingModel })
            .success((response) => {
                console.log("Added successfully");
                // $location.path('#displayStudents');

            })
            .error(err => {
                console.log(err)
            })
    }
})
student.controller('updateCtrl', function($scope, $rootScope, $http, $location, $window) {
    console.log("check")
    $scope.meetingModel = $rootScope.meetingModel
    $scope.updatemeeting = function() {
        console.log($scope.meetingModel.meeting_time)
        $http.post('http://localhost:9000/updateMeeting', { 'data': $scope.meetingModel })
            .success((response) => {
                console.log("update successfully");
                // $location.path('#displayStudents');
            })
            .error(err => {
                console.log(err)
            })
    }
})

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = d.getHours(),
        min = d.getMinutes(),
        sec = d.getSeconds();

    if (month.length < 2) {
        month = "0" + month;
    }
    if (day.length < 2) {
        day = "0" + day
    }
    if (hours < 10) {
        console.log("a");
        hours = "0" + hours
    }
    if (min < 10) {
        min = "0" + min
    }
    if (sec < 10) {
        sec = "0" + sec
    }

    return [year, month, day].join('-') + " " + [hours, min, sec].join(':')
}