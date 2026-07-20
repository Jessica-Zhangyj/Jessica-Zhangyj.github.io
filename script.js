(function () {
  var root = document.documentElement;

  /* ---------- theme toggle ---------- */
  document.getElementById('themeToggle').addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ---------- language toggle ---------- */
  function applyLangMeta() {
    var zh = root.dataset.lang === 'zh';
    root.lang = zh ? 'zh-CN' : 'en';
    document.title = zh ? '张语倢 · Yu-chieh Chang' : 'Yu-chieh Chang · Jessica';
  }
  document.getElementById('langToggle').addEventListener('click', function () {
    root.dataset.lang = root.dataset.lang === 'zh' ? 'en' : 'zh';
    try { localStorage.setItem('lang', root.dataset.lang); } catch (e) {}
    applyLangMeta();
  });
  applyLangMeta();

  /* ---------- starfield ---------- */
  var field = document.getElementById('starfield');
  var N = 110;
  for (var i = 0; i < N; i++) {
    var s = document.createElement('div');
    s.className = 'star';
    var size = Math.random() * 2.2 + 0.6;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.animationDelay = (Math.random() * 4).toFixed(2) + 's';
    s.style.animationDuration = (2.5 + Math.random() * 3).toFixed(2) + 's';
    field.appendChild(s);
  }

  /* ---------- reveal on scroll ---------- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('visible'); revealObserver.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

  /* ---------- active nav link ---------- */
  var links = document.querySelectorAll('.nav-links a');
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        links.forEach(function (a) { a.classList.remove('active'); });
        var a = byId[en.target.id];
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach(function (sec) { navObserver.observe(sec); });
})();
