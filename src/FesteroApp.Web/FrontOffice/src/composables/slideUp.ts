/**
 * Aplica animação de "slide up" em um elemento HTML.
 * Colapsa o elemento suavemente até altura zero, ocultando-o ao final.
 *
 * @param elm - Elemento HTML a ser animado
 * @param duration - Duração da animação em milissegundos (padrão: 300ms)
 */
export function slideUp(elm: HTMLElement, duration: number = 300): void {
  if (!elm.classList.contains('transitioning')) {
    elm.classList.add('transitioning');

    elm.style.transitionProperty = 'height, margin, padding';
    elm.style.transitionDuration = `${duration}ms`;
    elm.style.boxSizing = 'border-box';

    // define altura inicial antes de colapsar
    elm.style.height = `${elm.offsetHeight}px`;

    // força reflow
    elm.offsetHeight;

    elm.style.overflow = 'hidden';
    elm.style.height = '0';
    elm.style.paddingTop = '0';
    elm.style.paddingBottom = '0';
    elm.style.marginTop = '0';
    elm.style.marginBottom = '0';

    window.setTimeout(() => {
      elm.style.display = 'none';
      elm.style.removeProperty('height');
      elm.style.removeProperty('padding-top');
      elm.style.removeProperty('padding-bottom');
      elm.style.removeProperty('margin-top');
      elm.style.removeProperty('margin-bottom');
      elm.style.removeProperty('overflow');
      elm.style.removeProperty('transition-duration');
      elm.style.removeProperty('transition-property');
      elm.classList.remove('transitioning');
    }, duration);
  }
}