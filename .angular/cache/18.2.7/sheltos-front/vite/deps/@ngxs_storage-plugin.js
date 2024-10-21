import {
  InitState,
  NGXS_PLUGINS,
  StateToken,
  UpdateState,
  actionMatcher,
  getValue,
  setValue,
  withNgxsPlugin,
  ɵMETA_OPTIONS_KEY
} from "./chunk-ZNQGLO5U.js";
import "./chunk-M4JRCON3.js";
import {
  isPlatformBrowser,
  isPlatformServer
} from "./chunk-MWOCFXXK.js";
import {
  ENVIRONMENT_INITIALIZER,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  NgModule,
  PLATFORM_ID,
  inject,
  makeEnvironmentProviders,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-ZFIUXOUA.js";
import {
  tap
} from "./chunk-QQBAJWAT.js";
import "./chunk-7VTL32DS.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-TXDUYLVM.js";

// node_modules/@ngxs/storage-plugin/fesm2022/ngxs-storage-plugin-internals.mjs
var ɵDEFAULT_STATE_KEY = "@@STATE";
var NG_DEV_MODE = typeof ngDevMode !== "undefined" && ngDevMode;
var ɵUSER_OPTIONS = new InjectionToken(NG_DEV_MODE ? "USER_OPTIONS" : "");
var ɵALL_STATES_PERSISTED = new InjectionToken(NG_DEV_MODE ? "ALL_STATES_PERSISTED" : "", {
  providedIn: "root",
  factory: () => inject(ɵUSER_OPTIONS).keys === "*"
});
var ɵNGXS_STORAGE_PLUGIN_OPTIONS = new InjectionToken(NG_DEV_MODE ? "NGXS_STORAGE_PLUGIN_OPTIONS" : "");
var STORAGE_ENGINE = new InjectionToken(NG_DEV_MODE ? "STORAGE_ENGINE" : "");
function ɵisKeyWithExplicitEngine(key) {
  return key != null && !!key.engine;
}
function ɵextractStringKey(storageKey) {
  if (ɵisKeyWithExplicitEngine(storageKey)) {
    storageKey = storageKey.key;
  }
  if (storageKey.hasOwnProperty(ɵMETA_OPTIONS_KEY)) {
    storageKey = storageKey[ɵMETA_OPTIONS_KEY].name;
  }
  return storageKey instanceof StateToken ? storageKey.getName() : storageKey;
}

// node_modules/@ngxs/storage-plugin/fesm2022/ngxs-storage-plugin.mjs
function storageOptionsFactory(options) {
  return __spreadProps(__spreadValues({
    storage: 0,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    beforeSerialize: (obj) => obj,
    afterDeserialize: (obj) => obj
  }, options), {
    keys: options.keys === "*" ? [ɵDEFAULT_STATE_KEY] : options.keys
  });
}
function engineFactory(options, platformId) {
  if (isPlatformServer(platformId)) {
    return null;
  }
  if (options.storage === 0) {
    return localStorage;
  } else if (options.storage === 1) {
    return sessionStorage;
  }
  return null;
}
function getStorageKey(key, options) {
  return options?.namespace ? `${options.namespace}:${key}` : key;
}
var ɵNgxsStoragePluginKeysManager = class _ɵNgxsStoragePluginKeysManager {
  constructor() {
    this._keys = /* @__PURE__ */ new Set();
    this._injector = inject(Injector);
    this._keysWithEngines = [];
    const {
      keys
    } = inject(ɵNGXS_STORAGE_PLUGIN_OPTIONS);
    this.addKeys(keys);
  }
  getKeysWithEngines() {
    return [...this._keysWithEngines];
  }
  addKeys(storageKeys) {
    for (const storageKey of storageKeys) {
      const key = ɵextractStringKey(storageKey);
      if (this._keys.has(key)) {
        continue;
      }
      this._keys.add(key);
      const engine = ɵisKeyWithExplicitEngine(storageKey) ? this._injector.get(storageKey.engine) : this._injector.get(STORAGE_ENGINE);
      this._keysWithEngines.push({
        key,
        engine
      });
    }
  }
  static {
    this.ɵfac = function ɵNgxsStoragePluginKeysManager_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ɵNgxsStoragePluginKeysManager)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ɵNgxsStoragePluginKeysManager,
      factory: _ɵNgxsStoragePluginKeysManager.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ɵNgxsStoragePluginKeysManager, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var NG_DEV_MODE$2 = typeof ngDevMode !== "undefined" && ngDevMode;
var NgxsStoragePlugin = class _NgxsStoragePlugin {
  constructor(_keysManager, _options, _platformId) {
    this._keysManager = _keysManager;
    this._options = _options;
    this._platformId = _platformId;
    this._allStatesPersisted = inject(ɵALL_STATES_PERSISTED);
  }
  handle(state, event, next) {
    if (isPlatformServer(this._platformId)) {
      return next(state, event);
    }
    const matches = actionMatcher(event);
    const isInitAction = matches(InitState);
    const isUpdateAction = matches(UpdateState);
    const isInitOrUpdateAction = isInitAction || isUpdateAction;
    let hasMigration = false;
    if (isInitOrUpdateAction) {
      const addedStates = isUpdateAction && event.addedStates;
      for (const {
        key,
        engine
      } of this._keysManager.getKeysWithEngines()) {
        if (!this._allStatesPersisted && addedStates) {
          const dotNotationIndex = key.indexOf(DOT);
          const stateName = dotNotationIndex > -1 ? key.slice(0, dotNotationIndex) : key;
          if (!addedStates.hasOwnProperty(stateName)) {
            continue;
          }
        }
        const storageKey = getStorageKey(key, this._options);
        let storedValue = engine.getItem(storageKey);
        if (storedValue !== "undefined" && storedValue != null) {
          try {
            const newVal = this._options.deserialize(storedValue);
            storedValue = this._options.afterDeserialize(newVal, key);
          } catch {
            NG_DEV_MODE$2 && console.error(`Error ocurred while deserializing the ${storageKey} store value, falling back to empty object, the value obtained from the store: `, storedValue);
            storedValue = {};
          }
          this._options.migrations?.forEach((strategy) => {
            const versionMatch = strategy.version === getValue(storedValue, strategy.versionKey || "version");
            const keyMatch = !strategy.key && this._allStatesPersisted || strategy.key === key;
            if (versionMatch && keyMatch) {
              storedValue = strategy.migrate(storedValue);
              hasMigration = true;
            }
          });
          if (this._allStatesPersisted) {
            storedValue = this._hydrateSelectivelyOnUpdate(storedValue, addedStates);
            state = __spreadValues(__spreadValues({}, state), storedValue);
          } else {
            state = setValue(state, key, storedValue);
          }
        }
      }
    }
    return next(state, event).pipe(tap((nextState) => {
      if (isInitOrUpdateAction && !hasMigration) {
        return;
      }
      for (const {
        key,
        engine
      } of this._keysManager.getKeysWithEngines()) {
        let storedValue = nextState;
        const storageKey = getStorageKey(key, this._options);
        if (key !== ɵDEFAULT_STATE_KEY) {
          storedValue = getValue(nextState, key);
        }
        try {
          const newStoredValue = this._options.beforeSerialize(storedValue, key);
          engine.setItem(storageKey, this._options.serialize(newStoredValue));
        } catch (error) {
          if (NG_DEV_MODE$2) {
            if (error && (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED")) {
              console.error(`The ${storageKey} store value exceeds the browser storage quota: `, storedValue);
            } else {
              console.error(`Error ocurred while serializing the ${storageKey} store value, value not updated, the value obtained from the store: `, storedValue);
            }
          }
        }
      }
    }));
  }
  _hydrateSelectivelyOnUpdate(storedValue, addedStates) {
    if (!storedValue || !addedStates || Object.keys(addedStates).length === 0) {
      return storedValue;
    }
    return Object.keys(addedStates).reduce((accumulator, addedState) => {
      if (storedValue.hasOwnProperty(addedState)) {
        accumulator[addedState] = storedValue[addedState];
      }
      return accumulator;
    }, {});
  }
  static {
    this.ɵfac = function NgxsStoragePlugin_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxsStoragePlugin)(ɵɵinject(ɵNgxsStoragePluginKeysManager), ɵɵinject(ɵNGXS_STORAGE_PLUGIN_OPTIONS), ɵɵinject(PLATFORM_ID));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _NgxsStoragePlugin,
      factory: _NgxsStoragePlugin.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsStoragePlugin, [{
    type: Injectable
  }], () => [{
    type: ɵNgxsStoragePluginKeysManager
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [ɵNGXS_STORAGE_PLUGIN_OPTIONS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }], null);
})();
var DOT = ".";
var NgxsStoragePluginModule = class _NgxsStoragePluginModule {
  static forRoot(options) {
    return {
      ngModule: _NgxsStoragePluginModule,
      providers: [{
        provide: NGXS_PLUGINS,
        useClass: NgxsStoragePlugin,
        multi: true
      }, {
        provide: ɵUSER_OPTIONS,
        useValue: options
      }, {
        provide: ɵNGXS_STORAGE_PLUGIN_OPTIONS,
        useFactory: storageOptionsFactory,
        deps: [ɵUSER_OPTIONS]
      }, {
        provide: STORAGE_ENGINE,
        useFactory: engineFactory,
        deps: [ɵNGXS_STORAGE_PLUGIN_OPTIONS, PLATFORM_ID]
      }]
    };
  }
  static {
    this.ɵfac = function NgxsStoragePluginModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxsStoragePluginModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NgxsStoragePluginModule
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsStoragePluginModule, [{
    type: NgModule
  }], null, null);
})();
function withNgxsStoragePlugin(options) {
  return makeEnvironmentProviders([withNgxsPlugin(NgxsStoragePlugin), {
    provide: ɵUSER_OPTIONS,
    useValue: options
  }, {
    provide: ɵNGXS_STORAGE_PLUGIN_OPTIONS,
    useFactory: storageOptionsFactory,
    deps: [ɵUSER_OPTIONS]
  }, {
    provide: STORAGE_ENGINE,
    useFactory: engineFactory,
    deps: [ɵNGXS_STORAGE_PLUGIN_OPTIONS, PLATFORM_ID]
  }]);
}
var NG_DEV_MODE$1 = typeof ngDevMode !== "undefined" && ngDevMode;
function withStorageFeature(storageKeys) {
  return makeEnvironmentProviders([{
    provide: ENVIRONMENT_INITIALIZER,
    multi: true,
    useValue: () => {
      const allStatesPersisted = inject(ɵALL_STATES_PERSISTED);
      if (allStatesPersisted) {
        if (NG_DEV_MODE$1) {
          const message = "The NGXS storage plugin is currently persisting all states because the `keys` option was explicitly set to `*` at the root level. To selectively persist states, consider explicitly specifying them, allowing for addition at the feature level.";
          console.error(message);
        }
        return;
      }
      inject(ɵNgxsStoragePluginKeysManager).addKeys(storageKeys);
    }
  }]);
}
var NG_DEV_MODE2 = typeof ngDevMode !== "undefined" && ngDevMode;
var LOCAL_STORAGE_ENGINE = new InjectionToken(NG_DEV_MODE2 ? "LOCAL_STORAGE_ENGINE" : "", {
  providedIn: "root",
  factory: () => isPlatformBrowser(inject(PLATFORM_ID)) ? localStorage : null
});
var SESSION_STORAGE_ENGINE = new InjectionToken(NG_DEV_MODE2 ? "SESSION_STORAGE_ENGINE" : "", {
  providedIn: "root",
  factory: () => isPlatformBrowser(inject(PLATFORM_ID)) ? sessionStorage : null
});
export {
  LOCAL_STORAGE_ENGINE,
  NgxsStoragePlugin,
  NgxsStoragePluginModule,
  SESSION_STORAGE_ENGINE,
  STORAGE_ENGINE,
  withNgxsStoragePlugin,
  withStorageFeature
};
//# sourceMappingURL=@ngxs_storage-plugin.js.map
