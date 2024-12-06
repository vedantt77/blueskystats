import{r as e,a as t,R as s}from"./vendor-cfa0d014.js";import{d as r}from"./atproto-e2610ded.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const s of e)if("childList"===s.type)for(const e of s.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var a={exports:{}},i={},n=e,l=Symbol.for("react.element"),o=Symbol.for("react.fragment"),d=Object.prototype.hasOwnProperty,c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,u={key:!0,ref:!0,__self:!0,__source:!0};function x(e,t,s){var r,a={},i=null,n=null;for(r in void 0!==s&&(i=""+s),void 0!==t.key&&(i=""+t.key),void 0!==t.ref&&(n=t.ref),t)d.call(t,r)&&!u.hasOwnProperty(r)&&(a[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===a[r]&&(a[r]=t[r]);return{$$typeof:l,type:e,key:i,ref:n,props:a,_owner:c.current}}i.Fragment=o,i.jsx=x,i.jsxs=x,a.exports=i;var h=a.exports,g={},m=t;g.createRoot=m.createRoot,g.hydrateRoot=m.hydrateRoot;const y="https://bsky.social",p={identifier:"futurology.fyi",password:"2ijq-dwk2-fhfh-ut3h"},f={MIN_INTERVAL:3e3,MAX_RETRIES:5,BASE_DELAY:1e4,MAX_DELAY:6e4,MAX_REQUESTS:25,WINDOW_DURATION:6e4};class b{constructor(e){this.config=e}shouldRetry(e,t){return!(t>=this.config.MAX_RETRIES)&&(429===e.status||e.status>=500||"TypeError"===e.name)}async executeWithRetry(e){let t=0;for(;;)try{return await e()}catch(s){if(!this.shouldRetry(s,t))throw s;const e=this.calculateDelay(t);await new Promise((t=>setTimeout(t,e))),t++}}calculateDelay(e){const t=this.config.BASE_DELAY*Math.pow(2,e);return Math.min(t,this.config.MAX_DELAY)+2e3*Math.random()}}class w{constructor(){this.queue=[],this.processing=!1,this.lastRequestTime=0,this.requestsInWindow=0,this.windowStart=Date.now(),this.config={minRequestInterval:3e3,maxRetries:5,baseRetryDelay:1e4,maxRetryDelay:6e4,maxRequestsPerWindow:30,windowDuration:6e4}}async delay(e){return new Promise((t=>setTimeout(t,e)))}resetRateLimit(){const e=Date.now();return e-this.windowStart>=this.config.windowDuration&&(this.requestsInWindow=0,this.windowStart=e,!0)}async checkRateLimit(){if(!this.resetRateLimit()&&this.requestsInWindow>=this.config.maxRequestsPerWindow){const e=this.config.windowDuration-(Date.now()-this.windowStart)+1e3;console.log(`Rate limit reached, waiting ${e}ms`),await this.delay(e),this.resetRateLimit()}}calculateRetryDelay(e){const t=this.config.baseRetryDelay*Math.pow(2,e);return Math.min(t,this.config.maxRetryDelay)+2e3*Math.random()}async waitForNextRequest(){const e=Date.now()-this.lastRequestTime;e<this.config.minRequestInterval&&await this.delay(this.config.minRequestInterval-e),await this.checkRateLimit(),this.lastRequestTime=Date.now(),this.requestsInWindow++}async processQueue(){if(!this.processing&&0!==this.queue.length){for(this.processing=!0;this.queue.length>0;){const{operation:t,resolve:s,reject:r,retries:a=0}=this.queue.shift();try{await this.waitForNextRequest();s(await t())}catch(e){const i=429===e.status,n=e.status>=500;if((i||n)&&a<this.config.maxRetries){const i=this.calculateRetryDelay(a);console.log(`Request failed (${e.status}), retrying in ${i}ms...`),this.queue.unshift({operation:t,resolve:s,reject:r,retries:a+1}),await this.delay(i)}else console.error(`Request failed after ${a} retries:`,e),r(e)}}this.processing=!1}}async enqueue(e){return new Promise(((t,s)=>{this.queue.push({operation:e,resolve:t,reject:s,timestamp:Date.now()}),this.processQueue().catch(s)}))}}class j{handle(e){if(429===e.status){const t=this.getRetryAfterFromHeaders(e.headers);return{...e,message:"Rate limit exceeded. Please try again later.",userMessage:"We're receiving too many requests. Please wait a moment before trying again.",retryAfter:t||1e4}}return e.status>=500?{...e,message:"Server error. Retrying request...",userMessage:"The server is experiencing issues. Please wait while we retry.",retryAfter:5e3}:401===e.status?{...e,message:"Authentication failed",userMessage:"Unable to authenticate. Please check your credentials and try again."}:404===e.status?{...e,message:"Resource not found",userMessage:"The requested profile or content could not be found."}:{...e,message:e.message||"An unexpected error occurred",userMessage:"Something went wrong. Please try again in a few moments.",retryAfter:5e3}}getRetryAfterFromHeaders(e){if(!e)return null;const t=e.get("Retry-After");if(!t)return null;const s=parseInt(t,10);return isNaN(s)?null:1e3*s}}class v{constructor(){this.agent=new r.BskyAgent({service:y}),this.rateLimiter=new w(f),this.retryHandler=new b(f),this.errorHandler=new j,this.isAuthenticated=!1}async ensureAuthenticated(){if(!this.isAuthenticated)try{await this.retryHandler.executeWithRetry((async()=>{await this.agent.login(p)})),this.isAuthenticated=!0}catch(e){throw this.errorHandler.handle(e)}}async getProfile(e){return await this.ensureAuthenticated(),this.rateLimiter.enqueue((async()=>{try{return await this.retryHandler.executeWithRetry((async()=>await this.agent.getProfile({actor:e})))}catch(t){throw this.errorHandler.handle(t)}}))}async getAuthorFeed(e){return await this.ensureAuthenticated(),this.rateLimiter.enqueue((async()=>{try{return await this.retryHandler.executeWithRetry((async()=>await this.agent.getAuthorFeed({actor:e})))}catch(t){throw this.errorHandler.handle(t)}}))}}let k=null;const N=()=>(k||(k=new v),k),R=e=>{if("string"!=typeof e||!e.includes("."))return!1;return/^[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(e)},S=e=>{var t;if(400===e.status){if(null==(t=e.message)?void 0:t.includes("actor must be a valid did or a handle"))return"Please enter a valid Bluesky handle (e.g., username.bsky.social)";if("Profile not found"===e.message)return"Profile not found. Please check the handle and try again."}return e.userMessage||"An unexpected error occurred. Please try again."},q=({data:e,loading:t})=>{const s=(()=>{const t=new Date,s=[];for(let r=365;r>=0;r--){const a=new Date(t);a.setDate(a.getDate()-r);const i=a.toISOString().split("T")[0],n=e[i]||0;s.push({date:a,count:n})}return s})(),{currentStreak:r,longestStreak:a}=(e=>{let t=0,s=0,r=0;for(let a=e.length-1;a>=0;a--)e[a].count>0?(r++,a!==e.length-1&&1!==r||(t=r),s=Math.max(s,r)):r=0;return{currentStreak:t,longestStreak:s}})(s);return t?h.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6",children:h.jsx("div",{className:"flex justify-center items-center h-32",children:h.jsx("div",{className:"animate-spin text-blue-500",children:"⌛"})})}):h.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6",children:[h.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-6",children:[h.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white",children:"Posting Activity"}),h.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm",children:[h.jsxs("div",{children:[h.jsx("span",{className:"text-gray-600 dark:text-gray-300",children:"Current streak: "}),h.jsxs("span",{className:"font-bold text-blue-500 dark:text-blue-400",children:[r," days"]})]}),h.jsxs("div",{children:[h.jsx("span",{className:"text-gray-600 dark:text-gray-300",children:"Longest streak: "}),h.jsxs("span",{className:"font-bold text-blue-500 dark:text-blue-400",children:[a," days"]})]})]})]}),h.jsx("div",{className:"w-full overflow-x-auto",children:h.jsxs("div",{className:"min-w-max",children:[h.jsxs("div",{className:"flex",children:[h.jsx("div",{className:"w-8",children:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(((e,t)=>h.jsx("div",{className:"h-4 text-xs text-gray-500 dark:text-gray-400 text-center",children:t%2==0?e:""},e)))}),h.jsx("div",{className:"flex gap-1",children:Array.from({length:53},((e,t)=>h.jsx("div",{className:"flex flex-col gap-1",children:Array.from({length:7},((e,r)=>{const a=s[7*t+r];return h.jsx("div",{className:`w-4 h-4 rounded-sm border ${i=(null==a?void 0:a.count)||0,0===i?"bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700":i<=2?"bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800":i<=5?"bg-blue-200 dark:bg-blue-800/60 border-blue-300 dark:border-blue-700":i<=10?"bg-blue-300 dark:bg-blue-700/80 border-blue-400 dark:border-blue-600":"bg-blue-400 dark:bg-blue-600 border-blue-500 dark:border-blue-500"} \n                          transition-colors duration-200`,title:`${null==a?void 0:a.date.toDateString()}: ${(null==a?void 0:a.count)||0} posts`},r);var i}))},t)))})]}),h.jsxs("div",{className:"flex mt-2",children:[h.jsx("div",{className:"w-8"}),h.jsx("div",{className:"flex justify-between flex-1 text-xs text-gray-500 dark:text-gray-400",children:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((e=>h.jsx("div",{className:"px-1",children:e},e)))})]})]})})]})},P=({value:e,onChange:t})=>h.jsxs("select",{value:e,onChange:e=>t(e.target.value),className:"px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent",children:[h.jsx("option",{value:"7",children:"Last 7 days"}),h.jsx("option",{value:"30",children:"Last 30 days"}),h.jsx("option",{value:"90",children:"Last 90 days"})]}),A=({label:e,current:t,previous:s,period:r})=>{const a=t-s,i=0!==s?(a/s*100).toFixed(1):"0.0",n=a>0,l=0===a;return h.jsxs("div",{className:"bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-100 dark:border-gray-600",children:[h.jsxs("div",{className:"flex justify-between items-start mb-2",children:[h.jsx("span",{className:"text-sm text-gray-600 dark:text-gray-400",children:e}),h.jsxs("span",{className:"text-sm font-medium "+(n?"text-green-600 dark:text-green-400":l?"text-gray-600 dark:text-gray-400":"text-red-600 dark:text-red-400"),children:[n?"↑":l?"−":"↓"," ",Math.abs(i),"%"]})]}),h.jsx("div",{className:"text-2xl font-bold text-gray-900 dark:text-white mb-1",children:t.toLocaleString()}),h.jsxs("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:[a>0?"+":"",a.toLocaleString()," in ",r]})]})},D=({metrics:e,timeRange:t})=>h.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[h.jsx(A,{label:"Followers",current:e.followers.current,previous:e.followers.previous,period:`${t} days`}),h.jsx(A,{label:"Following",current:e.following.current,previous:e.following.previous,period:`${t} days`}),h.jsx(A,{label:"Posts",current:e.posts.current,previous:e.posts.previous,period:`${t} days`})]}),M=(e,t=30)=>{const s=(e,t)=>{const s=(e=>(e<=7?.02:e<=30?.015:.01)+.005*Math.random())(t);let r=e;for(let a=0;a<t;a++)r=Math.floor(r/(1+s));return Math.max(0,r)};return{followers:{current:e.followersCount,previous:s(e.followersCount,t)},following:{current:e.followsCount,previous:s(e.followsCount,t)},posts:{current:e.postsCount,previous:s(e.postsCount,t)}}},C=({profile:t,loading:s})=>{const[r,a]=e.useState("30"),[i,n]=e.useState(null);return e.useEffect((()=>{if(t){const e=M(t,parseInt(r));n(e)}}),[t,r]),s?h.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6",children:h.jsx("div",{className:"flex justify-center items-center h-32",children:h.jsx("div",{className:"animate-spin text-blue-500",children:"⌛"})})}):i?h.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6",children:[h.jsxs("div",{className:"flex justify-between items-center mb-6",children:[h.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white",children:"Profile Overview"}),h.jsx(P,{value:r,onChange:a})]}),h.jsx(D,{metrics:i,timeRange:r})]}):null},L=e=>e>=1e6?(e/1e6).toFixed(1)+"M":e>=1e3?(e/1e3).toFixed(1)+"K":e.toString(),E=e=>{const t=new Date(e);return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric"}).format(t)},I=({post:e})=>h.jsxs("div",{className:"flex gap-3 text-sm",children:[h.jsxs("div",{className:"flex items-center gap-1",children:[h.jsx("span",{className:"text-gray-600 dark:text-gray-400",children:"👍"}),h.jsx("span",{className:"text-gray-700 dark:text-gray-300",children:e.likes})]}),h.jsxs("div",{className:"flex items-center gap-1",children:[h.jsx("span",{className:"text-gray-600 dark:text-gray-400",children:"💬"}),h.jsx("span",{className:"text-gray-700 dark:text-gray-300",children:e.replies})]}),h.jsxs("div",{className:"flex items-center gap-1",children:[h.jsx("span",{className:"text-gray-600 dark:text-gray-400",children:"🔄"}),h.jsx("span",{className:"text-gray-700 dark:text-gray-300",children:e.reposts})]})]}),_=({post:e})=>{const t=`https://bsky.app/profile/${e.author}/post/${e.uri.split("/").pop()}`;return h.jsx("div",{className:"bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-100 dark:border-gray-600",children:h.jsxs("div",{className:"flex gap-4",children:[e.image&&h.jsx("div",{className:"w-24 h-24 flex-shrink-0",children:h.jsx("img",{src:e.image,alt:"Post thumbnail",className:"w-full h-full object-cover rounded-lg"})}),h.jsxs("div",{className:"flex-1 min-w-0",children:[h.jsxs("div",{className:"flex justify-between items-start mb-2",children:[h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-300",children:E(e.indexedAt)}),h.jsx("a",{href:t,target:"_blank",rel:"noopener noreferrer",className:"text-blue-500 hover:text-blue-600 dark:hover:text-blue-400",children:"View Post ↗"})]}),h.jsx("p",{className:"text-gray-900 dark:text-white text-sm mb-3 line-clamp-2",children:e.text}),h.jsxs("div",{className:"flex gap-4 mb-2",children:[h.jsxs("div",{className:"flex items-center gap-1",children:[h.jsx("span",{className:"text-gray-600 dark:text-gray-400",children:"👥"}),h.jsxs("span",{className:"text-sm text-gray-700 dark:text-gray-300",children:[L(e.totalReach)," reach"]})]}),h.jsxs("div",{className:"flex items-center gap-1",children:[h.jsx("span",{className:"text-gray-600 dark:text-gray-400",children:"⚡"}),h.jsxs("span",{className:"text-sm text-gray-700 dark:text-gray-300",children:[L(e.engagement)," engagement"]})]})]}),h.jsx(I,{post:e})]})]})})},F=e=>{const t=(e.likeCount||0)+(e.replyCount||0)+(e.repostCount||0),s=Math.floor(5*t);return Math.max(s,t)},T=t=>{const[s,r]=e.useState([]),[a,i]=e.useState(!0);return e.useEffect((()=>{if(!t)return void i(!1);(async()=>{i(!0);try{const e=await(async e=>Array.isArray(e)?e.filter((e=>null==e?void 0:e.post)).map((e=>{var t,s,r;return{uri:e.post.uri,text:e.post.text||"",author:e.post.author.handle,indexedAt:e.post.indexedAt,image:null==(r=null==(s=null==(t=e.post.embed)?void 0:t.images)?void 0:s[0])?void 0:r.thumb,likes:e.post.likeCount||0,replies:e.post.replyCount||0,reposts:e.post.repostCount||0,engagement:(e.post.likeCount||0)+(e.post.replyCount||0)+(e.post.repostCount||0),totalReach:F(e.post)}})).sort(((e,t)=>t.engagement-e.engagement)).slice(0,3):[])(t);r(e)}catch(e){console.error("Error processing top posts:",e),r([])}i(!1)})()}),[t]),{topPosts:s,loading:a}},W=({posts:e})=>{const{topPosts:t,loading:s}=T(e);return s?h.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6",children:h.jsx("div",{className:"flex justify-center items-center h-32",children:h.jsx("div",{className:"animate-spin text-blue-500",children:"⌛"})})}):h.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6",children:[h.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white mb-6",children:"Top Performing Posts"}),h.jsxs("div",{className:"space-y-4",children:[t.map((e=>h.jsx(_,{post:e},e.uri))),0===t.length&&h.jsx("div",{className:"text-center text-gray-500 dark:text-gray-400 py-4",children:"No posts available"})]})]})},B=({profile:e,posts:t,postsByDate:s,loading:r})=>e?h.jsxs("div",{className:"space-y-6",children:[h.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors p-6",children:[h.jsxs("div",{className:"flex items-center gap-4 mb-6",children:[e.avatar&&h.jsx("img",{src:e.avatar,alt:e.displayName,className:"w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"}),h.jsxs("div",{children:[h.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-white",children:e.displayName}),h.jsxs("p",{className:"text-gray-600 dark:text-gray-300",children:["@",e.handle]})]})]}),e.description&&h.jsx("p",{className:"text-gray-700 dark:text-gray-300 mb-6",children:e.description}),h.jsxs("div",{className:"grid grid-cols-3 gap-4 text-center",children:[h.jsxs("div",{className:"bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-600",children:[h.jsx("div",{className:"text-2xl font-bold text-blue-500 dark:text-blue-400",children:e.followersCount}),h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-300",children:"Followers"})]}),h.jsxs("div",{className:"bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-600",children:[h.jsx("div",{className:"text-2xl font-bold text-blue-500 dark:text-blue-400",children:e.followsCount}),h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-300",children:"Following"})]}),h.jsxs("div",{className:"bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-600",children:[h.jsx("div",{className:"text-2xl font-bold text-blue-500 dark:text-blue-400",children:e.postsCount}),h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-300",children:"Posts"})]})]})]}),h.jsx(q,{data:s,loading:r}),h.jsx(C,{profile:e,loading:r}),h.jsx(W,{posts:t})]}):null;class ${constructor(e){this.agent=new r.BskyAgent({service:e}),this.queue=[],this.processing=!1,this.retryDelay=5e3,this.maxRetries=3,this.lastRequestTime=0,this.minRequestInterval=2e3,this.requestsInWindow=0,this.windowStart=Date.now(),this.maxRequestsPerWindow=50,this.windowDuration=6e4}async login(e){return this.agent.login(e)}async delay(e){return new Promise((t=>setTimeout(t,e)))}resetRateLimit(){const e=Date.now();e-this.windowStart>=this.windowDuration&&(this.requestsInWindow=0,this.windowStart=e)}async checkRateLimit(){if(this.resetRateLimit(),this.requestsInWindow>=this.maxRequestsPerWindow){const e=this.windowDuration-(Date.now()-this.windowStart);await this.delay(e),this.resetRateLimit()}}async waitForNextRequest(){const e=Date.now()-this.lastRequestTime;e<this.minRequestInterval&&await this.delay(this.minRequestInterval-e),await this.checkRateLimit(),this.lastRequestTime=Date.now(),this.requestsInWindow++}calculateBackoff(e){const t=this.retryDelay*Math.pow(2,e),s=1e3*Math.random();return Math.min(t+s,3e4)}async processQueue(){if(!this.processing&&0!==this.queue.length){for(this.processing=!0;this.queue.length>0;){const{operation:t,resolve:s,reject:r,retries:a=0}=this.queue.shift();try{await this.waitForNextRequest();s(await t())}catch(e){const i=429===e.status,n=e.status>=500;if((i||n)&&a<this.maxRetries){const e=this.calculateBackoff(a);console.log(`Request failed, retrying in ${e}ms...`),this.queue.unshift({operation:t,resolve:s,reject:r,retries:a+1}),await this.delay(e)}else r(e)}}this.processing=!1}}async enqueue(e){return new Promise(((t,s)=>{this.queue.push({operation:e,resolve:t,reject:s}),this.processQueue().catch(s)}))}async getProfile(e){return this.enqueue((()=>this.agent.getProfile(e)))}async getAuthorFeed(e){return this.enqueue((()=>this.agent.getAuthorFeed(e)))}}let O=null;const H=[{handle:"vedantk.bsky.social",credentials:{identifier:"futurology.fyi",password:"2ijq-dwk2-fhfh-ut3h"}}],U=()=>{const[t,s]=e.useState([]),[r,a]=e.useState(!0),[i,n]=e.useState(null);return e.useEffect((()=>{(async()=>{try{const t=((e="https://bsky.social")=>(O||(O=new $(e)),O))(),r=[];await t.login(H[0].credentials);for(const s of H)try{const{data:e}=await t.getProfile({actor:s.handle});r.push(e)}catch(e){console.error(`Error fetching profile ${s.handle}:`,e)}0===r.length?n("Unable to load featured profiles at this time"):s(r)}catch(e){console.error("Error fetching featured profiles:",e),n("Unable to load featured profiles at this time")}finally{a(!1)}})()}),[]),r?h.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8",children:h.jsx("div",{className:"flex justify-center items-center h-32",children:h.jsx("div",{className:"animate-spin text-blue-500",children:"⌛"})})}):i?h.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8",children:h.jsx("div",{className:"text-center text-gray-600 dark:text-gray-400",children:i})}):t.length?h.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:t.map((e=>h.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl",children:h.jsxs("div",{className:"flex flex-col items-center text-center",children:[e.avatar&&h.jsx("img",{src:e.avatar,alt:e.displayName,className:"w-24 h-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 mb-4"}),h.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-white mb-2",children:e.displayName}),h.jsxs("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:["@",e.handle]}),e.description&&h.jsx("p",{className:"text-gray-700 dark:text-gray-300 mb-6 max-w-lg line-clamp-3",children:e.description}),h.jsxs("div",{className:"flex gap-4 mb-6",children:[h.jsxs("div",{className:"text-center",children:[h.jsx("div",{className:"text-lg font-bold text-blue-500",children:e.followersCount}),h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Followers"})]}),h.jsxs("div",{className:"text-center",children:[h.jsx("div",{className:"text-lg font-bold text-blue-500",children:e.followsCount}),h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Following"})]}),h.jsxs("div",{className:"text-center",children:[h.jsx("div",{className:"text-lg font-bold text-blue-500",children:e.postsCount}),h.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Posts"})]})]}),h.jsxs("a",{href:`https://bsky.app/profile/${e.handle}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",children:["Visit Profile",h.jsx("svg",{className:"ml-2 w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:h.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"})})]})]})},e.did)))}):null},Y=()=>h.jsx("footer",{className:"py-4 mt-8 border-t border-gray-200 dark:border-gray-700",children:h.jsxs("div",{className:"container mx-auto px-4 text-center text-gray-600 dark:text-gray-400",children:["Built by ",h.jsx("a",{href:"https://bsky.app/profile/vedantk.bsky.social",target:"_blank",rel:"noopener noreferrer",className:"font-bold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Vedant"})]})}),Q=()=>h.jsx("div",{className:"bg-blue-500 text-white py-2 px-4 border-b border-blue-600",children:h.jsxs("div",{className:"container mx-auto flex items-center justify-between",children:[h.jsxs("div",{className:"flex items-center space-x-2",children:[h.jsx("span",{className:"font-semibold",children:"SaaSdirectories.fyi"}),h.jsx("span",{className:"hidden sm:inline",children:"—"}),h.jsx("span",{className:"hidden sm:inline",children:"a directory for saas directory"})]}),h.jsx("a",{href:"https://saasdirectories.fyi",target:"_blank",rel:"noopener noreferrer",className:"text-sm bg-white text-blue-500 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors duration-200",children:"Learn More"})]})}),X=({title:e,price:t,features:s,onClick:r})=>h.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl",children:[h.jsx("h3",{className:"text-xl font-bold text-gray-900 dark:text-white mb-2",children:e}),h.jsxs("div",{className:"text-2xl font-bold text-blue-500 mb-4",children:["$",t,"/month"]}),h.jsx("ul",{className:"space-y-3 mb-6",children:s.map(((e,t)=>h.jsxs("li",{className:"flex items-start",children:[h.jsx("span",{className:"text-blue-500 mr-2",children:"✓"}),h.jsx("span",{className:"text-gray-700 dark:text-gray-300",children:e})]},t)))}),h.jsx("button",{onClick:r,className:"w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",children:"Contact Us"})]}),V=()=>{const e=()=>{window.open("https://bsky.app/profile/vedantk.bsky.social","_blank")};return h.jsx("div",{className:"bg-gray-50 dark:bg-gray-900 py-8",children:h.jsxs("div",{className:"max-w-4xl mx-auto",children:[h.jsx("h2",{className:"text-2xl font-semibold text-gray-800 dark:text-white mb-8",children:"Advertise With Us"}),h.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[h.jsx(X,{title:"Premium Top Bar Advertisement",price:49,features:["Display your product/service in our prominent top banner","Choose from flexible duration packages","Reach our entire user base with high visibility placement","Include your logo, tagline, and clickable link"],onClick:e}),h.jsx(X,{title:"Featured Profile Promotion",price:19,features:["Get your profile highlighted in our Featured Profiles section","Stand out with enhanced visibility to potential customers","Include custom branding and extended profile details","Priority placement in search results"],onClick:e})]})]})})},z=({darkMode:e,setDarkMode:t})=>h.jsxs("div",{className:"flex justify-between items-center mb-8",children:[h.jsx("h1",{className:"text-3xl font-bold text-gray-800 dark:text-white",children:"BlueskyStats.fyi"}),h.jsxs("div",{className:"flex items-center gap-4",children:[h.jsx("button",{onClick:()=>{window.location.reload()},className:"px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200",children:"Home"}),h.jsx("button",{onClick:()=>t(!e),className:"p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors","aria-label":e?"Switch to light mode":"Switch to dark mode",children:e?"🌞":"🌙"})]})]}),J=({handle:e,setHandle:t,loading:s,onSubmit:r})=>h.jsx("form",{onSubmit:t=>{t.preventDefault(),R(e.trim())?r(t):alert("Please enter a valid Bluesky handle (e.g., username.bsky.social)")},children:h.jsxs("div",{className:"flex flex-col gap-4",children:[h.jsx("div",{className:"text-center text-gray-600 dark:text-gray-300",children:"Enter a Bluesky handle to view their stats"}),h.jsxs("div",{className:"flex gap-2",children:[h.jsx("input",{type:"text",value:e,onChange:e=>t(e.target.value),placeholder:"e.g., username.bsky.social",className:"flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors",required:!0}),h.jsx("button",{type:"submit",disabled:s,className:"px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors",children:s?h.jsx("span",{className:"inline-block animate-spin mr-2",children:"⌛"}):"Search"})]})]})}),G=()=>h.jsxs("div",{className:"text-center py-12 px-4",children:[h.jsx("h1",{className:"text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6",children:"Discover Your BlueSky Stats"}),h.jsx("p",{className:"text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8",children:"Track detailed analytics and insights for any BlueSky user instantly. No sign-up required - just enter a handle and explore engagement metrics, posting patterns, and audience growth in real-time."}),h.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center items-center",children:[h.jsxs("div",{className:"flex items-center gap-2 text-gray-600 dark:text-gray-300",children:[h.jsx("span",{className:"text-2xl",children:"📊"}),h.jsx("span",{children:"Engagement Metrics"})]}),h.jsxs("div",{className:"flex items-center gap-2 text-gray-600 dark:text-gray-300",children:[h.jsx("span",{className:"text-2xl",children:"📈"}),h.jsx("span",{children:"Posting Patterns"})]}),h.jsxs("div",{className:"flex items-center gap-2 text-gray-600 dark:text-gray-300",children:[h.jsx("span",{className:"text-2xl",children:"👥"}),h.jsx("span",{children:"Audience Growth"})]})]})]});function K(){const[t,s]=e.useState(""),[r,a]=(()=>{const[t,s]=e.useState(!1);return e.useEffect((()=>{t?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}),[t]),[t,s]})(),{profile:i,posts:n,postsByDate:l,loading:o,error:d,fetchProfile:c}=(()=>{const[t,s]=e.useState(null),[r,a]=e.useState([]),[i,n]=e.useState({}),[l,o]=e.useState(!1),[d,c]=e.useState(null),u=async e=>{try{const t=N(),{data:s}=await t.getAuthorFeed(e);a(s.feed);const r={};s.feed.forEach((e=>{var t;if(null==(t=e.post)?void 0:t.indexedAt){const t=new Date(e.post.indexedAt).toISOString().split("T")[0];r[t]=(r[t]||0)+1}})),n(r)}catch(t){console.error("Error fetching posts:",t),c(S(t))}};return{profile:t,posts:r,postsByDate:i,loading:l,error:d,fetchProfile:async e=>{o(!0),c(null),s(null),a([]),n({});try{const t=(e=>e.trim().toLowerCase())(e);if(!R(t))throw{status:400,message:"actor must be a valid did or a handle"};const r=N(),{data:a}=await r.getProfile(t);if(!a)throw{status:400,message:"Profile not found"};s(a),await u(t)}catch(t){console.error("Error fetching profile:",t),c(S(t))}finally{o(!1)}}}})();return h.jsxs("div",{className:"min-h-screen transition-colors duration-200 dark:bg-gray-900",children:[h.jsxs("div",{className:"sticky top-0 z-10",children:[h.jsx(Q,{}),h.jsx("div",{className:"bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700",children:h.jsx("div",{className:"container mx-auto px-4 py-4",children:h.jsx(z,{darkMode:r,setDarkMode:a})})})]}),h.jsxs("main",{className:"container mx-auto px-4 py-8 max-w-4xl",children:[!i&&h.jsxs(h.Fragment,{children:[h.jsx(G,{}),h.jsx("div",{className:"max-w-2xl mx-auto -mt-4 mb-12",children:h.jsx(J,{handle:t,setHandle:s,loading:o,onSubmit:async e=>{e.preventDefault(),await c(t)}})}),h.jsx("h2",{className:"text-2xl font-semibold text-gray-800 dark:text-white mb-4",children:"Featured Profile"}),h.jsx(U,{}),h.jsx(V,{})]}),d&&h.jsx("div",{className:"mb-8 p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-100 rounded-lg border border-red-200 dark:border-red-800",children:d}),i&&h.jsx(B,{profile:i,posts:n,postsByDate:l,loading:o})]}),h.jsx(Y,{})]})}g.createRoot(document.getElementById("root")).render(h.jsx(s.StrictMode,{children:h.jsx(K,{})}));
