/* ==========================================================================
   ✏️ AQUÍ EDITAS TODO:
   - foto:  ruta de la foto del artista (guárdala en la carpeta img/)
   - src:   ruta del audio de cada canción (guárdalo en la carpeta audio/)
   - t:     título de la canción        - album: texto pequeño debajo del título
   - video: ruta de tu video (guárdalo en la carpeta video/)
   - yt:    (opcional) si prefieres YouTube, pon aquí solo el ID del video y se usa en lugar del archivo
   ========================================================================== */
const ARTISTAS=[
 {nombre:"Millonario",   foto:"imagen1.jpeg", video:"video1.mp4", yt:"",   color:"#c9a227",
  canciones:[
   {t:"Burbujas de Cristal",album:"Millonario",src:"cancion1.mp3"},
   {t:"Rayas de Patron",album:"Millonario",src:"cancion2.mp3"},
   {t:"Si Nos Portamos Mal",album:"Millonario",src:"cancion3.mp3"},
   {t:"Casco Maizi",album:"Millonario",src:"cancion4.mp3"},
   {t:"De Aqui Los Veo",album:"Millonario",src:"cancion5.mp3"}]},
 {nombre:"Under Side 821",   foto:"imagen2.png", video:"video2.mp4", yt:"",    color:"#3b82f6",
  canciones:[
   {t:"Fiesta En El Cantón",album:"Under Side 821",src:"cancion6.M4A"},
   {t:"Gangster Rokos",album:"Under Side 821",src:"cancion7.M4A"},
   {t:"Aqui Se Vive Malandro",album:"Under Side 821",src:"cancion8.M4A"},
   {t:"Tirando La Plaka",album:"Under Side 821",src:"cancion9.M4A"},
   {t:"Me La Pela Paquita",album:"Under Side 821",src:"cancion10.mp3"}]},
 {nombre:"Santa Grifa",  foto:"imagen3.png", video:"video3.mp4", yt:"",   color:"#16a34a",
  canciones:[
   {t:"Table Dance",album:"Santa Grifa",src:"cancion11.M4A"},
   {t:"Tu Silueta",album:"Santa Grifa",src:"cancion12.mp3"},
   {t:"Esto No Es Malo",album:"Santa Grifa",src:"cancion13.mp3"},
   {t:"Bailando Con La Muerte",album:"Santa Grifa",src:"cancion14.mp3"},
   {t:"A Su Vato Engaña",album:"Santa Grifa",src:"cancion15.mp3"}]},
 {nombre:"Cartel de Santa",foto:"imagen4.png", video:"video4.mp4", yt:"",color:"#dc2626",
  canciones:[
   {t:"Pesao",album:"Cartel de Santa",src:"cancion16.mp3"},
   {t:"Extasis",album:"Cartel de Santa",src:"cancion17.mp3"},
   {t:"Todas Mueren Por Mi",album:"Cartel de Santa",src:"cancion18.mp3"},
   {t:"El Dolor Del Micro",album:"Cartel de Santa",src:"cancion19.mp3"},
   {t:"Pa No Andar Triste",album:"Cartel de Santa",src:"cancion20.M4A"}]},
 {nombre:"Dharius",       foto:"imagen5.png", video:"video5.mp4", yt:"",       color:"#a855f7",
  canciones:[
   {t:"La Durango",album:"Dharius",src:"cancion21.M4A"},
   {t:"La Raja",album:"Dharius",src:"cancion22.mp3"},
   {t:"Quiúbules Que",album:"Dharius",src:"cancion23.M4A"},
   {t:"Estilo Malandro",album:"Dharius",src:"cancion24.mp3"},
   {t:"Lírica Onírica",album:"Dharius",src:"cancion25.M4A"}]}
];

/* ================= Código (no necesitas tocarlo) ================= */
const $=id=>document.getElementById(id);
const audio=$("audio");
let sonando={a:-1,s:-1},vista={t:"inicio",a:0};

