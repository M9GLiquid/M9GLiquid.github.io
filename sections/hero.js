export const heroHtml = `
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-card">
        <div class="eyebrow">Portfolio · Embedded · AI · Games</div>
        <div class="hero-intro">
          <div class="hero-portrait">
            <div class="portrait-frame hero-portrait-frame">
              <img
                class="portrait-image"
                src="assets/profile.jpg"
                alt="Portrait of Thomas Lundqvist"
                onload="this.parentElement.querySelector('.portrait-fallback').style.display='none';"
                onerror="this.style.display='none'; this.parentElement.querySelector('.portrait-fallback').style.display='flex';"
              />
              <div class="portrait-fallback">TL</div>
            </div>
            <div class="portrait-copy">
              <strong>Thomas Lundqvist</strong>
              <span>Computer and AI enthusiast</span>
            </div>
          </div>

          <div class="hero-copy">
            <p class="lead">
              I'm Thomas Lundqvist, a Swedish M.Sc. graduate in Computer Engineering.
              I like work that sits between software, interaction, and systems thinking.
            </p>
            <div class="cta-row">
              <a class="hero-link" href="#work">My work projects</a>
              <a class="hero-link" href="#projects">My hobby projects</a>
            </div>
          </div>
        </div>
      </div>

      <aside class="glass">
        <div class="stat-grid">
          <div class="stat">
            <small>GitHub repos</small>
            <strong>30+</strong>
          </div>
          <div class="stat">
            <small>Based in</small>
            <strong>Sweden</strong>
          </div>
          <div class="stat">
            <small>Main areas</small>
            <strong>AI, Games & Embedded</strong>
          </div>
          <div class="stat">
            <small>Favorite mode</small>
            <strong>Build and Iterate</strong>
          </div>
        </div>

        <div>
          <p class="muted-copy">
            I build across software systems, game logic, embedded work, and AI-driven tools. 
            I am most interested in projects that mix implementation, experimentation, 
            and problem solving, and I tend to learn fastest when I can prototype ideas in code.
          </p>
        </div>
      </aside>
    </div>

    <div class="wrap career-note">
      <div class="career-note-heading">
        <span class="career-note-status" aria-hidden="true"></span>
        <strong>Open to junior software engineer roles</strong>
      </div>
      <p>
        I'm a recent Computer Engineering M.Sc. graduate who enjoys coding, problem-solving, and understanding computers from software to hardware.
        I build both independently and with AI-assisted tools, and I currently try to spend an hour a day improving my C++.
      </p>
      <div class="career-note-actions" aria-label="Application documents">
        <a class="button primary career-document-link" href="assets/thomas-lundqvist-cv-en.pdf" target="_blank" rel="noreferrer">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M6 2h8l4 4v16H6V2Zm7 2v4h3.6L13 4ZM8 11v2h8v-2H8Zm0 4v2h8v-2H8Z" />
          </svg>
          <span>View CV</span>
        </a>
        <a class="button secondary career-document-link" href="assets/thomas-lundqvist-cover-letter-en.pdf" target="_blank" rel="noreferrer">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M6 2h8l4 4v16H6V2Zm7 2v4h3.6L13 4ZM8 11v2h8v-2H8Zm0 4v2h8v-2H8Z" />
          </svg>
          <span>View cover letter</span>
        </a>
      </div>
    </div>
  </section>
`;
