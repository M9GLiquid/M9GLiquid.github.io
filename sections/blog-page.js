import { siteHeaderHtml } from './header.js?v=20260518h';
import { footerHtml } from './footer.js?v=20260518h';
import { blogGalleries } from '../data/blog-galleries.js?v=20260518m';
import { relatedPostLinks } from '../data/blog-related.js?v=20260518m';

const POSTS_PER_PAGE = 5;
const NEW_POST_WINDOW_DAYS = 45;

const createRelatedCard = (links) => {
  const card = document.createElement('div');
  card.className = 'related-card';
  card.innerHTML = `
    <h3>Related</h3>
    <div class="related-links">
      ${links
        .map((link) => {
          const content = `
            <span>${link.label}</span>
            <strong>${link.title}</strong>
          `;

          return link.href
            ? `<a class="related-link" href="${link.href}" ${link.external ? 'target="_blank" rel="noreferrer"' : ''}>${content}</a>`
            : `<div class="related-link is-disabled">${content}</div>`;
        })
        .join('')}
    </div>
  `;
  return card;
};

const scrollToHashPost = () => {
  if (!window.location.hash) return;

  const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
  if (target && !target.hidden) {
    target.scrollIntoView();
  }
};

export const initBlogPage = () => {
  document.getElementById('siteHeader').innerHTML = siteHeaderHtml({
    homeHref: 'index.html',
    sectionPrefix: 'index.html'
  });
  document.getElementById('siteFooter').innerHTML = footerHtml;

  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('imageModalImg');
  const closeButtons = modal.querySelectorAll('.image-modal-close, .image-modal-backdrop');
  const galleryModal = document.getElementById('galleryModal');
  const galleryModalImg = document.getElementById('galleryModalImg');
  const galleryModalCaption = document.getElementById('galleryModalCaption');
  const galleryModalCounter = document.getElementById('galleryModalCounter');
  const galleryCloseButtons = galleryModal.querySelectorAll('.gallery-modal-close, .gallery-modal-backdrop');
  const galleryPrev = galleryModal.querySelector('.gallery-modal-prev');
  const galleryNext = galleryModal.querySelector('.gallery-modal-next');
  const blogList = document.querySelector('.story-layout');
  const filterButtons = document.querySelectorAll('.blog-filter-chip');
  const pagination = document.getElementById('blogPagination');
  const blogPosts = Array.from(document.querySelectorAll('.story-card[data-blog-category]'));

  let activeGallery = [];
  let activeGalleryIndex = 0;
  let activeFilter = 'all';
  let activePage = 1;

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
    modalImg.alt = '';
  };

  const renderGalleryImage = () => {
    const photo = activeGallery[activeGalleryIndex];
    if (!photo) return;

    galleryModalImg.src = photo.src;
    galleryModalImg.alt = photo.alt;
    galleryModalCaption.textContent = photo.caption;
    galleryModalCounter.textContent = `${activeGalleryIndex + 1} / ${activeGallery.length}`;
    galleryPrev.disabled = activeGalleryIndex === 0;
    galleryNext.disabled = activeGalleryIndex === activeGallery.length - 1;
  };

  const openGallery = (galleryKey) => {
    activeGallery = blogGalleries[galleryKey] || [];
    activeGalleryIndex = 0;
    if (!activeGallery.length) return;

    closeModal();
    renderGalleryImage();
    galleryModal.classList.add('is-open');
    galleryModal.setAttribute('aria-hidden', 'false');
  };

  const closeGallery = () => {
    galleryModal.classList.remove('is-open');
    galleryModal.setAttribute('aria-hidden', 'true');
    galleryModalImg.src = '';
    galleryModalImg.alt = '';
    activeGallery = [];
    activeGalleryIndex = 0;
  };

  const showGalleryOffset = (offset) => {
    if (!activeGallery.length) return;
    activeGalleryIndex = Math.min(Math.max(activeGalleryIndex + offset, 0), activeGallery.length - 1);
    renderGalleryImage();
  };

  const sortedPosts = blogPosts.sort((a, b) => {
    const aDate = a.querySelector('time')?.dateTime || '';
    const bDate = b.querySelector('time')?.dateTime || '';
    return bDate.localeCompare(aDate);
  });

  sortedPosts.forEach((post) => {
    const links = relatedPostLinks[post.id];
    if (links && !post.querySelector('.related-card')) {
      post.appendChild(createRelatedCard(links));
    }
    blogList.insertBefore(post, pagination);
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  sortedPosts.forEach((post) => {
    const dateValue = post.querySelector('time')?.dateTime;
    if (!dateValue) return;

    const postDate = new Date(`${dateValue}T00:00:00`);
    if (postDate > today) {
      post.dataset.future = 'true';
      post.classList.add('is-upcoming');
      return;
    }

    const ageInDays = (today - postDate) / (1000 * 60 * 60 * 24);
    if (ageInDays <= NEW_POST_WINDOW_DAYS) {
      post.classList.add('is-new');
    }
  });

  const filterCounts = [...filterButtons].reduce((counts, button) => {
    counts[button.dataset.filter] = 0;
    return counts;
  }, {});

  sortedPosts.forEach((post) => {
    const isFuture = post.dataset.future === 'true';
    filterCounts.all += 1;
    if (!isFuture && post.dataset.blogCategory in filterCounts) {
      filterCounts[post.dataset.blogCategory] += 1;
    }
    if (isFuture) {
      filterCounts['coming-soon'] += 1;
    }
  });

  filterButtons.forEach((button) => {
    const count = document.createElement('span');
    count.className = 'blog-filter-count';
    const value = filterCounts[button.dataset.filter] ?? 0;
    count.textContent = value;
    count.setAttribute('aria-hidden', 'true');
    button.setAttribute('aria-label', `${button.dataset.filter === 'all' ? 'All posts' : button.textContent.trim()}, ${value} posts`);
    button.append(count);
  });

  const filteredPosts = () => sortedPosts.filter((post) => {
    const isFuture = post.dataset.future === 'true';
    return activeFilter === 'all'
      || (activeFilter === 'coming-soon' && isFuture)
      || (!isFuture && post.dataset.blogCategory === activeFilter);
  });

  const renderPagination = (posts) => {
    const pageCount = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
    activePage = Math.min(Math.max(activePage, 1), pageCount);

    if (pageCount <= 1) {
      pagination.innerHTML = '';
      pagination.hidden = true;
      return;
    }

    pagination.hidden = false;
    pagination.innerHTML = `
      <button class="blog-page-button" type="button" data-page-action="prev" ${activePage === 1 ? 'disabled' : ''}>Previous</button>
      <span class="blog-page-status">Page ${activePage} of ${pageCount}</span>
      <button class="blog-page-button" type="button" data-page-action="next" ${activePage === pageCount ? 'disabled' : ''}>Next</button>
    `;
  };

  const renderPosts = ({ scroll = false } = {}) => {
    const posts = filteredPosts();
    const start = (activePage - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;

    sortedPosts.forEach((post) => {
      post.hidden = !posts.slice(start, end).includes(post);
    });

    renderPagination(posts);

    if (scroll) {
      blogList.scrollIntoView();
    }
  };

  const showPostFromHash = () => {
    if (!window.location.hash) return false;

    const id = decodeURIComponent(window.location.hash.slice(1));
    const targetIndex = sortedPosts.findIndex((post) => post.id === id);
    if (targetIndex === -1) return false;

    activeFilter = 'all';
    activePage = Math.floor(targetIndex / POSTS_PER_PAGE) + 1;
    filterButtons.forEach((chip) => {
      chip.classList.toggle('is-active', chip.dataset.filter === 'all');
    });
    renderPosts();
    requestAnimationFrame(() => requestAnimationFrame(scrollToHashPost));
    return true;
  };

  document.querySelectorAll('.image-modal-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      modalImg.src = trigger.dataset.fullSrc;
      modalImg.alt = trigger.dataset.fullAlt || '';
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  document.querySelectorAll('.photo-stack').forEach((button) => {
    button.addEventListener('click', () => {
      openGallery(button.dataset.gallery);
    });
  });

  galleryCloseButtons.forEach((button) => {
    button.addEventListener('click', closeGallery);
  });

  galleryPrev.addEventListener('click', () => {
    showGalleryOffset(-1);
  });

  galleryNext.addEventListener('click', () => {
    showGalleryOffset(1);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
    if (event.key === 'Escape' && galleryModal.classList.contains('is-open')) {
      closeGallery();
    }
    if (event.key === 'ArrowLeft' && galleryModal.classList.contains('is-open')) {
      showGalleryOffset(-1);
    }
    if (event.key === 'ArrowRight' && galleryModal.classList.contains('is-open')) {
      showGalleryOffset(1);
    }
  });

  document.querySelectorAll('.story-image img').forEach((image) => {
    image.addEventListener('error', () => {
      const figure = image.closest('.story-image');
      if (figure) {
        figure.hidden = true;
      }
    });
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      activePage = 1;

      filterButtons.forEach((chip) => {
        chip.classList.toggle('is-active', chip === button);
      });

      renderPosts({ scroll: true });
    });
  });

  pagination.addEventListener('click', (event) => {
    const button = event.target.closest('[data-page-action]');
    if (!button) return;

    activePage += button.dataset.pageAction === 'next' ? 1 : -1;
    renderPosts({ scroll: true });
  });

  if (!showPostFromHash()) {
    renderPosts();
  }

  window.addEventListener('hashchange', showPostFromHash);
  window.addEventListener('load', () => {
    window.setTimeout(scrollToHashPost, 300);
    window.setTimeout(scrollToHashPost, 1000);
  });
};
