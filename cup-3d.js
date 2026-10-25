import * as THREE from './assets/vendor/three.module.min.js';

// Cena procedural: malhas tridimensionais, não fotografias giradas.
const DURATION = 11.5;
const TAU = Math.PI * 2;
const clamp = THREE.MathUtils.clamp;
const smooth = (a, b, t) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
const easeOut = t => 1 - (1 - t) ** 3;
function seededRandom(seed = 28471) {
  return () => { seed = Math.imul(1664525, seed) + 1013904223 | 0; return (seed >>> 0) / 4294967296; };
}

function canvasTexture(width, height, paint) {
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  paint(canvas.getContext('2d'), width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeEnvironment(renderer) {
  const room = new THREE.Scene();
  room.background = new THREE.Color('#a8b59a');
  const box = new THREE.Mesh(new THREE.BoxGeometry(12, 12, 12), new THREE.MeshBasicMaterial({color: '#6b7d58', side: THREE.BackSide}));
  room.add(box);
  const panels = [
    {p: [-4, 3, 2], s: [2.4, 6, .1], c: '#fff8e8', i: 4},
    {p: [4, 2, 0], s: [1.2, 5, .1], c: '#ffffff', i: 3},
    {p: [0, 5, 0], s: [5, .1, 4], c: '#fff1bc', i: 3},
    {p: [0, 1, -4], s: [4, 4, .1], c: '#c4df98', i: 1.4}
  ];
  panels.forEach(({p, s, c, i}) => {
    const light = new THREE.Mesh(new THREE.BoxGeometry(...s), new THREE.MeshBasicMaterial({color: new THREE.Color(c).multiplyScalar(i)}));
    light.position.set(...p); room.add(light);
  });
  const generator = new THREE.PMREMGenerator(renderer);
  const target = generator.fromScene(room, .04, .1, 30);
  generator.dispose();
  room.traverse(object => { if (object.isMesh) { object.geometry.dispose(); object.material.dispose(); } });
  return target;
}

function makeLabel(texture) {
  const width = 1.32, height = 1.35, columns = 32, rows = 12;
  const position = [], uv = [], index = [];
  for (let j = 0; j <= rows; j++) {
    const y = .72 + j / rows * height;
    const radius = .69 + y / 2.8 * .27 + .013;
    for (let i = 0; i <= columns; i++) {
      const angle = (i / columns - .5) * width / .84;
      position.push(Math.sin(angle) * radius, y, Math.cos(angle) * radius);
      uv.push(i / columns, j / rows);
      if (j < rows && i < columns) {
        const k = j * (columns + 1) + i;
        index.push(k, k + 1, k + columns + 1, k + 1, k + columns + 2, k + columns + 1);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geometry.setIndex(index); geometry.computeVertexNormals();
  const material = new THREE.MeshStandardMaterial({map: texture, transparent: true, alphaTest: .1, roughness: .42, metalness: 0, side: THREE.DoubleSide});
  return new THREE.Mesh(geometry, material);
}

async function initCup(root) {
  const canvas = root.querySelector('canvas');
  const toggle = root.querySelector('[data-cup-toggle]');
  const replay = root.querySelector('[data-cup-replay]');
  const seek = root.querySelector('[data-cup-seek]');
  const status = root.querySelector('[data-cup-status]');
  const photo = root.querySelector('[data-cup-photo]');
  let renderer;
  let software = false;
  try {
    renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true, powerPreference: 'low-power'});
  } catch {
    const { SoftwareCupRenderer } = await import('./cup-software.js');
    renderer = new SoftwareCupRenderer(canvas);
    software = true;
  }
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, innerWidth < 801 ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  const scene = new THREE.Scene();
  const environment = software ? null : makeEnvironment(renderer);
  if (environment) scene.environment = environment.texture;
  scene.environmentIntensity = .8;
  const camera = new THREE.PerspectiveCamera(33, 1, .1, 40);
  camera.position.set(0, 3.1, 8.1); camera.lookAt(0, 1.8, 0);
  scene.add(new THREE.HemisphereLight('#fff9e9', '#586d39', 2.5));
  const key = new THREE.DirectionalLight('#fff7dc', 3.2); key.position.set(-3, 5, 4); scene.add(key);
  const fill = new THREE.DirectionalLight('#e7f4ce', 1.6); fill.position.set(4, 3, -2); scene.add(fill);
  const cup = new THREE.Group(); cup.name='cup'; scene.add(cup);
  const plastic = new THREE.MeshPhysicalMaterial({color: '#ffffff', roughness: .13, metalness: 0, transmission: 1, thickness: .025, ior: 1.46, clearcoat: 1, clearcoatRoughness: .08, envMapIntensity: 1.1});
  const profile = [[0,.035],[.65,.035],[.685,.075],[.698,.18],[.94,2.7],[.965,2.77],[.965,2.8],[.94,2.8],[.918,2.7],[.677,.18],[.66,.105],[0,.105]].map(([x,y]) => new THREE.Vector2(x,y));
  const shell = new THREE.Mesh(new THREE.LatheGeometry(profile, 72), plastic); shell.name='shell'; cup.add(shell);
  const ringMaterial = new THREE.MeshPhysicalMaterial({color: '#ffffff', transmission: .92, thickness: .035, roughness: .16, ior: 1.46});
  function ring(radius, tube, y, parent = cup) {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 8, 72), ringMaterial);
    mesh.rotation.x = Math.PI / 2; mesh.position.y = y; parent.add(mesh); return mesh;
  }
  ring(.95, .027, 2.79); ring(.692, .019, .12);
  [.22, .29, .36].forEach(y => ring(.69 + y / 2.8 * .27, .008, y));

  const random = seededRandom();
  const fiber = canvasTexture(128, 256, (ctx,w,h) => {
    ctx.fillStyle = '#bbb'; ctx.fillRect(0,0,w,h);
    for (let i=0;i<340;i++) {
      ctx.strokeStyle = `rgba(${random()>.5?'255,255,255':'70,70,70'},${.08+random()*.18})`;
      ctx.lineWidth = .3+random(); const x=random()*w,y=random()*h;
      ctx.beginPath();ctx.moveTo(x,y);ctx.bezierCurveTo(x+2,y+15,x-2,y+35,x+random()*4,y+65);ctx.stroke();
    }
  });
  fiber.colorSpace = THREE.NoColorSpace;
  const fruitMaterial = new THREE.MeshPhysicalMaterial({color: '#ffffff', roughness: .36, metalness: 0, clearcoat: .45, clearcoatRoughness: .25, bumpMap: fiber, bumpScale: .018});
  const path = new THREE.CatmullRomCurve3([new THREE.Vector3(-.025,-.5,0),new THREE.Vector3(.025,-.18,.018),new THREE.Vector3(-.005,.2,.028),new THREE.Vector3(.03,.5,0)]);
  const fruitGeometry = new THREE.TubeGeometry(path, 18, .018, 6, false);
  const vertices = fruitGeometry.attributes.position;
  for (let i=0;i<vertices.count;i++) {
    const y=vertices.getY(i), taper=.4+.6*Math.sin(clamp(y+.5,0,1)*Math.PI)**.22;
    vertices.setX(i, vertices.getX(i)*2.2*taper);
    vertices.setZ(i, vertices.getZ(i)*.72*taper);
  }
  fruitGeometry.computeVertexNormals();
  const count = 330;
  const mango = new THREE.InstancedMesh(fruitGeometry, fruitMaterial, count);
  mango.name='mango';
  mango.instanceMatrix.setUsage(THREE.DynamicDrawUsage); mango.frustumCulled = false; cup.add(mango);
  const palette = ['#f6d04c','#f4d75a','#ffe47c','#f4d34b','#f3db74','#ead57b','#f7dc83','#e4d782'];
  const pieces = [];
  for (let i=0;i<count;i++) {
    const layer=i/count, y=.65+layer*1.60, length=.45+random()*.54;
    const rotation=new THREE.Euler((random()-.5)*1.25,random()*TAU,(random()-.5)*1.25);
    const reach=new THREE.Vector3(0,length*.54,0).applyEuler(rotation);
    const availableRadius=Math.max(.2,.67+(y-length*.5)/2.8*.25-Math.hypot(reach.x,reach.z)-.09);
    const radius=availableRadius*Math.sqrt(random()),angle=random()*TAU;
    pieces.push({
      x:Math.cos(angle)*radius,z:Math.sin(angle)*radius,y,
      length, width:.72+random()*.8,rotation,
      start:1+layer*3.65, fall:.7+random()*.25,
      sway:(random()-.5)*.45, phase:random()*TAU
    });
    mango.setColorAt(i,new THREE.Color(palette[i%palette.length]));
  }

  const saltGeometry = new THREE.BufferGeometry();
  const saltPositions = new Float32Array(84*3); saltGeometry.setAttribute('position',new THREE.BufferAttribute(saltPositions,3));
  const salt = new THREE.Points(saltGeometry,new THREE.PointsMaterial({color:'#fffbe7',size:.025,transparent:true,opacity:.92,depthWrite:false}));
  salt.name='salt';
  salt.frustumCulled=false;cup.add(salt);

  const citrusTexture = canvasTexture(256,256,(ctx,w,h)=>{
    ctx.fillStyle='#f6f2ae';ctx.fillRect(0,0,w,h);
    for(let i=0;i<10;i++) {
      const a=i*TAU/10+.025,b=(i+1)*TAU/10-.025;
      ctx.beginPath();ctx.moveTo(w/2,h/2);ctx.arc(w/2,h/2,w*.45,a,b);ctx.closePath();
      ctx.fillStyle=i%2?'#e1e986':'#d4df70';ctx.fill();
      for(let j=0;j<26;j++) {
        const t=a+random()*(b-a),r=(.12+random()*.72)*w/2;
        ctx.strokeStyle='rgba(255,255,220,.55)';ctx.lineWidth=1+random()*1.5;
        ctx.beginPath();ctx.moveTo(w/2+Math.cos(t)*r,h/2+Math.sin(t)*r);
        ctx.lineTo(w/2+Math.cos(t)*(r+7),h/2+Math.sin(t)*(r+7));ctx.stroke();
      }
    }
    ctx.beginPath();ctx.arc(w/2,h/2,7,0,TAU);ctx.fillStyle='#faf4be';ctx.fill();
  });
  const lime = new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,.075,48),[
    new THREE.MeshStandardMaterial({color:'#648d22',roughness:.7}),
    new THREE.MeshPhysicalMaterial({map:citrusTexture,roughness:.4,clearcoat:.6}),
    new THREE.MeshPhysicalMaterial({map:citrusTexture,roughness:.4,clearcoat:.6})
  ]);
  lime.rotation.set(1.1,.2,-.35);cup.add(lime);
  lime.name='lime';

  const lid = new THREE.Group(); lid.name='lid'; cup.add(lid);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(.94,48,24,0,TAU,0,Math.PI/2),plastic);
  dome.scale.y=.66;lid.add(dome);ring(.964,.035,0,lid);ring(.946,.012,.065,lid);
  const lidRibs = new THREE.InstancedMesh(new THREE.BoxGeometry(.016,.055,.022),ringMaterial,64);
  const dummy = new THREE.Object3D();
  for(let i=0;i<64;i++) { const a=i/64*TAU;dummy.position.set(Math.sin(a)*.968,.005,Math.cos(a)*.968);dummy.rotation.set(0,a,0);dummy.updateMatrix();lidRibs.setMatrixAt(i,dummy.matrix); }
  lid.add(lidRibs);

  const shadowTexture = canvasTexture(256,256,(ctx,w,h)=>{
    const g=ctx.createRadialGradient(w/2,h/2,2,w/2,h/2,w*.48);g.addColorStop(0,'rgba(22,48,16,.36)');g.addColorStop(.4,'rgba(22,48,16,.18)');g.addColorStop(1,'rgba(22,48,16,0)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  });
  const shadow=new THREE.Mesh(new THREE.PlaneGeometry(3.5,3.5),new THREE.MeshBasicMaterial({map:shadowTexture,transparent:true,depthWrite:false}));
  shadow.rotation.x=-Math.PI/2;shadow.position.y=.015;scene.add(shadow);

  // O logo original é aplicado em uma superfície curva.
  const logo = await new Promise((resolve,reject)=>{
    const img = new Image();img.onload=()=>resolve(img);img.onerror=reject;
    img.src=new URL('./assets/logo.webp',import.meta.url).href;
  });
  const sticker=canvasTexture(512,512,(ctx,w,h)=>{ctx.beginPath();ctx.arc(w/2,h/2,w*.497,0,TAU);ctx.clip();ctx.drawImage(logo,0,0,w,h);});
  sticker.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
  const label=makeLabel(sticker);label.name='label';cup.add(label);

  let time = reducedMotion.matches ? DURATION : 0;
  let playing = !reducedMotion.matches, visible = true, photoMode = false, frame = 0, previous = 0, lastPhase='';
  const transform = new THREE.Object3D();
  function paint() {
    cup.position.y= -.25*(1-smooth(0,.8,time));
    cup.rotation.y= -.1 + Math.sin(smooth(7.8,DURATION,time)*Math.PI)*.34;
    for(let i=0;i<count;i++) {
      const p=pieces[i],progress=clamp((time-p.start)/p.fall,0,1);
      const falling=progress<1;
      transform.position.set(p.x+(falling?Math.sin(progress*Math.PI+p.phase)*p.sway*(1-progress):0),p.y+(1-progress*progress)*(4.7-p.y),p.z);
      if(time<p.start) transform.position.y=8;
      transform.rotation.copy(p.rotation);
      transform.rotation.z += falling ? (1-progress)*2 : Math.sin((time-p.start-p.fall)*22)*.035*Math.exp(-Math.max(0,time-p.start-p.fall)*7);
      transform.scale.set(p.width,p.length,p.width);transform.updateMatrix();mango.setMatrixAt(i,transform.matrix);
    }
    mango.instanceMatrix.needsUpdate=true;
    salt.visible=time>5.1&&time<6.5;
    if(salt.visible) {
      for(let i=0;i<84;i++) {const p=(time-5.1+i*.007)%1;const a=i*2.39996;const r=.65*Math.sqrt((i+.5)/84);saltPositions[i*3]=Math.cos(a)*r;saltPositions[i*3+1]=4.6-p*p*2.05;saltPositions[i*3+2]=Math.sin(a)*r;}
      saltGeometry.attributes.position.needsUpdate=true;
    }
    const limeProgress=smooth(5.3,6.35,time);
    lime.visible=time>5.3;lime.position.set(.34,2.57+(1-easeOut(limeProgress))*2.6,.16);lime.rotation.z=-.35+(1-limeProgress)*1.3;
    const lidProgress=smooth(6.5,7.9,time);
    lid.visible=time>6.5;lid.position.y=2.82+(1-easeOut(lidProgress))*2.7;
    const phase=time<1?'Seu copo, do seu jeito.':time<5.1?'Manga fresquinha.':time<6.5?'Limão e tempero.':time<8?'O toque final.':'Pronto pro rolê.';
    if(phase!==lastPhase){status.textContent=phase;lastPhase=phase;}
    seek.value=String(time/DURATION*100);
    seek.setAttribute('aria-valuetext',phase);
    root.dataset.phase=time<1?'copo':time<5.1?'manga':time<6.5?'tempero':time<8?'tampa':'pronto';
    root.dataset.progress=time.toFixed(2);
    renderer.render(scene,camera);
  }
  function syncControls() {
    toggle.textContent=photoMode?'Ver montagem 3D':time>=DURATION?'Montar de novo':playing?'Pausar':'Continuar';
    toggle.setAttribute('aria-pressed',String(!playing));
    replay.disabled=photoMode;
  }
  function tick(now) {
    frame=0;
    if(!playing||!visible||document.hidden||photoMode)return;
    if(previous)time=Math.min(DURATION,time+Math.min((now-previous)/1000,.06));
    previous=now;paint();
    if(time>=DURATION){playing=false;syncControls();return;}
    frame=requestAnimationFrame(tick);
  }
  function schedule() {previous=0;if(!frame&&playing&&visible&&!document.hidden&&!photoMode)frame=requestAnimationFrame(tick);}
  function pause() {playing=false;cancelAnimationFrame(frame);frame=0;syncControls();}
  function play(restart=false) {
    photoMode=false;root.classList.remove('is-photo');photo.textContent='Ver foto';photo.setAttribute('aria-pressed','false');
    if(restart||time>=DURATION)time=0;
    playing=true;syncControls();schedule();
  }
  toggle.addEventListener('click',()=>photoMode?play():playing?pause():play());
  replay.addEventListener('click',()=>play(true));
  seek.addEventListener('input',()=>{pause();time=Number(seek.value)/100*DURATION;paint();syncControls();});
  photo.addEventListener('click',()=>{
    if(photoMode){play();return;}
    pause();photoMode=true;root.classList.add('is-photo');photo.textContent='Ver 3D';photo.setAttribute('aria-pressed','true');syncControls();
  });
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible){cancelAnimationFrame(frame);frame=0;}else schedule();},{threshold:.01}).observe(root);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule();});
  reducedMotion.addEventListener('change',event=>{if(event.matches){pause();time=DURATION;paint();syncControls();}});
  function resize() {
    const width=root.clientWidth,height=root.clientHeight;
    if(!width||!height)return;
    renderer.setSize(width,height,false);camera.aspect=width/height;
    // O enquadramento também inclui os ingredientes que entram por cima.
    camera.position.z=width<500?9.1:8.1;camera.updateProjectionMatrix();paint();
  }
  new ResizeObserver(resize).observe(root);
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();pause();root.dataset.state='fallback';status.textContent='Manga fresca. Do seu jeito.';});
  root.dataset.renderer=software?'software':'webgl';
  root.dataset.state='ready';resize();syncControls();schedule();
}

document.querySelectorAll('[data-mangou-3d]').forEach(root=>{
  initCup(root).catch(()=>{root.dataset.state='fallback';root.querySelector('[data-cup-status]').textContent='Manga fresca. Do seu jeito.';});
});
