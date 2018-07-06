"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lit_html_1 = require("lit-html");
var bindViewFactory = function (state, templateFn, element) {
    var bindFn = function (templateFn, element) { return function (action) {
        state = action()(state);
        lit_html_1.render(templateFn(bindViewFn, state), element);
    }; };
    var bindViewFn = function (action) {
        return lit_html_1.directive(function (attributePart) {
            if (attributePart.name.indexOf('on') === 0) {
                // element.onclick = () => {}
                attributePart.element[attributePart.name] = function (ev) {
                    state = action(ev)(state);
                    lit_html_1.render(templateFn(bindViewFn, state), element);
                };
            }
        });
    };
    return { bindViewFn: bindViewFn, bindFn: bindFn };
};
exports.applit = function (init, templateFn, element) {
    if (element === void 0) { element = document.body; }
    var state = init();
    var viewFns = bindViewFactory(state, templateFn, element);
    var bindFn = viewFns.bindFn(templateFn, element);
    lit_html_1.render(templateFn(viewFns.bindViewFn, state), element);
    return bindFn;
};
//# sourceMappingURL=index.js.map