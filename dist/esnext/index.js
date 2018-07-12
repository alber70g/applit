import { render } from '../node_modules/lit-html/lib/lit-extended';
import { directive, } from '../node_modules/lit-html/lit-html';
const bindViewFactory = (state, templateFn, element) => {
    const bindFn = (templateFn, element) => (action) => {
        state = action()(state);
        render(templateFn(bindViewFn, state), element);
    };
    const bindViewFn = (action) => {
        return directive((attributePart) => {
            if (attributePart.name.indexOf('on') === 0) {
                // element.onclick = () => {}
                attributePart.element[attributePart.name] = (ev) => {
                    state = action(ev)(state);
                    render(templateFn(bindViewFn, state), element);
                };
            }
        });
    };
    return { bindViewFn, bindFn };
};
export const applit = (init, templateFn, element = document.body) => {
    const state = init();
    const viewFns = bindViewFactory(state, templateFn, element);
    const bindFn = viewFns.bindFn(templateFn, element);
    render(templateFn(viewFns.bindViewFn, state), element);
    return bindFn;
};
//# sourceMappingURL=index.js.map