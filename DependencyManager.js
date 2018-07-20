/*$Id$*/


//================= FWP's first dependency - (permission by the server) =======================//
var FWP_BE_USED = true;																		   // trivially true for now
//=============================================================================================//


const ENSURERS = {	// put all the polyfills, shims, workarounds to ensure default-type dependencies here
		"promise" : function(){			// No i18N
					(function (global, factory) {
						typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :			// No i18N
						typeof define === 'function' && define.amd ? define(factory) :			// No i18N
						(global.Promise = factory());
					}(window, (function () { 	// registering with window object
					'use strict';			// No i18N
					// Store setTimeout reference so promise-polyfill will be unaffected by
					// other code modifying setTimeout (like sinon.useFakeTimers())
					var setTimeoutFunc = setTimeout;
		
					function noop() {}
		
					// Polyfill for Function.prototype.bind
					function bind(fn, thisArg) {
					  return function() {
					    fn.apply(thisArg, arguments);
					  };
					}
		
					function handle(self, deferred) {
					  while (self._state === 3) {
					    self = self._value;
					  }
					  if (self._state === 0) {
					    self._deferreds.push(deferred);
					    return;
					  }
					  self._handled = true;
					  Promise._immediateFn(function() {
					    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
					    if (cb === null) {
					      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
					      return;
					    }
					    var ret;
					    try {
					      ret = cb(self._value);
					    } catch (e) {
					      reject(deferred.promise, e);
					      return;
					    }
					    resolve(deferred.promise, ret);
					  });
					}
		
					function resolve(self, newValue) {
					  try {
					    if (newValue === self){
					    	throw new TypeError('A promise cannot be resolved with itself.');			// No i18N
					    }
					    if (
					      newValue &&
					      (typeof newValue === 'object' || typeof newValue === 'function')			// No i18N
					    ) {
					      var then = newValue.then;
					      if (newValue instanceof Promise) {
					        self._state = 3;
					        self._value = newValue;
					        finale(self);
					        return;
					      } else if (typeof then === 'function') {			// No i18N
					        doResolve(bind(then, newValue), self);
					        return;
					      }
					    }
					    self._state = 1;
					    self._value = newValue;
					    finale(self);
					  } catch (e) {
					    reject(self, e);
					  }
					}
		
					function reject(self, newValue) {
					  self._state = 2;
					  self._value = newValue;
					  finale(self);
					}
		
					function finale(self) {
					  if (self._state === 2 && self._deferreds.length === 0) {
					    Promise._immediateFn(function() {
					      if (!self._handled) {
					        Promise._unhandledRejectionFn(self._value);
					      }
					    });
					  }
		
					  for (var i = 0, len = self._deferreds.length; i < len; i++) {
					    handle(self, self._deferreds[i]);
					  }
					  self._deferreds = null;
					}
		
					function Handler(onFulfilled, onRejected, promise) {
					  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;			// No i18N
					  this.onRejected = typeof onRejected === 'function' ? onRejected : null;			// No i18N
					  this.promise = promise;
					}
		

//					Take a potentially misbehaving resolver function and make sure
//					onFulfilled and onRejected are only called once.
//					Makes no guarantees about asynchrony.
					function doResolve(fn, self) {
					  var done = false;
					  try {
					    fn(
					      function(value) {
					        if (done) {
					        	return;
					        }
					        done = true;
					        resolve(self, value);
					      },
					      function(reason) {
					        if (done) {
					        	return;
					        }
					        done = true;
					        reject(self, reason);
					      }
					    );
					  } catch (ex) {
					    if (done) {
					    	return;
					    }
					    done = true;
					    reject(self, ex);
					  }
					}
		
					function Promise(fn) {
					  if (!(this instanceof Promise)){
						  throw new TypeError('Promises must be constructed via new');			// No i18N
					  }
					  if (typeof fn !== 'function') {
						  throw new TypeError('not a function');			// No i18N
					  }
					  this._state = 0;
					  this._handled = false;
					  this._value = undefined;
					  this._deferreds = [];
		
					  doResolve(fn, this);
					}
		
					var _proto = Promise.prototype;
					_proto["catch"] = function(onRejected) {			// No i18N
					  return this.then(null, onRejected);
					};
		
					_proto.then = function(onFulfilled, onRejected) {
					  var prom = new this.constructor(noop);
		
					  handle(this, new Handler(onFulfilled, onRejected, prom));
					  return prom;
					};
		
					Promise.all = function(arr) {
					  return new Promise(function(resolve, reject) {
					    if (!arr || typeof arr.length === 'undefined'){			// No i18N
					    	throw new TypeError('Promise.all accepts an array');			// No i18N
					    }
					    var args = Array.prototype.slice.call(arr);
					    if (args.length === 0) {
					    	return resolve([]);
					    }
					    var remaining = args.length;
		
					    function res(i, val) {
					      try {
					        if (val && (typeof val === 'object' || typeof val === 'function')) {			// No i18N
					          var then = val.then;
					          if (typeof then === 'function') {			// No i18N
					            then.call(
					              val,
					              function(val) {
					                res(i, val);
					              },
					              reject
					            );
					            return;
					          }
					        }
					        args[i] = val;
					        if (--remaining === 0) {
					          resolve(args);
					        }
					      } catch (ex) {
					        reject(ex);
					      }
					    }
		
					    for (var i = 0; i < args.length; i++) {
					      res(i, args[i]);
					    }
					  });
					};
		
					Promise.resolve = function(value) {
					  if (value && typeof value === 'object' && value.constructor === Promise) {			// No i18N
					    return value;
					  }
		
					  return new Promise(function(resolve) {
					    resolve(value);
					  });
					};
		
					Promise.reject = function(value) {
					  return new Promise(function(resolve, reject) {
					    reject(value);
					  });
					};
		
					Promise.race = function(values) {
					  return new Promise(function(resolve, reject) {
					    for (var i = 0, len = values.length; i < len; i++) {
					      values[i].then(resolve, reject);
					    }
					  });
					};
		
					// Use polyfill for setImmediate for performance gains
					Promise._immediateFn =
					  (typeof setImmediate === 'function' &&			// No i18N
					    function(fn) {
					      setImmediate(fn);
					    }) ||
					  function(fn) {
					    setTimeoutFunc(fn, 0);
					  };
		
					Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
					  if (typeof console !== 'undefined' && console) {			// No i18N
					    window["con"+"sole"].warn('Possible Unhandled Promise Rejection:', err); 			// No i18N
					  }
					};
		
					return Promise;
					})));
					Promise._unhandledRejectionFn = function(rejectError) {};	// a noop for unhandled rejection for now
		}	// end of ensurer: promise
}
//==========================================================================================================================================//



