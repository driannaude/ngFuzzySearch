# ngFuzzySearch

Based on [fuzzysearch](https://github.com/bevacqua/fuzzysearch) by [Nicolás Bevacqua](https://github.com/bevacqua), who did a fantastic job, btw!

Tiny and blazing-fast fuzzy search in JavaScript, now with Angular 1.6.x support!

Fuzzy searching allows for flexibly matching a string with partial input, useful for filtering data very quickly based on lightweight user input.

## Demo

A fully functional demo is included in the `example/` directory.

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

### Nested Object References
If you want to search using a nested value like `person.name`, you can do so by passing a dot-notation string to the filter like this:
```html
<input type="text" ng-model="model.fuzzySearchValue" />
...
<div class="col-xs-12" ng-repeat="thing in model.things | fuzzyFilter:model.fuzzySearchValue:'person.name'">
```

You can also use this in conjunction with `filterMulitple` and even mix and match like below:

```html
<input type="text" ng-model="model.fuzzySearchValue">
...
<div class="col-xs-12" ng-repeat="thing in model.things | filterMultiple:{'person.name':model.fuzzySearchValue, desc:model.fuzzySearchValue}:'fuzzyFilter'">
```

### Changelog

| Version | Date | Notes |
|:-------:|:-----|:------|
| **v1.2.0** | 07/17 | Added nested object filtering via dot notation keys |
| **v1.1.2** | 07/17 | Added `filterMultiple` and alphabetized filtering. Ng-repeat order will be preserved until input starts |
| **v1.1.0** | 07/17 | Added module export as `ngFuzzySearch` to better support webpack |

# License - **MIT**


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[1]: https://cloud.githubusercontent.com/assets/934293/6550014/d3a86174-c5fc-11e4-8334-b2e2b0d38fad.png
[2]: http://en.wikipedia.org/wiki/Levenshtein_distance
[3]: http://bevacqua.github.io/horsey
[4]: http://jsperf.com/fuzzysearch-regex/14