const ini=n=>n.split(" ").map(p=>p[0]).slice(0,2).join("").toUpperCase();
const foto=a=>`<img src="${a.foto}" alt="Foto de ${a.nombre}" loading="lazy" onerror="this.remove()">`;
const tiempo=s=>isFinite(s)?Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0"):"0:00";
let tt;function aviso(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("show"),2600)}

/* ----- Favoritos (se guardan en el navegador) ----- */
const fav=new Set();
try{JSON.parse(localStorage.getItem("fav")||"[]").forEach(k=>fav.add(k))}catch(e){}
const guardaFav=()=>{try{localStorage.setItem("fav",JSON.stringify([...fav]))}catch(e){}};

/* ----- Panel lateral ----- */
const drawer=$("drawer"),overlay=$("overlay");
function panel(v){drawer.classList.toggle("open",v);overlay.classList.toggle("show",v);drawer.setAttribute("aria-hidden",!v);document.body.classList.toggle("lock",v)}
$("burger").onclick=()=>panel(true);$("cerrar").onclick=()=>panel(false);overlay.onclick=()=>panel(false);
document.addEventListener("keydown",e=>{if(e.key==="Escape")panel(false)});
$("pl").innerHTML=ARTISTAS.map((a,i)=>`<li><button data-a="${i}"><span class="av" style="--c:${a.color}">${ini(a.nombre)}${foto(a)}</span>${a.nombre}</button></li>`).join("");
$("nav").addEventListener("click",e=>{const b=e.target.closest("button");if(b)ir(b.dataset.v)});
$("pl").addEventListener("click",e=>{const b=e.target.closest("button");if(b)ir("artista",+b.dataset.a)});

/* ----- Vistas ----- */
function fila(a,s,conArtista){
 const c=ARTISTAS[a].canciones[s],k=a+"-"+s,f=fav.has(k);
 return `<li class="cancion" data-a="${a}" data-s="${s}"><span class="n">${s+1}</span>
  <div style="min-width:0"><b>${c.t}</b><small>${conArtista?ARTISTAS[a].nombre+" · ":""}${c.album||""}</small></div>
  <button class="fav ${f?"on":""}" data-fav="${k}" aria-label="Favorito">${f?"♥":"♡"}</button><span class="ic">▶</span></li>`}
const todas=()=>ARTISTAS.flatMap((a,i)=>a.canciones.map((_,s)=>[i,s]));

