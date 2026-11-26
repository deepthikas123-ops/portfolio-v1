export default function Footer() {
  return <footer className="site-footer index-footer"><div className="footer-inner">
    <p className="index-footer-kicker">END OF CURRENT EXHIBITION</p>
    <p className="footer-cta"><span>Consider this an open collection.</span> <span className="accent">I’m still adding to it.</span></p>
    <div className="footer-links"><a href="mailto:deepthikas123@gmail.com">Email</a><a href="https://www.linkedin.com/in/deepthika365" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="/Deepthika-S-Resume.pdf" download>Résumé</a></div>
    <div className="footer-base"><span>CURATED BY DEEPTHIKA S.</span><span>ART × DESIGN × ENGINEERING</span><span>© {new Date().getFullYear()} · ALL RIGHTS RESERVED</span></div>
  </div></footer>;
}