// DEPENDENCY MANAGER	====================================================================================================================//
// dependency manager is for managing dependencies in runtime and to fall-back onto other alternatives if dependency not met.
// If the dependency is browser based OR "default" dependency, then dep. Manager can call required polyfill to ensure the dependency

var requisite; // global object to interface with dependencies for all components

// the only object with self dependence in fwp
(function(self_dependence){
	function call_fn(fn, opts){
		if(typeof fn === "function"){
			return fn(opts);
		}
		return null;
	}
	if(!self_dependence) {
		// if dependency manager's self dependence is false, means NO module will initialize as dependencies can never be "taken" & would've to fallback
		requisite = {	// simply a default object saying NO to all dependency requests
				grant : function(){ return false; },
				take : function(){ return false; },
				del : function() {},
				getNewDependency : function(){ return undefined; }
		}
		return;
	}
	function DepManager(){
		var self = this;
		var name_stat_map = {};		// dependency name to dependency status

		var DEFAULT_SCOPE = "GLOBAL";			// No i18N
		
		var DEFAULT_DEPS = {	// default dependency name to its test method, ensure method and fallback method (scope for default dependencies is always global)
				"indexedDB" : {			// No i18N
					tester : function(){
						return 'indexedDB' in window;			// No i18N
					},
					ensurer : undefined,	// any polyfill that could ensure the dependency meets i.e. something that ensures tester passes on the next call
					fallback : undefined 	// method to fall back if the tester gives a negative
				},
				"promise" : {			// No i18N
					tester : function(){
						return 'Promise' in window;			// No i18N
					},
					ensurer : ENSURERS.promise,
					fallback : undefined
				},
				"serviceWorker" : {			// No i18N
					tester : function(){
						return 'serviceWorker' in navigator;			// No i18N
					},
					ensurer : undefined,
					fallback : undefined
				}
		};
		
		function processDefDeps(){
			// test it, try to ensure it if fails, then test it, fall back if test fails again
			for(key in DEFAULT_DEPS){
				if(DEFAULT_DEPS.hasOwnProperty(key)){
					if(call_fn(DEFAULT_DEPS[key].tester) === true){
						self.grant(key);
					}
					else{
						call_fn(DEFAULT_DEPS[key].ensurer);
						if(call_fn(DEFAULT_DEPS[key].tester) === true){
							self.grant(key);
						}
						else{
							call_fn(DEFAULT_DEPS[key].fallback);
						}
					}
				}
			}
		}
		
		var Dependency = function(name, scope, tester, ensurer, fallback){	// to create and grant default-type depencies in the run time
			this.resolve = function(){ return false; }	// default resolve status, in case the method short-circuits
			if(typeof name === 'undefined' || Object.prototype.toString.call(name) !== '[object String]'){			// No i18N
				return;
			}
			else{
				name = name.trim();
				if(name.length === 0){
					return;
				}
				scope = (typeof scope !== 'undefined' && Object.prototype.toString.call(scope) === '[object String]') ? scope.trim() : DEFAULT_SCOPE;			// No i18N
				scope = (scope.length > 0)? scope : DEFAULT_SCOPE;
				tester = (typeof tester === 'function')? tester : undefined;			// No i18N
				ensurer = (typeof ensurer === 'function')? ensurer : undefined;			// No i18N
				fallback = (typeof fallback === 'function')? fallback : undefined;			// No i18N
			}
			// resolve tries to take the dep, if unsuccessful, tests it and grants it(because it itself granted, it knows the dep is "takable" so returns true)
			// then if it failed the test, it tries to ensure the dependency, tests it again and if unsuccessful, falls back returning a false status
			// basically, resolve is a way to ensure and grant new dependency in runtime, there's no need to have predefined one occupying space but used rarely
			this.resolve = function(){	// returns true if it could grant/ensure-n-grant the dependency and false if it couldn't and had to fallback instead
				if(self.take(name, scope)){
					return true;
				}
				var test_res = call_fn(tester);
				if(typeof test_res !== 'boolean'){			// No i18N
					tester = function() { return true; }	// assumes the dependency is string type and not semantic type, so just grants a new dependency
				}
				if (test_res === true){
					return self.grant(name, scope);
				}
				else{
					call_fn(ensurer);
					if(call_fn(tester) === true){
						return self.grant(name, scope);
					}
					else{
						call_fn(fallback);
						return false;
					}
				}
			}
		};

		self.take = function(name, scope){	// !!! take returns true if the dependency is met and vice versa
			if(typeof name === 'undefined') { return false; }			// No i18N
			if(Object.prototype.toString.call(name) === '[object Object]'){			// No i18N
				return self.take(name.name, name.scope||scope);
			}
			if(Object.prototype.toString.call(name) !== '[object String]'){			// No i18N
				return false;
			}
			name = name.trim();
			if(name.length == 0){
				return false;
			}
			scope = (typeof scope !== 'undefined' && Object.prototype.toString.call(scope) === '[object String]') ? scope.trim() : DEFAULT_SCOPE;			// No i18N
			scope = (scope.length > 0)? scope : DEFAULT_SCOPE;
			return (name_stat_map[name] && name_stat_map[name][scope])? true : false;
		};

		self.grant = function(name, scope){	// !!! grant returns what would be the status of the very next take called on that dependency
			if(typeof name === 'undefined') { return false; }			// No i18N
			if(Object.prototype.toString.call(name) === '[object Object]'){			// No i18N
				return self.grant(name.name, name.scope||scope);
			}
			if(Object.prototype.toString.call(name) !== '[object String]'){			// No i18N
				return false;
			}
			name = name.trim();
			if(name.length == 0){
				return false;
			}
			scope = (typeof scope !== 'undefined' && Object.prototype.toString.call(scope) === '[object String]') ? scope.trim() : DEFAULT_SCOPE;			// No i18N
			scope = (scope.length > 0)? scope : DEFAULT_SCOPE;
			(typeof name_stat_map[name] === 'undefined')? name_stat_map[name] = {} : null;		// No i18N
			name_stat_map[name][scope] = true;
			return true;
		};

		self.del = function(name, scope){	// !!! del also returns what would be the status of the very next take called on that dependency(although that's redundant)
			// to be used to delete a dependency in case the granter of that dependency runs into some error
			if(typeof name === 'undefined') { return false; }			// No i18N
			if(Object.prototype.toString.call(name) === '[object Object]'){			// No i18N
				return self.del(name.name, name.scope||scope);
			}
			if(Object.prototype.toString.call(name) !== '[object String]'){			// No i18N
				return false;
			}
			name = name.trim();
			if(name.length == 0){
				return false;
			}
			scope = (typeof scope !== 'undefined' && Object.prototype.toString.call(scope) === '[object String]') ? scope.trim() : DEFAULT_SCOPE;			// No i18N
			scope = (scope.length > 0)? scope : DEFAULT_SCOPE;
			if(typeof name_stat_map[name] === 'undefined') {
				return false;
			}
			return name_stat_map[name][scope] = false;
		};

		self.getNewDependency = function(name, scope, tester, ensurer, fallback){
			return new Dependency(name, scope, tester, ensurer, fallback);
		};

		processDefDeps();	// process the default list of dependencies
	}

	requisite = new DepManager();
	Object.freeze(requisite);    // requisite object must not be changed

})(FWP_BE_USED); // FWP_BE_USED is a browser level switch to permit if dependency manager itself can be configured and therefore all others
