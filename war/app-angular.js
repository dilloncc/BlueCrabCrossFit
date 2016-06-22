'use strict';

var app = angular.module('app', [ 'ngRoute' ]);

app.factory('myHttpInterceptor', function($rootScope, $q) {
	return {
		'requestError' : function(config) {
			$rootScope.status = 'HTTP REQUEST ERROR ' + config;
			return config || $q.when(config);
		},
		'responseError' : function(rejection) {
			$rootScope.status = 'HTTP RESPONSE ERROR ' + rejection.status
					+ '\n' + rejection.data;
			return $q.reject(rejection);
		},
	};
});

// configure our routes
app.config(function($routeProvider) {
	$routeProvider

	// route for the home page
	.when('/', {
		templateUrl : 'home.html',
		controller : 'mainController'
	})

	// route for the about page
	.when('/about', {
		templateUrl : 'about.html',
		controller : 'mainController'
	})

	// route for the about page
	.when('/about/coaches', {
		templateUrl : 'coaches.html',
		controller : 'mainController'
	})

	// route for the about page
	.when('/about/facility', {
		templateUrl : 'facility.html',
		controller : 'mainController'
	})

	// route for the about page
	.when('/about/rules', {
		templateUrl : 'rules.html',
		controller : 'mainController'
	})

	// route for the about page
	.when('/crossfit', {
		templateUrl : 'crossfit.html',
		controller : 'coachController'
	})

	// route for the contact page
	.when('/start', {
		templateUrl : 'gettingstarted.html',
		controller : 'coachController'
	})

	.when('/schedule', {
		templateUrl : 'schedule.html',
		controller : 'coachController'
	})

	.when('/wod', {
		templateUrl : 'wod.html',
		controller : 'coachController'
	})

	.when('/contact', {
		templateUrl : 'contact.html',
		controller : 'coachController'
	})

	.when('/about/coaches/:name', {
		templateUrl : 'coach.html',
		controller : 'coachController'
	})
	
	.when('/gettingstarted', {
		templateUrl : 'gettingstarted.html',
		controller : 'gettingstartedController'
	})
	
	.when('/gettingstarted/:name', {
		templateUrl : function(urlattr){
            return urlattr.name + '.html';
        },
		controller : 'gettingstartedController'
	})

	.otherwise({
		redirectTo : '/'
	});

	// use the HTML5 History API
	// $locationProvider.html5Mode(true).hashPrefix('!');
});

app.config(function($httpProvider) {
	$httpProvider.interceptors.push('myHttpInterceptor');
});

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope, $location, $anchorScroll, $http) {

	$scope.scrollTo = function(id) {
		$location.hash(id);
		$anchorScroll();
	}
});

app.controller('coachController', function($scope, $location, $http) {
	
	var jsonFileName = '/assets/json/';
	
	if ($location.path().indexOf('josh') > -1) {
		jsonFileName += 'josh'; 
	}
	else if ($location.path().indexOf('ben') > -1) {
		jsonFileName += 'ben'; 
	}
	else if ($location.path().indexOf('dallas') > -1) {
		jsonFileName += 'dallas'; 
	}
	else if ($location.path().indexOf('kortney') > -1) {
		jsonFileName += 'kortney'; 
	}
	else if ($location.path().indexOf('aaron') > -1) {
		jsonFileName += 'aaron'; 
	}
	else if ($location.path().indexOf('brett') > -1) {
		jsonFileName += 'brett'; 
	}
	else if ($location.path().indexOf('christina') > -1) {
		jsonFileName += 'christina'; 
	}
	
	jsonFileName += '.json';
	
	$http.get(jsonFileName).
    success(function(data, status, headers, config) {
      $scope.coach = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
});

app.controller('contactController', function($scope) {
	$scope.message = 'Contact us! JK. This is just a demo.';
});

app.controller('HeaderController', function($scope, $location) {
	$scope.isActive = function(viewLocation) {

		if (viewLocation === '/')
			return viewLocation === $location.path();
		else
			return ($location.path().indexOf(viewLocation) > -1)
	};
})

//app.run(function($rootScope, $location, $anchorScroll, $routeParams) {
//	// when the route is changed scroll to the proper element.
//	$rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
//		$location.hash($routeParams.v);
//		routeParams = '';
//		$anchorScroll();
//	});
//});

// app.controller('aboutController', function($scope, $rootScope, $log, $http,
// $routeParams, $location, $route) {
//
// $scope.scrollTo = function() {
// $location.hash();
// $anchorScroll();
// }
//	
// scrollTo();
// });
