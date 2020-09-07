process.env.HMR_PORT=62337;process.env.HMR_HOSTNAME="localhost";// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error;
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;

},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;

},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles/Tabs.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"Tabs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tabs;

var _react = _interopRequireWildcard(require("react"));

var _uuid = require("uuid");

var _classnames = _interopRequireDefault(require("classnames"));

require("./styles/Tabs.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const WHEEL_SENSITIVITY = 0.5;

function Tabs() {
  const refTabs = (0, _react.useRef)(null);
  const [tabs, setTabs] = (0, _react.useState)([]);
  const [hoverTab, setHoverTab] = (0, _react.useState)(null);
  const [draggedTab, setDraggedTab] = (0, _react.useState)(null);
  const [activeTab, setActiveTab] = (0, _react.useState)(null);
  const [isDragging, setIsDragging] = (0, _react.useState)(false);

  function createTab(title, shouldBeActive = false) {
    const id = (0, _uuid.v4)();
    const tab = {
      id,
      title: title || 'New Tab'
    };
    setTabs([...tabs, tab]);

    if (shouldBeActive) {
      setActiveTab(tab);
    }

    return id;
  }

  function handleDoubleClick(e) {
    if (e.target.className !== 'Tabs') {
      return;
    }

    createTab(null, true);
  }

  function handleMousedown(e, tab) {
    if (e.button === 0) {
      return setActiveTab(tab);
    } else if (e.button === 1) {
      return removeTab(tab);
    }
  }

  function handleDrag(tab) {
    setDraggedTab(tab);
    setIsDragging(true);
  }

  function handleDragOver(e, tab) {
    setHoverTab(tab);
    e.dataTransfer.dropEffect = 'move';
    e.preventDefault();
  }

  function handleDragEnd() {
    setHoverTab(null);
    setIsDragging(false);
  }

  function handleRootDragOver(e) {
    if (e.target.className !== 'Tabs') {
      return;
    }

    handleDragOver(e, null);
  }

  function handleDrop() {
    const fromIndex = tabs.findIndex(other => other.id === draggedTab?.id);
    const toIndex = tabs.findIndex(other => other.id === hoverTab?.id);
    const current = tabs.filter(tab => tab.id !== draggedTab.id);

    if (hoverTab === null) {
      current.push(draggedTab);
    } else if (toIndex === 0) {
      current.unshift(draggedTab);
    } else {
      current.splice(toIndex + (fromIndex > toIndex ? 1 : 0), 0, draggedTab);
    }

    setTabs(current);
  }

  function removeTab(tab, shouldSetActive = true) {
    const index = tabs.findIndex(other => other.id === tab.id);
    const current = tabs.filter(other => other.id !== tab.id);

    if (shouldSetActive) {
      console.log(index);
      setActiveTab(current[index] || current[0]);
    }

    setTabs(current);
  }

  function handleWheel(e) {
    refTabs.current.scrollLeft += e.deltaY * WHEEL_SENSITIVITY;
  }

  return /*#__PURE__*/_react.default.createElement("nav", {
    className: "Tabs",
    ref: refTabs,
    onDoubleClick: handleDoubleClick,
    onDragOver: handleRootDragOver,
    onDrop: handleDrop,
    onWheel: handleWheel
  }, tabs.map(tab => /*#__PURE__*/_react.default.createElement("div", {
    key: tab.id,
    className: (0, _classnames.default)({
      'Tabs-tab': true,
      isActive: activeTab && activeTab.id === tab.id
    }),
    draggable: true,
    onMouseDown: e => handleMousedown(e, tab),
    onDrag: e => handleDrag(tab),
    onDragEnd: e => handleDragEnd(tab),
    onDragOver: e => handleDragOver(e, tab)
  }, "Tab: ", tab.id.substr(0, 10), /*#__PURE__*/_react.default.createElement("svg", {
    className: (0, _classnames.default)({
      'Tabs-close': true,
      isIgnore: isDragging
    }),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512.001 512.001",
    onClick: () => removeTab(tab)
  }, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#333",
    d: "M284.286 256.002L506.143 34.144c7.811-7.811 7.811-20.475 0-28.285-7.811-7.81-20.475-7.811-28.285 0L256 227.717 34.143 5.859c-7.811-7.811-20.475-7.811-28.285 0-7.81 7.811-7.811 20.475 0 28.285l221.857 221.857L5.858 477.859c-7.811 7.811-7.811 20.475 0 28.285a19.938 19.938 0 0014.143 5.857 19.94 19.94 0 0014.143-5.857L256 284.287l221.857 221.857c3.905 3.905 9.024 5.857 14.143 5.857s10.237-1.952 14.143-5.857c7.811-7.811 7.811-20.475 0-28.285L284.286 256.002z"
  })))));
}
},{"./styles/Tabs.css":"styles/Tabs.css"}],"ServiceLog/LogRequests.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LogRequests;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LogRequests(props) {
  const activeRecord = props.activeRecord || {};
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "ServiceLog-requests"
  }, props.records.map(record => /*#__PURE__*/_react.default.createElement("button", {
    className: 'ServiceLog-requestButton ' + (activeRecord.id === record.id && 'isActive'),
    key: record.id,
    onClick: props.onClick.bind(null, record)
  }, /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("em", null, record.name)), /*#__PURE__*/_react.default.createElement("p", null, record.requestTime.timeText))));
}
},{}],"ServiceLog/LogInfo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LogInfo;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LogInfo(props) {
  return /*#__PURE__*/_react.default.createElement("table", {
    className: "ServiceLog-info"
  }, /*#__PURE__*/_react.default.createElement("tbody", null, /*#__PURE__*/_react.default.createElement("tr", null, props.infobox.map((info, index) => /*#__PURE__*/_react.default.createElement("td", {
    key: index
  }, /*#__PURE__*/_react.default.createElement("em", null, info.key, ":"), " ", /*#__PURE__*/_react.default.createElement("data", null, info.value))))));
}
},{}],"ServiceLog/LogRequest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LogRequest;

