(window.webpackJsonp=window.webpackJsonp||[]).push([[341],{1839:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return ue}));var a=n(2),o=n(335),s=n(31),r=n(9),l=n(324);function i(e){return Object(r.getJSON)("/api/webhooks/deliveries",e).catch(l.a)}function c(e){return Object(r.getJSON)("/api/webhooks/delivery",e).catch(l.a)}var h=n(341),d=n(312),m=n(317),u=n.n(m),p=n(1774),b=n.n(p),g=n(1776),k=n.n(g),w=n(340),E=n.n(w),y=n(346),v=n.n(y),O=n(424);class f extends a.PureComponent{constructor(){super(...arguments),this.handleCancelClick=e=>{e.preventDefault(),e.currentTarget.blur(),this.props.onClose()},this.handleValidate=e=>{const{name:t,secret:n,url:a}=e,o={};return t.trim()||(o.name=Object(s.translate)("webhooks.name.required")),a.trim()?a.startsWith("http://")||a.startsWith("https://")?Object(O.isWebUri)(a)||(o.url=Object(s.translate)("webhooks.url.bad_format")):o.url=Object(s.translate)("webhooks.url.bad_protocol"):o.url=Object(s.translate)("webhooks.url.required"),n&&n.length>200&&(o.secret=Object(s.translate)("webhooks.secret.bad_format")),o}}render(){const{webhook:e}=this.props,t=!!e,n=t?Object(s.translate)("webhooks.update"):Object(s.translate)("webhooks.create"),o=t?Object(s.translate)("update_verb"):Object(s.translate)("create");return a.createElement(k.a,{confirmButtonText:o,header:n,initialValues:{name:e&&e.name||"",secret:e&&e.secret||"",url:e&&e.url||""},isInitialValid:t,onClose:this.props.onClose,onSubmit:this.props.onDone,size:"small",validate:this.handleValidate},({dirty:e,errors:t,handleBlur:n,handleChange:o,isSubmitting:r,touched:l,values:i})=>a.createElement(a.Fragment,null,a.createElement(v.a,{className:"big-spacer-bottom"}),a.createElement(b.a,{autoFocus:!0,dirty:e,disabled:r,error:t.name,id:"webhook-name",label:a.createElement("label",{htmlFor:"webhook-name"},Object(s.translate)("webhooks.name"),a.createElement(E.a,null)),name:"name",onBlur:n,onChange:o,touched:l.name,type:"text",value:i.name}),a.createElement(b.a,{description:Object(s.translate)("webhooks.url.description"),dirty:e,disabled:r,error:t.url,id:"webhook-url",label:a.createElement("label",{htmlFor:"webhook-url"},Object(s.translate)("webhooks.url"),a.createElement(E.a,null)),name:"url",onBlur:n,onChange:o,touched:l.url,type:"text",value:i.url}),a.createElement(b.a,{description:Object(s.translate)("webhooks.secret.description"),dirty:e,disabled:r,error:t.secret,id:"webhook-secret",label:a.createElement("label",{htmlFor:"webhook-secret"},Object(s.translate)("webhooks.secret")),name:"secret",onBlur:n,onChange:o,touched:l.secret,type:"password",value:i.secret})))}}class j extends a.PureComponent{constructor(){super(...arguments),this.mounted=!1,this.state={openCreate:!1},this.handleCreateClose=()=>{this.mounted&&this.setState({openCreate:!1})},this.handleCreateOpen=()=>{this.setState({openCreate:!0})},this.renderCreate=()=>this.props.webhooksCount>=10?a.createElement(u.a,{overlay:Object(s.translateWithParameters)("webhooks.maximum_reached",10)},a.createElement(d.Button,{className:"js-webhook-create disabled"},Object(s.translate)("create"))):a.createElement(a.Fragment,null,a.createElement(d.Button,{className:"js-webhook-create",onClick:this.handleCreateOpen},Object(s.translate)("create")),this.state.openCreate&&a.createElement(f,{onClose:this.handleCreateClose,onDone:this.props.onCreate}))}componentDidMount(){this.mounted=!0}componentWillUnmount(){this.mounted=!1}render(){return this.props.loading?null:a.createElement("div",{className:"page-actions"},this.renderCreate())}}var C=n(316),S=n(318);function N({children:e,loading:t}){return a.createElement("header",{className:"page-header"},a.createElement("h1",{className:"page-title"},Object(s.translate)("webhooks.page")),t&&a.createElement("i",{className:"spinner"}),e,a.createElement("p",{className:"page-description"},a.createElement(C.FormattedMessage,{defaultMessage:Object(s.translate)("webhooks.description"),id:"webhooks.description",values:{url:a.createElement(S.c,{to:"/documentation/project-administration/webhooks/"},Object(s.translate)("webhooks.documentation_link"))}})))}var D=n(330),P=n.n(D),x=n(373),U=n.n(x),_=n(332),M=n.n(_),W=n(319),B=n.n(W);function J({onClose:e,onSubmit:t,webhook:n}){const o=Object(s.translate)("webhooks.delete");return a.createElement(M.a,{header:o,onClose:e,onSubmit:t},({onCloseClick:e,onFormSubmit:t,submitting:r})=>a.createElement("form",{onSubmit:t},a.createElement("header",{className:"modal-head"},a.createElement("h2",null,o)),a.createElement("div",{className:"modal-body"},Object(s.translateWithParameters)("webhooks.delete.confirm",n.name)),a.createElement("footer",{className:"modal-foot"},a.createElement(B.a,{className:"spacer-right",loading:r}),a.createElement(d.SubmitButton,{className:"button-red",disabled:r},Object(s.translate)("delete")),a.createElement(d.ResetButtonLink,{disabled:r,onClick:e},Object(s.translate)("cancel")))))}var L=n(351),F=n.n(L),I=n(331),A=n.n(I),R=n(604),V=n.n(R),q=n(476),H=n.n(q),z=n(454),T=n.n(z),G=n(364),K=n.n(G),Q=n(320),X=n(392);function Y({className:e,delivery:t,loading:n,payload:o}){return a.createElement("div",{className:e},a.createElement("p",{className:"spacer-bottom"},Object(s.translateWithParameters)("webhooks.delivery.response_x",t.httpStatus||Object(s.translate)("webhooks.delivery.server_unreachable"))),a.createElement("p",{className:"spacer-bottom"},Object(s.translateWithParameters)("webhooks.delivery.duration_x",Object(Q.formatMeasure)(t.durationMs,"MILLISEC"))),a.createElement("p",{className:"spacer-bottom"},Object(s.translate)("webhooks.delivery.payload")),a.createElement(B.a,{className:"spacer-left spacer-top",loading:n},o&&a.createElement(X.a,{noCopy:!0,snippet:Z(o)})))}function Z(e){try{return JSON.stringify(JSON.parse(e),void 0,2)}catch(t){return e}}class $ extends a.PureComponent{constructor(){super(...arguments),this.mounted=!1,this.state={loading:!1,open:!1},this.fetchPayload=({delivery:e}=this.props)=>(this.setState({loading:!0}),c({deliveryId:e.id}).then(({delivery:e})=>{this.mounted&&this.setState({payload:e.payload,loading:!1})},()=>{this.mounted&&this.setState({loading:!1})})),this.formatPayload=e=>{try{return JSON.stringify(JSON.parse(e),void 0,2)}catch(t){return e}},this.handleClick=()=>{this.state.payload||this.fetchPayload(),this.setState(({open:e})=>({open:!e}))}}componentDidMount(){this.mounted=!0}componentWillUnmount(){this.mounted=!1}render(){const{delivery:e}=this.props,{loading:t,open:n,payload:o}=this.state;return a.createElement(V.a,{onClick:this.handleClick,open:n,renderHeader:()=>e.success?a.createElement(T.a,{className:"pull-right js-success"}):a.createElement(H.a,{className:"pull-right js-error"}),title:a.createElement(K.a,{date:e.at})},a.createElement(Y,{className:"big-spacer-left",delivery:e,loading:t,payload:o}))}}class ee extends a.PureComponent{constructor(){super(...arguments),this.mounted=!1,this.state={deliveries:[],loading:!0},this.fetchDeliveries=({webhook:e}=this.props)=>{i({webhook:e.key,ps:10}).then(({deliveries:e,paging:t})=>{this.mounted&&this.setState({deliveries:e,loading:!1,paging:t})},this.stopLoading)},this.fetchMoreDeliveries=({webhook:e}=this.props)=>{const{paging:t}=this.state;t&&(this.setState({loading:!0}),i({webhook:e.key,p:t.pageIndex+1,ps:10}).then(({deliveries:e,paging:t})=>{this.mounted&&this.setState(n=>({deliveries:[...n.deliveries,...e],loading:!1,paging:t}))},this.stopLoading))},this.stopLoading=()=>{this.mounted&&this.setState({loading:!1})}}componentDidMount(){this.mounted=!0,this.fetchDeliveries()}componentWillUnmount(){this.mounted=!1}render(){const{webhook:e}=this.props,{deliveries:t,loading:n,paging:o}=this.state,r=Object(s.translateWithParameters)("webhooks.deliveries_for_x",e.name);return a.createElement(A.a,{contentLabel:r,onRequestClose:this.props.onClose},a.createElement("header",{className:"modal-head"},a.createElement("h2",null,r)),a.createElement("div",{className:"modal-body modal-container"},t.map(e=>a.createElement($,{delivery:e,key:e.id})),a.createElement("div",{className:"text-center"},a.createElement(B.a,{loading:n})),void 0!==o&&a.createElement(F.a,{className:"little-spacer-bottom",count:t.length,loadMore:this.fetchMoreDeliveries,ready:!n,total:o.total})),a.createElement("footer",{className:"modal-foot"},a.createElement(d.ResetButtonLink,{className:"js-modal-close",onClick:this.props.onClose},Object(s.translate)("close"))))}}function te(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function ne(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class ae extends a.PureComponent{constructor(){super(...arguments),this.mounted=!1,this.state={deleting:!1,deliveries:!1,updating:!1},this.handleDelete=()=>this.props.onDelete(this.props.webhook.key),this.handleDeleteClick=()=>{this.setState({deleting:!0})},this.handleDeletingStop=()=>{this.mounted&&this.setState({deleting:!1})},this.handleDeliveriesClick=()=>{this.setState({deliveries:!0})},this.handleDeliveriesStop=()=>{this.setState({deliveries:!1})},this.handleUpdate=e=>this.props.onUpdate(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?te(Object(n),!0).forEach((function(t){ne(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):te(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e,{webhook:this.props.webhook.key})),this.handleUpdateClick=()=>{this.setState({updating:!0})},this.handleUpdatingStop=()=>{this.setState({updating:!1})}}componentDidMount(){this.mounted=!0}componentWillUnmount(){this.mounted=!1}render(){const{webhook:e}=this.props;return a.createElement(a.Fragment,null,a.createElement(U.a,{className:"big-spacer-left"},a.createElement(x.ActionsDropdownItem,{className:"js-webhook-update",onClick:this.handleUpdateClick},Object(s.translate)("update_verb")),e.latestDelivery&&a.createElement(x.ActionsDropdownItem,{className:"js-webhook-deliveries",onClick:this.handleDeliveriesClick},Object(s.translate)("webhooks.deliveries.show")),a.createElement(x.ActionsDropdownDivider,null),a.createElement(x.ActionsDropdownItem,{className:"js-webhook-delete",destructive:!0,onClick:this.handleDeleteClick},Object(s.translate)("delete"))),this.state.deliveries&&a.createElement(ee,{onClose:this.handleDeliveriesStop,webhook:e}),this.state.updating&&a.createElement(f,{onClose:this.handleUpdatingStop,onDone:this.handleUpdate,webhook:e}),this.state.deleting&&a.createElement(J,{onClose:this.handleDeletingStop,onSubmit:this.handleDelete,webhook:e}))}}var oe=n(629),se=n.n(oe);class re extends a.PureComponent{constructor(){super(...arguments),this.mounted=!1,this.state={loading:!0},this.fetchPayload=({delivery:e}=this.props)=>c({deliveryId:e.id}).then(({delivery:e})=>{this.mounted&&this.setState({payload:e.payload,loading:!1})},()=>{this.mounted&&this.setState({loading:!1})}),this.formatPayload=e=>{try{return JSON.stringify(JSON.parse(e),void 0,2)}catch(t){return e}}}componentDidMount(){this.mounted=!0,this.fetchPayload()}componentWillUnmount(){this.mounted=!1}render(){const{delivery:e,webhook:t}=this.props,{loading:n,payload:o}=this.state,r=Object(s.translateWithParameters)("webhooks.latest_delivery_for_x",t.name);return a.createElement(A.a,{contentLabel:r,onRequestClose:this.props.onClose},a.createElement("header",{className:"modal-head"},a.createElement("h2",null,r)),a.createElement(Y,{className:"modal-body modal-container",delivery:e,loading:n,payload:o}),a.createElement("footer",{className:"modal-foot"},a.createElement(d.ResetButtonLink,{className:"js-modal-close",onClick:this.props.onClose},Object(s.translate)("close"))))}}class le extends a.PureComponent{constructor(){super(...arguments),this.mounted=!1,this.state={modal:!1},this.handleClick=()=>{this.setState({modal:!0})},this.handleModalClose=()=>{this.mounted&&this.setState({modal:!1})}}componentDidMount(){this.mounted=!0}componentWillUnmount(){this.mounted=!1}render(){const{webhook:e}=this.props;if(!e.latestDelivery)return a.createElement("span",null,Object(s.translate)("webhooks.last_execution.none"));const{modal:t}=this.state;return a.createElement(a.Fragment,null,e.latestDelivery.success?a.createElement(T.a,{className:"text-text-top"}):a.createElement(H.a,{className:"text-text-top"}),a.createElement("span",{className:"spacer-left display-inline-flex-center"},a.createElement(K.a,{date:e.latestDelivery.at}),a.createElement(d.ButtonIcon,{className:"button-small little-spacer-left",onClick:this.handleClick},a.createElement(se.a,null))),t&&a.createElement(re,{delivery:e.latestDelivery,onClose:this.handleModalClose,webhook:e}))}}function ie({onDelete:e,onUpdate:t,webhook:n}){return a.createElement("tr",null,a.createElement("td",null,n.name),a.createElement("td",null,n.url),a.createElement("td",null,n.secret?Object(s.translate)("yes"):Object(s.translate)("no")),a.createElement("td",null,a.createElement(le,{webhook:n})),a.createElement("td",{className:"thin nowrap text-right"},a.createElement(ae,{onDelete:e,onUpdate:t,webhook:n})))}class ce extends a.PureComponent{constructor(){super(...arguments),this.renderHeader=()=>a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",null,Object(s.translate)("name")),a.createElement("th",null,Object(s.translate)("webhooks.url")),a.createElement("th",null,Object(s.translate)("webhooks.secret_header")),a.createElement("th",null,Object(s.translate)("webhooks.last_execution")),a.createElement("th",null)))}render(){const{webhooks:e}=this.props;return e.length<1?a.createElement("p",null,Object(s.translate)("webhooks.no_result")):a.createElement("table",{className:"data zebra"},this.renderHeader(),a.createElement("tbody",null,P()(e,e=>e.name.toLowerCase()).map(e=>a.createElement(ie,{key:e.key,onDelete:this.props.onDelete,onUpdate:this.props.onUpdate,webhook:e}))))}}function he(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function de(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?he(Object(n),!0).forEach((function(t){me(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):he(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function me(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class ue extends a.PureComponent{constructor(){super(...arguments),this.mounted=!1,this.state={loading:!0,webhooks:[]},this.fetchWebhooks=()=>{return(e=this.getScopeParams(),Object(r.getJSON)("/api/webhooks/list",e).catch(l.a)).then(({webhooks:e})=>{this.mounted&&this.setState({loading:!1,webhooks:e})},()=>{this.mounted&&this.setState({loading:!1})});var e},this.getScopeParams=({component:e}=this.props)=>({project:e&&e.key}),this.handleCreate=e=>function(e){return Object(r.postJSON)("/api/webhooks/create",e).catch(l.a)}(de({name:e.name,url:e.url},e.secret&&{secret:e.secret},{},this.getScopeParams())).then(({webhook:e})=>{this.mounted&&this.setState(({webhooks:t})=>({webhooks:[...t,e]}))}),this.handleDelete=e=>{return(t={webhook:e},Object(r.post)("/api/webhooks/delete",t).catch(l.a)).then(()=>{this.mounted&&this.setState(({webhooks:t})=>({webhooks:t.filter(t=>t.key!==e)}))});var t},this.handleUpdate=e=>function(e){return Object(r.post)("/api/webhooks/update",e).catch(l.a)}(de({webhook:e.webhook,name:e.name,url:e.url},e.secret&&{secret:e.secret})).then(()=>{this.mounted&&this.setState(({webhooks:t})=>({webhooks:t.map(t=>t.key===e.webhook?de({},t,{name:e.name,secret:e.secret,url:e.url}):t)}))})}componentDidMount(){this.mounted=!0,this.fetchWebhooks()}componentWillUnmount(){this.mounted=!1}render(){const{loading:e,webhooks:t}=this.state;return a.createElement(a.Fragment,null,a.createElement(h.a,{suggestions:"webhooks"}),a.createElement(o.a,{defer:!1,title:Object(s.translate)("webhooks.page")}),a.createElement("div",{className:"page page-limited"},a.createElement(N,{loading:e},a.createElement(j,{loading:e,onCreate:this.handleCreate,webhooksCount:t.length})),!e&&a.createElement("div",{className:"boxed-group boxed-group-inner"},a.createElement(ce,{onDelete:this.handleDelete,onUpdate:this.handleUpdate,webhooks:t}))))}}},341:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n(2),o=n(378);function s({suggestions:e}){return a.createElement(o.a.Consumer,null,({addSuggestions:t,removeSuggestions:n})=>a.createElement(r,{addSuggestions:t,removeSuggestions:n,suggestions:e}))}class r extends a.PureComponent{componentDidMount(){this.props.addSuggestions(this.props.suggestions)}componentDidUpdate(e){e.suggestions!==this.props.suggestions&&(this.props.removeSuggestions(this.props.suggestions),this.props.addSuggestions(e.suggestions))}componentWillUnmount(){this.props.removeSuggestions(this.props.suggestions)}render(){return null}}},392:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n(311),o=n(2),s=n(354),r=n(401);n(703);function l(e){const{isOneLine:t,noCopy:n,snippet:l}=e,i=o.useRef(null);let c;return c=Array.isArray(l)?l.filter(e=>Object(r.isDefined)(e)).join(t?" ":" \\\n  "):l,o.createElement("div",{className:a("code-snippet spacer-top spacer-bottom display-flex-row",{})},o.createElement("pre",{className:"flex-1",ref:i},c),!n&&o.createElement(s.ClipboardButton,{copyValue:c}))}},703:function(e,t,n){var a=n(313),o=n(704);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var s={insert:"head",singleton:!1},r=(a(o,s),o.locals?o.locals:{});e.exports=r},704:function(e,t,n){(t=n(314)(!1)).push([e.i,".code-snippet{background:#e6e6e6;border-radius:3px}.code-snippet pre{padding:8px 16px;border-right:1px solid hsla(0,0%,78.4%,.5);overflow-y:hidden;overflow-x:auto}.code-snippet>button{height:auto;border:0;border-radius:0;background:transparent;padding:8px}.code-snippet>button:active,.code-snippet>button:focus,.code-snippet>button:hover{background-color:hsla(0,0%,78.4%,.5);color:#236a97}",""]),e.exports=t}}]);
//# sourceMappingURL=341.m.169a7c6c.chunk.js.map