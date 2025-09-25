// // =============== script.js (Header only) ===============
// (function(){
//   const body = document.body;

//   // Dropdown genel
//   const DROPS = document.querySelectorAll('[data-dropdown]');
//   DROPS.forEach(drop => {
//     const trigger = drop.querySelector('[data-dropdown-trigger]');
//     const panel = drop.querySelector('.dropdown-panel');
//     if(!trigger || !panel) return;

//     function open(){
//       drop.classList.add('is-open');
//       trigger.setAttribute('aria-expanded','true');
//       if(panel && (panel.classList.contains('mega') || panel.classList.contains('two-col') || panel.classList.contains('lang-panel'))){
//         body.classList.add('lock');
//       }
//     }
//     function close(){
//       drop.classList.remove('is-open');
//       trigger.setAttribute('aria-expanded','false');
//       body.classList.remove('lock');
//     }
//     trigger.addEventListener('click', (e)=>{
//       e.stopPropagation();
//       if(drop.classList.contains('is-open')) close(); else {
//         DROPS.forEach(d=>{ if(d!==drop) d.classList.remove('is-open') });
//         open();
//       }
//     });
//     trigger.addEventListener('mouseenter', ()=>{ if(window.matchMedia('(hover:hover)').matches){ open(); } });
//     drop.addEventListener('mouseleave', ()=>{ if(window.matchMedia('(hover:hover)').matches){ close(); } });

//     drop.addEventListener('keydown', (e)=>{ if(e.key==='Escape'){ close(); trigger.focus(); }});
//     document.addEventListener('click', (e)=>{ if(!drop.contains(e.target)) close(); });
//   });

//   // Sticky davranış
//   const header = document.querySelector('.site-header[data-sticky]');
//   window.addEventListener('scroll', ()=>{
//     const y = window.scrollY || 0;
//     header.classList.toggle('is-condensed', y>24);
//   }, {passive:true});

//   // Mega menü: sol kategori tıklayınca sağ panel değişsin
//   const catBtns = document.querySelectorAll('.mega-cat');
//   function activateCat(key){
//     document.querySelectorAll('.mega-cat').forEach(b=>b.classList.toggle('is-active', b.dataset.cat===key));
//     document.querySelectorAll('[data-cat-panel]').forEach(panel=>{
//       panel.classList.toggle('is-hidden', panel.dataset.catPanel!==key);
//     });
//   }
//   catBtns.forEach(btn=>{
//     btn.addEventListener('mouseenter', ()=> activateCat(btn.dataset.cat));
//     btn.addEventListener('click', ()=> activateCat(btn.dataset.cat));
//   });

//   // // Dil filtresi
//   // const langFilter = document.querySelector('[data-lang-filter]');
//   // if(langFilter){
//   //   langFilter.addEventListener('input', (e)=>{
//   //     const q = e.target.value.toLowerCase();
//   //     document.querySelectorAll('.lang-list li').forEach(li=>{
//   //       const t = li.textContent.toLowerCase();
//   //       li.style.display = t.includes(q) ? '' : 'none';
//   //     });
//   //   });
//   // }

//   // // Dil seçimi (RTL/LTR ayarı)
//   // document.querySelectorAll('.lang-list [role="menuitem"]').forEach(btn=>{
//   //   btn.addEventListener('click', ()=>{
//   //     const code = btn.dataset.lang;
//   //     const rtl = btn.dataset.rtl === 'true';
//   //     document.documentElement.setAttribute('lang', code);
//   //     document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
//   //     btn.closest('[data-dropdown]')?.classList.remove('is-open');
//   //     body.classList.remove('lock');
//   //   });
//   // });

//   // // Para birimi seçim örneği
//   // document.querySelectorAll('[data-currency]').forEach(el=>{
//   //   el.addEventListener('click', ()=>{
//   //     const c = el.dataset.currency;
//   //     // Burada fiyat rozetlerini güncelleyecek hook çağrılabilir
//   //     el.closest('[data-dropdown]')?.classList.remove('is-open');
//   //     body.classList.remove('lock');
//   //     console.log('Currency set to', c);
//   //   });
//   // });

