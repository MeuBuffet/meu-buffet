/**
 * Aplica animação de "slide down" em um elemento HTML.
 * Expande o elemento suavemente a partir de height 0 até seu valor natural.
 *
 * @param elm - Elemento HTML a ser animado
 * @param duration - Duração da animação em milissegundos (padrão: 300ms)
 */
export function slideDown(elm: HTMLElement, duration: number = 300): void {
  if (!elm.classList.contains('transitioning')) {
    elm.classList.add('transitioning');
    elm.style.removeProperty('display');

    let display = window.getComputedStyle(elm).display;
    if (display === 'none') display = 'block';

    elm.style.display = display;

    const height = elm.offsetHeight;

    elm.style.overflow = 'hidden';
    elm.style.height = '0';
    elm.style.paddingTop = '0';
    elm.style.paddingBottom = '0';
    elm.style.marginTop = '0';
    elm.style.marginBottom = '0';

    // força reflow
    elm.offsetHeight;

    elm.style.boxSizing = 'border-box';
    elm.style.transitionProperty = 'height, margin, padding';
    elm.style.transitionDuration = `${duration}ms`;
    elm.style.height = `${height}px`;

    elm.style.removeProperty('padding-top');
    elm.style.removeProperty('padding-bottom');
    elm.style.removeProperty('margin-top');
    elm.style.removeProperty('margin-bottom');

    window.setTimeout(() => {
      elm.style.removeProperty('height');
      elm.style.removeProperty('overflow');
      elm.style.removeProperty('transition-duration');
      elm.style.removeProperty('transition-property');
      elm.classList.remove('transitioning');
    }, duration);
  }
}
