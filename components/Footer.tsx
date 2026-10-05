export default function Footer() {
  return (
    <footer className="site-footer grain">
      <div className="glow" aria-hidden="true" style={{ position: 'absolute', right: '-10%', top: '-30%', width: '50%', height: '140%', background: 'radial-gradient(ellipse at 60% 40%, rgba(143,190,8,0.16), transparent 65%)', pointerEvents: 'none' }} />
      <div className="footer-inner">
        <p className="footer-cta">
          Great products are built when <span className="accent">design leads</span> and
          engineering shapes them into reality.
        </p>

        <div className="footer-links">
          <a href="mailto:deepthikas123@gmail.com">deepthikas123@gmail.com</a>
          <a href="https://www.linkedin.com/in/deepthika365" target="_blank" rel="noopener noreferrer">
            LinkedIn — deepthika365
          </a>
        </div>

        <div className="footer-base">
          <span className="love">
            Made with <span aria-label="love">♥</span> — Deepthika S
          </span>
          <span>Product Design · Electronics &amp; Communication Engineering</span>
          <span>© {new Date().getFullYear()} Deepthika S. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
