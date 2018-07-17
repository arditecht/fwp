// a configuration generator that represents the story in terms of articles, their states and different events
function edfsmDefinitionTool(){
    
}



function StateTransitTableFiller(container, opts){
    // later opts can be used for resurrection
    if(!jQuery){
        throw new Error("Dependency not met: jQuery");
    }
    var remote = {};
    var $container = jQuery(container);
    var article_nameid = "Form_Field";
    remote.getNameId = function(){
        return article_nameid;
    }
    var default_states = ['init', 'halt'];
    var default_accept_events = ['parent_created', 'parent_ended']; // know about the other's emitted events
    var default_emit_events = ['created', 'ended']; // let others know of own emitted events

    var table = jQuery('table');
    
    var action_emission_form = 
    "<fieldset>" +
    "<legend>Emit events</legend>" +
    "<div class='emit' style='display:inline-block;height:30px;width:100px;' contenteditable='true'></div>" +
    "</fieldset><br>" +
    "<fieldset>" +
    "<legend>Call Actions</legend>" +
    "<div class='actions' style='display:inline-block;height:30px;width:100px;' contenteditable='true'></div>" +
    "</fieldset>";

    remote.addState = function(st_name){
        var rows = table.find('tr');
        var new_state_header = jQuery("th");
        new_state_header.text(st_name);
        jQuery(rows[0]).append(new_state_header);
        rows = rows.slice(1);
        if(rows instanceof Array){
            rows.forEach(function(el){
                el = jQuery(el);
                var new_td = jQuery('td');
                new_td.html(action_emission_form);
                el.append(new_td);
            });
        }
    }

    remote.addAcceptableEvent = function(ev_name){

    }

    return remote;
}