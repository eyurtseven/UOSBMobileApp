angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope) {
        $scope.menuLogo = "img/icon.png";
    })

    .controller('CompanyCtrl', function ($scope, CompanyService) {
        $scope.companies = [];
        CompanyService.getCompanyData().then(function (response) {
            angular.forEach(response.data, function (item, i) {
                var itemText = item.Company;
                $scope.companies.push({Company: itemText, Id: item.Id});
            });
        });
    })

    .controller('NewsCtrl', function ($scope, NewsService, $ionicLoading, $ionicPlatform, $state, $ionicPopup, $ionicHistory) {
        $ionicHistory.currentView($ionicHistory.backView());
        $ionicPlatform.ready(function() {
            if(window.Connection) {
                if (navigator.connection.type == Connection.NONE) {
                    $ionicPopup.alert({
                        title: "İnternet Bağlantı Hatası",
                        content: "İnternet erişiminizi kontrol ediniz."
                    }).then(function (result) {
                        $state.go('app.chairman');
                        return;
                    });
                }else {
                    $ionicLoading.show({
                        template: 'Yükleniyor...'
                    });
                    $scope.news = [];
                    NewsService.getNews().then(function (response) {
                        angular.forEach(response.data, function (item, i) {
                            if (item.status == "publish") {
                                var itemText = item.title;
                                $scope.news.push({title: itemText, image: item.featured_image != null ?item.featured_image.source:'../img/white.png', id: item.ID});
                                $ionicLoading.hide();
                            }
                        });
                    });
                }
            }
        });
    })

    .controller('NewsDetailCtrl', function ($scope, $stateParams, NewsService, $ionicLoading, $ionicHistory, $ionicPlatform, $ionicPopup) {
        $ionicHistory.currentView($ionicHistory.backView());
        $ionicPlatform.ready(function() {
            if(window.Connection) {
                if (navigator.connection.type == Connection.NONE) {
                    $ionicPopup.alert({
                        title: "İnternet Bağlantı Hatası",
                        content: "İnternet erişiminizi kontrol ediniz."
                    }).then(function (result) {
                        $state.go('app.chairman');
                        return;
                    });
                }else  {
                    $ionicLoading.show({
                        template: 'Yükleniyor...'
                    });
                    NewsService.getNews().then(function (response) {
                        angular.forEach(response.data, function (item, i) {
                            if (item.ID == $stateParams.newsId) {
                                $scope.newsId = item.Id;
                                $scope.newsImage = item.featured_image != null ?item.featured_image.source:'../img/white.png';
                                $scope.content = item.content;
                                $scope.newsTitle = item.title;
                                $ionicLoading.hide();
                            }
                        });
                    });
                }
            }
        });
    })

    .controller('GoToCompanyCtrl', function ($scope, $stateParams, CompanyService, GlobalFunctionService, $ionicLoading, $ionicHistory, $ionicPlatform, $ionicPopup) {
        $ionicHistory.currentView($ionicHistory.backView());
        $ionicPlatform.ready(function() {
            if(window.Connection) {
                if (navigator.connection.type == Connection.NONE) {
                    $ionicPopup.alert({
                        title: "İnternet Bağlantı Hatası",
                        content: "İnternet erişiminizi kontrol ediniz."
                    }).then(function (result) {
                        return;
                    });
                    $state.go('app.chairman');
                }else {
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
                }
            }
        });
    })
    .controller('DirectorsCtrl', function ($scope, $stateParams) {

    })
    .controller('AboutCtrl', function ($scope, $stateParams) {

    })
    .controller('ContactCtrl', function ($scope, $ionicLoading, $compile, $ionicHistory, $ionicPlatform, $ionicPopup) {
        $ionicHistory.currentView($ionicHistory.backView());
        $ionicPlatform.ready(function() {
            if(window.Connection) {
                if (navigator.connection.type == Connection.NONE) {
                    $ionicPopup.alert({
                        title: "İnternet Bağlantı Hatası",
                        content: "İnternet erişiminizi kontrol ediniz."
                    }).then(function (result) {
                        $state.go('app.chairman');
                        return;
                    });
                }else{
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
                }
            }
        });
    })
    .controller('ChairmanCtrl', function ($scope, $stateParams) {

    });