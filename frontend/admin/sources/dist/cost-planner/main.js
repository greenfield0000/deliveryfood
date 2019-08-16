(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/zone.js/dist/zone.js":
/*!*******************************************!*\
  !*** ./node_modules/zone.js/dist/zone.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
(function (global, factory) {
	 true ? factory() :
	undefined;
}(this, (function () { 'use strict';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Zone$1 = (function (global) {
    var performance = global['performance'];
    function mark(name) {
        performance && performance['mark'] && performance['mark'](name);
    }
    function performanceMeasure(name, label) {
        performance && performance['measure'] && performance['measure'](name, label);
    }
    mark('Zone');
    var checkDuplicate = global[('__zone_symbol__forceDuplicateZoneCheck')] === true;
    if (global['Zone']) {
        // if global['Zone'] already exists (maybe zone.js was already loaded or
        // some other lib also registered a global object named Zone), we may need
        // to throw an error, but sometimes user may not want this error.
        // For example,
        // we have two web pages, page1 includes zone.js, page2 doesn't.
        // and the 1st time user load page1 and page2, everything work fine,
        // but when user load page2 again, error occurs because global['Zone'] already exists.
        // so we add a flag to let user choose whether to throw this error or not.
        // By default, if existing Zone is from zone.js, we will not throw the error.
        if (checkDuplicate || typeof global['Zone'].__symbol__ !== 'function') {
            throw new Error('Zone already loaded.');
        }
        else {
            return global['Zone'];
        }
    }
    var Zone = /** @class */ (function () {
        function Zone(parent, zoneSpec) {
            this._parent = parent;
            this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
            this._properties = zoneSpec && zoneSpec.properties || {};
            this._zoneDelegate =
                new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
        }
        Zone.assertZonePatched = function () {
            if (global['Promise'] !== patches['ZoneAwarePromise']) {
                throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
                    'has been overwritten.\n' +
                    'Most likely cause is that a Promise polyfill has been loaded ' +
                    'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
                    'If you must load one, do so before loading zone.js.)');
            }
        };
        Object.defineProperty(Zone, "root", {
            get: function () {
                var zone = Zone.current;
                while (zone.parent) {
                    zone = zone.parent;
                }
                return zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "current", {
            get: function () {
                return _currentZoneFrame.zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "currentTask", {
            get: function () {
                return _currentTask;
            },
            enumerable: true,
            configurable: true
        });
        Zone.__load_patch = function (name, fn) {
            if (patches.hasOwnProperty(name)) {
                if (checkDuplicate) {
                    throw Error('Already loaded patch: ' + name);
                }
            }
            else if (!global['__Zone_disable_' + name]) {
                var perfName = 'Zone:' + name;
                mark(perfName);
                patches[name] = fn(global, Zone, _api);
                performanceMeasure(perfName, perfName);
            }
        };
        Object.defineProperty(Zone.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Zone.prototype.get = function (key) {
            var zone = this.getZoneWith(key);
            if (zone)
                return zone._properties[key];
        };
        Zone.prototype.getZoneWith = function (key) {
            var current = this;
            while (current) {
                if (current._properties.hasOwnProperty(key)) {
                    return current;
                }
                current = current._parent;
            }
            return null;
        };
        Zone.prototype.fork = function (zoneSpec) {
            if (!zoneSpec)
                throw new Error('ZoneSpec required!');
            return this._zoneDelegate.fork(this, zoneSpec);
        };
        Zone.prototype.wrap = function (callback, source) {
            if (typeof callback !== 'function') {
                throw new Error('Expecting function got: ' + callback);
            }
            var _callback = this._zoneDelegate.intercept(this, callback, source);
            var zone = this;
            return function () {
                return zone.runGuarded(_callback, this, arguments, source);
            };
        };
        Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = null; }
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runTask = function (task, applyThis, applyArgs) {
            if (task.zone != this) {
                throw new Error('A task can only be run in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            }
            // https://github.com/angular/zone.js/issues/778, sometimes eventTask
            // will run in notScheduled(canceled) state, we should not try to
            // run such kind of task but just return
            if (task.state === notScheduled && (task.type === eventTask || task.type === macroTask)) {
                return;
            }
            var reEntryGuard = task.state != running;
            reEntryGuard && task._transitionTo(running, scheduled);
            task.runCount++;
            var previousTask = _currentTask;
            _currentTask = task;
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                    task.cancelFn = undefined;
                }
                try {
                    return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                // if the task's state is notScheduled or unknown, then it has already been cancelled
                // we should not reset the state to scheduled
                if (task.state !== notScheduled && task.state !== unknown) {
                    if (task.type == eventTask || (task.data && task.data.isPeriodic)) {
                        reEntryGuard && task._transitionTo(scheduled, running);
                    }
                    else {
                        task.runCount = 0;
                        this._updateTaskCount(task, -1);
                        reEntryGuard &&
                            task._transitionTo(notScheduled, running, notScheduled);
                    }
                }
                _currentZoneFrame = _currentZoneFrame.parent;
                _currentTask = previousTask;
            }
        };
        Zone.prototype.scheduleTask = function (task) {
            if (task.zone && task.zone !== this) {
                // check if the task was rescheduled, the newZone
                // should not be the children of the original zone
                var newZone = this;
                while (newZone) {
                    if (newZone === task.zone) {
                        throw Error("can not reschedule task to " + this.name + " which is descendants of the original zone " + task.zone.name);
                    }
                    newZone = newZone.parent;
                }
            }
            task._transitionTo(scheduling, notScheduled);
            var zoneDelegates = [];
            task._zoneDelegates = zoneDelegates;
            task._zone = this;
            try {
                task = this._zoneDelegate.scheduleTask(this, task);
            }
            catch (err) {
                // should set task's state to unknown when scheduleTask throw error
                // because the err may from reschedule, so the fromState maybe notScheduled
                task._transitionTo(unknown, scheduling, notScheduled);
                // TODO: @JiaLiPassion, should we check the result from handleError?
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            if (task._zoneDelegates === zoneDelegates) {
                // we have to check because internally the delegate can reschedule the task.
                this._updateTaskCount(task, 1);
            }
            if (task.state == scheduling) {
                task._transitionTo(scheduled, scheduling);
            }
            return task;
        };
        Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
            return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, undefined));
        };
        Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.cancelTask = function (task) {
            if (task.zone != this)
                throw new Error('A task can only be cancelled in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            task._transitionTo(canceling, scheduled, running);
            try {
                this._zoneDelegate.cancelTask(this, task);
            }
            catch (err) {
                // if error occurs when cancelTask, transit the state to unknown
                task._transitionTo(unknown, canceling);
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            this._updateTaskCount(task, -1);
            task._transitionTo(notScheduled, canceling);
            task.runCount = 0;
            return task;
        };
        Zone.prototype._updateTaskCount = function (task, count) {
            var zoneDelegates = task._zoneDelegates;
            if (count == -1) {
                task._zoneDelegates = null;
            }
            for (var i = 0; i < zoneDelegates.length; i++) {
                zoneDelegates[i]._updateTaskCount(task.type, count);
            }
        };
        Zone.__symbol__ = __symbol__;
        return Zone;
    }());
    var DELEGATE_ZS = {
        name: '',
        onHasTask: function (delegate, _, target, hasTaskState) { return delegate.hasTask(target, hasTaskState); },
        onScheduleTask: function (delegate, _, target, task) {
            return delegate.scheduleTask(target, task);
        },
        onInvokeTask: function (delegate, _, target, task, applyThis, applyArgs) {
            return delegate.invokeTask(target, task, applyThis, applyArgs);
        },
        onCancelTask: function (delegate, _, target, task) { return delegate.cancelTask(target, task); }
    };
    var ZoneDelegate = /** @class */ (function () {
        function ZoneDelegate(zone, parentDelegate, zoneSpec) {
            this._taskCounts = { 'microTask': 0, 'macroTask': 0, 'eventTask': 0 };
            this.zone = zone;
            this._parentDelegate = parentDelegate;
            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
            this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate.zone);
            this._interceptZS =
                zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
            this._interceptDlgt =
                zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
            this._interceptCurrZone =
                zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate.zone);
            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
            this._invokeDlgt =
                zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
            this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate.zone);
            this._handleErrorZS =
                zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
            this._handleErrorDlgt =
                zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
            this._handleErrorCurrZone =
                zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate.zone);
            this._scheduleTaskZS =
                zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
            this._scheduleTaskDlgt = zoneSpec &&
                (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
            this._scheduleTaskCurrZone =
                zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate.zone);
            this._invokeTaskZS =
                zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
            this._invokeTaskDlgt =
                zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
            this._invokeTaskCurrZone =
                zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate.zone);
            this._cancelTaskZS =
                zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
            this._cancelTaskDlgt =
                zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
            this._cancelTaskCurrZone =
                zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate.zone);
            this._hasTaskZS = null;
            this._hasTaskDlgt = null;
            this._hasTaskDlgtOwner = null;
            this._hasTaskCurrZone = null;
            var zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
            var parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
            if (zoneSpecHasTask || parentHasTask) {
                // If we need to report hasTask, than this ZS needs to do ref counting on tasks. In such
                // a case all task related interceptors must go through this ZD. We can't short circuit it.
                this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
                this._hasTaskDlgt = parentDelegate;
                this._hasTaskDlgtOwner = this;
                this._hasTaskCurrZone = zone;
                if (!zoneSpec.onScheduleTask) {
                    this._scheduleTaskZS = DELEGATE_ZS;
                    this._scheduleTaskDlgt = parentDelegate;
                    this._scheduleTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onInvokeTask) {
                    this._invokeTaskZS = DELEGATE_ZS;
                    this._invokeTaskDlgt = parentDelegate;
                    this._invokeTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onCancelTask) {
                    this._cancelTaskZS = DELEGATE_ZS;
                    this._cancelTaskDlgt = parentDelegate;
                    this._cancelTaskCurrZone = this.zone;
                }
            }
        }
        ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
                new Zone(targetZone, zoneSpec);
        };
        ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
            return this._interceptZS ?
                this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) :
                callback;
        };
        ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
            return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) :
                callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.handleError = function (targetZone, error) {
            return this._handleErrorZS ?
                this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) :
                true;
        };
        ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
            var returnTask = task;
            if (this._scheduleTaskZS) {
                if (this._hasTaskZS) {
                    returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
                }
                returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
                if (!returnTask)
                    returnTask = task;
            }
            else {
                if (task.scheduleFn) {
                    task.scheduleFn(task);
                }
                else if (task.type == microTask) {
                    scheduleMicroTask(task);
                }
                else {
                    throw new Error('Task is missing scheduleFn.');
                }
            }
            return returnTask;
        };
        ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
            return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) :
                task.callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
            var value;
            if (this._cancelTaskZS) {
                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
            }
            else {
                if (!task.cancelFn) {
                    throw Error('Task is not cancelable');
                }
                value = task.cancelFn(task);
            }
            return value;
        };
        ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
            // hasTask should not throw error so other ZoneDelegate
            // can still trigger hasTask callback
            try {
                this._hasTaskZS &&
                    this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
            }
            catch (err) {
                this.handleError(targetZone, err);
            }
        };
        ZoneDelegate.prototype._updateTaskCount = function (type, count) {
            var counts = this._taskCounts;
            var prev = counts[type];
            var next = counts[type] = prev + count;
            if (next < 0) {
                throw new Error('More tasks executed then were scheduled.');
            }
            if (prev == 0 || next == 0) {
                var isEmpty = {
                    microTask: counts['microTask'] > 0,
                    macroTask: counts['macroTask'] > 0,
                    eventTask: counts['eventTask'] > 0,
                    change: type
                };
                this.hasTask(this.zone, isEmpty);
            }
        };
        return ZoneDelegate;
    }());
    var ZoneTask = /** @class */ (function () {
        function ZoneTask(type, source, callback, options, scheduleFn, cancelFn) {
            this._zone = null;
            this.runCount = 0;
            this._zoneDelegates = null;
            this._state = 'notScheduled';
            this.type = type;
            this.source = source;
            this.data = options;
            this.scheduleFn = scheduleFn;
            this.cancelFn = cancelFn;
            this.callback = callback;
            var self = this;
            // TODO: @JiaLiPassion options should have interface
            if (type === eventTask && options && options.useG) {
                this.invoke = ZoneTask.invokeTask;
            }
            else {
                this.invoke = function () {
                    return ZoneTask.invokeTask.call(global, self, this, arguments);
                };
            }
        }
        ZoneTask.invokeTask = function (task, target, args) {
            if (!task) {
                task = this;
            }
            _numberOfNestedTaskFrames++;
            try {
                task.runCount++;
                return task.zone.runTask(task, target, args);
            }
            finally {
                if (_numberOfNestedTaskFrames == 1) {
                    drainMicroTaskQueue();
                }
                _numberOfNestedTaskFrames--;
            }
        };
        Object.defineProperty(ZoneTask.prototype, "zone", {
            get: function () {
                return this._zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZoneTask.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        ZoneTask.prototype.cancelScheduleRequest = function () {
            this._transitionTo(notScheduled, scheduling);
        };
        ZoneTask.prototype._transitionTo = function (toState, fromState1, fromState2) {
            if (this._state === fromState1 || this._state === fromState2) {
                this._state = toState;
                if (toState == notScheduled) {
                    this._zoneDelegates = null;
                }
            }
            else {
                throw new Error(this.type + " '" + this.source + "': can not transition to '" + toState + "', expecting state '" + fromState1 + "'" + (fromState2 ? ' or \'' + fromState2 + '\'' : '') + ", was '" + this._state + "'.");
            }
        };
        ZoneTask.prototype.toString = function () {
            if (this.data && typeof this.data.handleId !== 'undefined') {
                return this.data.handleId.toString();
            }
            else {
                return Object.prototype.toString.call(this);
            }
        };
        // add toJSON method to prevent cyclic error when
        // call JSON.stringify(zoneTask)
        ZoneTask.prototype.toJSON = function () {
            return {
                type: this.type,
                state: this.state,
                source: this.source,
                zone: this.zone.name,
                runCount: this.runCount
            };
        };
        return ZoneTask;
    }());
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  MICROTASK QUEUE
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    var symbolSetTimeout = __symbol__('setTimeout');
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var _microTaskQueue = [];
    var _isDrainingMicrotaskQueue = false;
    var nativeMicroTaskQueuePromise;
    function scheduleMicroTask(task) {
        // if we are not running in any task, and there has not been anything scheduled
        // we must bootstrap the initial task creation by manually scheduling the drain
        if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
            // We are not running in Task, so we need to kickstart the microtask queue.
            if (!nativeMicroTaskQueuePromise) {
                if (global[symbolPromise]) {
                    nativeMicroTaskQueuePromise = global[symbolPromise].resolve(0);
                }
            }
            if (nativeMicroTaskQueuePromise) {
                var nativeThen = nativeMicroTaskQueuePromise[symbolThen];
                if (!nativeThen) {
                    // native Promise is not patchable, we need to use `then` directly
                    // issue 1078
                    nativeThen = nativeMicroTaskQueuePromise['then'];
                }
                nativeThen.call(nativeMicroTaskQueuePromise, drainMicroTaskQueue);
            }
            else {
                global[symbolSetTimeout](drainMicroTaskQueue, 0);
            }
        }
        task && _microTaskQueue.push(task);
    }
    function drainMicroTaskQueue() {
        if (!_isDrainingMicrotaskQueue) {
            _isDrainingMicrotaskQueue = true;
            while (_microTaskQueue.length) {
                var queue = _microTaskQueue;
                _microTaskQueue = [];
                for (var i = 0; i < queue.length; i++) {
                    var task = queue[i];
                    try {
                        task.zone.runTask(task, null, null);
                    }
                    catch (error) {
                        _api.onUnhandledError(error);
                    }
                }
            }
            _api.microtaskDrainDone();
            _isDrainingMicrotaskQueue = false;
        }
    }
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  BOOTSTRAP
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    var NO_ZONE = { name: 'NO ZONE' };
    var notScheduled = 'notScheduled', scheduling = 'scheduling', scheduled = 'scheduled', running = 'running', canceling = 'canceling', unknown = 'unknown';
    var microTask = 'microTask', macroTask = 'macroTask', eventTask = 'eventTask';
    var patches = {};
    var _api = {
        symbol: __symbol__,
        currentZoneFrame: function () { return _currentZoneFrame; },
        onUnhandledError: noop,
        microtaskDrainDone: noop,
        scheduleMicroTask: scheduleMicroTask,
        showUncaughtError: function () { return !Zone[__symbol__('ignoreConsoleErrorUncaughtError')]; },
        patchEventTarget: function () { return []; },
        patchOnProperties: noop,
        patchMethod: function () { return noop; },
        bindArguments: function () { return []; },
        patchThen: function () { return noop; },
        setNativePromise: function (NativePromise) {
            // sometimes NativePromise.resolve static function
            // is not ready yet, (such as core-js/es6.promise)
            // so we need to check here.
            if (NativePromise && typeof NativePromise.resolve === 'function') {
                nativeMicroTaskQueuePromise = NativePromise.resolve(0);
            }
        },
    };
    var _currentZoneFrame = { parent: null, zone: new Zone(null, null) };
    var _currentTask = null;
    var _numberOfNestedTaskFrames = 0;
    function noop() { }
    function __symbol__(name) {
        return '__zone_symbol__' + name;
    }
    performanceMeasure('Zone', 'Zone');
    return global['Zone'] = Zone;
})(typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global);