var _react = _interopRequireDefault(require("react"));

var _reactSyntaxHighlighter = _interopRequireDefault(require("react-syntax-highlighter"));

var _hljs = require("react-syntax-highlighter/dist/esm/styles/hljs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LogRequest(props) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("section", {
    className: "ServiceLog-request"
  }, /*#__PURE__*/_react.default.createElement("header", {
    className: "ServiceLog-requestHeader"
  }, /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("em", null, "Interface:"), " ", props.name), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("em", null, "Endpoint:"), " ", props.endpoint), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("em", null, "Data:"), " ", props.requestTime.dateText, " ", props.requestTime.timeText, "-", props.responseTime.timeText)), /*#__PURE__*/_react.default.createElement("nav", {
    className: "ServiceLog-nav"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "ServiceLog-navButton"
  }, "Cabe\xE7alho"), /*#__PURE__*/_react.default.createElement("button", {
    className: "ServiceLog-navButton"
  }, "Request"), /*#__PURE__*/_react.default.createElement("button", {
    className: "ServiceLog-navButton"
  }, "Response"), /*#__PURE__*/_react.default.createElement("button", {
    className: "ServiceLog-navButton"
  }, "Mensagem"), /*#__PURE__*/_react.default.createElement("button", {
    className: "ServiceLog-navButton"
  }, "Email"), /*#__PURE__*/_react.default.createElement("button", {
    className: "ServiceLog-navButton"
  }, "Mock")), /*#__PURE__*/_react.default.createElement("div", {
    className: "Service-payloads"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "Service-payload"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "Service-payloadCode"
  }, /*#__PURE__*/_react.default.createElement(_reactSyntaxHighlighter.default, {
    language: props.type,
    style: _hljs.magula
  }, props.request))), /*#__PURE__*/_react.default.createElement("div", {
    className: "Service-payload"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "Service-payloadCode"
  }, /*#__PURE__*/_react.default.createElement(_reactSyntaxHighlighter.default, {
    language: props.type,
    style: _hljs.magula
  }, props.response))))));
}
},{}],"ServiceLog/LogGroup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LogGroup;

var _react = _interopRequireWildcard(require("react"));

var _LogRequests = _interopRequireDefault(require("./LogRequests"));

var _LogInfo = _interopRequireDefault(require("./LogInfo"));

