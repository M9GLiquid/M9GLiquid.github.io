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
              I'm Thomas Lundqvist, a Swedish M.Sc. student in Computer Engineering.
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
  </section>
`;