var __values = (undefined && undefined.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Zone.__load_patch('ZoneAwarePromise', function (global, Zone, api) {
    var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var ObjectDefineProperty = Object.defineProperty;
    function readableObjectToString(obj) {
        if (obj && obj.toString === Object.prototype.toString) {
            var className = obj.constructor && obj.constructor.name;
            return (className ? className : '') + ': ' + JSON.stringify(obj);
        }
        return obj ? obj.toString() : Object.prototype.toString.call(obj);
    }
    var __symbol__ = api.symbol;
    var _uncaughtPromiseErrors = [];
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var creationTrace = '__creationTrace__';
    api.onUnhandledError = function (e) {
        if (api.showUncaughtError()) {
            var rejection = e && e.rejection;
            if (rejection) {
                console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
            }
            else {
                console.error(e);
            }
        }
    };
    api.microtaskDrainDone = function () {
        while (_uncaughtPromiseErrors.length) {
            var _loop_1 = function () {
                var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                try {
                    uncaughtPromiseError.zone.runGuarded(function () {
                        throw uncaughtPromiseError;
                    });
                }
                catch (error) {
                    handleUnhandledRejection(error);
                }
            };
            while (_uncaughtPromiseErrors.length) {
                _loop_1();
            }
        }
    };
    var UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__('unhandledPromiseRejectionHandler');
    function handleUnhandledRejection(e) {
        api.onUnhandledError(e);
        try {
            var handler = Zone[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
            if (handler && typeof handler === 'function') {
                handler.call(this, e);
            }
        }
        catch (err) {
        }
    }
    function isThenable(value) {
        return value && value.then;
    }
    function forwardResolution(value) {
        return value;
    }
    function forwardRejection(rejection) {
        return ZoneAwarePromise.reject(rejection);
    }
    var symbolState = __symbol__('state');
    var symbolValue = __symbol__('value');
    var symbolFinally = __symbol__('finally');
    var symbolParentPromiseValue = __symbol__('parentPromiseValue');
    var symbolParentPromiseState = __symbol__('parentPromiseState');
    var source = 'Promise.then';
    var UNRESOLVED = null;
    var RESOLVED = true;
    var REJECTED = false;
    var REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
        return function (v) {
            try {
                resolvePromise(promise, state, v);
            }
            catch (err) {
                resolvePromise(promise, false, err);
            }
            // Do not return value or you will break the Promise spec.
        };
    }
    var once = function () {
        var wasCalled = false;
        return function wrapper(wrappedFunction) {
            return function () {
                if (wasCalled) {
                    return;
                }
                wasCalled = true;
                wrappedFunction.apply(null, arguments);
            };
        };
    };
    var TYPE_ERROR = 'Promise resolved with itself';
    var CURRENT_TASK_TRACE_SYMBOL = __symbol__('currentTaskTrace');
    // Promise Resolution
    function resolvePromise(promise, state, value) {
        var onceWrapper = once();
        if (promise === value) {
            throw new TypeError(TYPE_ERROR);
        }
        if (promise[symbolState] === UNRESOLVED) {
            // should only get value.then once based on promise spec.
            var then = null;
            try {
                if (typeof value === 'object' || typeof value === 'function') {
                    then = value && value.then;
                }
            }
            catch (err) {
                onceWrapper(function () {
                    resolvePromise(promise, false, err);
                })();
                return promise;
            }
            // if (value instanceof ZoneAwarePromise) {
            if (state !== REJECTED && value instanceof ZoneAwarePromise &&
                value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) &&
                value[symbolState] !== UNRESOLVED) {
                clearRejectedNoCatch(value);
                resolvePromise(promise, value[symbolState], value[symbolValue]);
            }
            else if (state !== REJECTED && typeof then === 'function') {
                try {
                    then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
                }
                catch (err) {
                    onceWrapper(function () {
                        resolvePromise(promise, false, err);
                    })();
                }
            }
            else {
                promise[symbolState] = state;
                var queue = promise[symbolValue];
                promise[symbolValue] = value;
                if (promise[symbolFinally] === symbolFinally) {
                    // the promise is generated by Promise.prototype.finally
                    if (state === RESOLVED) {
                        // the state is resolved, should ignore the value
                        // and use parent promise value
                        promise[symbolState] = promise[symbolParentPromiseState];
                        promise[symbolValue] = promise[symbolParentPromiseValue];
                    }
                }
                // record task information in value when error occurs, so we can
                // do some additional work such as render longStackTrace
                if (state === REJECTED && value instanceof Error) {
                    // check if longStackTraceZone is here
                    var trace = Zone.currentTask && Zone.currentTask.data &&
                        Zone.currentTask.data[creationTrace];
                    if (trace) {
                        // only keep the long stack trace into error when in longStackTraceZone
                        ObjectDefineProperty(value, CURRENT_TASK_TRACE_SYMBOL, { configurable: true, enumerable: false, writable: true, value: trace });
                    }
                }
                for (var i = 0; i < queue.length;) {
                    scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                }
                if (queue.length == 0 && state == REJECTED) {
                    promise[symbolState] = REJECTED_NO_CATCH;
                    try {
                        // try to print more readable error log
                        throw new Error('Uncaught (in promise): ' + readableObjectToString(value) +
                            (value && value.stack ? '\n' + value.stack : ''));
                    }
                    catch (err) {
                        var error_1 = err;
                        error_1.rejection = value;
                        error_1.promise = promise;
                        error_1.zone = Zone.current;
                        error_1.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(error_1);
                        api.scheduleMicroTask(); // to make sure that it is running
                    }
                }
            }
        }
        // Resolving an already resolved promise is a noop.
        return promise;
    }
    var REJECTION_HANDLED_HANDLER = __symbol__('rejectionHandledHandler');
    function clearRejectedNoCatch(promise) {
        if (promise[symbolState] === REJECTED_NO_CATCH) {
            // if the promise is rejected no catch status
            // and queue.length > 0, means there is a error handler
            // here to handle the rejected promise, we should trigger
            // windows.rejectionhandled eventHandler or nodejs rejectionHandled
            // eventHandler
            try {
                var handler = Zone[REJECTION_HANDLED_HANDLER];
                if (handler && typeof handler === 'function') {
                    handler.call(this, { rejection: promise[symbolValue], promise: promise });
                }
            }
            catch (err) {
            }
            promise[symbolState] = REJECTED;
            for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
                if (promise === _uncaughtPromiseErrors[i].promise) {
                    _uncaughtPromiseErrors.splice(i, 1);
                }
            }
        }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
        clearRejectedNoCatch(promise);
        var promiseState = promise[symbolState];
        var delegate = promiseState ?
            (typeof onFulfilled === 'function') ? onFulfilled : forwardResolution :
            (typeof onRejected === 'function') ? onRejected : forwardRejection;
        zone.scheduleMicroTask(source, function () {
            try {
                var parentPromiseValue = promise[symbolValue];
                var isFinallyPromise = chainPromise && symbolFinally === chainPromise[symbolFinally];
                if (isFinallyPromise) {
                    // if the promise is generated from finally call, keep parent promise's state and value
                    chainPromise[symbolParentPromiseValue] = parentPromiseValue;
                    chainPromise[symbolParentPromiseState] = promiseState;
                }
                // should not pass value to finally callback
                var value = zone.run(delegate, undefined, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ?
                    [] :
                    [parentPromiseValue]);
                resolvePromise(chainPromise, true, value);
            }
            catch (error) {
                // if error occurs, should always return this error
                resolvePromise(chainPromise, false, error);
            }
        }, chainPromise);
    }
    var ZONE_AWARE_PROMISE_TO_STRING = 'function ZoneAwarePromise() { [native code] }';
    var ZoneAwarePromise = /** @class */ (function () {
        function ZoneAwarePromise(executor) {
            var promise = this;
            if (!(promise instanceof ZoneAwarePromise)) {
                throw new Error('Must be an instanceof Promise.');
            }
            promise[symbolState] = UNRESOLVED;
            promise[symbolValue] = []; // queue;
            try {
                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
            }
            catch (error) {
                resolvePromise(promise, false, error);
            }
        }
        ZoneAwarePromise.toString = function () {
            return ZONE_AWARE_PROMISE_TO_STRING;
        };
        ZoneAwarePromise.resolve = function (value) {
            return resolvePromise(new this(null), RESOLVED, value);
        };
        ZoneAwarePromise.reject = function (error) {
            return resolvePromise(new this(null), REJECTED, error);
        };
        ZoneAwarePromise.race = function (values) {
            var e_1, _a;
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            function onResolve(value) {
                promise && (promise =  false || resolve(value));
            }
            function onReject(error) {
                promise && (promise =  false || reject(error));
            }
            try {
                for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                    var value = values_1_1.value;
                    if (!isThenable(value)) {
                        value = this.resolve(value);
                    }
                    value.then(onResolve, onReject);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return promise;
        };
        ZoneAwarePromise.all = function (values) {
            var e_2, _a;
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            // Start at 2 to prevent prematurely resolving if .then is called immediately.
            var unresolvedCount = 2;
            var valueIndex = 0;
            var resolvedValues = [];
            var _loop_2 = function (value) {
                if (!isThenable(value)) {
                    value = this_1.resolve(value);
                }
                var curValueIndex = valueIndex;
                value.then(function (value) {
                    resolvedValues[curValueIndex] = value;
                    unresolvedCount--;
                    if (unresolvedCount === 0) {
                        resolve(resolvedValues);
                    }
                }, reject);
                unresolvedCount++;
                valueIndex++;
            };
            var this_1 = this;
            try {
                for (var values_2 = __values(values), values_2_1 = values_2.next(); !values_2_1.done; values_2_1 = values_2.next()) {
                    var value = values_2_1.value;
                    _loop_2(value);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (values_2_1 && !values_2_1.done && (_a = values_2.return)) _a.call(values_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            // Make the unresolvedCount zero-based again.
            unresolvedCount -= 2;
            if (unresolvedCount === 0) {
                resolve(resolvedValues);
            }
            return promise;
        };
        ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
            var chainPromise = new this.constructor(null);
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
            }
            return chainPromise;
        };
        ZoneAwarePromise.prototype.catch = function (onRejected) {
            return this.then(null, onRejected);
        };
        ZoneAwarePromise.prototype.finally = function (onFinally) {
            var chainPromise = new this.constructor(null);
            chainPromise[symbolFinally] = symbolFinally;
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
            }
            return chainPromise;
        };
        return ZoneAwarePromise;
    }());
    // Protect against aggressive optimizers dropping seemingly unused properties.
    // E.g. Closure Compiler in advanced mode.
    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
    ZoneAwarePromise['race'] = ZoneAwarePromise.race;
    ZoneAwarePromise['all'] = ZoneAwarePromise.all;
    var NativePromise = global[symbolPromise] = global['Promise'];
    var ZONE_AWARE_PROMISE = Zone.__symbol__('ZoneAwarePromise');
    var desc = ObjectGetOwnPropertyDescriptor(global, 'Promise');
    if (!desc || desc.configurable) {
        desc && delete desc.writable;
        desc && delete desc.value;
        if (!desc) {
            desc = { configurable: true, enumerable: true };
        }
        desc.get = function () {
            // if we already set ZoneAwarePromise, use patched one
            // otherwise return native one.
            return global[ZONE_AWARE_PROMISE] ? global[ZONE_AWARE_PROMISE] : global[symbolPromise];
        };
        desc.set = function (NewNativePromise) {
            if (NewNativePromise === ZoneAwarePromise) {
                // if the NewNativePromise is ZoneAwarePromise
                // save to global
                global[ZONE_AWARE_PROMISE] = NewNativePromise;
            }
            else {
                // if the NewNativePromise is not ZoneAwarePromise
                // for example: after load zone.js, some library just
                // set es6-promise to global, if we set it to global
                // directly, assertZonePatched will fail and angular
                // will not loaded, so we just set the NewNativePromise
                // to global[symbolPromise], so the result is just like
                // we load ES6 Promise before zone.js
                global[symbolPromise] = NewNativePromise;
                if (!NewNativePromise.prototype[symbolThen]) {
                    patchThen(NewNativePromise);
                }
                api.setNativePromise(NewNativePromise);
            }
        };
        ObjectDefineProperty(global, 'Promise', desc);
    }
    global['Promise'] = ZoneAwarePromise;
    var symbolThenPatched = __symbol__('thenPatched');
    function patchThen(Ctor) {
        var proto = Ctor.prototype;
        var prop = ObjectGetOwnPropertyDescriptor(proto, 'then');
        if (prop && (prop.writable === false || !prop.configurable)) {
            // check Ctor.prototype.then propertyDescriptor is writable or not
            // in meteor env, writable is false, we should ignore such case
            return;
        }
        var originalThen = proto.then;
        // Keep a reference to the original method.
        proto[symbolThen] = originalThen;
        Ctor.prototype.then = function (onResolve, onReject) {
            var _this = this;
            var wrapped = new ZoneAwarePromise(function (resolve, reject) {
                originalThen.call(_this, resolve, reject);
            });
            return wrapped.then(onResolve, onReject);
        };
        Ctor[symbolThenPatched] = true;
    }
    api.patchThen = patchThen;
    if (NativePromise) {
        patchThen(NativePromise);
    }
    // This is not part of public API, but it is useful for tests, so we expose it.
    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
    return ZoneAwarePromise;
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Zone.__load_patch('fetch', function (global, Zone, api) {
    var fetch = global['fetch'];
    var ZoneAwarePromise = global.Promise;
    var symbolThenPatched = api.symbol('thenPatched');
    var fetchTaskScheduling = api.symbol('fetchTaskScheduling');
    var fetchTaskAborting = api.symbol('fetchTaskAborting');
    if (typeof fetch !== 'function') {
        return;
    }
    var OriginalAbortController = global['AbortController'];
    var supportAbort = typeof OriginalAbortController === 'function';
    var abortNative = null;
    if (supportAbort) {
        global['AbortController'] = function () {
            var abortController = new OriginalAbortController();
            var signal = abortController.signal;
            signal.abortController = abortController;
            return abortController;
        };
        abortNative = api.patchMethod(OriginalAbortController.prototype, 'abort', function (delegate) { return function (self, args) {
            if (self.task) {
                return self.task.zone.cancelTask(self.task);
            }
            return delegate.apply(self, args);
        }; });
    }
    var placeholder = function () { };
    global['fetch'] = function () {
        var _this = this;
        var args = Array.prototype.slice.call(arguments);
        var options = args.length > 1 ? args[1] : null;
        var signal = options && options.signal;
        return new Promise(function (res, rej) {
            var task = Zone.current.scheduleMacroTask('fetch', placeholder, args, function () {
                var fetchPromise;
                var zone = Zone.current;
                try {
                    zone[fetchTaskScheduling] = true;
                    fetchPromise = fetch.apply(_this, args);
                }
                catch (error) {
                    rej(error);
                    return;
                }
                finally {
                    zone[fetchTaskScheduling] = false;
                }
                if (!(fetchPromise instanceof ZoneAwarePromise)) {
                    var ctor = fetchPromise.constructor;
                    if (!ctor[symbolThenPatched]) {
                        api.patchThen(ctor);
                    }
                }
                fetchPromise.then(function (resource) {
                    if (task.state !== 'notScheduled') {
                        task.invoke();
                    }
                    res(resource);
                }, function (error) {
                    if (task.state !== 'notScheduled') {
                        task.invoke();
                    }
                    rej(error);
                });
            }, function () {
                if (!supportAbort) {
                    rej('No AbortController supported, can not cancel fetch');
                    return;
                }
                if (signal && signal.abortController && !signal.aborted &&
                    typeof signal.abortController.abort === 'function' && abortNative) {
                    try {
                        Zone.current[fetchTaskAborting] = true;
                        abortNative.call(signal.abortController);
                    }
                    finally {
                        Zone.current[fetchTaskAborting] = false;
                    }
                }
                else {
                    rej('cancel fetch need a AbortController.signal');
                }
            });
            if (signal && signal.abortController) {
                signal.abortController.task = task;
            }
        });
    };
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Suppress closure compiler errors about unknown 'Zone' variable
 * @fileoverview
 * @suppress {undefinedVars,globalThis,missingRequire}
 */
// issue #989, to reduce bundle size, use short name
/** Object.getOwnPropertyDescriptor */
var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
/** Object.defineProperty */
var ObjectDefineProperty = Object.defineProperty;
/** Object.getPrototypeOf */
var ObjectGetPrototypeOf = Object.getPrototypeOf;
/** Object.create */
var ObjectCreate = Object.create;
/** Array.prototype.slice */
var ArraySlice = Array.prototype.slice;
/** addEventListener string const */
var ADD_EVENT_LISTENER_STR = 'addEventListener';
/** removeEventListener string const */
var REMOVE_EVENT_LISTENER_STR = 'removeEventListener';
/** zoneSymbol addEventListener */
var ZONE_SYMBOL_ADD_EVENT_LISTENER = Zone.__symbol__(ADD_EVENT_LISTENER_STR);
/** zoneSymbol removeEventListener */
var ZONE_SYMBOL_REMOVE_EVENT_LISTENER = Zone.__symbol__(REMOVE_EVENT_LISTENER_STR);
/** true string const */
var TRUE_STR = 'true';
/** false string const */
var FALSE_STR = 'false';
/** __zone_symbol__ string const */
var ZONE_SYMBOL_PREFIX = '__zone_symbol__';
function wrapWithCurrentZone(callback, source) {
    return Zone.current.wrap(callback, source);
}
function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
    return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
}
var zoneSymbol = Zone.__symbol__;
var isWindowExists = typeof window !== 'undefined';
var internalWindow = isWindowExists ? window : undefined;
var _global = isWindowExists && internalWindow || typeof self === 'object' && self || global;
var REMOVE_ATTRIBUTE = 'removeAttribute';
var NULL_ON_PROP_VALUE = [null];
function bindArguments(args, source) {
    for (var i = args.length - 1; i >= 0; i--) {
        if (typeof args[i] === 'function') {
            args[i] = wrapWithCurrentZone(args[i], source + '_' + i);
        }
    }
    return args;
}
function patchPrototype(prototype, fnNames) {
    var source = prototype.constructor['name'];
    var _loop_1 = function (i) {
        var name_1 = fnNames[i];
        var delegate = prototype[name_1];
        if (delegate) {
            var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name_1);
            if (!isPropertyWritable(prototypeDesc)) {
                return "continue";
            }
            prototype[name_1] = (function (delegate) {
                var patched = function () {
                    return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));
                };
                attachOriginToPatched(patched, delegate);
                return patched;
            })(delegate);
        }
    };
    for (var i = 0; i < fnNames.length; i++) {
        _loop_1(i);
    }
}
function isPropertyWritable(propertyDesc) {
    if (!propertyDesc) {
        return true;
    }
    if (propertyDesc.writable === false) {
        return false;
    }
    return !(typeof propertyDesc.get === 'function' && typeof propertyDesc.set === 'undefined');
}
var isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
// Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
// this code.
var isNode = (!('nw' in _global) && typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]');
var isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow['HTMLElement']);
// we are in electron of nw, so we are both browser and nodejs
// Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
// this code.
var isMix = typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]' && !isWebWorker &&
    !!(isWindowExists && internalWindow['HTMLElement']);
var zoneSymbolEventNames = {};
var wrapFn = function (event) {
    // https://github.com/angular/zone.js/issues/911, in IE, sometimes
    // event will be undefined, so we need to use window.event
    event = event || _global.event;
    if (!event) {
        return;
    }
    var eventNameSymbol = zoneSymbolEventNames[event.type];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[event.type] = zoneSymbol('ON_PROPERTY' + event.type);
    }
    var target = this || event.target || _global;
    var listener = target[eventNameSymbol];
    var result;
    if (isBrowser && target === internalWindow && event.type === 'error') {
        // window.onerror have different signiture
        // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#window.onerror
        // and onerror callback will prevent default when callback return true
        var errorEvent = event;
        result = listener &&
            listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error);
        if (result === true) {
            event.preventDefault();
        }
    }
    else {
        result = listener && listener.apply(this, arguments);
        if (result != undefined && !result) {
            event.preventDefault();
        }
    }
    return result;
};
function patchProperty(obj, prop, prototype) {
    var desc = ObjectGetOwnPropertyDescriptor(obj, prop);
    if (!desc && prototype) {
        // when patch window object, use prototype to check prop exist or not
        var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
        if (prototypeDesc) {
            desc = { enumerable: true, configurable: true };
        }
    }
    // if the descriptor not exists or is not configurable
    // just return
    if (!desc || !desc.configurable) {
        return;
    }
    var onPropPatchedSymbol = zoneSymbol('on' + prop + 'patched');
    if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
        return;
    }
    // A property descriptor cannot have getter/setter and be writable
    // deleting the writable and value properties avoids this error:
    //
    // TypeError: property descriptors must not specify a value or be writable when a
    // getter or setter has been specified
    delete desc.writable;
    delete desc.value;
    var originalDescGet = desc.get;
    var originalDescSet = desc.set;
    // substr(2) cuz 'onclick' -> 'click', etc
    var eventName = prop.substr(2);
    var eventNameSymbol = zoneSymbolEventNames[eventName];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[eventName] = zoneSymbol('ON_PROPERTY' + eventName);
    }
    desc.set = function (newValue) {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return;
        }
        var previousValue = target[eventNameSymbol];
        if (previousValue) {
            target.removeEventListener(eventName, wrapFn);
        }
        // issue #978, when onload handler was added before loading zone.js
        // we should remove it with originalDescSet
        if (originalDescSet) {
            originalDescSet.apply(target, NULL_ON_PROP_VALUE);
        }
        if (typeof newValue === 'function') {
            target[eventNameSymbol] = newValue;
            target.addEventListener(eventName, wrapFn, false);
        }
        else {
            target[eventNameSymbol] = null;
        }
    };
    // The getter would return undefined for unassigned properties but the default value of an
    // unassigned property is null
    desc.get = function () {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return null;
        }
        var listener = target[eventNameSymbol];
        if (listener) {
            return listener;
        }
        else if (originalDescGet) {
            // result will be null when use inline event attribute,
            // such as <button onclick="func();">OK</button>
            // because the onclick function is internal raw uncompiled handler
            // the onclick will be evaluated when first time event was triggered or
            // the property is accessed, https://github.com/angular/zone.js/issues/525
            // so we should use original native get to retrieve the handler
            var value = originalDescGet && originalDescGet.call(this);
            if (value) {
                desc.set.call(this, value);
                if (typeof target[REMOVE_ATTRIBUTE] === 'function') {
                    target.removeAttribute(prop);
                }
                return value;
            }
        }
        return null;
    };
    ObjectDefineProperty(obj, prop, desc);
    obj[onPropPatchedSymbol] = true;
}
function patchOnProperties(obj, properties, prototype) {
    if (properties) {
        for (var i = 0; i < properties.length; i++) {
            patchProperty(obj, 'on' + properties[i], prototype);
        }
    }
    else {
        var onProperties = [];
        for (var prop in obj) {
            if (prop.substr(0, 2) == 'on') {
                onProperties.push(prop);
            }
        }
        for (var j = 0; j < onProperties.length; j++) {
            patchProperty(obj, onProperties[j], prototype);
        }
    }
}
var originalInstanceKey = zoneSymbol('originalInstance');
// wrap some native API on `window`
function patchClass(className) {
    var OriginalClass = _global[className];
    if (!OriginalClass)
        return;
    // keep original class in global
    _global[zoneSymbol(className)] = OriginalClass;
    _global[className] = function () {
        var a = bindArguments(arguments, className);
        switch (a.length) {
            case 0:
                this[originalInstanceKey] = new OriginalClass();
                break;
            case 1:
                this[originalInstanceKey] = new OriginalClass(a[0]);
                break;
            case 2:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                break;
            case 3:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                break;
            case 4:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                break;
            default:
                throw new Error('Arg list too long.');
        }
    };
    // attach original delegate to patched function
    attachOriginToPatched(_global[className], OriginalClass);
    var instance = new OriginalClass(function () { });
    var prop;
    for (prop in instance) {
        // https://bugs.webkit.org/show_bug.cgi?id=44721
        if (className === 'XMLHttpRequest' && prop === 'responseBlob')
            continue;
        (function (prop) {
            if (typeof instance[prop] === 'function') {
                _global[className].prototype[prop] = function () {
                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                };
            }
            else {
                ObjectDefineProperty(_global[className].prototype, prop, {
                    set: function (fn) {
                        if (typeof fn === 'function') {
                            this[originalInstanceKey][prop] = wrapWithCurrentZone(fn, className + '.' + prop);
                            // keep callback in wrapped function so we can
                            // use it in Function.prototype.toString to return
                            // the native one.
                            attachOriginToPatched(this[originalInstanceKey][prop], fn);
                        }
                        else {
                            this[originalInstanceKey][prop] = fn;
                        }
                    },
                    get: function () {
                        return this[originalInstanceKey][prop];
                    }
                });
            }
        }(prop));
    }
    for (prop in OriginalClass) {
        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
            _global[className][prop] = OriginalClass[prop];
        }
    }
}
function copySymbolProperties(src, dest) {
    if (typeof Object.getOwnPropertySymbols !== 'function') {
        return;
    }
    var symbols = Object.getOwnPropertySymbols(src);
    symbols.forEach(function (symbol) {
        var desc = Object.getOwnPropertyDescriptor(src, symbol);
        Object.defineProperty(dest, symbol, {
            get: function () {
                return src[symbol];
            },
            set: function (value) {
                if (desc && (!desc.writable || typeof desc.set !== 'function')) {
                    // if src[symbol] is not writable or not have a setter, just return
                    return;
                }
                src[symbol] = value;
            },
            enumerable: desc ? desc.enumerable : true,
            configurable: desc ? desc.configurable : true
        });
    });
}
var shouldCopySymbolProperties = false;

function patchMethod(target, name, patchFn) {
    var proto = target;
    while (proto && !proto.hasOwnProperty(name)) {
        proto = ObjectGetPrototypeOf(proto);
    }
    if (!proto && target[name]) {
        // somehow we did not find it, but we can see it. This happens on IE for Window properties.
        proto = target;
    }
    var delegateName = zoneSymbol(name);
    var delegate = null;
    if (proto && !(delegate = proto[delegateName])) {
        delegate = proto[delegateName] = proto[name];
        // check whether proto[name] is writable
        // some property is readonly in safari, such as HtmlCanvasElement.prototype.toBlob
        var desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
        if (isPropertyWritable(desc)) {
            var patchDelegate_1 = patchFn(delegate, delegateName, name);
            proto[name] = function () {
                return patchDelegate_1(this, arguments);
            };
            attachOriginToPatched(proto[name], delegate);
            if (shouldCopySymbolProperties) {
                copySymbolProperties(delegate, proto[name]);
            }
        }
    }
    return delegate;
}
// TODO: @JiaLiPassion, support cancel task later if necessary
function patchMacroTask(obj, funcName, metaCreator) {
    var setNative = null;
    function scheduleTask(task) {
        var data = task.data;
        data.args[data.cbIdx] = function () {
            task.invoke.apply(this, arguments);
        };
        setNative.apply(data.target, data.args);
        return task;
    }
    setNative = patchMethod(obj, funcName, function (delegate) { return function (self, args) {
        var meta = metaCreator(self, args);
        if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === 'function') {
            return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask);
        }
        else {
            // cause an error by calling it directly.
            return delegate.apply(self, args);
        }
    }; });
}

