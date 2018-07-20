// setting things in motion
jQuery(document).ready(function() {
    // load up data and populate from indexedDB and/or server
	initClientBuilder();
});

function initClientBuilder(){
    var editor_names = ['service', 'levels', 'fsmedit', 'actions'];
    var num_phases = editor_names.length;
    var current_phase = 1;
    function getPreEditedValue(editor_name){
        return keyshelf.get(editor_name);
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
        getPreEditedValue(name).then(function(data){
            if(data){
                editor.session.setValue(data);
            } else {
                editor.session.setValue("");
            }
        });
        
        editor.session.on('change', function(delta) {
            // delta.start, delta.end, delta.lines, delta.action for properties of that specific change
            keyshelf.set(name, editor.getValue());
        });
    });

    function selectPhaseByNum(phasenum){
        jQuery("table#phaseScale").find("td").removeClass("selectedPhase");
        jQuery("table#phaseScale").find("td#phase"+phasenum).addClass("selectedPhase");
        let selectedEditorName = editor_names[phasenum-1];
        let all_editors = jQuery("div.editor");
        // hide all editors except the one's phase selected
        jQuery(all_editors).hide();
        jQuery("div#"+selectedEditorName).show();
        // disabling/enabling the right buttons below
        if(phasenum === num_phases){
            jQuery("button#nextPhase").attr('disabled', 'true');
        } else if (phasenum === 1) {
            jQuery("button#prevPhase").attr('disabled', 'true');
        } else {
            jQuery("button#prevPhase").removeAttr('disabled');
            jQuery("button#nextPhase").removeAttr('disabled');
        }
    }

    (function initiateBuildingIIFE(){
        jQuery("button#nextPhase").click(function(ev){
            if(current_phase === num_phases){
                return; // JIC
            } else {
                current_phase ++;
            }
            selectPhaseByNum(current_phase);
        });
        jQuery("button#prevPhase").click(function(ev){
            if(current_phase === 1){
                return; //JIC
            } else {
                current_phase --;
            }
            selectPhaseByNum(current_phase);
        });
        jQuery("button#downloadProgress").click(function(ev){});    // download configuration generated so far
        jQuery("button#uploadProgress").click(function(ev){});  // uploaded a pre downloaded configuration
        // initiate editing in the starting phase
        selectPhaseByNum(current_phase);
    })();
}