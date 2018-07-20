// setting things in motion
jQuery(document).ready(function() {
    // load up data and populate from indexedDB and/or server
	initClientBuilder();
});

function initClientBuilder(){
    var editor_names = ['service', 'levels', 'fsmedit', 'actions'];
    function getPreEditedValue(editor_name){
        // later get it from server
        return "";
    }
    editor_names.forEach(function(name){
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
        editor.session.setValue(getPreEditedValue(name));
    });
    function selectPhaseByNum(phasenum){
        jQuery("table#phaseScale").find("td").removeClass("selectedPhase");
        jQuery("table#phaseScale").find("td#phase"+phasenum).addClass("selectedPhase");
        let selectedEditorName = editor_names[phasenum];
        let all_editors = jQuery("div.editor");
        all_editors.hide().find("#"+selectedEditorName).show();
    }
    
}