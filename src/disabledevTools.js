if (process.env.NODE_ENV === "production") {
	if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
	  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {};
	}
  }
  