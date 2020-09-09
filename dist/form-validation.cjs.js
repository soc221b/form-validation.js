'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var e=function(){return (e=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var c in t=arguments[r])Object.prototype.hasOwnProperty.call(t,c)&&(e[c]=t[c]);return e}).apply(this,arguments)};function t(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var n=Array(e),c=0;for(t=0;t<r;t++)for(var a=arguments[t],o=0,l=a.length;o<l;o++,c++)n[c]=a[o];return n}var r=Object.prototype.toString,n=function(e){return "[object Object]"===r.call(e)},c=function(e){return Array.isArray(e)},a=Object.prototype.hasOwnProperty,o=function(e,t){return a.call(e,t)},s="__detto_path__",p=function(e){Object.defineProperty(e,"__detto_ob__",{enumerable:!1,configurable:!0,writable:!0,value:e});},u=function(e,t){Object.defineProperty(e,s,{enumerable:!1,configurable:!0,writable:!0,value:t});},i=/^\d+$/,h=function(e,t,r,a){if(a(t,r),!1!==n(e)||!1!==c(e))for(var o=new Set(Object.keys(e)),l=0,f=Object.keys(t).filter((function(e){return o.has(e)}));l<f.length;l++){var s=f[l];h(e[s],t[s],r.concat(s),a);}},v=function(e){var t=e.object,r=e.detto,n=e.callback;return d({object:t,detto:r,path:[],callback:void 0===n?function(){}:n})},g=new Set(["pop","push","shift","unshift","splice","reverse"]),b=new WeakMap,y=new WeakMap,d=function(r){var a=r.object,l=r.detto,f=r.path,v=r.callback;if(o(a,"__detto_ob__"))return a;p(a),u(l,f),v(l,f);for(var k={deleteProperty:function(e,t){return null===O&&(Reflect.deleteProperty(l,t),v(l,f),j(e[t])),Reflect.deleteProperty(e,t)}},O=null,R=[],w=[],P=0,x=0,I=function(){O=null,R.length=0,w.length=0,P=0,x=0;},m={set:function(e,r,a,p){if("pop"===O)return "length"===r&&(l.pop(),l[r]=a,v(l,f),I()),Reflect.set(e,r,a,p);if("push"===O){if("length"===r){var g=R.pop(),b=n(g),y=c(g),j=l.length+"";l.push(y?[]:{}),u(l[j],f.concat(j)),l[r]=a,v(l,f),b||y?Reflect.set(e,j,d({object:g,detto:l[j],path:f.concat(j),callback:v}),p):v(l[j],f.concat(j)),I();}else R.push(a);return Reflect.set(e,r,a,p)}if("shift"===O){if("length"===r){for(var k=0,m=Object.keys(e);k<m.length;k++){var M=m[k],S=(T=parseInt(M,10))+1+"";l[M]=l[S];}l.pop(),l[r]=a,h(e,l,f,(function(e,r){var n;(n=e[s]).splice.apply(n,t([0,r.length],r));})),h(e,l,f,(function(e,t){v(e,t);})),I();}return Reflect.set(e,r,a,p)}if("unshift"===O){if("length"===r){var A=R.pop();b=n(A),y=c(A);l.reverse(),l.push(y?[]:{}),l.reverse(),u(l[0],f.concat("0")),l[r]=a,h(e,l,f,(function(e,r){var n;(n=e[s]).splice.apply(n,t([0,r.length],r));})),v(l,f),b||y?Reflect.set(e,0,d({object:A,detto:l[0],path:f.concat("0"),callback:v}),p):v(l[0],f.concat("0"));for(var W=0,$=Object.keys(e);W<$.length;W++){var q=$[W];"0"!==q&&h(e[q],l[q],f.concat(q),(function(e,t){v(e,t);}));}I();}else R.push(a);return Reflect.set(e,r,a,p)}if("splice"===O){if("length"===r){for(var z=[],B=[],C=null,D="-1",E=0,F=w;E<F.length;E++){var G=F[E],H=G[0],J=G[1];"set"===H&&("get"===C&&parseInt(J,10)>parseInt(D,10)?(z.push(J),l[J]=l[D]):(B.push(J),l[J]=c(e[J])?[]:{},u(l[J],f.concat(J)))),C=H,D=J;}z.sort(),l[r]=a;var K=z.map((function(e){return parseInt(e,10)})),L=B.map((function(e){return parseInt(e,10)})),N=parseInt(a,10)-1,Q=Math.min.apply(Math,t(K,L)),T=void 0;for(T=Q-1;++T<=N;){var U=T+"";h(e[U],l[U],f.concat(U),(function(e,r){var n;(n=e[s]).splice.apply(n,t([0,r.length],r));}));}for(v(l,f),T=Q-1;++T<=N;){var V=T+"";b=n(e[V]),y=c(e[V]);b||y?e[V]=d({object:e[V],detto:l[V],path:f.concat(V),callback:v}):(!1===o(l,V)&&(l[V]={},u(l[V],f.concat(V))),v(l[V],f.concat(V)));}for(T=Q-1;++T<=N;){var X=T+"";e[X]=_(e[X]);}I();}else w.push(["set",r,a]);return Reflect.set(e,r,a,p)}if("reverse"===O){if(++P>=x){var Y=l.length,Z=Math.floor(Y/2);for(T=-1;++T<Z;){var ee=l[T];l[T]=l[Y-T-1],l[Y-T-1]=ee;}for(h(e,l,l[s],(function(e,r){var n;(n=e[s]).splice.apply(n,t([0,r.length],r));})),v(l,f),T=-1;++T<Y;)Y%2==1&&T===Z||h(e[T],l[T],l[T][s],(function(e,t){v(e,t);}));I();}return Reflect.set(e,r,a,p)}b=n(a),y=c(a);return "string"!=typeof r||"length"===r||!1===i.test(r)?l[r]=a:b||y?(!1!==o(l,r)&&y===c(l[r])||(l[r]=y?[]:{}),a=d({object:a,detto:l[r],path:f.concat(r),callback:v})):(!1===o(l,r)&&(l[r]={},u(l[r],f.concat(r))),v(l[r],f.concat(r))),Reflect.set(e,r,a,p)},get:function(e,t,r){var n=Reflect.get(e,t,r);if("string"!=typeof t||!1===g.has(t)&&"length"!==t&&!1===i.test(t))return n;switch(t){default:"reverse"===O&&("length"===t?(x=2*n,n%2==1&&(x-=2),n<=1&&I()):++P),O&&["push","unshift"].includes(O)&&"length"!==t?R.push(n):"splice"===O&&"length"!==t&&w.push(["get",t]),i.test(t)&&("splice"===O||"pop"===O||"shift"===O&&"0"===t)&&(n=j(n));break;case"pop":case"push":case"shift":case"unshift":case"splice":case"reverse":O=t;}return n}},M={set:function(e,t,r,a){var s=n(r),p=c(r);return s||p?(!1!==o(l,t)&&p===c(l[t])||(l[t]=p?[]:{},u(l[t],f.concat(t))),r=d({object:r,detto:l[t],path:f.concat(t),callback:v})):(!1===o(l,t)&&(l[t]={},u(l[t],f.concat(t))),v(l[t],f.concat(t))),Reflect.set(e,t,r,a)}},S=c(a),A=S?Proxy.revocable(a,e(e({},k),m)):Proxy.revocable(a,e(e({},k),M)),W=Object.keys(a),$=new Set(W),q=0,z=W;q<z.length;q++){var B=z[q];A.proxy[B]=a[B];}for(var C=0,D=Object.keys(l);C<D.length;C++){B=D[C];!1===$.has(B)&&"string"==typeof B&&i.test(B)&&delete l[B];}return S&&(l.length=a.length),b.set(A.proxy,a),y.set(a,A.proxy),A.proxy},j=function(e){if(!1===b.has(e))return e;var t=b.get(e);delete t.__detto_ob__;for(var r=0,n=Object.keys(e);r<n.length;r++){var c=n[r];t[c]=j(e[c]);}return t},_=function(e){if(!1===y.has(e))return e;var t=y.get(e);p(t);for(var r=0,n=Object.keys(e);r<n.length;r++){var c=n[r];e[c]=_(t[c]);}return t};

function toString(object) {
    return Object.prototype.toString.call(object);
}
function isPlainObject(object) {
    return toString(object) === '[object Object]';
}
function isArray(object) {
    return toString(object) === '[object Array]';
}
function isFunction(object) {
    return typeof object === 'function';
}
function isPromise(object) {
    return object !== null && typeof object === 'object' && isFunction(object.then);
}
function hasOwnKey(object, key) {
    return object.hasOwnProperty(key);
}
function getOwnKeys(object) {
    if (isPlainObject(object) === false && isArray(object) === false)
        return [];
    return Object.keys(object);
}
function getByPath(object, path) {
    if (path.length === 0)
        return object;
    var deepestParent = object;
    path.slice(0, -1).forEach(function (p) {
        deepestParent = deepestParent[p];
    });
    return deepestParent[path[path.length - 1]];
}
function noop() {
    var _ = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _[_i] = arguments[_i];
    }
}

