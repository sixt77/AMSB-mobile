function connect(log){
    identifiant = document.log.mail.value;
    password = document.log.pass.value;
    user_info = login(identifiant, password);
    console.log(user_info);
    if(user_info.user_id !== undefined){
        user_role = (get_user_info(user_info.user_id));
        document.getElementById('connection').style.display ='none';
        document.getElementById('homeText').innerText = 'bonjour '+user_info.user_prenom;
        document.getElementById('accueil').style.display = 'block';
        document.getElementById('menu').style.display = 'block';
        addButtonRoles(user_role);
    }else{
        alert('connection refusé');
    }
}

function logOff(){
    document.getElementById('accueil').style.display = 'none';
    document.getElementById('homeText').innerText = '';
    document.getElementById('connection').style.display ='block';
    document.getElementById('menu').style.display = 'none';
    closeNav();
    hide_class("role_div");
    document.getElementById('button_list').innerHTML = "";

}

function addButtonRoles(user_role){
    loop = 0;
    role_list = Object.keys(user_role);
    for (var i in user_role) {
        if(user_role[i] != null){
            var btn = document.createElement("BUTTON");
            btn.setAttribute("id", "test1");
            btn.setAttribute("class", "testButton");
            btn.setAttribute("onclick", "displayRole('"+role_list[loop]+"')");
            btn.innerHTML = role_list[loop];
            document.getElementById('button_list').appendChild(btn);
            loop++;
        }
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
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
    document.getElementsByClassName("role_div").style.display = "none";
    document.getElementById(role).style.display ="block";
    if (role == "joueur"){
        var matchs= get_matchs_joueur(user_role.joueur);
    } else if(role == "arbitre"){
        var matchs = get_matchs_arbitre(user_role.arbitre);
    } else if(role == "otm"){
        var matchs = get_matchs_otm(user_role.otm);
    } else {
        var matchs = get_all_matchs();
    }
    var match_divs = document.getElementsByClassName('match_list');
    for (var i = 0; i < match_divs.length; i++) {
        match_divs[i].innerHTML = display_match(matchs,role);
    }
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

function display_match(matchs,role){
    var retour = "";
    retour = retour.concat("<table class='affichageMatchs'>");
    retour = retour.concat("<thead>");
    if(role == 'otm') {
        retour = retour.concat("<tr><th>Date</th><th>Equipe 1</th><th>Equipe 2</th><th>Lieu</th><th>Nombre d'OTM</th><th>Êtes-vous inscrit?</th></tr>");
        retour = retour.concat("</thead>");
        retour = retour.concat("<tbody>");
        for (x in matchs) {

            retour = retour.concat("<tr><td>"+timestampToTime(matchs[x]['match']['date'])+"</td><td>"+matchs[x]['team'][0]['nom']+"</td><td>"+matchs[x]['team'][1]['nom']+"</td><td>"+matchs[x]['match']['lieux']+"</td><td>"+matchs[x]['match']['nb_otm']+"</td>");
            if(matchs[x]['match']['selected']){
                retour = retour.concat("<td>Oui</td><td><input type='button' value='Désinscription' onclick='desinscription_match_otm("+matchs[x]['match']['id']+","+user_role.otm+"); refreshRole("+role+")'/></td></tr>");
            }else {
                retour = retour.concat("<td>Non</td><td><input type='button' value='Inscription' onclick='inscription_match_otm("+matchs[x]['match']['id']+","+user_role.otm+"); refreshRole("+role+")'/></td></tr>");
            }
        }
    } else if (role == 'arbitre') {
        console.log(matchs[0]);
        retour = retour.concat("<tr><th>Date</th><th>Equipe 1</th><th>Equipe 2</th><th>Lieu</th><th>Nombre d'arbitres</th><th>Êtes-vous inscrit?</th></tr>");
        retour = retour.concat("</thead>");
        retour = retour.concat("<tbody>");
        for (x in matchs) {
            retour = retour.concat("<tr><td>"+timestampToTime(matchs[x]['match']['date'])+"</td><td>"+matchs[x]['team'][0]['nom']+"</td><td>"+matchs[x]['team'][1]['nom']+"</td><td>"+matchs[x]['match']['lieux']+"</td><td>"+matchs[x]['match']['nb_arbitres']+"</td>");
            if(matchs[x]['match']['selected']){
                retour = retour.concat("<td>Oui</td><td><input type='button' value='Désinscription' onclick='desinscription_match_arbitre("+matchs[x]['match']['id']+","+user_role.arbitre+"); refreshRole("+role+")'/></td></tr>");
            }else {
                retour = retour.concat("<td>Non</td><td><input type='button' value='Inscription' onclick='inscription_match_arbitre("+matchs[x]['match']['id']+","+user_role.arbitre+"); refreshRole("+role+")'/></td></tr>");
            }
        }
    } else {
        retour = retour.concat("<tr><th>Date</th><th>Equipe 1</th><th>Equipe 2</th><th>Lieu</th></tr>");
        retour = retour.concat("</thead>");
        retour = retour.concat("<tbody>");
        for (x in matchs) {
            retour = retour.concat("<tr><td>"+timestampToTime(matchs[x]['match']['date'])+"</td><td>"+matchs[x]['team'][0]['nom']+"</td><td>"+matchs[x]['team'][1]['nom']+"</td><td>"+matchs[x]['match']['lieux']+"</td></tr>");
        }
    }
    retour = retour.concat("</tbody>");
    retour = retour.concat("</table>");
    return retour;
}

function refreshRole(role) {
    displayRole(role);
}