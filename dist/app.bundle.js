var qt=Object.defineProperty;var x=(n,t)=>()=>(n&&(t=n(n=0)),t);var w=(n,t)=>{for(var e in t)qt(n,e,{get:t[e],enumerable:!0})};var X={};w(X,{Compass:()=>R});var R,Z=x(()=>{R=class{constructor(t){this.display=document.getElementById(t.displayId),this.btnFixDetect=document.getElementById(t.btnFixDetectId),this.btnFixCourse=document.getElementById(t.btnFixCourseId),this.inputDetect=document.getElementById(t.inputDetectId),this.inputCourse=document.getElementById(t.inputCourseId),this.states={detect:"idle",course:"idle"},this.currentAzimuth=0,this.isSensorActive=!1,this.deviceOrientationHandler=null,this._initEvents()}_initEvents(){this.btnFixDetect&&this.inputDetect&&this.btnFixDetect.addEventListener("click",async()=>{await this._handleButtonClick("detect",this.btnFixDetect,this.inputDetect,"Виявлення")}),this.btnFixCourse&&this.inputCourse&&this.btnFixCourse.addEventListener("click",async()=>{await this._handleButtonClick("course",this.btnFixCourse,this.inputCourse,"Курс")})}async _handleButtonClick(t,e,o,i){!this.isSensorActive&&!await this._startSensors()||(this.states[t]==="idle"||this.states[t]==="fixed"?(this.states[t]="scanning",this._updateButtonUI(e,"scanning",i),o.style.backgroundColor="#e8f8f5"):this.states[t]==="scanning"&&(this.states[t]="fixed",o.value=this.currentAzimuth,o.style.backgroundColor="",this._updateButtonUI(e,"fixed",i),this._hasActiveScanning()||this._stopSensors()))}_hasActiveScanning(){return this.states.detect==="scanning"||this.states.course==="scanning"}_stopSensors(){this.isSensorActive&&(this.deviceOrientationHandler&&window.removeEventListener("deviceorientation",this.deviceOrientationHandler,!0),this.deviceOrientationAbsoluteHandler&&window.removeEventListener("deviceorientationabsolute",this.deviceOrientationAbsoluteHandler,!0),this.isSensorActive=!1)}async _startSensors(){if(typeof window>"u")return!1;this._hasAbsoluteFix=!1;let t=(e,o)=>{if(this._hasAbsoluteFix&&!o)return;let i=null,r=!1;e.webkitCompassHeading!==void 0&&e.webkitCompassHeading!==null?i=Math.round(e.webkitCompassHeading):e.alpha!==null&&e.alpha!==void 0&&(i=Math.round(360-e.alpha),r=!(o||e.absolute===!0)),i!==null&&(o&&(this._hasAbsoluteFix=!0),this.currentAzimuth=(i%360+360)%360,this._streamToActiveInputs(this.currentAzimuth,r))};this.deviceOrientationHandler=e=>t(e,!1),this.deviceOrientationAbsoluteHandler=e=>t(e,!0);try{return typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"&&await DeviceOrientationEvent.requestPermission()!=="granted"?(this._handleGlobalError("Доступ відхилено"),!1):(window.addEventListener("deviceorientation",this.deviceOrientationHandler,!0),"ondeviceorientationabsolute"in window&&window.addEventListener("deviceorientationabsolute",this.deviceOrientationAbsoluteHandler,!0),this.isSensorActive=!0,!0)}catch(e){return this._handleGlobalError(e.message||"Помилка датчиків"),!1}}_streamToActiveInputs(t,e){let o=e?"° (відн.)":"°";this.states.detect==="scanning"&&this.inputDetect&&(this.inputDetect.value=this.getCurrentAzimuth()),this.states.course==="scanning"&&this.inputCourse&&(this.inputCourse.value=this.getCurrentAzimuth()),this.display&&(this.display.textContent=`${t}°`,this.display.style.color=e?"#f39c12":"#27ae60")}getCurrentAzimuth(){return this.currentAzimuth}_updateButtonUI(t,e,o){t&&(e==="scanning"?(t.textContent=`🛑 Фіксувати ${o}`,t.style.backgroundColor="#e74c3c",t.style.color="#fff"):e==="fixed"&&(t.textContent=`🔄 Перезаписати ${o}`,t.style.backgroundColor="#27ae60",t.style.color="#fff"))}_handleGlobalError(t){alert(`Помилка компаса: ${t}`),this.display&&(this.display.textContent=`Помилка: ${t}`,this.display.style.color="#e74c3c")}}});var tt={};w(tt,{generateReportText:()=>Qt});function Qt(n){let t=n.coordinates?` ${n.coordinates}`:"",e=`${n.time} ${n.date}  `;return n.otherActive?(e+=`${n.positionShort||n.position}${t}
`,e+=`${n.otherActive}
`,e+=z(n)?z(n)+`
`:""):(e+=` ${n.position||"Не вказано назву позиції"}${t}
`,e+=`${n.target+". Ворожий."||"Не визначено"}`,e+=` № ${n.targetNumber||"Не вказано"}
`,e+=`${n.detection||"Виявлення цілі не вказано"}
`,e+=`Кількість: ${n.targetCount+" од."||"Не вказано"} `,e+=z(n)?z(n)+`
`:"",e+=n.isDestroyed?`${n.isDestroyed}
`:"",Array.isArray(n.weaponsUsed)&&n.weaponsUsed.length>0&&(e+="Витрати БK:",n.weaponsUsed.forEach(o=>{if(!o.weapon)return;e+=` ${o.weapon} `;let i=o.ammo&&o.ammo!=="Не вказано"?o.ammo:" боеприпас не вказано",r=o.countAmmo||" боеприпасів не вказано";e+=`${i} - ${r} од.
`}))),e}function z(n){let t=[];return n.azimuthDetect&&t.push(`A-${n.azimuthDetect}°`),n.azimuthCourse&&t.push(`K-${n.azimuthCourse}°`),n.targetHight&&t.push(`H-${n.targetHight}м`),n.targetDistance&&t.push(`D-${n.targetDistance}км`),t.length===0?null:`(${t.join(" ")})`}var et=x(()=>{});function B(){let n=localStorage.getItem(it);if(n)try{let e=JSON.parse(n);if(Array.isArray(e))return e}catch(e){console.error("Помилка парсингу localStorage",e)}let t=[...Xt];return H(t),t}function H(n){localStorage.setItem(it,JSON.stringify(n))}function st(n){let t=n.trim();if(!t)return!1;let e=B();return e.some(i=>i.toLowerCase()===t.toLowerCase())?!1:(e.push(t),e.sort((i,r)=>i.localeCompare(r,"uk")),H(e),!0)}function rt(n,t){let e=t.trim();if(!e)return!1;let o=B(),i=o.indexOf(n);return i!==-1?(o[i]=e,o.sort((r,a)=>r.localeCompare(a,"uk")),H(o),!0):!1}function at(n){let e=B().filter(o=>o!==n);return H(e),!0}function k(){let n=localStorage.getItem(nt);if(n)try{let e=JSON.parse(n);if(Array.isArray(e))return e}catch(e){console.error("Помилка парсингу localStorage",e)}let t=[...Yt];return G(t),t}function G(n){localStorage.setItem(nt,JSON.stringify(n))}function P(n){let t=n.trim();if(!t)return!1;let e=k();return e.some(i=>i.toLowerCase()===t.toLowerCase())?!1:(e.push(t),e.sort((i,r)=>i.localeCompare(r,"uk")),G(e),!0)}function dt(n,t){let e=t.trim();if(!e)return!1;let o=k(),i=o.indexOf(n);return i!==-1?(o[i]=e,o.sort((r,a)=>r.localeCompare(a,"uk")),G(o),!0):!1}function ct(n){let e=k().filter(o=>o!==n);return G(e),!0}function f(){let n=localStorage.getItem(ot);if(n)try{let e=JSON.parse(n);if(e&&typeof e=="object")return e}catch(e){console.error("Помилка парсингу localStorage для зброї",e)}let t=Object.fromEntries(Object.entries(Zt).map(([e,o])=>[e,[...o]]));return S(t),t}function S(n){localStorage.setItem(ot,JSON.stringify(n))}function lt(n){let t=n.trim();if(!t)return!1;let e=f();return Object.keys(e).some(i=>i.toLowerCase()===t.toLowerCase())?!1:(e[t]=[],S(e),!0)}function ut(n,t){let e=t.trim();if(!e)return!1;let o=f();return o[n]||(o[n]=[]),o[n].some(r=>r.toLowerCase()===e.toLowerCase())?!1:(o[n].push(e),o[n].sort((r,a)=>r.localeCompare(a,"uk")),S(o),!0)}function pt(n,t){let e=t.trim();if(!e)return!1;let o=f();return o[n]?(o[e]=o[n],delete o[n],S(o),!0):!1}function mt(n){let t=f();return t[n]?(delete t[n],S(t),!0):!1}function ht(n,t,e){let o=e.trim();if(!o)return!1;let i=f();if(i[n]){let r=i[n].indexOf(t);if(r!==-1)return i[n][r]=o,i[n].sort((a,d)=>a.localeCompare(d,"uk")),S(i),!0}return!1}function gt(n,t){let e=f();return e[n]?(e[n]=e[n].filter(o=>o!==t),S(e),!0):!1}var Yt,Xt,Zt,nt,ot,it,M=x(()=>{Yt=["БпЛА типу Герань-2","БпЛА типу Герань-3","БпЛА типу Бандероль","БпЛА типу Гербера","БпЛА типу реактивний Шахед","БпЛА типу Зала","БпЛА типу Молнія","БпЛА типу Суперкам","БпЛА типу ШАХЕД","FPV-дрон","БпЛА типу Орлан","Гелікоптер","Зонд","Квадрокоптер","Крилата Ракета","Літак Великий","Літак Малий"],Xt=["Постріли","Робота суміжних підрозділів","Вибух в небі","Вибух на землі","Вибух","Спалах в небі","Виходи","Наші на вихід","Наші повертаються"],Zt={"ПЗРК Stinger":["FIM-92A","FIM-92C","FIM-92E"],"ПЗРК Голка (Игла)":["9М39","9М313"],"ПЗРК Перун (Piorun)":["Перун"],"ПЗРК Стрела-3":["9М36"],"ЗУ-23-2":["23-мм ОФЗ","23-мм БЗТ"],"Кулемет Браунінг (M2)":["12.7x99 mm NATO"],"Кулемет ДШК":["12.7x108 мм"],"Стрелецька зброя (АК-74)":["5.45x39 мм"],"Стрелецька зброя (ПКМ)":["7.62x54 ммR"]},nt="ppo_targets_directory",ot="ppo_weapons_directory",it="ppo_active_directory"});var bt={};w(bt,{TargetSearch:()=>F});var F,vt=x(()=>{M();F=class{constructor(){this.searchInput=document.getElementById("target-search"),this.hiddenInput=document.getElementById("target-select"),this.dropdown=document.getElementById("target-dropdown-results"),this.listContainer=document.getElementById("targets-list-container"),this.quickAddBox=document.getElementById("add-new-suggest-box"),this.quickAddSpan=document.getElementById("new-target-name-span"),this.btnQuickAdd=document.getElementById("btn-quick-add"),this.clearBtn=document.getElementById("clear-target-search"),this._initEvents(),document.addEventListener("directoryUpdated",()=>{this.filterAndRender(this.searchInput.value)})}_initEvents(){this.searchInput.addEventListener("focus",()=>{this.filterAndRender(this.searchInput.value),this.dropdown.style.display="block"}),this.searchInput.addEventListener("input",()=>{let t=this.searchInput.value;this.clearBtn.style.display=t?"block":"none",this.filterAndRender(t)}),this.clearBtn.addEventListener("click",()=>{this.searchInput.value="",this.hiddenInput.value="",this.clearBtn.style.display="none",this.filterAndRender(""),this.searchInput.focus()}),this.btnQuickAdd.addEventListener("click",()=>{let t=this.searchInput.value.trim();t&&(P(t),this.selectValue(t))}),document.addEventListener("click",t=>{!t.target.closest("#target-search")&&!t.target.closest("#target-dropdown-results")&&(this.dropdown.style.display="none")})}filterAndRender(t=""){let e=k(),o=t.toLowerCase().trim(),i=e.filter(a=>a.toLowerCase().includes(o));if(this.listContainer.innerHTML="",i.length>0)i.forEach(a=>{let d=document.createElement("div");d.textContent=a,d.style.padding="10px",d.style.cursor="pointer",d.style.borderBottom="1px solid #f0f0f0",d.addEventListener("mouseenter",()=>d.style.backgroundColor="#f1f1f1"),d.addEventListener("mouseleave",()=>d.style.backgroundColor=""),d.addEventListener("click",()=>{this.selectValue(a)}),this.listContainer.appendChild(d)});else{let a=document.createElement("div");a.textContent="Нічого не знайдено",a.style.padding="10px",a.style.color="#777",this.listContainer.appendChild(a)}let r=e.some(a=>a.toLowerCase()===o);o.length>0&&!r?(this.quickAddSpan.textContent=t.trim(),this.quickAddBox.style.display="block"):this.quickAddBox.style.display="none"}selectValue(t){this.searchInput.value=t,this.hiddenInput.value=t,this.dropdown.style.display="none",this.clearBtn.style.display="block"}}});var ft={};w(ft,{WeaponManager:()=>N});var N,yt=x(()=>{M();N=class{constructor(t){this.weaponSelect=document.getElementById(t.weaponSelectId),this.ammoSelect=document.getElementById(t.ammoSelectId),this.countAmmoInput=document.getElementById(t.countAmmoId),this.addBtn=document.getElementById(t.addBtnId),this.listContainer=document.getElementById(t.listContainerId),this.weaponsUsed=[],this.weaponSelect&&this.ammoSelect&&this.init(),this.addBtn&&this.listContainer&&(this.addBtn.addEventListener("click",()=>this.addCurrentEntry()),this._renderList()),document.addEventListener("directoryUpdated",()=>{this.populateWeapons({preserveSelection:!0})})}init(){this.populateWeapons(),this.weaponSelect.addEventListener("change",()=>{this.handleWeaponChange()})}populateWeapons({preserveSelection:t=!1}={}){let e=f(),o=Object.keys(e).sort((a,d)=>a.localeCompare(d,"uk")),i=t?this.weaponSelect.value:"",r=t?this.ammoSelect.value:"";if(this.weaponSelect.innerHTML='<option value="">-- Оберіть зброю --</option>',o.forEach(a=>{let d=document.createElement("option");d.value=a,d.textContent=a,this.weaponSelect.appendChild(d)}),i&&e[i]){this.weaponSelect.value=i,this.handleWeaponChange(),r&&[...this.ammoSelect.options].some(a=>a.value===r)&&(this.ammoSelect.value=r);return}this.ammoSelect.innerHTML='<option value="">-- Спочатку оберіть зброю --</option>',this.ammoSelect.disabled=!0}handleWeaponChange(){let t=this.weaponSelect.value;if(!t){this.ammoSelect.innerHTML='<option value="">-- Спочатку оберіть зброю --</option>',this.ammoSelect.disabled=!0;return}let o=f()[t]||[];if(this.ammoSelect.innerHTML='<option value="">-- Оберіть боєприпас --</option>',o.length>0)o.forEach(i=>{let r=document.createElement("option");r.value=i,r.textContent=i,this.ammoSelect.appendChild(r)}),this.ammoSelect.disabled=!1;else{let i=document.createElement("option");i.value="Не вказано",i.textContent="Немає доступних боєприпасів",this.ammoSelect.appendChild(i),this.ammoSelect.disabled=!1}}addCurrentEntry(){let t=this.weaponSelect.value;if(!t){this.weaponSelect.focus();return}let e=this.ammoSelect.value,o=this.countAmmoInput?this.countAmmoInput.value:"";this.weaponsUsed.push({weapon:t,ammo:e,countAmmo:o}),this._renderList(),this.ammoSelect.value="",this.countAmmoInput&&(this.countAmmoInput.value="")}removeEntry(t){this.weaponsUsed.splice(t,1),this._renderList()}getWeaponsUsed(){return[...this.weaponsUsed]}clearWeaponsUsed(){this.weaponsUsed=[],this._renderList()}_renderList(){if(this.listContainer){if(this.listContainer.innerHTML="",this.weaponsUsed.length===0){let t=document.createElement("div");t.textContent="Зброю ще не додано до звіту",t.style.cssText="font-size: 13px; color: #999; padding: 6px 2px;",this.listContainer.appendChild(t);return}this.weaponsUsed.forEach((t,e)=>{let o=document.createElement("div");o.style.cssText="display: flex; justify-content: space-between; align-items: center; padding: 8px; border: 1px solid #eee; border-radius: 4px; margin-bottom: 6px; background: #fff;";let i=document.createElement("span"),r=t.ammo&&t.ammo!=="Не вказано"?` — ${t.ammo}`:"",a=t.countAmmo?` (${t.countAmmo} шт.)`:"";i.textContent=`⚔️ ${t.weapon}${r}${a}`,i.style.fontSize="14px";let d=document.createElement("button");d.type="button",d.textContent="✕",d.style.cssText="width: auto; padding: 4px 10px; background: #e74c3c; min-height: auto;",d.addEventListener("click",()=>this.removeEntry(e)),o.appendChild(i),o.appendChild(d),this.listContainer.appendChild(o)})}}}});var xt={};w(xt,{ActiveManager:()=>V});var V,Et=x(()=>{M();V=class{constructor(t){this.activeSelect=document.getElementById(t.activeSelectId),this.activeSelect&&this.init(),document.addEventListener("directoryUpdated",()=>{this.populateActive({preserveSelection:!0})})}init(){this.populateActive(),this.activeSelect.addEventListener("change",()=>{this.handleActiveChange()})}populateActive({preserveSelection:t=!1}={}){let e=B(),o=Object.values(e).sort((i,r)=>i.localeCompare(r,"uk"));this.activeSelect.innerHTML='<option value="">-- Активність не відноситься до цілей --</option>',o.forEach(i=>{let r=document.createElement("option");r.value=i,r.textContent=i,this.activeSelect.appendChild(r)})}handleActiveChange(){let t=this.activeSelect.value;t&&document.dispatchEvent(new CustomEvent("activeChanged",{detail:{active:t}}))}}});var It={};w(It,{DbEditor:()=>j});var j,wt=x(()=>{M();M();j=class{constructor(){this.tabTargets=document.getElementById("tab-edit-targets"),this.tabWeapons=document.getElementById("tab-edit-weapons"),this.tabActive=document.getElementById("tab-edit-active"),this.panelTargets=document.getElementById("panel-targets"),this.panelWeapons=document.getElementById("panel-weapons"),this.panelActive=document.getElementById("panel-active"),this.newTargetInput=document.getElementById("new-target-db-input"),this.btnAddTarget=document.getElementById("btn-add-target-db"),this.targetsListContainer=document.getElementById("db-targets-list"),this.newWeaponInput=document.getElementById("new-weapon-db-input"),this.btnAddWeapon=document.getElementById("btn-add-weapon-db"),this.weaponsListContainer=document.getElementById("db-weapons-list"),this.newActiveInput=document.getElementById("new-active-db-input"),this.btnAddActive=document.getElementById("btn-add-active"),this.btnEditActive=document.getElementById("btn-edit-active"),this.btnDeleteActive=document.getElementById("btn-delete-active"),this.activeListContainer=document.getElementById("db-active-list"),this.init()}init(){this._initTabs(),this._initTargetEvents(),this._initWeaponEvents(),this._initActiveEvents(),this.renderTargets(),this.renderWeapons(),this.renderActive(),this._triggerGlobalUpdate()}_initActiveEvents(){this.btnAddActive.addEventListener("click",()=>{let t=this.newActiveInput.value.trim();t&&(st(t),this.newActiveInput.value="",this.renderActive(),this._triggerGlobalUpdate())})}renderActive(){let t=B();this.activeListContainer.innerHTML="",t.forEach(e=>{let o=document.createElement("div");o.style.cssText="display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px solid #eee;";let i=document.createElement("span");i.textContent=e;let r=document.createElement("div");r.style.display="flex",r.style.gap="5px";let a=document.createElement("button");a.textContent="✏️",a.style.cssText="border: none; background: transparent; cursor: pointer; padding: 3px;",a.addEventListener("click",()=>{let u=prompt(`Редагувати активність "${e}":`,e);u&&u.trim()!==e&&(rt(e,u),this.renderActive(),this._triggerGlobalUpdate())});let d=document.createElement("button");d.textContent="❌",d.style.cssText="border: none; background: transparent; cursor: pointer; padding: 3px;",d.addEventListener("click",()=>{confirm(`Ви дійсно хочете видалити активність "${e}"?`)&&(at(e),this.renderActive(),this._triggerGlobalUpdate())}),r.appendChild(a),r.appendChild(d),o.appendChild(i),o.appendChild(r),this.activeListContainer.appendChild(o)})}_initTabs(){this.tabTargets.addEventListener("click",()=>{this.panelTargets.style.display="block",this.panelWeapons.style.display="none",this.tabTargets.style.background="#3498db",this.tabTargets.style.color="white",this.tabWeapons.style.background="#bdc3c7",this.tabWeapons.style.color="#333",this.tabActive.style.background="#bdc3c7",this.tabActive.style.color="#333"}),this.tabWeapons.addEventListener("click",()=>{this.panelTargets.style.display="none",this.panelWeapons.style.display="block",this.tabWeapons.style.background="#3498db",this.tabWeapons.style.color="white",this.tabTargets.style.background="#bdc3c7",this.tabTargets.style.color="#333",this.tabActive.style.background="#bdc3c7",this.tabActive.style.color="#333"}),this.tabActive.addEventListener("click",()=>{this.panelTargets.style.display="none",this.panelWeapons.style.display="none",this.panelActive.style.display="block",this.tabActive.style.background="#3498db",this.tabActive.style.color="white",this.tabTargets.style.background="#bdc3c7",this.tabTargets.style.color="#333",this.tabWeapons.style.background="#bdc3c7",this.tabWeapons.style.color="#333"})}_initTargetEvents(){this.btnAddTarget.addEventListener("click",()=>{let t=this.newTargetInput.value.trim();t&&(P(t),this.newTargetInput.value="",this.renderTargets(),this._triggerGlobalUpdate())})}renderTargets(){let t=k();this.targetsListContainer.innerHTML="",t.forEach(e=>{let o=document.createElement("div");o.style.cssText="display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px solid #eee;";let i=document.createElement("span");i.textContent=e;let r=document.createElement("div");r.style.display="flex",r.style.gap="5px";let a=document.createElement("button");a.textContent="✏️",a.style.cssText="border: none; background: transparent; cursor: pointer; padding: 3px;",a.addEventListener("click",()=>{let u=prompt(`Редагувати ціль "${e}":`,e);u&&u.trim()!==e&&(dt(e,u),this.renderTargets(),this._triggerGlobalUpdate())});let d=document.createElement("button");d.textContent="❌",d.style.cssText="border: none; background: transparent; cursor: pointer; padding: 3px;",d.addEventListener("click",()=>{confirm(`Ви дійсно хочете видалити ціль "${e}"?`)&&(ct(e),this.renderTargets(),this._triggerGlobalUpdate())}),r.appendChild(a),r.appendChild(d),o.appendChild(i),o.appendChild(r),this.targetsListContainer.appendChild(o)})}_initWeaponEvents(){this.btnAddWeapon.addEventListener("click",()=>{let t=this.newWeaponInput.value.trim();t&&(lt(t),this.newWeaponInput.value="",this.renderWeapons(),this._triggerGlobalUpdate())})}renderWeapons(){let t=f();this.weaponsListContainer.innerHTML="",Object.keys(t).forEach(e=>{let o=document.createElement("div");o.style.cssText="border-bottom: 1px solid #ddd; padding: 10px; background: #fff;";let i=document.createElement("div");i.style.cssText="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; font-weight: bold; color: #2c3e50;";let r=document.createElement("span");r.textContent=`⚔️ ${e}`;let a=document.createElement("div"),d=document.createElement("button");d.textContent="✏️",d.style.cssText="border: none; background: transparent; cursor: pointer; margin-right: 5px;",d.addEventListener("click",()=>{let m=prompt(`Нова назва для зброї "${e}":`,e);m&&m.trim()!==e&&(pt(e,m),this.renderWeapons(),this._triggerGlobalUpdate())});let u=document.createElement("button");u.textContent="❌",u.style.cssText="border: none; background: transparent; cursor: pointer;",u.addEventListener("click",()=>{confirm(`Видалити зброю "${e}" та всі її боєприпаси?`)&&(mt(e),this.renderWeapons(),this._triggerGlobalUpdate())}),a.appendChild(d),a.appendChild(u),i.appendChild(r),i.appendChild(a),o.appendChild(i);let g=t[e]||[],E=document.createElement("ul");E.style.cssText="margin: 5px 0; padding-left: 20px; font-size: 13px; color: #555;",g.forEach(m=>{let I=document.createElement("li");I.style.cssText="margin-bottom: 3px; display: flex; justify-content: space-between; max-width: 90%;";let W=document.createElement("span");W.textContent=m;let L=document.createElement("span"),T=document.createElement("span");T.textContent=" ✏️",T.style.cursor="pointer",T.addEventListener("click",()=>{let _=prompt(`Редагувати боєприпас "${m}":`,m);_&&_.trim()!==m&&(ht(e,m,_),this.renderWeapons(),this._triggerGlobalUpdate())});let p=document.createElement("span");p.textContent=" ❌",p.style.cursor="pointer",p.addEventListener("click",()=>{confirm(`Вилучити боєприпас "${m}" зі зброї "${e}"?`)&&(gt(e,m),this.renderWeapons(),this._triggerGlobalUpdate())}),L.appendChild(T),L.appendChild(p),I.appendChild(W),I.appendChild(L),E.appendChild(I)}),o.appendChild(E);let b=document.createElement("div");b.style.cssText="display: flex; gap: 5px; margin-top: 5px;";let y=document.createElement("input");y.placeholder="Додати боєприпас...",y.style.cssText="flex: 1; font-size: 11px; padding: 3px; border: 1px solid #ccc; border-radius: 3px;";let C=document.createElement("button");C.textContent="+ БК",C.style.cssText="width:50px; font-size: 11px; background: #3498db; color: white; border: none; padding: 3px 8px; border-radius: 3px; cursor: pointer;",C.addEventListener("click",()=>{let m=y.value.trim();m&&(ut(e,m),this.renderWeapons(),this._triggerGlobalUpdate())}),b.appendChild(y),b.appendChild(C),o.appendChild(b),this.weaponsListContainer.appendChild(o)})}_triggerGlobalUpdate(){let t=new CustomEvent("directoryUpdated");document.dispatchEvent(t)}}});var Ct={};w(Ct,{CONFIG:()=>te});var te,At=x(()=>{te={VERSION:"1.6.1",DEBUG_MODE:!0,COMPASS_UPDATE_INTERVAL:200,DEFAULT_MAP_COORDINATES:{lat:48.4647,lng:35.0462}}});var Lt={};w(Lt,{latLonToMgrs:()=>ae});function ee(n,t){let e=n*Math.PI/180,o=Math.floor((t+180)/6)+1,i=((o-1)*6-180+3)*Math.PI/180,r=t*Math.PI/180,a=6378137/Math.sqrt(1-v*Math.sin(e)**2),d=Math.tan(e)**2,u=J*Math.cos(e)**2,g=Math.cos(e)*(r-i),E=6378137*((1-v/4-3*v**2/64-5*v**3/256)*e-(3*v/8+3*v**2/32+45*v**3/1024)*Math.sin(2*e)+(15*v**2/256+45*v**3/1024)*Math.sin(4*e)-35*v**3/3072*Math.sin(6*e)),b=kt*a*(g+(1-d+u)*g**3/6+(5-18*d+d**2+72*u-58*J)*g**5/120)+5e5,y=kt*(E+a*Math.tan(e)*(g**2/2+(5-d+9*u+4*u**2)*g**4/24+(61-58*d+d**2+600*u-330*J)*g**6/720));return n<0&&(y+=1e7),{zone:o,hemisphere:n>=0?"N":"S",easting:b,northing:y}}function oe(n){if(n<-80||n>84)return null;if(n===84)return"X";let t=Math.min(Math.floor((n-ne)/8),St.length-1);return St[t]}function re(n,t,e){let o=Math.floor(t/1e5)-1,i=(n-1)%3,r=ie[i*8+o],a=Math.floor(e/1e5)%20,d=n%2===1?0:5,u=se[(a+d+20)%20];return r+u}function ae(n,t,e=5){let o=oe(n);if(o===null)return null;let{zone:i,easting:r,northing:a}=ee(n,t),d=re(i,r,a),u=10**(5-e),g=String(Math.floor(Math.floor(r)%1e5/u)).padStart(e,"0"),E=String(Math.floor(Math.floor(a)%1e5/u)).padStart(e,"0");return`${i}${o} ${d} ${g} ${E}`}var Bt,v,J,kt,St,ne,ie,se,Tt=x(()=>{Bt=.0033528106647474805,v=Bt*(2-Bt),J=v/(1-v),kt=.9996;St="CDEFGHJKLMNPQRSTUVWXX",ne=-80;ie="ABCDEFGHJKLMNPQRSTUVWXYZ",se="ABCDEFGHJKLMNPQRSTUV"});window.addEventListener("error",function(n){alert(`Критична помилка JS:
`+n.message+`
У файлі: `+n.filename+`
Рядок: `+n.lineno)});var K=!1;function _t(){let n=document.getElementById("ppo");n?n.innerHTML="<h2>На даний момент проект не активний ведуться технічні роботи</h2><br> <h3>Дякую за зворотній зв'язок</h3><h3>Вибачте за тимчасові незручності</h3>":document.addEventListener("DOMContentLoaded",_t,{once:!0})}K?Dt():_t();document.getElementById("ppo").addEventListener("click",()=>{if(K)return;document.getElementById("input-container").style.display="block",document.getElementById("input-field").value==="gena"&&(K=!0,document.getElementById("ppo").innerHTML=de(),Dt())});async function Dt(){let[{Compass:n},{generateReportText:t},{TargetSearch:e},{WeaponManager:o},{ActiveManager:i},{DbEditor:r},{CONFIG:a},{latLonToMgrs:d}]=await Promise.all([Promise.resolve().then(()=>(Z(),X)),Promise.resolve().then(()=>(et(),tt)),Promise.resolve().then(()=>(vt(),bt)),Promise.resolve().then(()=>(yt(),ft)),Promise.resolve().then(()=>(Et(),xt)),Promise.resolve().then(()=>(wt(),It)),Promise.resolve().then(()=>(At(),Ct)),Promise.resolve().then(()=>(Tt(),Lt))]),u="name_position",g="name_position_short",E="name_coordinates",b=null;a.DEBUG_MODE&&console.log(`ППО СМС v${a.VERSION} — debug mode`);function y(){let s={displayId:"azimuth-display",btnFixDetectId:"btn-fix-detect",btnFixCourseId:"btn-fix-course",inputDetectId:"azimuth-detect",inputCourseId:"azimuth-course"},l=document.getElementById(s.btnFixDetectId),c=document.getElementById(s.btnFixCourseId);l&&c?(new n(s),a.DEBUG_MODE&&console.log("Компас успішно ініціалізовано")):(alert("Критична помилка: Кнопки компаса не знайдені в HTML за вказаними ID!"),console.error("Критична помилка: Кнопки компаса не знайдені в HTML. Перевірте ID елементів!"))}function C(){let s=new Date,l=String(s.getHours()).padStart(2,"0"),c=String(s.getMinutes()).padStart(2,"0");document.getElementById("report-time").value=`${l}:${c}`;let h=s.getFullYear(),O=String(s.getMonth()+1).padStart(2,"0"),D=String(s.getDate()).padStart(2,"0");document.getElementById("report-date").value=`${h}-${O}-${D}`}document.getElementById("coordinate-place").style.display="none",new e,b=new o({weaponSelectId:"weapon-select",ammoSelectId:"ammo-select",countAmmoId:"count-ammo",addBtnId:"btn-add-weapon-entry",listContainerId:"weapons-used-list"}),new i({activeSelectId:"active-select"}),new r,document.getElementById("position").value=localStorage.getItem(u)||"",document.getElementById("position-short").value=localStorage.getItem(g)||"",y(),C();let m=document.getElementById("toggle-directory-panel"),I=document.getElementById("directory-panel-body"),W=document.getElementById("directory-toggle-icon");m&&I&&m.addEventListener("click",()=>{let s=I.style.display!=="none";I.style.display=s?"none":"block",m.setAttribute("aria-expanded",String(!s)),W&&(W.textContent=s?"▸":"▾")}),setInterval(C,3e4),document.getElementById("detection-select").addEventListener("change",()=>{document.getElementById("detection-select").value==="Ціль акустично та візуально не виявленно"?document.getElementById("active-target").style.display="none":document.getElementById("active-target").style.display="block"}),document.getElementById("active-select").addEventListener("change",()=>{document.getElementById("report-output").value="";let s=document.getElementById("active-select").value;document.getElementById("report-place").style.display=s?"none":"block"}),document.getElementById("ammo-select").addEventListener("change",()=>{document.getElementById("count-ammo").focus()}),document.getElementById("is-destroyed").addEventListener("change",()=>{let s=document.getElementById("is-destroyed").value;s==="Ціль обстріляно і ЗНИЩЕНО"?document.getElementById("coordinate-place").style.display="block":document.getElementById("coordinate-place").style.display="none",s==="Вогонь не відкривали далека відстань."||s==="Відсутність візуального контакту."?document.getElementById("weapon-place").style.display="none":document.getElementById("weapon-place").style.display="block"}),document.getElementById("btn-clear-weapons-list").addEventListener("click",()=>{b&&b.clearWeaponsUsed()});function L(s){let l=document.getElementById(s);l&&(l.addEventListener("keydown",c=>{if(!(c.ctrlKey||c.metaKey)&&!["Backspace","Delete","ArrowLeft","ArrowRight","Home","End","Tab"].includes(c.key)){if(c.key==="-"||c.key==="+"||isNaN(Number(c.key))){c.preventDefault();return}c.target.value==="0"&&c.key!=="0"?c.target.value="":c.target.value==="0"&&c.key==="0"&&c.preventDefault()}}),l.addEventListener("input",c=>{if(c.target.value==="")return;let h=parseInt(c.target.value,10);h>360?c.target.value=360:h<0&&(c.target.value=0)}))}L("azimuth-course"),L("azimuth-detect"),document.getElementById("btn-get-location").addEventListener("click",()=>{let s=document.getElementById("btn-get-location");if(!navigator.geolocation){p("Геолокація не підтримується цим браузером");return}let l=s.textContent;s.disabled=!0,s.textContent="⏳ Визначення...",navigator.geolocation.getCurrentPosition(c=>{s.disabled=!1,s.textContent=l;let h=Math.round(c.coords.accuracy),O=h>50,D=d(c.coords.latitude,c.coords.longitude,5),$=D?`${D}`:"",U=document.getElementById("coordinates");U.value=$;let A=document.getElementById("position-accuracy-warning");O?(p(`⚠️ Низька точність (±${h}м). Перевірте GPS і дозвіл "Точне місцезнаходження"`,4e3),A&&(A.textContent=`⚠️ Останнє визначення неточне: ±${h}м. Спробуйте на відкритому просторі з увімкненим GPS.`,A.style.display="block")):(p("Координати додано"),A&&(A.style.display="none"))},c=>{s.disabled=!1,s.textContent=l;let h="Не вдалося визначити місцезнаходження";switch(c.code){case c.PERMISSION_DENIED:h="Доступ до геолокації відхилено. Дозвольте в налаштуваннях браузера";break;case c.POSITION_UNAVAILABLE:h="Місцезнаходження недоступне (немає сигналу GPS)";break;case c.TIMEOUT:h="Час очікування вичерпано, спробуйте ще раз";break}p(h)},{enableHighAccuracy:!0,timeout:15e3,maximumAge:0})}),document.getElementById("generate-btn").addEventListener("click",s=>{let l=document.getElementById("position").value,c=document.getElementById("position-short").value;if(!T(l,c)){p("Не вказано повну назву позицію"),s.preventDefault();return}let h=document.getElementById("target-select").value,O=document.getElementById("detection-select").value,D=document.getElementById("report-time").value,$=document.getElementById("report-date").value,U="--.--.----";if($){let[jt,Jt,Kt]=$.split("-");U=`${Kt}.${Jt}.${jt}`}let A=document.getElementById("target-number").value,Wt=document.getElementById("target-count").value,Ot=document.getElementById("target-height").value,$t=document.getElementById("target-distance").value,Ut=document.getElementById("is-destroyed").value,zt=b?b.getWeaponsUsed():[],Ht=document.getElementById("azimuth-detect").value,Gt=document.getElementById("azimuth-course").value,Pt=document.getElementById("active-select").value,Rt=Ht.replace(/\D/g,""),Ft=Gt.replace(/\D/g,""),Nt=document.getElementById("coordinates").value,Q={position:l,positionShort:c,target:h,targetNumber:A,targetCount:Wt,targetHight:Ot,targetDistance:$t,detection:O,time:D,date:U,isDestroyed:Ut,azimuthDetect:Rt,azimuthCourse:Ft,weaponsUsed:zt,otherActive:Pt,coordinates:Nt},Y=Mt(Q);if(Y.length>0){p(Y.join(`

`)),q();return}q(1);let Vt=t(Q);document.getElementById("report-output").value=Vt});function T(s,l){return localStorage.setItem(g,l),s?(localStorage.setItem(u,s),!0):!1}function p(s,l=5e3){let c=document.getElementById("toast");c&&(c.textContent=s,c.classList.add("show"),clearTimeout(p._timer),p._timer=setTimeout(()=>{c.classList.remove("show")},l))}async function _(){let s=document.getElementById("report-output"),l=s.value;if(!l.trim())return p("Спочатку сформуйте звіт"),!1;try{return navigator.clipboard&&window.isSecureContext?await navigator.clipboard.writeText(l):(s.removeAttribute("readonly"),s.focus(),s.select(),document.execCommand("copy"),s.setAttribute("readonly",!0)),p("Скопійовано!"),!0}catch(c){return console.error("Помилка копіювання",c),p("Не вдалося скопіювати"),!1}}document.getElementById("btn-copy-report").addEventListener("click",_),document.getElementById("btn-share-report").addEventListener("click",async()=>{let s=document.getElementById("report-output").value;if(!s.trim()){p("Спочатку сформуйте звіт");return}if(navigator.share)try{await navigator.share({text:s})}catch(l){l.name!=="AbortError"&&(console.error("Помилка поширення",l),p("Не вдалося поділитись, спробуйте копіювати"))}else await _()&&p("Поширення недоступне — текст скопійовано")}),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./service-worker.js").then(s=>console.log("SW зарегистрирован!",s)).catch(s=>console.error("Ошибка SW",s))});function q(s=0){let l=document.getElementById("generate-btn"),c=s>0?140:0;l.style.setProperty("--btn-color",`hsl(${c}, 70%, 50%)`)}function Mt(s){let l=[];return s.otherActive?(s.position||l.push("Потрібно вказати позицію"),l):(s.target||l.push("Потрібно вказати ціль"),s.targetNumber||l.push("Потрібно вказати номер цілі"),s.targetCount||l.push("Потрібно вказати кількість цілей"),s.time||l.push("Потрібно вказати час"),s.date||l.push("Потрібно вказати дату"),s.isDestroyed||l.push("Потрібно вказати статус знищення"),s.detection||l.push("Потрібно вказати спосіб виявлення"),s.position||l.push("Потрібно вказати позицію"),s.isDestroyed!=="Вогонь не відкривали далека відстань."&&s.isDestroyed!=="Відсутність візуального контакту."&&(!s.weaponsUsed||s.weaponsUsed.length===0)&&l.push("Потрібно вказати хоча б один вид  зброї та боєприпаси"),l)}}function de(){return`<h2>Новий звіт ППO</h2>
        <div class="form-group">
            <label for="position">Позиція:</label>
            <textarea id="position" placeholder="Вкажить повну назву позиції" style="width: 100%;" ></textarea>
        </div>
        <div class="form-group">
            <label for="position-short">Позиція (коротко):</label>
            <textarea id="position-short" placeholder="Вкажить коротку назву позиції" style="width: 100%;"  rows="1"></textarea>
        </div>

        <div class="form-group">
            <label for="active-select">Інша активність:</label>
            <select id="active-select">
                <!-- <option value="" selected>-- Звіт по цілі (не інша активність) --</option> -->
            </select>
        </div>

        <!-- </div> -->
        <!-- Блок компаса и фиксации направлений -->
        <div id="compass-block">
            <!-- Компас вмикається автоматично при першому натисканні кнопки заміру азимуту (на iOS запитає дозвіл) -->
            <div class="compass-val" id="azimut-view" style="margin-bottom: 15px;display:none">
                Поточний азимут: <span id="azimuth-display">0°</span>
            </div>

            <!-- Фиксация Азимута 1 (Виявлення) -->
            <div class="form-group" style="margin-bottom: 15px;">
                <label for="azimuth-detect">Азимут виявлення (звідки):</label>
                <div class="azimuth-row">
                    <input type="number" id="azimuth-detect" placeholder="0" min="0" max="360">
                    <button id="btn-fix-detect" type="button" style="background-color: #16a085;">
                        🧭 Заміряти азимут виявлення
                    </button>
                </div>
            </div>

            <!-- Фиксация Азимута 2 (Курс руху) -->
            <div class="form-group" style="margin-bottom: 5px;">
                <label for="azimuth-course">Курс руху (куди летить):</label>
                <div class="azimuth-row">
                    <input type="number" id="azimuth-course" placeholder="0" min="0" max="360">
                    <button id="btn-fix-course" type="button" style="background-color: #2980b9;">
                        🧭 Заміряти азимут курсу
                    </button>
                </div>
            </div>
               <div class="form-group">
                    <label for="target-height">Висота(м):</label>
                    <input type="number" min="0" id="target-height">
                </div>

                <div class="form-group">
                    <label for="target-distance">Дальність(км):</label>
                    <input type="number" min="0" id="target-distance">
                </div>

        </div>

        <div id="report-place">
            <div class="form-group"
                style="background: #fcfcfc; padding: 15px; border: 1px solid #e0e0e0; border-radius: 6px;">

                <div class="form-group">
                    <label for="detection-select">Вияв:</label>
                    <select id="detection-select">
                        <option value="" disabled selected>Оберіть спосіб виявлення...</option>
                        <option value="Ціль виявлено візуально">Візуально</option>
                        <option value="Ціль виявлено акустично">Акустично</option>
                        <option value="Ціль виявлено акустично та візуально">Акустично та візуально</option>
                        <option value="Ціль акустично та візуально не виявленно">Не виявленно акустично та візуально
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="target-number">Номер цілі:</label>
                    <input type="number" min="0" id="target-number">
                </div>

                <div class="form-group">
                    <label for="target-count">Кількість:</label>
                    <input type="number" min="1" id="target-count">
                </div>

                <div class="form-group" style="position: relative;">
                    <label for="target-search">Ціль (швидкий пошук):</label>

                    <!-- Поле ввода для поиска -->
                    <div style="position: relative; display: flex; align-items: center;">
                        <input type="text" id="target-search" placeholder="Почніть вводити назву цілі..."
                            autocomplete="off" style="width: 100%; padding-right: 30px;">
                        <!-- Кнопка очистки поля (крестик) -->
                        <span id="clear-target-search"
                            style="position: absolute; right: 10px; cursor: pointer; color: #999; display: none; font-weight: bold;">&times;</span>
                    </div>

                    <!-- Скрытый input для хранения финального выбранного значения формы -->
                    <input type="hidden" id="target-select" name="target">

                    <!-- Выпадающий блок с результатами поиска -->
                    <div id="target-dropdown-results"
                        style="display: none; position: absolute; left: 0; right: 0; background: #fff; border: 1px solid #ccc; border-radius: 4px; max-height: 250px; overflow-y: auto; z-index: 1000; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2px;">
                        <div id="targets-list-container"></div>

                        <!-- Динамическая кнопка добавления, если ничего не найдено -->
                        <div id="add-new-suggest-box"
                            style="display: none; padding: 10px; border-top: 1px solid #eee; background: #f9f9f9; text-align: center;">
                            <button id="btn-quick-add" type="button"
                                style="width: 100%; background: #27ae60; color: white; padding: 8px; font-size: 14px; border: none; border-radius: 4px; cursor: pointer;">
                                + Створити ціль "<span id="new-target-name-span"></span>"
                            </button>
                        </div>
                    </div>
                </div>


                <!-- Поля времени и даты (сначала время!) -->
                <div class="form-group">
                    <label for="report-time">Час виявлення цілі:</label>
                    <input type="time" id="report-time">
                </div>

                <div class="form-group">
                    <label for="report-date">Дата:</label>
                    <input type="date" id="report-date">
                </div>
                <div id="active-target">
                    <div class="form-group">
                        <label for="is-destroyed">Відпрацювання по цілі:</label>
                        <select id="is-destroyed">
                            <option value="" disabled selected>Оберіть результат відпрацювання...</option>
                            <option value="Ціль обстріляно не знищено">Обстріляно не знищено</option>
                            <option value="Ціль обстріляно і ЗНИЩЕНО">Обстріляно і знищено</option>
                            <option value="Вогонь не відкривали далека відстань.">Вогонь не відкривали далека відстань.</option>
                            <option value="Відсутність візуального контакту">Відсутність візуального контакту.</option>
                        </select>
                    </div>
                <!-- <div id="active-item">
                    <div class="form-group">
                        <label for="is-destroyed-cause">По цілі не працювали:</label>
                        <select id="is-destroyed-cause">
                            <option value="" disabled selected>Оберіть причину не відпрацювання...</option>
                            <option value="Велика відстань">Велика відстань.</option>
                            
                            <option value="Вогонь не відкривали далека відстань.">Вогонь не відкривали далека відстань.
                            </option>
                           
                        </select>
                    </div>
                </div>       -->
            <div class="form-group" style="margin-bottom: 15px;" id="coordinate-place" >
                <label for="coordinates">Координати:</label>
                <div class="azimuth-row">

                    <input id="coordinates">
                    <button id="btn-get-location" type="button" style="background-color: #2980b9; margin-top: 8px; ">
                        📍 Визначити
                    </button>
                </div>
                <div id="position-accuracy-warning"
                    style="display: none; color: #e67e22; font-size: 13px; margin-top: 6px; font-weight: bold;">
                </div>

            </div>
                    <!-- Вибір Зброї -->
            <div id="weapon-place">
                    <div class="form-group">
                        <label for="weapon-select">Використана зброя:</label>
                        <select id="weapon-select" name="weapon"
                            style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc;">
                            <option value="">-- Оберіть зброю --</option>
                        </select>
                    </div>

                    <!-- Вибір Боєприпасу (залежний) -->
                    <div class="form-group">
                        <label for="ammo-select">Боєприпас:</label>
                        <select id="ammo-select" name="ammo"
                            style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc;" disabled>
                            <option value="">-- Спочатку оберіть зброю --</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>
                            Кількість боєприпасів: <input type="number" id="count-ammo" min="1" style="width: auto;">
                        </label>
                    </div>

                    <button id="btn-add-weapon-entry" type="button"
                        style="background-color: #16a085; margin-bottom: 10px;">
                        ➕ Додати зброю до звіту
                    </button>

                    <div class="form-group">
                        <label>Застосоване озброєння в цьому звіті:</label>
                        <div id="weapons-used-list"></div>
                        <button id="btn-clear-weapons-list" type="button"
                            style="background-color: #7f8c8d; margin-top: 8px; font-size: 13px; min-height: 36px;">
                            🗑 Очистити список зброї
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <button id="generate-btn">Сформувати звіт</button>

        <div class="form-group" style="margin-top: 20px;">
            <label for="report-output">Готовий звіт:</label>
            <textarea id="report-output" rows="5" style="width: 100%; font-family: monospace;"></textarea>
            <div class="report-actions">
                <button id="btn-copy-report" type="button">📋 Копіювати</button>
                <button id="btn-share-report" type="button">📤 Поділитись</button>
            </div>
        </div>
        <!-- </div> -->

        <hr style="margin: 30px 0; border: 1px solid #ddd;">

        <!-- Секція Управління Справочниками -->
        <div class="directory-editor-section"
            style="background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0;">
            <button id="toggle-directory-panel" type="button" class="directory-toggle-btn" aria-expanded="false"
                aria-controls="directory-panel-body">
                <span>⚙️ Керування довідниками</span>
                <span id="directory-toggle-icon" class="directory-toggle-icon">▸</span>
            </button>

            <div id="directory-panel-body" style="display: none; margin-top: 15px;">
                <p style="font-size: 13px; color: #666; margin-bottom: 15px;">Тут ви можете редагувати або видаляти
                    типи цілей, зброю, боєприпаси та активності.</p>

                <!-- Вкладки вибору довідника -->
                <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                    <button id="tab-edit-targets"
                        style="flex: 1; padding: 8px; cursor: pointer; border: none; background: #3498db; color: white; border-radius: 4px;">🎯
                        Цілі</button>
                    <button id="tab-edit-weapons"
                        style="flex: 1; padding: 8px; cursor: pointer; border: none; background: #bdc3c7; color: #333; border-radius: 4px;">⚔️
                        Зброя та БК</button>
                    <button id="tab-edit-active"
                        style="flex: 1; padding: 8px; cursor: pointer; border: none; background: #bdc3c7; color: #333; border-radius: 4px;">
                        Активність</button>
                </div>

                <!-- Панель редагування цілей -->
                <div id="panel-targets" style="display: block;">
                    <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                        <input type="text" id="new-target-db-input" placeholder="Додати нову ціль в базу..."
                            style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                        <button id="btn-add-target-db"
                            style="width:50px;padding: 8px 15px; background: #2ecc71; color: white; border: none; border-radius: 4px; cursor: pointer;">+</button>
                    </div>
                    <div id="db-targets-list"
                        style="max-height: 200px; overflow-y: auto; border: 1px solid #ddd; background: white; border-radius: 4px;">
                        <!-- Список цілей буде генеритися тут -->
                    </div>
                </div>

                <!-- Панель редагування зброї -->
                <div id="panel-weapons" style="display: none;">
                    <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                        <input type="text" id="new-weapon-db-input" placeholder="Додати нову зброю..."
                            style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                        <button id="btn-add-weapon-db"
                            style="width:50px; padding: 8px 15px; background: #2ecc71; color: white; border: none; border-radius: 4px; cursor: pointer;">+</button>
                    </div>
                    <div id="db-weapons-list"
                        style="max-height: 200px; overflow-y: auto; border: 1px solid #ddd; background: white; border-radius: 4px; margin-bottom: 10px;">
                        <!-- Список зброї буде тут -->
                    </div>
                </div>
                <!-- Панель редагування активності -->
                <div id="panel-active" style="display: none;">
                    <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                        <input type="text" id="new-active-db-input" placeholder="Введіть назву активності">

                        <button id="btn-add-active" type="button">Додати активність</button>

                    </div>
                    <div id="db-active-list"></div>


                    <!-- <label for="new-active-db-input">Нова активність:</label> -->

                    <!-- <button id="btn-edit-active" type="button">Редагувати активність</button>
                    <button id="btn-delete-active" type="button">Видалити активність</button> -->

                </div>
            </div>
        </div>
        <!-- </div> -->
        </div>`}
