var app = angular.module('myApp', ['ngFuzzySearch']);

app.controller('MyController', ['$scope', '$filter', function ($scope, $filter) {

  $scope.people = [{
      name: "Annie Smith",
      age: 21,
      category: "Student",
      desc: "Annie is reasonably well-behaved and is a top notch performer"
    },
    {
      name: "Jack Johnson",
      age: 30,
      category: "Teacher",
      desc: "Jack is difficult, but shows promise"
    },
    {
      name: "Jack Sparrow",
      age: 30,
      category: "Teacher",
      desc: "Jack is often confused with other Jacks"
    },
    {
      name: "Jack Reacher",
      age: 30,
      category: "Teacher",
      desc: "Top notch, 'nuff said"
    },
    {
      name: "Zelda McDonald",
      age: 90,
      category: "Teacher",
      desc: "Zelda can be extremely creative when she chooses to be"
    },
    {
      name: "Sam Teal",
      age: 55,
      category: "Student",
      desc: "Sam needs some encouragement at times, and shows good creativity"
    },
    {
      name: "Sam Neal",
      age: 55,
      category: "Student",
      desc: "Well adjusted, rising star"
    }
  ];

  $scope.$watch('fuzzySearchValue', function() {
    var result = $filter('filterMultiple')($scope.people, {
      desc: $scope.fuzzySearchValue,
      name: $scope.fuzzySearchValue
    }, 'fuzzyFilter');
  })

}]);
