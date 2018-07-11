import { html, render } from '../node_modules/lit-html/lit-html.js';

function h(tag, attrs, ...children) {
  return `<${tag}${!attrs ? '' : mapAttrs(attrs)}>${children.length &&
    children}</${tag}>`;
}

function mapAttrs(attrs) {
  let tpl = '';
  Object.keys(attrs).map((key) => {
    let value = attrs[key];
    tpl += ` ${key}="${value}"`;
  });
  return tpl;
}

function template(imgSrc, appName) {
  return h(
    'div',
    { class: 'header__wrap' },
    h(
      'div',
      { class: 'header__logo' },
      h(
        'a',
        { href: '#', class: 'header__link' },
        imgSrc && h('img', { src: imgSrc, alt: 'logo', class: 'header__img' }),
        h('h2', null, appName)
      )
    ),
    h('div', { class: 'header__search' }, 'zoek'),
    h('div', { class: 'header__navigation' }, 'nav')
  );
}

var x = html`${template(
  '//www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png',
  'google'
)}`;
console.log(x);
render(x, document.body);
