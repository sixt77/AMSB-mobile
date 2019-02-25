function login(log){
    var identifiant = document.log.mail.value;
    var password = document.log.pass.value;
    var user_info = login(identifiant, password);
    if(user_info.user_id != undefined){
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