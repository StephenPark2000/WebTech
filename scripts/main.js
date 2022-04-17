
var network_types_bttn = document.getElementById("network_types_quiz_bttn");
var common_attacks_bttn = document.getElementById("common_attacks_quiz_bttn");
var firewall_bttn = document.getElementById("firewall_quiz_bttn");
var json_link = "https://stephenpark2000.github.io/WebTech/scripts/question_bank.json"

quiz_open()
//Opens the relevant quiz as object
function quiz_open(){
    var question_bank = fetch(json_link)
        .then(response => {return response.json()})
        .then(jsondata => console.log(jsondata));


    let quiz_chosen = sessionStorage.getItem("quiz_id");
    console.log(quiz_chosen)
    console.log(question_bank["quiz"])

}