function attachOriginToPatched(patched, original) {
    patched[zoneSymbol('OriginalDelegate')] = original;
}
var isDetectedIEOrEdge = false;
var ieOrEdge = false;
function isIE() {
    try {
        var ua = internalWindow.navigator.userAgent;
        if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1) {
            return true;
        }
    }
    catch (error) {
    }
    return false;
}
function isIEOrEdge() {
    if (isDetectedIEOrEdge) {
        return ieOrEdge;
    }
    isDetectedIEOrEdge = true;
    try {
        var ua = internalWindow.navigator.userAgent;
        if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1 || ua.indexOf('Edge/') !== -1) {
            ieOrEdge = true;
        }
        return ieOrEdge;
    }
    catch (error) {
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// override Function.prototype.toString to make zone.js patched function
// look like native function
Zone.__load_patch('toString', function (global) {
    // patch Func.prototype.toString to let them look like native
    var originalFunctionToString = Function.prototype.toString;
    var ORIGINAL_DELEGATE_SYMBOL = zoneSymbol('OriginalDelegate');
    var PROMISE_SYMBOL = zoneSymbol('Promise');
    var ERROR_SYMBOL = zoneSymbol('Error');
    var newFunctionToString = function toString() {
        if (typeof this === 'function') {
            var originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
            if (originalDelegate) {
                if (typeof originalDelegate === 'function') {
                    return originalFunctionToString.apply(this[ORIGINAL_DELEGATE_SYMBOL], arguments);
                }
                else {
                    return Object.prototype.toString.call(originalDelegate);
                }
            }
            if (this === Promise) {
                var nativePromise = global[PROMISE_SYMBOL];
                if (nativePromise) {
                    return originalFunctionToString.apply(nativePromise, arguments);
                }
            }
            if (this === Error) {
                var nativeError = global[ERROR_SYMBOL];
                if (nativeError) {
                    return originalFunctionToString.apply(nativeError, arguments);
                }
            }
        }
        return originalFunctionToString.apply(this, arguments);
    };
    newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
    Function.prototype.toString = newFunctionToString;
    // patch Object.prototype.toString to let them look like native
    var originalObjectToString = Object.prototype.toString;
    var PROMISE_OBJECT_TO_STRING = '[object Promise]';
    Object.prototype.toString = function () {
        if (this instanceof Promise) {
            return PROMISE_OBJECT_TO_STRING;
        }
        return originalObjectToString.apply(this, arguments);
    };
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
var passiveSupported = false;
if (typeof window !== 'undefined') {
    try {
        var options = Object.defineProperty({}, 'passive', {
            get: function () {
                passiveSupported = true;
            }
        });
        window.addEventListener('test', options, options);
        window.removeEventListener('test', options, options);
    }
    catch (err) {
        passiveSupported = false;
    }
}
// an identifier to tell ZoneTask do not create a new invoke closure
var OPTIMIZED_ZONE_EVENT_TASK_DATA = {
    useG: true
};
var zoneSymbolEventNames$1 = {};
var globalSources = {};
var EVENT_NAME_SYMBOL_REGX = /^__zone_symbol__(\w+)(true|false)$/;
var IMMEDIATE_PROPAGATION_SYMBOL = ('__zone_symbol__propagationStopped');
function patchEventTarget(_global, apis, patchOptions) {
    var ADD_EVENT_LISTENER = (patchOptions && patchOptions.add) || ADD_EVENT_LISTENER_STR;
    var REMOVE_EVENT_LISTENER = (patchOptions && patchOptions.rm) || REMOVE_EVENT_LISTENER_STR;
    var LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.listeners) || 'eventListeners';
    var REMOVE_ALL_LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.rmAll) || 'removeAllListeners';
    var zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
    var ADD_EVENT_LISTENER_SOURCE = '.' + ADD_EVENT_LISTENER + ':';
    var PREPEND_EVENT_LISTENER = 'prependListener';
    var PREPEND_EVENT_LISTENER_SOURCE = '.' + PREPEND_EVENT_LISTENER + ':';
    var invokeTask = function (task, target, event) {
        // for better performance, check isRemoved which is set
        // by removeEventListener
        if (task.isRemoved) {
            return;
        }
        var delegate = task.callback;
        if (typeof delegate === 'object' && delegate.handleEvent) {
            // create the bind version of handleEvent when invoke
            task.callback = function (event) { return delegate.handleEvent(event); };
            task.originalDelegate = delegate;
        }
        // invoke static task.invoke
        task.invoke(task, target, [event]);
        var options = task.options;
        if (options && typeof options === 'object' && options.once) {
            // if options.once is true, after invoke once remove listener here
            // only browser need to do this, nodejs eventEmitter will cal removeListener
            // inside EventEmitter.once
            var delegate_1 = task.originalDelegate ? task.originalDelegate : task.callback;
            target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate_1, options);
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = false
    var globalZoneAwareCallback = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        var target = this || event.target || _global;
        var tasks = target[zoneSymbolEventNames$1[event.type][FALSE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                var copyTasks = tasks.slice();
                for (var i = 0; i < copyTasks.length; i++) {
                    if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                        break;
                    }
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = true
    var globalZoneAwareCaptureCallback = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        var target = this || event.target || _global;
        var tasks = target[zoneSymbolEventNames$1[event.type][TRUE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                var copyTasks = tasks.slice();
                for (var i = 0; i < copyTasks.length; i++) {
                    if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                        break;
                    }
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    function patchEventTargetMethods(obj, patchOptions) {
        if (!obj) {
            return false;
        }
        var useGlobalCallback = true;
        if (patchOptions && patchOptions.useG !== undefined) {
            useGlobalCallback = patchOptions.useG;
        }
        var validateHandler = patchOptions && patchOptions.vh;
        var checkDuplicate = true;
        if (patchOptions && patchOptions.chkDup !== undefined) {
            checkDuplicate = patchOptions.chkDup;
        }
        var returnTarget = false;
        if (patchOptions && patchOptions.rt !== undefined) {
            returnTarget = patchOptions.rt;
        }
        var proto = obj;
        while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
            proto = ObjectGetPrototypeOf(proto);
        }
        if (!proto && obj[ADD_EVENT_LISTENER]) {
            // somehow we did not find it, but we can see it. This happens on IE for Window properties.
            proto = obj;
        }
        if (!proto) {
            return false;
        }
        if (proto[zoneSymbolAddEventListener]) {
            return false;
        }
        var eventNameToString = patchOptions && patchOptions.eventNameToString;
        // a shared global taskData to pass data for scheduleEventTask
        // so we do not need to create a new object just for pass some data
        var taskData = {};
        var nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
        var nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] =
            proto[REMOVE_EVENT_LISTENER];
        var nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] =
            proto[LISTENERS_EVENT_LISTENER];
        var nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] =
            proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
        var nativePrependEventListener;
        if (patchOptions && patchOptions.prepend) {
            nativePrependEventListener = proto[zoneSymbol(patchOptions.prepend)] =
                proto[patchOptions.prepend];
        }
        function checkIsPassive(task) {
            if (!passiveSupported && typeof taskData.options !== 'boolean' &&
                typeof taskData.options !== 'undefined' && taskData.options !== null) {
                // options is a non-null non-undefined object
                // passive is not supported
                // don't pass options as object
                // just pass capture as a boolean
                task.options = !!taskData.options.capture;
                taskData.options = task.options;
            }
        }
        var customScheduleGlobal = function (task) {
            // if there is already a task for the eventName + capture,
            // just return, because we use the shared globalZoneAwareCallback here.
            if (taskData.isExisting) {
                return;
            }
            checkIsPassive(task);
            return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
        };
        var customCancelGlobal = function (task) {
            // if task is not marked as isRemoved, this call is directly
            // from Zone.prototype.cancelTask, we should remove the task
            // from tasksList of target first
            if (!task.isRemoved) {
                var symbolEventNames = zoneSymbolEventNames$1[task.eventName];
                var symbolEventName = void 0;
                if (symbolEventNames) {
                    symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
                }
                var existingTasks = symbolEventName && task.target[symbolEventName];
                if (existingTasks) {
                    for (var i = 0; i < existingTasks.length; i++) {
                        var existingTask = existingTasks[i];
                        if (existingTask === task) {
                            existingTasks.splice(i, 1);
                            // set isRemoved to data for faster invokeTask check
                            task.isRemoved = true;
                            if (existingTasks.length === 0) {
                                // all tasks for the eventName + capture have gone,
                                // remove globalZoneAwareCallback and remove the task cache from target
                                task.allRemoved = true;
                                task.target[symbolEventName] = null;
                            }
                            break;
                        }
                    }
                }
            }
            // if all tasks for the eventName + capture have gone,
            // we will really remove the global event callback,
            // if not, return
            if (!task.allRemoved) {
                return;
            }
            return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
        };
        var customScheduleNonGlobal = function (task) {
            checkIsPassive(task);
            return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        var customSchedulePrepend = function (task) {
            return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        var customCancelNonGlobal = function (task) {
            return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
        };
        var customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
        var customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
        var compareTaskCallbackVsDelegate = function (task, delegate) {
            var typeOfDelegate = typeof delegate;
            return (typeOfDelegate === 'function' && task.callback === delegate) ||
                (typeOfDelegate === 'object' && task.originalDelegate === delegate);
        };
        var compare = (patchOptions && patchOptions.diff) ? patchOptions.diff : compareTaskCallbackVsDelegate;
        var blackListedEvents = Zone[Zone.__symbol__('BLACK_LISTED_EVENTS')];
        var makeAddListener = function (nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget, prepend) {
            if (returnTarget === void 0) { returnTarget = false; }
            if (prepend === void 0) { prepend = false; }
            return function () {
                var target = this || _global;
                var eventName = arguments[0];
                var delegate = arguments[1];
                if (!delegate) {
                    return nativeListener.apply(this, arguments);
                }
                if (isNode && eventName === 'uncaughtException') {
                    // don't patch uncaughtException of nodejs to prevent endless loop
                    return nativeListener.apply(this, arguments);
                }
                // don't create the bind delegate function for handleEvent
                // case here to improve addEventListener performance
                // we will create the bind delegate when invoke
                var isHandleEvent = false;
                if (typeof delegate !== 'function') {
                    if (!delegate.handleEvent) {
                        return nativeListener.apply(this, arguments);
                    }
                    isHandleEvent = true;
                }
                if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
                    return;
                }
                var options = arguments[2];
                if (blackListedEvents) {
                    // check black list
                    for (var i = 0; i < blackListedEvents.length; i++) {
                        if (eventName === blackListedEvents[i]) {
                            return nativeListener.apply(this, arguments);
                        }
                    }
                }
                var capture;
                var once = false;
                if (options === undefined) {
                    capture = false;
                }
                else if (options === true) {
                    capture = true;
                }
                else if (options === false) {
                    capture = false;
                }
                else {
                    capture = options ? !!options.capture : false;
                    once = options ? !!options.once : false;
                }
                var zone = Zone.current;
                var symbolEventNames = zoneSymbolEventNames$1[eventName];
                var symbolEventName;
                if (!symbolEventNames) {
                    // the code is duplicate, but I just want to get some better performance
                    var falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
                    var trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
                    var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
                    var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
                    zoneSymbolEventNames$1[eventName] = {};
                    zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
                    zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
                    symbolEventName = capture ? symbolCapture : symbol;
                }
                else {
                    symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
                }
                var existingTasks = target[symbolEventName];
                var isExisting = false;
                if (existingTasks) {
                    // already have task registered
                    isExisting = true;
                    if (checkDuplicate) {
                        for (var i = 0; i < existingTasks.length; i++) {
                            if (compare(existingTasks[i], delegate)) {
                                // same callback, same capture, same event name, just return
                                return;
                            }
                        }
                    }
                }
                else {
                    existingTasks = target[symbolEventName] = [];
                }
                var source;
                var constructorName = target.constructor['name'];
                var targetSource = globalSources[constructorName];
                if (targetSource) {
                    source = targetSource[eventName];
                }
                if (!source) {
                    source = constructorName + addSource +
                        (eventNameToString ? eventNameToString(eventName) : eventName);
                }
                // do not create a new object as task.data to pass those things
                // just use the global shared one
                taskData.options = options;
                if (once) {
                    // if addEventListener with once options, we don't pass it to
                    // native addEventListener, instead we keep the once setting
                    // and handle ourselves.
                    taskData.options.once = false;
                }
                taskData.target = target;
                taskData.capture = capture;
                taskData.eventName = eventName;
                taskData.isExisting = isExisting;
                var data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : undefined;
                // keep taskData into data to allow onScheduleEventTask to access the task information
                if (data) {
                    data.taskData = taskData;
                }
                var task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
                // should clear taskData.target to avoid memory leak
                // issue, https://github.com/angular/angular/issues/20442
                taskData.target = null;
                // need to clear up taskData because it is a global object
                if (data) {
                    data.taskData = null;
                }
                // have to save those information to task in case
                // application may call task.zone.cancelTask() directly
                if (once) {
                    options.once = true;
                }
                if (!(!passiveSupported && typeof task.options === 'boolean')) {
                    // if not support passive, and we pass an option object
                    // to addEventListener, we should save the options to task
                    task.options = options;
                }
                task.target = target;
                task.capture = capture;
                task.eventName = eventName;
                if (isHandleEvent) {
                    // save original delegate for compare to check duplicate
                    task.originalDelegate = delegate;
                }
                if (!prepend) {
                    existingTasks.push(task);
                }
                else {
                    existingTasks.unshift(task);
                }
                if (returnTarget) {
                    return target;
                }
            };
        };
        proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
        if (nativePrependEventListener) {
            proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
        }
        proto[REMOVE_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            var options = arguments[2];
            var capture;
            if (options === undefined) {
                capture = false;
            }
            else if (options === true) {
                capture = true;
            }
            else if (options === false) {
                capture = false;
            }
            else {
                capture = options ? !!options.capture : false;
            }
            var delegate = arguments[1];
            if (!delegate) {
                return nativeRemoveEventListener.apply(this, arguments);
            }
            if (validateHandler &&
                !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
                return;
            }
            var symbolEventNames = zoneSymbolEventNames$1[eventName];
            var symbolEventName;
            if (symbolEventNames) {
                symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
            }
            var existingTasks = symbolEventName && target[symbolEventName];
            if (existingTasks) {
                for (var i = 0; i < existingTasks.length; i++) {
                    var existingTask = existingTasks[i];
                    if (compare(existingTask, delegate)) {
                        existingTasks.splice(i, 1);
                        // set isRemoved to data for faster invokeTask check
                        existingTask.isRemoved = true;
                        if (existingTasks.length === 0) {
                            // all tasks for the eventName + capture have gone,
                            // remove globalZoneAwareCallback and remove the task cache from target
                            existingTask.allRemoved = true;
                            target[symbolEventName] = null;
                        }
                        existingTask.zone.cancelTask(existingTask);
                        if (returnTarget) {
                            return target;
                        }
                        return;
                    }
                }
            }
            // issue 930, didn't find the event name or callback
            // from zone kept existingTasks, the callback maybe
            // added outside of zone, we need to call native removeEventListener
            // to try to remove it.
            return nativeRemoveEventListener.apply(this, arguments);
        };
        proto[LISTENERS_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            var listeners = [];
            var tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
            for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                listeners.push(delegate);
            }
            return listeners;
        };
        proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            if (!eventName) {
                var keys = Object.keys(target);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                    var evtName = match && match[1];
                    // in nodejs EventEmitter, removeListener event is
                    // used for monitoring the removeListener call,
                    // so just keep removeListener eventListener until
                    // all other eventListeners are removed
                    if (evtName && evtName !== 'removeListener') {
                        this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
                    }
                }
                // remove removeListener listener finally
                this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, 'removeListener');
            }
            else {
                var symbolEventNames = zoneSymbolEventNames$1[eventName];
                if (symbolEventNames) {
                    var symbolEventName = symbolEventNames[FALSE_STR];
                    var symbolCaptureEventName = symbolEventNames[TRUE_STR];
                    var tasks = target[symbolEventName];
                    var captureTasks = target[symbolCaptureEventName];
                    if (tasks) {
                        var removeTasks = tasks.slice();
                        for (var i = 0; i < removeTasks.length; i++) {
                            var task = removeTasks[i];
                            var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                    if (captureTasks) {
                        var removeTasks = captureTasks.slice();
                        for (var i = 0; i < removeTasks.length; i++) {
                            var task = removeTasks[i];
                            var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                }
            }
            if (returnTarget) {
                return this;
            }
        };
        // for native toString patch
        attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
        attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
        if (nativeRemoveAllListeners) {
            attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
        }
        if (nativeListeners) {
            attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
        }
        return true;
    }
    var results = [];
    for (var i = 0; i < apis.length; i++) {
        results[i] = patchEventTargetMethods(apis[i], patchOptions);
    }
    return results;
}
function findEventTasks(target, eventName) {
    var foundTasks = [];
    for (var prop in target) {
        var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
        var evtName = match && match[1];
        if (evtName && (!eventName || evtName === eventName)) {
            var tasks = target[prop];
            if (tasks) {
                for (var i = 0; i < tasks.length; i++) {
                    foundTasks.push(tasks[i]);
                }
            }
        }
    }
    return foundTasks;
}
function patchEventPrototype(global, api) {
    var Event = global['Event'];
    if (Event && Event.prototype) {
        api.patchMethod(Event.prototype, 'stopImmediatePropagation', function (delegate) { return function (self, args) {
            self[IMMEDIATE_PROPAGATION_SYMBOL] = true;
            // we need to call the native stopImmediatePropagation
            // in case in some hybrid application, some part of
            // application will be controlled by zone, some are not
            delegate && delegate.apply(self, args);
        }; });
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
var taskSymbol = zoneSymbol('zoneTask');
function patchTimer(window, setName, cancelName, nameSuffix) {
    var setNative = null;
    var clearNative = null;
    setName += nameSuffix;
    cancelName += nameSuffix;
    var tasksByHandleId = {};
    function scheduleTask(task) {
        var data = task.data;
        function timer() {
            try {
                task.invoke.apply(this, arguments);
            }
            finally {
                // issue-934, task will be cancelled
                // even it is a periodic task such as
                // setInterval
                if (!(task.data && task.data.isPeriodic)) {
                    if (typeof data.handleId === 'number') {
                        // in non-nodejs env, we remove timerId
                        // from local cache
                        delete tasksByHandleId[data.handleId];
                    }
                    else if (data.handleId) {
                        // Node returns complex objects as handleIds
                        // we remove task reference from timer object
                        data.handleId[taskSymbol] = null;
                    }
                }
            }
        }
        data.args[0] = timer;
        data.handleId = setNative.apply(window, data.args);
        return task;
    }
    function clearTask(task) {
        return clearNative(task.data.handleId);
    }
    setNative =
        patchMethod(window, setName, function (delegate) { return function (self, args) {
            if (typeof args[0] === 'function') {
                var options = {
                    isPeriodic: nameSuffix === 'Interval',
                    delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 :
                        undefined,
                    args: args
                };
                var task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
                if (!task) {
                    return task;
                }
                // Node.js must additionally support the ref and unref functions.
                var handle = task.data.handleId;
                if (typeof handle === 'number') {
                    // for non nodejs env, we save handleId: task
                    // mapping in local cache for clearTimeout
                    tasksByHandleId[handle] = task;
                }
                else if (handle) {
                    // for nodejs env, we save task
                    // reference in timerId Object for clearTimeout
                    handle[taskSymbol] = task;
                }
                // check whether handle is null, because some polyfill or browser
                // may return undefined from setTimeout/setInterval/setImmediate/requestAnimationFrame
                if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' &&
                    typeof handle.unref === 'function') {
                    task.ref = handle.ref.bind(handle);
                    task.unref = handle.unref.bind(handle);
                }
                if (typeof handle === 'number' || handle) {
                    return handle;
                }
                return task;
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(window, args);
            }
        }; });
    clearNative =
        patchMethod(window, cancelName, function (delegate) { return function (self, args) {
            var id = args[0];
            var task;
            if (typeof id === 'number') {
                // non nodejs env.
                task = tasksByHandleId[id];
            }
            else {
                // nodejs env.
                task = id && id[taskSymbol];
                // other environments.
                if (!task) {
                    task = id;
                }
            }
            if (task && typeof task.type === 'string') {
                if (task.state !== 'notScheduled' &&
                    (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
                    if (typeof id === 'number') {
                        delete tasksByHandleId[id];
                    }
                    else if (id) {
                        id[taskSymbol] = null;
                    }
                    // Do not cancel already canceled functions
                    task.zone.cancelTask(task);
                }
            }
            else {
                // cause an error by calling it directly.
                delegate.apply(window, args);
            }
        }; });
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/*
 * This is necessary for Chrome and Chrome mobile, to enable
 * things like redefining `createdCallback` on an element.
 */
var _defineProperty = Object[zoneSymbol('defineProperty')] = Object.defineProperty;
var _getOwnPropertyDescriptor = Object[zoneSymbol('getOwnPropertyDescriptor')] =
    Object.getOwnPropertyDescriptor;
var _create = Object.create;
var unconfigurablesKey = zoneSymbol('unconfigurables');
function propertyPatch() {
    Object.defineProperty = function (obj, prop, desc) {
        if (isUnconfigurable(obj, prop)) {
            throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
        }
        var originalConfigurableFlag = desc.configurable;
        if (prop !== 'prototype') {
            desc = rewriteDescriptor(obj, prop, desc);
        }
        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
    };
    Object.defineProperties = function (obj, props) {
        Object.keys(props).forEach(function (prop) {
            Object.defineProperty(obj, prop, props[prop]);
        });
        return obj;
    };
    Object.create = function (obj, proto) {
        if (typeof proto === 'object' && !Object.isFrozen(proto)) {
            Object.keys(proto).forEach(function (prop) {
                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
            });
        }
        return _create(obj, proto);
    };
    Object.getOwnPropertyDescriptor = function (obj, prop) {
        var desc = _getOwnPropertyDescriptor(obj, prop);
        if (desc && isUnconfigurable(obj, prop)) {
            desc.configurable = false;
        }
        return desc;
    };
}
function _redefineProperty(obj, prop, desc) {
    var originalConfigurableFlag = desc.configurable;
    desc = rewriteDescriptor(obj, prop, desc);
    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
}
function isUnconfigurable(obj, prop) {
    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
}
function rewriteDescriptor(obj, prop, desc) {
    // issue-927, if the desc is frozen, don't try to change the desc
    if (!Object.isFrozen(desc)) {
        desc.configurable = true;
    }
    if (!desc.configurable) {
        // issue-927, if the obj is frozen, don't try to set the desc to obj
        if (!obj[unconfigurablesKey] && !Object.isFrozen(obj)) {
            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
        }
        if (obj[unconfigurablesKey]) {
            obj[unconfigurablesKey][prop] = true;
        }
    }
    return desc;
}
function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
    try {
        return _defineProperty(obj, prop, desc);
    }
    catch (error) {
        if (desc.configurable) {
            // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's
            // retry with the original flag value
            if (typeof originalConfigurableFlag == 'undefined') {
                delete desc.configurable;
            }
            else {
                desc.configurable = originalConfigurableFlag;
            }
            try {
                return _defineProperty(obj, prop, desc);
            }
            catch (error) {
                var descJson = null;
                try {
                    descJson = JSON.stringify(desc);
                }
                catch (error) {
                    descJson = desc.toString();
                }
                console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + error);
            }
        }
        else {
            throw error;
        }
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// we have to patch the instance since the proto is non-configurable
function apply(api, _global) {
    var WS = _global.WebSocket;
    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
    // On older Chrome, no need since EventTarget was already patched
    if (!_global.EventTarget) {
        patchEventTarget(_global, [WS.prototype]);
    }
    _global.WebSocket = function (x, y) {
        var socket = arguments.length > 1 ? new WS(x, y) : new WS(x);
        var proxySocket;
        var proxySocketProto;
        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
        var onmessageDesc = ObjectGetOwnPropertyDescriptor(socket, 'onmessage');
        if (onmessageDesc && onmessageDesc.configurable === false) {
            proxySocket = ObjectCreate(socket);
            // socket have own property descriptor 'onopen', 'onmessage', 'onclose', 'onerror'
            // but proxySocket not, so we will keep socket as prototype and pass it to
            // patchOnProperties method
            proxySocketProto = socket;
            [ADD_EVENT_LISTENER_STR, REMOVE_EVENT_LISTENER_STR, 'send', 'close'].forEach(function (propName) {
                proxySocket[propName] = function () {
                    var args = ArraySlice.call(arguments);
                    if (propName === ADD_EVENT_LISTENER_STR || propName === REMOVE_EVENT_LISTENER_STR) {
                        var eventName = args.length > 0 ? args[0] : undefined;
                        if (eventName) {
                            var propertySymbol = Zone.__symbol__('ON_PROPERTY' + eventName);
                            socket[propertySymbol] = proxySocket[propertySymbol];
                        }
                    }
                    return socket[propName].apply(socket, args);
                };
            });
        }
        else {
            // we can patch the real socket
            proxySocket = socket;
        }
        patchOnProperties(proxySocket, ['close', 'error', 'message', 'open'], proxySocketProto);
        return proxySocket;
    };
    var globalWebSocket = _global['WebSocket'];
    for (var prop in WS) {
        globalWebSocket[prop] = WS[prop];
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {globalThis}
 */
var globalEventHandlersEventNames = [
    'abort',
    'animationcancel',
    'animationend',
    'animationiteration',
    'auxclick',
    'beforeinput',
    'blur',
    'cancel',
    'canplay',
    'canplaythrough',
    'change',
    'compositionstart',
    'compositionupdate',
    'compositionend',
    'cuechange',
    'click',
    'close',
    'contextmenu',
    'curechange',
    'dblclick',
    'drag',
    'dragend',
    'dragenter',
    'dragexit',
    'dragleave',
    'dragover',
    'drop',
    'durationchange',
    'emptied',
    'ended',
    'error',
    'focus',
    'focusin',
    'focusout',
    'gotpointercapture',
    'input',
    'invalid',
    'keydown',
    'keypress',
    'keyup',
    'load',
    'loadstart',
    'loadeddata',
    'loadedmetadata',
    'lostpointercapture',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'mousewheel',
    'orientationchange',
    'pause',
    'play',
    'playing',
    'pointercancel',
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointerlockchange',
    'mozpointerlockchange',
    'webkitpointerlockerchange',
    'pointerlockerror',
    'mozpointerlockerror',
    'webkitpointerlockerror',
    'pointermove',
    'pointout',
    'pointerover',
    'pointerup',
    'progress',
    'ratechange',
    'reset',
    'resize',
    'scroll',
    'seeked',
    'seeking',
    'select',
    'selectionchange',
    'selectstart',
    'show',
    'sort',
    'stalled',
    'submit',
    'suspend',
    'timeupdate',
    'volumechange',
    'touchcancel',
    'touchmove',
    'touchstart',
    'touchend',
    'transitioncancel',
    'transitionend',
    'waiting',
    'wheel'
];
var documentEventNames = [
    'afterscriptexecute', 'beforescriptexecute', 'DOMContentLoaded', 'freeze', 'fullscreenchange',
    'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'fullscreenerror',
    'mozfullscreenerror', 'webkitfullscreenerror', 'msfullscreenerror', 'readystatechange',
    'visibilitychange', 'resume'
];
var windowEventNames = [
    'absolutedeviceorientation',
    'afterinput',
    'afterprint',
    'appinstalled',
    'beforeinstallprompt',
    'beforeprint',
    'beforeunload',
    'devicelight',
    'devicemotion',
    'deviceorientation',
    'deviceorientationabsolute',
    'deviceproximity',
    'hashchange',
    'languagechange',
    'message',
    'mozbeforepaint',
    'offline',
    'online',
    'paint',
    'pageshow',
    'pagehide',
    'popstate',
    'rejectionhandled',
    'storage',
    'unhandledrejection',
    'unload',
    'userproximity',
    'vrdisplyconnected',
    'vrdisplaydisconnected',
    'vrdisplaypresentchange'
];
var htmlElementEventNames = [
    'beforecopy', 'beforecut', 'beforepaste', 'copy', 'cut', 'paste', 'dragstart', 'loadend',
    'animationstart', 'search', 'transitionrun', 'transitionstart', 'webkitanimationend',
    'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend'
];
var mediaElementEventNames = ['encrypted', 'waitingforkey', 'msneedkey', 'mozinterruptbegin', 'mozinterruptend'];
var ieElementEventNames = [
    'activate',
    'afterupdate',
    'ariarequest',
    'beforeactivate',
    'beforedeactivate',
    'beforeeditfocus',
    'beforeupdate',
    'cellchange',
    'controlselect',
    'dataavailable',
    'datasetchanged',
    'datasetcomplete',
    'errorupdate',
    'filterchange',
    'layoutcomplete',
    'losecapture',
    'move',
    'moveend',
    'movestart',
    'propertychange',
    'resizeend',
    'resizestart',
    'rowenter',
    'rowexit',
    'rowsdelete',
    'rowsinserted',
    'command',
    'compassneedscalibration',
    'deactivate',
    'help',
    'mscontentzoom',
    'msmanipulationstatechanged',
    'msgesturechange',
    'msgesturedoubletap',
    'msgestureend',
    'msgesturehold',
    'msgesturestart',
    'msgesturetap',
    'msgotpointercapture',
    'msinertiastart',
    'mslostpointercapture',
    'mspointercancel',
    'mspointerdown',
    'mspointerenter',
    'mspointerhover',
    'mspointerleave',
    'mspointermove',
    'mspointerout',
    'mspointerover',
    'mspointerup',
    'pointerout',
    'mssitemodejumplistitemremoved',
    'msthumbnailclick',
    'stop',
    'storagecommit'
];
var webglEventNames = ['webglcontextrestored', 'webglcontextlost', 'webglcontextcreationerror'];
var formEventNames = ['autocomplete', 'autocompleteerror'];
var detailEventNames = ['toggle'];
var frameEventNames = ['load'];
var frameSetEventNames = ['blur', 'error', 'focus', 'load', 'resize', 'scroll', 'messageerror'];
var marqueeEventNames = ['bounce', 'finish', 'start'];
var XMLHttpRequestEventNames = [
    'loadstart', 'progress', 'abort', 'error', 'load', 'progress', 'timeout', 'loadend',
    'readystatechange'
];
var IDBIndexEventNames = ['upgradeneeded', 'complete', 'abort', 'success', 'error', 'blocked', 'versionchange', 'close'];
var websocketEventNames = ['close', 'error', 'open', 'message'];
var workerEventNames = ['error', 'message'];
var eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
function filterProperties(target, onProperties, ignoreProperties) {
    if (!ignoreProperties || ignoreProperties.length === 0) {
        return onProperties;
    }
    var tip = ignoreProperties.filter(function (ip) { return ip.target === target; });
    if (!tip || tip.length === 0) {
        return onProperties;
    }
    var targetIgnoreProperties = tip[0].ignoreProperties;
    return onProperties.filter(function (op) { return targetIgnoreProperties.indexOf(op) === -1; });
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
    // check whether target is available, sometimes target will be undefined
    // because different browser or some 3rd party plugin.
    if (!target) {
        return;
    }
    var filteredProperties = filterProperties(target, onProperties, ignoreProperties);
    patchOnProperties(target, filteredProperties, prototype);
}
function propertyDescriptorPatch(api, _global) {
    if (isNode && !isMix) {
        return;
    }
    var supportsWebSocket = typeof WebSocket !== 'undefined';
    if (canPatchViaPropertyDescriptor()) {
        var ignoreProperties = _global['__Zone_ignore_on_properties'];
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (isBrowser) {
            var internalWindow = window;
            var ignoreErrorProperties = isIE ? [{ target: internalWindow, ignoreProperties: ['error'] }] : [];
            // in IE/Edge, onProp not exist in window object, but in WindowPrototype
            // so we need to pass WindowPrototype to check onProp exist or not
            patchFilteredProperties(internalWindow, eventNames.concat(['messageerror']), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, ObjectGetPrototypeOf(internalWindow));
            patchFilteredProperties(Document.prototype, eventNames, ignoreProperties);
            if (typeof internalWindow['SVGElement'] !== 'undefined') {
                patchFilteredProperties(internalWindow['SVGElement'].prototype, eventNames, ignoreProperties);
            }
            patchFilteredProperties(Element.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLElement.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLMediaElement.prototype, mediaElementEventNames, ignoreProperties);
            patchFilteredProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLFrameElement.prototype, frameEventNames, ignoreProperties);
            patchFilteredProperties(HTMLIFrameElement.prototype, frameEventNames, ignoreProperties);
            var HTMLMarqueeElement_1 = internalWindow['HTMLMarqueeElement'];
            if (HTMLMarqueeElement_1) {
                patchFilteredProperties(HTMLMarqueeElement_1.prototype, marqueeEventNames, ignoreProperties);
            }
            var Worker_1 = internalWindow['Worker'];
            if (Worker_1) {
                patchFilteredProperties(Worker_1.prototype, workerEventNames, ignoreProperties);
            }
        }
        patchFilteredProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames, ignoreProperties);
        var XMLHttpRequestEventTarget_1 = _global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget_1) {
            patchFilteredProperties(XMLHttpRequestEventTarget_1 && XMLHttpRequestEventTarget_1.prototype, XMLHttpRequestEventNames, ignoreProperties);
        }
        if (typeof IDBIndex !== 'undefined') {
            patchFilteredProperties(IDBIndex.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBDatabase.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBTransaction.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBCursor.prototype, IDBIndexEventNames, ignoreProperties);
        }
        if (supportsWebSocket) {
            patchFilteredProperties(WebSocket.prototype, websocketEventNames, ignoreProperties);
        }
    }
    else {
        // Safari, Android browsers (Jelly Bean)
        patchViaCapturingAllTheEvents();
        patchClass('XMLHttpRequest');
        if (supportsWebSocket) {
            apply(api, _global);
        }
    }
}
function canPatchViaPropertyDescriptor() {
    if ((isBrowser || isMix) && !ObjectGetOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') &&
        typeof Element !== 'undefined') {
        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
        // IDL interface attributes are not configurable
        var desc = ObjectGetOwnPropertyDescriptor(Element.prototype, 'onclick');
        if (desc && !desc.configurable)
            return false;
    }
    var ON_READY_STATE_CHANGE = 'onreadystatechange';
    var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
    var xhrDesc = ObjectGetOwnPropertyDescriptor(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE);
    // add enumerable and configurable here because in opera
    // by default XMLHttpRequest.prototype.onreadystatechange is undefined
    // without adding enumerable and configurable will cause onreadystatechange
    // non-configurable
    // and if XMLHttpRequest.prototype.onreadystatechange is undefined,
    // we should set a real desc instead a fake one
    if (xhrDesc) {
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function () {
                return true;
            }
        });
        var req = new XMLHttpRequest();
        var result = !!req.onreadystatechange;
        // restore original desc
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, xhrDesc || {});
        return result;
    }
    else {
        var SYMBOL_FAKE_ONREADYSTATECHANGE_1 = zoneSymbol('fake');
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function () {
                return this[SYMBOL_FAKE_ONREADYSTATECHANGE_1];
            },
            set: function (value) {
                this[SYMBOL_FAKE_ONREADYSTATECHANGE_1] = value;
            }
        });
        var req = new XMLHttpRequest();
        var detectFunc = function () { };
        req.onreadystatechange = detectFunc;
        var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
        req.onreadystatechange = null;
        return result;
    }
}
var unboundKey = zoneSymbol('unbound');
// Whenever any eventListener fires, we check the eventListener target and all parents
// for `onwhatever` properties and replace them with zone-bound functions
// - Chrome (for now)
function patchViaCapturingAllTheEvents() {
    var _loop_1 = function (i) {
        var property = eventNames[i];
        var onproperty = 'on' + property;
        self.addEventListener(property, function (event) {
            var elt = event.target, bound, source;
            if (elt) {
                source = elt.constructor['name'] + '.' + onproperty;
            }
            else {
                source = 'unknown.' + onproperty;
            }
            while (elt) {
                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                    bound = wrapWithCurrentZone(elt[onproperty], source);
                    bound[unboundKey] = elt[onproperty];
                    elt[onproperty] = bound;
                }
                elt = elt.parentElement;
            }
        }, true);
    };
    for (var i = 0; i < eventNames.length; i++) {
        _loop_1(i);
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function eventTargetPatch(_global, api) {
    var WTF_ISSUE_555 = 'Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video';
    var NO_EVENT_TARGET = 'ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex,WebSocket'
        .split(',');
    var EVENT_TARGET = 'EventTarget';
    var apis = [];
    var isWtf = _global['wtf'];
    var WTF_ISSUE_555_ARRAY = WTF_ISSUE_555.split(',');
    if (isWtf) {
        // Workaround for: https://github.com/google/tracing-framework/issues/555
        apis = WTF_ISSUE_555_ARRAY.map(function (v) { return 'HTML' + v + 'Element'; }).concat(NO_EVENT_TARGET);
    }
    else if (_global[EVENT_TARGET]) {
        apis.push(EVENT_TARGET);
    }
    else {
        // Note: EventTarget is not available in all browsers,
        // if it's not available, we instead patch the APIs in the IDL that inherit from EventTarget
        apis = NO_EVENT_TARGET;
    }
    var isDisableIECheck = _global['__Zone_disable_IE_check'] || false;
    var isEnableCrossContextCheck = _global['__Zone_enable_cross_context_check'] || false;
    var ieOrEdge = isIEOrEdge();
    var ADD_EVENT_LISTENER_SOURCE = '.addEventListener:';
    var FUNCTION_WRAPPER = '[object FunctionWrapper]';
    var BROWSER_TOOLS = 'function __BROWSERTOOLS_CONSOLE_SAFEFUNC() { [native code] }';
    //  predefine all __zone_symbol__ + eventName + true/false string
    for (var i = 0; i < eventNames.length; i++) {
        var eventName = eventNames[i];
        var falseEventName = eventName + FALSE_STR;
        var trueEventName = eventName + TRUE_STR;
        var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
        var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
        zoneSymbolEventNames$1[eventName] = {};
        zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
        zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
    }
    //  predefine all task.source string
    for (var i = 0; i < WTF_ISSUE_555.length; i++) {
        var target = WTF_ISSUE_555_ARRAY[i];
        var targets = globalSources[target] = {};
        for (var j = 0; j < eventNames.length; j++) {
            var eventName = eventNames[j];
            targets[eventName] = target + ADD_EVENT_LISTENER_SOURCE + eventName;
        }
    }
    var checkIEAndCrossContext = function (nativeDelegate, delegate, target, args) {
        if (!isDisableIECheck && ieOrEdge) {
            if (isEnableCrossContextCheck) {
                try {
                    var testString = delegate.toString();
                    if ((testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS)) {
                        nativeDelegate.apply(target, args);
                        return false;
                    }
                }
                catch (error) {
                    nativeDelegate.apply(target, args);
                    return false;
                }
            }
            else {
                var testString = delegate.toString();
                if ((testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS)) {
                    nativeDelegate.apply(target, args);
                    return false;
                }
            }
        }
        else if (isEnableCrossContextCheck) {
            try {
                delegate.toString();
            }
            catch (error) {
                nativeDelegate.apply(target, args);
                return false;
            }
        }
        return true;
    };
    var apiTypes = [];
    for (var i = 0; i < apis.length; i++) {
        var type = _global[apis[i]];
        apiTypes.push(type && type.prototype);
    }
    // vh is validateHandler to check event handler
    // is valid or not(for security check)
    patchEventTarget(_global, apiTypes, { vh: checkIEAndCrossContext });
    api.patchEventTarget = patchEventTarget;
    return true;
}
function patchEvent(global, api) {
    patchEventPrototype(global, api);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function patchCallbacks(target, targetName, method, callbacks) {
    var symbol = Zone.__symbol__(method);
    if (target[symbol]) {
        return;
    }
    var nativeDelegate = target[symbol] = target[method];
    target[method] = function (name, opts, options) {
        if (opts && opts.prototype) {
            callbacks.forEach(function (callback) {
                var source = targetName + "." + method + "::" + callback;
                var prototype = opts.prototype;
                if (prototype.hasOwnProperty(callback)) {
                    var descriptor = ObjectGetOwnPropertyDescriptor(prototype, callback);
                    if (descriptor && descriptor.value) {
                        descriptor.value = wrapWithCurrentZone(descriptor.value, source);
                        _redefineProperty(opts.prototype, callback, descriptor);
                    }
                    else if (prototype[callback]) {
                        prototype[callback] = wrapWithCurrentZone(prototype[callback], source);
                    }
                }
                else if (prototype[callback]) {
                    prototype[callback] = wrapWithCurrentZone(prototype[callback], source);
                }
            });
        }
        return nativeDelegate.call(target, name, opts, options);
    };
    attachOriginToPatched(target[method], nativeDelegate);
}
function registerElementPatch(_global) {
    if ((!isBrowser && !isMix) || !('registerElement' in _global.document)) {
        return;
    }
    var callbacks = ['createdCallback', 'attachedCallback', 'detachedCallback', 'attributeChangedCallback'];
    patchCallbacks(document, 'Document', 'registerElement', callbacks);
}
function patchCustomElements(_global) {
    if ((!isBrowser && !isMix) || !('customElements' in _global)) {
        return;
    }
    var callbacks = ['connectedCallback', 'disconnectedCallback', 'adoptedCallback', 'attributeChangedCallback'];
    patchCallbacks(_global.customElements, 'customElements', 'define', callbacks);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
Zone.__load_patch('util', function (global, Zone, api) {
    api.patchOnProperties = patchOnProperties;
    api.patchMethod = patchMethod;
    api.bindArguments = bindArguments;
});
Zone.__load_patch('timers', function (global) {
    var set = 'set';
    var clear = 'clear';
    patchTimer(global, set, clear, 'Timeout');
    patchTimer(global, set, clear, 'Interval');
    patchTimer(global, set, clear, 'Immediate');
});
Zone.__load_patch('requestAnimationFrame', function (global) {
    patchTimer(global, 'request', 'cancel', 'AnimationFrame');
    patchTimer(global, 'mozRequest', 'mozCancel', 'AnimationFrame');
    patchTimer(global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
});
Zone.__load_patch('blocking', function (global, Zone) {
    var blockingMethods = ['alert', 'prompt', 'confirm'];
    for (var i = 0; i < blockingMethods.length; i++) {
        var name_1 = blockingMethods[i];
        patchMethod(global, name_1, function (delegate, symbol, name) {
            return function (s, args) {
                return Zone.current.run(delegate, global, args, name);
            };
        });
    }
});
Zone.__load_patch('EventTarget', function (global, Zone, api) {
    // load blackListEvents from global
    var SYMBOL_BLACK_LISTED_EVENTS = Zone.__symbol__('BLACK_LISTED_EVENTS');
    if (global[SYMBOL_BLACK_LISTED_EVENTS]) {
        Zone[SYMBOL_BLACK_LISTED_EVENTS] = global[SYMBOL_BLACK_LISTED_EVENTS];
    }
    patchEvent(global, api);
    eventTargetPatch(global, api);
    // patch XMLHttpRequestEventTarget's addEventListener/removeEventListener
    var XMLHttpRequestEventTarget = global['XMLHttpRequestEventTarget'];
    if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
        api.patchEventTarget(global, [XMLHttpRequestEventTarget.prototype]);
    }
    patchClass('MutationObserver');
    patchClass('WebKitMutationObserver');
    patchClass('IntersectionObserver');
    patchClass('FileReader');
});
Zone.__load_patch('on_property', function (global, Zone, api) {
    propertyDescriptorPatch(api, global);
    propertyPatch();
});
Zone.__load_patch('customElements', function (global, Zone, api) {
    registerElementPatch(global);
    patchCustomElements(global);
});
Zone.__load_patch('canvas', function (global) {
    var HTMLCanvasElement = global['HTMLCanvasElement'];
    if (typeof HTMLCanvasElement !== 'undefined' && HTMLCanvasElement.prototype &&
        HTMLCanvasElement.prototype.toBlob) {
        patchMacroTask(HTMLCanvasElement.prototype, 'toBlob', function (self, args) {
            return { name: 'HTMLCanvasElement.toBlob', target: self, cbIdx: 0, args: args };
        });
    }
});
Zone.__load_patch('XHR', function (global, Zone) {
    // Treat XMLHttpRequest as a macrotask.
    patchXHR(global);
    var XHR_TASK = zoneSymbol('xhrTask');
    var XHR_SYNC = zoneSymbol('xhrSync');
    var XHR_LISTENER = zoneSymbol('xhrListener');
    var XHR_SCHEDULED = zoneSymbol('xhrScheduled');
    var XHR_URL = zoneSymbol('xhrURL');
    var XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol('xhrErrorBeforeScheduled');
    function patchXHR(window) {
        var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
        function findPendingTask(target) {
            return target[XHR_TASK];
        }
        var oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
        var oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        if (!oriAddListener) {
            var XMLHttpRequestEventTarget_1 = window['XMLHttpRequestEventTarget'];
            if (XMLHttpRequestEventTarget_1) {
                var XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget_1.prototype;
                oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
        }
        var READY_STATE_CHANGE = 'readystatechange';
        var SCHEDULED = 'scheduled';
        function scheduleTask(task) {
            var data = task.data;
            var target = data.target;
            target[XHR_SCHEDULED] = false;
            target[XHR_ERROR_BEFORE_SCHEDULED] = false;
            // remove existing event listener
            var listener = target[XHR_LISTENER];
            if (!oriAddListener) {
                oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
            if (listener) {
                oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
            }
            var newListener = target[XHR_LISTENER] = function () {
                if (target.readyState === target.DONE) {
                    // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                    // readyState=4 multiple times, so we need to check task state here
                    if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
                        // check whether the xhr has registered onload listener
                        // if that is the case, the task should invoke after all
                        // onload listeners finish.
                        var loadTasks = target['__zone_symbol__loadfalse'];
                        if (loadTasks && loadTasks.length > 0) {
                            var oriInvoke_1 = task.invoke;
                            task.invoke = function () {
                                // need to load the tasks again, because in other
                                // load listener, they may remove themselves
                                var loadTasks = target['__zone_symbol__loadfalse'];
                                for (var i = 0; i < loadTasks.length; i++) {
                                    if (loadTasks[i] === task) {
                                        loadTasks.splice(i, 1);
                                    }
                                }
                                if (!data.aborted && task.state === SCHEDULED) {
                                    oriInvoke_1.call(task);
                                }
                            };
                            loadTasks.push(task);
                        }
                        else {
                            task.invoke();
                        }
                    }
                    else if (!data.aborted && target[XHR_SCHEDULED] === false) {
                        // error occurs when xhr.send()
                        target[XHR_ERROR_BEFORE_SCHEDULED] = true;
                    }
                }
            };
            oriAddListener.call(target, READY_STATE_CHANGE, newListener);
            var storedTask = target[XHR_TASK];
            if (!storedTask) {
                target[XHR_TASK] = task;
            }
            sendNative.apply(target, data.args);
            target[XHR_SCHEDULED] = true;
            return task;
        }
        function placeholderCallback() { }
        function clearTask(task) {
            var data = task.data;
            // Note - ideally, we would call data.target.removeEventListener here, but it's too late
            // to prevent it from firing. So instead, we store info for the event listener.
            data.aborted = true;
            return abortNative.apply(data.target, data.args);
        }
        var openNative = patchMethod(XMLHttpRequestPrototype, 'open', function () { return function (self, args) {
            self[XHR_SYNC] = args[2] == false;
            self[XHR_URL] = args[1];
            return openNative.apply(self, args);
        }; });
        var XMLHTTPREQUEST_SOURCE = 'XMLHttpRequest.send';
        var fetchTaskAborting = zoneSymbol('fetchTaskAborting');
        var fetchTaskScheduling = zoneSymbol('fetchTaskScheduling');
        var sendNative = patchMethod(XMLHttpRequestPrototype, 'send', function () { return function (self, args) {
            if (Zone.current[fetchTaskScheduling] === true) {
                // a fetch is scheduling, so we are using xhr to polyfill fetch
                // and because we already schedule macroTask for fetch, we should
                // not schedule a macroTask for xhr again
                return sendNative.apply(self, args);
            }
            if (self[XHR_SYNC]) {
                // if the XHR is sync there is no task to schedule, just execute the code.
                return sendNative.apply(self, args);
            }
            else {
                var options = { target: self, url: self[XHR_URL], isPeriodic: false, args: args, aborted: false };
                var task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
                if (self && self[XHR_ERROR_BEFORE_SCHEDULED] === true && !options.aborted &&
                    task.state === SCHEDULED) {
                    // xhr request throw error when send
                    // we should invoke task instead of leaving a scheduled
                    // pending macroTask
                    task.invoke();
                }
            }
        }; });
        var abortNative = patchMethod(XMLHttpRequestPrototype, 'abort', function () { return function (self, args) {
            var task = findPendingTask(self);
            if (task && typeof task.type == 'string') {
                // If the XHR has already completed, do nothing.
                // If the XHR has already been aborted, do nothing.
                // Fix #569, call abort multiple times before done will cause
                // macroTask task count be negative number
                if (task.cancelFn == null || (task.data && task.data.aborted)) {
                    return;
                }
                task.zone.cancelTask(task);
            }
            else if (Zone.current[fetchTaskAborting] === true) {
                // the abort is called from fetch polyfill, we need to call native abort of XHR.
                return abortNative.apply(self, args);
            }
            // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no
            // task
            // to cancel. Do nothing.
        }; });
    }
});
Zone.__load_patch('geolocation', function (global) {
    /// GEO_LOCATION
    if (global['navigator'] && global['navigator'].geolocation) {
        patchPrototype(global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
    }
});
Zone.__load_patch('PromiseRejectionEvent', function (global, Zone) {
    // handle unhandled promise rejection
    function findPromiseRejectionHandler(evtName) {
        return function (e) {
            var eventTasks = findEventTasks(global, evtName);
            eventTasks.forEach(function (eventTask) {
                // windows has added unhandledrejection event listener
                // trigger the event listener
                var PromiseRejectionEvent = global['PromiseRejectionEvent'];
                if (PromiseRejectionEvent) {
                    var evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                    eventTask.invoke(evt);
                }
            });
        };
    }
    if (global['PromiseRejectionEvent']) {
        Zone[zoneSymbol('unhandledPromiseRejectionHandler')] =
            findPromiseRejectionHandler('unhandledrejection');
        Zone[zoneSymbol('rejectionHandledHandler')] =
            findPromiseRejectionHandler('rejectionhandled');
    }
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

})));


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _guards_permission_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./guards/permission.guard */ "./src/app/guards/permission.guard.ts");
/* harmony import */ var _modules_dashbord_dashbord_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/dashbord/dashbord.module */ "./src/app/modules/dashbord/dashbord.module.ts");
/* harmony import */ var _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/auth/auth.module */ "./src/app/modules/auth/auth.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', loadChildren: function () { return _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_4__["AuthModule"]; } },
    {
        path: 'dashbord', loadChildren: function () { return _modules_dashbord_dashbord_module__WEBPACK_IMPORTED_MODULE_3__["DashbordModule"]; }, canActivate: [_guards_permission_guard__WEBPACK_IMPORTED_MODULE_2__["PermissionGuard"]]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { enableTracing: true, onSameUrlNavigation: 'reload', preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_1__["PreloadAllModules"] })],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-page\">\n\n  <header class=\"header\">\n    <router-outlet name=\"headerOutlet\"></router-outlet>\n  </header>\n\n  <!-- Main conten -->\n  <div class=\"main\">\n    <div [hidden]=\"isAuthtorised()\">\n      <router-outlet></router-outlet>\n    </div>\n    <mat-sidenav-container class=\"main-full-page\" [hidden]=\"!isAuthtorised()\">\n      <mat-sidenav #sidenav [mode]=\"'push'\" class=\"example-sidenav\">\n        <app-tree-flat-overview></app-tree-flat-overview>\n      </mat-sidenav>\n      <mat-sidenav-content>\n        <div class=\"content\">\n          <router-outlet></router-outlet>\n        </div>\n      </mat-sidenav-content>\n    </mat-sidenav-container>\n\n  </div>\n  <!-- Footer -->\n  <footer class=\"page-footer font-small special-color-dark pt-4\">\n\n    <!-- Footer Elements -->\n    <div class=\"container\">\n\n    </div>\n    <!-- Footer Elements -->\n\n    <!-- Copyright -->\n    <div class=\"footer-copyright text-center py-3\">\n      © 2019 Copyright: Ivanov Romam\n    </div>\n    <!-- Copyright -->\n\n  </footer>\n</div>"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  height: 85%; }\n\n.header,\n.footer {\n  height: 7.5%; }\n\n.experimental {\n  width: 100%;\n  height: 100%; }\n\n.mat-sidenav {\n  min-width: 300px; }\n\n.form {\n  display: flex; }\n\n.form,\n.content {\n  width: 100%;\n  height: 100%; }\n\n.content > * {\n  display: inherit; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JvbWFuL3JlcG9zaXRvcnkvZnJvbnRlbmQvc291cmNlcy9zcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVcsRUFDWjs7QUFFRDs7RUFFRSxhQUFZLEVBQ2I7O0FBRUQ7RUFDRSxZQUFXO0VBQ1gsYUFBWSxFQUNiOztBQUVEO0VBQ0UsaUJBQWdCLEVBQ2pCOztBQUVEO0VBQ0UsY0FBYSxFQUNkOztBQUVEOztFQUVFLFlBQVc7RUFDWCxhQUFZLEVBQ2I7O0FBRUQ7RUFDRSxpQkFBZ0IsRUFDakIiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbiB7XG4gIGhlaWdodDogODUlO1xufVxuXG4uaGVhZGVyLFxuLmZvb3RlciB7XG4gIGhlaWdodDogNy41JTtcbn1cblxuLmV4cGVyaW1lbnRhbCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5tYXQtc2lkZW5hdiB7XG4gIG1pbi13aWR0aDogMzAwcHg7XG59XG5cbi5mb3JtIHtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLmZvcm0sXG4uY29udGVudCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5jb250ZW50ID4gKiB7XG4gIGRpc3BsYXk6IGluaGVyaXQ7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _services_main_side_nav_service_main_side_nav_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/main-side-nav-service/main-side-nav.service */ "./src/app/services/main-side-nav-service/main-side-nav.service.ts");
