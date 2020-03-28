<a name="1.0.0"></a>
## [1.0.0](https://github.com/NodeCGElements/nodecg-toast/compare/v0.2.2...v1.0.0) (2017-05-31)

This release ports `<nodecg-toast>` to Polymer 2 and adds a new test suite with code coverage reporting.


### Features

* The following methods are now forwarded from `<nodecg-toast>` to its corresponding `<paper-toast>`. Calling any of these methods on `<nodecg-toast>` will result in that method being called on the `<paper-toast>` with the same arguments:
  - `assignParentResizable`
  - `cancel`
  - `center`
  - `close`
  - `constrain`
  - `fit`
  - `hide`
  - `invalidateTabbables`
  - `notifyResize`
  - `open`
  - `position`
  - `refit`
  - `resetFit`
  - `resizerShouldNotify`
  - `show`
  - `stopResizeNotificationsFor`
  - `toggle`
  

### BREAKING CHANGES
* `<nodecg-toast>` has been ported to Polymer 2, and will no longer function on Polymer 1.


<a name="0.2.2"></a>
## [0.2.2](https://github.com/NodeCGElements/nodecg-toast/compare/v0.2.1...v0.2.2) (2017-05-12)


### Bug Fixes

* fix case where paper-toast could be attached to the wrong document ([3de8f11](https://github.com/NodeCGElements/nodecg-toast/commit/3de8f11))


### Features

* add support for "standalone" panels ([cdd6684](https://github.com/NodeCGElements/nodecg-toast/commit/cdd6684))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/NodeCGElements/nodecg-toast/compare/v0.2.0...v0.2.1) (2017-05-12)


### Bug Fixes

* fix infinite loop when used on standalone panels ([84e6a62](https://github.com/NodeCGElements/nodecg-toast/commit/84e6a62))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/NodeCGElements/nodecg-toast/compare/v0.1.3...v0.2.0) (2017-03-20)

### BREAKING CHANGES
* port to ES6

<a name="0.1.3"></a>
# [0.1.3](https://github.com/NodeCGElements/nodecg-toast/compare/v0.1.2...v0.1.3) (2017-02-27)


### Bug Fixes

* forward args from .show() and .hide() to the paper-toast element ([149af4b](https://github.com/NodeCGElements/nodecg-toast/commit/149af4b))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/NodeCGElements/nodecg-toast/compare/v0.1.1...v0.1.2) (2015-11-26)



<a name="0.1.1"></a>
## [0.1.1](https://github.com/NodeCGElements/nodecg-toast/compare/v0.1.0...v0.1.1) (2015-10-29)



<a name="0.1.0"></a>
# 0.1.0 (2015-10-20)



