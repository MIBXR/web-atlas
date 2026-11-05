import { caseNoteSections } from '../site/app/domain/case-notes.mjs';

const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const anchor = ({ href, text }) => `<a href="${escape(href)}">${escape(text)}</a>`;

function renderBlock(block) {
  switch (block.type) {
    case 'paragraph': return `<p>${escape(block.text)}</p>`;
    case 'heading': return `<h3>${escape(block.text)}</h3>`;
    case 'list': return '<ul>' + block.values.map(value => `<li>${escape(value)}</li>`).join('') + '</ul>';
    case 'link': return anchor(block);
    case 'links': return '<ul>' + block.values.map(value => `<li>${anchor(value)}</li>`).join('') + '</ul>';
    case 'definitions': return '<dl>' + block.values.map(([term, value]) => `<div><dt>${escape(term)}</dt><dd>${escape(value)}</dd></div>`).join('') + '</dl>';
    case 'palette': return '<div class="swatches">' + block.values.map(color => `<span><i style="background:${escape(color)}"></i>${escape(color)}</span>`).join('') + '</div>';
    case 'prompt': return `<textarea aria-label="可复用 Prompt" readonly>${escape(block.text)}</textarea><details><summary>负面约束 / Negative Prompt</summary><p>${escape(block.negative)}</p></details>`;
    case 'sources': return block.values.map(source => `<div class="source-item"><span>${escape(source.type)}</span>${anchor({ href: source.url, text: source.title })}<p>${escape(source.note)}</p></div>`).join('');
    default: throw new Error(`Unknown case note block: ${block.type}`);
  }
}

export function renderDetailNotes({ entries, patterns, id }) {
  const entry = entries.find(entry => entry.id === id);
  const notes = caseNoteSections(entry, patterns).map(section => `<section><h2>${escape(section.title)}</h2>${section.blocks.map(renderBlock).join('')}</section>`).join('');
  return { html: `<aside class="notes">${notes}</aside>`, notes };
}