function ir(t,a=0){vista={t,a};render();panel(false);window.scrollTo(0,0)}
function render(){
 const m=$("vista");m.style.removeProperty("--c");let h="";
 if(vista.t==="inicio"){
  h=`<section class="seccion"><h2>Inicio</h2><p class="vacio" style="padding:0">Elige un artista para escuchar sus canciones.</p>
   <div class="grid">${ARTISTAS.map((a,i)=>`<button class="card" data-a="${i}"><span class="av" style="--c:${a.color}">${ini(a.nombre)}${foto(a)}</span><b>${a.nombre}</b><small>${a.canciones.length} canciones</small></button>`).join("")}</div></section>`;
 }else if(vista.t==="buscar"){
  h=`<section class="seccion"><h2>Buscar</h2><input id="q" class="buscador" type="search" placeholder="Canción o artista..." autocomplete="off"><ol class="lista" id="res"></ol></section>`;
 }else if(vista.t==="biblioteca"){
  h=`<section class="seccion"><h2>Biblioteca</h2>${ARTISTAS.map((a,i)=>`<h3>${a.nombre}</h3><ol class="lista">${a.canciones.map((_,s)=>fila(i,s)).join("")}</ol>`).join("")}</section>`;
 }else if(vista.t==="favoritos"){
  const l=todas().filter(([a,s])=>fav.has(a+"-"+s));
  h=`<section class="seccion"><h2>Favoritos</h2>${l.length?`<ol class="lista">${l.map(([a,s])=>fila(a,s,1)).join("")}</ol>`:`<p class="vacio">Aún no tienes favoritos. Toca el ♡ de una canción para guardarla aquí.</p>`}</section>`;
 }else if(vista.t==="registro"){
  h=FORM_HTML;
 }else{
  const a=ARTISTAS[vista.a];m.style.setProperty("--c",a.color+"cc");
  h=`<section class="hero"><div class="hero-foto">${ini(a.nombre)}${foto(a)}</div>
   <div class="hero-txt"><span class="tipo">Playlist</span><h1>${a.nombre}</h1><p>${a.canciones.length} canciones</p></div></section>
   <div class="acciones"><button class="pbig" id="todo" aria-label="Reproducir todo">▶</button></div>
   <ol class="lista">${a.canciones.map((_,s)=>fila(vista.a,s)).join("")}</ol>${videoHTML(a)}`;
 }
 m.innerHTML=h;
 if(vista.t==="registro")formulario();
 document.querySelectorAll("#nav button").forEach(b=>b.classList.toggle("on",b.dataset.v===vista.t));
 document.querySelectorAll("#pl button").forEach(b=>b.classList.toggle("on",vista.t==="artista"&&+b.dataset.a===vista.a));
 if(vista.t==="buscar")buscar();
 pintar();
}
function buscar(){
 const q=$("q").value.trim().toLowerCase(),r=$("res");
 if(!q){r.innerHTML=`<p class="vacio">Escribe para buscar entre todas las canciones.</p>`;return}
 const l=todas().filter(([a,s])=>(ARTISTAS[a].canciones[s].t+" "+ARTISTAS[a].nombre).toLowerCase().includes(q));
 r.innerHTML=l.length?l.map(([a,s])=>fila(a,s,1)).join(""):`<p class="vacio">Sin resultados para «${$("q").value}».</p>`;
 pintar();
}
$("vista").addEventListener("input",e=>{if(e.target.id==="q")buscar()});
$("vista").addEventListener("click",e=>{
 const card=e.target.closest(".card");if(card)return ir("artista",+card.dataset.a);
 const fv=e.target.closest(".fav");
 if(fv){const k=fv.dataset.fav;fav.has(k)?fav.delete(k):fav.add(k);guardaFav();
  if(vista.t==="favoritos")render();
  else document.querySelectorAll(".fav").forEach(b=>{const on=fav.has(b.dataset.fav);b.classList.toggle("on",on);b.textContent=on?"♥":"♡"});
  return}
 if(e.target.closest("#todo")){return sonando.a===vista.a&&!audio.paused?audio.pause():(sonando.a===vista.a?audio.play():reproducir(vista.a,0))}
 const li=e.target.closest(".cancion");if(!li)return;
 const a=+li.dataset.a,s=+li.dataset.s;
 if(sonando.a===a&&sonando.s===s)audio.paused?audio.play():audio.pause();else reproducir(a,s);
});

/* ----- Reproductor ----- */
function reproducir(a,s){
 const c=ARTISTAS[a].canciones[s];sonando={a,s};
 $("npTitulo").textContent=c.t;$("npArtista").textContent=ARTISTAS[a].nombre;
 $("npFoto").innerHTML=`♪<img src="${ARTISTAS[a].foto}" alt="" style="position:absolute;width:52px;height:52px;object-fit:cover" onerror="this.remove()">`;
 $("npFoto").style.position="relative";
 audio.src=c.src;
 audio.play().catch(()=>aviso("No se encontró el audio: revisa la ruta en spotify.js"));
 pintar();
}
const mover=d=>{if(sonando.a<0)return;const n=ARTISTAS[sonando.a].canciones.length;reproducir(sonando.a,(sonando.s+d+n)%n)};
$("next").onclick=()=>mover(1);$("prev").onclick=()=>mover(-1);
$("play").onclick=()=>{if(sonando.a<0)return reproducir(vista.t==="artista"?vista.a:0,0);audio.paused?audio.play().catch(()=>aviso("No se pudo reproducir el audio")):audio.pause()};
audio.addEventListener("play",pintar);audio.addEventListener("pause",pintar);
audio.addEventListener("ended",()=>mover(1));
audio.addEventListener("error",()=>{if(audio.getAttribute("src"))aviso("No se encontró el audio: revisa la ruta en spotify.js")});
audio.addEventListener("loadedmetadata",()=>$("tTot").textContent=tiempo(audio.duration));
audio.addEventListener("timeupdate",()=>{if(audio.duration){$("prog").value=audio.currentTime/audio.duration*100;$("tAct").textContent=tiempo(audio.currentTime)}});
$("prog").addEventListener("input",e=>{if(audio.duration)audio.currentTime=e.target.value/100*audio.duration});
$("vol").addEventListener("input",e=>audio.volume=e.target.value);audio.volume=.8;

