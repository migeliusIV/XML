(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();class k{constructor(e={}){this.props=e,this.el=document.createElement("div")}render(){return this.el}}class u{constructor(e={}){this.props=e,this.el=document.createElement("div")}render(){return this.el}}function I(s){const e=document.body;s?e.classList.add("dark-theme"):e.classList.remove("dark-theme")}function _(s=null){const t=localStorage.getItem("darkTheme")==="true";I(t),s&&(s.checked=t)}function D(s){const e=s.target.checked;I(e),localStorage.setItem("darkTheme",e),window.dispatchEvent(new CustomEvent("themeChanged",{detail:{isDark:e}}))}class M extends u{constructor(){super(),this.isAdmin=localStorage.getItem("isAdmin")==="true"}render(){this.el.innerHTML=`
      <header class="yota-header py-3 mb-4">
        <div class="container d-flex align-items-center justify-content-between">
          <a href="#/" class="yota-logo text-decoration-none fw-bold" style="font-size:2rem;color:#00B5FF;letter-spacing:2px;">YOTA</a>
          <div class="d-flex align-items-center gap-3">
            <a href="calculator.html" class="btn btn-outline-primary" style="border-radius: 0.5rem;">Калькулятор</a>
            <!-- Переключатель темы -->
            <label class="switch">
              <input type="checkbox" id="theme-toggle">
              <span class="slider round"></span>
            </label>
            ${this.isAdmin?`
              <button class="btn btn-yota" id="add-tariff-header-btn" style="border-radius: 0.5rem; background: #00B5FF; color: white; border: none;">
                <span style="font-size: 1.2rem;">➕</span> Добавить тариф
              </button>
            `:""}
          </div>
        </div>
      </header>
    `;const e=this.el.querySelector("#add-tariff-header-btn");e&&e.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("addTariff"))});const t=this.el.querySelector("#theme-toggle");return t&&(_(t),t.addEventListener("change",i=>{D(i)})),window.addEventListener("adminModeChanged",i=>{this.isAdmin=i.detail.isAdmin,this.render()}),this.el}}const p=[{title:"Просто снижаем цены",subtitle:"На гигабайты и минуты",img:"icons/snizhaen_tseni_desc.png",alt:"Hand"},{title:"Подключи Максимум",subtitle:"Всего 1000 ₽ за 3 месяца с Абонементом",img:"icons/podkluchi_maximum_desc.png",alt:"Maximum"},{title:"Подключай eSIM вместе с Yota",subtitle:"Подключай Yota и будь на связи",img:"icons/esim_banner_d.png",alt:"eSIM"},{title:"Играешь? Подключай!",subtitle:"Начисляем игровую валюту каждый месяц",img:"icons/gamebox_desc.png",alt:"Gamepad"},{title:"Сим-карта за 30 минут",subtitle:"Бесплатная доставка от Самоката",img:"icons/samokat_d.svg.png",alt:"30 минут"}];class H extends u{constructor(){super(),this.state={current:0,prev:0,direction:1},this.timer=null,this.isSliding=!1,this.el.className="yota-carousel mb-5",this.el.innerHTML=`
      <style>
        .yota-carousel {
            position: relative; /* Make this the positioning context for absolute children */
        }
        .carousel-slide-viewport { 
          overflow: hidden; 
          border-radius: 2rem;
          position: relative;
        }
        .carousel-slide-wrapper { 
          display: flex; 
          width: 100%; /* Start with 100%, will change during transition */
          transition: transform 0.5s cubic-bezier(.4,0,.2,1);
          position: relative;
        }
        .carousel-slide { 
          width: 100%; 
          flex-shrink: 0; 
          opacity: 1; 
          position: relative;
        }
        /* Make arrows visible on hover over the main carousel container */
        .yota-carousel:hover .carousel-arrow { 
            opacity: 1 !important; 
            pointer-events: auto; 
        }
        .carousel-arrow { 
          opacity: 0; 
          pointer-events: none; 
          transition: opacity 0.2s;
          z-index: 2;
          /* Add positioning styles here, outside of individual slides */
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background:#fff;
          border:none;
          border-radius:50%;
          width:44px;
          height:44px;
          box-shadow:0 2px 8px rgba(0,0,0,0.08);
          font-size:2rem;
          color:#00B5FF;
        }
        .carousel-arrow.left { left: 24px; }
        .carousel-arrow.right { right: 24px; }
        
        .carousel-indicators { 
            position: absolute; 
            left: 50%; 
            transform: translateX(-50%);
            bottom: 18px;
            z-index: 2;
            display: flex; /* Use flexbox for indicators */
            align-items: center;
            justify-content: center;
        }
        .indicator-dot {
          display: inline-block;
          width: 18px;
          height: 4px;
          border-radius: 2px;
          margin: 0 2px;
          background: #b3e6fa; /* Default inactive */
          transition: background 0.3s ease-in-out;
          cursor: pointer;
        }
        .indicator-dot.active {
            background: #fff; /* Active color */
        }
      </style>
      <div class="carousel-slide-viewport">
        <div class="carousel-slide-wrapper"></div>
      </div>
      <!-- Arrows and Indicators are now direct children of the main el -->
      <button class="carousel-arrow left">
          <span style="font-size:2rem;line-height:1;">&lt;</span>
        </button>
      <button class="carousel-arrow right">
          <span style="font-size:2rem;line-height:1;">&gt;</span>
        </button>
      <div class="carousel-indicators"></div>
    `,this.wrapper=this.el.querySelector(".carousel-slide-wrapper"),this.leftArrow=this.el.querySelector(".carousel-arrow.left"),this.rightArrow=this.el.querySelector(".carousel-arrow.right"),this.indicatorsContainer=this.el.querySelector(".carousel-indicators"),this.leftArrow.onclick=()=>this.prev(),this.rightArrow.onclick=()=>this.next(),this.updateDisplay(),this.resetTimer()}updateDisplay(){const{current:e,prev:t,direction:i}=this.state;this.wrapper.innerHTML="";const r=this.createSlideElement(p[e]);this.wrapper.appendChild(r),this.updateIndicators()}createSlideElement(e){const t=document.createElement("div");return t.className="carousel-slide position-relative d-flex align-items-center justify-content-between p-4",t.style.cssText="background:#00B5FF;border-radius:2rem;min-height:260px;overflow:hidden;",t.innerHTML=`
        <div class="carousel-content text-white" style="max-width:50%">
          <div class="carousel-title fw-bold" style="font-size:2.2rem;font-weight:900;">${e.title}</div>
          <div class="carousel-subtitle mb-4" style="font-size:1.2rem;">${e.subtitle}</div>
        </div>
        <img src="${e.img}" alt="${e.alt}" style="max-height:160px;max-width:40%;object-fit:contain;">
      `,t}updateIndicators(){const{current:e}=this.state;this.indicatorsContainer.innerHTML="",p.forEach((t,i)=>{const r=document.createElement("span");r.className=`indicator-dot${i===e?" active":""}`,r.onclick=()=>this.slideTo(i,i>e?1:-1,!1),this.indicatorsContainer.appendChild(r)})}next(e=!1){if(this.isSliding)return;const t=(this.state.current+1)%p.length;this.slideTo(t,1,e)}prev(){if(this.isSliding)return;const e=(this.state.current-1+p.length)%p.length;this.slideTo(e,-1,!1)}slideTo(e,t,i){if(this.isSliding)return;this.isSliding=!0;const{current:r}=this.state,a=r,n=p[a],o=p[e],l=this.createSlideElement(n),d=this.createSlideElement(o);t===1?(this.wrapper.innerHTML="",l.style.transform="translateX(0%)",d.style.transform="translateX(100%)",this.wrapper.appendChild(l),this.wrapper.appendChild(d),this.wrapper.style.width="200%",this.wrapper.style.transform="translateX(0%)"):(this.wrapper.innerHTML="",l.style.transform="translateX(0%)",d.style.transform="translateX(-100%)",this.wrapper.appendChild(d),this.wrapper.appendChild(l),this.wrapper.style.width="200%",this.wrapper.style.transform="translateX(-100%)"),this.wrapper.offsetHeight,this.wrapper.style.transition="transform 0.5s cubic-bezier(.4,0,.2,1)",t===1?this.wrapper.style.transform="translateX(-100%)":this.wrapper.style.transform="translateX(0%)";const h=()=>{this.wrapper.removeEventListener("transitionend",h),this.state.prev=a,this.state.current=e,this.state.direction=t,this.isSliding=!1,this.wrapper.style.transition="none",this.wrapper.style.transform="translateX(0%)",this.wrapper.style.width="100%",this.updateDisplay(),i||this.resetTimer()};this.wrapper.addEventListener("transitionend",h)}resetTimer(){this.timer&&clearInterval(this.timer),this.timer=setInterval(()=>this.next(!0),1e4)}render(){return this.el}disconnectedCallback(){this.timer&&clearInterval(this.timer)}}const S={vk:"icons/vk-v2-svgrepo-com.svg",whatsapp:"icons/whatsapp-svgrepo-com.svg",telegram:"icons/telegram-svgrepo-com.svg",twitch:"icons/twitch-v2-svgrepo-com.svg",tiktok:"icons/tiktok.svg",youtube:"icons/youtube.svg"};class O extends u{constructor(e){super(),this.tariff=e,this.isAdmin=localStorage.getItem("isAdmin")==="true"}getAppsDisplay(){return this.tariff.unlimited_apps&&this.tariff.unlimited_apps.length>0?`
        <div class="tariff-desc mb-2 w-100" style="color:#6c757d;font-size:1rem;">Безлимитные приложения</div>
        <div class="mb-3 d-flex align-items-center w-100" style="gap:0;">${this.tariff.unlimited_apps.map(t=>S[t]?`<img src="${S[t]}" alt="${t}" width="24" height="24" style="background:#f5f5f5;border-radius:50%;padding:2px;margin-right:2px;">`:"").join("")}</div>
      `:`
      <div class="tariff-desc mb-2 w-100" style="color:#6c757d;font-size:1rem;">Безлимитные приложения</div>
      <div class="mb-3 w-100" style="color:#b0b0b0;font-size:1rem;">-</div>
    `}getActionsDisplay(){return this.isAdmin?`
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-primary edit-tariff" data-id="${this.tariff.id}">✏️ Edit</button>
          <button class="btn btn-sm btn-outline-danger delete-tariff" data-id="${this.tariff.id}">🗑️ Delete</button>
        </div>
        <div style="white-space:nowrap;">
          <span style="font-size:1.5rem;font-weight:700;">${this.formatPrice(this.tariff.price)}</span> ₽
          <span style="font-size:1rem;font-weight:400;"> за 30 дней</span>
        </div>
      `:`
      <a href="#/product/${this.tariff.id}" class="btn btn-yota flex-shrink-0" style="min-width:120px;max-width:150px;background:#00B5FF;color:#fff;font-weight:700;border-radius:2rem;white-space:nowrap;">Подробнее</a>
      <div style="white-space:nowrap;">
        <span style="font-size:1.5rem;font-weight:700;">${this.formatPrice(this.tariff.price)}</span> ₽
        <span style="font-size:1rem;font-weight:400;"> за 30 дней</span>
      </div>
    `}formatMinutes(e){return e===-1?"Безлимит":`${e} мин`}formatInternetGb(e){return e===-1?"Безлимит":`${e} ГБ`}formatPrice(e){return Number(e).toLocaleString("ru-RU")}render(){return this.el.className="col",this.el.innerHTML=`
      <div class="tariff-card h-100 d-flex flex-column justify-content-between p-4" style="min-width:320px;max-width:370px;height:440px;border-radius:1.25rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.04);background:#fff;">
        <div class="d-flex flex-column h-100" style="align-items:flex-start;padding-left:8px;">
          <div class="d-flex align-items-center justify-content-between mb-2 w-100">
            <div class="tariff-title" style="font-size:1.15rem; font-weight:900; color:#2D3A43;">${this.tariff.name}</div>
          </div>
          <div class="d-flex align-items-end mb-2 w-100" style="gap:1.2rem;">
            <div style="font-size:2rem;font-weight:700;">${this.formatInternetGb(this.tariff.internet_gb)}</div>
            <div style="font-size:2rem;font-weight:700;">${this.formatMinutes(this.tariff.minutes)}</div>
          </div>
          ${this.getAppsDisplay()}
          ${this.tariff.description?`
            <div class="tariff-desc mb-2 w-100" style="color:#6c757d;font-size:1rem;">
              ${this.tariff.description}
            </div>
          `:""}
        </div>
        <div class="d-flex align-items-center justify-content-between mt-3 gap-2 flex-nowrap w-100" style="margin-top:auto;min-height:48px;">
          ${this.getActionsDisplay()}
        </div>
      </div>
    `,this.el}}const z={vk:{name:"ВКонтакте",icon:"icons/vk-v2-svgrepo-com.svg"},whatsapp:{name:"WhatsApp",icon:"icons/whatsapp-svgrepo-com.svg"},telegram:{name:"Telegram",icon:"icons/telegram-svgrepo-com.svg"},twitch:{name:"Twitch",icon:"icons/twitch-v2-svgrepo-com.svg"}};class U extends u{constructor(e=null){super(),this.tariff=e,this.selectedApps=(e==null?void 0:e.unlimited_apps)||[]}render(){var n,o,l,d,h,E,$;this.el.className="tariff-form";const e=this.tariff?"Редактировать тариф":"Добавить новый тариф",t=this.tariff?"Сохранить изменения":"Добавить тариф",i=Object.entries(z).map(([f,c])=>`
      <div class="form-check">
        <input class="form-check-input" type="checkbox" 
          value="${f}" id="app-${f}" name="apps" 
          ${this.selectedApps.includes(f)?"checked":""}>
        <label class="form-check-label d-flex align-items-center gap-2" for="app-${f}">
          <img src="/icons/${c.icon}" alt="${c.name}" width="24" height="24" style="background:#f5f5f5;border-radius:50%;padding:2px;">
          ${c.name}
        </label>
      </div>
    `).join("");this.el.innerHTML=`
      <div class="card border-0">
        <h3 class="mb-4" style="font-size: 1.5rem; font-weight: 600;">${e}</h3>
        <form id="tariffForm">
          <div class="mb-3">
            <label for="name" class="form-label">Название тарифа</label>
            <input type="text" class="form-control" id="name" name="name" required 
              value="${((n=this.tariff)==null?void 0:n.name)||""}" style="border-radius: 0.5rem;">
          </div>
          
          <div class="mb-3">
            <label for="price" class="form-label">Цена (₽)</label>
            <input type="text" class="form-control" id="price" name="price" required 
              value="${((o=this.tariff)==null?void 0:o.price)||""}" style="border-radius: 0.5rem;">
          </div>
          
          <div class="mb-3">
            <label for="internet_gb" class="form-label">Интернет (ГБ)</label>
            <input type="number" class="form-control" id="internet_gb" name="internet_gb" required 
              value="${((l=this.tariff)==null?void 0:l.internet_gb)||""}" placeholder="Например: 10" style="border-radius: 0.5rem;">
          </div>
          
          <div class="mb-3">
            <label for="minutes" class="form-label">Минуты</label>
            <input type="number" class="form-control" id="minutes" name="minutes" required 
              value="${((d=this.tariff)==null?void 0:d.minutes)||""}" placeholder="Например: 300 (или -1 для безлимита)" style="border-radius: 0.5rem;">
          </div>
          
          <div class="mb-3">
            <label for="description" class="form-label">Описание</label>
            <textarea class="form-control" id="description" name="description" rows="3" required style="border-radius: 0.5rem;">${((h=this.tariff)==null?void 0:h.description)||""}</textarea>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Безлимитные приложения</label>
            <div class="apps-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.5rem;">
              ${i}
            </div>
          </div>
          
          <div class="mb-3">
            <label for="features" class="form-label">Дополнительные особенности (по одной на строку)</label>
            <textarea class="form-control" id="features" name="features" rows="4" required style="border-radius: 0.5rem;">${(($=(E=this.tariff)==null?void 0:E.features)==null?void 0:$.join(`
`))||""}</textarea>
          </div>
          
          <div class="d-flex gap-2 justify-content-end">
            <button type="button" class="btn btn-outline-secondary" id="cancelBtn" style="border-radius: 0.5rem;">Отмена</button>
            <button type="submit" class="btn btn-yota" style="border-radius: 0.5rem; background: #00B5FF; color: white; border: none;">${t}</button>
          </div>
        </form>
      </div>
    `;const r=this.el.querySelector("#tariffForm"),a=this.el.querySelector("#cancelBtn");return r.onsubmit=f=>{var C;f.preventDefault();const c=new FormData(r),q=Array.from(c.getAll("apps")),L=c.get("features"),j=(L?L.split(`
`).filter(b=>b.trim()):[]).reduce((b,N,B)=>(b[`feature_${B+1}`]=N,b),{}),A={name:c.get("name"),price:Number(c.get("price")),internet_gb:Number(c.get("internet_gb")),minutes:Number(c.get("minutes")),description:c.get("description"),unlimited_apps:q,additional_features:j};console.log("Sending tariff data:",A);const P=new CustomEvent("tariffSubmit",{detail:{tariffData:A,isEdit:!!this.tariff,tariffId:(C=this.tariff)==null?void 0:C.id}});this.el.dispatchEvent(P)},a.onclick=()=>{const f=new CustomEvent("tariffFormCancel");this.el.dispatchEvent(f)},this.el}}class R extends u{constructor(){super(),this.isAdmin=localStorage.getItem("isAdmin")==="true"}toggleAdmin(){this.isAdmin=!this.isAdmin,localStorage.setItem("isAdmin",this.isAdmin),window.dispatchEvent(new CustomEvent("adminModeChanged",{detail:{isAdmin:this.isAdmin}}))}render(){return this.el.className="admin-toggle position-fixed",this.el.style.cssText="bottom: 20px; right: 20px; z-index: 1000;",this.el.innerHTML=`
      <button class="btn ${this.isAdmin?"btn-danger":"btn-outline-secondary"}" 
              style="border-radius: 50%; width: 50px; height: 50px; padding: 0; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <span style="font-size: 1.5rem;">${this.isAdmin?"👑":"🔒"}</span>
      </button>
    `,this.el.querySelector("button").onclick=()=>this.toggleAdmin(),this.el}}class X extends u{constructor(e){super(),this.content=e}render(){this.el.innerHTML=`
      <div class="modal-backdrop fade show" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 1040;"></div>
      <div class="modal fade show" style="display: block; z-index: 1050;" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content" style="border-radius: 1rem; border: none; box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);">
            <div class="modal-header" style="border-bottom: none; padding: 1.5rem 1.5rem 0.5rem;">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="padding: 0.5rem 1.5rem 1.5rem;">
            </div>
          </div>
        </div>
      </div>
    `;const e=this.el.querySelector(".btn-close"),t=this.el.querySelector(".modal-backdrop"),i=this.el.querySelector(".modal-body");this.content&&i&&i.appendChild(this.content);const r=()=>{this.el.remove()};e.addEventListener("click",r),t.addEventListener("click",n=>{n.target===t&&r()});const a=n=>{n.key==="Escape"&&(r(),document.removeEventListener("keydown",a))};return document.addEventListener("keydown",a),this.el}}class G{async get(e){try{const t=await fetch(e);return this._handleResponse(t)}catch(t){throw console.error("GET request failed:",t),t}}async post(e,t){try{const i=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return this._handleResponse(i)}catch(i){throw console.error("POST request failed:",i),i}}async put(e,t){try{const i=await fetch(e,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return this._handleResponse(i)}catch(i){throw console.error("PUT request failed:",i),i}}async delete(e){try{const t=await fetch(e,{method:"DELETE"});return this._handleResponse(t)}catch(t){throw console.error("DELETE request failed:",t),t}}async _handleResponse(e){if(!e.ok)throw new Error(`Request failed with status ${e.status}`);try{return{data:await e.json()}}catch(t){throw console.error("Ошибка парсинга JSON:",t),t}}}const g=new G;class Y{constructor(){this.baseUrl="http://localhost:3000"}getTariff(){return`${this.baseUrl}/tariffs`}getTariffById(e){return`${this.baseUrl}/tariffs/${e}`}createTariff(){return`${this.baseUrl}/tariffs`}removeTariffById(e){return`${this.baseUrl}/tariffs/${e}`}updateTariffById(e){return`${this.baseUrl}/tariffs/${e}`}}const v=new Y;let m={},w=1;const x=()=>{window.dispatchEvent(new CustomEvent("tariffsUpdated"))},J=s=>{m=s.reduce((e,t)=>(e[t.id]=t,w=Math.max(w,t.id+1),e),{})},K=async()=>{try{const s=await g.get(v.getTariff());return s!=null&&s.data?(J(s.data),s.data):[]}catch(s){throw console.error("Failed to fetch tariffs:",s),s}},F=async s=>{try{if(m[s])return m[s];const e=await g.get(v.getTariffById(s));return e!=null&&e.data?(m[e.data.id]=e.data,e.data):null}catch(e){throw console.error(`Failed to fetch tariff ${s}:`,e),e}},V=async s=>{try{console.log("Making POST request with data:",s);const e=await g.post(v.createTariff(),s);if(console.log("Received response:",e),e&&(e.data||e.id)){const t=e.data||e;return m[t.id]=t,w=Math.max(w,t.id+1),x(),t.id}throw new Error("Invalid response format")}catch(e){throw console.error("Failed to create tariff:",e),e}},W=async(s,e)=>{try{const t=await g.put(v.updateTariffById(s),{...e,id:parseInt(s,10)});return t!=null&&t.data?(m[s]=t.data,x(),!0):!1}catch(t){throw console.error(`Failed to update tariff ${s}:`,t),t}},Q=async s=>{try{return await g.delete(v.removeTariffById(s)),delete m[s],x(),!0}catch(e){throw console.error(`Failed to delete tariff ${s}:`,e),e}};class y extends k{constructor(){super(),console.log("MainPage constructor"),this.state={showForm:!1,editingTariff:null,isAdmin:localStorage.getItem("isAdmin")==="true"},this.tariffCards=[],this.tariffListListenerAdded=!1,window.addEventListener("tariffsUpdated",e=>{console.log("Tariffs updated event received (constructor)"),(!e.detail||e.detail.needFullRefresh!==!1)&&this.renderTariffsList()}),window.addEventListener("adminModeChanged",e=>{console.log("Admin mode changed (constructor):",e.detail.isAdmin),localStorage.setItem("isAdmin",e.detail.isAdmin),window.location.reload()}),window.addEventListener("addTariff",()=>{console.log("Add tariff event received (constructor)"),this.showTariffForm()}),window.addEventListener("editTariff",e=>{console.log("Edit tariff event received (constructor):",e.detail.tariffId),this.showTariffForm(e.detail.tariffId)}),window.addEventListener("deleteTariff",async e=>{console.log("Delete tariff event received:",e.detail.tariffId);try{await Q(e.detail.tariffId),this.removeTariffCard(e.detail.tariffId)}catch(t){console.error("Failed to delete tariff:",t)}}),window.addEventListener("showTariffDetails",e=>{console.log("Show tariff details event received (constructor):",e.detail.tariffId),window.location.hash=`#/product/${e.detail.tariffId}`}),this.setupTariffListListener()}setupTariffListListener(){const e=this.el.querySelector("#tariff-list");e&&!this.tariffListListenerAdded?(console.log("Adding tariff list click listener (constructor)"),e.addEventListener("click",t=>{const i=t.target,r=i.closest(".tariff-card");if(!r)return;const a=r.querySelector("[data-id]"),n=parseInt(a?a.dataset.id:r.dataset.id);if(isNaN(n))return;const o=i.closest(".edit-tariff"),l=i.closest(".delete-tariff"),d=i.closest(".details-btn");o?window.dispatchEvent(new CustomEvent("editTariff",{detail:{tariffId:n}})):l?confirm("Вы уверены, что хотите удалить этот тариф?")&&window.dispatchEvent(new CustomEvent("deleteTariff",{detail:{tariffId:n}})):d?i.tagName!=="A"&&(t.preventDefault(),window.location.hash=`#/product/${n}`):window.location.hash=`#/product/${n}`}),this.tariffListListenerAdded=!0):this.tariffListListenerAdded||requestAnimationFrame(()=>this.setupTariffListListener())}render(){console.log("Rendering main page..."),this.el.innerHTML=`
      <div id="header-container"></div>
      <div class="container">
        <div id="carousel-container"></div>
        <div class="tariff-section-title mb-4">Мобильная связь</div>
        <div class="row row-cols-1 row-cols-md-3 g-2" id="tariff-list"></div>
      </div>
    `,this.header=new M;const e=this.el.querySelector("#header-container");e&&e.appendChild(this.header.render());const t=new H,i=this.el.querySelector("#carousel-container");i&&i.appendChild(t.render());const r=new R;return this.el.appendChild(r.render()),this.renderTariffsList(),this.el}async renderTariffsList(){console.log("Rendering tariffs list...");const e=this.el.querySelector("#tariff-list");if(!e){console.error("Tariff list container not found!");return}const t=window.scrollY;e.innerHTML="";try{const i=await K();console.log("Found tariffs:",i),Array.isArray(i)?(this.tariffCards=i.map(r=>this.tariffCards.find(n=>n.tariff.id===r.id)||new O(r)),this.tariffCards.forEach(r=>{e.appendChild(r.render())})):console.error("Expected tariffs to be an array but got:",i)}catch(i){console.error("Failed to load tariffs:",i),e.innerHTML='<div class="alert alert-danger">Ошибка загрузки тарифов</div>'}window.scrollTo(0,t)}removeTariffCard(e){const t=this.el.querySelector("#tariff-list");if(!t)return;const i=t.querySelector(`[data-id="${e}"]`);i&&i.remove(),this.tariffCards=this.tariffCards.filter(r=>r.tariff.id===e?(r.el=null,!1):!0)}async showTariffForm(e=null){if(!this.state.isAdmin)return;console.log("Showing tariff form for tariffId:",e);const t=e?await F(e):null,r=new U(t).render(),a=new X(r);document.body.appendChild(a.render()),r.addEventListener("tariffSubmit",async n=>{const{tariffData:o,isEdit:l,tariffId:d}=n.detail;try{l?await W(d,o):await V(o),a.el.remove(),this.state.showForm=!1}catch(h){console.error("Failed to save tariff:",h)}}),r.addEventListener("tariffFormCancel",()=>{a.el.remove(),this.state.showForm=!1})}}class Z extends u{constructor(e){super(),this.tariff=e}render(){if(this.el.className="product-details product-container",!this.tariff)return this.el.innerHTML='<div class="alert alert-danger">Тариф не найден</div>',this.el;const e=this.tariff;return this.el.innerHTML=`
      <div class="mb-2">
        <h2 class="tariff-section-title text-center mb-4">Тариф "${e.name}"</h2>
        <div class="list-group list-group-flush mb-0">
          <div class="list-group-item d-flex justify-content-between align-items-center py-3">
            <span>Звонки</span>
            <span class="tariff-value fw-bold text-primary">${this.formatMinutes(e.minutes)}</span>
          </div>
          <div class="list-group-item d-flex justify-content-between align-items-center py-3">
            <span>Интернет</span>
            <span class="tariff-value fw-bold text-primary">${this.formatInternetGb(e.internet_gb)}</span>
          </div>
          <div class="list-group-item d-flex justify-content-between align-items-center py-3">
            <span>Безлимит на приложения</span>
            <span>
              ${e.unlimited_apps&&e.unlimited_apps.length>0?e.unlimited_apps.map(t=>{const i=z[t];return i?`<img src="/icons/${i.icon}" alt="${i.name}" style="width: 24px; height: 24px; margin-right: 4px;">`:""}).join(""):"-"}
            </span>
          </div>
        </div>

        ${e.description?`
        <div class="list-group list-group-flush mb-0">
          <div class="list-group-item py-3">
            <h4 class="mb-2" style="font-size: 1rem; font-weight: 600;">Описание тарифа</h4>
            <p class="mb-0" style="font-size: 0.9em;">${e.description}</p>
          </div>
        </div>
        `:""}

        ${e.additional_features&&Object.keys(e.additional_features).length>0?`
          <div class="list-group list-group-flush mb-0">
            <div class="list-group-item py-3">
              <h4 class="mb-2" style="font-size: 1rem; font-weight: 600;">Дополнительные особенности</h4>
              <ul class="mb-0" style="font-size: 0.9em; padding-left: 20px;">
                ${Object.values(e.additional_features).map(t=>`<li>${t}</li>`).join("")}
              </ul>
            </div>
          </div>
        `:""}

        <div class="d-flex justify-content-between align-items-center bg-primary text-white p-3 rounded-3 mb-4">
          <div class="price-info" style="font-size: 1.5em; font-weight: bold;">
            ${this.formatPrice(e.price)} ₽ <span style="font-size: 0.7em; font-weight: normal;">за 30 дней</span>
          </div>
        </div>
      </div>`,this.el}formatMinutes(e){return e===-1?"Безлимит":`${e} минут`}formatInternetGb(e){return e===-1?"Безлимит":`${e} ГБ`}formatPrice(e){return Number(e).toLocaleString("ru-RU")}}class ee extends k{constructor(e){super(),this.id=e}async render(){const e=await F(this.id);if(!e)return this.el.innerHTML="<h2>Тариф не найден</h2>",this.el;this.el.innerHTML="";const t=document.createElement("div");t.className="container mt-2";const i=new M;this.el.prepend(i.render());const r=document.createElement("div");r.className="row justify-content-center";const a=document.createElement("div");a.className="col-md-8 col-lg-6";const n=new Z(e);a.appendChild(n.render()),r.appendChild(a),t.appendChild(r),this.el.appendChild(t);const o=document.createElement("div");return o.className="text-center mb-5 d-flex flex-column align-items-center",o.innerHTML=`
      <div class="row row-cols-1 row-cols-md-3 g-4 justify-content-center" style="max-width: 800px;">
        <!-- Card 1: Оформить -->
        <div class="col">
          <div class="card h-100 text-center p-3">
            <img src="/icons/esim_banner_d.png" class="card-img-top mx-auto mb-3" alt="Оформить" style="width: auto; height: 80px;">
            <div class="card-body p-0">
              <h5 class="card-title">Оформить</h5>
              <p class="card-text" style="font-size: 0.9em; color: #6c757d;">Можно с 14 лет - нужен паспорт. Занимает 1 минуту.</p>
            </div>
          </div>
        </div>
        <!-- Card 2: Получить -->
        <div class="col">
          <div class="card h-100 text-center p-3">
            <img src="/icons/samokat_d.svg.png" class="card-img-top mx-auto mb-3" alt="Получить" style="width: auto; height: 80px;">
            <div class="card-body p-0">
              <h5 class="card-title">Получить</h5>
              <p class="card-text" style="font-size: 0.9em; color: #6c757d;">С доставкой от 30 минут или забрать самому в точке продаж.</p>
            </div>
          </div>
        </div>
        <!-- Card 3: Быть на связи -->
        <div class="col">
          <div class="card h-100 text-center p-3">
            <img src="/icons/podkluchi_maximum_desc.png" class="card-img-top mx-auto mb-3" alt="Быть на связи" style="width: auto; height: 80px;">
            <div class="card-body p-0">
              <h5 class="card-title">Быть на связи</h5>
              <p class="card-text" style="font-size: 0.9em; color: #6c757d;">С новым номером или с сохранением своего.</p>
            </div>
          </div>
        </div>
      </div>
    `,this.el.appendChild(o),this.el}}const te={"":y,"#/":y,"#/product":ee};function ie(){const s=location.hash.split("/");return s[1]==="product"&&s[2]?{route:"#/product",id:s[2]}:{route:location.hash||"",id:null}}async function T(){const{route:s,id:e}=ie(),t=document.getElementById("app");t.innerHTML="";const i=te[s]||y,a=await new i(e).render();t.appendChild(a)}window.render=T;window.addEventListener("hashchange",()=>T());window.addEventListener("DOMContentLoaded",async()=>{await T(),_()});