// TODO: performance impact
var normalizeSchema = function (schema) {
    var defaultSchema = getDefaultSchema();
    if (schema.$params === undefined)
        schema.$params = defaultSchema.$params;
    if (schema.$normalizer === undefined)
        schema.$normalizer = defaultSchema.$normalizer;
    if (schema.$rules === undefined)
        schema.$rules = defaultSchema.$rules;
    if (schema.$messages === undefined)
        schema.$messages = defaultSchema.$messages;
    for (var _i = 0, _a = getOwnKeys(schema.$rules); _i < _a.length; _i++) {
        var key = _a[_i];
        if (hasOwnKey(schema.$messages, key) === false) {
            schema.$messages[key] = noop;
        }
    }
    for (var _b = 0, _c = getOwnKeys(schema); _b < _c.length; _b++) {
        var key = _c[_b];
        if (hasOwnKey(defaultSchema, key))
            continue;
        schema[key] = normalizeSchema(schema[key]);
    }
    return schema;
};
var getSchema = function (_a) {
    var rootSchema = _a.rootSchema, path = _a.path;
    var schema = _getSchema({ rootSchema: rootSchema, path: path.slice(), startIndex: 0 });
    if (schema) {
        return schema;
    }
    var defaultSchema = getDefaultSchema();
    defaultSchema.$noSchemaSpecified = true;
    return defaultSchema;
};
var _getSchema = function (_a) {
    var rootSchema = _a.rootSchema, path = _a.path, startIndex = _a.startIndex;
    var schema = null;
    if (startIndex === path.length) {
        try {
            schema = getByPath(rootSchema, path);
        }
        catch (error) { }
        if (schema && schema.$rules)
            return schema;
        return null;
    }
    // dedicate
    schema = _getSchema({ rootSchema: rootSchema, path: path, startIndex: startIndex + 1 });
    if (schema !== null)
        return schema;
    // iter
    var oldKey = path[startIndex];
    path[startIndex] = '$iter';
    schema = _getSchema({ rootSchema: rootSchema, path: path, startIndex: startIndex + 1 });
    if (schema !== null)
        return schema;
    path[startIndex] = oldKey;
    return null;
};
var getDefaultSchema = function () {
    return {
        $noSchemaSpecified: false,
        $params: {},
        $normalizer: function (_a) {
            var value = _a.value;
            return value;
        },
        $rules: {},
        $messages: {},
    };
};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var global$1 = (typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {});

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var inited = false;
function init () {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

function toByteArray (b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('')
}

function read (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

function write (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
}

var toString$1 = {}.toString;

var isArray$1 = Array.isArray || function (arr) {
  return toString$1.call(arr) == '[object Array]';
};

var INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
  ? global$1.TYPED_ARRAY_SUPPORT
  : true;

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr
};

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
};

function allocUnsafe (that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
};

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that
}

function fromObject (that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len);
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray$1(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}
Buffer.isBuffer = isBuffer;
function internalIsBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
};

Buffer.concat = function concat (list, length) {
  if (!isArray$1(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString (encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap (b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer.prototype.toString = function toString () {
  var length = this.length | 0;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer.prototype.equals = function equals (b) {
  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
};

Buffer.prototype.inspect = function inspect () {
  var str = '';
  var max = INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>'
};

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (internalIsBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
};

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed;
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf)
  } else {
    return fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val
};

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4)
};

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4)
};

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8)
};

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = (value & 0xff);
  return offset + 1
};

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24);
    this[offset + 2] = (value >>> 16);
    this[offset + 1] = (value >>> 8);
    this[offset] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    this[offset + 2] = (value >>> 16);
    this[offset + 3] = (value >>> 24);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = internalIsBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}


function base64ToBytes (str) {
  return toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
}

function isFastBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
}

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