//   // Tema toggle
//   const themeBtn = document.getElementById('themeToggle');
//   if(themeBtn){
//     themeBtn.addEventListener('click', ()=>{
//       const dark = document.documentElement.classList.toggle('dark');
//       themeBtn.textContent = dark ? '☀️' : '🌙';
//     });
//   }
// })();
// // === [ADD] Slider autoplay + dots + arrows (non-destructive) ===
// (function(){
//   const slider = document.querySelector('[data-slider]');
//   if(!slider) return;
//   const track = slider.querySelector('[data-track]');
//   const prev = slider.querySelector('[data-prev]');
//   const next = slider.querySelector('[data-next]');
//   const dots = slider.querySelector('.slider-dots');
//   const slides = Array.from(track.children);
//   let index = 0, timer = null;

//   function update(){
//     const offset = index * (track.clientWidth + 16);
//     track.scrollTo({ left: offset, behavior: 'smooth' });
//     Array.from(dots.children).forEach((b,i)=> b.setAttribute('aria-selected', i===index));
//   }
//   slides.forEach((_,i)=>{
//     const b = document.createElement('button');
//     b.setAttribute('aria-label', `Slide ${i+1}`);
//     b.setAttribute('role', 'tab');
//     b.addEventListener('click', ()=>{ index=i; update(); restart(); });
//     dots.appendChild(b);
//   });
//   dots.children[0]?.setAttribute('aria-selected', 'true');
//   prev?.addEventListener('click', ()=>{ index = (index-1+slides.length)%slides.length; update(); restart(); });
//   next?.addEventListener('click', ()=>{ index = (index+1)%slides.length; update(); restart(); });
//   function start(){
//     stop();
//     timer = setInterval(()=>{ index = (index+1)%slides.length; update(); }, 3500);
//   }
//   function stop(){ if(timer) clearInterval(timer); }
//   function restart(){ start(); }
//   slider.addEventListener('mouseenter', stop);
//   slider.addEventListener('mouseleave', start);
//   window.addEventListener('resize', update, {passive:true});
//   start();
// })();

// // === [ADD] Currency sync for price badges + Hero parallax ===
// (function(){
//   // Currency
//   const CURRENCY_RATES = { TRY: 1, USD: 34, EUR: 37 }; // placeholder rates (TRY base)
//   const SYMBOL = { TRY: "₺", USD: "$", EUR: "€" };

//   function fmt(n, code){
//     try{ return new Intl.NumberFormat('tr-TR').format(Math.round(n)); }
//     catch(e){ return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.'); }
//   }

//   function updatePriceBadges(code){
//     document.documentElement.dataset.currency = code;
//     const els = document.querySelectorAll('.badge-price[data-price-try]');
//     els.forEach(el=>{
//       const base = parseFloat(el.getAttribute('data-price-try')) || 0;
//       const rate = CURRENCY_RATES[code] || 1;
//       const amount = code === 'TRY' ? base : (base / rate);
//       el.textContent = SYMBOL[code] + ' ' + fmt(amount, code);
//     });
//     try{ localStorage.setItem('currency', code); }catch(e){}
//   }

//   // Attach to existing currency menu
//   document.querySelectorAll('[data-currency]').forEach(btn=>{
//     btn.addEventListener('click', ()=>{
//       const code = btn.dataset.currency;
//       updatePriceBadges(code);
//     });
//   });

//   // Init
//   let initCode = 'TRY';
//   try{ initCode = localStorage.getItem('currency') || initCode; }catch(e){}
//   updatePriceBadges(initCode);

