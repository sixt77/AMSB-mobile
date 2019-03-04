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

function get_all_matchs(){
    var request = new XMLHttpRequest();
    request.open('GET', 'http://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_match_list', false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function get_matchs_joueur(user_id){
    var request = new XMLHttpRequest();
    request.open('GET', 'http://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_match_list_by_id_player&player_id='+user_id, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function get_matchs_arbitre(arbitre_id){
    var request = new XMLHttpRequest();
    request.open('GET', 'http://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_match_list_by_id_arbiter&arbiter_id='+arbitre_id, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function get_matchs_otm(otm_id){
    var request = new XMLHttpRequest();
    request.open('GET', 'http://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_match_list_by_id_OTM&OTM_id='+otm_id, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function inscription_match_otm(id_match,id_otm) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=OTM_subscribe_to_match&OTM_id='+id_otm+'&match_id='+id_match, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function desinscription_match_otm(id_match,id_otm) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=OTM_unsubscribe_to_match&OTM_id='+id_otm+'&match_id='+id_match, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function inscription_match_arbitre(id_match,id_arbitre) {
    var request = new XMLHttpRequest();
    var test = request.open('GET', 'http://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=arbiter_subscribe_to_match&arbiter_id='+id_arbitre+'&match_id='+id_match, false);  // `false` makes the request synchronous
    console.log(test);
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function desinscription_match_arbitre(id_match,id_arbitre) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=arbiter_unsubscribe_to_match&arbiter_id='+id_arbitre+'&match_id='+id_match, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