var _LogRequest = _interopRequireDefault(require("./LogRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const exampleString = `{
  "active": true,
  "name": "Edward Norton",
  "createdAt": 1265068800000,
  "updatedAt": 1288322480000,
  "history": [{
    "id": "233421",
    "type": "product"
  }]
}`;

function LogGroup(props) {
  const [record, setRecord] = (0, _react.useState)(null);

  const handleClick = clickedRecord => {
    if (record && record.id === clickedRecord.id) {
      return setRecord(null);
    }

    setRecord({ ...clickedRecord
    });
  };

  return /*#__PURE__*/_react.default.createElement("article", {
    className: "ServiceLog-group"
  }, /*#__PURE__*/_react.default.createElement("header", {
    className: "ServiceLog-header"
  }, /*#__PURE__*/_react.default.createElement(_LogInfo.default, {
    infobox: props.group.infobox
  }), /*#__PURE__*/_react.default.createElement(_LogRequests.default, {
    activeRecord: record,
    records: props.group.records,
    onClick: handleClick
  })), record && /*#__PURE__*/_react.default.createElement(_LogRequest.default, record));
}
},{"./LogRequests":"ServiceLog/LogRequests.js","./LogInfo":"ServiceLog/LogInfo.js","./LogRequest":"ServiceLog/LogRequest.js"}],"ServiceLog/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGroupsFromRows = createGroupsFromRows;

var _lodash = _interopRequireDefault(require("lodash.sortby"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createGroupsFromRows(rows) {
  const result = [];
  const cache = {};
  (0, _lodash.default)(rows, record => record.requestTime.epoch).reverse().forEach(record => {
    const {
      group
    } = record;

    if (!cache[group]) {
      cache[group] = {
        group,
        infobox: [],
        records: []
      };
      result.push(cache[group]);
    }

    cache[group].infobox = record.infobox;
    cache[group].records.push(record);
  });
  return result;
}
},{}],"ServiceLog/index.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"ServiceLog/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ServiceLog;

var _react = _interopRequireDefault(require("react"));

var _LogGroup = _interopRequireDefault(require("./LogGroup"));

var _utils = require("./utils");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ServiceLog(props) {
  const groups = (0, _utils.createGroupsFromRows)(props.rows);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "ServiceLog"
  }, groups.map((group, index) => /*#__PURE__*/_react.default.createElement(_LogGroup.default, {
    key: index,
    group: group
  })));
}
},{"./LogGroup":"ServiceLog/LogGroup.js","./utils":"ServiceLog/utils.js","./index.css":"ServiceLog/index.css"}],"sampleRows.js":[function(require,module,exports) {
module.exports = [{
  infobox: [{
    key: 'ID',
    value: '1'
  }],
  id: '1',
  group: '1',
  name: 'GetCustomerInfo',
  alias: 'Edward Norton',
  endpoint: 'http://example.com/customer',
  request: '{"id":"3","role":"customer"}',
  response: '{"active":true,"name":"Edward Norton","createdAt":1265068800000,"updatedAt":1288322480000,"history":[{"id":"233421","type":"product"}]}',
  type: 'json',
  icon: '✔️',
  requestTime: {
    epoch: +new Date('2010/10/01 23:15:00'),
    dateText: '01/10/2010',
    timeText: '23:15:00'
  },
  responseTime: {
    epoch: +new Date('2010/10/01 23:16:10'),
    dateText: '01/10/2010',
    timeText: '23:16:10'
  }
}, {
  infobox: [{
    key: 'ID',
    value: '1'
  }],
  id: '2',
  group: '1',
  name: 'GetCustomerInfo',
  alias: 'John Doe',
  endpoint: 'http://example.com/customer',
  request: '{"id":"4","role":"customer"}',
  response: '{"active":false,"name":"John Doe","createdAt":1265068800000,"updatedAt":1288322480000,"history":[{"id":"13348","type":"product"}]}',
  type: 'json',
  icon: '❌',
  requestTime: {
    epoch: +new Date('2010/10/01 23:23:00'),
    dateText: '01/10/2010',
    timeText: '23:23:00'
  },
  responseTime: {
    epoch: +new Date('2010/10/01 23:23:34'),
    dateText: '01/10/2010',
    timeText: '23:23:34'
  }
}, {
  infobox: [{
    key: 'ID',
    value: '2'
  }],
  id: '3',
  group: '2',
  name: 'CreateProduct',
  endpoint: 'http://example.com/product',
  request: '{"product":{"name":"Wireless Mice","price":123.03,"discount":null},"settings":{"enabled":false}}',
  response: '{"status":"created","id":"4348323"}',
  type: 'json',
  requestTime: {
    epoch: +new Date('2010/10/01 23:15:00'),
    dateText: '01/10/2010',
    timeText: '23:15:00'
  },
  responseTime: {
    epoch: +new Date('2010/10/01 23:16:10'),
    dateText: '01/10/2010',
    timeText: '23:16:10'
  }
}, {
  infobox: [{
    key: 'ID',
    value: '2'
  }],
  info: [{
    key: 'Description',
    value: 'For this status, the product is not available to buy, you should offer other stuff.'
  }, {
    key: 'Reasons for this error',
    value: ['The database connection is down;', 'The product is disabled;', 'The product is out of its buy period.']
  }],
  alerts: ['This service should not be called too many times in your script.', 'This is a testing API, it should not be used in production.'],
  errors: ['The token key was not passed in the request, this should return an error!'],
  id: '4',
  group: '2',
  name: 'ValidateProduct',
  endpoint: 'http://example.com/product/validate',
  request: '{"id":"4348323"}',
  response: '{"status":"created","statusText":"This product is not available right now."}',
  type: 'json',
  highlight: true,
  requestTime: {
    epoch: +new Date('2010/10/01 23:16:15'),
    dateText: '01/10/2010',
    timeText: '23:16:15'
  },
  responseTime: {
    epoch: +new Date('2010/10/01 23:16:23'),
    dateText: '01/10/2010',
    timeText: '23:16:23'
  }
}, {
  infobox: [{
    key: 'ID',
    value: '1'
  }],
  id: '5',
  group: '1',
  name: 'GetCustomerInfo',
  alias: 'Edward Norton',
  endpoint: 'http://example.com/customer',
  request: '{"id":"3","role":"customer"}',
  response: '{"active":true,"name":"Edward Norton","createdAt":1265068800000,"updatedAt":1288322480000,"history":[{"id":"233421","type":"product"}]}',
  type: 'json',
  icon: '✔️',
  requestTime: {
    epoch: +new Date('2010/10/01 23:26:30'),
    dateText: '01/10/2010',
    timeText: '23:26:30'
  },
  responseTime: {
    epoch: +new Date('2010/10/01 23:26:55'),
    dateText: '01/10/2010',
    timeText: '23:26:55'
  }
}, {
  infobox: [{
    key: 'ID',
    value: '2'
  }],
  id: '6',
  group: '2',
  name: 'GetProducts',
  endpoint: 'http://example.com/product/validate',
  request: '<request><client-id>3</client-id></request>',
  response: '<response><product><name>iPineapple Phone 3X</name><price>122.0</price></product></response>',
  type: 'xml',
  requestTime: {
    epoch: +new Date('2010/10/01 23:40:15'),
    dateText: '01/10/2010',
    timeText: '23:40:15'
  },
  responseTime: {
    epoch: +new Date('2010/10/01 23:40:23'),
    dateText: '01/10/2010',
    timeText: '23:40:23'
  }
}];
},{}],"App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _react = _interopRequireDefault(require("react"));

var _Tabs = _interopRequireDefault(require("./Tabs"));

var _ServiceLog = _interopRequireDefault(require("./ServiceLog"));

var _sampleRows = _interopRequireDefault(require("./sampleRows"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App() {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Tabs.default, null), /*#__PURE__*/_react.default.createElement(_ServiceLog.default, {
    rows: _sampleRows.default
  }));
}
},{"./Tabs":"Tabs.js","./ServiceLog":"ServiceLog/index.js","./sampleRows":"sampleRows.js"}],"styles/index.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _App = _interopRequireDefault(require("./App"));

require("./styles/index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom.default.render( /*#__PURE__*/_react.default.createElement(_App.default, null), document.getElementById('root'));
},{"./App":"App.js","./styles/index.css":"styles/index.css"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = process.env.HMR_HOSTNAME || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + process.env.HMR_PORT + '/');
  ws.onmessage = function(event) {
    checkedAssets = {};
    assetsToAccept = [];

    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function(asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function(asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();

        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) { // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = (
    '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' +
      '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' +
      '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' +
      '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' +
      '<pre>' + stackTrace.innerHTML + '</pre>' +
    '</div>'
  );

  return overlay;

}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;

  var cached = bundle.cache[id];

  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id)
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}

},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=src.e31bb0bc.js.map