import { headerHtml } from './sections/header.js';
import { heroHtml } from './sections/hero.js';
import { aboutHtml } from './sections/about.js';
import { skillsHtml } from './sections/skills.js';
import { projectsHtml } from './sections/projects.js';
import { workHtml } from './sections/work.js';
import { contactHtml } from './sections/contact.js';
import { footerHtml } from './sections/footer.js';
import { projects } from './data/projects.js';
import { workProjects } from './data/work-projects.js';
import { skillGroups } from './data/skills.js';

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

if (grid) {
  projects.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.project = normalizeSkill(project.title);
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
      <div class="project-links">
        <a href="${project.repo}" target="_blank" rel="noreferrer">Open repo</a>
      </div>
    `;
    grid.appendChild(card);
    projectCards.push(card);
  });
}

if (workGrid) {
  workProjects.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.project = normalizeSkill(project.title);
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