var inherits;
if (typeof Object.create === 'function'){
  inherits = function inherits(ctor, superCtor) {
    // implementation from standard node.js 'util' module
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  inherits = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}
var inherits$1 = inherits;

var formatRegExp = /%[sdj%]/g;
function format(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
}

// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
function deprecate(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global$1.process)) {
    return function() {
      return deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

var debugs = {};
var debugEnviron;
function debuglog(set) {
  if (isUndefined(debugEnviron))
    debugEnviron =  '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = 0;
      debugs[set] = function() {
        var msg = format.apply(null, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
}

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    _extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}

// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction$1(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction$1(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray$2(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction$1(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var length = output.reduce(function(prev, cur) {
    if (cur.indexOf('\n') >= 0) ;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray$2(ar) {
  return Array.isArray(ar);
}

function isBoolean(arg) {
  return typeof arg === 'boolean';
}

function isNull(arg) {
  return arg === null;
}

function isNullOrUndefined(arg) {
  return arg == null;
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isString(arg) {
  return typeof arg === 'string';
}

function isSymbol(arg) {
  return typeof arg === 'symbol';
}

function isUndefined(arg) {
  return arg === void 0;
}

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}

function isFunction$1(arg) {
  return typeof arg === 'function';
}

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}

function isBuffer$1(maybeBuf) {
  return isBuffer(maybeBuf);
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
function log() {
  console.log('%s - %s', timestamp(), format.apply(null, arguments));
}

function _extend(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var util = {
  inherits: inherits$1,
  _extend: _extend,
  log: log,
  isBuffer: isBuffer$1,
  isPrimitive: isPrimitive,
  isFunction: isFunction$1,
  isError: isError,
  isDate: isDate,
  isObject: isObject,
  isRegExp: isRegExp,
  isUndefined: isUndefined,
  isSymbol: isSymbol,
  isString: isString,
  isNumber: isNumber,
  isNullOrUndefined: isNullOrUndefined,
  isNull: isNull,
  isBoolean: isBoolean,
  isArray: isArray$2,
  inspect: inspect,
  deprecate: deprecate,
  format: format,
  debuglog: debuglog
};

var util$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    format: format,
    deprecate: deprecate,
    debuglog: debuglog,
    inspect: inspect,
    isArray: isArray$2,
    isBoolean: isBoolean,
    isNull: isNull,
    isNullOrUndefined: isNullOrUndefined,
    isNumber: isNumber,
    isString: isString,
    isSymbol: isSymbol,
    isUndefined: isUndefined,
    isRegExp: isRegExp,
    isObject: isObject,
    isDate: isDate,
    isError: isError,
    isFunction: isFunction$1,
    isPrimitive: isPrimitive,
    isBuffer: isBuffer$1,
    log: log,
    inherits: inherits$1,
    _extend: _extend,
    'default': util
});

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

class Hook {
	constructor(args) {
		if (!Array.isArray(args)) args = [];
		this._args = args;
		this.taps = [];
		this.interceptors = [];
		this.call = this._call;
		this.promise = this._promise;
		this.callAsync = this._callAsync;
		this._x = undefined;
	}

	compile(options) {
		throw new Error("Abstract: should be overriden");
	}

	_createCall(type) {
		return this.compile({
			taps: this.taps,
			interceptors: this.interceptors,
			args: this._args,
			type: type
		});
	}

	tap(options, fn) {
		if (typeof options === "string") options = { name: options };
		if (typeof options !== "object" || options === null)
			throw new Error(
				"Invalid arguments to tap(options: Object, fn: function)"
			);
		options = Object.assign({ type: "sync", fn: fn }, options);
		if (typeof options.name !== "string" || options.name === "")
			throw new Error("Missing name for tap");
		options = this._runRegisterInterceptors(options);
		this._insert(options);
	}

	tapAsync(options, fn) {
		if (typeof options === "string") options = { name: options };
		if (typeof options !== "object" || options === null)
			throw new Error(
				"Invalid arguments to tapAsync(options: Object, fn: function)"
			);
		options = Object.assign({ type: "async", fn: fn }, options);
		if (typeof options.name !== "string" || options.name === "")
			throw new Error("Missing name for tapAsync");
		options = this._runRegisterInterceptors(options);
		this._insert(options);
	}

	tapPromise(options, fn) {
		if (typeof options === "string") options = { name: options };
		if (typeof options !== "object" || options === null)
			throw new Error(
				"Invalid arguments to tapPromise(options: Object, fn: function)"
			);
		options = Object.assign({ type: "promise", fn: fn }, options);
		if (typeof options.name !== "string" || options.name === "")
			throw new Error("Missing name for tapPromise");
		options = this._runRegisterInterceptors(options);
		this._insert(options);
	}

	_runRegisterInterceptors(options) {
		for (const interceptor of this.interceptors) {
			if (interceptor.register) {
				const newOptions = interceptor.register(options);
				if (newOptions !== undefined) options = newOptions;
			}
		}
		return options;
	}

	withOptions(options) {
		const mergeOptions = opt =>
			Object.assign({}, options, typeof opt === "string" ? { name: opt } : opt);

		// Prevent creating endless prototype chains
		options = Object.assign({}, options, this._withOptions);
		const base = this._withOptionsBase || this;
		const newHook = Object.create(base);

		(newHook.tapAsync = (opt, fn) => base.tapAsync(mergeOptions(opt), fn)),
			(newHook.tap = (opt, fn) => base.tap(mergeOptions(opt), fn));
		newHook.tapPromise = (opt, fn) => base.tapPromise(mergeOptions(opt), fn);
		newHook._withOptions = options;
		newHook._withOptionsBase = base;
		return newHook;
	}

	isUsed() {
		return this.taps.length > 0 || this.interceptors.length > 0;
	}

	intercept(interceptor) {
		this._resetCompilation();
		this.interceptors.push(Object.assign({}, interceptor));
		if (interceptor.register) {
			for (let i = 0; i < this.taps.length; i++)
				this.taps[i] = interceptor.register(this.taps[i]);
		}
	}

	_resetCompilation() {
		this.call = this._call;
		this.callAsync = this._callAsync;
		this.promise = this._promise;
	}

	_insert(item) {
		this._resetCompilation();
		let before;
		if (typeof item.before === "string") before = new Set([item.before]);
		else if (Array.isArray(item.before)) {
			before = new Set(item.before);
		}
		let stage = 0;
		if (typeof item.stage === "number") stage = item.stage;
		let i = this.taps.length;
		while (i > 0) {
			i--;
			const x = this.taps[i];
			this.taps[i + 1] = x;
			const xStage = x.stage || 0;
			if (before) {
				if (before.has(x.name)) {
					before.delete(x.name);
					continue;
				}
				if (before.size > 0) {
					continue;
				}
			}
			if (xStage > stage) {
				continue;
			}
			i++;
			break;
		}
		this.taps[i] = item;
	}
}

function createCompileDelegate(name, type) {
	return function lazyCompileHook(...args) {
		this[name] = this._createCall(type);
		return this[name](...args);
	};
}

Object.defineProperties(Hook.prototype, {
	_call: {
		value: createCompileDelegate("call", "sync"),
		configurable: true,
		writable: true
	},
	_promise: {
		value: createCompileDelegate("promise", "promise"),
		configurable: true,
		writable: true
	},
	_callAsync: {
		value: createCompileDelegate("callAsync", "async"),
		configurable: true,
		writable: true
	}
});

var Hook_1 = Hook;

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

class HookCodeFactory {
	constructor(config) {
		this.config = config;
		this.options = undefined;
		this._args = undefined;
	}

	create(options) {
		this.init(options);
		let fn;
		switch (this.options.type) {
			case "sync":
				fn = new Function(
					this.args(),
					'"use strict";\n' +
						this.header() +
						this.content({
							onError: err => `throw ${err};\n`,
							onResult: result => `return ${result};\n`,
							resultReturns: true,
							onDone: () => "",
							rethrowIfPossible: true
						})
				);
				break;
			case "async":
				fn = new Function(
					this.args({
						after: "_callback"
					}),
					'"use strict";\n' +
						this.header() +
						this.content({
							onError: err => `_callback(${err});\n`,
							onResult: result => `_callback(null, ${result});\n`,
							onDone: () => "_callback();\n"
						})
				);
				break;
			case "promise":
				let errorHelperUsed = false;
				const content = this.content({
					onError: err => {
						errorHelperUsed = true;
						return `_error(${err});\n`;
					},
					onResult: result => `_resolve(${result});\n`,
					onDone: () => "_resolve();\n"
				});
				let code = "";
				code += '"use strict";\n';
				code += "return new Promise((_resolve, _reject) => {\n";
				if (errorHelperUsed) {
					code += "var _sync = true;\n";
					code += "function _error(_err) {\n";
					code += "if(_sync)\n";
					code += "_resolve(Promise.resolve().then(() => { throw _err; }));\n";
					code += "else\n";
					code += "_reject(_err);\n";
					code += "};\n";
				}
				code += this.header();
				code += content;
				if (errorHelperUsed) {
					code += "_sync = false;\n";
				}
				code += "});\n";
				fn = new Function(this.args(), code);
				break;
		}
		this.deinit();
		return fn;
	}

	setup(instance, options) {
		instance._x = options.taps.map(t => t.fn);
	}

	/**
	 * @param {{ type: "sync" | "promise" | "async", taps: Array<Tap>, interceptors: Array<Interceptor> }} options
	 */
	init(options) {
		this.options = options;
		this._args = options.args.slice();
	}

	deinit() {
		this.options = undefined;
		this._args = undefined;
	}

	header() {
		let code = "";
		if (this.needContext()) {
			code += "var _context = {};\n";
		} else {
			code += "var _context;\n";
		}
		code += "var _x = this._x;\n";
		if (this.options.interceptors.length > 0) {
			code += "var _taps = this.taps;\n";
			code += "var _interceptors = this.interceptors;\n";
		}
		for (let i = 0; i < this.options.interceptors.length; i++) {
			const interceptor = this.options.interceptors[i];
			if (interceptor.call) {
				code += `${this.getInterceptor(i)}.call(${this.args({
					before: interceptor.context ? "_context" : undefined
				})});\n`;
			}
		}
		return code;
	}

	needContext() {
		for (const tap of this.options.taps) if (tap.context) return true;
		return false;
	}

	callTap(tapIndex, { onError, onResult, onDone, rethrowIfPossible }) {
		let code = "";
		let hasTapCached = false;
		for (let i = 0; i < this.options.interceptors.length; i++) {
			const interceptor = this.options.interceptors[i];
			if (interceptor.tap) {
				if (!hasTapCached) {
					code += `var _tap${tapIndex} = ${this.getTap(tapIndex)};\n`;
					hasTapCached = true;
				}
				code += `${this.getInterceptor(i)}.tap(${
					interceptor.context ? "_context, " : ""
				}_tap${tapIndex});\n`;
			}
		}
		code += `var _fn${tapIndex} = ${this.getTapFn(tapIndex)};\n`;
		const tap = this.options.taps[tapIndex];
		switch (tap.type) {
			case "sync":
				if (!rethrowIfPossible) {
					code += `var _hasError${tapIndex} = false;\n`;
					code += "try {\n";
				}
				if (onResult) {
					code += `var _result${tapIndex} = _fn${tapIndex}(${this.args({
						before: tap.context ? "_context" : undefined
					})});\n`;
				} else {
					code += `_fn${tapIndex}(${this.args({
						before: tap.context ? "_context" : undefined
					})});\n`;
				}
				if (!rethrowIfPossible) {
					code += "} catch(_err) {\n";
					code += `_hasError${tapIndex} = true;\n`;
					code += onError("_err");
					code += "}\n";
					code += `if(!_hasError${tapIndex}) {\n`;
				}
				if (onResult) {
					code += onResult(`_result${tapIndex}`);
				}
				if (onDone) {
					code += onDone();
				}
				if (!rethrowIfPossible) {
					code += "}\n";
				}
				break;
			case "async":
				let cbCode = "";
				if (onResult) cbCode += `(_err${tapIndex}, _result${tapIndex}) => {\n`;
				else cbCode += `_err${tapIndex} => {\n`;
				cbCode += `if(_err${tapIndex}) {\n`;
				cbCode += onError(`_err${tapIndex}`);
				cbCode += "} else {\n";
				if (onResult) {
					cbCode += onResult(`_result${tapIndex}`);
				}
				if (onDone) {
					cbCode += onDone();
				}
				cbCode += "}\n";
				cbCode += "}";
				code += `_fn${tapIndex}(${this.args({
					before: tap.context ? "_context" : undefined,
					after: cbCode
				})});\n`;
				break;
			case "promise":
				code += `var _hasResult${tapIndex} = false;\n`;
				code += `var _promise${tapIndex} = _fn${tapIndex}(${this.args({
					before: tap.context ? "_context" : undefined
				})});\n`;
				code += `if (!_promise${tapIndex} || !_promise${tapIndex}.then)\n`;
				code += `  throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise${tapIndex} + ')');\n`;
				code += `_promise${tapIndex}.then(_result${tapIndex} => {\n`;
				code += `_hasResult${tapIndex} = true;\n`;
				if (onResult) {
					code += onResult(`_result${tapIndex}`);
				}
				if (onDone) {
					code += onDone();
				}
				code += `}, _err${tapIndex} => {\n`;
				code += `if(_hasResult${tapIndex}) throw _err${tapIndex};\n`;
				code += onError(`_err${tapIndex}`);
				code += "});\n";
				break;
		}
		return code;
	}

	callTapsSeries({
		onError,
		onResult,
		resultReturns,
		onDone,
		doneReturns,
		rethrowIfPossible
	}) {
		if (this.options.taps.length === 0) return onDone();
		const firstAsync = this.options.taps.findIndex(t => t.type !== "sync");
		const somethingReturns = resultReturns || doneReturns || false;
		let code = "";
		let current = onDone;
		for (let j = this.options.taps.length - 1; j >= 0; j--) {
			const i = j;
			const unroll = current !== onDone && this.options.taps[i].type !== "sync";
			if (unroll) {
				code += `function _next${i}() {\n`;
				code += current();
				code += `}\n`;
				current = () => `${somethingReturns ? "return " : ""}_next${i}();\n`;
			}
			const done = current;
			const doneBreak = skipDone => {
				if (skipDone) return "";
				return onDone();
			};
			const content = this.callTap(i, {
				onError: error => onError(i, error, done, doneBreak),
				onResult:
					onResult &&
					(result => {
						return onResult(i, result, done, doneBreak);
					}),
				onDone: !onResult && done,
				rethrowIfPossible:
					rethrowIfPossible && (firstAsync < 0 || i < firstAsync)
			});
			current = () => content;
		}
		code += current();
		return code;
	}

	callTapsLooping({ onError, onDone, rethrowIfPossible }) {
		if (this.options.taps.length === 0) return onDone();
		const syncOnly = this.options.taps.every(t => t.type === "sync");
		let code = "";
		if (!syncOnly) {
			code += "var _looper = () => {\n";
			code += "var _loopAsync = false;\n";
		}
		code += "var _loop;\n";
		code += "do {\n";
		code += "_loop = false;\n";
		for (let i = 0; i < this.options.interceptors.length; i++) {
			const interceptor = this.options.interceptors[i];
			if (interceptor.loop) {
				code += `${this.getInterceptor(i)}.loop(${this.args({
					before: interceptor.context ? "_context" : undefined
				})});\n`;
			}
		}
		code += this.callTapsSeries({
			onError,
			onResult: (i, result, next, doneBreak) => {
				let code = "";
				code += `if(${result} !== undefined) {\n`;
				code += "_loop = true;\n";
				if (!syncOnly) code += "if(_loopAsync) _looper();\n";
				code += doneBreak(true);
				code += `} else {\n`;
				code += next();
				code += `}\n`;
				return code;
			},
			onDone:
				onDone &&
				(() => {
					let code = "";
					code += "if(!_loop) {\n";
					code += onDone();
					code += "}\n";
					return code;
				}),
			rethrowIfPossible: rethrowIfPossible && syncOnly
		});
		code += "} while(_loop);\n";
		if (!syncOnly) {
			code += "_loopAsync = true;\n";
			code += "};\n";
			code += "_looper();\n";
		}
		return code;
	}

	callTapsParallel({
		onError,
		onResult,
		onDone,
		rethrowIfPossible,
		onTap = (i, run) => run()
	}) {
		if (this.options.taps.length <= 1) {
			return this.callTapsSeries({
				onError,
				onResult,
				onDone,
				rethrowIfPossible
			});
		}
		let code = "";
		code += "do {\n";
		code += `var _counter = ${this.options.taps.length};\n`;
		if (onDone) {
			code += "var _done = () => {\n";
			code += onDone();
			code += "};\n";
		}
		for (let i = 0; i < this.options.taps.length; i++) {
			const done = () => {
				if (onDone) return "if(--_counter === 0) _done();\n";
				else return "--_counter;";
			};
			const doneBreak = skipDone => {
				if (skipDone || !onDone) return "_counter = 0;\n";
				else return "_counter = 0;\n_done();\n";
			};
			code += "if(_counter <= 0) break;\n";
			code += onTap(
				i,
				() =>
					this.callTap(i, {
						onError: error => {
							let code = "";
							code += "if(_counter > 0) {\n";
							code += onError(i, error, done, doneBreak);
							code += "}\n";
							return code;
						},
						onResult:
							onResult &&
							(result => {
								let code = "";
								code += "if(_counter > 0) {\n";
								code += onResult(i, result, done, doneBreak);
								code += "}\n";
								return code;
							}),
						onDone:
							!onResult &&
							(() => {
								return done();
							}),
						rethrowIfPossible
					}),
				done,
				doneBreak
			);
		}
		code += "} while(false);\n";
		return code;
	}

	args({ before, after } = {}) {
		let allArgs = this._args;
		if (before) allArgs = [before].concat(allArgs);
		if (after) allArgs = allArgs.concat(after);
		if (allArgs.length === 0) {
			return "";
		} else {
			return allArgs.join(", ");
		}
	}

	getTapFn(idx) {
		return `_x[${idx}]`;
	}

	getTap(idx) {
		return `_taps[${idx}]`;
	}

	getInterceptor(idx) {
		return `_interceptors[${idx}]`;
	}
}

var HookCodeFactory_1 = HookCodeFactory;

class SyncBailHookCodeFactory extends HookCodeFactory_1 {
	content({ onError, onResult, resultReturns, onDone, rethrowIfPossible }) {
		return this.callTapsSeries({
			onError: (i, err) => onError(err),
			onResult: (i, result, next) =>
				`if(${result} !== undefined) {\n${onResult(
					result
				)};\n} else {\n${next()}}\n`,
			resultReturns,
			onDone,
			rethrowIfPossible
		});
	}
}

const factory = new SyncBailHookCodeFactory();

class SyncBailHook extends Hook_1 {
	tapAsync() {
		throw new Error("tapAsync is not supported on a SyncBailHook");
	}

	tapPromise() {
		throw new Error("tapPromise is not supported on a SyncBailHook");
	}

	compile(options) {
		factory.setup(this, options);
		return factory.create(options);
	}
}

var SyncBailHook_1 = SyncBailHook;

function Tapable() {
	this._pluginCompat = new SyncBailHook_1(["options"]);
	this._pluginCompat.tap(
		{
			name: "Tapable camelCase",
			stage: 100
		},
		options => {
			options.names.add(
				options.name.replace(/[- ]([a-z])/g, (str, ch) => ch.toUpperCase())
			);
		}
	);
	this._pluginCompat.tap(
		{
			name: "Tapable this.hooks",
			stage: 200
		},
		options => {
			let hook;
			for (const name of options.names) {
				hook = this.hooks[name];
				if (hook !== undefined) {
					break;
				}
			}
			if (hook !== undefined) {
				const tapOpt = {
					name: options.fn.name || "unnamed compat plugin",
					stage: options.stage || 0
				};
				if (options.async) hook.tapAsync(tapOpt, options.fn);
				else hook.tap(tapOpt, options.fn);
				return true;
			}
		}
	);
}
var Tapable_1 = Tapable;

Tapable.addCompatLayer = function addCompatLayer(instance) {
	Tapable.call(instance);
	instance.plugin = Tapable.prototype.plugin;
	instance.apply = Tapable.prototype.apply;
};

Tapable.prototype.plugin = util$1.deprecate(function plugin(name, fn) {
	if (Array.isArray(name)) {
		name.forEach(function(name) {
			this.plugin(name, fn);
		}, this);
		return;
	}
	const result = this._pluginCompat.call({
		name: name,
		fn: fn,
		names: new Set([name])
	});
	if (!result) {
		throw new Error(
			`Plugin could not be registered at '${name}'. Hook was not found.\n` +
				"BREAKING CHANGE: There need to exist a hook at 'this.hooks'. " +
				"To create a compatibility layer for this hook, hook into 'this._pluginCompat'."
		);
	}
}, "Tapable.plugin is deprecated. Use new API on `.hooks` instead");

Tapable.prototype.apply = util$1.deprecate(function apply() {
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].apply(this);
	}
}, "Tapable.apply is deprecated. Call apply on the plugin directly instead");