//   // Hero parallax
//   const heroBg = document.querySelector('.hero .hero-bg');
//   if(heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
//     const onScroll = ()=>{
//       const y = (window.scrollY || 0) * 0.2;
//       heroBg.style.setProperty('--parallax', y + 'px');
//     };
//     window.addEventListener('scroll', onScroll, {passive:true});
//     onScroll();
//   }
// })();
// // === [ADD] Settings-driven currency rates ===
// (function(){
//   const SYMBOL = { TRY: "₺", USD: "$", EUR: "€" };

//   function loadRates(){
//     let rates = { TRY:1, USD:34, EUR:37 };
//     try{
//       const s = localStorage.getItem('currency_rates');
//       if(s){ const parsed = JSON.parse(s); rates = { TRY:1, USD: Number(parsed.USD)||34, EUR: Number(parsed.EUR)||37 }; }
//     }catch(e){}
//     return rates;
//   }
//   function saveRates(usd, eur){
//     try{ localStorage.setItem('currency_rates', JSON.stringify({ USD: usd, EUR: eur })); }catch(e){}
//   }
//   function getCurrency(){
//     try{ return localStorage.getItem('currency') || 'TRY'; }catch(e){ return 'TRY'; }
//   }
//   function setCurrency(code){
//     try{ localStorage.setItem('currency', code); }catch(e){}
//   }
//   function fmt(n){ try{ return new Intl.NumberFormat('tr-TR').format(Math.round(n)); } catch(e){ return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.'); } }

//   function updatePriceBadges(){
//     const code = getCurrency();
//     const R = loadRates();
//     document.documentElement.dataset.currency = code;
//     document.querySelectorAll('.badge-price[data-price-try]').forEach(el=>{
//       const baseTRY = parseFloat(el.getAttribute('data-price-try')) || 0;
//       let amount = baseTRY;
//       if(code === 'USD') amount = baseTRY / R.USD;
//       if(code === 'EUR') amount = baseTRY / R.EUR;
//       el.textContent = SYMBOL[code] + ' ' + fmt(amount);
//     });
//   }

//   // Bind header currency menu
//   document.querySelectorAll('[data-currency]').forEach(btn=>{
//     btn.addEventListener('click', ()=>{
//       setCurrency(btn.dataset.currency);
//       updatePriceBadges();
//     });
//   });

//   // Settings panel form
//   const form = document.getElementById('settingsForm');
//   if(form){
//     // init fill
//     const R = loadRates();
//     form.rateUSD.value = R.USD;
//     form.rateEUR.value = R.EUR;
//     form.defaultCurrency.value = getCurrency();

//     form.addEventListener('submit', (e)=>{
//       e.preventDefault();
//       const usd = Number(form.rateUSD.value) || 34;
//       const eur = Number(form.rateEUR.value) || 37;
//       const cur = form.defaultCurrency.value || 'TRY';
//       saveRates(usd, eur);
//       setCurrency(cur);
//       updatePriceBadges();
//       form.closest('[data-dropdown]')?.classList.remove('is-open');
//     });

//     const resetBtn = document.getElementById('settingsReset');
//     resetBtn?.addEventListener('click', ()=>{
//       saveRates(34,37);
//       setCurrency('TRY');
//       form.rateUSD.value = 34;
//       form.rateEUR.value = 37;
//       form.defaultCurrency.value = 'TRY';
//       updatePriceBadges();
//     });
//   }

//   // init once
//   updatePriceBadges();
// })();
// // === [ADD] UI preferences: language, theme, brand color, icon size/stroke ===
// (function(){
//   function loadUIPrefs(){
//     try{
//       return JSON.parse(localStorage.getItem('ui_prefs')||'{}');
//     }catch(e){ return {}; }
//   }
//   function saveUIPrefs(p){ try{ localStorage.setItem('ui_prefs', JSON.stringify(p)); }catch(e){} }
//   function applyUIPrefs(){
//     const p = loadUIPrefs();
//     // theme
//     const mode = p.themeMode || 'auto';
//     document.documentElement.classList.toggle('dark', mode==='dark' || (mode==='auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches));
//     // brand color
//     if(p.brandColor){ document.documentElement.style.setProperty('--primary', p.brandColor); document.documentElement.style.setProperty('--icon-color', p.brandColor); }
//     if(p.iconSize){ document.documentElement.style.setProperty('--icon-size', p.iconSize + 'px'); }
//     if(p.iconStroke!=null){ document.documentElement.style.setProperty('--icon-stroke', String(p.iconStroke)); }
//     // language
//     if(p.defaultLanguage){
//       const rtlLangs = ['ar','fa','he','ur','ps'];
//       document.documentElement.setAttribute('lang', p.defaultLanguage);
//       document.documentElement.setAttribute('dir', rtlLangs.includes(p.defaultLanguage) ? 'rtl' : 'ltr');
//     }
//   }

