const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const faqItems = [...document.querySelectorAll('.faq-item')];
const form = document.querySelector('[data-contact-form]');
const formMessage = document.querySelector('[data-form-message]');
const toast = document.querySelector('[data-toast]');

const setHeaderState = () => {
  header?.classList.toggle('scrolled', window.scrollY > 12);
};
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

faqItems.forEach((item) => {
  const button = item.querySelector('button');
  const answer = item.querySelector('.faq-answer');
  const icon = button.querySelector('b');

  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';

    faqItems.forEach((other) => {
      const otherButton = other.querySelector('button');
      const otherAnswer = other.querySelector('.faq-answer');
      const otherIcon = otherButton.querySelector('b');
      otherButton.setAttribute('aria-expanded', 'false');
      otherAnswer.hidden = true;
      otherIcon.textContent = '+';
    });

    if (!expanded) {
      button.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
      icon.textContent = '−';
    }
  });
});

const emailLooksValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = '';

  const fields = [...form.querySelectorAll('input, select, textarea')];
  fields.forEach((field) => field.classList.remove('invalid'));

  const invalid = fields.filter((field) => {
    if (!field.required) return false;
    if (!field.value.trim()) return true;
    if (field.type === 'email') return !emailLooksValid(field.value.trim());
    return false;
  });

  if (invalid.length) {
    invalid.forEach((field) => field.classList.add('invalid'));
    invalid[0].focus();
    formMessage.textContent = 'Please complete the highlighted fields before submitting.';
    return;
  }

  form.reset();
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
});

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const reveals = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('visible'));
}
