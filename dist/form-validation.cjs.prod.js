"use strict";Object.defineProperty(exports,"__esModule",{value:!0});
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
var e=function(){return(e=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var a in r=arguments[t])Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);return e}).apply(this,arguments)};function r(e,r,t,n){return new(t||(t=Promise))((function(a,o){function i(e){try{u(n.next(e))}catch(e){o(e)}}function l(e){try{u(n.throw(e))}catch(e){o(e)}}function u(e){var r;e.done?a(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(i,l)}u((n=n.apply(e,r||[])).next())}))}function t(e,r){var t,n,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function l(o){return function(l){return function(o){if(t)throw new TypeError("Generator is already executing.");for(;i;)try{if(t=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=i.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=r.call(e,i)}catch(e){o=[6,e],n=0}finally{t=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,l])}}}function n(e){return Object.prototype.toString.call(e)}function a(e){return"[object Object]"===n(e)}function o(e){return"[object Array]"===n(e)}function i(e){return"function"==typeof e}function l(e){return null!==e&&"object"==typeof e&&i(e.then)}function u(e,r){return e.hasOwnProperty(r)}function c(e,r){if(0===r.length)return e;var t=e;return r.slice(0,-1).forEach((function(e){t=t[e]})),t[r[r.length-1]]}function s(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r]}var f="__form_validation__",v="__form_validation_reactive",h="__form_validation_collected",d=function(e,r,t){var n;(a(e)||o(e))&&Object.defineProperty(e,v,{enumerable:!1,configurable:!0,value:e}),(a(r)||o(r))&&(Object.defineProperty(r,v,{enumerable:!1,configurable:!0,value:r}),Object.defineProperty(r,f,{enumerable:!1,configurable:!0,value:r[f]||(n={},n.path=t,n)}),Object.defineProperty(r,"$v",{enumerable:!1,configurable:!0,value:r.$v||{}}))},p=function(e,r){var t;if(!1!==a(e)||!1!==o(e))for(var n in(t=e[f].path).splice.apply(t,function(){for(var e=0,r=0,t=arguments.length;r<t;r++)e+=arguments[r].length;var n=Array(e),a=0;for(r=0;r<t;r++)for(var o=arguments[r],i=0,l=o.length;i<l;i++,a++)n[a]=o[i];return n}([0,r.length],r)),e)p(e[n],r.concat(n))},$=new Set(["shift","unshift","reverse","splice"]),y=function(e){var r=e.object,t=e.clone,n=e.path,i=void 0===n?[]:n,l=e.wrap,c=void 0===l?d:l,s=e.callback,v=void 0===s?function(){}:s;if(c(r,t,i),(a(t)||o(t))&&v(t),!1===a(r)&&!1===o(r))return r;for(var m=0,g=Object.keys(r);m<g.length;m++){var b=g[m];Reflect.set(t,b,t[b]||(o(r[b])?[]:{})),Reflect.set(r,b,y({object:r[b],clone:t[b],path:i.concat(b),wrap:c,callback:v}))}for(var b in t)!1===u(r,b)&&delete t[b];var j=null,O=0,P=0,k=[],w=[],_=[];return new Proxy(r,{deleteProperty:function(e,r){return Reflect.deleteProperty(t,r),Reflect.deleteProperty(e,r)},set:function(e,r,n){var a=Reflect.set(e,r,n);if(!1===u(e,r))return a;if(o(e))if("shift"===j){if("length"===r){k.reverse(),k.pop(),t.length=0;for(var l=0;l<k.length;){var s=k[l];s[f].path=s[f].path.slice(0,-1).concat(k.length-l-1+""),t.push(s),++l}for(var h in t.reverse(),j=null,p(t,t[f].path),t)v(t[h]);return a}/^\d+$/.test(r)&&(t[r]=o(n)?[]:{})}else if("unshift"===j){if("length"===r){t.length=0;for(var d=0;d<k.length;){var $=k[d];$[f].path=$[f].path.slice(0,-1).concat(k.length-d-1+""),t.push($),++d}for(var m in t.reverse(),j=null,p(t,t[f].path),t)v(t[m]);return a}/^\d+$/.test(r)&&(t[r]=o(n)?[]:{},"0"===r&&k.push(t[0]))}else if("reverse"===j){if(/^\d+$/.test(r)){var g=k.pop();if(g[f].path=g[f].path.slice(0,-1).concat(r),t[r]=g,++P===O){for(var b in p(t,t[f].path),t)v(t[b]);j=null}return a}}else if("splice"===j){if("length"===r){for(var _ in j=null,t[r]=n,w){var x=w[_],I=x.method,S=x.key,z=x.value,R=parseInt(_,10)-1;"set"===I&&(R>=0&&"get"===w[R].method?t[S]=w[R].value:t[S]=z)}for(var D in p(t,t[f].path),t)t[D][f].path=t[D][f].path.slice(0,-1).concat(D+""),v(t[D]);return a}/^\d+$/.test(r)&&(t[r]=o(n)?[]:{},w.push({method:"set",key:r,value:t[r]}))}return"length"===r?(t.length=n,a):(t[r]=t[r]||(o(n)?[]:{}),Reflect.set(e,r,y({object:n,clone:t[r],path:i.concat(r),wrap:c,callback:v})))},get:function(e,r){var n=Reflect.get(e,r);if(o(e))if($.has(r))for(var a in j=r,P=0,k.length=0,w.length=0,_.length=0,t)delete t[a][h];else null!==j&&("shift"===j||"unshift"===j?/^\d+$/.test(r)&&t[r]&&void 0===t[r][h]&&(Object.defineProperty(t[r],h,{enumerable:!1,configurable:!0,value:t[r]}),k.push(t[r])):"reverse"===j?"length"===r?e[r]<=1?(j=null,O=0):O=n%2==0?n:n-1:/^\d+$/.test(r)&&t[r]&&void 0===t[r][h]&&(Object.defineProperty(t[r],h,{enumerable:!1,configurable:!0,value:t[r]}),k.push(t[r])):"splice"===j&&/^\d+$/.test(r)&&t[r]&&void 0===t[r][h]&&(Object.defineProperty(t[r],h,{enumerable:!1,configurable:!0,value:t[r]}),w.push({method:"get",key:r,value:t[r]})));return n}})},m=function(e){var r=e.rootSchema,t=e.validator,n=e.path,o=e.startIndex;if(o===n.length){try{var l=c(r,n);if(g(l))return a(l.$params)&&(t[f].schema.$params=l.$params),i(l.$normalizer)&&(t[f].schema.$normalizer=l.$normalizer),a(l.$rules)&&(t[f].schema.$rules=l.$rules),a(l.$errors)&&(t[f].schema.$errors=l.$errors),!0}catch(e){}return!1}if(m({rootSchema:r,validator:t,path:n,startIndex:o+1}))return!0;var u=n[o];return n[o]="$iter",!!m({rootSchema:r,validator:t,path:n,startIndex:o+1})||(n[o]=u,!1)},g=function(e){return void 0!==e&&(void 0!==e.$params||(void 0!==e.$normalizer||(void 0!==e.$rules||void 0!==e.$errors)))};var b=function(e){return function(r){e[f].validated=r}},j=function(e){return function(r){e[f].invalid=r,_(e),S(e),z(e)}},O=function(e){return function(r){e[f].dirty=r,x(e),I(e),S(e),z(e)}},P=function(e){return function(r){e[f].pending+=!0===r?1:-1,w(e),_(e),S(e),z(e)}},k=function(e){return function(){e[f].pending=0,w(e),_(e),S(e),z(e)}},w=function(e){e.$v.pending=0!==e[f].pending||R(e).some((function(e){return e.$v.pending}))},_=function(e){e.$v.invalid=e[f].invalid&&0===e[f].pending||R(e).some((function(e){return e.$v.invalid}))},x=function(e){e.$v.dirty=e[f].dirty||0!==R(e).length&&R(e).every((function(e){return e.$v.dirty}))},I=function(e){e.$v.anyDirty=e[f].dirty||R(e).some((function(e){return e.$v.anyDirty}))},S=function(e){e.$v.error=e[f].dirty&&e[f].invalid&&0===e[f].pending},z=function(e){e.$v.anyError=e[f].dirty&&e[f].invalid&&0===e[f].pending||R(e).some((function(e){return e.$v.anyError}))},R=function(e){return Object.keys(e).filter((function(e){return e!==f&&"$v"!==e})).map((function(r){return e[r]}))},D=function(n,a){var o=a[f].schema,i={};a.$v.validate=function(){a[f].setValidated(!0),a[f].setInvalid(!1),a[f].resetPending(),a.$v.errors={},i={};for(var u=function(n){for(var a,o,i=n.rootForm,u=n.validator,s=e(((a={}).$rules={},a),u[f].schema.$params),v=u[f].schema.$normalizer,h=u[f].schema.$rules,d=u[f].schema.$errors,p=i,$=u[f].path,y=0===$.length?void 0:c(i,$.slice(0,-1)),m=0===$.length?void 0:$[$.length-1],g=v({value:0===$.length?i:c(i,$),key:m,parent:y,path:$,root:p,params:s}),b=((o={}).$rules={},o),j=function(e){var n={value:g,key:m,parent:y,path:$,root:p,params:s},a=h[e](n);b.$rules[e]=a,n.params.$rules[e]=a,b[e]=void 0,l(a)?a.finally((function(){return r(void 0,void 0,void 0,(function(){return t(this,(function(r){switch(r.label){case 0:return[4,a];case 1:return void 0!==r.sent()&&(b[e]=d[e](n)),[2]}}))}))})):void 0!==a&&(b[e]=d[e](n))},O=0,P=Object.keys(h);O<P.length;O++){j(P[O])}return b}({rootForm:n,validator:a}),s=function(e){l(u.$rules[e])?(a[f].setPending(!0),u.$rules[e].finally((function(){return r(void 0,void 0,void 0,(function(){var r,n;return t(this,(function(t){switch(t.label){case 0:return i!==u.$rules?[2]:[4,u.$rules[e]];case 1:return void 0===t.sent()?[3,3]:(a[f].setInvalid(!0),r=a.$v.errors,n=e,[4,u[e]]);case 2:r[n]=t.sent(),t.label=3;case 3:return a[f].setPending(!1),[2]}}))}))}))):void 0!==u.$rules[e]&&(a[f].setInvalid(!0),a.$v.errors[e]=u[e])},v=0,h=Object.keys(o.$rules);v<h.length;v++){s(h[v])}i=u.$rules;for(var d={},p=0,$=Object.keys(a).filter((function(e){return"$v"!==e&&e!==f}));p<$.length;p++){var y=$[p];d[y]=a[y].$v.validate()}return Promise.all(Object.values(i)).then((function(){return Promise.all(Object.values(d))})).then((function(){}))},a.$v.reset=function(){a[f].setValidated(!1),a[f].setInvalid(!1),a[f].setDirty(!1),a[f].resetPending(),a.$v.errors={},i={};for(var e=0,r=Object.keys(a).filter((function(e){return"$v"!==e&&e!==f}));e<r.length;e++){var t=r[e];a[t].$v.reset()}},a.$v.touch=function(){a[f].setDirty(!0);for(var e=0,r=Object.keys(a).filter((function(e){return"$v"!==e&&e!==f}));e<r.length;e++){var t=r[e];a[t].$v.touch()}}};exports.proxy=function(e){var r=e.form,t=e.schema,n=e.validator;return y({object:r,clone:n,callback:function(e){!function(e){var r=e;void 0===r[f].invalid&&(r[f].invalid=!1,r[f].validated=!1,r[f].pending=0,r[f].dirty=!1,r[f].setValidated=b(r),r[f].setInvalid=j(r),r[f].setDirty=O(r),r[f].setPending=P(r),r[f].resetPending=k(r),r.$v.pending=!1,r.$v.invalid=!1,r.$v.dirty=!1,r.$v.anyDirty=!1,r.$v.error=!1,r.$v.anyError=!1,r.$v.errors={})}(e),function(e){var r=e.rootSchema,t=e.validator,n=t[f].path,a={$params:{},$normalizer:function(e){return e.value},$rules:{},$errors:{}};for(var o in t[f].schema=t[f].schema||{},t[f].schema.$params=a.$params,t[f].schema.$normalizer=a.$normalizer,t[f].schema.$rules=a.$rules,t[f].schema.$errors=a.$errors,m({rootSchema:r,validator:t,path:n.slice(),startIndex:0}),t[f].schema.$rules)void 0===t[f].schema.$errors[o]&&(t[f].schema.$errors[o]=s)}({rootSchema:t,validator:e}),D(r,e),e[f].validated&&e.$v.validate()}})};
