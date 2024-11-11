import mermaid from 'mermaid';
import type { SdDemo } from './components/sd-demo/sd-demo';

const themeAttr = 'data-theme'; // starlight theme attribute

async function renderMermaid(theme: 'dark' | 'light') {
  mermaid.initialize({
    startOnLoad: false,
    theme,
  });
  const elements = [...document.querySelectorAll<HTMLPreElement>('pre.mermaid')];

  [...elements].map((el: HTMLPreElement & { graphDefinition?: string | null }) => {
    // we're storing the original graph definition
    // because mermaid's render will change the innerText
    // and we need to be able to re-render on theme swap
    const graphDefinition = el.graphDefinition ?? el.textContent;
    el.graphDefinition = graphDefinition;
    el.textContent = graphDefinition;
    el.removeAttribute('data-processed');
  });
  mermaid.run({ querySelector: 'pre.mermaid', suppressErrors: true });

  [...elements].forEach((el) => {
    el.classList.remove('hidden');
  });
}

async function swapTheme(theme: 'dark' | 'light') {
  await renderMermaid(theme);
  const demoTag = 'sd-demo';
  await customElements.whenDefined(demoTag);
  const sdDemos = document.querySelectorAll(demoTag) as NodeListOf<SdDemo>;
  [...sdDemos].forEach((demo) => {
    demo.hasInitialized.then(() => {
      demo.editor._themeService.setTheme(`my-${theme}-theme`);
    });
  });
}

function handleThemeChange() {
  // MutationObserver that watches the starlight theme attribute for changes, which is handled by the theme toggler
  const themeObserver = new MutationObserver((mutationList) => {
    for (const mutation of mutationList) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === themeAttr &&
        mutation.target instanceof HTMLElement
      ) {
        // this will be called once initially when the initial theme is set on page load
        swapTheme(mutation.target.getAttribute(themeAttr) as 'dark' | 'light');
      }
    }
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [themeAttr],
  });
}

function lazilyLoadCEs(CEs: string[]) {
  CEs.forEach((CE) => {
    const firstInstance = document.querySelector(CE);
    if (firstInstance) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Conditionally load the Web Component definition if we find an instance of it.
            import(`./components/${CE}/${CE}.ts`);
          }
        });
      });
      observer.observe(firstInstance);
    }
  });
}

async function setup() {
  handleThemeChange();
  lazilyLoadCEs(['sd-demo']);
}
setup();
