function connect(log){
    identifiant = document.log.mail.value;
    password = document.log.pass.value;
    user_info = login(identifiant, password);

    if(user_info.user_id !== undefined){
        user_role = (get_user_info(user_info.user_id));
        document.getElementById('connexion').style.display ='none';
        document.getElementById('accueil').style.display = 'block';
        document.getElementById('menu').style.display = 'block';
        addButtonRoles(user_role);
    }else{
        alert('connexion refusée');
    }
}

function logOff(){
    document.getElementById('accueil').style.display = 'none';
    document.getElementById('connection').style.display ='block';
    document.getElementById('menu').style.display = 'none';
    closeNav();
    hide_class("role_div");
    document.getElementById('button_list').innerHTML = "";
}

function addButtonRoles(user_role){
    loop = 0;
    role_list = Object.keys(user_role);
    console.log(user_role);
    console.log(role_list);
    for (var i in user_role) {
        if(user_role[i] != null){
            if(role_list[loop] != "utilisateur"){
                var btn = document.createElement("BUTTON");
                btn.setAttribute("id", "test1");
                btn.setAttribute("class", "roleButton");
                btn.setAttribute("onclick", "displayRole('"+role_list[loop]+"')");
                btn.innerHTML = role_list[loop];
                document.getElementById('button_list').appendChild(btn);

            }
        }
        loop++;
    }
}
function changeNav(){
    if(document.getElementById("mySidenav").style.width == "20%"){
        closeNav();
    }else{
        openNav();
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "20%";
    document.getElementById("mySidenav").style.minWidth = "195px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.minWidth = "0px";
}

function timestampToTime(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}
function displayRole(role){
    hide_class("role_div");
    remove_class("match_div");
    document.getElementById(role).style.display ="block";
    switch(role){
        case "joueur":
            var matchs= get_matchs_joueur(user_role.joueur);
            break;
        case "arbitre":
            var matchs = get_matchs_arbitre(user_role.arbitre);
            break;
        case "otm":
            var matchs = get_matchs_otm(user_role.otm);
            break;
        case "entraineur":
            var matchs = get_matchs_coach(user_role.entraineur);
            break;
        default:
            var matchs = get_all_matchs();
            break;
    }
    display_match(matchs,role);
    document.getElementById(role).style.visibility ="visible";
}

function hide_class(className) {
    var items = document.getElementsByClassName(className);
    for (var i = 0; i < items.length; i++) {
        items[i].style.display = "none";
    }
}

function show_class(className) {
    var items = document.getElementsByClassName(className);
    for (var i = 0; i < items.length; i++) {
        items[i].style.display = "block";
    }
}

function create_element($tag, $id, $class, $onclick, $html){
    var item = document.createElement($tag);
    if($id != "" && $id != undefined)item.setAttribute("id", $id);
    if($class != "" && $class != undefined)item.setAttribute("class", $class);
    if($onclick != "" && $onclick != undefined)item.setAttribute( "onclick", $onclick);
    if($html != "" && $html != undefined)item.innerHTML =$html;
    return item;
}

function remove_class($class) {
    $( "."+$class+"" ).remove();
}

function remove_id($id) {
    $( "#"+$id+"" ).remove();
}

function add_attribute_class($class, $attribut, $value){
    var items = document.getElementsByClassName($class);
    for (var i = 0; i < items.length; i++) {
        items[i].setAttribute($attribut, $value);
    }
}

function remove_attribute_class($class, $attribut){
    var items = document.getElementsByClassName($class);
    for (var i = 0; i < items.length; i++) {
        items[i].removeAttribute($attribut);
    }
}

function subscribe_to_match($match_id, $role, $selected, $id_role) {
    switch ($role) {
        case 'arbitre':
            if($selected){
                desinscription_match_arbitre($match_id,$id_role)
            }else{
                inscription_match_arbitre($match_id,$id_role);
            }
            break;
        case 'otm':
            if($selected){
                desinscription_match_otm($match_id,$id_role);
            }else{
                inscription_match_otm($match_id,$id_role);
            }
            break;
        default:
    }
    displayRole($role);
}

function display_player_list_on_match($id_match, îd_coach) {
    childNodes = document.getElementById("display_"+$id_match).childNodes;
    var deploy = false;

    for (var y = 0; y < childNodes.length; y++) {
        if(childNodes[y].className == "player_div"){
            deploy = true;
        }
    }

    if(!deploy){
        remove_class("player_list");
        remove_class("player_div");
        var player_list= get_player_list_by_id_coach($id_match, îd_coach);
        document.getElementById($id_match).appendChild(create_element("ul","player_list"+$id_match, "player_list", "",""));
        var loop = 0;
        for (var i in player_list) {
            if(player_list[i] != null){
                document.getElementById("display_"+$id_match).appendChild(create_element("ul","player_"+player_list[loop]['id'], "player_div", "show_player_info('"+player_list[loop]['id']+"', '"+$id_match+"', '"+îd_coach+"')",""));
                document.getElementById("player_"+player_list[loop]['id']).appendChild(create_element("li", "", "player_info", "","nom : "+player_list[i]['nom']));
                document.getElementById("player_"+player_list[loop]['id']).appendChild(create_element("li", "", "player_info", "","prenom : "+player_list[i]['prenom']));
                loop++;
            }
        }
    }else{
        remove_class("player_list");
        remove_class("player_div");
    }
}
function show_player_info($player_id){
    var player_profile = get_player_profile_by_id_player($player_id);
    childNodes = document.getElementById("player_"+$player_id).childNodes;
    var deploy = false;
    for (var i = 0; i < childNodes.length; i++) {
        if(childNodes[i].className == "player_info_supp"){
            deploy = true;
        }
    }
    if(!deploy){
        remove_class("player_info_list");
        remove_class("player_info_supp");
        remove_class("parent_info_list");
        remove_class("parent_info");
        document.getElementById("player_"+$player_id).appendChild(create_element("li","", "player_info_supp", "", "email : "+player_profile['mail']));
        document.getElementById("player_"+$player_id).appendChild(create_element("li","", "player_info_supp", "", "licence : "+player_profile['licence']));
        document.getElementById("player_"+$player_id).appendChild(create_element("li","", "player_info_supp", "", "telephone : "+player_profile['telephone']));
        if(player_profile['parent'][0] != undefined){
            for (var i = 0; i < player_profile['parent'].length; i++) {
                document.getElementById("player_"+$player_id).appendChild(create_element("ul","parent_"+player_profile['parent'][i]['id'], "parent_info_list", "",""));
                document.getElementById("parent_"+player_profile['parent'][i]['id']).appendChild(create_element("li","", "parent_info", "","nom : "+player_profile['parent'][i]['nom']));
                document.getElementById("parent_"+player_profile['parent'][i]['id']).appendChild(create_element("li","", "parent_info", "","prenom : "+player_profile['parent'][i]['prenom']));
                document.getElementById("parent_"+player_profile['parent'][i]['id']).appendChild(create_element("li","", "parent_info", "","mail : "+player_profile['parent'][i]['mail']));
                document.getElementById("parent_"+player_profile['parent'][i]['id']).appendChild(create_element("li","", "parent_info", "","telephone : "+player_profile['parent'][i]['telephone']));
            }
        }
    }else{
        remove_class("player_info_list");
        remove_class("player_info_supp");
        remove_class("parent_info_list");
        remove_class("parent_info");
    }
}

function display_match(matchs,role){
    var loop = 0;
    for (var i in matchs) {
        if(matchs[i] != null){
            document.getElementById(role).appendChild(create_element("ul", matchs[loop]['match']['id'], "match_div", "",""));
            document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("ul", "match_info"+matchs[loop]['match']['id'], "", "",""));
            document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","lieu : "+matchs[loop]['match']['lieux']));
            document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","Date : "+timestampToTime(matchs[loop]['match']['date'])));
            document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","Equipe 1 : "+matchs[loop]['team'][0]['nom']));
            document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","Equipe 2 : "+matchs[loop]['team'][1]['nom']));
            closeNav();
            switch (role) {
                case 'arbitre':
                    if(matchs[loop]['match']['selected']){
                        document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","nombre d'arbitres : "+matchs[loop]['match']['nb_arbitres']));
                        document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("BUTTON", "match"+[loop], "sub_button red_button", "subscribe_to_match("+matchs[loop]['match']['id']+", '"+role+"', "+matchs[loop]['match']['selected']+", "+user_role.arbitre+")","-"));
                    }else{
                        document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","nombre d'arbitres : "+matchs[loop]['match']['nb_arbitres']));
                        document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("BUTTON", "match"+[loop], "sub_button green_button", "subscribe_to_match("+matchs[loop]['match']['id']+", '"+role+"', "+matchs[loop]['match']['selected']+", "+user_role.arbitre+")","+"));
                    }
                    break;
                case 'otm':
                    if(matchs[loop]['match']['selected']){
                        document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","nombre d'otm : "+matchs[loop]['match']['nb_otm']));
                        document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("BUTTON", "match"+[loop], "sub_button red_button", "subscribe_to_match("+matchs[loop]['match']['id']+", '"+role+"', "+matchs[loop]['match']['selected']+", "+user_role.otm+")","-"));
                    }else{
                        document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","nombre d'otm : "+matchs[loop]['match']['nb_otm']));
                        document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("BUTTON", "match"+[loop], "sub_button green_button", "subscribe_to_match("+matchs[loop]['match']['id']+", '"+role+"', "+matchs[loop]['match']['selected']+", "+user_role.otm+")","+"));
                    }
                    break;
                case 'entraineur':
                    document.getElementById("match_info"+matchs[loop]['match']['id']).setAttribute("onclick", "display_player_list_on_match("+matchs[loop]['match']['id']+","+user_role.entraineur+")");
                    document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("ul", "display_"+matchs[loop]['match']['id'], "display_match_div", "",""));
                    break;
                default:
            }
            loop++;
        }
    }
}

