const network_services_bttn = document.getElementById("network_services_quiz_bttn");
const network_types_bttn = document.getElementById("network_types_quiz_bttn");
const common_attacks_bttn = document.getElementById("common_attacks_quiz_bttn");
const firewall_bttn = document.getElementById("firewall_quiz_bttn");

network_services_bttn.addEventListener("click", quiz_selection);

//identifies where the user came from and redirects to quiz.html
function quiz_selection(evt){
    var id = evt.target.id
    if (id = network_services_bttn){
        var quiz = "network_services_quiz";
        location.href="quiz.html";
        return(quiz) 
    }
    else {
        window.alert("There has been an error please come back later") 
    }
}
