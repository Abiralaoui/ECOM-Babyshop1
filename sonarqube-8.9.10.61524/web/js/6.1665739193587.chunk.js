(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1300:function(e,t,n){var r=n(662),o=n(2025);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1},s=(r(o,i),o.locals?o.locals:{});e.exports=s},1301:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var r=n(13),o=n(756),i=n.n(o),s=n(709),a=n.n(s),c=n(176);function p(e){var t=[{value:"all",label:Object(c.translate)("all")},{value:"users",label:Object(c.translate)("users.page")},{value:"groups",label:Object(c.translate)("user_groups.page")}];return r.createElement("div",{className:"display-flex-row"},r.createElement(i.a,{name:"users-or-groups",onCheck:e.onFilter,options:t,value:e.filter}),r.createElement("div",{className:"flex-1 spacer-left"},r.createElement(a.a,{minLength:3,onChange:e.onSearch,placeholder:Object(c.translate)("search.search_for_users_or_groups"),value:e.query})))}},1327:function(e,t,n){"use strict";var r,o=n(679),i=n.n(o),s=n(877),a=n.n(s),c=n(13),p=n(176),u=n(967),l=n(701),m=n.n(l),f=n(1034),d=n.n(f),h=n(660),g=n(689),y=n.n(g),b=(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),v=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return b(t,e),t.prototype.render=function(){var e=this.props,t=e.loading,n=e.onCheck,r=e.permission,o=e.permissionItem,i=e.selectedPermission;return Object(u.f)(r)?c.createElement("td",{className:"text-middle"},r.permissions.map((function(e){return c.createElement("div",{key:e.key},c.createElement(y.a,{checked:o.permissions.includes(e.key),disabled:t.includes(e.key),id:e.key,onCheck:n},c.createElement("span",{className:"little-spacer-left"},e.name)))}))):c.createElement("td",{className:h("permission-column text-center text-middle",{selected:r.key===i})},c.createElement(y.a,{checked:o.permissions.includes(r.key),disabled:t.includes(r.key),id:r.key,onCheck:n}))},t}(c.PureComponent),_=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),O=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var i=arguments[t],s=0,a=i.length;s<a;s++,o++)r[o]=i[s];return r},j=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.mounted=!1,t.state={loading:[]},t.stopLoading=function(e){t.mounted&&t.setState((function(t){return{loading:m()(t.loading,e)}}))},t.handleCheck=function(e,n){void 0!==n&&(t.setState((function(e){return{loading:O(e.loading,[n])}})),t.props.onToggle(t.props.group,n).then((function(){return t.stopLoading(n)}),(function(){return t.stopLoading(n)})))},t}return _(t,e),t.prototype.componentDidMount=function(){this.mounted=!0},t.prototype.componentWillUnmount=function(){this.mounted=!1},t.prototype.render=function(){var e=this,t=this.props.group;return c.createElement("tr",null,c.createElement("td",{className:"nowrap text-middle"},c.createElement("div",{className:"display-flex-center"},c.createElement(d.a,{className:"big-spacer-right"}),c.createElement("div",{className:"max-width-100"},c.createElement("div",{className:"max-width-100 text-ellipsis"},c.createElement("strong",null,t.name)),c.createElement("div",{className:"little-spacer-top",style:{whiteSpace:"normal"}},t.description)))),this.props.permissions.map((function(n){return c.createElement(v,{key:Object(u.f)(n)?n.category:n.key,loading:e.state.loading,onCheck:e.handleCheck,permission:n,permissionItem:t,selectedPermission:e.props.selectedPermission})})))},t}(c.PureComponent),E=n(672),P=n.n(E),k=n(666),w=n.n(k),N=n(671),x=n(829),C=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),S=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.handlePermissionClick=function(e){e.preventDefault(),e.currentTarget.blur();var n=t.props.permission;t.props.onSelectPermission&&!Object(u.f)(n)&&t.props.onSelectPermission(n.key)},t.getTooltipOverlay=function(){var e=t.props.permission;return Object(u.f)(e)?e.permissions.map((function(e){return c.createElement(c.Fragment,{key:e.key},c.createElement("b",{className:"little-spacer-right"},e.name,":"),c.createElement(x.a,{key:e.key,message:e.description}),c.createElement("br",null))})):t.props.showPublicProjectsWarning&&["user","codeviewer"].includes(e.key)?c.createElement("div",null,c.createElement(x.a,{message:e.description}),c.createElement(N.Alert,{className:"spacer-top",variant:"warning"},Object(p.translate)("projects_role.public_projects_warning"))):c.createElement(x.a,{message:e.description})},t}return C(t,e),t.prototype.render=function(){var e,t=this.props,n=t.onSelectPermission,r=t.permission;return e=Object(u.f)(r)?Object(p.translate)("global_permissions",r.category):n?c.createElement(w.a,{overlay:Object(p.translateWithParameters)("global_permissions.filter_by_x_permission",r.name)},c.createElement("a",{href:"#",onClick:this.handlePermissionClick},r.name)):r.name,c.createElement("th",{className:h("permission-column text-center text-middle",{selected:!Object(u.f)(r)&&r.key===this.props.selectedPermission})},c.createElement("div",{className:"permission-column-inner"},e,c.createElement(P.a,{className:"spacer-left",overlay:this.getTooltipOverlay()})))},t}(c.PureComponent),I=n(745),T=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),A=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var i=arguments[t],s=0,a=i.length;s<a;s++,o++)r[o]=i[s];return r},J=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.mounted=!1,t.state={loading:[]},t.stopLoading=function(e){t.mounted&&t.setState((function(t){return{loading:m()(t.loading,e)}}))},t.handleCheck=function(e,n){void 0!==n&&(t.setState((function(e){return{loading:A(e.loading,[n])}})),t.props.onToggle(t.props.user,n).then((function(){return t.stopLoading(n)}),(function(){return t.stopLoading(n)})))},t}return T(t,e),t.prototype.componentDidMount=function(){this.mounted=!0},t.prototype.componentWillUnmount=function(){this.mounted=!1},t.prototype.render=function(){var e=this,t=this.props.user,n=this.props.permissions.map((function(n){return c.createElement(v,{key:Object(u.f)(n)?n.category:n.key,loading:e.state.loading,onCheck:e.handleCheck,permission:n,permissionItem:t,selectedPermission:e.props.selectedPermission})}));return"<creator>"===t.login?c.createElement("tr",null,c.createElement("td",{className:"nowrap text-middle"},c.createElement("div",null,c.createElement("strong",null,t.name)),c.createElement("div",{className:"little-spacer-top",style:{whiteSpace:"normal"}},Object(p.translate)("permission_templates.project_creators.explanation"))),n):c.createElement("tr",null,c.createElement("td",{className:"nowrap text-middle"},c.createElement("div",{className:"display-flex-center"},c.createElement(I.a,{className:"text-middle big-spacer-right flex-0",hash:t.avatar,name:t.name,size:36}),c.createElement("div",{className:"max-width-100"},c.createElement("div",{className:"max-width-100 text-ellipsis"},c.createElement("strong",null,t.name),c.createElement("span",{className:"note spacer-left"},t.login)),c.createElement("div",{className:"little-spacer-top max-width-100 text-ellipsis"},t.email)))),n)},t}(c.PureComponent),U=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),W=function(){return(W=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},q=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var i=arguments[t],s=0,a=i.length;s<a;s++,o++)r[o]=i[s];return r},L=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={initialPermissionsCount:{}},t.handleGroupToggle=function(e,n){var r=e.id||e.name;return void 0===t.state.initialPermissionsCount[r]&&t.setState((function(t){var n;return{initialPermissionsCount:W(W({},t.initialPermissionsCount),(n={},n[r]=e.permissions.length,n))}})),t.props.onToggleGroup(e,n)},t.handleUserToggle=function(e,n){return void 0===t.state.initialPermissionsCount[e.login]&&t.setState((function(t){var n;return{initialPermissionsCount:W(W({},t.initialPermissionsCount),(n={},n[e.login]=e.permissions.length,n))}})),t.props.onToggleUser(e,n)},t.getItemInitialPermissionsCount=function(e){var n=t.isPermissionUser(e)?e.login:e.id||e.name;return void 0!==t.state.initialPermissionsCount[n]?t.state.initialPermissionsCount[n]:e.permissions.length},t}return U(t,e),t.prototype.componentDidUpdate=function(e){this.props.filter===e.filter&&this.props.query===e.query||this.setState({initialPermissionsCount:{}})},t.prototype.isPermissionUser=function(e){return void 0!==e.login},t.prototype.renderEmpty=function(){var e=this.props.permissions.length+1;return c.createElement("tr",null,c.createElement("td",{colSpan:e},Object(p.translate)("no_results_search")))},t.prototype.renderItem=function(e,t){return this.isPermissionUser(e)?c.createElement(J,{key:"user-"+e.login,onToggle:this.handleUserToggle,permissions:t,selectedPermission:this.props.selectedPermission,user:e}):c.createElement(j,{group:e,key:"group-"+(e.id||e.name),onToggle:this.handleGroupToggle,permissions:t,selectedPermission:this.props.selectedPermission})},t.prototype.render=function(){var e=this,t=this.props.permissions,n=i()(q(this.props.users,this.props.groups),(function(t){return e.isPermissionUser(t)&&"<creator>"===t.login?0:t.name})),r=a()(n,(function(t){return e.getItemInitialPermissionsCount(t)})),o=r[0],s=r[1];return c.createElement("div",{className:"boxed-group boxed-group-inner"},c.createElement("table",{className:"data zebra permissions-table"},c.createElement("thead",null,c.createElement("tr",null,c.createElement("td",{className:"nowrap bordered-bottom"},this.props.children),t.map((function(t){return c.createElement(S,{key:Object(u.f)(t)?t.category:t.key,onSelectPermission:e.props.onSelectPermission,permission:t,selectedPermission:e.props.selectedPermission,showPublicProjectsWarning:e.props.showPublicProjectsWarning})})))),c.createElement("tbody",null,0===n.length&&!this.props.loading&&this.renderEmpty(),o.map((function(n){return e.renderItem(n,t)})),o.length>0&&s.length>0&&c.createElement(c.Fragment,null,c.createElement("tr",null,c.createElement("td",{className:"divider",colSpan:20})),c.createElement("tr",null)),s.map((function(n){return e.renderItem(n,t)})))))},t}(c.PureComponent);t.a=L},2025:function(e,t,n){(t=n(663)(!1)).push([e.i,'.permissions-table .permission-column.selected{background-color:#d9edf7}.permissions-table .permission-column-inner{width:90px}.permissions-table .divider{background:#fff;padding:16px 0}.permissions-table .divider:after{display:block;content:"";background:#e6e6e6;height:1px;width:100%}.permissions-table td:first-of-type{max-width:320px}',""]),e.exports=t},873:function(e,t,n){"use strict";n.d(t,"p",(function(){return i})),n.d(t,"u",(function(){return s})),n.d(t,"o",(function(){return a})),n.d(t,"t",(function(){return c})),n.d(t,"l",(function(){return p})),n.d(t,"f",(function(){return u})),n.d(t,"y",(function(){return l})),n.d(t,"g",(function(){return m})),n.d(t,"x",(function(){return f})),n.d(t,"b",(function(){return d})),n.d(t,"c",(function(){return h})),n.d(t,"r",(function(){return g})),n.d(t,"w",(function(){return y})),n.d(t,"q",(function(){return b})),n.d(t,"v",(function(){return v})),n.d(t,"a",(function(){return _})),n.d(t,"s",(function(){return O})),n.d(t,"n",(function(){return j})),n.d(t,"m",(function(){return E})),n.d(t,"i",(function(){return P})),n.d(t,"h",(function(){return k})),n.d(t,"k",(function(){return w})),n.d(t,"j",(function(){return N})),n.d(t,"e",(function(){return x})),n.d(t,"d",(function(){return C}));var r=n(49),o=n(673);function i(e){return Object(r.post)("/api/permissions/add_user",e).catch(o.a)}function s(e){return Object(r.post)("/api/permissions/remove_user",e).catch(o.a)}function a(e){return Object(r.post)("/api/permissions/add_group",e).catch(o.a)}function c(e){return Object(r.post)("/api/permissions/remove_group",e).catch(o.a)}function p(){return Object(r.getJSON)("/api/permissions/search_templates")}function u(e){return Object(r.postJSON)("/api/permissions/create_template",e)}function l(e){return Object(r.post)("/api/permissions/update_template",e)}function m(e){return Object(r.post)("/api/permissions/delete_template",e).catch(o.a)}function f(e,t){return Object(r.post)("/api/permissions/set_default_template",{templateId:e,qualifier:t})}function d(e){return Object(r.post)("/api/permissions/apply_template",e).catch(o.a)}function h(e){return Object(r.post)("/api/permissions/bulk_apply_template",e)}function g(e){return Object(r.post)("/api/permissions/add_user_to_template",e)}function y(e){return Object(r.post)("/api/permissions/remove_user_from_template",e)}function b(e){return Object(r.post)("/api/permissions/add_group_to_template",e)}function v(e){return Object(r.post)("/api/permissions/remove_group_from_template",e)}function _(e,t){return Object(r.post)("/api/permissions/add_project_creator_to_template",{templateId:e,permission:t})}function O(e,t){return Object(r.post)("/api/permissions/remove_project_creator_from_template",{templateId:e,permission:t})}function j(e){return e.ps||(e.ps=100),Object(r.getJSON)("/api/permissions/users",e).catch(o.a)}function E(e){return e.ps||(e.ps=100),Object(r.getJSON)("/api/permissions/groups",e).catch(o.a)}function P(e){return e.ps||(e.ps=100),Object(r.getJSON)("/api/permissions/users",e)}function k(e){return e.ps||(e.ps=100),Object(r.getJSON)("/api/permissions/groups",e)}function w(e,t,n){var o={templateId:e,ps:100};return t&&(o.q=t),n&&(o.permission=n),Object(r.getJSON)("/api/permissions/template_users",o).then((function(e){return e.users}))}function N(e,t,n){var o={templateId:e,ps:100};return t&&(o.q=t),n&&(o.permission=n),Object(r.getJSON)("/api/permissions/template_groups",o).then((function(e){return e.groups}))}function x(e,t){return Object(r.post)("/api/projects/update_visibility",{project:e,visibility:t}).catch(o.a)}function C(e){return Object(r.post)("/api/projects/update_default_visibility",{projectVisibility:e}).catch(o.a)}},967:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return u})),n.d(t,"e",(function(){return m})),n.d(t,"d",(function(){return f})),n.d(t,"f",(function(){return d}));var r=n(176),o=n(38);function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var s=function(){return(s=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},a=["user","codeviewer","issueadmin","securityhotspotadmin","admin","scan"],c=["admin",{category:"administer",permissions:["gateadmin","profileadmin"]},"scan",{category:"creator",permissions:["provisioning","applicationcreator","portfoliocreator"]}],p=["user","admin"],u={TRK:a,VW:p,SVW:p,APP:p,DEV:["user","admin"]};function l(e,t){var n=function(e){var t=e+".sonarcloud";return Object(o.isSonarCloud)()&&Object(r.hasMessage)(t)?Object(r.translate)(t):Object(r.translate)(e)};return{key:e,name:n(t+"."+e),description:n(t+"."+e+".desc")}}function m(e,t,n){return e.map((function(e){return"object"===i(e)&&"creator"===e.category?s(s({},e),{permissions:e.permissions.filter((function(e){return"provisioning"===e||"portfoliocreator"===e&&n||"applicationcreator"===e&&t}))}):e}))}function f(e,t){return e.map((function(e){return"object"===i(e)?{category:e.category,permissions:e.permissions.map((function(e){return l(e,t)}))}:l(e,t)}))}function d(e){return Boolean(e&&e.category)}}}]);
//# sourceMappingURL=6.1665739193587.chunk.js.map