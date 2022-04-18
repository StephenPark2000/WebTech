var json_link = "https://stephenpark2000.github.io/WebTech/scripts/question_bank.json"
const next_button = document.getElementById("next_button");
var counter = 0
main()
async function main(){    
    var question_bank = await open_json()
    build_html(counter, question_bank )
    //answer_listener(counter, question_bank)
    document.body.addEventListener('click', function (evt) {
        if (evt.target.className === 'answer_box') {
            let id = evt.target.id
            check_answer(counter, question_bank, id)
        }
        else(false)
    });
    counter++
    
    next_button.onclick = function() {next_question(question_bank)}
    

}


//listens and checks if an answer button has been clicked
function answer_listener(question_bank){
    document.body.addEventListener('click', function (evt) {
        if (evt.target.className === 'answer_box') {
            let id = evt.target.id
            check_answer(question_bank, id)
        }
        else(false)
    });
}

//compares the button id to the answer value
function check_answer(counter, question_bank, id){
    let count_correct = counter - 1
    let quiz_in_use = question_bank[count_correct]
    let answer = quiz_in_use["answer"]
    if(answer == document.getElementById(id).innerText){
        document.getElementById(id).style.backgroundColor="green";
    }
    else(document.getElementById(id).style.backgroundColor="red")
}

//Checks question counter, passes current question to build_html()
function next_question(question_bank){
    if (counter == Object.keys(question_bank).length){
        console.log("Complete")
    }
    
    if (counter < Object.keys(question_bank).length){
        build_html(counter, question_bank)
        //console.log(counter)
        counter++
    
    }
}

//populates html with quiz questions and answers
function build_html(question_counter, question_bank){
    let quiz_in_use = question_bank[question_counter]
    
    document.getElementById("question_title").innerText = quiz_in_use["question"] + "?"
    //answer blocks
    document.getElementById("button_a").innerText = quiz_in_use["options"][0]
    document.getElementById("button_a").removeAttribute("style")
    document.getElementById("button_b").innerText = quiz_in_use["options"][1]
    document.getElementById("button_b").removeAttribute("style")
    document.getElementById("button_c").innerText = quiz_in_use["options"][2]
    document.getElementById("button_c").removeAttribute("style")
    document.getElementById("button_d").innerText = quiz_in_use["options"][3]
    document.getElementById("button_d").removeAttribute("style")
}

//parses json and applies key for relevant questions
async   function open_json(){
        await fetch_json();

        let json = JSON.parse(sessionStorage.getItem("Quiz"));
        let question = sessionStorage.getItem("quiz_id");
        let target_questions = json[question] 
        console.log("opened json success");
        return target_questions;
    }

//https://www.w3schools.com/js/js_json_server.asp
//I had so much trouble with the fetch api but this worked hense its here and not fetch
async   function fetch_json(){
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function() {
            sessionStorage.setItem("Quiz",this.responseText)
        };
        xmlhttp.open("GET", json_link);
        xmlhttp.send();
        console.log("Fetch Succeeded")
        
    }