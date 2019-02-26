function connect(log){
    identifiant = document.log.mail.value;
    password = document.log.pass.value;
    user_info = login(identifiant, password);
    if(user_info.user_id !== undefined){
        user_role = (get_user_info(user_info.user_id));
        document.getElementById('connection').style.visibility ='hidden';
        document.getElementById('homeText').innerText = 'bonjour '+user_info.user_first_name;
        document.getElementById('accueil').style.visibility = 'visible';
        addButtonRoles(user_role);
    }else{
        alert('connection refusé');
    }
}

function logOff(){
    document.getElementById('accueil').style.visibility = 'hidden';
    document.getElementById('homeText').innerText = '';
    document.getElementById('connection').style.visibility ='visible';

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
            document.getElementById('homebutton').appendChild(btn);
            loop++;
        }
    }
}