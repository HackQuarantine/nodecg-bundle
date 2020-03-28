# \<nodecg-toast\> [![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/NodeCGElemements/nodecg-toast) [![Build Status](https://travis-ci.org/NodeCGElements/nodecg-toast.svg?branch=master)](https://travis-ci.org/NodeCGElements/nodecg-toast) [![Coverage Status](https://coveralls.io/repos/github/NodeCGElements/nodecg-toast/badge.svg?branch=master)](https://coveralls.io/github/NodeCGElements/nodecg-toast?branch=master) ![Polymer 2 only](https://img.shields.io/badge/Polymer%202-only-blue.svg)


An implementation of [paper-toast](https://www.webcomponents.org/element/PolymerElements/paper-toast) designed to work well in NodeCG dashboard panels. Requires Polymer 2.

[Click here for docs & demo.](https://nodecgelements.github.io/nodecg-toast)

## Motivation
NodeCG dashboard panels are iframes. Showing toasts inside these iframes
isn't always the best way of notifying a user. `nodecg-toast` reaches outside
of the iframe and places a `paper-toast` in the top document. `nodecg-toast`
then acts as a proxy to this top-level `paper-toast`. The result is that the
dashboard panel can interact with `nodecg-toast` just as it would any other `paper-toast`,
but the toast gets shown on the dashboard itself, instead of just within the
iframe of the current panel.

## Installation

From your bundle's root directory:
```sh
bower install --save NodeCGElements/nodecg-toast
```

## Usage
```html
<nodecg-toast text="Look at me!"></nodecg-toast>
```

For more detailed documentation, refer to [paper-toast](https://www.webcomponents.org/element/PolymerElements/paper-toast).

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## Credits

Based entirely on [paper-toast](https://github.com/PolymerElements/paper-toast) by the Polymer Project.

# License

nodecg-toast is provided under the MIT license, which is available to read in the 
[LICENSE](LICENSE) file.
