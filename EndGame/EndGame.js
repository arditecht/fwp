var editor;
editor = ace.edit("editor");
editor.setOptions({
    fontSize: "12pt",
    highlightGutterLine: true,
    showFoldWidgets: true,
    highlightActiveLine: true
});
editor.setTheme("ace/theme/ambiance");
editor.getSession().setMode("ace/mode/json");
editor.focus();
