define([
    'base/js/namespace',
    'jquery',
], function(Jupyter, $) {

    var put_executed_cells = function (){
        var pyfile = Jupyter.notebook.base_url + "nbextensions/notebook_history/main.py";
        var callback = function(output){
            console.log(output)
            result = output.content.data["text/plain"];
            console.log(result)
            result = JSON.parse( result.replace(/\\'/g, "'").replace(/\\\\n/g, "\\n").slice(1,-1) );
            Object.keys(result).forEach(i => {
                Jupyter.notebook.insert_cell_at_index("code", i-1).set_text(result[i]);
            });
        };
        $.get(pyfile).done(
            function(script){
                script = script + "\nget_all_input_cells(globals())";
                Jupyter.notebook.kernel.execute(script, {iopub: {output: callback}}, {silent:false});
            }
        );
    };

    var createMenuButton = function (){
        Jupyter.toolbar.add_buttons_group([
            Jupyter.keyboard_manager.actions.register ({
            'help': 'notebook history modules',
            'icon' : 'fa-history',
            'handler': put_executed_cells
            }, 'put-executed-cells-in-order', 'no prefix')
        ])
    };
    function load_ipython_extension() {
        createMenuButton();
    };
    return {
        load_ipython_extension: load_ipython_extension
    };

});