//   const form = document.getElementById('settingsForm');
//   if(form){
//     // init with stored
//     const p = loadUIPrefs();
//     if(form.defaultLanguage) form.defaultLanguage.value = p.defaultLanguage || 'tr';
//     if(form.themeMode) form.themeMode.value = p.themeMode || 'auto';
//     if(form.brandColor && p.brandColor) form.brandColor.value = p.brandColor;
//     if(form.iconSize && p.iconSize) form.iconSize.value = p.iconSize;
//     if(form.iconStroke!=null && p.iconStroke!=null) form.iconStroke.value = p.iconStroke;

//     form.addEventListener('submit', (e)=>{
//       e.preventDefault();
//       const np = loadUIPrefs();
//       np.defaultLanguage = form.defaultLanguage?.value || 'tr';
//       np.themeMode = form.themeMode?.value || 'auto';
//       np.brandColor = form.brandColor?.value || '#2563eb';
//       np.iconSize = Number(form.iconSize?.value) || 18;
//       np.iconStroke = Number(form.iconStroke?.value) || 1.5;
//       saveUIPrefs(np);
//       applyUIPrefs();
//       form.closest('[data-dropdown]')?.classList.remove('is-open');
//     });
//   }

//   // Apply on load
//   applyUIPrefs();
// })();
// // === [ADD] Search suggestions (dummy dataset) ===
// (function(){
//   const input = document.querySelector('input[type="search"]') || document.querySelector('.search input');
//   const panel = document.querySelector('[data-suggest]');
//   if(!input || !panel) return;

//   // Dummy dataset (categories + popular)
//   const DATA = [
//     {t:"CNC Freze", b:"#CNC"}, {t:"CNC Torna", b:"#CNC"},
//     {t:"Lazer Kesim", b:"#Lazer"}, {t:"Plazma Kesim", b:"#Kesim"},
//     {t:"Forklift 2.5 Ton", b:"#Forklift"}, {t:"Reach Truck", b:"#Forklift"},
//     {t:"Hidrolik Pres 160 Ton", b:"#Pres"}, {t:"Eksantrik Pres", b:"#Pres"},
//     {t:"Kompresör Vidalı 7.5kW", b:"#Kompresör"}, {t:"Kurutucu", b:"#Hava"},
//     {t:"3D Yazıcı FDM", b:"#3D"}, {t:"3D Tarayıcı", b:"#3D"},
//     {t:"Kaynak Makinesi MIG/MAG", b:"#Kaynak"}, {t:"TIG Kaynak", b:"#Kaynak"},
//     {t:"Konveyör Bantlı", b:"#Konveyör"}, {t:"AS/RS Depolama", b:"#Depo"},
//   ];

//   let activeIndex = -1;
//   let items = [];

//   function normalize(s){ return (s||"").toString().toLowerCase().trim(); }

//   function highlight(text, q){
//     const i = normalize(text).indexOf(normalize(q));
//     if(i===-1 || !q) return text;
//     const start = text.slice(0,i);
//     const mid = text.slice(i, i+q.length);
//     const end = text.slice(i+q.length);
//     return `${start}<mark>${mid}</mark>${end}`;
//   }