class SyncHookCodeFactory extends HookCodeFactory_1 {
	content({ onError, onDone, rethrowIfPossible }) {
		return this.callTapsSeries({
			onError: (i, err) => onError(err),
			onDone,
			rethrowIfPossible
		});
	}
}

const factory$1 = new SyncHookCodeFactory();

class SyncHook extends Hook_1 {
	tapAsync() {
		throw new Error("tapAsync is not supported on a SyncHook");
	}

	tapPromise() {
		throw new Error("tapPromise is not supported on a SyncHook");
	}

	compile(options) {
		factory$1.setup(this, options);
		return factory$1.create(options);
	}
}

var SyncHook_1 = SyncHook;

class SyncWaterfallHookCodeFactory extends HookCodeFactory_1 {
	content({ onError, onResult, resultReturns, rethrowIfPossible }) {
		return this.callTapsSeries({
			onError: (i, err) => onError(err),
			onResult: (i, result, next) => {
				let code = "";
				code += `if(${result} !== undefined) {\n`;
				code += `${this._args[0]} = ${result};\n`;
				code += `}\n`;
				code += next();
				return code;
			},
			onDone: () => onResult(this._args[0]),
			doneReturns: resultReturns,
			rethrowIfPossible
		});
	}
}

const factory$2 = new SyncWaterfallHookCodeFactory();

class SyncWaterfallHook extends Hook_1 {
	constructor(args) {
		super(args);
		if (args.length < 1)
			throw new Error("Waterfall hooks must have at least one argument");
	}

	tapAsync() {
		throw new Error("tapAsync is not supported on a SyncWaterfallHook");
	}

	tapPromise() {
		throw new Error("tapPromise is not supported on a SyncWaterfallHook");
	}

	compile(options) {
		factory$2.setup(this, options);
		return factory$2.create(options);
	}
}

var SyncWaterfallHook_1 = SyncWaterfallHook;

class SyncLoopHookCodeFactory extends HookCodeFactory_1 {
	content({ onError, onDone, rethrowIfPossible }) {
		return this.callTapsLooping({
			onError: (i, err) => onError(err),
			onDone,
			rethrowIfPossible
		});
	}
}

const factory$3 = new SyncLoopHookCodeFactory();

class SyncLoopHook extends Hook_1 {
	tapAsync() {
		throw new Error("tapAsync is not supported on a SyncLoopHook");
	}

	tapPromise() {
		throw new Error("tapPromise is not supported on a SyncLoopHook");
	}

	compile(options) {
		factory$3.setup(this, options);
		return factory$3.create(options);
	}
}

var SyncLoopHook_1 = SyncLoopHook;

class AsyncParallelHookCodeFactory extends HookCodeFactory_1 {
	content({ onError, onDone }) {
		return this.callTapsParallel({
			onError: (i, err, done, doneBreak) => onError(err) + doneBreak(true),
			onDone
		});
	}
}

const factory$4 = new AsyncParallelHookCodeFactory();

