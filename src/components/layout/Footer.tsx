import SocialLinks from "../ui/SocialLinks";

export default function Footer() {
  return (
    <footer className="site-footer page-shell">
      <div className="footer-credit"><p>© {new Date().getFullYear()} Raj Dutta</p><span className="personal-signoff">Har Har Mahadev.</span></div>
      <div className="footer-links"><SocialLinks label="Footer social links" /><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}
