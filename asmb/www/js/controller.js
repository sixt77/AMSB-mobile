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
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
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
    document.getElementById(role).style.display ="block";
    if (role == "joueur"){
        var matchs= get_matchs_by_id(user_role.joueur);
    } else {
        var matchs = get_all_matchs();
    }
    var match_divs = document.getElementsByClassName('match_list');
    for (var i = 0; i < match_divs.length; i++) {
        match_divs[i].style.display = "block";
        match_divs[i].innerHTML = display_match(matchs);
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

function display_match(matchs){
    var retour = "";
    for (x in matchs) {
        retour = retour.concat("<div class=''>");
        retour = retour.concat("<p>date : "+timestampToTime(matchs[x]['match']['date'])+"</p>");
        retour = retour.concat("<p>equipe 1 : "+matchs[x]['team'][0]['nom']+"</p>");
        retour = retour.concat("<p>equipe 2 : "+matchs[x]['team'][1]['nom']+"</p>");
        retour =  retour.concat("</div>");
    }
    return retour;
}
