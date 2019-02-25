function login(identifiant, password){
    var request = new XMLHttpRequest();
    request.open('GET', 'http://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?login='+identifiant+'&password='+password, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return request.responseText;
    }

}

