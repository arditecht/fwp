setTimeout(function(){
    var editor = ace.edit("editor");
    editor.setOptions({
        fontSize: "12pt",
        highlightGutterLine: true,
        showFoldWidgets: true,
        highlightActiveLine: true
    });
    editor.setTheme("ace/theme/ambiance");
    editor.getSession().setMode("ace/mode/javascript");
    editor.focus();
}, 100);