//   function render(list, q){
//     panel.innerHTML = "";
//     if(!list.length){
//       panel.innerHTML = `<div class="suggest-empty">Öneri bulunamadı</div>`;
//       return;
//     }
//     list.forEach((row, idx)=>{
//       const div = document.createElement('div');
//       div.className = 'suggest-item';
//       div.setAttribute('role','option');
//       div.setAttribute('data-index', String(idx));
//       div.innerHTML = `<span class="badge">${row.b||'#'}</span><span class="text">${highlight(row.t, q)}</span>`;
//       div.addEventListener('mousedown', (e)=>{ // mousedown: blur'dan önce yakala
//         e.preventDefault();
//         apply(idx);
//       });
//       panel.appendChild(div);
//     });
//     items = Array.from(panel.querySelectorAll('.suggest-item'));
//   }

//   function open(){ panel.classList.add('is-open'); }
//   function close(){ panel.classList.remove('is-open'); activeIndex=-1; updateActive(); }
//   function updateActive(){
//     items.forEach((el,i)=> el.setAttribute('aria-selected', String(i===activeIndex)));
//   }
//   function move(delta){
//     if(!items.length) return;
//     activeIndex = (activeIndex + delta + items.length) % items.length;
//     updateActive();
//     items[activeIndex].scrollIntoView({block:'nearest'});
//   }
//   function apply(i){
//     if(!items[i]) return;
//     const label = items[i].querySelector('.text')?.textContent || "";
//     input.value = label;
//     close();
//     // Here you can navigate to a results page:
//     // window.location.href = '/search?q=' + encodeURIComponent(label);
//   }

//   let timer = null;
//   function onInput(){
//     const q = input.value;
//     if(timer) cancelAnimationFrame(timer);
//     timer = requestAnimationFrame(()=>{
//       if(!q){ close(); panel.innerHTML=''; return; }
//       const res = DATA.filter(x=> normalize(x.t).includes(normalize(q))).slice(0,8);
//       render(res, q);
//       if(res.length) open(); else close();
//     });
//   }

//   input.addEventListener('input', onInput);
//   input.addEventListener('focus', ()=>{ if(panel.innerHTML.trim()) open(); });
//   input.addEventListener('blur', ()=> { setTimeout(close, 100); });

//   input.addEventListener('keydown', (e)=>{
//     if(!panel.classList.contains('is-open')) return;
//     if(e.key === 'ArrowDown'){ e.preventDefault(); move(1); }
//     else if(e.key === 'ArrowUp'){ e.preventDefault(); move(-1); }
//     else if(e.key === 'Enter'){ e.preventDefault(); if(activeIndex>=0) apply(activeIndex); }
//     else if(e.key === 'Escape'){ e.preventDefault(); close(); }
//   });

//   document.addEventListener('click', (e)=>{
//     if(!panel.contains(e.target) && e.target!==input) close();
//   });
// })();

// // === [ADD] Theme toggle (dark/light) ===
// (function(){
//   const root = document.documentElement;
//   function systemPrefersDark(){
//     try { return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; }
//     catch(e){ return false; }
//   }
//   function getSavedTheme(){
//     try{ return localStorage.getItem('theme') }catch(e){ return null; }
//   }
//   function saveTheme(v){
//     try{ localStorage.setItem('theme', v); }catch(e){}
//   }
//   function applyTheme(mode){ // 'dark' | 'light' | 'auto'
//     const isDark = mode === 'dark' || (mode === 'auto' && systemPrefersDark());
//     root.classList.toggle('dark', isDark);
//     const btn = document.querySelector('[data-theme-toggle]');
//     if(btn){
//       btn.setAttribute('aria-pressed', String(isDark));
//       btn.textContent = isDark ? '☀️' : '🌙';
//       btn.title = isDark ? 'Tema: Açık (tıkla)' : 'Tema: Koyu (tıkla)';
//     }
//   }
//   const saved = getSavedTheme(); // 'dark' | 'light' | 'auto'
//   applyTheme(saved || 'auto');
//   const btn = document.querySelector('[data-theme-toggle]');
//   if(btn){
//     btn.addEventListener('click', ()=>{
//       const isDark = root.classList.contains('dark');
//       const next = isDark ? 'light' : 'dark';
//       saveTheme(next);
//       applyTheme(next);
//     });
//   }
//   // React to system change when in auto
//   try{
//     const mql = window.matchMedia('(prefers-color-scheme: dark)');
//     mql.addEventListener('change', ()=>{
//       const saved = getSavedTheme();
//       if(!saved || saved === 'auto') applyTheme('auto');
//     });
//   }catch(e){}
// })();

