var app = angular.module('Aveena', []);
angular.module('app', ['ngRoute','ngAnimate']);

app.factory('moviesCRUD', function ($http, $q) {
    function getAllMovies() {
        var deferred = $q.defer();
        
        $http.get('/api/products').then(function (result) {
            deferred.resolve(result.data);
        }, function (error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    }
    
    function addMovie(newMovie) {
        var deferred = $q.defer();
        
        $http.post('/api/products', newMovie).then(function (result) {
            deferred.resolve(result.data.movie);
        }, function (error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    }
    
    function modifyMovie(updatedMovie) {
        var deferred = $q.defer();
        
        $http.put('/api/products/' + updatedMovie._id, updatedMovie).then(function (data) {
            deferred.resolve(data);
        }, function (error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    }
    
    return {
        getAllMovies: getAllMovies,
        addMovie: addMovie,
        modifyMovie: modifyMovie
    };
});

app.controller('AveenaProducts', function ($scope, moviesCRUD) {
    
    $scope.released = { released: true };
    $scope.notReleased = { released: false };
    
    function getProducts() {
        $scope.catProducts = getLocalProducts();

        ////moviesCRUD.getAllMovies().then(function (products) {
        ////    $scope.products = products;
        ////    alert(products);
        ////}, function (error) {
        ////    console.log(error);
        ////});
    }




    $scope.movieReleased = function (movie) {
        
        moviesCRUD.modifyMovie({ _id: movie._id, name: movie.name, released: true, watched: movie.watched })
                  .then(function (result) {
            if (result.status === 200) {
                movie.released = true;
            }
        }, function (error) {
            console.log(error);
        });
    };
    
    $scope.movieWatched = function (movie) {
        moviesCRUD.modifyMovie(movie)
                  .then(function (result) {
            if (result.status === 200) {
                console.log("Movie updated");
            }
        }, function (error) {
            movie.watched = !movie.watched;
        });
    };
    
    $scope.addMovie = function () {
        moviesCRUD.addMovie({ name: $scope.newMovieText }).then(function (newMovie) {
            $scope.movies.push(newMovie);
            $scope.newMovieText = "";
        }, function (error) {
            console.log(error);
        });
    };

    getProducts();
});

app.directive('productCard', function () {
    return {
        templateUrl: '/views/productCard.html'
    };

});

app.directive('pageSection', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h' : w.height(),
                'w' : w.width()
            };
            console.log("called");
            scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                scope.windowHeight = newValue.h;
                scope.windowWidth = newValue.w;
                
                scope.style = function () {
                    return {
                        'height': (newValue.h - 100) + 'px',
                        'width': (newValue.w - 100) + 'px'
                    };
                };
            
            }, true);
            
            w.bind('resize', function () {
                scope.$apply();
            });
        };
    }
});

//app.directive("backLeaf", function ($window) {
//    return function (scope, element, attrs) {
//        angular.element($window).bind("scroll", function () {
//            if (this.pageYOffset >= 100) {
//                scope.boolChangeClass = true;
//                console.log('Scrolled below header.');
//            } else {
//                scope.boolChangeClass = false;
//                console.log('Header is in view.');
//            }
//            //scope.$apply();
//        });
//    };
//});

//app.directive('menuPointed', function () {
//    return {
//        link : function (scope, element, attrs) {
//            var menuPointer = angular.element(element.children()[0]);
//            var focusOnThis = function () {
//                $(menuPointer).animate({
//                    top : $(this).top(),
//                    left : $(this).left(),
//                    height : $(this).height(),
//                    width : $(this).width()
//                });
//            };
            
//            for (var i = 1; i < element.children(); i++) {
//                angular.element(element.children()[i]).on('hover', focusOnThis);
//            }
//        };
//    }; 

//});

app.controller('AveenaHome', function ($scope, moviesCRUD) {
    $scope.released = { released: true };
    $scope.notReleased = { released: false };
    
    function init() {
        moviesCRUD.getAllMovies().then(function (movies) {
            $scope.movies = movies;
        }, function (error) {
            console.log(error);
        });
    }
    
    $scope.movieReleased = function (movie) {
        
        moviesCRUD.modifyMovie({ _id: movie._id, name: movie.name, released: true, watched: movie.watched })
                  .then(function (result) {
            if (result.status === 200) {
                movie.released = true;
            }
        }, function (error) {
            console.log(error);
        });
    };
    
    $scope.movieWatched = function (movie) {
        moviesCRUD.modifyMovie(movie)
                  .then(function (result) {
            if (result.status === 200) {
                console.log("Movie updated");
            }
        }, function (error) {
            movie.watched = !movie.watched;
        });
    };
    
    $scope.addMovie = function () {
        moviesCRUD.addMovie({ name: $scope.newMovieText }).then(function (newMovie) {
            $scope.movies.push(newMovie);
            $scope.newMovieText = "";
        }, function (error) {
            console.log(error);
        });
    };
    
    $scope.menuItems = [
        
        {
            "name": "About",
            "link": "About"
        },
        {
            "name": "Products",
            "link": "Products"
        },
        {
            "name": "",
            "link": ""
        },
        {
            "name": "Locations",
            "link": "Locations"
        },
        {
            "name": "Contact Us",
            "link": "ContactUs"
        }
    ];

    init();
    

});


function getLocalProducts(){
    var prodReturn = 
         [
             {
                Category : "Cereals and Pulses",
                products : [
                    { name: "Millet", category: "Edible", subCategory: "Cereals and Pulses", imageId: "Millet" },
                    { name: "Maize", category: "Edible", subCategory: "Cereals and Pulses", imageId: "Maize" },
                    { name: "Wheat", category: "Non-Edible", subCategory: "Cereals and Pulses", imageId: "Wheat" },
                    { name: "Mung", category: "Non-Edible", subCategory: "Cereals and Pulses", imageId: "Mung" }
                ]
             },
             {
                 Category : "Oil Seeds",
                 products : [
                    { name: "Castor", category: "Edible", subCategory: "Oil Seeds", imageId: "Castor" },
                    { name: "Mustard", category: "Edible", subCategory: "Oil Seeds", imageId: "Mustard" },
                    { name: "Paddy", category: "Non-Edible", subCategory: "Oil Seeds", imageId: "Paddy" },
                    { name: "Cotton", category: "Non-Edible", subCategory: "Oil Seeds", imageId: "Cotton" }
                 ]
             },
             {
                 Category : "Vegetables",
                 products : [
                    { name: "Tomato", category: "Edible", subCategory: "Vegetables", imageId: "Tomato" },
                    { name: "Cucumber", category: "Edible", subCategory: "Vegetables", imageId: "Cucumber" },
                    { name: "Okra", category: "Non-Edible", subCategory: "Vegetables", imageId: "Okra" },
                    { name: "Bottle Gourd", category: "Non-Edible", subCategory: "Vegetables", imageId: "BottleGourd" },
                    { name: "Brinjal", category: "Edible", subCategory: "Vegetables", imageId: "Brinjal" },
                    { name: "Bitter Gourd", category: "Edible", subCategory: "Vegetables", imageId: "Bitter Gourd" },
                    { name: "Watermelon", category: "Edible", subCategory: "Vegetables", imageId: "Watermelon" }
                ]
             }
        ]
    return prodReturn;
}