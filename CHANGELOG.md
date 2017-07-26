# v1.2.0 Nested Object Support
 - Added support for using dot notation strings to reference nested objects (see README.md)

# v1.1.2 Webpack Support
 - Added module export as `ngFuzzySearch` to better support webpack.

# v1.1.0 Multi Pass
 - Added `filterMultiple` filter option to allow for filtering by multiple object keys
 - Alphabetized search result ordering, order preserved until filter string length > 0

# v1.0.3 Short Fuse

- Improved circuit-breaker when `needle` and `haystack` length are equal

# v1.0.2 Vodka Tonic

- Slightly updated circuit-breaker that tests for equal length first
- Doubled method performance ([see jsperf tests](http://jsperf.com/fuzzysearch-regex/3))

# v1.0.1 Circuit Breaker

- Introduced a circuit-breaker where queries longer than the searched string will return `false`
- Introduced a circuit-breaker where queries identical to the searched string will return `true`
- Introduced a circuit-breaker where text containing the entire query will return `true`

# v1.0.0 IPO

- Initial Public Release