// // === [ADD] Products interactions ===
// (function(){
//   const grid = document.querySelector('[data-products]');
//   if(!grid) return;

//   // View toggle
//   const toggles = document.querySelectorAll('[data-view-toggle] .ghost-btn');
//   toggles.forEach(btn=>{
//     btn.addEventListener('click', ()=>{
//       toggles.forEach(b=>b.classList.remove('is-active'));
//       btn.classList.add('is-active');
//       grid.classList.toggle('is-list', btn.dataset.view==='list');
//     });
//   });

//   // Filter chips
//   const chips = document.querySelector('[data-filter-chips]');
//   const selBox = document.querySelector('[data-selected-filters]');
//   let activeTags = new Set();
//   function renderSelected(){
//     selBox.innerHTML = '';
//     if(activeTags.size===0) return;
//     activeTags.forEach(tag=>{
//       const el = document.createElement('span');
//       el.className = 'sel-chip';
//       el.innerHTML = `${tag} <button type="button" aria-label="${tag} filtresini kaldır" data-remove="${tag}">×</button>`;
//       selBox.appendChild(el);
//     });
//   }
//   function applyFilter(){
//     const cards = grid.querySelectorAll('.product-card');
//     if(activeTags.size===0){ cards.forEach(c=> c.style.display=''); return; }
//     cards.forEach(c=>{
//       const tags = (c.dataset.tags || '').split(',');
//       const show = Array.from(activeTags).every(t=> tags.includes(t));
//       c.style.display = show ? '' : 'none';
//     });
//   }
//   chips?.addEventListener('click', (e)=>{
//     const btn = e.target.closest('.chip'); if(!btn) return;
//     chips.querySelectorAll('.chip').forEach(c=> c.classList.remove('is-active'));
//     btn.classList.add('is-active');
//     const key = btn.dataset.chip;
//     activeTags.clear();
//     if(key && key!=='all') activeTags.add(key);
//     renderSelected(); applyFilter();
//   });
//   selBox?.addEventListener('click', (e)=>{
//     const rm = e.target.getAttribute('data-remove'); if(!rm) return;
//     activeTags.delete(rm); renderSelected(); applyFilter();
//   });

//   // Sort (client-side demo)
//   const sortSel = document.querySelector('[data-sort]');
//   sortSel?.addEventListener('change', ()=>{
//     const val = sortSel.value;
//     const cards = Array.from(grid.children);
//     cards.sort((a,b)=>{
//       const pa = Number(a.dataset.priceTry||a.getAttribute('data-price-try')||0);
//       const pb = Number(b.dataset.priceTry||b.getAttribute('data-price-try')||0);
//       const ra = parseFloat(String(a.dataset.rating||'0').split(' ')[0])||0;
//       const rb = parseFloat(String(b.dataset.rating||'0').split(' ')[0])||0;
//       if(val==='price-asc') return pa - pb;
//       if(val==='price-desc') return pb - pa;
//       if(val==='rating-desc') return rb - ra;
//       return 0; // 'new' fallback keep order
//     });
//     cards.forEach(c=> grid.appendChild(c));
//   });



//   // Load more (demo: duplicates first 4)
//   const loadBtn = document.querySelector('[data-load-more]');
//   loadBtn?.addEventListener('click', ()=>{
//     const first = Array.from(grid.children).slice(0,4).map(n=> n.cloneNode(true));
//     first.forEach(n=> grid.appendChild(n));
//   });
// })();


