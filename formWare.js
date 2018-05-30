/* 
    # WHY ANOTHER COMPONENT?
    Faceless, meaningless, low-level browser events(a.k.a. physical events) and programs on them don't bear any resemblence to the dev's intention
    of building a meaningful feature(a form in this case), as it doesn't straight away enable the dev to tell a story about the entity
    he's trying to get data for through the form. Instead of saying "When this particluar ID called div-admin-name-field-container is clicked
    and the ID called div-admin-enabler-escalation-field is not been checked, I wish to keep the entire parent container of the former ID
    disabled", he should be able to say "while escalation is not enabled, the name field for that should stay disabled" and worry about how
    it is to be done later on. Why work on designing the HTML element, tying technical events to it and handling that event meaningfully
    through mentally translating idea into technical verbosity all through complying with the top level design & purpose all at once? 
    It becomes too complex to make the form adhere to a humanly intuitive behaviour, handle the many entity specifications, nail the technical 
    flow/aspects AND comply with current policy of styling & design all at once!
    No wonder forms look like dull collections of input boxes failing to imbibe an intuition of the purpose of different fields.
    The UI is the look of it; BUT UX is telling a story and getting to know user's story through interaction. The speed, transitions, locations of emphasis, 
    positions, flow and restrictions; Everything matters! Because what we want to convey is a BEHAVIOUR of some entity that form intends to build upon.
    Behavioural stories triggered by meaningfully named events(conceptual, not physical) are how humans prefer to think of when designing a software. 
    And the Form being such an important central part of that software-human interaction(both dev and user side) needs to be designed over a marriage of 
    human perspective and technical robustness.

    # WE ARE NOT A HELPDESK ORIENTED WRAPPER OVER A DATABASE. ARE WE?
    Current SDP JS stack gives a great abstraction layer inside the browser over many technical aspects of the browser. Making calls, creating entities,
    handling data and relations but how FormWare delivers on bridging that gap between technical spec and humanly story is by giving another abstraction 
    layer to already well abstracted layers of JS objects, selectors, events and methods etc. So that the top of that abstraction(i.e. developer's interface) 
    becomes understandable enough to write literal stories with it! It is not wise to represent SDP entities(with real life meaning, think SLA?) 
    directly in a language which was aimed to be generalized over a countless variety of use-cases and software solutions! JS does a great job in 
    enabling us to put intelligence/logic over the HTML/CSS but does not tell us WHAT "Intelligence" to put there. 
    How to represent the problem for our case? Dev has to do a lot of "do-whatever-it-takes" sort of steps in the code that eventually would 
    convey the entity's story to the user as precisely as the Dev would like to tell it. And all that, just for creating a single version of that story, once!
    An anecdote:
        In my form for SLA there are countless faceless event tying routines, one of which is taking all the number type input fields and restricting 
        some totally random char codes on keydown along with not letting more than 3 characters into it. YES, that is intentional in the sense that
        you don't want negative numbers and alphabets and a number more than 999 which an experienced dev can read it as if it is plain English. BUT,
        I had to leave a comment saying that the particular number fields and IDs I was validating actually belonged to the SLA's "resolution time field"
        and that's why I had to restrict negative numbers and ... you get it. But comments were for other devs(and future me); And not for the JS program 
        to know there is an intentional behaviour I need to convey there, a story of sorts.
        Instead, I could have said, "if the resolution time field goes from unfilled to filled, I'd like to check the resolution time according to some
        criterias which I'll tell later on in <some_method_name> method, but right now I know there is a due check on the resolution-time".
        Notice how I said about placing a check on "resolution-time" field and not 3 different HTML number type input fields of weird IDs like
        "sla-resolution-numdays". Also I didn't have to specify that check right then and there and I could just leave a stub method at place for
        implementing the check in future and move on with rest of the flow in Form development. I can concentrate on the designing form behaviour first
        then extract the lower level elemental behaviour extracted out of the grand design later on.
    So, a dev would talk in terms of abstract situations and abstract events doing some abstract actions during Ideation, but, as of today, has to personally go
    through the pain of realising that abstraction onto the technical/concrete/practical implementations. Sometimes, totally failing to convey the Idea behind it
    and letting go of important use-cases which that idea supported; Planting there hence, a ticking time bomb of semantic issues stemming out of other devs 
    or the same dev in future changing a mere innocent looking techincal detail inturn subtly but dangerously violating the original idea.

    # IF YOU ARE SERIOUS ABOUT THE QUALITY OF PRODUCT, MR. ASSUMPTIONS SHOULDN'T BE THE GUY BUILDING IT.
    Lets address the gap between product management and product development. Do I even have to mention where I am getting at here? See it?
    Anyways, here's the takeaway, with FormWare while ideation stage itself, you can DETERMINISTICALLY decide what the form is going to do when fully developed 
    and the dev doesn't have to play try-and-figure AND simultaneously code what he could figure out(along with coding in whatever he couldn't figure out) 
    only to be later asked for changing a tiny semantic thing here and there, sadly requiring him to completely change 75% of his work to achieve that.
    What happened here? Utter discrepancy b/w the 'idea of the entity' form was being built for and the code that followed.
    Add up all the developer's energy/time spent on rearranging and changing much of his codebase due to the discrepancy and multiply all such cases of
    all such developers. 
    It happens. It is nobody's fault. BUT nonetheless, it is, indeed a fault! One which FormWare strives to eradicate. Atleast in the arena of forms.
    And for SDP, arena of forms is a huge deal if you've noticed. We are a bunch of forms collecting and editing information to be displayed/notified
    later on. And some of those forms collects data that changes the details of other form's collected data as a part of underlying Entity's feature(think SLA again?).

    Basically, there should be a bridge between dev's mental model involving abstract states and abstract events that convey story and the implementation details
    for the flow and technical aspects of how that story is realized.

    what's wrong with FWC? Nothing at all. The table is state-of-the-art good for a variety of use-cases. But sadly, the FormBuilder component does not tell a story.
    And that's because it was not meant to. It was meant to 'represent the entity's details' and maintain consistency of form data with input data and entity itself.
    It was meant to render HTML input/button fields that collect data well and convey them nicely to the server in the manner server expects. It is the layer between
    usual static HTML form fields and server's API model having multiple dynamic entities possessing multiple dynamic fields which change dynamically in terms of
    what the entity is, what the field's types are, number of fields and what data that field expects(think getting allowed values?). It does an excellent job in 
    conveying individual field properties to the user and taking result of user interaction with those set of fields to the server in a schema the server expects.

    But what if I want a section to be able to create foreign entities which can later on or in a later 'stage' be added as data to another field of the same form
    only when user has enabled this option after going through necessary details? (think Escalations in SLA and field updates in Escalations).
    Should I create FormBuilder instance inside FormBuilder instance to do so? 
    Would it be optimal? 
    How easy would it be to program the interactions between those instances?
    It'll be like trying to lock your laptop's data by closing the lid, placing a hook on it and placing one huge, clunky iron lock over it having a foot long key.
    Yes, those kind of locks are known for offering theft resistance but is it the best solution in this case?
    Okay that was a bad analogy but it was aimed to convey a sense of sub optimality in the solution provided.
    So the solution offered today works, yes. Both in theory and practice. But the bugs and limitations we see today emanate usually not from syntax errors
    but rather from semantic errors. Involving inconsistency between idea of feature and its implementation result mostly because of the mental distance between 
    those 2 concepts. FormWare strives to bring them closer.
    and... There you know why SdpFormWare deserves atleast one weekend.
*/
function SdpFormWare (form_container, entity_info, fields_conf, profile, life_cycle, actions_glossary, controls_glossary, compliance) {
    "use strict";
    // ====================================================== ADHERENCE ADAPTER ============================================================================== //
    //  Adapts the external params to the way it is needed by FormWare. For immunity from configuration schema changes.
    // ======================================================================================================================================================= //
    var adherence = (function coreToSdpAdherenceAdapterIIFE(){  // contains some information about the adherence with external settings like entity etc.
        var entity_name = entity_info.name,
            entity_path = entity_info.path,
            entity_id	= entity_info.id,
            pre_data	= entity_info.data
            pure_metainfo 	= entity_info.metainfo,
            cli_fields_conf = fields_conf;
        var fsconf, fsmeta, fsdata;
        var result = (function adaptionProcessIIFE(){
        })();
        if(result.status === token.status.failure){
            util.complainer("SDP adherence failed!", true);
        }
        function getPureMetainfo(){
            return pure_metainfo;
        }
        function getProcessedMetainfo(){
            return fsmeta;
        }
        function getClientFieldConf(){
            return cli_fields_conf;
        }
        function getFieldConf(){
            return fsconf;
        }
        function getEntityName(){
            return entity_name;
        }
        function getEntityPath(){
            return entity_path;
        }
        function getEntityId(){
            return entity_id;
        }
    })();
    /*
        All parameters are mandatory, but validating them is not a facile task. Yet.
        fields_conf -- formWare specific client configuration for individual fields of the entity. Going to be used alongside metainfo.
        life_cycle  -- the main STORY mode configuration to program the form behaviour, controls, events, timing and flow -- conceptual flowchart
        profile     -- stages, scenes, ladders, sections, box(labels+fields) woven together by aforementioned life cycle -- conceptual degrees of freedom
        actions     -- list of all form actions like save, cancel, reset, undo. Buttons acting in the big picture, on full profile -- Hop around OVER the life cycle
        controls    -- list of all buttons acting to control elements within the form like stage/section/scene transitions -- Traverse THROUGH life cycle
        compliance  -- all the options necessary for visual, layout, animation overlays within and among the elements(stages, ladders etc) of the form
    */
    if(new.target){
        util.complainer("FormWare is not intended to be constructor. Object instantiation is prohibited.", true);
    }

    // ======================================================================================================================================================= //
    //  Contants, helpers/utils and global variables declation space
    // ======================================================================================================================================================= //
    var token = {   // runtime generated unique tokens for identifying semantic elements throughout the story without conflict
        global : util.runtimeStrGen()+"_sys_global",
        available : util.runtimeStrGen()+"_sys_available",
        word_seperator : util.runtimeStrGen()+"_sys_seperator",
        external : util.runtimeStrGen()+"sys_externallySourced",
        type : {
            field : util.runtimeStrGen()+"_sys_type",
            section : util.runtimeStrGen()+"_sys_type",
            stage : util.runtimeStrGen()+"_sys_type",
            scene : util.runtimeStrGen()+"_sys_type",
            ladder : util.runtimeStrGen()+"_sys_type",
            form : util.runtimeStrGen()+"_sys_type"
        },
        status : {
            success : util.runtimeStrGen()+"_sys_status_success",
            failure : util.runtimeStrGen()+"_sys_status_failure",
            waiting : util.runtimeStrGen()+"_sys_status_wait"
        }
    };
    var util = {
        complainer : function(message, burn){
            if(burn === true){
                throw new Error(message);
            }
            console.warn(message);
        },
        runtimeStrGen : function(){
            return "@-"+(Math.random()*131+11*performance.now()).toString(36)+"-@";
        },
        makeUserToken : function(str){
            var uniqstr = util.runtimeStrGen();
            return uniqstr + str + uniqstr + "_user_token";
        },
        populateMetaInfo : function(cbk){
            CallHandler.call({
                url : entity_info.entity_path,
                operation : "metainfo",
                callback : function(minfo){
                    metainfo = merge_obs(true, {}, minfo);
                    if(cbk instanceof Function){
                        cbk(minfo);
                    }
                }
            });
            return {};
        },
        getArticleInfo : function(conf, article_type){
            return { meta: conf.meta, lifecycle: conf.lifecycle, predata: conf.predata, article_type: article_type };
        }
    };
    // ============================================================= CONCEPTUALIZERS ========================================================================= //
    // Answers what is possible/conceptually doable in FormWare space. Enabling those possibilities by giving an interface to a concept.
    // ======================================================================================================================================================= //
    var familyTree = (function makeNavigationInfoHandlerIIFE(){
        // family of the formware for representing entity hierarchy and implementing inter-form logic
        var parents = {}, children = {}, siblings = {};
        function addParentRemote(ent_name, pr){
            if(parents[ent_name] instanceof Array){
                parents[ent_name].push(pr);
            } else {
                parents[ent_name] = [pr];
            }
        }
        function addChildRemote(ent_name, cr){
            if(children[ent_name] instanceof Array){
                children[ent_name].push(cr);
            } else {
                children[ent_name] = [cr];
            }
        }
        function addSiblingRemote(ent_name, sr){
            if(siblings[ent_name] instanceof Array){
                siblings[ent_name].push(sr);
            } else {
                siblings[ent_name] = [sr];
            }
        }
        function getParents(ent_name){
            return parents[ent_name];
        }
        function getChildren(ent_name){
            return children[ent_name];
        }
        function getSiblings(ent_name){
            return siblings[ent_name];
        }
    })();
    var eventDispatcher = (function makeEventDispatcherIIFE(){    // global level event handler
        var events = {};
        // events are triggered by passing object containing 'target' and 'args' to the registered handler
        function resign(event_name, target, handler){
            if(typeof event_name !== 'string' || typeof target !== 'string' || !events[event_name]){
                return;
            }
            delete events[event_name][target];
        }
        function register(event_name, target, handler){
            if(typeof event_name !== 'string' || typeof target !== 'string'){
                return;
            }
            if(!events[event_name]){
                events[event_name] = {};
            }
            if(handler instanceof Function){
                events[event_name][target] = handler;
            }
        }
        function trigger(event_name, target, args){
            if(typeof event_name !== 'string' || typeof target !== 'string'){
                return false;
            }
            if(!events[event_name] || !events[event_name][target] || typeof events[event_name][target] !== 'function'){
                return false;
            }
            events[event_name][target]({target : target, args : args});
            return true;
        }
        return {    // produce
            on    : register,
            fire  : trigger,
            off   : resign,
            replicator : makeEventDispatcherIIFE   // added because events can be localized internally to subcomponents than crammed in one global place
        }
    })();
    var requisite = (function makeDependencyManagerIIFE(){
        var deps = {};
        function getDependencySignature(depname, context){  // refers a specific, unique dependency case
            return depname + token.word_seperator + context;
        }
        function grant(depname, context, payload){
            if(typeof depname !== 'string'){
                return;
            }
            if(!context){
                context = token.global;
            }
            if(!payload && payload !== false){
                payload = true;
            }
            if(!deps[depname]){
                deps[depname] = {};
            }
            if(payload instanceof Function){    // asynchronously fetched resource. Like metainfo, predata etc. Conceptually, requisite constructor.
                deps[depname][context] = token.waiting;
                payload(function(result){
                    grant(depname, context, result);
                    if(typeof result !== 'function'){
                        var through_event = eventDispatcher.fire(token.available, getDependencySignature(depname, context), result);
                        if(through_event){
                            eventDispatcher.off(token.available, getDependencySignature(depname, context));
                        }
                    }
                });
                return;
            }
            deps[depname][context] = payload;
        }
        function take(depname, context, cbk){   // if dep not met, cbk will be called whenever in future it is met
            if(typeof depname !== 'string' || !deps[depname]){
                return null;
            }
            if(!context){
                context = token.global;
            }
            if(!deps[depname][context] && deps[depname][context] !== false){
                //return null;
                deps[depname][context] === token.status.waiting;
            }
            if(deps[depname][context] === token.status.waiting){
                if(cbk instanceof Function){
                    eventDispatcher.on(token.available, getDependencySignature(depname, context), cbk);
                }
                return;
            }
            call_fn(cbk, deps[depname][context]);
            return deps[depname][context];
        }
        function drop(depname, context){
            if(deps[depname]){
                delete deps[depname][context];
            }
        }
        return {    // produce
            take : take,
            drop : drop,
            grant : grant,
            replicator : makeDependencyManagerIIFE
        }
    })();

    // ========================================================== ARTICULATION =============================================================================== //
    // The hierarchy and design of all available Articles(FormWare's alias for subcomponents)
    // ======================================================================================================================================================= //
    function StateMachine(states, transitActionsMap){
        // The heart/core/arc-reactor of sorts for all subcomponents(articles) of FormWare. The good ol' Finite State Machine.
        // Coupled with intelligence from whichever Article's instance that extends this, it starts to represent flexibility and power of a Turing Machine. Period.
        // states[0] considered start state, states[states.length] considered (end)halt state => extending component will no longer transit on any interaction
        var currState = states[0];
        function setCurrState(next_state, args){
            currState = next_state;
            this.transitState(currState, args); // catch-all transitioning
        }
        this.getCurrentState = function(){
            return currState;
        }
        this.transitState = function(next_state, args){
            if(!next_state){
                var next_state_i = states.indexOf(currState)+1;
                if(next_state_i < states.length);
                next_state = states[next_state_i];
            }
            if(states.indexOf(next_state) < 0){
                throw new Error("Transition requested to an invalid state");
            }
            if(!transitActionsMap[currState] || !transitActionsMap[currState][next_state]) { setCurrState(next_state, args); return; }
            var status = true, action = transitActionsMap[currState][next_state];
            if(typeof action === 'function'){ status = action(args); }
            if(status !== false){ setCurrState(next_state, args) }
        }
        this.reset = function(args){
            if(currState === states[0]){ return; }
            this.transitState(states[0], args);
        }
        this.transitNext = function(args){
            this.transitState(null, args);
        }
    }
    function Article(info){
        // Makes the extender article functionally a State Machine and gives it a local eventDispatcher instance as tool to manage events.
        var local_evd = eventDispatcher.replicator();
        var predata = info.predata;
        var type = info.article_type;
        StateMachine.call(this, info.lifecycle.states, info.lifecycle.state_transition_actions);
        for(var event_name in info.lifecycle.events) {
            if(info.lifecycle.events.hasOwnProperty(event_name)) {
                for(var context_name in info.lifecycle.events[event_name]) {
                    if(info.lifecycle.events[event_name].hasOwnProperty(context_name)){
                        local_evd.on(event_name, context_name, info.lifecycle.events[event_name][context_name]);
                    }
                }
            }
        }
        this.triggerEvent = function(event_name, context_name, args) {
            local_evd.fire(event_name, context_name, args);
        }
        this.tieEvent = function(event_name, context_name, handler){
            local_evd.on(event_name, context_name, handler);
        }
    }

    // ======================================================= FORMWARE SUBCOMPONENTS ================================================================================= //
    // purposely arranged in decreasing atomicity and increasing generality, scope & containment. Ex, Instance of Section contains instances of Field.
    function Field(conf){   // atomic af
        // internal object representing working field(wfo) is a layer over the mundane HTML and also groups multiple elemental fields
        var wfo = {};   // it is gradually incarnated and used for namespacing all the field's internal helpers
        var article_type = token.type.field, name = conf.name;
        Article.call(this, util.getArticleInfo(conf, token.type.field));
        if(!conf){ util.complainer("Configuration needed for instantiating a field.", true); }
        if(conf.custom_component instanceof Function){
            wfo = conf.custom_component(conf); // should return an external object representing the field for that outsider component
            wfo[token.external] = true;
        }
        this.getArticleType = function(){
            return article_type;
        }
    }
    function Section(conf){ // contains instances of both field and itself
        var article_type = token.type.section;
        Article.call(this, util.getArticleInfo(conf, token.type.section));
    }
    function Stage(conf){   // binds(knits, more appropriately) both fields and sections underneath with logic
        var article_type = token.type.stage;
        Article.call(this, util.getArticleInfo(conf, token.type.stage));
    }
    function Ladder(conf){  // supports multi entity forms(subsequent post calls). This is the part which interacts to other instances of FormWare.
        var article_type = token.type.ladder;
        Article.call(this, util.getArticleInfo(conf, token.type.ladder));
    }
    // ======================================================= FORMWARE CORE STARTS =================================================================================== //
    var formWareRemote = new Object();  // factory remote returned eventually

    var director = (function makeStoryManagerIIFE(){    // manager of the life cycle
        // EXPERIMENTAL !
        /*
        create all ladders
        create all stages
        recursively create all sections
        put the fields in respective sections
        
        user first writes about existence of different articles in lists: LISTING phase
        ladders = [ladder1, ladder2, ladder3 ...]   // each divides it into a seperate post call / seperate formware instance
        stages = [stage1, stage2, stage3 ...]       // each has a transitional intelligence
        sections = [section1, section2, section3 ...]   // each groups a few fields
        fields = [fieldname1, fieldname2, ...]          // each groups a few HTML dom fields representing 1 decoupled data

        reading this, the director creates a name to index map

        then, user writes lifecycle conf for each article heretofore mentioned: LIFECYCLE phase
        ladder_lifecycles = [{""}, {""}, {""}, ....]

        WORD OF THE DAY: building generality? let specificity guide you. Come on kid, do a use-case analysis before you proceed.
        */
    })();
    var assenter = (function makeComplianceManagerIIFE(){ // manager of visual compliance
    })();


    if(!metainfo){
        util.populateMetaInfo(initiateFormBuilding);
    } else {
        initiateFormBuilding();
    }
    if(entity_id){
        if(!pre_data){
            util.fetchPreData(function(){
                director.allow()
            });
        } else {

        }
    } else {

    }
    // stage 1 --- Initiate
    function initiateFormBuilding(){
    }
    // stage 2 --- Populate
    function populatePreData(){
    }
    
    return formWareRemote;  // ultimate controller
}