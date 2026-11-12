(function(){
  // ใส่ Client ID ของ Google ตรงนี้ (ถ้ายังไม่มี ปุ่ม Google จะไม่แสดง)
  var CLIENT_ID = '';
  var KEY = 'vm_user';
  var box = document.getElementById('login');

  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)); }catch(e){ return null; } }
  function save(u){ try{ localStorage.setItem(KEY, JSON.stringify(u)); }catch(e){} }

  function startGame(u){
    window.VM_USER = u; // ใช้ u.id เป็นส่วนหนึ่งของ key เซฟเกมได้
    box.style.display = 'none';
    var s = document.createElement('script');
    s.src = 'js/main.js';
    document.body.appendChild(s);
  }

  function decodeJwt(t){
    var b = t.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
    return JSON.parse(decodeURIComponent(escape(atob(b))));
  }

  function guest(){
    var u = load();
    if(!u || u.type !== 'guest'){
      u = {type:'guest', id:'guest', name:'ผู้เยี่ยมชม'};
      save(u);
    }
    startGame(u);
  }

  function onGoogle(res){
    try{
      var p = decodeJwt(res.credential);
      var u = {type:'google', id:p.sub, name:p.name, email:p.email, pic:p.picture};
      save(u); startGame(u);
    }catch(e){ alert('เข้าสู่ระบบไม่สำเร็จ ลองใหม่อีกครั้ง'); }
  }

  function initGoogle(){
    google.accounts.id.initialize({client_id: CLIENT_ID, callback: onGoogle});
    google.accounts.id.renderButton(document.getElementById('gbtn'),
      {theme:'filled_blue', size:'large', text:'signin_with', width:300});
  }

  function render(){
    var u = load();
    var h = '<div class="box"><h1>VEGGIE<br>MONSTERS</h1>';
    if(u){
      h += '<p>ยินดีต้อนรับ ' + (u.name||'') + '</p>';
      h += '<button class="play" id="goPlay">▶ เล่นต่อ</button>';
      h += '<button class="link" id="goOut">เปลี่ยนบัญชี / ออกจากระบบ</button>';
    } else {
      h += '<p>เลือกวิธีเข้าเกม</p>';
      if(CLIENT_ID) h += '<div id="gbtn"></div><div class="or">หรือ</div>';
      h += '<button class="guest" id="goGuest">เล่นแบบผู้เยี่ยมชม</button>';
    }
    h += '</div>';
    box.innerHTML = h;

    var $ = function(id){ return document.getElementById(id); };
    if($('goPlay')) $('goPlay').onclick = function(){ startGame(u); };
    if($('goGuest')) $('goGuest').onclick = guest;
    if($('goOut')) $('goOut').onclick = function(){
      try{ localStorage.removeItem(KEY); }catch(e){}
      if(window.google && google.accounts) google.accounts.id.disableAutoSelect();
      render();
    };

    if(!u && CLIENT_ID){
      if(window.google && google.accounts) initGoogle();
      else {
        var s = document.createElement('script');
        s.src = 'https://accounts.google.com/gsi/client';
        s.async = true; s.onload = initGoogle;
        document.head.appendChild(s);
      }
    }
  }

  render();
})();
