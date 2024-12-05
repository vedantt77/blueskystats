import{r as e,a as t,R as s}from"./vendor-cfa0d014.js";import{d as r}from"./atproto-e2610ded.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const s of e)if("childList"===s.type)for(const e of s.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var a={exports:{}},l={},i=e,n=Symbol.for("react.element"),d=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,c=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,x={key:!0,ref:!0,__self:!0,__source:!0};function g(e,t,s){var r,a={},l=null,i=null;for(r in void 0!==s&&(l=""+s),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(i=t.ref),t)o.call(t,r)&&!x.hasOwnProperty(r)&&(a[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===a[r]&&(a[r]=t[r]);return{$$typeof:n,type:e,key:l,ref:i,props:a,_owner:c.current}}l.Fragment=d,l.jsx=g,l.jsxs=g,a.exports=l;var h=a.exports,m={},u=t;m.createRoot=u.createRoot,m.hydrateRoot=u.hydrateRoot;class b{constructor(e){this.agent=new r.BskyAgent({service:e}),this.queue=[],this.processing=!1,this.retryDelay=2e3,this.maxRetries=5,this.lastRequestTime=0,this.minRequestInterval=1e3}async login(e){return this.agent.login(e)}async delay(e){return new Promise((t=>setTimeout(t,e)))}async waitForNextRequest(){const e=Date.now()-this.lastRequestTime;e<this.minRequestInterval&&await this.delay(this.minRequestInterval-e),this.lastRequestTime=Date.now()}async processQueue(){if(!this.processing&&0!==this.queue.length){for(this.processing=!0;this.queue.length>0;){const{operation:t,resolve:s,reject:r,retries:a=0}=this.queue.shift();try{await this.waitForNextRequest();s(await t())}catch(e){429===e.status&&a<this.maxRetries?(console.log(`Rate limit hit, retrying in ${this.retryDelay*Math.pow(2,a)}ms...`),this.queue.unshift({operation:t,resolve:s,reject:r,retries:a+1}),await this.delay(this.retryDelay*Math.pow(2,a))):r(e)}}this.processing=!1}}async enqueue(e){return new Promise(((t,s)=>{this.queue.push({operation:e,resolve:t,reject:s}),this.processQueue()}))}async getProfile(e){return this.enqueue((()=>this.agent.getProfile(e)))}async getAuthorFeed(e){return this.enqueue((()=>this.agent.getAuthorFeed(e)))}}let p=null;const y=(e="https://bsky.social")=>(p||(p=new b(e)),p),f=({data:e,loading:t})=>{const s=(()=>{const t=new Date,s=[];for(let r=365;r>=0;r--){const a=new Date(t);a.setDate(a.getDate()-r);const l=e[a.toISOString().split("T")[0]]||0;s.push({date:a,count:l})}return s})(),{currentStreak:r,longestStreak:a}=(e=>{let t=0,s=0;for(const r of e)r.count>0?(t++,s=Math.max(s,t)):t=0;return{currentStreak:t,longestStreak:s}})(s);return t?h.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6",children:h.jsx("div",{className:"flex justify-center items-center h-32",children:h.jsx("div",{className:"animate-spin text-blue-500",children:"⌛"})})}):h.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6",children:[h.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-6",children:[h.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white",children:"Posting Activity"}),h.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm",children:[h.jsxs("div",{children:[h.jsx("span",{className:"text-gray-600 dark:text-gray-300",children:"Current streak: "}),h.jsxs("span",{className:"font-bold text-blue-500 dark:text-blue-400",children:[r," days"]})]}),h.jsxs("div",{children:[h.jsx("span",{className:"text-gray-600 dark:text-gray-300",children:"Longest streak: "}),h.jsxs("span",{className:"font-bold text-blue-500 dark:text-blue-400",children:[a," days"]})]})]})]}),h.jsx("div",{className:"overflow-x-auto",children:h.jsxs("div",{className:"min-w-max",children:[h.jsxs("div",{className:"flex",children:[h.jsx("div",{className:"w-8",children:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(((e,t)=>h.jsx("div",{className:"h-4 text-xs text-gray-500 dark:text-gray-400 text-center",children:t%2==0?e:""},e)))}),h.jsx("div",{className:"flex gap-1",children:Array.from({length:52},((e,t)=>h.jsx("div",{className:"flex flex-col gap-1",children:Array.from({length:7},((e,r)=>{const a=s[7*t+r];return h.jsx("div",{className:`w-4 h-4 rounded-sm border ${l=(null==a?void 0:a.count)||0,0===l?"bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700":l<=2?"bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800":l<=5?"bg-blue-200 dark:bg-blue-800/60 border-blue-300 dark:border-blue-700":l<=10?"bg-blue-300 dark:bg-blue-700/80 border-blue-400 dark:border-blue-600":"bg-blue-400 dark:bg-blue-600 border-blue-500 dark:border-blue-500"} transition-colors duration-200`,title:`${null==a?void 0:a.date.toDateString()}: ${(null==a?void 0:a.count)||0} posts`},r);var l}))},t)))})]}),h.jsxs("div",{className:"flex mt-2",children:[h.jsx("div",{className:"w-8"}),h.jsx("div",{className:"flex justify-between flex-1 text-xs text-gray-500 dark:text-gray-400",children:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((e=>h.jsx("div",{children:e},e)))})]})]})})]})},j=({text:t})=>{const[r,a]=e.useState(!1),l=t.length>280,i=r?t:l?`${t.slice(0,280)}...`:t;return h.jsxs("div",{className:"relative",children:[h.jsx("div",{className:"text-gray-900 dark:text-white whitespace-pre-wrap break-words",children:(n=i,n.split("\n").map(((e,t)=>h.jsxs(s.Fragment,{children:[e,t<n.split("\n").length-1&&h.jsx("br",{})]},t))))}),l&&h.jsx("button",{onClick:()=>a(!r),className:"text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm mt-2 focus:outline-none",children:r?"Show less":"Show more"})]});var n},v=({post:e})=>{const t=`https://bsky.app/profile/${e.author}/post/${e.uri.split("/").pop()}`;return h.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200",children:[h.jsx("div",{className:"mb-3",children:h.jsx("div",{className:"text-gray-900 dark:text-white text-sm mb-2",children:h.jsx(j,{text:e.text})})}),h.jsxs("div",{className:"flex items-center justify-between mt-4 pt-2 border-t border-gray-100 dark:border-gray-700",children:[h.jsxs("div",{className:"flex gap-4 text-sm",children:[h.jsxs("span",{className:"flex items-center gap-1 text-gray-600 dark:text-gray-400",children:[h.jsx("span",{children:"👍"}),h.jsx("span",{children:e.likes})]}),h.jsxs("span",{className:"flex items-center gap-1 text-gray-600 dark:text-gray-400",children:[h.jsx("span",{children:"🔄"}),h.jsx("span",{children:e.reposts})]}),h.jsxs("span",{className:"flex items-center gap-1 text-gray-600 dark:text-gray-400",children:[h.jsx("span",{children:"💬"}),h.jsx("span",{children:e.replies})]})]}),h.jsx("a",{href:t,target:"_blank",rel:"noopener noreferrer",className:"text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium",title:"Open in Bluesky",children:h.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:h.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"})})})]})]})},k=({metrics:e})=>h.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[h.jsxs("div",{children:[h.jsx("div",{className:"text-2xl font-bold text-blue-500",children:e.likes.toLocaleString()}),h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Likes"})]}),h.jsxs("div",{children:[h.jsx("div",{className:"text-2xl font-bold text-blue-500",children:e.reposts.toLocaleString()}),h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Reposts"})]}),h.jsxs("div",{children:[h.jsx("div",{className:"text-2xl font-bold text-blue-500",children:e.replies.toLocaleString()}),h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Replies"})]}),h.jsxs("div",{children:[h.jsxs("div",{className:"text-2xl font-bold text-blue-500",children:[e.engagementRate,"%"]}),h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Engagement Rate"})]}),h.jsxs("div",{className:"col-span-2",children:[h.jsx("div",{className:"text-2xl font-bold text-blue-500",children:e.totalPosts.toLocaleString()}),h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Total Posts"})]})]}),N=({posts:t,loading:s})=>{const[r,a]=e.useState("30"),l=e.useMemo((()=>((e,t)=>{if(!(null==e?void 0:e.length))return[];const s=new Date;return s.setDate(s.getDate()-parseInt(t)),e.filter((e=>{var t;return!!(null==(t=null==e?void 0:e.post)?void 0:t.indexedAt)&&new Date(e.post.indexedAt)>=s}))})(t,r)),[t,r]),i=e.useMemo((()=>(e=>{if(!(null==e?void 0:e.length))return null;const t={likes:0,reposts:0,replies:0,totalPosts:e.length,engagementRate:0,topPosts:[]};e.forEach((e=>{if(!(null==e?void 0:e.post))return;const s=e.post.likeCount||0,r=e.post.repostCount||0,a=e.post.replyCount||0;t.likes+=s,t.reposts+=r,t.replies+=a;const l=s+r+a;l>0&&t.topPosts.push({text:e.post.text||"",engagement:l,likes:s,reposts:r,replies:a,uri:e.post.uri,author:e.post.author.handle})}));const s=t.likes+t.reposts+t.replies;return t.engagementRate=t.totalPosts>0?(s/t.totalPosts*100).toFixed(2):"0.00",t.topPosts.sort(((e,t)=>t.engagement-e.engagement)),t.topPosts=t.topPosts.slice(0,3),t})(l)),[l]);return s?h.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6",children:h.jsx("div",{className:"flex justify-center items-center h-32",children:h.jsx("div",{className:"animate-spin text-blue-500",children:"⌛"})})}):i?h.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6",children:[h.jsxs("div",{className:"flex justify-between items-center mb-6",children:[h.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white",children:"Engagement Overview"}),h.jsxs("select",{value:r,onChange:e=>a(e.target.value),className:"px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent",children:[h.jsx("option",{value:"7",children:"Last 7 days"}),h.jsx("option",{value:"30",children:"Last 30 days"}),h.jsx("option",{value:"90",children:"Last 90 days"})]})]}),h.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[h.jsxs("div",{className:"bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-100 dark:border-gray-600",children:[h.jsxs("h4",{className:"text-sm font-medium text-gray-600 dark:text-gray-300 mb-4",children:["Overall Engagement (",r," days)"]}),h.jsx(k,{metrics:i})]}),h.jsxs("div",{className:"bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-100 dark:border-gray-600",children:[h.jsx("h4",{className:"text-sm font-medium text-gray-600 dark:text-gray-300 mb-4",children:"Top Performing Posts"}),h.jsx("div",{className:"space-y-4",children:i.topPosts.length>0?i.topPosts.map((e=>h.jsx(v,{post:e},e.uri))):h.jsx("div",{className:"text-center text-gray-500 dark:text-gray-400 py-4",children:"No posts in this time range"})})]})]})]}):h.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6",children:h.jsx("div",{className:"text-center text-gray-500 dark:text-gray-400",children:"No engagement data available"})})},w=[{handle:"vedantk.bsky.social",credentials:{identifier:"vedantk.bsky.social",password:"bdtl-qrfp-nik3-mfc2"}},{handle:"buildinginpublic.bsky.social",credentials:{identifier:"vedantk.bsky.social",password:"bdtl-qrfp-nik3-mfc2"}}],S=()=>{const[t,s]=e.useState([]),[r,a]=e.useState(!0),[l,i]=e.useState(null);return e.useEffect((()=>{(async()=>{try{const t=y(),r=[];await t.login(w[0].credentials);for(const s of w)try{const{data:e}=await t.getProfile({actor:s.handle});r.push(e)}catch(e){console.error(`Error fetching profile ${s.handle}:`,e)}0===r.length?i("Unable to load featured profiles at this time"):s(r)}catch(e){console.error("Error fetching featured profiles:",e),i("Unable to load featured profiles at this time")}finally{a(!1)}})()}),[]),r?h.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8",children:h.jsx("div",{className:"flex justify-center items-center h-32",children:h.jsx("div",{className:"animate-spin text-blue-500",children:"⌛"})})}):l?h.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8",children:h.jsx("div",{className:"text-center text-gray-600 dark:text-gray-400",children:l})}):t.length?h.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:t.map((e=>h.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl",children:h.jsxs("div",{className:"flex flex-col items-center text-center",children:[e.avatar&&h.jsx("img",{src:e.avatar,alt:e.displayName,className:"w-24 h-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 mb-4"}),h.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-white mb-2",children:e.displayName}),h.jsxs("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:["@",e.handle]}),e.description&&h.jsx("p",{className:"text-gray-700 dark:text-gray-300 mb-6 max-w-lg line-clamp-3",children:e.description}),h.jsxs("div",{className:"flex gap-4 mb-6",children:[h.jsxs("div",{className:"text-center",children:[h.jsx("div",{className:"text-lg font-bold text-blue-500",children:e.followersCount}),h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Followers"})]}),h.jsxs("div",{className:"text-center",children:[h.jsx("div",{className:"text-lg font-bold text-blue-500",children:e.followsCount}),h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Following"})]}),h.jsxs("div",{className:"text-center",children:[h.jsx("div",{className:"text-lg font-bold text-blue-500",children:e.postsCount}),h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Posts"})]})]}),h.jsxs("a",{href:`https://bsky.app/profile/${e.handle}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",children:["Visit Profile",h.jsx("svg",{className:"ml-2 w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:h.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"})})]})]})},e.did)))}):null},P=()=>h.jsx("footer",{className:"py-4 mt-8 border-t border-gray-200 dark:border-gray-700",children:h.jsxs("div",{className:"container mx-auto px-4 text-center text-gray-600 dark:text-gray-400",children:["Built by ",h.jsx("a",{href:"https://bsky.app/profile/vedantk.bsky.social",target:"_blank",rel:"noopener noreferrer",className:"font-bold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Vedant"})]})}),R=()=>h.jsx("div",{className:"bg-blue-500 text-white py-2 px-4",children:h.jsxs("div",{className:"container mx-auto flex items-center justify-between",children:[h.jsxs("div",{className:"flex items-center space-x-2",children:[h.jsx("span",{className:"font-semibold",children:"SaaSdirectories.fyi"}),h.jsx("span",{className:"hidden sm:inline",children:"—"}),h.jsx("span",{className:"hidden sm:inline",children:"a directory for saas directory"})]}),h.jsx("a",{href:"https://saasdirectories.fyi",target:"_blank",rel:"noopener noreferrer",className:"text-sm bg-white text-blue-500 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors duration-200",children:"Learn More"})]})}),C=({title:e,price:t,features:s,onClick:r})=>h.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl",children:[h.jsx("h3",{className:"text-xl font-bold text-gray-900 dark:text-white mb-2",children:e}),h.jsxs("div",{className:"text-2xl font-bold text-blue-500 mb-4",children:["$",t,"/month"]}),h.jsx("ul",{className:"space-y-3 mb-6",children:s.map(((e,t)=>h.jsxs("li",{className:"flex items-start",children:[h.jsx("span",{className:"text-blue-500 mr-2",children:"✓"}),h.jsx("span",{className:"text-gray-700 dark:text-gray-300",children:e})]},t)))}),h.jsx("button",{onClick:r,className:"w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",children:"Contact Us"})]}),L=()=>{const e=()=>{window.open("https://bsky.app/profile/vedantk.bsky.social","_blank")};return h.jsx("div",{className:"bg-gray-50 dark:bg-gray-900 py-8",children:h.jsxs("div",{className:"max-w-4xl mx-auto",children:[h.jsx("h2",{className:"text-2xl font-semibold text-gray-800 dark:text-white mb-8",children:"Advertise With Us"}),h.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[h.jsx(C,{title:"Premium Top Bar Advertisement",price:49,features:["Display your product/service in our prominent top banner","Choose from flexible duration packages","Reach our entire user base with high visibility placement","Include your logo, tagline, and clickable link"],onClick:e}),h.jsx(C,{title:"Featured Profile Promotion",price:19,features:["Get your profile highlighted in our Featured Profiles section","Stand out with enhanced visibility to potential customers","Include custom branding and extended profile details","Priority placement in search results"],onClick:e})]})]})})},E=({darkMode:e,setDarkMode:t})=>h.jsxs("div",{className:"flex justify-between items-center mb-8",children:[h.jsx("h1",{className:"text-3xl font-bold text-gray-800 dark:text-white",children:"BlueskyStats.fyi"}),h.jsxs("div",{className:"flex items-center gap-4",children:[h.jsx("button",{onClick:()=>{window.location.reload()},className:"px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200",children:"Home"}),h.jsx("button",{onClick:()=>t(!e),className:"p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors","aria-label":e?"Switch to light mode":"Switch to dark mode",children:e?"🌞":"🌙"})]})]}),q=()=>h.jsxs("div",{className:"text-center py-12 px-4",children:[h.jsx("h1",{className:"text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6",children:"Discover Your BlueSky Stats"}),h.jsx("p",{className:"text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8",children:"Track detailed analytics and insights for any BlueSky user instantly. No sign-up required - just enter a handle and explore engagement metrics, posting patterns, and audience growth in real-time."}),h.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center items-center",children:[h.jsxs("div",{className:"flex items-center gap-2 text-gray-600 dark:text-gray-300",children:[h.jsx("span",{className:"text-2xl",children:"📊"}),h.jsx("span",{children:"Engagement Metrics"})]}),h.jsxs("div",{className:"flex items-center gap-2 text-gray-600 dark:text-gray-300",children:[h.jsx("span",{className:"text-2xl",children:"📈"}),h.jsx("span",{children:"Posting Patterns"})]}),h.jsxs("div",{className:"flex items-center gap-2 text-gray-600 dark:text-gray-300",children:[h.jsx("span",{className:"text-2xl",children:"👥"}),h.jsx("span",{children:"Audience Growth"})]})]})]}),D=y();function _(){const[t,s]=e.useState(""),[r,a]=e.useState(null),[l,i]=e.useState(!1),[n,d]=e.useState(null),[o,c]=e.useState(!1),[x,g]=e.useState([]),[m,u]=e.useState(!1),[b,p]=e.useState({});e.useEffect((()=>{o?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}),[o]);return h.jsxs("div",{className:"min-h-screen transition-colors duration-200 dark:bg-gray-900",children:[h.jsx(R,{}),h.jsxs("div",{className:"container mx-auto px-4 py-8 max-w-4xl",children:[h.jsxs("div",{className:"sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 pb-4",children:[h.jsx(E,{darkMode:o,setDarkMode:c}),!r&&h.jsx(q,{}),h.jsx("form",{onSubmit:async e=>{e.preventDefault(),i(!0),d(null),a(null),g([]),p({});try{await D.login({identifier:"vedantk.bsky.social",password:"bdtl-qrfp-nik3-mfc2"});const{data:e}=await D.getProfile({actor:t});a(e),await(async e=>{u(!0);try{const{data:t}=await D.getAuthorFeed({actor:e});g(t.feed);const s={};t.feed.forEach((e=>{const t=new Date(e.post.indexedAt).toISOString().split("T")[0];s[t]=(s[t]||0)+1})),p(s)}catch(t){console.error("Error fetching posts:",t)}finally{u(!1)}})(t)}catch(s){console.error("Error details:",s),401===s.status?d("Authentication failed. Please check your Bluesky credentials."):404===s.status?d(`Profile not found for handle: ${t}`):s.message?d(`Error: ${s.message}`):d("An unexpected error occurred. Please try again later.")}finally{i(!1)}},className:"mb-4",children:h.jsxs("div",{className:"flex gap-2",children:[h.jsx("input",{type:"text",value:t,onChange:e=>s(e.target.value),placeholder:"Enter Bluesky handle",className:"flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors",required:!0}),h.jsx("button",{type:"submit",disabled:l,className:"px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors",children:l?h.jsx("span",{className:"inline-block animate-spin mr-2",children:"⌛"}):"Search"})]})})]}),!r&&h.jsxs(h.Fragment,{children:[h.jsx("h2",{className:"text-2xl font-semibold text-gray-800 dark:text-white mb-4",children:"Featured Profile"}),h.jsx(S,{}),h.jsx(L,{})]}),n&&h.jsx("div",{className:"mb-8 p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-100 rounded-lg border border-red-200 dark:border-red-800",children:n}),r&&h.jsxs("div",{className:"space-y-6",children:[h.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors p-6",children:[h.jsxs("div",{className:"flex items-center gap-4 mb-6",children:[r.avatar&&h.jsx("img",{src:r.avatar,alt:r.displayName,className:"w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"}),h.jsxs("div",{children:[h.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-white",children:r.displayName}),h.jsxs("p",{className:"text-gray-600 dark:text-gray-300",children:["@",r.handle]})]})]}),r.description&&h.jsx("p",{className:"text-gray-700 dark:text-gray-300 mb-6",children:r.description}),h.jsxs("div",{className:"grid grid-cols-3 gap-4 text-center",children:[h.jsxs("div",{className:"bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-600",children:[h.jsx("div",{className:"text-2xl font-bold text-blue-500 dark:text-blue-400",children:r.followersCount}),h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-300",children:"Followers"})]}),h.jsxs("div",{className:"bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-600",children:[h.jsx("div",{className:"text-2xl font-bold text-blue-500 dark:text-blue-400",children:r.followsCount}),h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-300",children:"Following"})]}),h.jsxs("div",{className:"bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-600",children:[h.jsx("div",{className:"text-2xl font-bold text-blue-500 dark:text-blue-400",children:r.postsCount}),h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-300",children:"Posts"})]})]})]}),h.jsx(f,{data:b,loading:m}),h.jsx(N,{posts:x,loading:m,profile:r})]})]}),h.jsx(P,{})]})}m.createRoot(document.getElementById("root")).render(h.jsx(s.StrictMode,{children:h.jsx(_,{})}));
