function stateMachine(conf){
    Object.freeze(conf);
    var states_list = [];
    var state_transit_actions = {};
    function transit_routine(state1, state2){
        var status = state_transit_actions[state1][state2].pre();
        if(status.proceed === true){
            state_transit_actions[state1][state2].action(status.data);
        }
    }
    
}