(function (m, app) {

    debugger; 

    app.modules.todo = {};

    /*initializing models, controllers and views for todo module*/
    app.modules.todo.models = {};
    app.modules.todo.views = {};
    app.modules.todo.controllers = {};

    /*todoList array for todo list*/
    var todoList = Array;

    /*app module for todo application*/
    app.modules.todo.models.Todo = function(data) {
        this.description = m.prop(data.description);
        this.done = m.prop(false);
    };

    /*main controller*/
    app.modules.todo.controllers.Todo = function() {
        this.list = new todoList();
        this.description = m.prop("");
        this.add = function() {
            if (this.description()) {
                this.list.push(new app.modules.todo.models.Todo({description: this.description()}));
                this.description("");
            }
        }.bind(this);
    };

    /*main view*/
    app.modules.todo.views.Todo = function(ctrl) {
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

    m.module(document, [app.modules.todo.models, app.modules.todo.controllers, app.modules.todo.views]);

})(Mithril, app);