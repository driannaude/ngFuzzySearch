# ngFuzzySearch

Based on [fuzzysearch](https://github.com/bevacqua/fuzzysearch) by [@bevacqua](https://github.com/bevacqua), who did a fantastic job, btw!

Tiny and blazing-fast fuzzy search in JavaScript, now with Angular 1.6.x support!

Fuzzy searching allows for flexibly matching a string with partial input, useful for filtering data very quickly based on lightweight user input.

## Demo

To see `fuzzysearch` in action, head over to [bevacqua.github.io/horsey][3], which is a demo of an autocomplete component that uses `fuzzysearch` to filter out results based on user input.

## Installation

Using **Bower**:

```shell
bower install --save ngFuzzySearch
```

## Usage

Include a script tag for ngFuzzySearch in your index.html file:

```html
<script type="text/javascript" src="bower_components/ngFuzzySearch/ngFuzzySearch.js"></script>
```

Include ngFuzzySearch as a dependency in your `app.js` file:

```js
angular.module('myApp', ['ngFuzzySearch']);
```

Include the `fuzzySearch` Angular Service in your controller and use it!
The service returns `true` if `needle` matches `haystack` using a fuzzy-searching algorithm. Note that this program doesn't implement _[levenshtein distance][2]_, but rather a simplified version where **there's no approximation**. The method will return `true` only if each character in the `needle` can be found in the `haystack` and occurs after the preceding matches.
```js
module.controller('myCtrl', function(fuzzySearch){
	fuzzySearch.find('twl', 'cartwheel') // <- true
	fuzzySearch.find('cart', 'cartwheel') // <- true
	fuzzySearch.find('cw', 'cartwheel') // <- true
	fuzzySearch.find('ee', 'cartwheel') // <- true
	fuzzySearch.find('art', 'cartwheel') // <- true
	fuzzySearch.find('eeel', 'cartwheel') // <- false
	fuzzySearch.find('dog', 'cartwheel') // <- false
})
```

`fuzzysearch(needle, haystack)`


### Filtering ng-repeat

ngFuzzySearch also comes equipped with a filter, which you can use to filter `ng-repeat` blocks with a scope variable.
The filter syntax goes as follows:

```html
<div class="col-xs-12" ng-repeat="thing in model.things | fuzzyFilter:[needle]:[keyString]">
```

Where `keyString` is the **key** of the iterator object you would like to filter against, i.e. if your object is:

```javascript
var model = {};
model.things = [{
  _id: 1,
  name: 'Iterator One'
},{
  _id: 2,
  name: 'Iterator Two'
}];
...
```
If you want to search the `name` field, in the `model.things` object, using an input on the same page, you can do the following:
```html
<input type="text" ng-model="model.fuzzySearchValue" />
...
<div class="col-xs-12" ng-repeat="thing in model.things | fuzzyFilter:model.fuzzySearchValue:'name'">
```

### Filtering using multiple fields
If you want to search the `name` field **AND** the description field, in the `model.things` object, using an input on the same page, you can do the following:
```html
<input type="text" ng-model="model.fuzzySearchValue" />
...
<div class="col-xs-12" ng-repeat="thing in model.things | filterMultiple:{name:model.fuzzySearchValue, desc:model.fuzzySearchValue}:'fuzzyFilter'">
```
**NOTE:** You can also use `filterMultiple` to filter through most string-based filters. 

### Changelog

| Version | Date | Notes |
|:-------:|:-----|:------|
| **v1.1.2** | 07/17 | Added `filterMultiple` and alphabetized filtering. Ng-repeat order will be preserved until input starts |
| **v1.1.0** | 07/17 | Added module export as `ngFuzzySearch` to better support webpack |

# License

MIT

[1]: https://cloud.githubusercontent.com/assets/934293/6550014/d3a86174-c5fc-11e4-8334-b2e2b0d38fad.png
[2]: http://en.wikipedia.org/wiki/Levenshtein_distance
[3]: http://bevacqua.github.io/horsey
[4]: http://jsperf.com/fuzzysearch-regex/14
