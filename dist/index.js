"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lit_html_1 = require("lit-html");
var bindFactory = function (state, templateFn, element) {
    var bindFn = function (action) {
        return lit_html_1.directive(function (attributePart) {
            if (attributePart.name.indexOf('on') === 0) {
                attributePart.element[attributePart.name] = function (ev) {
                    state = action(ev)(state);
                    lit_html_1.render(templateFn(bindFn, state), element);
                };
            }
        });
    };
    return bindFn;
};
exports.applit = function (init, templateFn, element) {
    if (element === void 0) { element = document.body; }
    var state = init();
    var bindFn = bindFactory(state, templateFn, element);
    lit_html_1.render(templateFn(bindFn, state), element);
    return bindFn;
};
//# sourceMappingURL=index.js.map