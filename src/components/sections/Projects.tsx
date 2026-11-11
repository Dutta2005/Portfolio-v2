import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, X } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { personalInfo, projects } from "../../data/portfolio";
import type { Project } from "../../data/portfolio";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links">
      <a href={project.github} target="_blank" rel="noreferrer" aria-label={"View " + project.title + " source on GitHub"}>
        <Github size={15} aria-hidden="true" />Source code
      </a>
      {project.live && <a href={project.live} target="_blank" rel="noreferrer" aria-label={"Open " + project.title + " live site"}>
        Live site<ArrowUpRight size={15} aria-hidden="true" />
      </a>}
    </div>
  );
}

export default function Projects() {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const preview = previewIndex === null ? null : projects[previewIndex];

  const previewOpen = previewIndex !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !previewOpen) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [previewOpen]);

  const changePreview = (direction: number) => {
    setPreviewIndex((index) => index === null ? null : (index + direction + projects.length) % projects.length);
  };

  return (
    <section className="content-section projects-section" id="projects" aria-labelledby="projects-title">
      <div className="projects-heading">
        <div>
          <h2 id="projects-title">Selected projects</h2>
          <p>AI agents, full-stack products, and a closer look at how I build.</p>
        </div>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <article className={"project-card" + (project.featured ? " project-card--wide" : "")} key={project.title}>
            <button className="project-preview" type="button"
              aria-label={"Enlarge " + project.title + " image"}
              aria-haspopup="dialog"
              onClick={() => setPreviewIndex(index)}>
              <img src={project.image} alt={project.imageAlt}
                width={project.imageWidth} height={project.imageHeight}
                loading="lazy" decoding="async" />
              <span className="preview-expand"><Expand size={15} aria-hidden="true" />View image</span>
            </button>
            <div className="project-content">
              <p className="project-category">{project.category}</p>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              {project.detail && <p className="project-detail">{project.detail}</p>}
              <p className="project-tech">{project.tech.join(" / ")}</p>
              <ProjectLinks project={project} />
            </div>
          </article>
        ))}
      </div>
      <div className="projects-more">
        <p>Want to see more projects?</p>
        <a className="button button-secondary" href={personalInfo.github + "?tab=repositories"} target="_blank" rel="noreferrer">
          Browse my repositories <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <dialog className="image-dialog" ref={dialogRef} aria-labelledby="preview-title"
        onCancel={() => setPreviewIndex(null)}
        onClick={(event) => { if (event.target === event.currentTarget) setPreviewIndex(null); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); changePreview(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); changePreview(1); }
        }}>
        {preview && <div className="image-dialog-content">
          <div className="image-dialog-heading">
            <div><h2 id="preview-title">{preview.title}</h2><p>{preview.category}</p></div>
            <button type="button" className="icon-button" onClick={() => setPreviewIndex(null)} aria-label="Close image preview" autoFocus>
              <X size={21} aria-hidden="true" />
            </button>
          </div>
          <div className="image-dialog-stage"><img src={preview.image} alt={preview.imageAlt} /></div>
          <div className="image-dialog-footer">
            <span>{(previewIndex ?? 0) + 1} of {projects.length}</span>
            <div>
              <button type="button" className="icon-button" onClick={() => changePreview(-1)} aria-label="Previous project image"><ArrowLeft size={20} aria-hidden="true" /></button>
              <button type="button" className="icon-button" onClick={() => changePreview(1)} aria-label="Next project image"><ArrowRight size={20} aria-hidden="true" /></button>
            </div>
          </div>
        </div>}
      </dialog>
    </section>
  );
}
