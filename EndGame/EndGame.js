// setting things in motion
jQuery(document).ready(function() {
    // load up data and populate from indexedDB and/or server
	initClientBuilder();
});

function initClientBuilder(){
    var editor_names = ['service', 'levels', 'fsmedit', 'actions'];
    var current_phase = 1;
    function getPreEditedValue(editor_name){
        // later get it from server or uploaded progress
        return "";
    }
    // initiating all the editors
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
        let selectedEditorName = editor_names[phasenum-1];
        let all_editors = jQuery("div.editor");
        jQuery(all_editors).hide();
        jQuery(all_editors).find("#"+selectedEditorName).show();
    }

    (function initiateBuildingIIFE(){
        var num_phases = editor_names.length;
        jQuery("button#nextPhase").click(function(ev){
            if(current_phase === num_phases){
                return;
            } else {
                current_phase ++;
                if(current_phase === num_phases){
                    jQuery(ev.target).disable();
                }
            }
            selectPhaseByNum(current_phase);
        });
        jQuery("button#prevPhase").click(function(ev){
            if(current_phase === 1){
                return;
            } else {
                current_phase --;
                if(current_phase === 1){
                    jQuery(ev.target).disable();
                }
            }
            selectPhaseByNum(current_phase);
        });
        selectPhaseByNum(current_phase);
    })();
}