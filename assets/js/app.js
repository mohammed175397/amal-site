/* Amal Platform — Shared JS */
(function(){
  const $ = (q, root=document) => root.querySelector(q);
  const $$ = (q, root=document) => Array.from(root.querySelectorAll(q));

  function pageName(){
    const p = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    return p;
  }

  function isAuthPage(p){ return p === 'login.html' || p === 'register.html' || p === 'index.html'; }

  function injectHeaderFooter(){
    const p = pageName();
    if (isAuthPage(p)) return;

    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
      <div class="container header-inner">
        <a class="brand" href="home.html" aria-label="Amal Home">
          <span class="mark">♡</span>
          <span>Amal</span>
        </a>

        <nav class="nav" aria-label="Primary">
          <a href="home.html" data-nav="home">Home</a>
          <a href="about.html" data-nav="about">About Us</a>
          <a href="support.html" data-nav="support">Support</a>
        </nav>

        <div class="header-actions">
          <button class="icon-btn" type="button" title="Notifications" aria-label="Notifications">🔔</button>
          <a class="avatar" href="profile.html" title="Profile" aria-label="Profile">
            <img alt="" src="assets/img/avatar.svg" onerror="this.remove();">
          </a>
          <a class="btn ghost" href="login.html" style="padding:10px 14px;">Logout</a>
        </div>
      </div>
    `;
    document.body.prepend(header);

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="container footer-inner">
        <div class="footer-grid">
          <div class="footer-col">
            <div class="brand" style="margin-bottom:10px;">
              <span class="mark">♡</span><span>Amal</span>
            </div>
            <div class="small muted">Empowering the voices of Gaza through storytelling and community-led recovery.</div>
          </div>

          <div class="footer-col">
            <h4>EXPLORE</h4>
            <a href="home.html">Home</a>
            <a href="about.html">About Us</a>
            <a href="support.html">Support</a>
            <a href="share.html">Share a Story</a>
          </div>

          <div class="footer-col">
            <h4>LEGAL</h4>
            <a href="#" onclick="alert('Demo: Privacy Policy'); return false;">Privacy Policy</a>
            <a href="#" onclick="alert('Demo: Terms of Service'); return false;">Terms of Service</a>
            <a href="#" onclick="alert('Demo: Community Guidelines'); return false;">Community Guidelines</a>
          </div>

          <div class="footer-col">
            <h4>CONNECT</h4>
            <div class='socail-icons'>
              <a href="#" onclick="alert('Demo: Instagram'); return false;">
              <img src='assets/icons/instgram.svg' />
              </a>
              <a href="#" onclick="alert('Demo: Facebook'); return false;">
              <img src='assets/icons/facbook.svg' />
              </a>
              <a href="#" onclick="alert('Demo: X'); return false;">
              <img src='assets/icons/x.svg' />
              </a>
            </div>
            <div style="display:flex;  background-color: #1B431B;
                gap: 5px;
                color: white;
                width: 192px;
                padding: 13px 20px;
                border-radius: 25px;">
              <img src='assets/icons/icon.svg' />
              <a class="btn-contact" href="support.html">Contact Support</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div>© 2024 Amal Platform. All rights reserved.</div>
          <div>Made with ♡ for Gaza</div>
        </div>
      </div>
    `;
    document.body.appendChild(footer);

    const map = {
      "home.html": "home",
      "about.html": "about",
      "support.html": "support"
    };
    const active = map[p];
    if (active){
      const link = header.querySelector(`[data-nav="${active}"]`);
      if (link) link.classList.add('active');
    }

    // floating action button to share story (optional)
    if (!document.querySelector('.fab')){
      const fab = document.createElement('a');
      fab.className = 'btn fab';
      fab.href = 'share.html';
      fab.textContent = '✍️ Share';
      document.body.appendChild(fab);
    }
  }

  function wireAuthForms(){
    const p = pageName();
    if (p === 'index.html') location.replace('login.html');

    if (p === 'login.html'){
      const form = $('#loginForm');
      form?.addEventListener('submit', (e)=>{
        e.preventDefault();
        // Demo: pretend auth succeeded
        location.href = 'home.html';
      });
    }

    if (p === 'register.html'){
      const form = $('#registerForm');
      const photo = $('#photo');
      const img = $('#photoPreview');
      photo?.addEventListener('change', ()=>{
        const f = photo.files?.[0];
        if (!f) return;
        const url = URL.createObjectURL(f);
        img.src = url;
        img.style.display = 'block';
      });

      form?.addEventListener('submit', (e)=>{
        e.preventDefault();
        location.href = 'home.html';
      });
    }
  }

  function wireHome(){
    if (pageName() !== 'home.html') return;

    const textarea = $('#composerText');
    const btn = $('#createStoryBtn');
    const feed = $('#feed');

    function createPost({title, content, locationText}){
      const tpl = document.createElement('article');
      tpl.className = 'card post';
      const now = new Date();
      tpl.innerHTML = `
        <div class="post-head">
          <div class="post-user">
            <div class="avatar"></div>
            <div>
              <div style="font-weight:900">You</div>
              <div class="post-meta">${now.toLocaleString()} • ${locationText || 'Gaza'}</div>
            </div>
          </div>
          <span class="tag">#Hope</span>
        </div>

        <div class="post-body">
          <h3 class="post-title" style="margin:0 0 8px;">${escapeHtml(title || 'New Story')}</h3>
          <div>${escapeHtml(content).replace(/\n/g,'<br>')}</div>
        </div>

        <div class="post-actions">
          <button class="likeBtn" type="button">♡ <span>0</span> Supports</button>
          <button class="commentToggle" type="button">💬 <span>0</span> Comments</button>
        </div>

        <div class="comment-box">
          <div class="row" style="margin-top:12px;">
            <input class="input commentInput" placeholder="Write a supportive comment..." />
            <button class="btn secondary addCommentBtn" type="button" style="padding:10px 14px;">Send</button>
          </div>
          <div class="comments"></div>
        </div>
      `;
      wirePost(tpl);
      feed.prepend(tpl);
    }

    function wirePost(postEl){
      const likeBtn = $('.likeBtn', postEl);
      const commentToggle = $('.commentToggle', postEl);
      const box = $('.comment-box', postEl);
      const add = $('.addCommentBtn', postEl);
      const input = $('.commentInput', postEl);
      const comments = $('.comments', postEl);

      likeBtn?.addEventListener('click', ()=>{
        likeBtn.classList.toggle('active');
        const n = likeBtn.classList.contains('active') ? 1 : 0;
        likeBtn.querySelector('span').textContent = String(n);
      });

      commentToggle?.addEventListener('click', ()=>{
        const open = box.style.display === 'block';
        box.style.display = open ? 'none' : 'block';
      });

      add?.addEventListener('click', ()=>{
        const v = (input.value || '').trim();
        if (!v) return;
        const item = document.createElement('div');
        item.className = 'comment';
        item.innerHTML = `
          <div class="avatar"></div>
          <div>
            <div style="display:flex;justify-content:space-between;gap:10px;">
              <strong>You</strong>
              <span class="tiny muted">${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="small" style="margin-top:4px;">${escapeHtml(v)}</div>
          </div>
        `;
        comments.prepend(item);
        input.value = '';
        // update count
        const span = commentToggle.querySelector('span');
        span.textContent = String(Number(span.textContent || '0') + 1);
      });
    }

    // Wire existing demo posts
    $$('.post', feed).forEach(wirePost);

    btn?.addEventListener('click', ()=>{
      const txt = (textarea.value || '').trim();
      if (!txt) return;
      createPost({
        title: 'A Message of Hope',
        content: txt,
        locationText: 'Gaza City'
      });
      textarea.value = '';
    });
  }

  function wireShare(){
    if (pageName() !== 'share.html') return;

    const file = document.querySelector('#images');
    const preview = document.querySelector('#preview');
    const anon = document.querySelector('#anon');
    const showName = document.querySelector('#showName');
    const submit = document.querySelector('#submitStory');
    const save = document.querySelector('#saveDraft');

    file?.addEventListener('change', ()=>{
      preview.innerHTML = '';
      const files = Array.from(file.files || []).slice(0, 6);
      files.forEach(f=>{
        const url = URL.createObjectURL(f);
        const img = document.createElement('img');
        img.src = url;
        img.alt = '';
        preview.appendChild(img);
      });
    });

    function setPrivacy(which){
      if (which === 'anon'){
        anon.classList.add('active');
        showName.classList.remove('active');
      } else {
        showName.classList.add('active');
        anon.classList.remove('active');
      }
    }
    anon?.addEventListener('click', ()=>setPrivacy('anon'));
    showName?.addEventListener('click', ()=>setPrivacy('name'));

    save?.addEventListener('click', ()=>{
      alert('Saved as draft (demo).');
    });

    submit?.addEventListener('click', ()=>{
      alert('Submitted for review (demo).');
      location.href = 'home.html';
    });
  }

  function escapeHtml(str){
    return String(str)
      .replaceAll('&','&amp;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;')
      .replaceAll('"','&quot;')
      .replaceAll("'","&#039;");
  }

  // Boot
  document.addEventListener('DOMContentLoaded', ()=>{
    injectHeaderFooter();
    wireAuthForms();
    wireHome();
    wireShare();
  });
})();
