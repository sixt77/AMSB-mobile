function connect(log){
    identifiant = document.log.mail.value;
    password = document.log.pass.value;
    user_info = login(identifiant, password);
    if(user_info.user_id !== undefined){
        user_role = (get_user_info(user_info.user_id));
        document.getElementById('connection').style.display ='none';
        document.getElementById('homeText').innerText = 'bonjour '+user_info.user_first_name;
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
    document.getElementById('connection').style.display ='none';
    document.getElementById('menu').style.display = 'none';
}

function addButtonRoles(user_role){
    loop = 0;
    role_list = Object.keys(user_role);
    for (var i in user_role) {
        if(user_role[i] != null){
            var btn = document.createElement("BUTTON");
            btn.setAttribute("id", "test1");
            btn.setAttribute("class", "testButton");
            btn.setAttribute("onclick", "choixRole('"+role_list[loop]+"')");
            btn.innerHTML = role_list[loop];
            document.getElementById('buttontest').appendChild(btn);
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

function timeConverter(UNIX_timestamp){
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
function choixRole(role){
    console.log(role);
    if (role == "joueur"){
        var matchs= get_matchs_by_id(user_role.joueur);
    } else {
        var matchs = get_all_matchs();
    }
    var division = document.getElementById(role);
    division.style.display = 'block';
    division.innerHTML = "<table><thead><tr><th>Date et heure</th><th>Equipe 1</th><th>Equipe 2</th></tr></thead><tbody>";
    for (var i in matchs) {
        if(matchs[i] != null){
            division.innerHTML = division.innerHTML + "<tr><td>"+timeConverter(matchs[i].date)+"</td><td>matchs[i].team[0].nom</td><td>matchs[i].team[1].nom</td></tr>";
            loop++;
        }
    }
    division.innerHTML = division.innerHTML + "</tbody></table>";
}