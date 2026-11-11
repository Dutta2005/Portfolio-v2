import { Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { socialLinks } from "../../data/portfolio";

const icons = { github: FaGithub, linkedin: FaLinkedinIn, twitter: FaXTwitter, instagram: FaInstagram, email: Mail };

export default function SocialLinks({ showLabels = false, label = "Social links" }: { showLabels?: boolean; label?: string }) {
  return (
    <ul className={"social-links" + (showLabels ? " social-links--labeled" : "")} aria-label={label}>
      {socialLinks.map((social) => {
        const Icon = icons[social.id];
        const external = social.href.startsWith("https://");
        return (
          <li key={social.id}>
            <a href={social.href} aria-label={social.label} title={social.label}
              target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
              <Icon size={18} aria-hidden="true" />
              {showLabels && <span>{social.label}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