/* harmony import */ var _classes_accountEntity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./classes/accountEntity */ "./src/app/classes/accountEntity.ts");
/* harmony import */ var _services_app_account_context_service_app_account_context_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/app-account-context-service/app-account-context.service */ "./src/app/services/app-account-context-service/app-account-context.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = /** @class */ (function () {
    function AppComponent(sideNavService, appAccountContextService) {
        this.sideNavService = sideNavService;
        this.appAccountContextService = appAccountContextService;
        this.account = new _classes_accountEntity__WEBPACK_IMPORTED_MODULE_3__["AccountEntity"]();
    }
    AppComponent.prototype.ngOnInit = function () {
        this.account = this.appAccountContextService.getAccount();
        console.log('account initialized', this.account);
        this.sideNavService.setDriwer(this.drawer);
    };
    AppComponent.prototype.isAuthtorised = function () {
        return this.account && this.account.$authtorised || false;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenav"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenav"])
    ], AppComponent.prototype, "drawer", void 0);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_main_side_nav_service_main_side_nav_service__WEBPACK_IMPORTED_MODULE_2__["MainSideNavService"],
            _services_app_account_context_service_app_account_context_service__WEBPACK_IMPORTED_MODULE_4__["AppAccountContextService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../polyfills */ "./src/polyfills.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _components_tree_flat_overview_tree_flat_overview_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/tree-flat-overview/tree-flat-overview.component */ "./src/app/components/tree-flat-overview/tree-flat-overview.component.ts");
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ag-grid-angular */ "./node_modules/ag-grid-angular/main.js");
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(ag_grid_angular__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/esm5/stepper.es5.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var modules = [
    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["BrowserModule"],
    _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"],
    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__["BrowserAnimationsModule"],
    _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"],
    _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["BrowserModule"],
    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__["BrowserAnimationsModule"],
    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
    _angular_http__WEBPACK_IMPORTED_MODULE_1__["HttpModule"],
    _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatNativeDateModule"],
    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
    // Material
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatAutocompleteModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatButtonToggleModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatCardModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatCheckboxModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatChipsModule"],
    _angular_material_stepper__WEBPACK_IMPORTED_MODULE_13__["MatStepperModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatDatepickerModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatDialogModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatDividerModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatExpansionModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatGridListModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatIconModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatInputModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatListModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatMenuModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatNativeDateModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatPaginatorModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatProgressBarModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatProgressSpinnerModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatRadioModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatRippleModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatSelectModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatSidenavModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatSliderModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatSlideToggleModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatSnackBarModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatSortModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatTableModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatTabsModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatToolbarModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatTooltipModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatTreeModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatCheckboxModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatBadgeModule"]
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_6__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"],
                _components_tree_flat_overview_tree_flat_overview_component__WEBPACK_IMPORTED_MODULE_11__["TreeFlatOverviewComponent"]
            ],
            imports: modules,
            exports: [modules],
            providers: [ag_grid_angular__WEBPACK_IMPORTED_MODULE_12__["AgGridModule"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());

// tslint:disable-next-line:eofline
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_14__["platformBrowserDynamic"])().bootstrapModule(AppModule);


/***/ }),

