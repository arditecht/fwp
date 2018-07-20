var editornames = ['service', 'levels', 'fsmedit', 'actions'];
editornames.forEach(function(name){
    let editor = ace.edit(name);
    editor.setOptions({
        fontSize: "12pt",
        highlightGutterLine: true,
        showFoldWidgets: true,
        highlightActiveLine: true
    });
    editor.setTheme("ace/theme/ambiance");
    if(name === 'actions'){
        editor.getSession().setMode("ace/mode/javascript");
    } else {
        editor.getSession().setMode("ace/mode/json");
    }
    editor.session.setValue("");
    editor.focus();
});

