"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lit_html_1 = require("lit-html");
var lit_html_2 = require("lit-html");
var bindFactory = function (state, view, element) { return function (action, bindFn) {
    return lit_html_2.directive(function (part) {
        if (part.name.indexOf('on') === 0) {
            // part.element.onclick = () => {}
            part.element[part.name] = function (ev) {
                state = action(ev)(state);
                lit_html_1.render(view(bindFn, state), element);
            };
        }
    });
}; };
exports.applit = function (init, view, element) {
    if (element === void 0) { element = document.body; }
    var initState = init();
    var bindFn = bindFactory(initState, view, element);
    lit_html_1.render(view(bindFn, initState), element);
};
//# sourceMappingURL=index.js.map