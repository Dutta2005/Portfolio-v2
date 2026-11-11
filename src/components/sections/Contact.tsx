import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { personalInfo } from "../../data/portfolio";
import SocialLinks from "../ui/SocialLinks";

export default function Contact() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-intro">
        <p className="small-heading">Have something in mind?</p>
        <h2 id="contact-title">Let’s build something useful.</h2>
        <p className="contact-description">For a project, a role, or a conversation about what’s next.</p>
      </div>
      <div className="contact-details">
        <a href={"mailto:" + personalInfo.email} className="contact-email"><Mail size={19} aria-hidden="true" />{personalInfo.email}<ArrowUpRight size={19} aria-hidden="true" /></a>
        <a className="contact-phone" href={"tel:" + personalInfo.phone.replace(/\s/g, "")}><Phone size={15} aria-hidden="true" />{personalInfo.phone}</a>
      </div>
      <SocialLinks showLabels label="Contact social links" />
    </section>
  );
}
