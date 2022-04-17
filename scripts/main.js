
var network_types_bttn = document.getElementById("network_types_quiz_bttn");
var common_attacks_bttn = document.getElementById("common_attacks_quiz_bttn");
var firewall_bttn = document.getElementById("firewall_quiz_bttn");
var json_link = "https://stephenpark2000.github.io/WebTech/scripts/question_bank.json"

quiz_open()
//Opens the relevant quiz as object

async function quiz_open(){
    let quiz_chosen = sessionStorage.getItem("quiz_id");
    const question_bank = await fetchJson(json_link)
    var active_quiz = question_bank[quiz_chosen]
    input_html(active_quiz)
    var test = JSON.stringify(active_quiz)
    console.log(test["question"])
}





function input_html(active_quiz){
    console.log(active_quiz[1])
    document.querySelector("#question_title").innerHTML = JSON.stringify(active_quiz[0])
}

async function fetchJson(json_link) {
    try {
        const response = await fetch(json_link, {
            method: 'GET',
        });
        const exam = await response.json();
        return exam;
    } catch (error) {
        console.error(error);
    }
}