/***/ "./src/app/classes/accountEntity.ts":
/*!******************************************!*\
  !*** ./src/app/classes/accountEntity.ts ***!
  \******************************************/
/*! exports provided: AccountEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountEntity", function() { return AccountEntity; });
/**
 * Класс - описывающий данные учетной записи
 */
var AccountEntity = /** @class */ (function () {
    function AccountEntity(obj) {
        this.id = null;
        this.uuid = null;
        this.login = '';
        this.password = '';
        this.authtorised = false;
        this.nickName = '';
        if (obj) {
            this.id = obj && obj.id;
            this.login = obj && obj.login;
            this.password = obj && obj.password;
            this.authtorised = obj && obj.authtorised;
            this.nickName = obj && obj.nickName;
            this.uuid = obj && obj.uuid;
        }
    }
    Object.defineProperty(AccountEntity.prototype, "$uuid", {
        /**
         * Getter $uuid
         * @return {string }
         */
        get: function () {
            return this.uuid;
        },
        /**
         * Setter $uuid
         * @param {string } value
         */
        set: function (value) {
            this.uuid = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountEntity.prototype, "$id", {
        /**
         * Getter $id
         * @return {number }
         */
        get: function () {
            return this.id;
        },
        /**
         * Setter $id
         * @param {number } value
         */
        set: function (value) {
            this.id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountEntity.prototype, "$login", {
        /**
         * Getter $login
         * @return {string }
         */
        get: function () {
            return this.login;
        },
        /**
         * Setter $login
         * @param {string } value
         */
        set: function (value) {
            this.login = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountEntity.prototype, "$password", {
        /**
         * Getter $password
         * @return {string }
         */
        get: function () {
            return this.password;
        },
        /**
         * Setter $password
         * @param {string } value
         */
        set: function (value) {
            this.password = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountEntity.prototype, "$authtorised", {
        /**
         * Getter $isAuthtorise
         * @return {boolean }
         */
        get: function () {
            return this.authtorised;
        },
        /**
         * Setter $isAuthtorise
         * @param {boolean } value
         */
        set: function (value) {
            this.authtorised = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountEntity.prototype, "$nickName", {
        /**
         * Getter $nickName
         * @return {string }
         */
        get: function () {
            return this.nickName;
        },
        /**
         * Setter $nickName
         * @param {string } value
         */
        set: function (value) {
            this.nickName = value;
        },
        enumerable: true,
        configurable: true
    });
    return AccountEntity;
}());



/***/ }),

/***/ "./src/app/classes/adress.ts":
/*!***********************************!*\
  !*** ./src/app/classes/adress.ts ***!
  \***********************************/
/*! exports provided: Adress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Adress", function() { return Adress; });
/**
 * Класс для хранения структуры информации о адресе
 */
var Adress = /** @class */ (function () {
    function Adress() {
    }
    Object.defineProperty(Adress.prototype, "$token", {
        /**
         * Getter $token
         * @return {string}
         */
        get: function () {
            return this.token;
        },
        /**
         * Setter $token
         * @param {string} value
         */
        set: function (value) {
            this.token = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Adress.prototype, "$regionId", {
        /**
         * Getter $regionId
         * @return {string}
         */
        get: function () {
            return this.regionId;
        },
        /**
         * Setter $regionId
         * @param {string} value
         */
        set: function (value) {
            this.regionId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Adress.prototype, "$districtId", {
        /**
         * Getter $districtId
         * @return {string}
         */
        get: function () {
            return this.districtId;
        },
        /**
         * Setter $districtId
         * @param {string} value
         */
        set: function (value) {
            this.districtId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Adress.prototype, "$cityId", {
        /**
         * Getter $cityId
         * @return {string}
         */
        get: function () {
            return this.cityId;
        },
        /**
         * Setter $cityId
         * @param {string} value
         */
        set: function (value) {
            this.cityId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Adress.prototype, "$streetId", {
        /**
         * Getter $streetId
         * @return {string}
         */
        get: function () {
            return this.streetId;
        },
        /**
         * Setter $streetId
         * @param {string} value
         */
        set: function (value) {
            this.streetId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Adress.prototype, "$buildingId", {
        /**
         * Getter $buildingId
         * @return {string}
         */
        get: function () {
            return this.buildingId;
        },
        /**
         * Setter $buildingId
         * @param {string} value
         */
        set: function (value) {
            this.buildingId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Adress.prototype, "$query", {
        /**
         * Getter $query
         * @return {string}
         */
        get: function () {
            return this.query;
        },
        /**
         * Setter $query
         * @param {string} value
         */
        set: function (value) {
            this.query = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Adress.prototype, "$contentType", {
        /**
         * Getter $contentType
         * @return {string}
         */
        get: function () {
            return this.contentType;
        },
        /**
         * Setter $contentType
         * @param {string} value
         */
        set: function (value) {
            this.contentType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Adress.prototype, "$withParent", {
        /**
         * Getter $withParent
         * @return {number}
         */
        get: function () {
            return this.withParent;
        },
        /**
         * Setter $withParent
         * @param {number} value
         */
        set: function (value) {
            this.withParent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Adress.prototype, "$limit", {
        /**
         * Getter $limit
         * @return {string}
         */
        get: function () {
            return this.limit;
        },
        /**
         * Setter $limit
         * @param {string} value
         */
        set: function (value) {
            this.limit = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Adress.prototype, "$offset", {
        /**
         * Getter $offset
         * @return {string}
         */
        get: function () {
            return this.offset;
        },
        /**
         * Setter $offset
         * @param {string} value
         */
        set: function (value) {
            this.offset = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Adress.prototype, "$typeCode", {
        /**
         * Getter $typeCode
         * @return {number}
         */
        get: function () {
            return this.typeCode;
        },
        /**
         * Setter $typeCode
         * @param {number} value
         */
        set: function (value) {
            this.typeCode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Adress.prototype, "$zip", {
        /**
         * Getter $zip
         * @return {string}
         */
        get: function () {
            return this.zip;
        },
        /**
         * Setter $zip
         * @param {string} value
         */
        set: function (value) {
            this.zip = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Adress.prototype, "$callback", {
        /**
         * Getter $callback
         * @return {Function}
         */
        get: function () {
            return this.callback;
        },
        /**
         * Setter $callback
         * @param {Function} value
         */
        set: function (value) {
            this.callback = value;
        },
        enumerable: true,
        configurable: true
    });
    return Adress;
}());



/***/ }),

/***/ "./src/app/classes/menu-flat-node.ts":
/*!*******************************************!*\
  !*** ./src/app/classes/menu-flat-node.ts ***!
  \*******************************************/
/*! exports provided: MenuFlatNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuFlatNode", function() { return MenuFlatNode; });
/** Flat node with expandable and level information */
var MenuFlatNode = /** @class */ (function () {
    function MenuFlatNode(expandable, name, level, pathOfDash, image) {
        this.expandable = expandable;
        this.name = name;
        this.level = level;
        this.pathOfDash = pathOfDash;
        this.image = image;
    }
    return MenuFlatNode;
}());



/***/ }),

/***/ "./src/app/classes/menu-node.ts":
/*!**************************************!*\
  !*** ./src/app/classes/menu-node.ts ***!
  \**************************************/
/*! exports provided: MenuNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuNode", function() { return MenuNode; });
/**
 * Menu node data with nested structure.
 * Each node has a Menuname, and a type or a list of children.
 */
var MenuNode = /** @class */ (function () {
    function MenuNode() {
        this.children = [];
    }
    Object.defineProperty(MenuNode.prototype, "$children", {
        /**
         * Getter $children
         * @return {MenuNode[]}
         */
        get: function () {
            return this.children;
        },
        /**
         * Setter $children
         * @param {MenuNode[]} value
         */
        set: function (value) {
            this.children = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuNode.prototype, "$name", {
        /**
         * Getter $name
         * @return {string}
         */
        get: function () {
            return this.name;
        },
        /**
         * Setter $name
         * @param {string} value
         */
        set: function (value) {
            this.name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuNode.prototype, "$sysName", {
        /**
         * Getter $sysName
         * @return {string}
         */
        get: function () {
            return this.sysName;
        },
        /**
         * Setter $sysName
         * @param {string} value
         */
        set: function (value) {
            this.sysName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuNode.prototype, "$pathOfDash", {
        /**
         * Getter $pathOfDash
         * @return {string}
         */
        get: function () {
            return this.pathOfDash;
        },
        /**
         * Setter $pathOfDash
         * @param {string} value
         */
        set: function (value) {
            this.pathOfDash = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuNode.prototype, "$type", {
        /**
         * Getter $type
         * @return {any}
         */
        get: function () {
            return this.type;
        },
        /**
         * Setter $type
         * @param {any} value
         */
        set: function (value) {
            this.type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuNode.prototype, "$que", {
        /**
         * Getter $que
         * @return {string}
         */
        get: function () {
            return this.que;
        },
        /**
         * Setter $que
         * @param {string} value
         */
        set: function (value) {
            this.que = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuNode.prototype, "$image", {
        /**
         * Getter $image
         * @return {string}
         */
        get: function () {
            return this.image;
        },
        /**
         * Setter $image
         * @param {string} value
         */
        set: function (value) {
            this.image = value;
        },
        enumerable: true,
        configurable: true
    });
    return MenuNode;
}());



/***/ }),

/***/ "./src/app/components/adress-kladr/adress-kladr.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/components/adress-kladr/adress-kladr.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"addressGroup\" class=\"form-step\">\n  <mat-form-field class=\"example-full-width\">\n    <input matInput formControlName=\"cityId\" placeholder=\"Город, нас. пункт\" name=\"cityId\" required>\n  </mat-form-field>\n  <mat-form-field class=\"example-full-width\">\n    <input matInput formControlName=\"streetId\" placeholder=\"Улица\" name=\"streetId\" required>\n  </mat-form-field>\n  <!--\n      <mat-form-field class=\"example-full-width\">\n        <input matInput formControlName=\"house\" placeholder=\"Дом\" [(ngModel)]=\"adress.house\" name=\"house\"\n          required>\n      </mat-form-field>-->\n  <mat-form-field class=\"example-full-width\">\n    <input matInput formControlName=\"buildingId\" placeholder=\"Корпус\" name=\"buildingId\" required>\n  </mat-form-field>\n  <!--\n      <mat-form-field class=\"example-full-width\">\n        <input matInput formControlName=\"password\" placeholder=\"Квартира\" [(ngModel)]=\"adress\" type=\"password\" name=\"password\"\n          required>\n      </mat-form-field>\n      <mat-form-field class=\"example-full-width\">\n        <input matInput formControlName=\"password\" placeholder=\"Почтовый индекс\" [(ngModel)]=\"adress\" type=\"password\"\n          name=\"password\" required>\n      </mat-form-field>-->\n</form>"

/***/ }),

/***/ "./src/app/components/adress-kladr/adress-kladr.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/components/adress-kladr/adress-kladr.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvYWRyZXNzLWtsYWRyL2FkcmVzcy1rbGFkci5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/components/adress-kladr/adress-kladr.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/adress-kladr/adress-kladr.component.ts ***!
  \*******************************************************************/
/*! exports provided: AdressKladrComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdressKladrComponent", function() { return AdressKladrComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _classes_adress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../classes/adress */ "./src/app/classes/adress.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Компонент работы с kladr.
 *
 *   Описание параметров описанны ниже (взято в с ресурса http://kladr-api.ru/integration):
 *
 *  1) token — (необязательно) Токен для доступа к сервису. Используется только для доступа к платным серверам
 *  2) regionId — Код региона (области)
 *  3) districtId — Код района
 *  4) cityId — Код города (населённого пункта)
 *  5) streetId — Код улицы
 *  6) buildingId — Код дома (строения)
 *  7) query — Строка для поиска по названию
 *  8) contentType — Тип возвращаемых объектов (region, district, city, street, building)
 *  9) withParent — Если 1, сервис вернёт объекты вместе с родительскими (для района это регион, для населённого пункта район и регион и т.п.)
 *  10) limit — Количество возвращаемых объектов
 *  11) offset — Смещение в выдаче (для организации постраничного вывода)
 *  12) typeCode — Тип объектов для выдачи:
 *    1 — города
 *    2 — поселки
 *    4 — деревни
 *
 *    Битовые комбинации, например, 3 ( 1 | 2 ) — города и поселки
 *  13) zip — Почтовый индекс. Работает только при contentType = building. В этом случае можно не передать parentId. Поиск по почтовому индексу — это поиск по строениям (building), поэтому логично указать withParent = 1 и limit = 1, чтоб выбрать данные о регионе, нас. пункте и т.п.
 *    Например: http://kladr-api.ru/api.php?contentType=building&limit=1&withParent=1&zip=163000
 *    oneString — Поиск адреса одной строкой в свободной форме. С этим параметром используются:
 *  14) query — строка поиска
 *  15) withParent=1 — выводить сведения о родителях
 *  16) limit — кол-во результатов в выдаче
 *  17) regionId, districtId, cityId — фильтры для ограничения поиск
 *    Например: http://kladr-api.ru/api.php?query=%D0%BC%D0%BE%D1%81%D0%BA%D0%B2%D0%B0&oneString=1&limit=1&withParent=1
 *  18) callback – JavaScript метод которому будет передан ответ базы
 *
 *  */
var AdressKladrComponent = /** @class */ (function () {
    function AdressKladrComponent(formBuildfer) {
        this.formBuildfer = formBuildfer;
        this.adress = new _classes_adress__WEBPACK_IMPORTED_MODULE_1__["Adress"]();
        this.addressGroup = this.formBuildfer.group({
            buildingId: [],
            streetId: [],
            cityId: []
        });
    }
    AdressKladrComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
        __metadata("design:type", _classes_adress__WEBPACK_IMPORTED_MODULE_1__["Adress"])
    ], AdressKladrComponent.prototype, "adress", void 0);
    AdressKladrComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-adress-kladr',
            template: __webpack_require__(/*! ./adress-kladr.component.html */ "./src/app/components/adress-kladr/adress-kladr.component.html"),
            styles: [__webpack_require__(/*! ./adress-kladr.component.scss */ "./src/app/components/adress-kladr/adress-kladr.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormBuilder"]])
    ], AdressKladrComponent);
    return AdressKladrComponent;
}());



/***/ }),

/***/ "./src/app/components/journal/journal.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/journal/journal.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ag-grid-angular \n  class=\"journal ag-theme-balham\"\n  [rowData]=\"rowData | async\" \n  [columnDefs]=\"columnDefs\">\n</ag-grid-angular>"

/***/ }),

/***/ "./src/app/components/journal/journal.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/components/journal/journal.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".journal {\n  max-height: 500px;\n  max-width: 500px;\n  width: 100%;\n  height: 100%;\n  display: grid; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JvbWFuL3JlcG9zaXRvcnkvZnJvbnRlbmQvc291cmNlcy9zcmMvYXBwL2NvbXBvbmVudHMvam91cm5hbC9qb3VybmFsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQWlCO0VBQ2pCLGlCQUFnQjtFQUNoQixZQUFXO0VBQ1gsYUFBWTtFQUNaLGNBQWEsRUFDZCIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvam91cm5hbC9qb3VybmFsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmpvdXJuYWwge1xuICBtYXgtaGVpZ2h0OiA1MDBweDtcbiAgbWF4LXdpZHRoOiA1MDBweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZ3JpZDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/components/journal/journal.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/journal/journal.component.ts ***!
  \*********************************************************/
/*! exports provided: JournalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JournalComponent", function() { return JournalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ag-grid-angular */ "./node_modules/ag-grid-angular/main.js");
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ag_grid_angular__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var JournalComponent = /** @class */ (function () {
    function JournalComponent() {
    }
    JournalComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('agGrid'),
        __metadata("design:type", ag_grid_angular__WEBPACK_IMPORTED_MODULE_1__["AgGridNg2"])
    ], JournalComponent.prototype, "agGrid", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], JournalComponent.prototype, "columnDefs", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], JournalComponent.prototype, "rowData", void 0);
    JournalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-journal',
            template: __webpack_require__(/*! ./journal.component.html */ "./src/app/components/journal/journal.component.html"),
            styles: [__webpack_require__(/*! ./journal.component.scss */ "./src/app/components/journal/journal.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], JournalComponent);
    return JournalComponent;
}());



/***/ }),

/***/ "./src/app/components/registy-stepper/registry-stepper.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/components/registy-stepper/registry-stepper.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-horizontal-stepper [linear]=\"isLinear\" #stepper>\n  <mat-step [stepControl]=\"firstFormGroup\">\n    <form [formGroup]=\"firstFormGroup\">\n      <ng-template matStepLabel>Аккаунта</ng-template>\n      <div class=\"step-form-1-2\">\n        <mat-form-field class=\"example-full-width\">\n          <input matInput formControlName=\"nickName\" placeholder=\"Никнейм\" name=\"nickName\" required>\n        </mat-form-field>\n        <mat-form-field class=\"example-full-width\">\n          <input matInput formControlName=\"login\" placeholder=\"Логин\" name=\"login\" required>\n        </mat-form-field>\n        <mat-form-field class=\"example-full-width\">\n          <input matInput formControlName=\"password\" placeholder=\"Пароль\" name=\"password\" required>\n        </mat-form-field>\n      </div>\n      <div>\n        <button mat-button matStepperPrevious>Назад</button>\n        <button mat-button matStepperNext>Далее</button>\n      </div>\n    </form>\n  </mat-step>\n  <mat-step [stepControl]=\"secondFormGroup\">\n    <form [formGroup]=\"secondFormGroup\">\n      <ng-template matStepLabel>Контактные данные</ng-template>\n      <div class=\"step-form-1-2\">\n        <mat-form-field class=\"example-full-width\">\n          <input matInput formControlName=\"phone\" placeholder=\"Номер телефона\" name=\"phone\" required>\n        </mat-form-field>\n        <mat-form-field class=\"example-full-width\">\n          <input matInput formControlName=\"email\" placeholder=\"E-mail\" name=\"email\" type=\"email\" required>\n        </mat-form-field>\n      </div>\n      <div>\n        <button mat-button matStepperPrevious>Назад</button>\n        <button mat-button matStepperNext>Далее</button>\n      </div>\n    </form>\n  </mat-step>\n  <mat-step [stepControl]=\"thirdFormGroup\">\n    <form [formGroup]=\"thirdFormGroup\">\n      <ng-template matStepLabel>Адрес</ng-template>\n      <div class=\"step-form-1-2\">\n        <app-adress-kladr></app-adress-kladr>\n      </div>\n      <div>\n        <button mat-button matStepperPrevious>Назад</button>\n        <button mat-button matStepperNext>Далее</button>\n      </div>\n    </form>\n  </mat-step>\n  <mat-step [stepControl]=\"fourFormGroup\">\n    <form [formGroup]=\"fourFormGroup\">\n      <ng-template matStepLabel>Пользовательское соглашение</ng-template>\n      <div class=\"step-form\">\n        <div class=\"client-agreement\" [innerHTML]=>\n          {{ client-agreement }}\n        </div>\n        <mat-checkbox>Я подтверждаю, что ознакомлен со всеми пунктами настоящего Соглашения и безусловно принимаю их.\n        </mat-checkbox>\n      </div>\n      <div>\n        <button mat-button matStepperNext>Далее</button>\n      </div>\n    </form>\n  </mat-step>\n</mat-horizontal-stepper>"

/***/ }),

/***/ "./src/app/components/registy-stepper/registry-stepper.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/components/registy-stepper/registry-stepper.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "app-registry-stepper {\n  width: 100%;\n  height: 100%; }\n\n.mat-form-field {\n  display: inline-block;\n  position: relative;\n  text-align: left;\n  margin: 0px 50px 0px 50px; }\n\n.client-agreement {\n  display: flex;\n  flex-wrap: wrap;\n  max-height: 400px;\n  overflow-y: auto; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JvbWFuL3JlcG9zaXRvcnkvZnJvbnRlbmQvc291cmNlcy9zcmMvYXBwL2NvbXBvbmVudHMvcmVnaXN0eS1zdGVwcGVyL3JlZ2lzdHJ5LXN0ZXBwZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFXO0VBQ1gsYUFBWSxFQUNiOztBQUVEO0VBQ0Usc0JBQXFCO0VBQ3JCLG1CQUFrQjtFQUNsQixpQkFBZ0I7RUFDaEIsMEJBQXlCLEVBQzFCOztBQUVEO0VBQ0UsY0FBYTtFQUNiLGdCQUFlO0VBQ2Ysa0JBQWlCO0VBQ2pCLGlCQUFnQixFQUNqQiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcmVnaXN0eS1zdGVwcGVyL3JlZ2lzdHJ5LXN0ZXBwZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhcHAtcmVnaXN0cnktc3RlcHBlciB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5tYXQtZm9ybS1maWVsZCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBtYXJnaW46IDBweCA1MHB4IDBweCA1MHB4O1xufVxuXG4uY2xpZW50LWFncmVlbWVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgbWF4LWhlaWdodDogNDAwcHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/components/registy-stepper/registry-stepper.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/components/registy-stepper/registry-stepper.component.ts ***!
  \**************************************************************************/
/*! exports provided: RegistryStepperComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistryStepperComponent", function() { return RegistryStepperComponent; });
/* harmony import */ var _classes_accountEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../classes/accountEntity */ "./src/app/classes/accountEntity.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/stepper */ "./node_modules/@angular/cdk/esm5/stepper.es5.js");
/* harmony import */ var _json_registry_stepper_agreement_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../json/registry-stepper-agreement.json */ "./src/app/json/registry-stepper-agreement.json");
var _json_registry_stepper_agreement_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../json/registry-stepper-agreement.json */ "./src/app/json/registry-stepper-agreement.json", 1);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegistryStepperComponent = /** @class */ (function () {
    function RegistryStepperComponent(_formBuilder) {
        this._formBuilder = _formBuilder;
        // флаг, отвечающий за свойство степпера (true - возможно переходить только
        // из шага в шаг, false - в любом порядке)
        this.isLinear = false;
        this.account = new _classes_accountEntity__WEBPACK_IMPORTED_MODULE_0__["AccountEntity"]();
    }
    RegistryStepperComponent.prototype.ngOnInit = function () {
        this.firstFormGroup = this._formBuilder.group({
            nickName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            login: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        this.secondFormGroup = this._formBuilder.group({
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        this.thirdFormGroup = this._formBuilder.group({});
        this.fourFormGroup = this._formBuilder.group({
            isAgree: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].requiredTrue]
        });
        this.agreementHTML = _json_registry_stepper_agreement_json__WEBPACK_IMPORTED_MODULE_4__["agreement"];
    };
    RegistryStepperComponent.prototype.form1 = function () {
        console.log(this.firstFormGroup.value);
    };
    RegistryStepperComponent.prototype.form2 = function () {
        console.log(this.secondFormGroup.value);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", _classes_accountEntity__WEBPACK_IMPORTED_MODULE_0__["AccountEntity"])
    ], RegistryStepperComponent.prototype, "account", void 0);
    RegistryStepperComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-registry-stepper',
            template: __webpack_require__(/*! ./registry-stepper.component.html */ "./src/app/components/registy-stepper/registry-stepper.component.html"),
            styles: [__webpack_require__(/*! ./registry-stepper.component.scss */ "./src/app/components/registy-stepper/registry-stepper.component.scss")],
            providers: [
                {
                    provide: _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_3__["MAT_STEPPER_GLOBAL_OPTIONS"],
                    useValue: { displayDefaultIndicatorType: false }
                }
            ]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])
    ], RegistryStepperComponent);
    return RegistryStepperComponent;
}());



/***/ }),