class AsyncParallelHook extends Hook_1 {
	compile(options) {
		factory$4.setup(this, options);
		return factory$4.create(options);
	}
}

Object.defineProperties(AsyncParallelHook.prototype, {
	_call: { value: undefined, configurable: true, writable: true }
});

var AsyncParallelHook_1 = AsyncParallelHook;

class AsyncParallelBailHookCodeFactory extends HookCodeFactory_1 {
	content({ onError, onResult, onDone }) {
		let code = "";
		code += `var _results = new Array(${this.options.taps.length});\n`;
		code += "var _checkDone = () => {\n";
		code += "for(var i = 0; i < _results.length; i++) {\n";
		code += "var item = _results[i];\n";
		code += "if(item === undefined) return false;\n";
		code += "if(item.result !== undefined) {\n";
		code += onResult("item.result");
		code += "return true;\n";
		code += "}\n";
		code += "if(item.error) {\n";
		code += onError("item.error");
		code += "return true;\n";
		code += "}\n";
		code += "}\n";
		code += "return false;\n";
		code += "}\n";
		code += this.callTapsParallel({
			onError: (i, err, done, doneBreak) => {
				let code = "";
				code += `if(${i} < _results.length && ((_results.length = ${i +
					1}), (_results[${i}] = { error: ${err} }), _checkDone())) {\n`;
				code += doneBreak(true);
				code += "} else {\n";
				code += done();
				code += "}\n";
				return code;
			},
			onResult: (i, result, done, doneBreak) => {
				let code = "";
				code += `if(${i} < _results.length && (${result} !== undefined && (_results.length = ${i +
					1}), (_results[${i}] = { result: ${result} }), _checkDone())) {\n`;
				code += doneBreak(true);
				code += "} else {\n";
				code += done();
				code += "}\n";
				return code;
			},
			onTap: (i, run, done, doneBreak) => {
				let code = "";
				if (i > 0) {
					code += `if(${i} >= _results.length) {\n`;
					code += done();
					code += "} else {\n";
				}
				code += run();
				if (i > 0) code += "}\n";
				return code;
			},
			onDone
		});
		return code;
	}
}

const factory$5 = new AsyncParallelBailHookCodeFactory();

class AsyncParallelBailHook extends Hook_1 {
	compile(options) {
		factory$5.setup(this, options);
		return factory$5.create(options);
	}
}

Object.defineProperties(AsyncParallelBailHook.prototype, {
	_call: { value: undefined, configurable: true, writable: true }
});

var AsyncParallelBailHook_1 = AsyncParallelBailHook;

class AsyncSeriesHookCodeFactory extends HookCodeFactory_1 {
	content({ onError, onDone }) {
		return this.callTapsSeries({
			onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
			onDone
		});
	}
}

const factory$6 = new AsyncSeriesHookCodeFactory();

class AsyncSeriesHook extends Hook_1 {
	compile(options) {
		factory$6.setup(this, options);
		return factory$6.create(options);
	}
}

Object.defineProperties(AsyncSeriesHook.prototype, {
	_call: { value: undefined, configurable: true, writable: true }
});

var AsyncSeriesHook_1 = AsyncSeriesHook;

class AsyncSeriesBailHookCodeFactory extends HookCodeFactory_1 {
	content({ onError, onResult, resultReturns, onDone }) {
		return this.callTapsSeries({
			onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
			onResult: (i, result, next) =>
				`if(${result} !== undefined) {\n${onResult(
					result
				)};\n} else {\n${next()}}\n`,
			resultReturns,
			onDone
		});
	}
}

const factory$7 = new AsyncSeriesBailHookCodeFactory();

class AsyncSeriesBailHook extends Hook_1 {
	compile(options) {
		factory$7.setup(this, options);
		return factory$7.create(options);
	}
}

Object.defineProperties(AsyncSeriesBailHook.prototype, {
	_call: { value: undefined, configurable: true, writable: true }
});

var AsyncSeriesBailHook_1 = AsyncSeriesBailHook;

class AsyncSeriesWaterfallHookCodeFactory extends HookCodeFactory_1 {
	content({ onError, onResult, onDone }) {
		return this.callTapsSeries({
			onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
			onResult: (i, result, next) => {
				let code = "";
				code += `if(${result} !== undefined) {\n`;
				code += `${this._args[0]} = ${result};\n`;
				code += `}\n`;
				code += next();
				return code;
			},
			onDone: () => onResult(this._args[0])
		});
	}
}

const factory$8 = new AsyncSeriesWaterfallHookCodeFactory();

class AsyncSeriesWaterfallHook extends Hook_1 {
	constructor(args) {
		super(args);
		if (args.length < 1)
			throw new Error("Waterfall hooks must have at least one argument");
	}

	compile(options) {
		factory$8.setup(this, options);
		return factory$8.create(options);
	}
}

Object.defineProperties(AsyncSeriesWaterfallHook.prototype, {
	_call: { value: undefined, configurable: true, writable: true }
});

var AsyncSeriesWaterfallHook_1 = AsyncSeriesWaterfallHook;

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

class HookMap {
	constructor(factory) {
		this._map = new Map();
		this._factory = factory;
		this._interceptors = [];
	}

	get(key) {
		return this._map.get(key);
	}

	for(key) {
		const hook = this.get(key);
		if (hook !== undefined) {
			return hook;
		}
		let newHook = this._factory(key);
		const interceptors = this._interceptors;
		for (let i = 0; i < interceptors.length; i++) {
			newHook = interceptors[i].factory(key, newHook);
		}
		this._map.set(key, newHook);
		return newHook;
	}

	intercept(interceptor) {
		this._interceptors.push(
			Object.assign(
				{
					factory: (key, hook) => hook
				},
				interceptor
			)
		);
	}

	tap(key, options, fn) {
		return this.for(key).tap(options, fn);
	}

	tapAsync(key, options, fn) {
		return this.for(key).tapAsync(options, fn);
	}

	tapPromise(key, options, fn) {
		return this.for(key).tapPromise(options, fn);
	}
}

var HookMap_1 = HookMap;

class MultiHook {
	constructor(hooks) {
		this.hooks = hooks;
	}

	tap(options, fn) {
		for (const hook of this.hooks) {
			hook.tap(options, fn);
		}
	}

	tapAsync(options, fn) {
		for (const hook of this.hooks) {
			hook.tapAsync(options, fn);
		}
	}

	tapPromise(options, fn) {
		for (const hook of this.hooks) {
			hook.tapPromise(options, fn);
		}
	}

	isUsed() {
		for (const hook of this.hooks) {
			if (hook.isUsed()) return true;
		}
		return false;
	}

	intercept(interceptor) {
		for (const hook of this.hooks) {
			hook.intercept(interceptor);
		}
	}

	withOptions(options) {
		return new MultiHook(this.hooks.map(h => h.withOptions(options)));
	}
}

var MultiHook_1 = MultiHook;

var lib = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.Tapable = Tapable_1;
exports.SyncHook = SyncHook_1;
exports.SyncBailHook = SyncBailHook_1;
exports.SyncWaterfallHook = SyncWaterfallHook_1;
exports.SyncLoopHook = SyncLoopHook_1;
exports.AsyncParallelHook = AsyncParallelHook_1;
exports.AsyncParallelBailHook = AsyncParallelBailHook_1;
exports.AsyncSeriesHook = AsyncSeriesHook_1;
exports.AsyncSeriesBailHook = AsyncSeriesBailHook_1;
exports.AsyncSeriesWaterfallHook = AsyncSeriesWaterfallHook_1;
exports.HookMap = HookMap_1;
exports.MultiHook = MultiHook_1;
});

var Tapable$1 = /*@__PURE__*/getDefaultExportFromCjs(lib);

