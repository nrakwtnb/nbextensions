define([
    'base/js/namespace',
], function(Jupyter) {

    var put_imports_cell = function (){
        var import_modules = [];
        var import_modules_with_from = [];

        Jupyter.notebook.get_cells().forEach(cell => {
            if (cell["cell_type"] != "code"){
                return;
            }
            var is_in_comment = false;
            cell.input[0].innerText.split("\n").forEach(line => {
                //
                // check comment with multiple lines
                //
                if (is_in_comment) {
                    return;
                }

                line = line.split("#")[0];
                line = line.split("\"")[0];
                line = line.split("\'")[0];

                res = line.match(/^import\s(.*)/);
                if (res) {
                    res = res[1];
                    modules = res.split(",").map(function(text){return text.trim()});
                    Array.prototype.push.apply(import_modules, modules);
                }

                res = line.match(/^(from\s.*)/);
                if (res) {
                    res = res[1];
                    import_modules_with_from.push(res)
                }
            });
        });
        import_modules = Array.from(new Set(import_modules));
        import_modules = import_modules.map(function(module){return "import "+module});

        import_modules_with_from = Array.from(new Set(import_modules_with_from));

        var import_lines = import_modules.concat(import_modules_with_from).join("\n");

        Jupyter.notebook.insert_cell_at_index("code", 0).set_text(import_lines);
    };


    var createMenuButton = function (){
        Jupyter.toolbar.add_buttons_group([
            Jupyter.keyboard_manager.actions.register ({
            'help': 'collect importing modules',
            'icon' : 'fa-suitcase',
            'handler': put_imports_cell
            }, 'put-imports-cell', 'no prefix')
        ])
    };
    function load_ipython_extension() {
        createMenuButton();
    };
    return {
        load_ipython_extension: load_ipython_extension
    };

});
