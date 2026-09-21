// Main interactivity for dinesh portfolio site

document.addEventListener('DOMContentLoaded', () => {
  // 1. Copy Email to Clipboard
  const copyButtons = document.querySelectorAll('[data-copy-email]');
  const toast = document.getElementById('toast');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-copy-email') || 'dinesh@yarshabyte.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast(`Copied ${email} to clipboard!`);
      } catch (err) {
        showToast(`Email: ${email}`);
      }
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // 2. Smooth Scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // 3. Interactive Parallax for Hero Portrait on fine pointer devices
  const portraitCard = document.querySelector('.portrait-card');
  if (portraitCard && window.matchMedia('(pointer: fine)').matches) {
    portraitCard.addEventListener('mousemove', (e) => {
      const rect = portraitCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      portraitCard.style.transform = `perspective(1000px) rotateY(${x * 0.02}deg) rotateX(${-y * 0.02}deg) scale(1.02)`;
    });

    portraitCard.addEventListener('mouseleave', () => {
      portraitCard.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
    });
  }
});