/***/ "./src/app/components/tree-flat-overview/tree-flat-overview.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/components/tree-flat-overview/tree-flat-overview.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tree  [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n  <mat-tree-node (click)=\"nodeClick(node)\" *matTreeNodeDef=\"let node\" matTreeNodeToggle matTreeNodePadding>\n    <div [ngClass]=\"node.image\"></div>\n    {{node.name}}\n  </mat-tree-node>\n\n  <mat-tree-node (click)=\"nodeClick(node)\"  matTreeNodeToggle [attr.aria-label]=\"'toggle ' + node.sysName\" *matTreeNodeDef=\"let node;when: hasChild\" matTreeNodePadding>\n      <div [ngClass]=\"node.image\"></div>\n    {{node.name}}\n  </mat-tree-node>\n</mat-tree>"

/***/ }),

/***/ "./src/app/components/tree-flat-overview/tree-flat-overview.component.scss":
/*!*********************************************************************************!*\
  !*** ./src/app/components/tree-flat-overview/tree-flat-overview.component.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-tree {\n  padding: 20px; }\n\n.mat-tree-node {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  min-height: 40px;\n  flex: 1;\n  overflow: hidden;\n  word-wrap: break-word;\n  padding: 10px 30px 10px 30px; }\n\n.mat-tree-node:hover {\n  color: white;\n  background-color: #3f51b5; }\n\n.image,\n.personal,\n.delivery,\n.festivals,\n.master-classes,\n.menu,\n.orders,\n.purchases,\n.professional-staff-training,\n.reservations,\n.stop-sheet,\n.work-schedule,\n.suggest-news,\n.vacation-schedule {\n  width: 40px;\n  height: 40px;\n  margin: 0px 10px 0px 10px; }\n\n.personal {\n  background: url('personal.png');\n  background-size: contain; }\n\n.reservations {\n  background: url('reservations.png');\n  background-size: contain; }\n\n.work-schedule {\n  background: url('work-schedule.png');\n  background-size: contain; }\n\n.orders {\n  background: url('orders.png');\n  background-size: contain; }\n\n.suggest-news {\n  background: url('suggest-news.png');\n  background-size: contain; }\n\n.stop-sheet {\n  background: url('stop-sheet.png');\n  background-size: contain; }\n\n.menu {\n  background: url('menu.png');\n  background-size: contain; }\n\n.delivery {\n  background: url('delivery.png');\n  background-size: contain; }\n\n.master-classes {\n  background: url('master-classes.png');\n  background-size: contain; }\n\n.festivals {\n  background: url('festivals.png');\n  background-size: contain; }\n\n.purchases {\n  background: url('purchases.png');\n  background-size: contain; }\n\n.vacation-schedule {\n  background: url('vacation-schedule.png');\n  background-size: contain; }\n\n.professional-staff-training {\n  background: url('professional-staff-training.png');\n  background-size: contain; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JvbWFuL3JlcG9zaXRvcnkvZnJvbnRlbmQvc291cmNlcy9zcmMvYXBwL2NvbXBvbmVudHMvdHJlZS1mbGF0LW92ZXJ2aWV3L3RyZWUtZmxhdC1vdmVydmlldy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQWEsRUFDZDs7QUFFRDtFQUNFLGdCQUFlO0VBQ2YsY0FBYTtFQUNiLG9CQUFtQjtFQUNuQixpQkFBZ0I7RUFDaEIsUUFBTztFQUNQLGlCQUFnQjtFQUNoQixzQkFBcUI7RUFDckIsNkJBQTRCLEVBQzdCOztBQUVEO0VBQ0UsYUFBWTtFQUNaLDBCQUF5QixFQUMxQjs7QUFHRDs7Ozs7Ozs7Ozs7Ozs7RUFjRSxZQUFXO0VBQ1gsYUFBWTtFQUNaLDBCQUF5QixFQUMxQjs7QUFFRDtFQUNFLGdDQUFxRDtFQUNyRCx5QkFBd0IsRUFDekI7O0FBRUQ7RUFDRSxvQ0FBeUQ7RUFDekQseUJBQXdCLEVBQ3pCOztBQUVEO0VBQ0UscUNBQTBEO0VBQzFELHlCQUF3QixFQUN6Qjs7QUFFRDtFQUNFLDhCQUFtRDtFQUNuRCx5QkFBd0IsRUFDekI7O0FBRUQ7RUFDRSxvQ0FBeUQ7RUFDekQseUJBQXdCLEVBQ3pCOztBQUVEO0VBQ0Usa0NBQXVEO0VBQ3ZELHlCQUF3QixFQUN6Qjs7QUFFRDtFQUNFLDRCQUFpRDtFQUNqRCx5QkFBd0IsRUFDekI7O0FBRUQ7RUFDRSxnQ0FBcUQ7RUFDckQseUJBQXdCLEVBQ3pCOztBQUVEO0VBQ0Usc0NBQTJEO0VBQzNELHlCQUF3QixFQUN6Qjs7QUFFRDtFQUNFLGlDQUFzRDtFQUN0RCx5QkFBd0IsRUFDekI7O0FBRUQ7RUFDRSxpQ0FBc0Q7RUFDdEQseUJBQXdCLEVBQ3pCOztBQUVEO0VBQ0UseUNBQThEO0VBQzlELHlCQUF3QixFQUN6Qjs7QUFFRDtFQUNFLG1EQUF3RTtFQUN4RSx5QkFBd0IsRUFDekIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3RyZWUtZmxhdC1vdmVydmlldy90cmVlLWZsYXQtb3ZlcnZpZXcuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWF0LXRyZWUge1xuICBwYWRkaW5nOiAyMHB4O1xufVxuXG4ubWF0LXRyZWUtbm9kZSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogNDBweDtcbiAgZmxleDogMTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICBwYWRkaW5nOiAxMHB4IDMwcHggMTBweCAzMHB4O1xufVxuXG4ubWF0LXRyZWUtbm9kZTpob3ZlciB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNmNTFiNTtcbn1cblxuLy8gY29tbW9uLWltYWdlIHByb3BlcnRpZXNcbi5pbWFnZSxcbi5wZXJzb25hbCxcbi5kZWxpdmVyeSxcbi5mZXN0aXZhbHMsXG4ubWFzdGVyLWNsYXNzZXMsXG4ubWVudSxcbi5vcmRlcnMsXG4ucHVyY2hhc2VzLFxuLnByb2Zlc3Npb25hbC1zdGFmZi10cmFpbmluZyxcbi5yZXNlcnZhdGlvbnMsXG4uc3RvcC1zaGVldCxcbi53b3JrLXNjaGVkdWxlLFxuLnN1Z2dlc3QtbmV3cyxcbi52YWNhdGlvbi1zY2hlZHVsZSB7XG4gIHdpZHRoOiA0MHB4O1xuICBoZWlnaHQ6IDQwcHg7XG4gIG1hcmdpbjogMHB4IDEwcHggMHB4IDEwcHg7XG59XG5cbi5wZXJzb25hbCB7XG4gIGJhY2tncm91bmQ6IHVybChcIi4uLy4uLy4uL2Fzc2V0cy9pL3BuZy9wZXJzb25hbC5wbmdcIik7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbn1cblxuLnJlc2VydmF0aW9ucyB7XG4gIGJhY2tncm91bmQ6IHVybChcIi4uLy4uLy4uL2Fzc2V0cy9pL3BuZy9yZXNlcnZhdGlvbnMucG5nXCIpO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG59XG5cbi53b3JrLXNjaGVkdWxlIHtcbiAgYmFja2dyb3VuZDogdXJsKFwiLi4vLi4vLi4vYXNzZXRzL2kvcG5nL3dvcmstc2NoZWR1bGUucG5nXCIpO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG59XG5cbi5vcmRlcnMge1xuICBiYWNrZ3JvdW5kOiB1cmwoXCIuLi8uLi8uLi9hc3NldHMvaS9wbmcvb3JkZXJzLnBuZ1wiKTtcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xufVxuXG4uc3VnZ2VzdC1uZXdzIHtcbiAgYmFja2dyb3VuZDogdXJsKFwiLi4vLi4vLi4vYXNzZXRzL2kvcG5nL3N1Z2dlc3QtbmV3cy5wbmdcIik7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbn1cblxuLnN0b3Atc2hlZXQge1xuICBiYWNrZ3JvdW5kOiB1cmwoXCIuLi8uLi8uLi9hc3NldHMvaS9wbmcvc3RvcC1zaGVldC5wbmdcIik7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbn1cblxuLm1lbnUge1xuICBiYWNrZ3JvdW5kOiB1cmwoXCIuLi8uLi8uLi9hc3NldHMvaS9wbmcvbWVudS5wbmdcIik7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbn1cblxuLmRlbGl2ZXJ5IHtcbiAgYmFja2dyb3VuZDogdXJsKFwiLi4vLi4vLi4vYXNzZXRzL2kvcG5nL2RlbGl2ZXJ5LnBuZ1wiKTtcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xufVxuXG4ubWFzdGVyLWNsYXNzZXMge1xuICBiYWNrZ3JvdW5kOiB1cmwoXCIuLi8uLi8uLi9hc3NldHMvaS9wbmcvbWFzdGVyLWNsYXNzZXMucG5nXCIpO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG59XG5cbi5mZXN0aXZhbHMge1xuICBiYWNrZ3JvdW5kOiB1cmwoXCIuLi8uLi8uLi9hc3NldHMvaS9wbmcvZmVzdGl2YWxzLnBuZ1wiKTtcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xufVxuXG4ucHVyY2hhc2VzIHtcbiAgYmFja2dyb3VuZDogdXJsKFwiLi4vLi4vLi4vYXNzZXRzL2kvcG5nL3B1cmNoYXNlcy5wbmdcIik7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbn1cblxuLnZhY2F0aW9uLXNjaGVkdWxlIHtcbiAgYmFja2dyb3VuZDogdXJsKFwiLi4vLi4vLi4vYXNzZXRzL2kvcG5nL3ZhY2F0aW9uLXNjaGVkdWxlLnBuZ1wiKTtcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xufVxuXG4ucHJvZmVzc2lvbmFsLXN0YWZmLXRyYWluaW5nIHtcbiAgYmFja2dyb3VuZDogdXJsKFwiLi4vLi4vLi4vYXNzZXRzL2kvcG5nL3Byb2Zlc3Npb25hbC1zdGFmZi10cmFpbmluZy5wbmdcIik7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/components/tree-flat-overview/tree-flat-overview.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/components/tree-flat-overview/tree-flat-overview.component.ts ***!
  \*******************************************************************************/
/*! exports provided: TreeFlatOverviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeFlatOverviewComponent", function() { return TreeFlatOverviewComponent; });
/* harmony import */ var _services_app_route_service_app_route_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../services/app-route-service/app-route.service */ "./src/app/services/app-route-service/app-route.service.ts");
/* harmony import */ var _services_menu_service_menu_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../services/menu-service/menu.service */ "./src/app/services/menu-service/menu.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/tree */ "./node_modules/@angular/cdk/esm5/tree.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var src_app_classes_menu_flat_node__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/classes/menu-flat-node */ "./src/app/classes/menu-flat-node.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TreeFlatOverviewComponent = /** @class */ (function () {
    function TreeFlatOverviewComponent(database, appRouterService, menuService) {
        var _this = this;
        this.database = database;
        this.appRouterService = appRouterService;
        this.menuService = menuService;
        this.transformer = function (node, level) {
            return new src_app_classes_menu_flat_node__WEBPACK_IMPORTED_MODULE_6__["MenuFlatNode"](!!node.$children, node.$name, level, node.$pathOfDash, node.$image);
        };
        this._getLevel = function (node) { return node.level; };
        this._isExpandable = function (node) { return node.expandable; };
        this._getChildren = function (node) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(node.$children); };
        this.hasChild = function (_, _nodeData) { return _nodeData.expandable; };
        this.treeFlattener = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTreeFlattener"](this.transformer, this._getLevel, this._isExpandable, this._getChildren);
        this.treeControl = new _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_3__["FlatTreeControl"](this._getLevel, this._isExpandable);
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTreeFlatDataSource"](this.treeControl, this.treeFlattener);
        this.database.dataChange.subscribe(function (data) {
            _this.dataSource.data = data;
            console.log('database = ', data);
        });
    }
    /**
     * Функция перехода по клику на пункт меню (для всех будет одинаковой),
     * у каждого пункта меню должен быть свой путь
     *
     * @param pathOfDash - путь
     */
    TreeFlatOverviewComponent.prototype.nodeClick = function (node) {
        if (node && node.pathOfDash) {
            this.appRouterService.goTo("/dashbord/" + node.pathOfDash, { skipLocationChange: true });
        }
    };
    TreeFlatOverviewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-tree-flat-overview',
            template: __webpack_require__(/*! ./tree-flat-overview.component.html */ "./src/app/components/tree-flat-overview/tree-flat-overview.component.html"),
            styles: [__webpack_require__(/*! ./tree-flat-overview.component.scss */ "./src/app/components/tree-flat-overview/tree-flat-overview.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_menu_service_menu_service__WEBPACK_IMPORTED_MODULE_1__["MenuService"], _services_app_route_service_app_route_service__WEBPACK_IMPORTED_MODULE_0__["AppRouteService"], _services_menu_service_menu_service__WEBPACK_IMPORTED_MODULE_1__["MenuService"]])
    ], TreeFlatOverviewComponent);
    return TreeFlatOverviewComponent;
}());



/***/ }),

/***/ "./src/app/constants/http-constant.ts":
/*!********************************************!*\
  !*** ./src/app/constants/http-constant.ts ***!
  \********************************************/
/*! exports provided: HttpConstant */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpConstant", function() { return HttpConstant; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");

/**
 * Класс-константа для Http-сервиса
 */
var HttpConstant = /** @class */ (function () {
    function HttpConstant() {
    }
    HttpConstant.HTTP_OPTIONS = {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
            'Access-Control-Allow-Origin': '*'
        })
    };
    return HttpConstant;
}());



/***/ }),

/***/ "./src/app/constants/route-constant.ts":
/*!*********************************************!*\
  !*** ./src/app/constants/route-constant.ts ***!
  \*********************************************/
/*! exports provided: RouteConstant */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RouteConstant", function() { return RouteConstant; });
/**
 * Константы для роутинга запросов
 */
var RouteConstant = /** @class */ (function () {
    function RouteConstant() {
    }
    // запросы к модулю авторизации, регистрации, логину и т.д.
    RouteConstant.auth_location = 'http://localhost:8081/auth';
    // запросы к модулю меню
    RouteConstant.menu_location = 'http://localhost:8082/menu';
    // запросы к модулю журнала
    RouteConstant.journal_location = 'http://localhost:8082/journal';
    return RouteConstant;
}());



/***/ }),

/***/ "./src/app/guards/permission.guard.ts":
/*!********************************************!*\
  !*** ./src/app/guards/permission.guard.ts ***!
  \********************************************/
/*! exports provided: PermissionGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermissionGuard", function() { return PermissionGuard; });
/* harmony import */ var _services_app_route_service_app_route_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../services/app-route-service/app-route.service */ "./src/app/services/app-route-service/app-route.service.ts");
/* harmony import */ var _services_app_account_context_service_app_account_context_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../services/app-account-context-service/app-account-context.service */ "./src/app/services/app-account-context-service/app-account-context.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PermissionGuard = /** @class */ (function () {
    function PermissionGuard(appAccountContextService, appRouter) {
        this.appAccountContextService = appAccountContextService;
        this.appRouter = appRouter;
    }
    PermissionGuard.prototype.canActivate = function (next, state) {
        var account = this.appAccountContextService.getAccount();
        if (!account || !account.$authtorised) {
            return false;
        }
        return account.$authtorised;
    };
    PermissionGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_services_app_account_context_service_app_account_context_service__WEBPACK_IMPORTED_MODULE_1__["AppAccountContextService"],
            _services_app_route_service_app_route_service__WEBPACK_IMPORTED_MODULE_0__["AppRouteService"]])
    ], PermissionGuard);
    return PermissionGuard;
}());



/***/ }),

/***/ "./src/app/json/registry-stepper-agreement.json":
/*!******************************************************!*\
  !*** ./src/app/json/registry-stepper-agreement.json ***!
  \******************************************************/
/*! exports provided: agreement, default */
/***/ (function(module) {

module.exports = {"agreement":"Настоящее Соглашение определяет условия использования Пользователями материалов и сервисов (далее — «Сайт»). 1.Общие условия 1.1. Использование материалов и сервисов Сайта регулируется нормами действующего законодательства Российской  Федерации.    1.2. Настоящее Соглашение является публичной офертой. Получая доступ к материалам Сайта Пользователь считается   присоединившимся к настоящему Соглашению.   1.3. Администрация Сайта вправе в любое время в одностороннем порядке изменять условия настоящего Соглашения. Такие изменения вступают в силу по истечении 3 (Трех) дней с момента размещения новой версии Соглашения на сайте. При несогласии Пользователя с внесенными изменениями он обязан отказаться от доступа к Сайту,  прекратить использование материалов и сервисов Сайта. 2. Обязательства Пользователя   2.1. Пользователь соглашается не предпринимать действий, которые могут рассматриваться как нарушающие российское законодательство или нормы международного права, в том числе в сфере интеллектуальной собственности, авторских  и/или смежных правах, а также любых действий, которые приводят или могут привести к нарушению нормальной  работы Сайта и сервисов Сайта.   2.2. Использование материалов Сайта без согласия правообладателей не допускается (статья 1270 Г.К РФ). Для правомерного использования материалов Сайта необходимо заключение лицензионных договоров (получение лицензий) от  Правообладателей.  2.3. При цитировании материалов Сайта, включая охраняемые авторские произведения, ссылка на Сайт обязательна   (подпункт 1 пункта 1 статьи 1274 Г.К РФ).  2.4. Комментарии и иные записи Пользователя на Сайте не должны вступать в противоречие с требованиями законодательства Российской Федерации и общепринятых норм морали и нравственности.  2.5. Пользователь предупрежден о том, что Администрация Сайта не несет ответственности за посещение и использование им внешних ресурсов, ссылки на которые могут содержаться на сайте. 2.6. Пользователь согласен с тем, что Администрация Сайта не несет ответственности и не имеет прямых или косвенных обязательств перед Пользователем в связи с любыми возможными или возникшими потерями или убытками, связанными с любым содержанием Сайта, регистрацией авторских прав и сведениями о такой регистрации, товарами или услугами, доступными на или полученными через внешние сайты или ресурсы либо иные контакты Пользователя, в которые он вступил, используя размещенную на Сайте информацию или ссылки на внешние ресурсы.  2.7. Пользователь принимает положение о том, что все материалы и сервисы Сайта или любая их часть могут сопровождаться рекламой. Пользователь согласен с тем, что Администрация Сайта не несет какой-либо ответственности и не имеет каких-либо обязательств в связи с такой рекламой. 3. Прочие условия 3.1. Все возможные споры, вытекающие из настоящего Соглашения или связанные с ним, подлежат разрешению в соответствии с действующим законодательством Российской Федерации. 3.2. Ничто в Соглашении не может пониматься как установление между Пользователем и Администрации Сайта агентских отношений, отношений товарищества, отношений по совместной деятельности, отношений личного найма, либо каких-то иных отношений, прямо не предусмотренных Соглашением. 3.3. Признание судом какого-либо положения Соглашения недействительным или не подлежащим принудительному исполнению не влечет недействительности иных положений Соглашения. 3.4. Бездействие со стороны Администрации Сайта в случае нарушения кем-либо из Пользователей положений Соглашения не лишает Администрацию Сайта права предпринять позднее соответствующие действия в защиту своих интересов и защиту авторских прав на охраняемые в соответствии с законодательством материалы Сайта."};

/***/ }),

/***/ "./src/app/modules/auth/auth-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/modules/auth/auth-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: AuthRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRoutingModule", function() { return AuthRoutingModule; });
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login/login.component */ "./src/app/modules/auth/login/login.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _registry_registry_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./registry/registry.component */ "./src/app/modules/auth/registry/registry.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full',
    },
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"] },
    { path: 'registry', component: _registry_registry_component__WEBPACK_IMPORTED_MODULE_3__["RegistryComponent"] }
];
var AuthRoutingModule = /** @class */ (function () {
    function AuthRoutingModule() {
    }
    AuthRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AuthRoutingModule);
    return AuthRoutingModule;
}());



/***/ }),

/***/ "./src/app/modules/auth/auth.module.ts":
/*!*********************************************!*\
  !*** ./src/app/modules/auth/auth.module.ts ***!
  \*********************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var _components_adress_kladr_adress_kladr_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../components/adress-kladr/adress-kladr.component */ "./src/app/components/adress-kladr/adress-kladr.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _registry_registry_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./registry/registry.component */ "./src/app/modules/auth/registry/registry.component.ts");
/* harmony import */ var _auth_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./auth-routing.module */ "./src/app/modules/auth/auth-routing.module.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./login/login.component */ "./src/app/modules/auth/login/login.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_components_registy_stepper_registry_stepper_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/components/registy-stepper/registry-stepper.component */ "./src/app/components/registy-stepper/registry-stepper.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _login_login_component__WEBPACK_IMPORTED_MODULE_8__["LoginComponent"],
                _registry_registry_component__WEBPACK_IMPORTED_MODULE_6__["RegistryComponent"],
                src_app_components_registy_stepper_registry_stepper_component__WEBPACK_IMPORTED_MODULE_10__["RegistryStepperComponent"],
                _components_adress_kladr_adress_kladr_component__WEBPACK_IMPORTED_MODULE_0__["AdressKladrComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"],
                _auth_routing_module__WEBPACK_IMPORTED_MODULE_7__["AuthRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                // Material
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatStepperModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatCheckboxModule"]
            ],
            exports: [_login_login_component__WEBPACK_IMPORTED_MODULE_8__["LoginComponent"], _registry_registry_component__WEBPACK_IMPORTED_MODULE_6__["RegistryComponent"]],
            providers: []
        })
    ], AuthModule);
    return AuthModule;
}());



/***/ }),

/***/ "./src/app/modules/auth/login/login.component.html":
/*!*********************************************************!*\
  !*** ./src/app/modules/auth/login/login.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"example-card\">\n  <mat-card-header>\n    <mat-card-title>Вход</mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n    <form class=\"example-form\">\n      <table class=\"example-full-width\" cellspacing=\"0\">\n        <tr>\n          <td>\n            <mat-form-field class=\"example-full-width\">\n              <input matInput placeholder=\"Логин\" [(ngModel)]=\"account.login\" name=\"login\" required>\n            </mat-form-field>\n          </td>\n        </tr>\n        <tr>\n          <td>\n            <mat-form-field class=\"example-full-width\">\n              <input matInput placeholder=\"Пароль\" [(ngModel)]=\"account.password\" type=\"password\" name=\"password\"\n                required>\n            </mat-form-field>\n          </td>\n        </tr>\n      </table>\n    </form>\n    <!--<mat-spinner [style.display]=\"showSpinner ? 'block' : 'none'\"></mat-spinner>-->\n    <mat-card-actions>\n      <button mat-raised-button (click)=\"signIn()\" color=\"primary\">Войти</button>\n      <button mat-raised-button (click)=\"registry()\" color=\"primary\">Перейти на страницу регистрации</button>\n    </mat-card-actions>\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/modules/auth/login/login.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/modules/auth/login/login.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".app-login {\n  width: 100%;\n  height: 100%; }\n\n.login-row {\n  display: flex;\n  justify-content: space-between;\n  padding: 10px 0px 10px 0px;\n  width: 350px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JvbWFuL3JlcG9zaXRvcnkvZnJvbnRlbmQvc291cmNlcy9zcmMvYXBwL21vZHVsZXMvYXV0aC9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVc7RUFDWCxhQUFZLEVBQ2I7O0FBRUQ7RUFDRSxjQUFhO0VBQ2IsK0JBQThCO0VBQzlCLDJCQUEwQjtFQUMxQixhQUFZLEVBQ2IiLCJmaWxlIjoic3JjL2FwcC9tb2R1bGVzL2F1dGgvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYXBwLWxvZ2luIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmxvZ2luLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgcGFkZGluZzogMTBweCAwcHggMTBweCAwcHg7XG4gIHdpZHRoOiAzNTBweDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/modules/auth/login/login.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/modules/auth/login/login.component.ts ***!
  \*******************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _services_app_account_context_service_app_account_context_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../services/app-account-context-service/app-account-context.service */ "./src/app/services/app-account-context-service/app-account-context.service.ts");
/* harmony import */ var _services_app_route_service_app_route_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../services/app-route-service/app-route.service */ "./src/app/services/app-route-service/app-route.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = /** @class */ (function () {
    function LoginComponent(_appAccount, _router) {
        this._appAccount = _appAccount;
        this._router = _router;
        this.account = this._appAccount.getAccount();
    }
    /**
     * Войти
     */
    LoginComponent.prototype.signIn = function () {
        this._appAccount.login();
    };
    LoginComponent.prototype.registry = function () {
        this._router.goTo('/auth/registry');
    };
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/modules/auth/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/modules/auth/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_app_account_context_service_app_account_context_service__WEBPACK_IMPORTED_MODULE_0__["AppAccountContextService"],
            _services_app_route_service_app_route_service__WEBPACK_IMPORTED_MODULE_1__["AppRouteService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/modules/auth/registry/registry.component.html":
/*!***************************************************************!*\
  !*** ./src/app/modules/auth/registry/registry.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-registry-stepper account=\"account\"></app-registry-stepper>\n\n\n<button mat-raised-button (click)=\"backToLoginForm()\" color=\"primary\">Вернуться на страницу входа</button>\n<button mat-raised-button (click)=\"registry()\" color=\"primary\">Зарегистрировать</button>"

/***/ }),

