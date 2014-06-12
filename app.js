//this application only has one module: todo
var todo = {};

//the Todo class has two properties
todo.Todo = function(data) {
	this.description = m.prop(data.description);
	this.completed = m.prop(false);
};

//the TodoList class is a list of Todo's
todo.TodoList = Array;

//the `add` method simply adds a new todo to the list
todo.controller = function() {
		this.list = new todo.TodoList();
		this.description = m.prop("");
		this.add = function() {
			if (this.description()) {
				this.list.push(new todo.Todo({description: this.description()}));
				this.description("");
			}
		}.bind(this);
};

//here's the view
todo.view = function(ctrl) {
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

//initialize the application
m.module(document, todo);