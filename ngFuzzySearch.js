(function () {
  'use strict';

  var module = angular.module('ngFuzzySearch', []);

  module.factory('fuzzySearch', function () {

    function _fuzzySearch(needle, haystack, caseSensitive) {
      if(angular.isUndefined(needle) || angular.isUndefined(haystack)){
        return false;
      }
      // check for case sensitive option
      if(angular.isUndefined(caseSensitive) || caseSensitive === false) {
        needle = needle.toLowerCase();
        haystack = haystack.toLowerCase();
      }
      var hlen = haystack.length;
      var nlen = needle.length;
      if (nlen > hlen) {
        return false;
      }
      if (nlen === hlen) {
        return needle === haystack;
      }
      outer: for (var i = 0, j = 0; i < nlen; i++) {
        var nch = needle.charCodeAt(i);
        while (j < hlen) {
          if (haystack.charCodeAt(j++) === nch) {
            continue outer;
          }
        }
        return false;
      }
      return true;
    }

    var self = {
      find: _fuzzySearch,
    };
    return self;
  });

  module.filter('fuzzyFilter', function(fuzzySearch) {
  return function(haystack, needle, key) {
    if(!haystack){
      console.warn('[WARNING]: Haystack is undefined or falsy. Please ensure you are passing it an array');
    }
    haystack = haystack || [];
    return haystack.filter(function(element) {

      if(angular.isUndefined(needle) || needle === ''){
        return true;
      } else {
        var match;
        if(angular.isDefined(key) && key !== ''){
            match = fuzzySearch.find(needle, element[key]);
        } else {
          match = fuzzySearch.find(needle, element);
        }


        return match;
      }

    });
  };
});

}());