var VALIDATOR_KEY = '$v';
var Validator = /** @class */ (function () {
    function Validator(rootForm, rootWrapper, rootSchema, path, plugins) {
        this.$rootForm = rootForm;
        this.$rootWrapper = rootWrapper;
        this.$rootSchema = rootSchema;
        this.$path = path;
        this.$states = __assign(__assign({}, this.$states), { messages: {} });
        this.$lastRuleResults = {};
        this.$hooks = __assign(__assign({}, this.$hooks), { onCreated: new Tapable$1.SyncHook(['validator']), onBeforeValidate: new Tapable$1.SyncHook(['validator']), onDoBeforeValidate: new Tapable$1.SyncHook(['validator']), onValidated: new Tapable$1.SyncHook(['validator']), onDoValidated: new Tapable$1.SyncHook(['validator']), onValidatedEach: new Tapable$1.SyncHook(['validator', 'ruleKey']), onDoValidatedEach: new Tapable$1.SyncHook(['validator', 'ruleKey']), onBeforeReset: new Tapable$1.SyncHook(['validator']), onDoBeforeReset: new Tapable$1.SyncHook(['validator']), onReseted: new Tapable$1.SyncHook(['validator']), onDoReseted: new Tapable$1.SyncHook(['validator']) });
        if (plugins) {
            for (var _i = 0, plugins_1 = plugins; _i < plugins_1.length; _i++) {
                var plugin = plugins_1[_i];
                if (typeof plugin === 'function') {
                    plugin(this);
                }
                else {
                    plugin.apply(this);
                }
            }
        }
    }
    Validator.prototype.validate = function () {
        var _this = this;
        this.$hooks.onBeforeValidate.call(this);
        var ruleResults = this.doValidate();
        var _loop_1 = function (ruleKey) {
            if (isPromise(ruleResults[ruleKey])) {
                ruleResults[ruleKey].finally(function () {
                    if (_this.$lastRuleResults !== ruleResults)
                        return;
                    _this.$hooks.onValidatedEach.call(_this, ruleKey);
                });
            }
            else {
                this_1.$hooks.onValidatedEach.call(this_1, ruleKey);
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = getOwnKeys(ruleResults); _i < _a.length; _i++) {
            var ruleKey = _a[_i];
            _loop_1(ruleKey);
        }
        if (Object.values(ruleResults).some(isPromise)) {
            return Promise.all(Object.values(ruleResults)).then(function () {
                _this.$hooks.onValidated.call(_this);
            });
        }
        else {
            this.$hooks.onValidated.call(this);
            return;
        }
    };
    Validator.prototype.doValidate = function () {
        var _this = this;
        this.$hooks.onDoBeforeValidate.call(this);
        var schema = this.getSchema(this.$path);
        if (schema.$noSchemaSpecified === false) {
            this.$hooks.onDoValidated.call(this);
            return;
        }
        var param = {
            value: this.getForm(this.$path),
            key: this.$path.length === 0 ? undefined : this.$path[this.$path.length],
            parent: this.$path.length === 0 ? undefined : this.getForm(this.$path.slice(0, -1)),
            path: this.$path.slice(),
            root: this.$rootWrapper,
            params: schema.$params,
        };
        param.value = schema.$normalizer(param);
        var ruleResults = (this.$lastRuleResults = {});
        var _loop_2 = function (ruleKey) {
            var _a;
            ruleResults[ruleKey] = schema.$rules[ruleKey](param);
            if (isPromise(ruleResults[ruleKey])) {
                ruleResults[ruleKey].finally(function () { return __awaiter(_this, void 0, void 0, function () {
                    var ruleResult, message;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (this.$lastRuleResults !== ruleResults)
                                    return [2 /*return*/];
                                return [4 /*yield*/, ruleResults[ruleKey]];
                            case 1:
                                ruleResult = _b.sent();
                                message = schema.$messages[ruleKey](__assign(__assign({}, param), { params: __assign(__assign({}, param.params), { $rules: (_a = {},
                                            _a[ruleKey] = ruleResult,
                                            _a) }) }));
                                this.$states.messages[ruleKey] = message;
                                this.$hooks.onDoValidatedEach.call(this, ruleKey);
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            else {
                var message = schema.$messages[ruleKey](__assign(__assign({}, param), { params: __assign(__assign({}, param.params), { $rules: (_a = {},
                            _a[ruleKey] = ruleResults[ruleKey],
                            _a) }) }));
                this_2.$states.messages[ruleKey] = message;
                this_2.$hooks.onDoValidatedEach.call(this_2, ruleKey);
            }
        };
        var this_2 = this;
        for (var _i = 0, _a = getOwnKeys(schema.$rules); _i < _a.length; _i++) {
            var ruleKey = _a[_i];
            _loop_2(ruleKey);
        }
        if (Object.values(ruleResults).some(isPromise)) {
            return Promise.all(Object.values(ruleResults))
                .then(function () { return _this.$hooks.onDoValidated.call(_this); })
                .then(function () { return ruleResults; });
        }
        else {
            this.$hooks.onDoValidated.call(this);
            return ruleResults;
        }
    };
    Validator.prototype.reset = function () {
        this.$hooks.onBeforeReset.call(this);
        this.doReset();
        this.$hooks.onReseted.call(this);
    };
    Validator.prototype.doReset = function () {
        this.$hooks.onDoBeforeReset.call(this);
        this.$states.messages = {};
        this.$lastRuleResults = {};
        this.$hooks.onDoReseted.call(this);
    };
    Validator.prototype.getWrapper = function (path) {
        return getByPath(this.$rootWrapper, path);
    };
    Validator.prototype.getForm = function (path) {
        return getByPath(this.$rootForm, path);
    };
    Validator.prototype.getSchema = function (path) {
        return getSchema({ rootSchema: this.$rootSchema, path: path });
    };
    return Validator;
}());

var recursiveCallParent = function (_a) {
    var validator = _a.validator, callback = _a.callback, _b = _a.shouldCallSelf, shouldCallSelf = _b === void 0 ? false : _b;
    var rootWrapper = validator.$rootWrapper;
    var path = validator.$path.slice().reverse();
    var currentWrapper = rootWrapper;
    var parentWrappers = [currentWrapper];
    while (path.length) {
        var key = path.pop();
        currentWrapper = currentWrapper[key];
        parentWrappers.push(currentWrapper);
    }
    if (shouldCallSelf === false) {
        parentWrappers.pop();
    }
    for (var _i = 0, _c = parentWrappers.reverse(); _i < _c.length; _i++) {
        var parentWrapper = _c[_i];
        if (callback(parentWrapper))
            return;
    }
};
// BFS
var recursiveCallChildren = function (_a) {
    var validator = _a.validator, callback = _a.callback, _b = _a.shouldCallSelf, shouldCallSelf = _b === void 0 ? false : _b;
    var wrapper = validator.getWrapper(validator.$path);
    var currentValidators = [wrapper[VALIDATOR_KEY]];
    var childValidators = [];
    if (shouldCallSelf) {
        callback(wrapper);
    }
    while (currentValidators.length) {
        var validator_1 = currentValidators.pop();
        var form = validator_1.getForm(validator_1.$path);
        var wrapper_1 = validator_1.getWrapper(validator_1.$path);
        if (isPlainObject(form) || isArray(form)) {
            for (var _i = 0, _c = getOwnKeys(form); _i < _c.length; _i++) {
                var key = _c[_i];
                var childWrapper = wrapper_1[key];
                if (childWrapper[VALIDATOR_KEY] === undefined)
                    continue;
                if (callback(childWrapper))
                    return;
                childValidators.push(childWrapper[VALIDATOR_KEY]);
            }
        }
        if (currentValidators.length === 0) {
            currentValidators = childValidators.reverse();
            childValidators = [];
        }
    }
};

var init$1 = function (validator) {
    recursiveCallParent({
        validator: validator,
        callback: function (parentWrapper) {
            var parentValidator = parentWrapper[VALIDATOR_KEY];
            var parentForm = validator.getForm(parentValidator.$path);
            parentValidator.$states.anyDirty =
                parentValidator.$states.dirty === true ||
                    getOwnKeys(parentForm)
                        .filter(function (key) { return hasOwnKey(parentValidator, key); })
                        .map(function (key) { return parentWrapper[key][VALIDATOR_KEY]; })
                        .some(function (parentValidator) {
                        return parentValidator.$states.dirty === true || parentValidator.$states.anyDirty === true;
                    });
            return false;
        },
        shouldCallSelf: true,
    });
};
var update = function (validator) {
    recursiveCallParent({
        validator: validator,
        callback: function (parentWrapper) {
            var parentValidator = parentWrapper[VALIDATOR_KEY];
            var parentForm = validator.getForm(parentValidator.$path);
            parentValidator.$states.anyDirty =
                parentValidator.$states.dirty === true ||
                    getOwnKeys(parentForm)
                        .map(function (key) { return parentWrapper[key][VALIDATOR_KEY]; })
                        .some(function (parentValidator) {
                        return parentValidator.$states.dirty === true || parentValidator.$states.anyDirty === true;
                    });
            return false;
        },
        shouldCallSelf: true,
    });
};
var AnyDirtyPlugin = /** @class */ (function () {
    function AnyDirtyPlugin() {
    }
    AnyDirtyPlugin.prototype.apply = function (validator) {
        validator.$hooks.onCreated.tap('any-dirty-plugin', init$1);
        validator.$hooks.onDoTouched.tap('any-dirty-plugin', update);
        validator.$hooks.onDoReseted.tap('any-dirty-plugin', update);
    };
    return AnyDirtyPlugin;
}());

var init$2 = function (validator) {
    recursiveCallParent({
        validator: validator,
        callback: function (parentWrapper) {
            var parentValidator = parentWrapper[VALIDATOR_KEY];
            var parentForm = validator.getForm(parentValidator.$path);
            parentValidator.$states.anyError =
                parentValidator.$states.error === true ||
                    getOwnKeys(parentForm)
                        .filter(function (key) { return hasOwnKey(parentValidator, key); })
                        .map(function (key) { return parentWrapper[key][VALIDATOR_KEY]; })
                        .some(function (parentValidator) {
                        return parentValidator.$states.error === true || parentValidator.$states.anyError === true;
                    });
            return false;
        },
        shouldCallSelf: true,
    });
};
var update$1 = function (validator) {
    recursiveCallParent({
        validator: validator,
        callback: function (parentWrapper) {
            var parentValidator = parentWrapper[VALIDATOR_KEY];
            var parentForm = validator.getForm(parentValidator.$path);
            parentValidator.$states.anyError =
                parentValidator.$states.error === true ||
                    getOwnKeys(parentForm)
                        .map(function (key) { return parentWrapper[key][VALIDATOR_KEY]; })
                        .some(function (parentValidator) {
                        return parentValidator.$states.error === true || parentValidator.$states.anyError === true;
                    });
            return false;
        },
        shouldCallSelf: true,
    });
};
var AnyErrorPlugin = /** @class */ (function () {
    function AnyErrorPlugin() {
    }
    AnyErrorPlugin.prototype.apply = function (validator) {
        validator.$hooks.onCreated.tap('any-error-plugin', init$2);
        validator.$hooks.onDoTouched.tap('any-error-plugin', update$1);
        validator.$hooks.onDoValidatedEach.tap('any-error-plugin', update$1);
        validator.$hooks.onDoReseted.tap('any-error-plugin', update$1);
    };
    return AnyErrorPlugin;
}());

var init$3 = function (validator) {
    recursiveCallParent({
        validator: validator,
        callback: function (parentWrapper) {
            var parentValidator = parentWrapper[VALIDATOR_KEY];
            var parentForm = validator.getForm(parentValidator.$path);
            parentValidator.$states.anyInvalid =
                parentValidator.$states.invalid === true ||
                    getOwnKeys(parentForm)
                        .filter(function (key) { return hasOwnKey(parentValidator, key); })
                        .map(function (key) { return parentWrapper[key][VALIDATOR_KEY]; })
                        .some(function (parentValidator) {
                        return parentValidator.$states.invalid === true || parentValidator.$states.anyInvalid === true;
                    });
            return false;
        },
        shouldCallSelf: true,
    });
};
var update$2 = function (validator) {
    recursiveCallParent({
        validator: validator,
        callback: function (parentWrapper) {
            var parentValidator = parentWrapper[VALIDATOR_KEY];
            var parentForm = validator.getForm(parentValidator.$path);
            parentValidator.$states.anyInvalid =
                parentValidator.$states.invalid === true ||
                    getOwnKeys(parentForm)
                        .map(function (key) { return parentWrapper[key][VALIDATOR_KEY]; })
                        .some(function (parentValidator) {
                        return parentValidator.$states.invalid === true || parentValidator.$states.anyInvalid === true;
                    });
            return false;
        },
        shouldCallSelf: true,
    });
};
var Tap = {
    name: 'any-invalid-plugin',
    before: ['any-error-plugin'],
};
var AnyInvalidPlugin = /** @class */ (function () {
    function AnyInvalidPlugin() {
    }
    AnyInvalidPlugin.prototype.apply = function (validator) {
        validator.$hooks.onCreated.tap(Tap, init$3);
        validator.$hooks.onDoBeforeValidate.tap(Tap, update$2);
        validator.$hooks.onDoValidatedEach.tap(Tap, update$2);
        validator.$hooks.onDoReseted.tap(Tap, update$2);
    };
    return AnyInvalidPlugin;
}());

var init$4 = function (validator) {
    recursiveCallParent({
        validator: validator,
        callback: function (parentWrapper) {
            var parentValidator = parentWrapper[VALIDATOR_KEY];
            var parentForm = validator.getForm(parentValidator.$path);
            parentValidator.$states.anyPending =
                parentValidator.$states.pending === true ||
                    getOwnKeys(parentForm)
                        .filter(function (key) { return hasOwnKey(parentValidator, key); })
                        .map(function (key) { return parentWrapper[key][VALIDATOR_KEY]; })
                        .some(function (parentValidator) {
                        return parentValidator.$states.pending === true || parentValidator.$states.anyPending === true;
                    });
            return false;
        },
        shouldCallSelf: true,
    });
};
var update$3 = function (validator) {
    recursiveCallParent({
        validator: validator,
        callback: function (parentWrapper) {
            var parentValidator = parentWrapper[VALIDATOR_KEY];
            var parentForm = validator.getForm(parentValidator.$path);
            parentValidator.$states.anyPending =
                parentValidator.$states.pending === true ||
                    getOwnKeys(parentForm)
                        .map(function (key) { return parentWrapper[key][VALIDATOR_KEY]; })
                        .some(function (parentValidator) {
                        return parentValidator.$states.pending === true || parentValidator.$states.anyPending === true;
                    });
            return false;
        },
        shouldCallSelf: true,
    });
};
var AnyPendingPlugin = /** @class */ (function () {
    function AnyPendingPlugin() {
    }
    AnyPendingPlugin.prototype.apply = function (validator) {
        validator.$hooks.onCreated.tap('any-pending-plugin', init$4);
        validator.$hooks.onDoBeforeValidate.tap('any-pending-plugin', update$3);
        validator.$hooks.onDoValidated.tap('any-pending-plugin', update$3);
        validator.$hooks.onDoReseted.tap('any-pending-plugin', update$3);
    };
    return AnyPendingPlugin;
}());

var caches = new WeakMap();
function initCache(rootForm) {
    caches.set(rootForm, {
        $rootForm: new Map(),
        $rootWrapper: new Map(),
        $rootSchema: new Map(),
    });
}
function getForm(path) {
    var cache = caches.get(this.$rootForm);
    var pathKey = path.join('.');
    if (cache.$rootForm.has(pathKey) === false) {
        cache.$rootForm.set(pathKey, getByPath(this.$rootForm, path));
    }
    return cache.$rootForm.get(pathKey);
}
function getWrapper(path) {
    var cache = caches.get(this.$rootForm);
    var pathKey = path.join('.');
    if (cache.$rootWrapper.has(pathKey) === false) {
        cache.$rootWrapper.set(pathKey, getByPath(this.$rootWrapper, path));
    }
    return cache.$rootWrapper.get(pathKey);
}
function getSchema$1(path) {
    var cache = caches.get(this.$rootForm);
    var pathKey = path.join('.');
    if (cache.$rootSchema.has(pathKey) === false) {
        cache.$rootSchema.set(pathKey, getSchema({ rootSchema: this.$rootSchema, path: path }));
    }
    return cache.$rootSchema.get(pathKey);
}
function clearCache() {
    var cache = caches.get(this.$rootForm);
    var pathKey = this.$path.join('.');
    for (var _i = 0, _a = Array.from(cache.$rootForm.keys()); _i < _a.length; _i++) {
        var existingPathKey = _a[_i];
        if (existingPathKey.startsWith(pathKey + '.') || existingPathKey === pathKey) {
            cache.$rootForm.delete(existingPathKey);
        }
    }
    for (var _b = 0, _c = Array.from(cache.$rootWrapper.keys()); _b < _c.length; _b++) {
        var existingPathKey = _c[_b];
        if (existingPathKey.startsWith(pathKey + '.') || existingPathKey === pathKey) {
            cache.$rootWrapper.delete(existingPathKey);
        }
    }
    for (var _d = 0, _e = Array.from(cache.$rootSchema.keys()); _d < _e.length; _d++) {
        var existingPathKey = _e[_d];
        if (existingPathKey.startsWith(pathKey + '.') || existingPathKey === pathKey) {
            cache.$rootSchema.delete(existingPathKey);
        }
    }
}
var Tap$1 = {
    name: 'cache-plugin',
};
var CachePlugin = /** @class */ (function () {
    function CachePlugin() {
        this.applied = false;
    }
    CachePlugin.prototype.apply = function (validator) {
        validator.$hooks.onCreated.tap(Tap$1, clearCache.bind(validator));
        if (this.applied)
            return;
        this.applied = true;
        initCache(validator.$rootForm);
        validator.constructor.prototype.getForm = getForm.bind(validator);
        validator.constructor.prototype.getWrapper = getWrapper.bind(validator);
        validator.constructor.prototype.getSchema = getSchema$1.bind(validator);
    };
    return CachePlugin;
}());

function active(validator) {
    validator.$states.dirty = true;
}
var inactive = function (validator) {
    validator.$states.dirty = false;
};
var Tap$2 = {
    name: 'dirty-plugin',
    before: ['error-plugin', 'any-dirty-plugin', 'any-error-plugin'],
};
var DirtyPlugin = /** @class */ (function () {
    function DirtyPlugin() {
    }
    DirtyPlugin.prototype.apply = function (validator) {
        validator.$hooks.onCreated.tap(Tap$2, inactive);
        validator.$hooks.onDoTouched.tap(Tap$2, active);
        validator.$hooks.onDoReseted.tap(Tap$2, inactive);
    };
    return DirtyPlugin;
}());

var update$4 = function (validator) {
    validator.$states.error =
        validator.$states.dirty === true && Object.values(validator.$states.messages).some(function (message) { return message !== undefined; });
};
var inactive$1 = function (validator) {
    validator.$states.error = false;
};
var Tap$3 = {
    name: 'error-plugin',
    before: ['any-error-plugin'],
};
var ErrorPlugin = /** @class */ (function () {
    function ErrorPlugin() {
    }
    ErrorPlugin.prototype.apply = function (validator) {
        validator.$hooks.onCreated.tap(Tap$3, inactive$1);
        validator.$hooks.onDoTouched.tap(Tap$3, update$4);
        validator.$hooks.onDoValidatedEach.tap(Tap$3, update$4);
        validator.$hooks.onDoReseted.tap(Tap$3, inactive$1);
    };
    return ErrorPlugin;
}());

var update$5 = function (validator) {
    validator.$states.invalid = Object.values(validator.$lastRuleResults).some(function (ruleResult) { return isPromise(ruleResult) === false && ruleResult !== undefined; });
};
var inactive$2 = function (validator) {
    validator.$states.invalid = false;
};
var Tap$4 = {
    name: 'invalid-plugin',
    before: ['any-invalid-plugin', 'error-plugin', 'any-error-plugin'],
};
var InvalidPlugin = /** @class */ (function () {
    function InvalidPlugin() {
    }
    InvalidPlugin.prototype.apply = function (validator) {
        validator.$hooks.onCreated.tap(Tap$4, inactive$2);
        validator.$hooks.onDoBeforeValidate.tap(Tap$4, inactive$2);
        validator.$hooks.onDoValidatedEach.tap(Tap$4, update$5);
        validator.$hooks.onDoReseted.tap(Tap$4, inactive$2);
    };
    return InvalidPlugin;
}());

var active$1 = function (validator) {
    validator.$states.pending = true;
};
var inactive$3 = function (validator) {
    validator.$states.pending = false;
};
var Tap$5 = {
    name: 'pending-plugin',
    before: ['any-pending-plugin'],
};
var PendingPlugin = /** @class */ (function () {
    function PendingPlugin() {
    }
    PendingPlugin.prototype.apply = function (validator) {
        validator.$hooks.onCreated.tap(Tap$5, inactive$3);
        validator.$hooks.onDoBeforeValidate.tap(Tap$5, active$1);
        validator.$hooks.onDoValidated.tap(Tap$5, inactive$3);
        validator.$hooks.onDoReseted.tap(Tap$5, inactive$3);
    };
    return PendingPlugin;
}());

var setIter = function (validator) {
    var path = validator.$path;
    if (path.length === 0)
        return;
    var parentPath = path.slice();
    var key = parentPath.pop();
    var parentForm = validator.getForm(parentPath);
    var parentWrapper = validator.getWrapper(parentPath);
    var isParentFormArray = isArray(parentForm);
    if (parentWrapper.$iter === undefined || isArray(parentWrapper.$iter) !== isParentFormArray) {
        parentWrapper.$iter = isParentFormArray ? [] : {};
    }
    parentWrapper.$iter[key] = parentWrapper[key];
};
var Tap$6 = {
    name: 'iter-plugin',
};
var IterPlugin = /** @class */ (function () {
    function IterPlugin() {
    }
    IterPlugin.prototype.apply = function (validator) {
        validator.$hooks.onCreated.tap(Tap$6, setIter);
    };
    return IterPlugin;
}());

var createReset = function (originalReset) {
    return function doReset() {
        var promises = [];
        recursiveCallChildren({
            validator: this,
            callback: function (childWrapper) {
                promises.push(originalReset.call(childWrapper[VALIDATOR_KEY]));
                return false;
            },
            shouldCallSelf: true,
        });
        return Promise.all(promises);
    };
};
var RecursiveResetPlugin = /** @class */ (function () {
    function RecursiveResetPlugin() {
        this.applied = false;
    }
    RecursiveResetPlugin.prototype.apply = function (validator) {
        if (this.applied)
            return;
        this.applied = true;
        validator.constructor.prototype.doReset = createReset(validator.constructor.prototype.doReset);
    };
    return RecursiveResetPlugin;
}());

var createTouch = function (originalTouch) {
    return function doTouch() {
        var promises = [];
        recursiveCallChildren({
            validator: this,
            callback: function (childWrapper) {
                promises.push(originalTouch.call(childWrapper[VALIDATOR_KEY]));
                return false;
            },
            shouldCallSelf: true,
        });
        return Promise.all(promises);
    };
};
var RecursiveTouchPlugin = /** @class */ (function () {
    function RecursiveTouchPlugin() {
        this.applied = false;
    }
    RecursiveTouchPlugin.prototype.apply = function (validator) {
        if (this.applied)
            return;
        this.applied = true;
        validator.constructor.prototype.doTouch = createTouch(validator.constructor.prototype.doTouch);
    };
    return RecursiveTouchPlugin;
}());

var createValidate = function (originalValidate) {
    return function doValidate() {
        var promises = [];
        recursiveCallChildren({
            validator: this,
            callback: function (childWrapper) {
                promises.push(originalValidate.call(childWrapper[VALIDATOR_KEY]));
                return false;
            },
            shouldCallSelf: true,
        });
        return Promise.all(promises);
    };
};
var RecursiveValidatePlugin = /** @class */ (function () {
    function RecursiveValidatePlugin() {
        this.applied = false;
    }
    RecursiveValidatePlugin.prototype.apply = function (validator) {
        if (this.applied)
            return;
        this.applied = true;
        validator.constructor.prototype.doValidate = createValidate(validator.constructor.prototype.doValidate);
    };
    return RecursiveValidatePlugin;
}());

function touch() {
    this.doTouch();
    this.$hooks.onTouched.call(this);
}
function doTouch() {
    this.$hooks.onDoTouched.call(this);
}
var TouchPlugin = /** @class */ (function () {
    function TouchPlugin() {
        this.applied = false;
    }
    TouchPlugin.prototype.apply = function (validator) {
        validator.$hooks.onTouched = new Tapable$1.SyncHook(['validator']);
        validator.$hooks.onDoTouched = new Tapable$1.SyncHook(['validator']);
        if (this.applied)
            return;
        this.applied = true;
        validator.constructor.prototype.touch = touch;
        validator.constructor.prototype.doTouch = doTouch;
    };
    return TouchPlugin;
}());

var active$2 = function (validator) {
    validator.$states.validated = true;
};
var inactive$4 = function (validator) {
    validator.$states.validated = false;
};
var ValidatedPlugin = /** @class */ (function () {
    function ValidatedPlugin() {
    }
    ValidatedPlugin.prototype.apply = function (validator) {
        validator.$hooks.onCreated.tap('validated-plugin', inactive$4);
        validator.$hooks.onDoBeforeValidate.tap('validated-plugin', active$2);
        validator.$hooks.onDoReseted.tap('validated-plugin', inactive$4);
    };
    return ValidatedPlugin;
}());

var AliasPlugin = /** @class */ (function () {
    function AliasPlugin(aliases) {
        this.aliases = aliases;
    }
    AliasPlugin.prototype.apply = function (validator) {
        var _this = this;
        validator.$hooks.onCreated.tap('alias-plugin', function () { return _this.alias(validator.getWrapper(validator.$path)); });
    };
    AliasPlugin.prototype.alias = function (validationWrapper) {
        var _a;
        var _loop_1 = function (path, aliasPath) {
            var parentWrapper = (_a = validationWrapper[VALIDATOR_KEY]) === null || _a === void 0 ? void 0 : _a.getWrapper(aliasPath.slice(0, -1));
            var key = aliasPath[aliasPath.length - 1];
            Object.defineProperty(parentWrapper, key, {
                configurable: true,
                enumerable: true,
                get: function () {
                    var _a;
                    return (_a = validationWrapper[VALIDATOR_KEY]) === null || _a === void 0 ? void 0 : _a.getWrapper(path);
                },
            });
        };
        for (var _i = 0, _b = this.aliases; _i < _b.length; _i++) {
            var _c = _b[_i], path = _c.path, aliasPath = _c.aliasPath;
            _loop_1(path, aliasPath);
        }
    };
    return AliasPlugin;
}());

function proxy(_a) {
    var form = _a.form, schema = _a.schema, plugins = _a.plugins;
    // isolate prototype chain
    var Validator$1 = /** @class */ (function (_super) {
        __extends(Validator, _super);
        function Validator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Validator;
    }(Validator));
    var rootForm = form;
    var rootSchema = normalizeSchema(schema);
    var rootWrapper = {};
    rootWrapper[VALIDATOR_KEY] = new Validator$1(rootForm, rootWrapper, rootSchema, [], plugins);
    rootWrapper[VALIDATOR_KEY].$hooks.onCreated.call(rootWrapper[VALIDATOR_KEY]);
    return {
        proxiedForm: v({
            object: form,
            detto: rootWrapper,
            callback: function (wrapper, path) {
                if (wrapper[VALIDATOR_KEY] === undefined) {
                    wrapper[VALIDATOR_KEY] = new Validator$1(rootForm, rootWrapper, rootSchema, path, plugins);
                }
                wrapper[VALIDATOR_KEY].$path = path;
                wrapper[VALIDATOR_KEY].$hooks.onCreated.call(wrapper[VALIDATOR_KEY]);
            },
        }),
        validationWrapper: rootWrapper,
    };
}

exports.AliasPlugin = AliasPlugin;
exports.AnyDirtyPlugin = AnyDirtyPlugin;
exports.AnyErrorPlugin = AnyErrorPlugin;
exports.AnyInvalidPlugin = AnyInvalidPlugin;
exports.AnyPendingPlugin = AnyPendingPlugin;
exports.CachePlugin = CachePlugin;
exports.DirtyPlugin = DirtyPlugin;
exports.ErrorPlugin = ErrorPlugin;
exports.InvalidPlugin = InvalidPlugin;
exports.IterPlugin = IterPlugin;
exports.PendingPlugin = PendingPlugin;
exports.RecursiveResetPlugin = RecursiveResetPlugin;
exports.RecursiveTouchPlugin = RecursiveTouchPlugin;
exports.RecursiveValidatePlugin = RecursiveValidatePlugin;
exports.TouchPlugin = TouchPlugin;
exports.ValidatedPlugin = ValidatedPlugin;
exports.Validator = Validator;
exports.proxy = proxy;
exports.recursiveCallChildren = recursiveCallChildren;
exports.recursiveCallParent = recursiveCallParent;
