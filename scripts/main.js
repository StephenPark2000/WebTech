var json_link = "https://stephenpark2000.github.io/WebTech/scripts/question_bank.json"
const next_button = document.getElementById("next_button");
var counter = 0
main()

//initialising function
async function main(){    
    var question_bank = await open_json()
    if(question_bank == null){
        main()
    }
    build_html(counter, question_bank )
    await   document.body.addEventListener('click', function (evt) {
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
        if (window.confirm("Congrats you finsihed the quiz!\nDo you want to return Home?")) {
            location.href="index.html";
        }
          
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

//fetches json from github
async   function fetch_json(){
        try {
            let response = await fetch(json_link, {method: 'GET'});
            let test = await response.json();
            return test;
        } catch (error) {
            console.error(error);
        }
    }

//checks if json exists and parses it in object
async function open_json(){
    if (sessionStorage.getItem("Quiz") !==null){
        let json = JSON.parse(sessionStorage.getItem("Quiz"));
        let question = sessionStorage.getItem("quiz_id");
        const target_questions = json[question] 
        return target_questions
    }
    else{
        let get_json = await fetch_json();
        get_json = JSON.stringify(get_json)
        sessionStorage.setItem("Quiz",get_json)
        open_json()
    }
}