/***/ "./src/app/modules/auth/registry/registry.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/modules/auth/registry/registry.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".app-registry {\n  width: 100%;\n  height: 100%;\n  margin: auto; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JvbWFuL3JlcG9zaXRvcnkvZnJvbnRlbmQvc291cmNlcy9zcmMvYXBwL21vZHVsZXMvYXV0aC9yZWdpc3RyeS9yZWdpc3RyeS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVc7RUFDWCxhQUFZO0VBQ1osYUFBWSxFQUNiIiwiZmlsZSI6InNyYy9hcHAvbW9kdWxlcy9hdXRoL3JlZ2lzdHJ5L3JlZ2lzdHJ5LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFwcC1yZWdpc3RyeSB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1hcmdpbjogYXV0bztcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/modules/auth/registry/registry.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/modules/auth/registry/registry.component.ts ***!
  \*************************************************************/
/*! exports provided: RegistryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistryComponent", function() { return RegistryComponent; });
/* harmony import */ var _services_app_account_context_service_app_account_context_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../services/app-account-context-service/app-account-context.service */ "./src/app/services/app-account-context-service/app-account-context.service.ts");
/* harmony import */ var _services_app_route_service_app_route_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../services/app-route-service/app-route.service */ "./src/app/services/app-route-service/app-route.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegistryComponent = /** @class */ (function () {
    function RegistryComponent(_appAccount, _router, _formBuilder) {
        this._appAccount = _appAccount;
        this._router = _router;
        this._formBuilder = _formBuilder;
        this.isLinear = false;
        this.account = this._appAccount.getAccount();
    }
    RegistryComponent.prototype.backToLoginForm = function () {
        this._router.goTo('/auth/login');
    };
    RegistryComponent.prototype.registry = function () {
        this._appAccount.regitry();
    };
    RegistryComponent.prototype.ngOnInit = function () {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
    };
    RegistryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-registry',
            template: __webpack_require__(/*! ./registry.component.html */ "./src/app/modules/auth/registry/registry.component.html"),
            styles: [__webpack_require__(/*! ./registry.component.scss */ "./src/app/modules/auth/registry/registry.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_app_account_context_service_app_account_context_service__WEBPACK_IMPORTED_MODULE_0__["AppAccountContextService"],
            _services_app_route_service_app_route_service__WEBPACK_IMPORTED_MODULE_1__["AppRouteService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]])
    ], RegistryComponent);
    return RegistryComponent;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/dashbord-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/modules/dashbord/dashbord-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: DashbordRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashbordRoutingModule", function() { return DashbordRoutingModule; });
/* harmony import */ var src_app_outlets_main_outlet_main_outlet_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/outlets/main-outlet/main-outlet.component */ "./src/app/outlets/main-outlet/main-outlet.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _outlets_header_outlet_header_outlet_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../outlets/header-outlet/header-outlet.component */ "./src/app/outlets/header-outlet/header-outlet.component.ts");
/* harmony import */ var _outlets_footer_outlet_footer_outlet_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../outlets/footer-outlet/footer-outlet.component */ "./src/app/outlets/footer-outlet/footer-outlet.component.ts");
/* harmony import */ var _menu_menu_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./menu/menu.module */ "./src/app/modules/dashbord/menu/menu.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    { path: '', component: _outlets_header_outlet_header_outlet_component__WEBPACK_IMPORTED_MODULE_3__["HeaderOutletComponent"], outlet: 'headerOutlet' },
    { path: '', component: src_app_outlets_main_outlet_main_outlet_component__WEBPACK_IMPORTED_MODULE_0__["MainOutletComponent"], outlet: 'mainOutlet' },
    { path: '', component: _outlets_footer_outlet_footer_outlet_component__WEBPACK_IMPORTED_MODULE_4__["FooterOutletComponent"], outlet: 'footerOutlet' },
    // Оставлено для начальной загрузки DashComponent`а
    { path: '', loadChildren: function () { return _menu_menu_module__WEBPACK_IMPORTED_MODULE_5__["MenuModule"]; } },
    { path: 'pages', loadChildren: function () { return _menu_menu_module__WEBPACK_IMPORTED_MODULE_5__["MenuModule"]; }, pathMatch: 'full' }
];
var DashbordRoutingModule = /** @class */ (function () {
    function DashbordRoutingModule() {
    }
    DashbordRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], DashbordRoutingModule);
    return DashbordRoutingModule;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/dashbord.component.html":
/*!**********************************************************!*\
  !*** ./src/app/modules/dashbord/dashbord.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>Dash</div>"

/***/ }),

/***/ "./src/app/modules/dashbord/dashbord.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/modules/dashbord/dashbord.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvZGFzaGJvcmQvZGFzaGJvcmQuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/modules/dashbord/dashbord.component.ts":
/*!********************************************************!*\
  !*** ./src/app/modules/dashbord/dashbord.component.ts ***!
  \********************************************************/
/*! exports provided: DashbordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashbordComponent", function() { return DashbordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashbordComponent = /** @class */ (function () {
    function DashbordComponent() {
    }
    DashbordComponent.prototype.ngOnInit = function () { };
    DashbordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashbord',
            template: __webpack_require__(/*! ./dashbord.component.html */ "./src/app/modules/dashbord/dashbord.component.html"),
            styles: [__webpack_require__(/*! ./dashbord.component.scss */ "./src/app/modules/dashbord/dashbord.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], DashbordComponent);
    return DashbordComponent;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/dashbord.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/modules/dashbord/dashbord.module.ts ***!
  \*****************************************************/
/*! exports provided: DashbordModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashbordModule", function() { return DashbordModule; });
/* harmony import */ var src_app_outlets_main_outlet_main_outlet_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/outlets/main-outlet/main-outlet.component */ "./src/app/outlets/main-outlet/main-outlet.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _dashbord_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashbord-routing.module */ "./src/app/modules/dashbord/dashbord-routing.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var src_app_outlets_header_outlet_header_outlet_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/outlets/header-outlet/header-outlet.component */ "./src/app/outlets/header-outlet/header-outlet.component.ts");
/* harmony import */ var src_app_outlets_footer_outlet_footer_outlet_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/outlets/footer-outlet/footer-outlet.component */ "./src/app/outlets/footer-outlet/footer-outlet.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var DashbordModule = /** @class */ (function () {
    function DashbordModule() {
    }
    DashbordModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            declarations: [src_app_outlets_main_outlet_main_outlet_component__WEBPACK_IMPORTED_MODULE_0__["MainOutletComponent"], src_app_outlets_header_outlet_header_outlet_component__WEBPACK_IMPORTED_MODULE_5__["HeaderOutletComponent"], src_app_outlets_footer_outlet_footer_outlet_component__WEBPACK_IMPORTED_MODULE_6__["FooterOutletComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _dashbord_routing_module__WEBPACK_IMPORTED_MODULE_2__["DashbordRoutingModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"]
            ],
            exports: [
                src_app_outlets_main_outlet_main_outlet_component__WEBPACK_IMPORTED_MODULE_0__["MainOutletComponent"], src_app_outlets_header_outlet_header_outlet_component__WEBPACK_IMPORTED_MODULE_5__["HeaderOutletComponent"], src_app_outlets_footer_outlet_footer_outlet_component__WEBPACK_IMPORTED_MODULE_6__["FooterOutletComponent"]
            ],
            bootstrap: [src_app_outlets_main_outlet_main_outlet_component__WEBPACK_IMPORTED_MODULE_0__["MainOutletComponent"], src_app_outlets_header_outlet_header_outlet_component__WEBPACK_IMPORTED_MODULE_5__["HeaderOutletComponent"], src_app_outlets_footer_outlet_footer_outlet_component__WEBPACK_IMPORTED_MODULE_6__["FooterOutletComponent"]]
        })
    ], DashbordModule);
    return DashbordModule;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/menu/delivery/delivery.component.html":
/*!************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/delivery/delivery.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  delivery works!\n</p>\n"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/delivery/delivery.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/delivery/delivery.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvZGFzaGJvcmQvbWVudS9kZWxpdmVyeS9kZWxpdmVyeS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/delivery/delivery.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/delivery/delivery.component.ts ***!
  \**********************************************************************/
/*! exports provided: DeliveryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveryComponent", function() { return DeliveryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DeliveryComponent = /** @class */ (function () {
    function DeliveryComponent() {
    }
    DeliveryComponent.prototype.ngOnInit = function () {
    };
    DeliveryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-delivery',
            template: __webpack_require__(/*! ./delivery.component.html */ "./src/app/modules/dashbord/menu/delivery/delivery.component.html"),
            styles: [__webpack_require__(/*! ./delivery.component.scss */ "./src/app/modules/dashbord/menu/delivery/delivery.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], DeliveryComponent);
    return DeliveryComponent;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/menu/festivals/festivals.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/festivals/festivals.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  festivals works!\n</p>\n"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/festivals/festivals.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/festivals/festivals.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvZGFzaGJvcmQvbWVudS9mZXN0aXZhbHMvZmVzdGl2YWxzLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/festivals/festivals.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/festivals/festivals.component.ts ***!
  \************************************************************************/
/*! exports provided: FestivalsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FestivalsComponent", function() { return FestivalsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FestivalsComponent = /** @class */ (function () {
    function FestivalsComponent() {
    }
    FestivalsComponent.prototype.ngOnInit = function () {
    };
    FestivalsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-festivals',
            template: __webpack_require__(/*! ./festivals.component.html */ "./src/app/modules/dashbord/menu/festivals/festivals.component.html"),
            styles: [__webpack_require__(/*! ./festivals.component.scss */ "./src/app/modules/dashbord/menu/festivals/festivals.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FestivalsComponent);
    return FestivalsComponent;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/menu/master-classes/master-classes.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/master-classes/master-classes.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  master-classes works!\n</p>\n"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/master-classes/master-classes.component.scss":
/*!************************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/master-classes/master-classes.component.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvZGFzaGJvcmQvbWVudS9tYXN0ZXItY2xhc3Nlcy9tYXN0ZXItY2xhc3Nlcy5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/master-classes/master-classes.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/master-classes/master-classes.component.ts ***!
  \**********************************************************************************/
/*! exports provided: MasterClassesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MasterClassesComponent", function() { return MasterClassesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MasterClassesComponent = /** @class */ (function () {
    function MasterClassesComponent() {
    }
    MasterClassesComponent.prototype.ngOnInit = function () {
    };
    MasterClassesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-master-classes',
            template: __webpack_require__(/*! ./master-classes.component.html */ "./src/app/modules/dashbord/menu/master-classes/master-classes.component.html"),
            styles: [__webpack_require__(/*! ./master-classes.component.scss */ "./src/app/modules/dashbord/menu/master-classes/master-classes.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], MasterClassesComponent);
    return MasterClassesComponent;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/menu/menu-routing.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/menu-routing.module.ts ***!
  \**************************************************************/
/*! exports provided: MenuRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuRoutingModule", function() { return MenuRoutingModule; });
/* harmony import */ var _dashbord_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dashbord.component */ "./src/app/modules/dashbord/dashbord.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _delivery_delivery_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./delivery/delivery.component */ "./src/app/modules/dashbord/menu/delivery/delivery.component.ts");
/* harmony import */ var _festivals_festivals_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./festivals/festivals.component */ "./src/app/modules/dashbord/menu/festivals/festivals.component.ts");
/* harmony import */ var _master_classes_master_classes_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./master-classes/master-classes.component */ "./src/app/modules/dashbord/menu/master-classes/master-classes.component.ts");
/* harmony import */ var _orders_orders_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./orders/orders.component */ "./src/app/modules/dashbord/menu/orders/orders.component.ts");
/* harmony import */ var _personal_personal_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./personal/personal.component */ "./src/app/modules/dashbord/menu/personal/personal.component.ts");
/* harmony import */ var _menu_menu_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./menu/menu.component */ "./src/app/modules/dashbord/menu/menu/menu.component.ts");
/* harmony import */ var _professional_staff_training_professional_staff_training_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./professional-staff-training/professional-staff-training.component */ "./src/app/modules/dashbord/menu/professional-staff-training/professional-staff-training.component.ts");
/* harmony import */ var _purchases_purchases_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./purchases/purchases.component */ "./src/app/modules/dashbord/menu/purchases/purchases.component.ts");
/* harmony import */ var _reservations_reservations_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./reservations/reservations.component */ "./src/app/modules/dashbord/menu/reservations/reservations.component.ts");
/* harmony import */ var _stop_sheet_stop_sheet_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./stop-sheet/stop-sheet.component */ "./src/app/modules/dashbord/menu/stop-sheet/stop-sheet.component.ts");
/* harmony import */ var _suggest_news_suggest_news_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./suggest-news/suggest-news.component */ "./src/app/modules/dashbord/menu/suggest-news/suggest-news.component.ts");
/* harmony import */ var _vacation_schedule_vacation_schedule_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./vacation-schedule/vacation-schedule.component */ "./src/app/modules/dashbord/menu/vacation-schedule/vacation-schedule.component.ts");
/* harmony import */ var _work_schedule_work_schedule_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./work-schedule/work-schedule.component */ "./src/app/modules/dashbord/menu/work-schedule/work-schedule.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var routes = [
    {
        path: '', component: _dashbord_component__WEBPACK_IMPORTED_MODULE_0__["DashbordComponent"], pathMatch: 'full'
    },
    { path: 'delivery', component: _delivery_delivery_component__WEBPACK_IMPORTED_MODULE_3__["DeliveryComponent"] },
    { path: 'festivals', component: _festivals_festivals_component__WEBPACK_IMPORTED_MODULE_4__["FestivalsComponent"] },
    { path: 'master-classes', component: _master_classes_master_classes_component__WEBPACK_IMPORTED_MODULE_5__["MasterClassesComponent"] },
    { path: 'orders', component: _orders_orders_component__WEBPACK_IMPORTED_MODULE_6__["OrdersComponent"] },
    { path: 'personal', component: _personal_personal_component__WEBPACK_IMPORTED_MODULE_7__["PersonalComponent"] },
    { path: 'menu', component: _menu_menu_component__WEBPACK_IMPORTED_MODULE_8__["MenuComponent"] },
    { path: 'professional-staff-training', component: _professional_staff_training_professional_staff_training_component__WEBPACK_IMPORTED_MODULE_9__["ProfessionalStaffTrainingComponent"] },
    { path: 'purchases', component: _purchases_purchases_component__WEBPACK_IMPORTED_MODULE_10__["PurchasesComponent"] },
    { path: 'reservations', component: _reservations_reservations_component__WEBPACK_IMPORTED_MODULE_11__["ReservationsComponent"] },
    { path: 'stop-sheet', component: _stop_sheet_stop_sheet_component__WEBPACK_IMPORTED_MODULE_12__["StopSheetComponent"] },
    { path: 'suggest-news', component: _suggest_news_suggest_news_component__WEBPACK_IMPORTED_MODULE_13__["SuggestNewsComponent"] },
    { path: 'vacation-schedule', component: _vacation_schedule_vacation_schedule_component__WEBPACK_IMPORTED_MODULE_14__["VacationScheduleComponent"] },
    { path: 'work-schedule', component: _work_schedule_work_schedule_component__WEBPACK_IMPORTED_MODULE_15__["WorkScheduleComponent"] }
];
var MenuRoutingModule = /** @class */ (function () {
    function MenuRoutingModule() {
    }
    MenuRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], MenuRoutingModule);
    return MenuRoutingModule;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/menu/menu.module.ts":
/*!******************************************************!*\
  !*** ./src/app/modules/dashbord/menu/menu.module.ts ***!
  \******************************************************/
/*! exports provided: MenuModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuModule", function() { return MenuModule; });
/* harmony import */ var _components_journal_journal_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../components/journal/journal.component */ "./src/app/components/journal/journal.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _menu_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu-routing.module */ "./src/app/modules/dashbord/menu/menu-routing.module.ts");
/* harmony import */ var _dashbord_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dashbord.component */ "./src/app/modules/dashbord/dashbord.component.ts");
/* harmony import */ var _personal_personal_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./personal/personal.component */ "./src/app/modules/dashbord/menu/personal/personal.component.ts");
/* harmony import */ var _reservations_reservations_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./reservations/reservations.component */ "./src/app/modules/dashbord/menu/reservations/reservations.component.ts");
/* harmony import */ var _work_schedule_work_schedule_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./work-schedule/work-schedule.component */ "./src/app/modules/dashbord/menu/work-schedule/work-schedule.component.ts");
/* harmony import */ var _orders_orders_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./orders/orders.component */ "./src/app/modules/dashbord/menu/orders/orders.component.ts");
/* harmony import */ var _suggest_news_suggest_news_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./suggest-news/suggest-news.component */ "./src/app/modules/dashbord/menu/suggest-news/suggest-news.component.ts");
/* harmony import */ var _stop_sheet_stop_sheet_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./stop-sheet/stop-sheet.component */ "./src/app/modules/dashbord/menu/stop-sheet/stop-sheet.component.ts");
/* harmony import */ var _menu_menu_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./menu/menu.component */ "./src/app/modules/dashbord/menu/menu/menu.component.ts");
/* harmony import */ var _delivery_delivery_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./delivery/delivery.component */ "./src/app/modules/dashbord/menu/delivery/delivery.component.ts");
/* harmony import */ var _master_classes_master_classes_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./master-classes/master-classes.component */ "./src/app/modules/dashbord/menu/master-classes/master-classes.component.ts");
/* harmony import */ var _festivals_festivals_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./festivals/festivals.component */ "./src/app/modules/dashbord/menu/festivals/festivals.component.ts");
/* harmony import */ var _purchases_purchases_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./purchases/purchases.component */ "./src/app/modules/dashbord/menu/purchases/purchases.component.ts");
/* harmony import */ var _vacation_schedule_vacation_schedule_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./vacation-schedule/vacation-schedule.component */ "./src/app/modules/dashbord/menu/vacation-schedule/vacation-schedule.component.ts");
/* harmony import */ var _professional_staff_training_professional_staff_training_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./professional-staff-training/professional-staff-training.component */ "./src/app/modules/dashbord/menu/professional-staff-training/professional-staff-training.component.ts");
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ag-grid-angular */ "./node_modules/ag-grid-angular/main.js");
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(ag_grid_angular__WEBPACK_IMPORTED_MODULE_19__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var MenuModule = /** @class */ (function () {
    function MenuModule() {
    }
    MenuModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                // common components
                _components_journal_journal_component__WEBPACK_IMPORTED_MODULE_0__["JournalComponent"],
                // menu (menu pages) component
                _dashbord_component__WEBPACK_IMPORTED_MODULE_5__["DashbordComponent"],
                _personal_personal_component__WEBPACK_IMPORTED_MODULE_6__["PersonalComponent"],
                _reservations_reservations_component__WEBPACK_IMPORTED_MODULE_7__["ReservationsComponent"],
                _work_schedule_work_schedule_component__WEBPACK_IMPORTED_MODULE_8__["WorkScheduleComponent"],
                _orders_orders_component__WEBPACK_IMPORTED_MODULE_9__["OrdersComponent"],
                _suggest_news_suggest_news_component__WEBPACK_IMPORTED_MODULE_10__["SuggestNewsComponent"],
                _stop_sheet_stop_sheet_component__WEBPACK_IMPORTED_MODULE_11__["StopSheetComponent"],
                _menu_menu_component__WEBPACK_IMPORTED_MODULE_12__["MenuComponent"],
                _delivery_delivery_component__WEBPACK_IMPORTED_MODULE_13__["DeliveryComponent"],
                _master_classes_master_classes_component__WEBPACK_IMPORTED_MODULE_14__["MasterClassesComponent"],
                _festivals_festivals_component__WEBPACK_IMPORTED_MODULE_15__["FestivalsComponent"],
                _purchases_purchases_component__WEBPACK_IMPORTED_MODULE_16__["PurchasesComponent"],
                _vacation_schedule_vacation_schedule_component__WEBPACK_IMPORTED_MODULE_17__["VacationScheduleComponent"],
                _professional_staff_training_professional_staff_training_component__WEBPACK_IMPORTED_MODULE_18__["ProfessionalStaffTrainingComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _menu_routing_module__WEBPACK_IMPORTED_MODULE_4__["MenuRoutingModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"],
                // Angular Ag-grid
                ag_grid_angular__WEBPACK_IMPORTED_MODULE_19__["AgGridModule"].withComponents([])
            ]
        })
    ], MenuModule);
    return MenuModule;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/menu/menu/menu.component.html":
/*!****************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/menu/menu.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  menu works!\n</p>\n"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/menu/menu.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/menu/menu.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvZGFzaGJvcmQvbWVudS9tZW51L21lbnUuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/menu/menu.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/menu/menu.component.ts ***!
  \**************************************************************/
