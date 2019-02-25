function connect(log){
    identifiant = document.log.mail.value;
    password = document.log.pass.value;
    user_info = login(identifiant, password);
    if(user_info.user_id != undefined){
        console.log(user_log = (get_user_info(user_info.user_id)));
        document.getElementById('connection').style.visibility ='hidden';
        document.getElementById('homeText').innerText = 'bonjour '+user_info.user_first_name;
        document.getElementById('accueil').style.visibility = 'visible';
    }else{
        alert('connection refusé');
    }
}

function logOff(){
    document.getElementById('accueil').style.visibility = 'hidden';
    document.getElementById('homeText').innerText = '';
    document.getElementById('connection').style.visibility ='visible';
}