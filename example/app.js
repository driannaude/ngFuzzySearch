var app = angular.module('myApp', ['ngFuzzySearch']);

app.controller('MyController', ['$scope', '$filter', function ($scope, $filter) {

  $scope.people = [{
      person: {
        name: "Annie Smith",
        age: 21
      },
      category: "Student",
      desc: "Annie is reasonably well-behaved and is a top notch performer"
    },
    {
      person: {
        name: "Jack Johnson",
        age: 30,
      },
      category: "Teacher",
      desc: "Jack is difficult, but shows promise"
    },
    {
      person: {
        name: "Jack Sparrow",
        age: 30,
      },
      category: "Teacher",
      desc: "Jack is often confused with other Jacks"
    },
    {
      person: {
        name: "Jack Reacher",
        age: 30,
      },
      category: "Teacher",
      desc: "Top notch, 'nuff said"
    },
    {
      person: {
        name: "Zelda McDonald",
        age: 90,
      },
      category: "Teacher",
      desc: "Zelda can be extremely creative when she chooses to be"
    },
    {
      person: {
        name: "Sam Teal",
        age: 55,
      },
      category: "Student",
      desc: "Sam needs some encouragement at times, and shows good creativity"
    },
    {
      person: {
        name: "Sam Neal",
        age: 55,
      },
      category: "Student",
      desc: "Well adjusted, rising star"
    }
  ];

}]);
