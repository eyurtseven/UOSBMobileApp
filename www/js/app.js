// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html'
                    }
                }
            })

            .state('app.browse', {
                url: '/browse',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/browse.html'
                    }
                }
            })
            .state('app.playlists', {
                url: '/playlists',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/playlists.html',
                        controller: 'PlaylistsCtrl'
                    }
                }
            })

            .state('app.single', {
                url: '/playlists/:playlistId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/playlist.html',
                        controller: 'PlaylistCtrl'
                    }
                }
            })

            .state('app.companies', {
                url: '/companies',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/companies.html',
                        controller: 'CompanyCtrl'
                    }
                }
            })

            .state('app.news', {
                url: '/news',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/news.html',
                        controller: 'NewsCtrl'
                    }
                }
            })

            .state('app.newsDetail', {
                url: '/newsDetail/:newsId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/newsDetail.html',
                        controller: 'NewsDetailCtrl'
                    }
                }
            })

            .state('app.goToCompany', {
                url: '/goToCompany/:companyId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/goToCompany.html',
                        controller: 'GoToCompanyCtrl'
                    }
                }
            })
            .state('app.directors', {
                url: '/directors',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/directors.html',
                        controller: 'DirectorsCtrl'
                    }
                }
            })
            .state('app.units', {
                url: '/units',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/units.html',
                        controller: 'UnitsCtrl'
                    }
                }
            })
            .state('app.unitsElectric', {
                url: '/unitsElectric',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/unitsElectric.html',
                        controller: 'UnitsElectricCtrl'
                    }
                }
            })
            .state('app.unitsIt', {
                url: '/unitsIt',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/unitsIt.html',
                        controller: 'UnitsItCtrl'
                    }
                }
            })
            .state('app.about', {
                url: '/about',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/about.html',
                        controller: 'AboutCtrl'
                    }
                }
            })
            .state('app.contact', {
                url: '/contact',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/contact.html',
                        controller: 'ContactCtrl'
                    }
                }
            })
            .state('app.chairman', {
                url: '/chairman',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/chairman.html',
                        controller: 'ChairmanCtrl'
                    }
                }
            })

        ;
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/news');
    })

    .service('CompanyService', function ($http) {

        this.getCompanyData = function () {
            return $http.get('data/Company.json')
        };

    })

    .service('NewsService', function ($http, appCache) {
        this.getNews = function () {
            var news = appCache.get('news');

            if(news) {
                return news;
            }

            var newsJson =  $http({method: 'GET', url: 'http://www.uosb.org.tr/wp-json/posts'});
            appCache.put('news', newsJson);
            return newsJson;
        }
    })

    .service('GlobalFunctionService', function () {
        this.findById = function (source, id) {
            for (var i = 0; i < source.length; i++) {
                if (source[i].Id === id) {
                    return source[i];
                }
            }
        }
    }).factory('appCache', function($cacheFactory) {
    return $cacheFactory('appData');
});
;
