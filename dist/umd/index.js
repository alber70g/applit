(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../node_modules/lit-html/lib/lit-extended", "../node_modules/lit-html/lit-html"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const lit_extended_1 = require("../node_modules/lit-html/lib/lit-extended");
    const lit_html_1 = require("../node_modules/lit-html/lit-html");
    const bindViewFactory = (state, templateFn, element) => {
        const bindFn = (templateFn, element) => (action) => {
            state = action()(state);
            lit_extended_1.render(templateFn(bindViewFn, state), element);
        };
        const bindViewFn = (action) => {
            return lit_html_1.directive((attributePart) => {
                if (attributePart.name.indexOf('on') === 0) {
                    // element.onclick = () => {}
                    attributePart.element[attributePart.name] = (ev) => {
                        state = action(ev)(state);
                        lit_extended_1.render(templateFn(bindViewFn, state), element);
                    };
                }
            });
        };
        return { bindViewFn, bindFn };
    };
    exports.applit = (init, templateFn, element = document.body) => {
        const state = init();
        const viewFns = bindViewFactory(state, templateFn, element);
        const bindFn = viewFns.bindFn(templateFn, element);
        lit_extended_1.render(templateFn(viewFns.bindViewFn, state), element);
        return bindFn;
    };
});
//# sourceMappingURL=index.js.map