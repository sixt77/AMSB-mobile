function login(identifiant, password){
    var request = new XMLHttpRequest();
    request.open('GET', 'http://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=login&login='+identifiant+'&password='+password, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function get_user_info(user_id){
    var request = new XMLHttpRequest();
    request.open('GET', 'http://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_user_info&user_id='+user_id, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}