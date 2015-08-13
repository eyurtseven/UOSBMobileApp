angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
    })

    .controller('CompanyCtrl', function ($scope, CompanyService) {
        $scope.companies = [];

        CompanyService.getCompanyData().then(function (response) {

            angular.forEach(response.data, function (item, i) {

                var itemText = item.Company + ' (' + item.Location.Latitude + ', ' + item.Location.Longitude + ')';

                $scope.companies.push({Company: itemText, Id: item.Id});
            });

        });

    })

    .controller('NewsCtrl', function ($scope, NewsService, $ionicLoading) {

        $ionicLoading.show({
            template: 'Yükleniyor...'
        });

        $scope.news = [];

        NewsService.getNews().then(function (response) {

            angular.forEach(response.data, function (item, i) {

                if (item.status == "publish") {

                    var itemText = item.title;
                    $scope.news.push({title: itemText, image: item.featured_image.source, id: item.ID});
                    $ionicLoading.hide();
                }
            });

        });

    })

    .controller('NewsDetailCtrl', function ($scope, $stateParams, NewsService, $ionicLoading) {

        $ionicLoading.show({
            template: 'Yükleniyor...'
        });


        NewsService.getNews().then(function (response) {

            angular.forEach(response.data, function (item, i) {

                if (item.ID == $stateParams.newsId) {

                    console.log(item);

                    $scope.newsId = item.Id;
                    $scope.newsImage = item.featured_image.source;
                    $scope.content = item.content;
                    $scope.newsTitle = item.title;
                    $ionicLoading.hide();

                }
            });

        });

    })

    .controller('GoToCompanyCtrl', function ($scope, $stateParams, CompanyService, GlobalFunctionService, $ionicLoading) {
        $ionicLoading.show({
            template: 'Yükleniyor...'
        });

        var companyId = $stateParams.companyId;

        CompanyService.getCompanyData().then(function (response) {

            var companies = response.data;

            var selectedCompany = GlobalFunctionService.findById(companies, companyId);

            $scope.selectedCompany = selectedCompany;

            $scope.myLocation = {
                lng: "",
                lat: ""
            };

            $scope.drawMap = function (position) {

                $scope.$apply(function () {

                    $scope.myLocation.lng = position.coords.longitude;
                    $scope.myLocation.lat = position.coords.latitude;

                    initialize();
                });
            }
            navigator.geolocation.getCurrentPosition($scope.drawMap, function () {
            }, {enableHighAccuracy: true});
            var directionsDisplay;
            var directionsService = new google.maps.DirectionsService();
            var map;

            function initialize() {
                directionsDisplay = new google.maps.DirectionsRenderer();
                var inticor = new google.maps.LatLng($scope.myLocation.lat, $scope.myLocation.lng);

                var mapOptions =
                {
                    zoom: 9,
                    center: inticor,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                };

                map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

                directionsDisplay.setMap(map);
                calcRoute();

            }

            google.maps.event.addDomListener(window, 'load', initialize);

            function calcRoute() {
                var start = $scope.myLocation.lat + "," + $scope.myLocation.lng;
                var end = selectedCompany.Location.Latitude + "," + selectedCompany.Location.Longitude;

                var request = {
                    origin: start,
                    destination: end,
                    travelMode: google.maps.TravelMode.DRIVING
                };
                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                    }
                });
            }

        });
        $ionicLoading.hide();

    })
    .controller('PlaylistCtrl', function ($scope, $stateParams) {

    })
    .controller('DirectorsCtrl', function ($scope, $stateParams) {

    })
    .controller('AboutCtrl', function ($scope, $stateParams) {

    })
    .controller('ContactCtrl', function ($scope, $ionicLoading, $compile) {


        function initialize() {
            var myLatLng = new google.maps.LatLng(38.677179, 29.220291);
            var mapCanvas = document.getElementById('map');
            var mapOptions = {
                center: myLatLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(mapCanvas, mapOptions)
            var contentString = "<div><a>Uşak Organize Sanayi Bölgesi</a></div>";
            var compiled = $compile(contentString)($scope);

            var infowindow = new google.maps.InfoWindow({
                content: compiled[0]
            });

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Uluru (Ayers Rock)'
            });

            $scope.map = map;
        }
        initialize();
//        google.maps.event.addDomListener(window, 'load', initialize);

    })
    .controller('ChairmanCtrl', function ($scope, $stateParams) {

    });

