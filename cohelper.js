const outputCodeEl=document.getElementById("outputCode"),iconPickerModal=document.getElementById("iconPickerModal"),iconsWrapperEl=document.getElementById("icons_wrapper"),ICONS_JSON_SOURCE="https://blogger-templates.github.io/Plus-UI-V3.2.0/docs/svg-icons.json";let iconsData=[],currentIconTargetInput=null,currentIconTargetPreview=null,dropdownCounter=Array.from(document.querySelectorAll('[id^="nav-drop-"]')).map(e=>parseInt(e.id.split("-").pop(),10)).filter(e=>!isNaN(e)).reduce((e,t)=>Math.max(e,t),2),subItemCounters={drop1:0,drop2:0,drop3:0};async function fetchIcons(){if(!(iconsData.length>0)){iconsWrapperEl.innerHTML="<div class='alert info'><b>Loading icons</b>Icons are being fetched, please wait...</div>";try{let e=await fetch("https://blogger-templates.github.io/Plus-UI-V3.2.0/docs/svg-icons.json");if(!e.ok)throw Error(`HTTP error! status: ${e.status}`);iconsData=await e.json(),initializeIconPicker()}catch(t){console.error("Error fetching icons:",t),iconsWrapperEl.innerHTML=`<div class='alert error'><b>Failed to load icons:</b> ${t.message}. Please try reloading.</div>`}}}function initializeIconPicker(){addClass(iconsWrapperEl,"icon-picker"),iconsWrapperEl.innerHTML=`<input type='text' id='iconSearchInput' placeholder='Search among ${iconsData.length} icons...'/><div class='icons-container'></div>`;let e=iconsWrapperEl.querySelector(".icons-container"),t=iconsWrapperEl.querySelector("#iconSearchInput"),n=(t="")=>{let n=t.trim().toLowerCase(),l=n?iconsData.filter(e=>e.code.toLowerCase().includes(n)):iconsData;0===l.length?(removeClass(iconsWrapperEl,"has-icons"),addClass(iconsWrapperEl,"no-icons"),e.innerHTML="<div class='alert'>No matching icons found.</div>"):(removeClass(iconsWrapperEl,"no-icons"),addClass(iconsWrapperEl,"has-icons"),e.innerHTML="",l.forEach(t=>{let n=createElement("button",{type:"button",innerHTML:t.svg,attributes:{title:`Click to select ${t.code}`,"data-code":t.code,"data-svg":t.svg}});addEventListener(n,"click",()=>{let e=n.getAttribute("data-svg"),t=n.querySelector("svg").outerHTML;selectIcon(e,t)}),e.appendChild(n)}))},l=debounce(n,200),o="",i=()=>{let e=t.value;o!==e&&(l(e),o=e)};addEventListener(t,"input",i),addEventListener(t,"keyup",i),n()}function openIconPicker(e,t){if(currentIconTargetInput=document.getElementById(e),currentIconTargetPreview=document.getElementById(t),!currentIconTargetInput){console.error("Target input not found for icon picker:",e);return}if(0===iconsData.length)fetchIcons();else{let n=iconsWrapperEl.querySelector("#iconSearchInput");n&&(n.value="",initializeIconPicker())}iconPickerModal.style.display="block"}function closeIconPicker(){iconPickerModal.style.display="none",currentIconTargetInput=null,currentIconTargetPreview=null}function selectIcon(e,t){let n=e.split("\n").map(e=>"          "+e.trim()).join("\n").trim();currentIconTargetInput&&(currentIconTargetInput.value=n),currentIconTargetPreview&&(currentIconTargetPreview.innerHTML=t),closeIconPicker()}function addDropdownSubItem(e,t=!1){let n=`${e}-sub-items`,l=document.getElementById(n);subItemCounters[e]++;let o=`${e}-sub${subItemCounters[e]}`,i=createElement("div",{class:"sub-item-section"});i.id=`sub-item-wrapper-${o}`;let r="";t&&(r=`
                     <div class="field-group"> <label style="display:block; margin-bottom: 5px;">Sub-Item Icon (Required):</label>
                         <button type="button" class="choose-icon-btn" onclick="openIconPicker('${o}-icon-input', '${o}-icon-preview')">
                             Choose Icon <span class="icon-btn-preview" id="${o}-icon-preview"></span>
                         </button>
                         <textarea id="${o}-icon-input" class="sub-icon-input icon-svg-input" style="display:none;"></textarea>
                     </div>
                 `),i.innerHTML=`
                 <h4>Sub-Item ${subItemCounters[e]}</h4>
                 <div class="field-group inF">
                     <input type="text" id="${o}-title" class="sub-title" placeholder="">
                     <label for="${o}-title">Title:</label>
                 </div>
                 <div class="field-group inF">
                     <input type="url" id="${o}-url" class="sub-url" placeholder="">
                     <label for="${o}-url">URL:</label>
                 </div>
                 ${r}
                 <button type="button" class="button btn-red" onclick="removeDropdownSubItem('${o}')" style="font-size: 14px; padding: 4px 8px;">Remove this Sub-Item</button>
             `,l.appendChild(i)}function removeDropdownSubItem(e){let t=`sub-item-wrapper-${e}`,n=document.getElementById(t);n&&n.remove()}function getIconSvgCode(e){return e?`
          
          ${e}`:""}function addStandardLink(){let e=document.getElementById("std-title").value.trim(),t=document.getElementById("std-url").value.trim(),n=document.getElementById("std-icon-input").value,l=document.getElementById("std-li-class").value.trim();if(!e||!t){alert("Standard Link: Please enter Title and URL.");return}let o=l?` class='${l}'`:"",i=getIconSvgCode(n),r=`
      <li${o}>
        <a aria-label='${e}' href='${t}' itemprop='url'>${i}
          <span itemprop='name'>${e}</span>
        </a>
      </li>`;outputCodeEl.value+=r,document.getElementById("std-title").value="",document.getElementById("std-url").value="",document.getElementById("std-icon-input").value="",document.getElementById("std-icon-preview").innerHTML="",document.getElementById("std-li-class").value=""}function addBadgeLink(){let e=document.getElementById("badge-title").value.trim(),t=document.getElementById("badge-url").value.trim(),n=document.getElementById("badge-icon-input").value,l=document.getElementById("badge-span-class").value,o=document.getElementById("badge-li-class").value.trim();if(!e||!t){alert("Badge Link: Please enter Title and URL.");return}let i=o?` class='${o}'`:"",r=getIconSvgCode(n),a=`
      <li${i}>
        <a aria-label='${e}' href='${t}' itemprop='url'>${r}
          <span class='${l}' itemprop='name'>${e}</span>
        </a>
      </li>`;outputCodeEl.value+=a,document.getElementById("badge-title").value="",document.getElementById("badge-url").value="",document.getElementById("badge-icon-input").value="",document.getElementById("badge-icon-preview").innerHTML="",document.getElementById("badge-span-class").value="new",document.getElementById("badge-li-class").value=""}function addDropdown(e,t){let n=document.getElementById(`${e}-title`).value.trim(),l=document.getElementById(`${e}-icon-input`).value,o=document.getElementById(`${e}-li-class`).value.trim(),i=document.getElementById(`${e}-expanded`).checked,r=document.getElementById(`${e}-sub-items`);if(!n||!l){alert("Dropdown: Please enter Dropdown Title and choose an Icon.");return}let a="",s=r.querySelectorAll(".sub-item-section");if(0===s.length){alert("Dropdown: Please add at least one Sub-Item.");return}let c=!0;if(s.forEach((e,n)=>{if(!c)return;let l=e.querySelector(".sub-title").value.trim(),o=e.querySelector(".sub-url").value.trim(),i="",r="";if(t){if(!(i=e.querySelector(".sub-icon-input").value)){alert(`Sub-Item ${n+1} is missing its icon. Style 2 dropdowns require icons for all sub-items.`),c=!1;return}r=getIconSvgCode(i)}if(!l||!o){alert(`Sub-Item ${n+1} is missing Title or URL.`),c=!1;return}a+=`
          <li>
            <a aria-label='${l}' href='${o}' itemprop='url'>${r}
              <span itemprop='name'>${l}</span>
            </a>
          </li>`}),!c)return;dropdownCounter++;let d=`nav-drop-${dropdownCounter}`,u=o;t||o.split(" ").includes("nt")||(u=("nt "+o).trim());let p=u?` class='${u}'`:"",m=getIconSvgCode(l),g=`
      <li${p}>
        <input id='${d}' type='checkbox'${i?" checked='checked'":""}/>
        <label aria-label='${n}' for='${d}' role='button'>${m}
          <span>${n}</span>
        </label>
        <ul>${a}
        </ul>
      </li>`;outputCodeEl.value+=g,document.getElementById(`${e}-title`).value="",document.getElementById(`${e}-icon-input`).value="",document.getElementById(`${e}-icon-preview`).innerHTML="",document.getElementById(`${e}-li-class`).value="",document.getElementById(`${e}-expanded`).checked=!1,r.innerHTML="",addDropdownSubItem(e,t)}function addDropdownStyle3(){let e=document.getElementById("drop3-title").value.trim(),t=document.getElementById("drop3-li-class").value.trim(),n=document.getElementById("drop3-expanded").checked,l=document.getElementById("drop3-sub-items");if(!e){alert("Dropdown Style 3: Please enter a Dropdown Title.");return}let o="",i=l.querySelectorAll(".sub-item-section");if(0===i.length){alert("Dropdown Style 3: Please add at least one Sub-Item.");return}let r=!0;if(i.forEach((e,t)=>{if(!r)return;let n=e.querySelector(".sub-title").value.trim(),l=e.querySelector(".sub-url").value.trim(),i=e.querySelector(".sub-icon-input").value;if(!i){alert(`Sub-Item ${t+1} is missing its icon. Style 3 dropdowns require icons for all sub-items.`),r=!1;return}if(!n||!l){alert(`Sub-Item ${t+1} is missing Title or URL.`),r=!1;return}let a=getIconSvgCode(i);o+=`
          <li>
            <a aria-label='${n}' href='${l}' itemprop='url'>${a}
              <span itemprop='name'>${n}</span>
            </a>
          </li>`}),!r)return;dropdownCounter++;let a=`nav-drop-${dropdownCounter}`,s=t?` class='${t}'`:"",c=`
      <li${s}>
        <input id='${a}' type='checkbox'${n?" checked='checked'":""}/>
        <label aria-label='${e}' for='${a}' role='button'>
          <span>${e}</span>
        </label>
        <ul>${o}
        </ul>
      </li>`;outputCodeEl.value+=c,document.getElementById("drop3-title").value="",document.getElementById("drop3-li-class").value="",document.getElementById("drop3-expanded").checked=!0,l.innerHTML="",addDropdownSubItem("drop3",!0)}function copyToClipboard(){let e=document.getElementById("outputCode"),t=document.getElementById("copyFeedback");if(!e.value){t.textContent="Nothing to copy!",t.style.color="red",t.classList.add("show"),setTimeout(()=>t.classList.remove("show"),2e3);return}e.select(),e.setSelectionRange(0,99999);try{navigator.clipboard.writeText(e.value).then(()=>{t.textContent="Copied!",t.style.color="green",t.classList.add("show")}).catch(e=>{try{document.execCommand("copy"),t.textContent="Copied! (Fallback)",t.style.color="green",t.classList.add("show")}catch(n){t.textContent="Copy failed!",t.style.color="red",t.classList.add("show"),console.error("Copy failed:",n)}})}catch(n){try{document.execCommand("copy"),t.textContent="Copied! (Fallback)",t.style.color="green",t.classList.add("show")}catch(l){t.textContent="Copy failed!",t.style.color="red",t.classList.add("show"),console.error("Copy failed:",l)}}setTimeout(()=>t.classList.remove("show"),2e3),window.getSelection().removeAllRanges()}function clearOutput(){outputCodeEl.value=""}function debounce(e,t){let n;return function l(...o){let i=()=>{clearTimeout(n),e(...o)};clearTimeout(n),n=setTimeout(i,t)}}function createElement(e,t={}){let n=document.createElement(e);if(t.class&&(n.className=t.class),t.id&&(n.id=t.id),t.innerHTML&&(n.innerHTML=t.innerHTML),t.type&&(n.type=t.type),t.attributes)for(let l in t.attributes)n.setAttribute(l,t.attributes[l]);return n}function addClass(e,...t){e&&e.classList.add(...t)}function removeClass(e,...t){e&&e.classList.remove(...t)}function addEventListener(e,t,n,l){e&&e.addEventListener(t,n,l)}addDropdownSubItem("drop1",!1),addDropdownSubItem("drop2",!0),addDropdownSubItem("drop3",!0),window.addEventListener("click",e=>{e.target===iconPickerModal&&closeIconPicker()});
