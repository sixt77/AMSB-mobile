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
            btn.setAttribute("onclick", "alert('je suis :"+role_list[loop]+"')");
            btn.innerHTML = role_list[loop];
            document.getElementById('buttontest').appendChild(btn);
            document.getElementById('mySidenav').innerHTML = document.getElementById('mySidenav').innerHTML + '<a href = "#">'+role_list[loop]+'</a>';
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