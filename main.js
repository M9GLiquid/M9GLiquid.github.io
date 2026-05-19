import { headerHtml } from './sections/header.js?v=20260519a';
import { heroHtml } from './sections/hero.js?v=20260518h';
import { aboutHtml } from './sections/about.js?v=20260518h';
import { skillsHtml } from './sections/skills.js?v=20260518h';
import { projectsHtml } from './sections/projects.js?v=20260518h';
import { workHtml } from './sections/work.js?v=20260518h';
import { contactHtml } from './sections/contact.js?v=20260518h';
import { footerHtml } from './sections/footer.js?v=20260518h';
import { projects } from './data/projects.js?v=20260518h';
import { workProjects } from './data/work-projects.js?v=20260518h';
import { skillGroups } from './data/skills.js?v=20260518h';
import { blogPosts } from './data/blog-posts.js?v=20260518h';

const app = document.getElementById('app');

if (app) {
  app.innerHTML = `
    ${headerHtml}
    <main id="top">
      ${heroHtml}
      ${aboutHtml}
      ${skillsHtml}
      ${projectsHtml}
      ${workHtml}
      ${contactHtml}
    </main>
    ${footerHtml}
  `;
}

const grid = document.getElementById('projectGrid');
const workGrid = document.getElementById('workProjectGrid');
const skillsGrid = document.getElementById('skillsGrid');
const blogPreviewGrid = document.getElementById('blogPreviewGrid');

const normalizeSkill = (value) =>
  value
    .toLowerCase()
    .replace(/c\+\+/g, 'cpp')
    .replace(/c#/g, 'csharp')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const skillMatchMap = new Map(
  skillGroups.flatMap((group) =>
    group.skills.map((skill) => [
      normalizeSkill(skill.label),
      Array.from(new Set(skill.representedProjects.map((project) => normalizeSkill(project))))
    ])
  )
);

const projectCards = [];
const blogPostByProject = new Map([
  ['cchat', 'cchat'],
  ['2d dungeon map nl generator', 'nl-dungeon'],
  ['conquest', 'kingconquest'],
  ['ericsson', 'ericsson-thesis'],
  ['axis communications ab', 'axis-thesis'],
  ['hms networks', 'hms-networks']
]);

const projectLinksHtml = ({ repo, blogPost }) => {
  const links = [];

  if (repo) {
    links.push(`<a href="${repo}" target="_blank" rel="noreferrer">Open repo</a>`);
  }

  if (blogPost) {
    links.push(`<a href="about.html#${blogPost}">Read blog</a>`);
  }

  return links.length ? `<div class="project-links">${links.join('')}</div>` : '';
};

if (blogPreviewGrid) {
  blogPosts
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)
    .forEach((post) => {
      const card = document.createElement('a');
      card.className = 'timeline-card timeline-card-link';
      card.href = `about.html#${post.id}`;
      card.innerHTML = `
        <div class="story-meta">
          <small>${post.category}</small>
          <time datetime="${post.date}">${post.displayDate}</time>
        </div>
        <h3>${post.title}</h3>
        <p>
          ${post.excerpt}
          <span class="card-more">Read -></span>
        </p>
      `;
      blogPreviewGrid.appendChild(card);
    });
}

if (grid) {
  projects.forEach((project) => {
    const blogPost = blogPostByProject.get(normalizeSkill(project.title));
    const card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.project = normalizeSkill(project.title);
    card.id = `project-${normalizeSkill(project.title).replace(/\s+/g, '-')}`;
    card.innerHTML = `
      <div class="project-top">
        <div>
          <h3 class="project-title">${project.title}</h3>
          <div class="project-kind">${project.kind}</div>
        </div>
        <div class="project-active">${project.active}</div>
      </div>
      <p>${project.text}</p>
      <div class="meta">
        ${project.stack.map((item) => `<span>${item}</span>`).join('')}
      </div>
      ${projectLinksHtml({ repo: project.repo, blogPost })}
    `;
    grid.appendChild(card);
    projectCards.push(card);
  });
}

if (workGrid) {
  workProjects.forEach((project) => {
    const blogPost = blogPostByProject.get(normalizeSkill(project.title));
    const card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.project = normalizeSkill(project.title);
    card.id = `work-${normalizeSkill(project.title).replace(/\s+/g, '-')}`;
    card.innerHTML = `
      <div class="project-top">
        <div>
          <h3 class="project-title">${project.title}</h3>
          <div class="project-kind">${project.kind}</div>
        </div>
        <div class="project-active">${project.active}</div>
      </div>
      <p>${project.text}</p>
      <div class="meta">
        ${project.stack.map((item) => `<span>${item}</span>`).join('')}
      </div>
      ${projectLinksHtml({ blogPost })}
    `;
    workGrid.appendChild(card);
    projectCards.push(card);
  });
}

if (skillsGrid) {
  const card = document.createElement('article');
  card.className = 'timeline-card skill-card skill-card--full';
  card.innerHTML = skillGroups
    .map(
      (group) => `
        <section class="skill-group">
          <h3>${group.title}</h3>
          <div class="skill-list">
            ${group.skills
              .map((skill) => `<button class="skill-chip" type="button" data-skill="${normalizeSkill(skill.label)}">${skill.label}</button>`)
              .join('')}
          </div>
        </section>
      `
    )
    .join('');
  skillsGrid.appendChild(card);

  const chips = Array.from(skillsGrid.querySelectorAll('.skill-chip'));
  let activeSkill = '';

  const applySkillFilter = () => {
    chips.forEach((chip) => {
      chip.classList.toggle('is-active', chip.dataset.skill === activeSkill);
    });

    projectCards.forEach((card) => {
      const requiredProjects = skillMatchMap.get(activeSkill) || [];
      const matches = !activeSkill || requiredProjects.includes(card.dataset.project);
      card.classList.toggle('is-muted', Boolean(activeSkill) && !matches);
      card.classList.toggle('is-highlighted', Boolean(activeSkill) && matches);
    });
  };

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      activeSkill = activeSkill === chip.dataset.skill ? '' : chip.dataset.skill;
      applySkillFilter();
    });
  });
}