/*! exports provided: MenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuComponent", function() { return MenuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MenuComponent = /** @class */ (function () {
    function MenuComponent() {
    }
    MenuComponent.prototype.ngOnInit = function () {
    };
    MenuComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-menu',
            template: __webpack_require__(/*! ./menu.component.html */ "./src/app/modules/dashbord/menu/menu/menu.component.html"),
            styles: [__webpack_require__(/*! ./menu.component.scss */ "./src/app/modules/dashbord/menu/menu/menu.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], MenuComponent);
    return MenuComponent;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/menu/orders/orders.component.html":
/*!********************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/orders/orders.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  orders works!\n</p>\n"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/orders/orders.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/orders/orders.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvZGFzaGJvcmQvbWVudS9vcmRlcnMvb3JkZXJzLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/orders/orders.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/orders/orders.component.ts ***!
  \******************************************************************/
/*! exports provided: OrdersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersComponent", function() { return OrdersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OrdersComponent = /** @class */ (function () {
    function OrdersComponent() {
    }
    OrdersComponent.prototype.ngOnInit = function () {
    };
    OrdersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-orders',
            template: __webpack_require__(/*! ./orders.component.html */ "./src/app/modules/dashbord/menu/orders/orders.component.html"),
            styles: [__webpack_require__(/*! ./orders.component.scss */ "./src/app/modules/dashbord/menu/orders/orders.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], OrdersComponent);
    return OrdersComponent;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/menu/personal/personal.component.html":
/*!************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/personal/personal.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form class=\"form-content\">\n  <app-journal></app-journal>\n</form>"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/personal/personal.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/personal/personal.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvZGFzaGJvcmQvbWVudS9wZXJzb25hbC9wZXJzb25hbC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/personal/personal.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/personal/personal.component.ts ***!
  \**********************************************************************/
/*! exports provided: PersonalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonalComponent", function() { return PersonalComponent; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PersonalComponent = /** @class */ (function () {
    function PersonalComponent(http) {
        this.http = http;
        // тестовые поля для сетки данных
        this.columnDefs = [
            { headerName: 'Make', field: 'make', sortable: true, filter: true, checkboxSelection: true },
            { headerName: 'Model', field: 'model', sortable: true, filter: true },
            { headerName: 'Price', field: 'price', sortable: true, filter: true }
        ];
    }
    PersonalComponent.prototype.ngOnInit = function () {
        this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
    };
    PersonalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-personal',
            template: __webpack_require__(/*! ./personal.component.html */ "./src/app/modules/dashbord/menu/personal/personal.component.html"),
            styles: [__webpack_require__(/*! ./personal.component.scss */ "./src/app/modules/dashbord/menu/personal/personal.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
    ], PersonalComponent);
    return PersonalComponent;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/menu/professional-staff-training/professional-staff-training.component.html":
/*!**************************************************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/professional-staff-training/professional-staff-training.component.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  professional-staff-training works!\n</p>\n"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/professional-staff-training/professional-staff-training.component.scss":
/*!**************************************************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/professional-staff-training/professional-staff-training.component.scss ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvZGFzaGJvcmQvbWVudS9wcm9mZXNzaW9uYWwtc3RhZmYtdHJhaW5pbmcvcHJvZmVzc2lvbmFsLXN0YWZmLXRyYWluaW5nLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/professional-staff-training/professional-staff-training.component.ts":
/*!************************************************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/professional-staff-training/professional-staff-training.component.ts ***!
  \************************************************************************************************************/
/*! exports provided: ProfessionalStaffTrainingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfessionalStaffTrainingComponent", function() { return ProfessionalStaffTrainingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProfessionalStaffTrainingComponent = /** @class */ (function () {
    function ProfessionalStaffTrainingComponent() {
    }
    ProfessionalStaffTrainingComponent.prototype.ngOnInit = function () {
    };
    ProfessionalStaffTrainingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-professional-staff-training',
            template: __webpack_require__(/*! ./professional-staff-training.component.html */ "./src/app/modules/dashbord/menu/professional-staff-training/professional-staff-training.component.html"),
            styles: [__webpack_require__(/*! ./professional-staff-training.component.scss */ "./src/app/modules/dashbord/menu/professional-staff-training/professional-staff-training.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ProfessionalStaffTrainingComponent);
    return ProfessionalStaffTrainingComponent;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/menu/purchases/purchases.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/purchases/purchases.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  purchases works!\n</p>\n"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/purchases/purchases.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/purchases/purchases.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvZGFzaGJvcmQvbWVudS9wdXJjaGFzZXMvcHVyY2hhc2VzLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/purchases/purchases.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/purchases/purchases.component.ts ***!
  \************************************************************************/
/*! exports provided: PurchasesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchasesComponent", function() { return PurchasesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PurchasesComponent = /** @class */ (function () {
    function PurchasesComponent() {
    }
    PurchasesComponent.prototype.ngOnInit = function () {
    };
    PurchasesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-purchases',
            template: __webpack_require__(/*! ./purchases.component.html */ "./src/app/modules/dashbord/menu/purchases/purchases.component.html"),
            styles: [__webpack_require__(/*! ./purchases.component.scss */ "./src/app/modules/dashbord/menu/purchases/purchases.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PurchasesComponent);
    return PurchasesComponent;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/menu/reservations/reservations.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/reservations/reservations.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  reservations works!\n</p>\n"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/reservations/reservations.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/reservations/reservations.component.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvZGFzaGJvcmQvbWVudS9yZXNlcnZhdGlvbnMvcmVzZXJ2YXRpb25zLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/reservations/reservations.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/reservations/reservations.component.ts ***!
  \******************************************************************************/
/*! exports provided: ReservationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReservationsComponent", function() { return ReservationsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ReservationsComponent = /** @class */ (function () {
    function ReservationsComponent() {
    }
    ReservationsComponent.prototype.ngOnInit = function () {
    };
    ReservationsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-reservations',
            template: __webpack_require__(/*! ./reservations.component.html */ "./src/app/modules/dashbord/menu/reservations/reservations.component.html"),
            styles: [__webpack_require__(/*! ./reservations.component.scss */ "./src/app/modules/dashbord/menu/reservations/reservations.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ReservationsComponent);
    return ReservationsComponent;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/menu/stop-sheet/stop-sheet.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/stop-sheet/stop-sheet.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  stop-sheet works!\n</p>\n"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/stop-sheet/stop-sheet.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/stop-sheet/stop-sheet.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvZGFzaGJvcmQvbWVudS9zdG9wLXNoZWV0L3N0b3Atc2hlZXQuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/stop-sheet/stop-sheet.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/stop-sheet/stop-sheet.component.ts ***!
  \**************************************************************************/
/*! exports provided: StopSheetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StopSheetComponent", function() { return StopSheetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StopSheetComponent = /** @class */ (function () {
    function StopSheetComponent() {
    }
    StopSheetComponent.prototype.ngOnInit = function () {
    };
    StopSheetComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-stop-sheet',
            template: __webpack_require__(/*! ./stop-sheet.component.html */ "./src/app/modules/dashbord/menu/stop-sheet/stop-sheet.component.html"),
            styles: [__webpack_require__(/*! ./stop-sheet.component.scss */ "./src/app/modules/dashbord/menu/stop-sheet/stop-sheet.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], StopSheetComponent);
    return StopSheetComponent;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/menu/suggest-news/suggest-news.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/suggest-news/suggest-news.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  suggest-news works!\n</p>\n"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/suggest-news/suggest-news.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/suggest-news/suggest-news.component.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvZGFzaGJvcmQvbWVudS9zdWdnZXN0LW5ld3Mvc3VnZ2VzdC1uZXdzLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/suggest-news/suggest-news.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/suggest-news/suggest-news.component.ts ***!
  \******************************************************************************/
/*! exports provided: SuggestNewsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuggestNewsComponent", function() { return SuggestNewsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SuggestNewsComponent = /** @class */ (function () {
    function SuggestNewsComponent() {
    }
    SuggestNewsComponent.prototype.ngOnInit = function () {
    };
    SuggestNewsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-suggest-news',
            template: __webpack_require__(/*! ./suggest-news.component.html */ "./src/app/modules/dashbord/menu/suggest-news/suggest-news.component.html"),
            styles: [__webpack_require__(/*! ./suggest-news.component.scss */ "./src/app/modules/dashbord/menu/suggest-news/suggest-news.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SuggestNewsComponent);
    return SuggestNewsComponent;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/menu/vacation-schedule/vacation-schedule.component.html":
/*!******************************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/vacation-schedule/vacation-schedule.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  vacation-schedule works!\n</p>\n"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/vacation-schedule/vacation-schedule.component.scss":
/*!******************************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/vacation-schedule/vacation-schedule.component.scss ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvZGFzaGJvcmQvbWVudS92YWNhdGlvbi1zY2hlZHVsZS92YWNhdGlvbi1zY2hlZHVsZS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/vacation-schedule/vacation-schedule.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/vacation-schedule/vacation-schedule.component.ts ***!
  \****************************************************************************************/
/*! exports provided: VacationScheduleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VacationScheduleComponent", function() { return VacationScheduleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var VacationScheduleComponent = /** @class */ (function () {
    function VacationScheduleComponent() {
    }
    VacationScheduleComponent.prototype.ngOnInit = function () {
    };
    VacationScheduleComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-vacation-schedule',
            template: __webpack_require__(/*! ./vacation-schedule.component.html */ "./src/app/modules/dashbord/menu/vacation-schedule/vacation-schedule.component.html"),
            styles: [__webpack_require__(/*! ./vacation-schedule.component.scss */ "./src/app/modules/dashbord/menu/vacation-schedule/vacation-schedule.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], VacationScheduleComponent);
    return VacationScheduleComponent;
}());



/***/ }),

/***/ "./src/app/modules/dashbord/menu/work-schedule/work-schedule.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/work-schedule/work-schedule.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  work-schedule works!\n</p>\n"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/work-schedule/work-schedule.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/work-schedule/work-schedule.component.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvZGFzaGJvcmQvbWVudS93b3JrLXNjaGVkdWxlL3dvcmstc2NoZWR1bGUuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/modules/dashbord/menu/work-schedule/work-schedule.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/modules/dashbord/menu/work-schedule/work-schedule.component.ts ***!
  \********************************************************************************/
/*! exports provided: WorkScheduleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkScheduleComponent", function() { return WorkScheduleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WorkScheduleComponent = /** @class */ (function () {
    function WorkScheduleComponent() {
    }
    WorkScheduleComponent.prototype.ngOnInit = function () {
    };
    WorkScheduleComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-work-schedule',
            template: __webpack_require__(/*! ./work-schedule.component.html */ "./src/app/modules/dashbord/menu/work-schedule/work-schedule.component.html"),
            styles: [__webpack_require__(/*! ./work-schedule.component.scss */ "./src/app/modules/dashbord/menu/work-schedule/work-schedule.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], WorkScheduleComponent);
    return WorkScheduleComponent;
}());



/***/ }),

/***/ "./src/app/outlets/footer-outlet/footer-outlet.component.html":
/*!********************************************************************!*\
  !*** ./src/app/outlets/footer-outlet/footer-outlet.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"footer\">\n  footer-outlet works!\n</div>\n"

/***/ }),

/***/ "./src/app/outlets/footer-outlet/footer-outlet.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/outlets/footer-outlet/footer-outlet.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL291dGxldHMvZm9vdGVyLW91dGxldC9mb290ZXItb3V0bGV0LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/outlets/footer-outlet/footer-outlet.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/outlets/footer-outlet/footer-outlet.component.ts ***!
  \******************************************************************/
/*! exports provided: FooterOutletComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterOutletComponent", function() { return FooterOutletComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterOutletComponent = /** @class */ (function () {
    function FooterOutletComponent() {
    }
    FooterOutletComponent.prototype.ngOnInit = function () {
    };
    FooterOutletComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer-outlet',
            template: __webpack_require__(/*! ./footer-outlet.component.html */ "./src/app/outlets/footer-outlet/footer-outlet.component.html"),
            styles: [__webpack_require__(/*! ./footer-outlet.component.scss */ "./src/app/outlets/footer-outlet/footer-outlet.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterOutletComponent);
    return FooterOutletComponent;
}());



/***/ }),

/***/ "./src/app/outlets/header-outlet/header-outlet.component.html":
/*!********************************************************************!*\
  !*** ./src/app/outlets/header-outlet/header-outlet.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar class=\"header\">\n  <mat-toolbar-row color=\"primary\">\n    <span>Суппбери</span>\n    <div class=\"menu-block\">\n      <button mat-icon-button (click)=\"sideNavToggle()\">\n        <i class=\"material-icons\">apps</i>\n      </button>\n    </div>\n    <div class=\"buttons-wraper\">\n      <div class=\"buttons\">\n\n        <mat-icon matBadge='5' matBadgeHidden='false' matBadgeColor=\"warn\">notification_important</mat-icon>\n\n        <button mat-icon-button (click)=\"editAccount()\" color=\"primary\">\n          <i class=\"material-icons\">account_circle</i>\n        </button>\n\n        <span class=\"account-name\">Добрый день, {{account.$nickName}}</span>\n\n        <button mat-raised-button (click)=\"signOut()\" color=\"primary\">\n          Log out\n        </button>\n      </div>\n    </div>\n  </mat-toolbar-row>\n</mat-toolbar>"

/***/ }),

/***/ "./src/app/outlets/header-outlet/header-outlet.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/outlets/header-outlet/header-outlet.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-toolbar-row {\n  height: 64px;\n  display: flex;\n  padding: 10px; }\n\n.buttons-wraper {\n  width: 100%;\n  display: flex;\n  justify-content: flex-end; }\n\n.buttons {\n  width: 600px;\n  display: inline-flex;\n  justify-content: space-between;\n  position: relative; }\n\n.account-name {\n  width: 300px;\n  height: 100%; }\n\n.menu-block {\n  margin: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JvbWFuL3JlcG9zaXRvcnkvZnJvbnRlbmQvc291cmNlcy9zcmMvYXBwL291dGxldHMvaGVhZGVyLW91dGxldC9oZWFkZXItb3V0bGV0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBWTtFQUNaLGNBQWE7RUFDYixjQUFhLEVBQ2Q7O0FBRUQ7RUFDRSxZQUFXO0VBQ1gsY0FBYTtFQUNiLDBCQUF5QixFQUMxQjs7QUFFRDtFQUNFLGFBQVk7RUFDWixxQkFBb0I7RUFDcEIsK0JBQThCO0VBQzlCLG1CQUFrQixFQUNuQjs7QUFFRDtFQUNFLGFBQVk7RUFDWixhQUFZLEVBQ2I7O0FBRUQ7RUFDRSxhQUFZLEVBQ2IiLCJmaWxlIjoic3JjL2FwcC9vdXRsZXRzL2hlYWRlci1vdXRsZXQvaGVhZGVyLW91dGxldC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXQtdG9vbGJhci1yb3cge1xuICBoZWlnaHQ6IDY0cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbi5idXR0b25zLXdyYXBlciB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xufVxuXG4uYnV0dG9ucyB7XG4gIHdpZHRoOiA2MDBweDtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uYWNjb3VudC1uYW1lIHtcbiAgd2lkdGg6IDMwMHB4O1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5tZW51LWJsb2NrIHtcbiAgbWFyZ2luOiAxMHB4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/outlets/header-outlet/header-outlet.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/outlets/header-outlet/header-outlet.component.ts ***!
  \******************************************************************/
/*! exports provided: HeaderOutletComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderOutletComponent", function() { return HeaderOutletComponent; });
/* harmony import */ var _classes_accountEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../classes/accountEntity */ "./src/app/classes/accountEntity.ts");
/* harmony import */ var _services_app_account_context_service_app_account_context_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../services/app-account-context-service/app-account-context.service */ "./src/app/services/app-account-context-service/app-account-context.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_main_side_nav_service_main_side_nav_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/main-side-nav-service/main-side-nav.service */ "./src/app/services/main-side-nav-service/main-side-nav.service.ts");
/* harmony import */ var src_app_services_menu_service_menu_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/menu-service/menu.service */ "./src/app/services/menu-service/menu.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HeaderOutletComponent = /** @class */ (function () {
    function HeaderOutletComponent(sideNavService, appAccountContextService, menuService) {
        this.sideNavService = sideNavService;
        this.appAccountContextService = appAccountContextService;
        this.menuService = menuService;
        this.account = new _classes_accountEntity__WEBPACK_IMPORTED_MODULE_0__["AccountEntity"]();
    }
    HeaderOutletComponent.prototype.ngOnInit = function () {
        this.account = this.appAccountContextService.getAccount();
        this.menuService.initialize();
    };
    /**
     * switch menu toggle
     */
    HeaderOutletComponent.prototype.sideNavToggle = function () {
        if (this.sideNavService.getDriwer()) {
            this.sideNavService.getDriwer().toggle();
        }
    };
    /**
     * Edit account profile
     */
    HeaderOutletComponent.prototype.editAccount = function () {
    };
    /**
     * Exit application
     */
    HeaderOutletComponent.prototype.signOut = function () {
        this.appAccountContextService.logOut();
    };
    HeaderOutletComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-header-outlet',
            template: __webpack_require__(/*! ./header-outlet.component.html */ "./src/app/outlets/header-outlet/header-outlet.component.html"),
            styles: [__webpack_require__(/*! ./header-outlet.component.scss */ "./src/app/outlets/header-outlet/header-outlet.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_main_side_nav_service_main_side_nav_service__WEBPACK_IMPORTED_MODULE_3__["MainSideNavService"],
            _services_app_account_context_service_app_account_context_service__WEBPACK_IMPORTED_MODULE_1__["AppAccountContextService"],
            src_app_services_menu_service_menu_service__WEBPACK_IMPORTED_MODULE_4__["MenuService"]])
    ], HeaderOutletComponent);
    return HeaderOutletComponent;
}());



/***/ }),

/***/ "./src/app/outlets/main-outlet/main-outlet.component.html":
/*!****************************************************************!*\
  !*** ./src/app/outlets/main-outlet/main-outlet.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>Main outlet</div>"

/***/ }),

/***/ "./src/app/outlets/main-outlet/main-outlet.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/outlets/main-outlet/main-outlet.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL291dGxldHMvbWFpbi1vdXRsZXQvbWFpbi1vdXRsZXQuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/outlets/main-outlet/main-outlet.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/outlets/main-outlet/main-outlet.component.ts ***!
  \**************************************************************/
/*! exports provided: MainOutletComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainOutletComponent", function() { return MainOutletComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MainOutletComponent = /** @class */ (function () {
    function MainOutletComponent() {
    }
    MainOutletComponent.prototype.ngOnInit = function () {
    };
    MainOutletComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-main-outlet',
            template: __webpack_require__(/*! ./main-outlet.component.html */ "./src/app/outlets/main-outlet/main-outlet.component.html"),
            styles: [__webpack_require__(/*! ./main-outlet.component.scss */ "./src/app/outlets/main-outlet/main-outlet.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], MainOutletComponent);
    return MainOutletComponent;
}());



/***/ }),

/***/ "./src/app/services/app-account-context-service/app-account-context.service.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/services/app-account-context-service/app-account-context.service.ts ***!
  \*************************************************************************************/
/*! exports provided: AppAccountContextService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppAccountContextService", function() { return AppAccountContextService; });
/* harmony import */ var _auth_service_auth_service_impl_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../auth-service/auth-service-impl.service */ "./src/app/services/auth-service/auth-service-impl.service.ts");
/* harmony import */ var _app_route_service_app_route_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../app-route-service/app-route.service */ "./src/app/services/app-route-service/app-route.service.ts");
/* harmony import */ var _classes_accountEntity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../classes/accountEntity */ "./src/app/classes/accountEntity.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppAccountContextService = /** @class */ (function () {
    function AppAccountContextService(_authService, temp) {
        this._authService = _authService;
        this.temp = temp;
        // сущность на контекст приложения
        this._account = new _classes_accountEntity__WEBPACK_IMPORTED_MODULE_2__["AccountEntity"]();
    }
    AppAccountContextService.prototype.regitry = function () {
        var _this = this;
        this._authService.registry(this._account)
            .subscribe(function (simpleResult) { return (simpleResult && simpleResult.result) ?
            _this._account = new _classes_accountEntity__WEBPACK_IMPORTED_MODULE_2__["AccountEntity"](simpleResult.result) : new _classes_accountEntity__WEBPACK_IMPORTED_MODULE_2__["AccountEntity"](); });
    };
    AppAccountContextService.prototype.login = function () {
        var _this = this;
        this._authService.signIn(this._account)
            .subscribe(function (simpleResult) {
            var account = simpleResult && simpleResult.result && new _classes_accountEntity__WEBPACK_IMPORTED_MODULE_2__["AccountEntity"](simpleResult.result);
            if (account) {
                _this._account = account;
                _this.temp.goTo('/dashbord');
            }
        });
    };
    AppAccountContextService.prototype.logOut = function () {
        var _this = this;
        this._authService.signOut(this._account)
            .subscribe(function (simpleResult) {
            _this._account = (simpleResult && simpleResult.result) ? new _classes_accountEntity__WEBPACK_IMPORTED_MODULE_2__["AccountEntity"](simpleResult.result) : new _classes_accountEntity__WEBPACK_IMPORTED_MODULE_2__["AccountEntity"]();
            _this.temp.goTo('/');
        });
    };
    AppAccountContextService.prototype.getAccount = function () {
        return this._account;
    };
    AppAccountContextService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_auth_service_auth_service_impl_service__WEBPACK_IMPORTED_MODULE_0__["AuthServiceImpl"],
            _app_route_service_app_route_service__WEBPACK_IMPORTED_MODULE_1__["AppRouteService"]])
    ], AppAccountContextService);
    return AppAccountContextService;
}());



/***/ }),

/***/ "./src/app/services/app-route-service/app-route.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/services/app-route-service/app-route.service.ts ***!
  \*****************************************************************/
/*! exports provided: AppRouteService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRouteService", function() { return AppRouteService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppRouteService = /** @class */ (function () {
    function AppRouteService(_router) {
        this._router = _router;
    }
    /**
     * Перейти по имени пути
     */
    AppRouteService.prototype.goTo = function (urlName, params) {
        if (urlName && urlName.length > 0) {
            this._router.navigate([urlName], params)
                .catch(function (reson) { return console.log('Неверный url. Error = ', reson); });
        }
    };
    AppRouteService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AppRouteService);
    return AppRouteService;
}());



/***/ }),

/***/ "./src/app/services/auth-service/auth-service-impl.service.ts":
/*!********************************************************************!*\
  !*** ./src/app/services/auth-service/auth-service-impl.service.ts ***!
  \********************************************************************/
/*! exports provided: AuthServiceImpl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthServiceImpl", function() { return AuthServiceImpl; });
/* harmony import */ var _constants_http_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/http-constant */ "./src/app/constants/http-constant.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_app_constants_route_constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/constants/route-constant */ "./src/app/constants/route-constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Сервис авторизации и регистрации пользователей в системе
 */
var AuthServiceImpl = /** @class */ (function () {
    function AuthServiceImpl(_httpService) {
        this._httpService = _httpService;
    }
    /**
     * Выйти из системы
     */
    AuthServiceImpl.prototype.signOut = function (accountEntity, url) {
        if (!url) {
            url = src_app_constants_route_constant__WEBPACK_IMPORTED_MODULE_3__["RouteConstant"].auth_location + '/logout';
        }
        return this._httpService.post(url, accountEntity, _constants_http_constant__WEBPACK_IMPORTED_MODULE_0__["HttpConstant"].HTTP_OPTIONS);
    };
    /**
     * Войти в систему
     */
    AuthServiceImpl.prototype.signIn = function (accountEntity, url) {
        if (!url) {
            url = src_app_constants_route_constant__WEBPACK_IMPORTED_MODULE_3__["RouteConstant"].auth_location + '/login';
        }
        return this._httpService.post(url, JSON.stringify(accountEntity), _constants_http_constant__WEBPACK_IMPORTED_MODULE_0__["HttpConstant"].HTTP_OPTIONS);
    };
    /**
     * Зарегистрироваться в системе
     */
    AuthServiceImpl.prototype.registry = function (accountEntity, url) {
        if (!url) {
            url = src_app_constants_route_constant__WEBPACK_IMPORTED_MODULE_3__["RouteConstant"].auth_location + '/registry';
        }
        return this._httpService.post(url, JSON.stringify(accountEntity), _constants_http_constant__WEBPACK_IMPORTED_MODULE_0__["HttpConstant"].HTTP_OPTIONS);
    };
    AuthServiceImpl = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AuthServiceImpl);
    return AuthServiceImpl;
}());



/***/ }),

/***/ "./src/app/services/main-side-nav-service/main-side-nav.service.ts":
/*!*************************************************************************!*\
  !*** ./src/app/services/main-side-nav-service/main-side-nav.service.ts ***!
  \*************************************************************************/
/*! exports provided: MainSideNavService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainSideNavService", function() { return MainSideNavService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MainSideNavService = /** @class */ (function () {
    function MainSideNavService() {
    }
    MainSideNavService.prototype.getDriwer = function () {
        return this.drawer;
    };
    MainSideNavService.prototype.setDriwer = function (drawer) {
        this.drawer = drawer;
    };
    MainSideNavService.prototype.drawerToggle = function () {
        this.drawer.toggle();
    };
    MainSideNavService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], MainSideNavService);
    return MainSideNavService;
}());



/***/ }),

/***/ "./src/app/services/menu-service/menu.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/services/menu-service/menu.service.ts ***!
  \*******************************************************/
/*! exports provided: MenuService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuService", function() { return MenuService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_account_context_service_app_account_context_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../app-account-context-service/app-account-context.service */ "./src/app/services/app-account-context-service/app-account-context.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var src_app_classes_menu_node__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/classes/menu-node */ "./src/app/classes/menu-node.ts");
/* harmony import */ var src_app_constants_route_constant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/constants/route-constant */ "./src/app/constants/route-constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `MenuNode` with nested
 * structure.
 */
var MenuService = /** @class */ (function () {
    function MenuService(http, accountService) {
        this.http = http;
        this.accountService = accountService;
        this.dataChange = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]([]);
        this.initialize();
    }
    Object.defineProperty(MenuService.prototype, "data", {
        get: function () { return this.dataChange.value; },
        enumerable: true,
        configurable: true
    });
    MenuService.prototype.loadMenuByAccountUUID = function (uuid) {
        return this.http
            .post(src_app_constants_route_constant__WEBPACK_IMPORTED_MODULE_5__["RouteConstant"].menu_location + '/getMenu', { uuid: uuid });
    };
    MenuService.prototype.initialize = function () {
        var _this = this;
        var account = this.accountService.getAccount() || null;
        if (account) {
            var uuid = account && account.$uuid || '';
            if (uuid.length !== 0) {
                this.loadMenuByAccountUUID(uuid)
                    .subscribe(function (simpleResult) {
                    var menu = simpleResult && simpleResult.result || null;
                    if (menu) {
                        var parsedMenu = JSON.parse(menu);
                        // Notify the change.
                        _this.dataChange.next(_this.buildNodeTree(parsedMenu, 0));
                    }
                });
            }
        }
    };
    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `MenuNode`.
     */
    MenuService.prototype.buildNodeTree = function (obj, level) {
        var _this = this;
        return Object.keys(obj).reduce(function (accumulator, key) {
            var node = new src_app_classes_menu_node__WEBPACK_IMPORTED_MODULE_4__["MenuNode"]();
            // берем элемент, и начинаем его создавать со всеми дочерними элементами
            var templateNode = obj[key];
            if (templateNode) {
                // маппинг имени
                node.$name = templateNode.name || '';
                // системное имя меню
                node.$sysName = templateNode.sysname || '';
                // url на dash
                node.$pathOfDash = templateNode.pathOfDash || '';
                // картинка пункта меню
                node.$image = templateNode.image || '';
                // маппим дочерние элементы
                if (templateNode.children && (templateNode.children instanceof Array)) {
                    var upLevel_1 = level + 1;
                    templateNode.children.forEach(function (child) {
                        var _a;
                        (_a = node.$children).push.apply(_a, _this.buildNodeTree(child, upLevel_1));
                    });
                }
            }
            return accumulator.concat(node);
        }, []);
    };
    MenuService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"], _app_account_context_service_app_account_context_service__WEBPACK_IMPORTED_MODULE_1__["AppAccountContextService"]])
    ], MenuService);
    return MenuService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_4__);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ "./src/polyfills.ts":
/*!**************************!*\
  !*** ./src/polyfills.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zone.js/dist/zone */ "./node_modules/zone.js/dist/zone.js");
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__);
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/weak-map';
// import 'core-js/es6/set';
/**
 * If the application will be indexed by Google Search, the following is required.
 * Googlebot uses a renderer based on Chrome 41.
 * https://developers.google.com/search/docs/guides/rendering
 **/
// import 'core-js/es6/array';
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/** IE10 and IE11 requires the following for the Reflect API. */
// import 'core-js/es6/reflect';
/**
 * Web Animations `@angular/platform-browser/animations`
 * Only required if AnimationBuilder is used within the application and using IE/Edge or Safari.
 * Standard animation support in Angular DOES NOT require any polyfills (as of Angular 6.0).
 **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 */
// (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
// (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
// (window as any).__zone_symbol__BLACK_LISTED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
/*
* in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
* with the following flag, it will bypass `zone.js` patch for IE/Edge
*/
// (window as any).__Zone_enable_cross_context_check = true;
/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/roman/repository/frontend/sources/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map