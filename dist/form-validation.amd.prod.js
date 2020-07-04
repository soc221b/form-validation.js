define(["exports"],(function(e){"use strict";
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
    ***************************************************************************** */var r=function(){return(r=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var a in r=arguments[n])Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);return e}).apply(this,arguments)};function n(e,r,n,t){return new(n||(n=Promise))((function(a,o){function i(e){try{u(t.next(e))}catch(e){o(e)}}function c(e){try{u(t.throw(e))}catch(e){o(e)}}function u(e){var r;e.done?a(e.value):(r=e.value,r instanceof n?r:new n((function(e){e(r)}))).then(i,c)}u((t=t.apply(e,r||[])).next())}))}function t(e,r){var n,t,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,t&&(a=2&o[0]?t.return:o[0]?t.throw||((a=t.return)&&a.call(t),0):t.next)&&!(a=a.call(t,o[1])).done)return a;switch(t=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,t=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=i.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=r.call(e,i)}catch(e){o=[6,e],t=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}}function a(e){return Object.prototype.toString.call(e)}function o(e){return"[object Object]"===a(e)}function i(e){return"[object Array]"===a(e)}function c(e){return"function"==typeof e}function u(e){return null!==e&&"object"==typeof e&&c(e.then)}function l(e,r){if(0===r.length)return e;var n=e;return r.slice(0,-1).forEach((function(e){n=n[e]})),n[r[r.length-1]]}function s(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r]}var f="__form_validation__",v="__form_validation_reactive",d=function(e,r,n){var t;(o(e)||i(e))&&Object.defineProperty(e,v,{enumerable:!1,configurable:!0,value:e}),(o(r)||i(r))&&(Object.defineProperty(r,v,{enumerable:!1,configurable:!0,value:r}),Object.defineProperty(r,f,{enumerable:!1,configurable:!0,value:r[f]||(t={},t.path=n,t)}),Object.defineProperty(r,"$v",{enumerable:!1,configurable:!0,value:r.$v||{}}))},$=function(e){var r=e.object,n=e.clone,t=e.path,a=void 0===t?[]:t,c=e.wrap,u=void 0===c?d:c,l=e.callback,s=void 0===l?function(){}:l;if(u(r,n,a),(o(n)||i(n))&&s(n),!1===o(r)&&!1===i(r))return r;for(var f=0,v=Object.keys(r);f<v.length;f++){var h=v[f];Reflect.set(n,h,n[h]||(i(r[h])?[]:{})),Reflect.set(r,h,$({object:r[h],clone:n[h],path:a.concat(h),wrap:u,callback:s}))}return new Proxy(r,{deleteProperty:function(e,r){return Reflect.deleteProperty(n,r),Reflect.deleteProperty(e,r)},set:function(e,r,t){return Reflect.set(n,r,n[r]||(i(t)?[]:{})),Reflect.set(e,r,$({object:t,clone:n[r],path:a.concat(r),wrap:u,callback:s}))}})},h={},p=function(e){return e.value},y={},m={};var b=function(e){return function(r){e[f].validated=r}},g=function(e){return function(r){e[f].invalid=r,P(e),z(e),D(e)}},j=function(e){return function(r){e[f].dirty=r,_(e),x(e),z(e),D(e)}},k=function(e){return function(r){e[f].pending+=!0===r?1:-1,O(e),P(e),z(e),D(e)}},w=function(e){return function(){e[f].pending=0,O(e),P(e),z(e),D(e)}},O=function(e){e.$v.pending=0!==e[f].pending||R(e).some((function(e){return e.$v.pending}))},P=function(e){e.$v.invalid=e[f].invalid&&0===e[f].pending||R(e).some((function(e){return e.$v.invalid}))},_=function(e){e.$v.dirty=e[f].dirty||0!==R(e).length&&R(e).every((function(e){return e.$v.dirty}))},x=function(e){e.$v.anyDirty=e[f].dirty||R(e).some((function(e){return e.$v.anyDirty}))},z=function(e){e.$v.error=e[f].dirty&&e[f].invalid&&0===e[f].pending},D=function(e){e.$v.anyError=e[f].dirty&&e[f].invalid&&0===e[f].pending||R(e).some((function(e){return e.$v.anyError}))},R=function(e){return Object.keys(e).filter((function(e){return e!==f&&"$v"!==e})).map((function(r){return e[r]}))},E=function(e,a){var o=a[f].schema,i=null;a.$v.validate=function(){a[f].setValidated(!0),a[f].setInvalid(!1),a[f].resetPending(),a.$v.errors={},i=null;for(var c=function(e){for(var a,o,i=e.rootForm,c=e.validator,s=r(((a={}).$rules={},a),c[f].schema.$params),v=c[f].schema.$normalizer,d=c[f].schema.$rules,$=c[f].schema.$errors,h=i,p=c[f].path,y=0===p.length?void 0:l(i,p.slice(0,-1)),m=0===p.length?void 0:p[p.length-1],b=v({value:0===p.length?i:l(i,p),key:m,parent:y,path:p,root:h,params:s}),g=((o={}).$rules={},o),j=function(e){var r={value:b,key:m,parent:y,path:p,root:h,params:s},a=d[e](r);g.$rules[e]=a,r.params.$rules[e]=a,g[e]=void 0,u(a)?a.finally((function(){return n(void 0,void 0,void 0,(function(){return t(this,(function(n){switch(n.label){case 0:return[4,a];case 1:return void 0!==n.sent()&&(g[e]=$[e](r)),[2]}}))}))})):void 0!==a&&(g[e]=$[e](r))},k=0,w=Object.keys(d);k<w.length;k++){j(w[k])}return g}({rootForm:e,validator:a}),s=function(e){u(c.$rules[e])?(a[f].setPending(!0),c.$rules[e].finally((function(){return n(void 0,void 0,void 0,(function(){var r,n;return t(this,(function(t){switch(t.label){case 0:return i!==c.$rules?[2]:[4,c.$rules[e]];case 1:return void 0===t.sent()?[3,3]:(a[f].setInvalid(!0),r=a.$v.errors,n=e,[4,c[e]]);case 2:r[n]=t.sent(),t.label=3;case 3:return a[f].setPending(!1),[2]}}))}))}))):void 0!==c.$rules[e]&&(a[f].setInvalid(!0),a.$v.errors[e]=c[e])},v=0,d=Object.keys(o.$rules);v<d.length;v++){s(d[v])}i=c.$rules;for(var $=0,h=Object.keys(a).filter((function(e){return"$v"!==e&&e!==f}));$<h.length;$++){var p=h[$];a[p].$v.validate()}},a.$v.reset=function(){a[f].setValidated(!1),a[f].setInvalid(!1),a[f].setDirty(!1),a[f].resetPending(),a.$v.errors={},i=null;for(var e=0,r=Object.keys(a).filter((function(e){return"$v"!==e&&e!==f}));e<r.length;e++){var n=r[e];a[n].$v.reset()}},a.$v.touch=function(){a[f].setDirty(!0);for(var e=0,r=Object.keys(a).filter((function(e){return"$v"!==e&&e!==f}));e<r.length;e++){var n=r[e];a[n].$v.touch()}}};e.proxy=function(e){var r=e.form,n=e.schema,t=e.validator;return $({object:r,clone:t,callback:function(e){!function(e){var r=e;void 0===r[f].invalid&&(r[f].invalid=!1,r[f].validated=!1,r[f].pending=0,r[f].dirty=!1,r[f].setValidated=b(r),r[f].setInvalid=g(r),r[f].setDirty=j(r),r[f].setPending=k(r),r[f].resetPending=w(r),r.$v.pending=!1,r.$v.invalid=!1,r.$v.dirty=!1,r.$v.anyDirty=!1,r.$v.error=!1,r.$v.anyError=!1,r.$v.errors={})}(e),function(e){var r,n=e.rootSchema,t=e.validator,a=t[f].path;if(t[f].schema=t[f].schema||{},t[f].schema.$params=h,t[f].schema.$normalizer=p,t[f].schema.$rules=y,t[f].schema.$errors=m,0!==a.length){try{r=l(n,a.slice(0,-1).concat("$iter"))}catch(e){}r&&(o(r.$params)&&(t[f].schema.$params=r.$params),c(r.$normalizer)&&(t[f].schema.$normalizer=r.$normalizer),o(r.$rules)&&(t[f].schema.$rules=r.$rules),o(r.$errors)&&(t[f].schema.$errors=r.$errors))}try{r=l(n,a)}catch(e){}for(var i in r&&(o(r.$params)&&(t[f].schema.$params=r.$params),c(r.$normalizer)&&(t[f].schema.$normalizer=r.$normalizer),o(r.$rules)&&(t[f].schema.$rules=r.$rules),o(r.$errors)&&(t[f].schema.$errors=r.$errors)),t[f].schema.$rules)void 0===t[f].schema.$errors[i]&&(t[f].schema.$errors[i]=s)}({rootSchema:n,validator:e}),E(r,e),e[f].validated&&e.$v.validate()}})},Object.defineProperty(e,"__esModule",{value:!0})}));