function pintar(){
 const sona=!audio.paused&&sonando.a>=0;
 $("play").textContent=sona?"⏸":"▶";
 document.querySelectorAll(".cancion").forEach(li=>{
  const on=sonando.a===+li.dataset.a&&sonando.s===+li.dataset.s;
  li.classList.toggle("on",on);li.querySelector(".ic").textContent=on&&sona?"⏸":"▶"});
 const t=$("todo");if(t)t.textContent=sona&&sonando.a===vista.a?"⏸":"▶";
}

/* ----- Video del artista ----- */
function videoHTML(a){
 const cont=a.yt
  ?`<iframe src="https://www.youtube-nocookie.com/embed/${a.yt}" loading="lazy" allowfullscreen title="Video de ${a.nombre}"></iframe>`
  :`<video controls preload="metadata" playsinline src="${a.video}" onerror="this.parentElement.classList.add('sin')"></video>
    <div class="ph"><b>🎬 Aquí va tu video</b><small>Guárdalo como ${a.video}</small></div>`;
 return `<section class="seccion"><h3>Video</h3><div class="video-box">${cont}</div></section>`}
// La música y el video no suenan al mismo tiempo
document.addEventListener("play",e=>{if(e.target.tagName==="VIDEO")audio.pause()},true);
audio.addEventListener("play",()=>document.querySelectorAll("video").forEach(v=>v.pause()));

/* ----- Formulario de registro ----- */
const FORM_HTML=`<section class="seccion"><div class="reg-card">
 <span class="tipo">Únete</span><h2>Regístrate en Imperio Negro</h2>
 <p class="vacio" style="padding:0 0 18px">Llena tus datos y presiona «Validar».</p>
 <form id="form" novalidate>
  <div class="field" id="f-nombre"><label for="nombre">Nombre(s)</label>
   <input id="nombre" type="text" placeholder="Ej. JOSÉ LUIS" autocomplete="given-name">
   <div class="hint">Solo letras y espacios, máx. 100.</div><div class="err"></div></div>
  <div class="row">
   <div class="field" id="f-paterno"><label for="paterno">Apellido paterno</label><input id="paterno" type="text" placeholder="Ej. PÉREZ"><div class="err"></div></div>
   <div class="field" id="f-materno"><label for="materno">Apellido materno</label><input id="materno" type="text" placeholder="Ej. GARCÍA"><div class="err"></div></div>
  </div>
  <div class="field" id="f-fecha"><label>Fecha de nacimiento</label>
   <div class="fecha-box"><select id="dia" aria-label="Día"><option value="">Día</option></select>
    <select id="mes" aria-label="Mes"><option value="">Mes</option>${["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"].map((m,i)=>`<option value="${i+1}">${m}</option>`).join("")}</select>
    <select id="anio" aria-label="Año"><option value="">Año</option></select></div>
   <div class="hint">Debes ser mayor de edad (18 años o más).</div><div class="err"></div></div>
  <div class="field" id="f-tarjeta"><label for="tarjeta">Número de tarjeta</label>
   <input id="tarjeta" type="text" inputmode="numeric" placeholder="Ej. 4152 3698 0147 2580" autocomplete="cc-number">
   <div class="hint">Máximo 16 dígitos (solo números).</div><div class="err"></div></div>
  <div class="field" id="f-email"><label for="usuario">Correo electrónico</label>
   <div class="email-box"><input id="usuario" type="text" inputmode="email" placeholder="ej. juan.perez25" autocapitalize="none" autocomplete="off"><span class="arroba">@</span>
    <select id="dominio" aria-label="Dominio"><option>gmail.com</option><option>hotmail.com</option><option>outlook.com</option><option>yahoo.com</option><option>icloud.com</option><option>live.com</option></select></div>
   <div class="hint">Escribe lo de antes del @ y elige tu proveedor. Se permiten . _ - +</div><div class="err"></div></div>
  <button type="submit" id="btn">Validar</button><p id="ok" class="okmsg" role="status"></p>
 </form></div></section>`;

