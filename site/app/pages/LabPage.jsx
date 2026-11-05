import { useEffect, useState } from 'react';
import { Shell } from '../components/Shell';
import { LabEditor } from '../components/LabEditor';
import { LabContent, initialPrompt } from './LabContent';
import '../styles/lab.css';
const sections = [
  ['intro-title', '设计从关系开始'],
  ['framework-title', '材料、组织与使用'],
  ['lab-title', '协调实验'],
  ['pattern-lab-title', '巧思与反馈'],
  ['elements-title', '设计元素'],
  ['principles-title', '组织原则'],
  ['workflow-title', '制作前的问题'],
  ['prompt-title', '设计 Prompt'],
  ['sources-title', '来源依据'],
];
export default function LabPage() {
  const embedded = new URLSearchParams(location.search).get('embed') === 'home';
  const [promptText, setPromptText] = useState(initialPrompt);
  const [active, setActive] = useState('intro-title');
  useEffect(() => {
    if (embedded) {
      document.documentElement.dataset.labEmbed = 'home';
      return () => {
        delete document.documentElement.dataset.labEmbed;
      };
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sections.forEach(([id]) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    if (location.hash)
      requestAnimationFrame(() =>
        document
          .getElementById(decodeURIComponent(location.hash.slice(1)))
          ?.scrollIntoView(),
      );
    return () => observer.disconnect();
  }, [embedded]);
  const experiment = <LabEditor promptText={promptText} embedded={embedded} />;
  if (embedded)
    return (
      <div className="lab-page lab-embed">
        <div className="page">{experiment}</div>
      </div>
    );
  const directory = (
    <nav className="lab-section-links" aria-label="实验室目录">
      {sections.map(([id, label]) => (
        <a
          key={id}
          href={'#' + id}
          aria-current={active === id ? 'location' : void 0}
          data-close-directory
          onClick={() => setActive(id)}
        >
          {label}
        </a>
      ))}
    </nav>
  );
  return (
    <Shell
      page="lab"
      directory={directory}
      className="lab-page"
      mainClassName="page"
    >
      <LabContent
        experiment={experiment}
        promptText={promptText}
        onPromptTextChange={setPromptText}
      />
    </Shell>
  );
}
