function connect(log){
    var identifiant = document.log.mail.value;
    var password = document.log.pass.value;
    var user_info = login(identifiant, password);
    alert(user_info.user_id);
}