// // === [ADD] Infinite Scroll for products ===
// (function(){
//   const grid = document.querySelector('[data-products]');
//   if(!grid) return;

//   // Helper: create clones of first N cards (demo data)
//   function cloneBatch(n=6){
//     const pool = Array.from(grid.children);
//     if(pool.length === 0) return;
//     const frag = document.createDocumentFragment();
//     for(let i=0;i<n;i++){
//       const clone = pool[i % pool.length].cloneNode(true);
//       // Optional: tweak a data attribute to avoid exact duplicates (e.g., append a flag)
//       const title = clone.querySelector('.title');
//       if(title){ title.textContent = title.textContent.replace(/ \(kopya \d+\)$/,'') + ' (kopya ' + (Math.floor(Math.random()*999)+1) + ')'; }
//       frag.appendChild(clone);
//     }
//     grid.appendChild(frag);
//   }

//   // Fallback: if "Devamını Yükle" button exists, wire up to same loader
//   const loadBtn = document.querySelector('[data-load-more]');
//   if(loadBtn && !loadBtn.dataset._wired){
//     loadBtn.dataset._wired = '1';
//     loadBtn.addEventListener('click', ()=> cloneBatch(6));
//   }

//   // IntersectionObserver sentinel
//   const sentinel = document.querySelector('[data-infinite-sentinel]');
//   if(!sentinel) return;

//   let loading = false;
//   const io = new IntersectionObserver((entries)=>{
//     entries.forEach(entry=>{
//       if(entry.isIntersecting && !loading){
//         loading = true;
//         // Simulate async load
//         setTimeout(()=>{ cloneBatch(6); loading = false; }, 200);
//       }
//     });
//   }, {rootMargin: '200px 0px 200px 0px'});

//   io.observe(sentinel);
// })();



// // === Footer: newsletter mock + pagination ===
// (function(){
//   // Newsletter mock
//   const form = document.querySelector('[data-newsletter]');
//   if(form){
//     form.addEventListener('submit', (e)=>{
//       e.preventDefault();
//       const msg = form.querySelector('.nl-msg');
//       msg.textContent = 'Teşekkürler! Aboneliğiniz alındı.';
//       setTimeout(()=> msg.textContent = '', 3000);
//       form.reset();
//     });
//   }

//   // Pagination
//   const pnav = document.querySelector('[data-pagination]');
//   if(pnav){
//     const currentFromUrl = new URLSearchParams(window.location.search).get('page');
//     const current = Number(currentFromUrl || pnav.getAttribute('data-current') || 1);
//     const items = pnav.querySelectorAll('[data-page]');
//     items.forEach(a=>{
//       const n = Number(a.getAttribute('data-page'));
//       a.classList.toggle('is-active', n === current);
//       a.addEventListener('click', (e)=>{
//         // default navigation keeps hash to products
//       });
//     });
//     const prev = pnav.querySelector('[data-prev]');
//     const next = pnav.querySelector('[data-next]');
//     const total = Number(pnav.getAttribute('data-total') || items.length);
//     function go(num){
//       const n = Math.max(1, Math.min(total, num));
//       const url = new URL(window.location.href);
//       url.searchParams.set('page', String(n));
//       url.hash = '#products';
//    }
//     prev?.addEventListener('click', ()=> go(current - 1));
//     next?.addEventListener('click', ()=> go(current + 1));
//   }
// })();



// // /* responsive corrections */ close dropdowns on resize to larger screens
// (function(){
//   let media = window.matchMedia('(min-width: 769px)');
//   function closeDrops(){
//     document.querySelectorAll('[data-dropdown].is-open').forEach(d=> d.classList.remove('is-open'));
//     document.body.classList.remove('lock');
//   }
//   try{ media.addEventListener('change', e=>{ if(e.matches) closeDrops(); }); }catch(e){}
// })();
