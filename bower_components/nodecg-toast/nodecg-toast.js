(function () {
	const TARGET_WINDOW = findNodeCGWindowOrTopWindow();
	const TARGET_DOCUMENT = TARGET_WINDOW.document;
	const CURRENT_WINDOW_IS_TARGET_WINDOW = TARGET_WINDOW === window;

	function findNodeCGWindowOrTopWindow() {
		if (window.__nodecg__) {
			return window;
		}

		try {
			let parent = window.parent;
			while (parent && parent !== parent.parent) {
				if (parent.__nodecg__) {
					return parent;
				}

				parent = parent.parent;
			}

			return parent;
		} catch (e) {
			return window;
		}
	}

	/* If a single panel is reloaded by right clicking on it and hitting "Reload frame",
	 * it will attach duplicate paper-toast nodes to the top DOM. This block finds those
	 * old paper-toast nodes and removes them.
	 */
	const now = Date.now();
	const pathname = window.location.pathname;
	const oldNodes = TARGET_DOCUMENT.querySelectorAll(`paper-toast[pathname="${pathname}"]:not([timestamp="${now}"])`);
	for (let i = 0; i < oldNodes.length; i++) {
		TARGET_DOCUMENT.body.removeChild(oldNodes[i]);
	}

	/**
	 * `nodecg-toast`
	 *
	 * @customElement
	 * @polymer
	 */
	class NodecgToast extends Polymer.Element {
		static get is() {
			return 'nodecg-toast';
		}

		static get properties() {
			return {
				/**
				 * The duration in milliseconds to show the toast.
				 */
				duration: {
					type: Number,
					value: 3000
				},

				/**
				 * The text to display in the toast.
				 */
				text: {
					type: String,
					value: ''
				}
			};
		}

		static get observers() {
			return [
				'_durationChanged(duration, toaster)',
				'_textChanged(duration, toaster)'
			];
		}

		static get forwardedMethods() {
			return [
				'assignParentResizable',
				'cancel',
				'center',
				'close',
				'constrain',
				'fit',
				'hide',
				'invalidateTabbables',
				'notifyResize',
				'open',
				'position',
				'refit',
				'resetFit',
				'resizerShouldNotify',
				'show',
				'stopResizeNotificationsFor',
				'toggle'
			];
		}

		ready() {
			super.ready();
			if (!NodecgToast.pendingPaperToastImport && !NodecgToast.paperToastImported &&
				CURRENT_WINDOW_IS_TARGET_WINDOW) {
				NodecgToast.pendingPaperToastImport = true;

				// Success callback here is needed for tests.
				Polymer.importHref(this.resolveUrl('../paper-toast/paper-toast.html'), () => {
					NodecgToast.pendingPaperToastImport = false;
					NodecgToast.paperToastImported = true;
					this.dispatchEvent(new CustomEvent('paper-toast-imported', {bubbles: false, composed: true}));
				});
			}

			// Forward method calls to the paper-toast element
			NodecgToast.forwardedMethods.forEach(methodName => {
				this[methodName] = function (...args) {
					return this.toaster[methodName](...args);
				};
			});
		}

		// Set up content observer and toaster.
		connectedCallback() {
			super.connectedCallback();
			this.toaster = TARGET_DOCUMENT.createElement('paper-toast');
			this.toaster.setAttribute('pathname', pathname);
			this.toaster.setAttribute('timestamp', now);
			this._observer = new Polymer.FlattenedNodesObserver(this.$.slot, this._contentChanged.bind(this));
			TARGET_DOCUMENT.body.appendChild(this.toaster);
		}

		disconnectedCallback() {
			super.disconnectedCallback();
			TARGET_DOCUMENT.body.removeChild(this.toaster);
		}

		_durationChanged() {
			if (!this.toaster) {
				return;
			}

			this.toaster.duration = this.duration;
		}

		_textChanged() {
			if (!this.toaster) {
				return;
			}

			this.toaster.text = this.text;
		}

		_contentChanged() {
			// Remove any existing content from the toaster.
			while (this.toaster.firstChild) {
				this.toaster.removeChild(this.toaster.firstChild);
			}

			// Clone the current content in the toaster.
			const distributedNodes = this.$.slot.assignedNodes({flatten: true});
			distributedNodes.forEach(node => {
				this.toaster.appendChild(node.cloneNode(true));
			});
		}
	}

	window.NodecgToast = NodecgToast;
	customElements.define(NodecgToast.is, NodecgToast);
})();
