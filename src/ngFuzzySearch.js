(function () {
  'use strict';

  var module = angular.module('ngFuzzySearch', []);

  module.filter('filterMultiple', function ($filter) {
    function getObjectLength(a) {
      var count = 0;
      var i;
      for (i in a) {
        if (a.hasOwnProperty(i)) {
          count++;
        }
      }
      return count;
    }
    return function (items, keyObj, customFilter) {
      customFilter = customFilter || 'filter';
      var keyObjLength = getObjectLength(keyObj);
      var filterObj = {
        data: items,
        tempMatches: [],
        filteredData: [],
        applyFilter: function (obj, key, index) {
          var fData = [];
          if (this.filteredData.length === 0) {
            this.filteredData = this.data;
          }
          if (obj) {
            var fObj = {};
            if (!angular.isArray(obj)) {
              fObj[key] = obj;
              var newData = $filter(customFilter)(this.data, obj, key);
              if (index !== keyObjLength) {
                this.tempMatches = _.unionBy(newData, this.tempMatches, key);
              } else {
                this.tempMatches = _.unionBy(newData, this.tempMatches, key);
                fData = _.clone(this.tempMatches);
                this.tempMatches = [];
              }

            } else if (angular.isArray(obj)) {
              if (obj.length > 0) {
                for (var i = 0; i < obj.length; i++) {
                  if (angular.isDefined(obj[i])) {
                    fObj[key] = obj[i];
                    fData = fData.concat($filter(customFilter)(this.data, obj, key));
                  }
                }
              }
            }
            if (fData.length > 0) {
              this.filteredData = fData || [];
            } else {
              this.filteredData = [];
            }
          }
        }
      };
      if (keyObj) {

        var index = 1;
        angular.forEach(keyObj, function (obj, key) {
          filterObj.applyFilter(obj, key, index);
          index++;
        });
      }
      return filterObj.filteredData;
    }
  });

  module.factory('fuzzySearch', function () {

    function _fuzzySearch(needle, haystack, caseSensitive) {
      if (angular.isUndefined(needle) || angular.isUndefined(haystack)) {
        return false;
      }
      // check for case sensitive option
      if (angular.isUndefined(caseSensitive) || caseSensitive === false) {
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

  module.filter('fuzzyFilter', function (fuzzySearch, $filter) {
    return function (haystack, needle, key) {
      if (!haystack) {
        console.warn('[WARNING]: Haystack is undefined or falsy. Please ensure you are passing it an array');
      }
      haystack = haystack || [];
      // We don't want to run over the filter for an empty search string,
      // so we just return the haystack;
      if (!needle || needle.length <= 0) {
        return haystack;
      }
      var results = haystack.filter(function (element) {

        if (angular.isUndefined(needle) || needle === '') {
          return true;
        } else {
          var match;
          if (angular.isDefined(key) && key !== '') {
            match = fuzzySearch.find(needle, element[key]);
          } else {
            match = fuzzySearch.find(needle, element);
          }


          return match;
        }

      });
      // We order the results alphabetically,
      // to ensure closer matches appear first
      return $filter('orderBy')(results, key);
    };
  });

}());