function formulario(){
 const f=$("form"),btn=$("btn"),Y=new Date().getFullYear();
 for(let d=1;d<=31;d++)$("dia").add(new Option(d,d));
 for(let a=Y;a>=Y-100;a--)$("anio").add(new Option(a,a));
 ["nombre","paterno","materno"].forEach(id=>$(id).addEventListener("input",e=>{
  e.target.value=e.target.value.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]/g,"").toUpperCase().slice(0,100)}));
 $("tarjeta").addEventListener("input",e=>{
  e.target.value=e.target.value.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim()});
 $("usuario").addEventListener("input",e=>{
  e.target.value=e.target.value.replace(/[^a-zA-Z0-9._+-]/g,"").toLowerCase().slice(0,30)});
 const marca=(id,ok,msg)=>{const el=$("f-"+id);el.classList.toggle("error",!ok);el.classList.toggle("valid",ok);
  if(msg)el.querySelector(".err").textContent=msg;return ok};
 const nom=(id,msg)=>marca(id,$(id).value.trim().length>=1,msg);
 function fecha(){
  const d=+$("dia").value,m=+$("mes").value,a=+$("anio").value;
  if(!d||!m||!a)return marca("fecha",false,"Escoge día, mes y año.");
  if(d>new Date(a,m,0).getDate())return marca("fecha",false,"Esa fecha no existe.");
  const h=new Date();let edad=h.getFullYear()-a;
  if(h.getMonth()+1<m||(h.getMonth()+1===m&&h.getDate()<d))edad--;
  if(edad<18)return marca("fecha",false,"Debes ser mayor de edad (18 años o más). Tienes "+edad+(edad===1?" año.":" años."));
  return marca("fecha",true)}
 const reset=()=>{btn.className="";btn.textContent="Validar";$("ok").textContent=""};
 f.addEventListener("input",reset);f.addEventListener("change",reset);
 ["dia","mes","anio"].forEach(id=>$(id).addEventListener("change",()=>{if($("dia").value&&$("mes").value&&$("anio").value)fecha()}));
 f.addEventListener("submit",e=>{
  e.preventDefault();
  const u=$("usuario").value,t=$("tarjeta").value.replace(/\s/g,"");
  const r=[nom("nombre","Escribe tu nombre (solo letras, sin números ni símbolos)."),
   nom("paterno","Apellido paterno no válido."),nom("materno","Apellido materno no válido."),fecha(),
   marca("tarjeta",/^\d{13,16}$/.test(t),"Escribe un número de tarjeta válido (13 a 16 dígitos)."),
   marca("email",/^[a-z0-9]+([._+-][a-z0-9]+)*$/.test(u)&&u.length>=6&&u.length<=30,"Usuario no válido (6 a 30 caracteres: letras, números y . _ - +).")];
  if(r.every(Boolean)){btn.className="good";btn.textContent="✔ Validado";$("ok").textContent="Todo está en orden. ¡Bienvenido a Imperio Negro!"}
  else{btn.className="bad";btn.textContent="✖ Error";$("ok").textContent="";
   const p=document.querySelector(".field.error input,.field.error select");if(p)p.focus()}
 });
}

render();
