(window.webpackJsonp=window.webpackJsonp||[]).push([[362],{1817:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return i}));var r=n(2),l=n(318),a=n(326),s=n(31),c=n(339),o=n(378);class i extends r.PureComponent{constructor(){super(...arguments),this.renderSuggestions=({suggestions:e})=>0===e.length?null:r.createElement(r.Fragment,null,this.renderTitle(Object(s.translate)("embed_docs.suggestion")),e.map((e,t)=>r.createElement("li",{key:t},r.createElement(l.c,{onClick:this.props.onClose,target:"_blank",to:e.link},e.text))),r.createElement("li",{className:"divider"}))}renderTitle(e){return r.createElement("li",{className:"menu-header"},e)}renderIconLink(e,t,n){return r.createElement("a",{href:e,rel:"noopener noreferrer",target:"_blank"},r.createElement("img",{alt:n,className:"spacer-right",height:"18",src:"".concat(Object(c.getBaseUrl)(),"/images/").concat(t),width:"18"}),n)}render(){return r.createElement(a.DropdownOverlay,null,r.createElement("ul",{className:"menu abs-width-240"},r.createElement(o.a.Consumer,null,this.renderSuggestions),r.createElement("li",null,r.createElement(l.c,{onClick:this.props.onClose,target:"_blank",to:"/documentation"},Object(s.translate)("embed_docs.documentation"))),r.createElement("li",null,r.createElement(l.c,{onClick:this.props.onClose,to:"/web_api"},Object(s.translate)("api_documentation.page"))),r.createElement("li",{className:"divider"}),r.createElement("li",null,r.createElement("a",{href:"https://community.sonarsource.com/",rel:"noopener noreferrer",target:"_blank"},Object(s.translate)("embed_docs.get_help"))),r.createElement("li",{className:"divider"}),this.renderTitle(Object(s.translate)("embed_docs.stay_connected")),r.createElement("li",null,this.renderIconLink("https://www.sonarqube.org/whats-new/?referrer=sonarqube","embed-doc/sq-icon.svg",Object(s.translate)("embed_docs.news"))),r.createElement("li",null,this.renderIconLink("https://twitter.com/SonarQube","embed-doc/twitter-icon.svg","Twitter"))))}}}}]);
//# sourceMappingURL=362.m.dcfcdd0a.chunk.js.map