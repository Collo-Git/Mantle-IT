/* Mantle IT – site scripts (editable source). No dependencies.
   Build with /tools to produce assets/js/main.min.js. */
(function () {
  'use strict';

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      nav.classList.toggle('open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 759) setOpen(false);
    });
  }

  /* ---- Footer year ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Contact form: build an email and open the visitor's email app ---- */
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  // The recipient lives in one place: the form's action="mailto:…" attribute.
  var to = (form.getAttribute('action') || '').replace(/^mailto:/i, '');

  var field = function (id) { return document.getElementById(id); };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var name = field('name').value.trim();
    var email = field('email').value.trim();
    var subject = field('subject').value.trim() || 'Website enquiry from ' + name;
    var message = field('message').value.trim();

    var body = 'Hello Mantle IT,\r\n\r\n' + message +
      '\r\n\r\nKind regards,\r\n' + name + '\r\n' + email;

    var q = 'subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    var mailto = 'mailto:' + to + '?' + q;
    var gmail = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) +
      '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    // Tell the visitor what is happening, with a fallback if no email app opens.
    if (status) {
      status.textContent = '';
      status.appendChild(document.createTextNode('Opening your email app\u2026 Nothing happened? '));
      var a = document.createElement('a');
      a.href = gmail;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = 'Open in Gmail';
      status.appendChild(a);
      status.appendChild(document.createTextNode(' or email us at ' + to + '.'));
    }

    window.location.href = mailto;
  });
})();
