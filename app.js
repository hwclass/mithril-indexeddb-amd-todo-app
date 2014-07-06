/*app module for todo application*/
var app = {};

app.Todo = function(data) {
    this.description = m.prop(data.description);
    this.done = m.prop(false);
};

app.TodoList = Array;

app.controller = function() {
    this.list = new app.TodoList();
    this.description = m.prop("");
    this.add = function() {
        if (this.description()) {
            this.list.push(new app.Todo({description: this.description()}));
            this.description("");
        }
    }.bind(this);
};

app.view = function(ctrl) {
    return m("html", [
        m("body", [
            m("input", {onchange: m.withAttr("value", ctrl.description), value: ctrl.description()}),
            m("button", {onclick: ctrl.add}, "Add"),
            m("table", [
                ctrl.list.map(function(task, index) {
                    return m("tr", [
                        m("td", [
                            m("input[type=checkbox]", {onclick: m.withAttr("checked", task.done), checked: task.done()})
                        ]),
                        m("td", {style: {textDecoration: task.done() ? "line-through" : "none"}}, task.description()),
                    ])
                })
            ])
        ])
    ]);
};

m.module(document, app);