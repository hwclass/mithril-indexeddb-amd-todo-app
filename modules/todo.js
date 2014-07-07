(function (m, app) {

    app.modules.todo = {};

    /*todoList array for todo list*/
    var todoList = Array;

    /*app module for todo application*/
    app.modules.todo.model = function(data) {
        this.description = m.prop(data.description);
        this.done = m.prop(false);
    };

    /*main controller*/
    app.modules.todo.controller = function() {
        this.list = new todoList();
        this.description = m.prop("");
        this.add = function() {
            if (this.description()) {
                this.list.push(new app.modules.todo.model({description: this.description()}));
                this.description("");
            }
        }.bind(this);
    };

    /*main view*/
    app.modules.todo.view = function(ctrl) {
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

    m.module(document, app.modules.todo);

})(Mithril, app);