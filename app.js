const $ = (s) => document.querySelector(s);
const fileInput = $('#fileInput');
const preview = $('#preview');
const previewWrap = $('#previewWrap');
const dropzone = $('#dropzone');
const roastOutput = $('#roastOutput');
let selectedFile = null;
let stream = null;

function openPicker(){ fileInput.click(); }
$('#heroUpload').onclick = openPicker;
$('#navUpload').onclick = openPicker;
$('#chooseBtn').onclick = openPicker;
$('#cameraBtn2').onclick = () => openCamera();
$('#cameraBtn').onclick = () => openCamera();

fileInput.addEventListener('change', e => {
  if(e.target.files?.[0]) setPhoto(e.target.files[0]);
});

['dragenter','dragover'].forEach(ev => dropzone.addEventListener(ev, e => {
  e.preventDefault(); dropzone.style.borderColor = '#c9ff39';
}));
['dragleave','drop'].forEach(ev => dropzone.addEventListener(ev, e => {
  e.preventDefault(); dropzone.style.borderColor = '';
}));
dropzone.addEventListener('drop', e => {
  const file = e.dataTransfer.files?.[0];
  if(file && file.type.startsWith('image/')) setPhoto(file);
});

function setPhoto(file){
  selectedFile = file;
  const url = URL.createObjectURL(file);
  preview.src = url;
  dropzone.classList.add('hidden');
  previewWrap.classList.remove('hidden');
  roastOutput.innerHTML = `<div class="output-empty"><span>🔥</span><h3>READY TO COOK</h3><p>Button dabao. AI endpoint connected ho to real generation yahan aayegi.</p></div>`;
}

$('#clearBtn').onclick = () => {
  selectedFile = null;
  preview.src = '';
  previewWrap.classList.add('hidden');
  dropzone.classList.remove('hidden');
};

$('#cookBtn').onclick = async () => {
  if(!selectedFile) return;
  roastOutput.innerHTML = `<div class="output-empty"><span>💀</span><h3>AI COOKING...</h3><p>Confidence detect ho rahi hai...</p></div>`;
  // Static GitHub Pages demo: creates a roast-card locally.
  // For real AI generation, replace the demo block with a POST to your own server endpoint.
  await new Promise(r => setTimeout(r, 900));
  const img = preview.src;
  const captions = [
    'BRO THINKS HE IS THE MAIN CHARACTER.',
    'CONFIDENCE: 100%. PLAN: CLASSIFIED.',
    'MUMMY NE BULAYA. LEGENDARY CAREER INTERRUPTED.',
    '5 MINUTES BOLA THA. 3 HOURS HO GAYE.',
    'AI NE PHOTO DEKHI. AI NE BHI SOCHA: BHAI KYUN?'
  ];
  const caption = captions[Math.floor(Math.random()*captions.length)];
  roastOutput.innerHTML = `
    <div class="output-result">
      <img src="${img}" alt="Generated roast preview">
      <div class="result-text"><b>ROASTED AI DEMO</b><br>${caption}</div>
      <button class="primary small" id="downloadRoast">⬇ Download</button>
    </div>`;
  $('#downloadRoast').onclick = () => downloadImage(img, caption);
};

function downloadImage(src, caption){
  const c = document.createElement('canvas');
  c.width = 1080; c.height = 1350;
  const ctx = c.getContext('2d');
  const im = new Image();
  im.onload = () => {
    ctx.fillStyle='#08080b'; ctx.fillRect(0,0,c.width,c.height);
    const scale = Math.min(960/im.width, 920/im.height);
    const w=im.width*scale,h=im.height*scale;
    ctx.drawImage(im,(c.width-w)/2,80,w,h);
    ctx.fillStyle='#c9ff39'; ctx.font='900 48px Arial'; ctx.fillText('ROASTED 💀',50,1140);
    ctx.fillStyle='white'; ctx.font='900 40px Arial'; wrapText(ctx,caption,50,1210,980,50);
    const a=document.createElement('a'); a.download='roasted-ai-demo.png'; a.href=c.toDataURL('image/png'); a.click();
  };
  im.src=src;
}
function wrapText(ctx,text,x,y,maxWidth,lineHeight){
  const words=text.split(' '); let line='';
  for(const word of words){
    const test=line+word+' ';
    if(ctx.measureText(test).width>maxWidth && line){ctx.fillText(line,x,y);line=word+' ';y+=lineHeight;}
    else line=test;
  }
  ctx.fillText(line,x,y);
}

async function openCamera(){
  $('#cameraModal').classList.remove('hidden');
  $('#cameraStatus').textContent='';
  try{
    stream = await navigator.mediaDevices.getUserMedia({video:true,audio:false});
    $('#cameraVideo').srcObject = stream;
  }catch(err){
    $('#cameraStatus').textContent='Camera permission nahi mili. Gallery upload try karo.';
  }
}
function closeCamera(){
  $('#cameraModal').classList.add('hidden');
  if(stream){stream.getTracks().forEach(t=>t.stop());stream=null;}
}
$('#closeCamera').onclick = closeCamera;
$('#captureBtn').onclick = () => {
  const v=$('#cameraVideo'), c=$('#cameraCanvas');
  c.width=v.videoWidth||720; c.height=v.videoHeight||720;
  c.getContext('2d').drawImage(v,0,0,c.width,c.height);
  c.toBlob(blob => {
    const file = new File([blob],'camera-photo.jpg',{type:'image/jpeg'});
    closeCamera(); setPhoto(file);
    document.querySelector('.creator').scrollIntoView({behavior:'smooth'});
  },'image/jpeg',.92);
};

$('#shuffleBtn').onclick = () => {
  const wall=$('#memeWall');
  [...wall.children].sort(()=>Math.random()-.5).forEach(el=>wall.appendChild(el));
};

// Keyboard shortcut: U = upload
document.addEventListener('keydown', e => {
  if(e.key.toLowerCase()==='u' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) openPicker();
});
