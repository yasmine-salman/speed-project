var Time = 15;
var currentIndex = 0;
var score = 0;
// Array of words 
var arr = ["test","let", "var", "sent", "read","javascript","frontend","backend","click","hyper","text","jquery","animation","content","variable",
            "linkedin","facebook","instagram","google","yahoo","zoom", "congratulations", "comfortable", "communication", "comment","database","dataset",
            "w3schools","react","ASP.Net","Vue","Angular","web development","web design","const","transform","transtion","display","dashboard","container",
"birthday","party","connection","developer","box shadow","border box","have fun","getready","window","document"];


var mediumArr = ["go","here","they","our","them","Arithmetic","operators","Assignment","Augmented ","reality" ,"Autonomous","Binary"," numbers","Ultimate",
"Computer","Programming","Search","Monster","Word","English","Top","byte","assert","abstract","continue","char","catch","extends","do","double","goto","finally","eng","doing","extends",
"final","interface","import","implements"," Java","OOP","Translation" ,"dynamically","lets"," trained ","custom","must go"," content"," languages","models"];


var hardArr = ["gohard","this is","good","very","backg","i am fine","welcome","great job","very good","do your best","good for you","amazing","In the Afternoon","In the evening","cooks dinner"
,"boil the rice","sometimes","phone calls","my sleeping time","Other activities","different days","Weekend","Saturday","I get up at nine","half-past twelve","I watch TV","watch a movie",
"with my family","make my breakfast","For this code","For a long","I worked on","multiple resources","Credit goes","this solution","far longer to","Filtered pixel","Real pixel","color applied",
"through CSS","The goal was","bed at two","and coffee","go back home","I get dressed","English Live","Smartphone","any activity","blessing from God","God rewards you"];
var leveles = document.querySelectorAll(".thelevel");



// check The value of the score To display the rating of the user
function checkTheScore(){
    
    if((score>=0)&&(score < 10)){
        document.getElementById("score").innerText="0" + score;
        if((score===0)&&(score <= 5)){
            document.getElementById("resultText").innerText="Your rating is: weak !";
        }else if((score>5)&&(score<=10)){
            document.getElementById("resultText").innerText="Your rating is: Acceptable !";
        }
    }else{
        if((score>=10)&&(score<=25)){
            document.getElementById("score").innerText= score;
            document.getElementById("resultText").innerText="Your rating is: good !";
        }else if((score>25)&&(score<=40)){
            document.getElementById("score").innerText= score;
            document.getElementById("resultText").innerText="Your rating is: very good !";
        }else if((score>40)&&(score<50)){
            document.getElementById("score").innerText= score;
            document.getElementById("resultText").innerText="Your rating is: excellent !";
        }else if(score===50){
            document.getElementById("score").innerText= score;
            document.getElementById("resultText").innerText="Your rating is: excellent !";
            document.getElementById("theWord").innerText = " end of the test ";
            document.getElementById("score").innerText="50";
            document.getElementById("theResult").classList.add("game-over");
        }
    }
    
    currentIndex = Number(window.localStorage.getItem("currentdiv"));
    if(Number(document.getElementById("highScore").innerText) <= score ){
        if (currentIndex === 1) {
            window.localStorage.setItem("EasyHighScore", score);
            document.getElementById("highScore").innerText = window.localStorage.getItem("EasyHighScore"); 
            document.getElementById("resultHighScore").innerText = document.getElementById("highScore").innerText;  
        } else if (currentIndex === 2) {
            window.localStorage.setItem("MediumHighScore", score);
            document.getElementById("highScore").innerText = window.localStorage.getItem("MediumHighScore");
            document.getElementById("resultHighScore").innerText = document.getElementById("highScore").innerText;
        } else if (currentIndex === 3) {
            window.localStorage.setItem("HardHighscore", score);
            document.getElementById("highScore").innerText = window.localStorage.getItem("HardHighscore");
            document.getElementById("resultHighScore").innerText = document.getElementById("highScore").innerText;
        }
    }
    document.getElementById("finalScore").innerHTML = document.getElementById("score").innerText;
}




// check if the word which the user enter is the same in the test
function comparingValue(){
    if(document.getElementById("theWordInput").value.toLowerCase() != document.getElementById("theWord").innerText.toLowerCase()){  
        document.getElementById("theWordInput").setAttribute("disabled",true);
        document.getElementById("theResult").classList.add("game-over");
    }else{
        score++;
        checkTheScore();
        Time=window.localStorage.getItem("time");
        timerCountDown();
        currentIndex = Number(window.localStorage.getItem("currentdiv"));
        if(currentIndex === 1){
            document.getElementById("theWord").innerText = getRandomItem(arr);
        }else if(currentIndex === 2){
            document.getElementById("theWord").innerText = getRandomItem(mediumArr);
        }else if(currentIndex === 3){
            document.getElementById("theWord").innerText = getRandomItem(hardArr);
        }
        document.getElementById("theWordInput").value = "";
    }
}




//check if Timer equal to zero
function makeTheTest(){
    if(Time===0){
        comparingValue();
    }
    
}



// Timer function
function timerCountDown(){
    var downloadTimer = setInterval(function(){
        if(Time <= 1){
          clearInterval(downloadTimer);
        }
        document.getElementById("Timer").innerText = Time;
        Time -= 1;
        if(Time < 10){
            document.getElementById("Timer").innerText = "0" + Time
        }
        if(( Time >= 0 ) && (Time <= 5) ){
            document.getElementById("Timer").style.color="red";
            document.getElementById("Timer").style.fontWeight = "700";
            document.getElementById("Timer").style.fontSize = "50px";
        }else{
            document.getElementById("Timer").style.color="black";
            document.getElementById("Timer").style.fontWeight = "600";
            document.getElementById("Timer").style.fontSize = "40px";   
        }
        makeTheTest();
        document.getElementById("theWordInput").onkeyup = function () {
            if (document.getElementById("theWordInput").value.toLowerCase() != document.getElementById("theWord").innerText.toLowerCase()) {

            } else {
                clearInterval(downloadTimer);
                score++;
                checkTheScore();
                Time = window.localStorage.getItem("time");
                timerCountDown();
                currentIndex = Number(window.localStorage.getItem("currentdiv"));
                if(currentIndex === 1){
                    document.getElementById("theWord").innerText = getRandomItem(arr);
                }else if(currentIndex === 2){
                    document.getElementById("theWord").innerText = getRandomItem(mediumArr);
                }else if(currentIndex === 3){
                    document.getElementById("theWord").innerText = getRandomItem(hardArr);
                }
                
                // document.getElementById("theWord").innerText = getRandomItem(arr);
                document.getElementById("theWordInput").value = "";
            }
        }
    }, 1000);
}



// random index of the array and then delete it to skip repetition
function getRandomItem(myArray) {

    const randomIndex = Math.floor(Math.random() * myArray.length);

    const item = myArray[randomIndex];

    myArray.splice(randomIndex, 1);

    return item;
}



// select the level which the user choose
function selectTheLevel(){
    if (currentIndex === 1) {
        document.getElementById("choosenLevel").innerHTML = "Easy";
        Time = 13;
        timerCountDown();
        window.localStorage.setItem("time", Time);
        document.getElementById("Timer").innerText = Time;
        document.getElementById("testContainer").classList.add("active");
        document.getElementById("first").style.display="none";
        document.getElementById("highScore").innerText = window.localStorage.getItem("EasyHighScore");
        document.getElementById("resultHighScore").innerText = document.getElementById("highScore").innerText;
        document.getElementById("theWord").innerText = getRandomItem(arr);
    } else if (currentIndex === 2) {
        document.getElementById("choosenLevel").innerHTML = "Medium";
        Time = 12;
        timerCountDown();
        window.localStorage.setItem("time", Time);
        document.getElementById("Timer").innerText = Time;
        document.getElementById("testContainer").classList.add("active");
        document.getElementById("first").style.display="none";
        document.getElementById("highScore").innerText = window.localStorage.getItem("MediumHighScore");
        document.getElementById("resultHighScore").innerText = document.getElementById("highScore").innerText;
        document.getElementById("theWord").innerText = getRandomItem(mediumArr);
    } else if (currentIndex === 3) {
        document.getElementById("choosenLevel").innerHTML = "Hard";
        Time = 10;
        timerCountDown();
        window.localStorage.setItem("time", Time);
        document.getElementById("Timer").innerText = Time;
        document.getElementById("testContainer").classList.add("active");
        document.getElementById("first").style.display="none";
        document.getElementById("highScore").innerText = window.localStorage.getItem("HardHighscore");
        document.getElementById("resultHighScore").innerText = document.getElementById("highScore").innerText;
        document.getElementById("theWord").innerText = getRandomItem(hardArr);
    } else if (currentIndex === 0) {
        alert("you must choose the level of the test before start it");
    }
}

// style the choosen level
for (let i = 0; i < leveles.length; i++) {
    leveles[i].onclick = function () {

        leveles.forEach(function (level) {
            level.classList.remove("choosen");
        });
        this.classList.add("choosen");
        currentIndex = Number(this.getAttribute("data-index"));
        window.localStorage.setItem("currentdiv", currentIndex);
    }
}



// reload the page after clicking on TRY AGAIN button
document.getElementById("tryAgain").onclick = function(){
    location.reload();
}



// start the test by clicking on START TEST button 
document.getElementById("sent").onclick = function () {
    var name = document.getElementById("userName").value;
    if (name === "") {
        alert("you must write your name before start the test");
    } else {
        selectTheLevel();
        window.localStorage.setItem("userName", name);
        document.getElementById("theName").innerHTML = name;
        document.getElementById("foot").style.position="fixed";
    }
}


// dark and night mode function
var result = document.getElementById("resultInfoDiv");
var divsOnNightMode = document.getElementsByClassName("night");
var checkIfEven = 0;
function checkEvenOrOdd(){
    checkIfEven = window.localStorage.getItem("check");
    if ((checkIfEven % 2) != 0) {
        document.getElementById("selectTheMode").classList.add("thenightbuton");

        document.body.classList.add("theNight");

        document.getElementById("btnImg").removeAttribute("src");
        document.getElementById("btnImg").setAttribute("src","assets/imgs/sunny.png");

        leveles.forEach(function (level) {
            level.classList.add("chooseOnNight");
        });

        for (let i = 0; i < divsOnNightMode.length; i++) {
            divsOnNightMode[i].classList.add("night-mode");
        }

        document.getElementById("finalResult").classList.add("darkResult");
        document.getElementById("tryAgain").classList.remove("btn-secondary");
        document.getElementById("tryAgain").classList.add("btn-primary");
    } else {
        document.getElementById("selectTheMode").classList.remove("thenightbuton");

        document.body.classList.remove("theNight");
        document.getElementById("btnImg").removeAttribute("src")
        document.getElementById("btnImg").setAttribute("src","assets/imgs/moon.png");

        leveles.forEach(function (level) {
            level.classList.remove("chooseOnNight");
        });

        for (let i = 0; i < divsOnNightMode.length; i++) {
            divsOnNightMode[i].classList.remove("night-mode");
        }

        document.getElementById("finalResult").classList.remove("darkResult");
        document.getElementById("tryAgain").classList.add("btn-secondary");
        document.getElementById("tryAgain").classList.remove("btn-primary");
    }
}

document.getElementById("selectTheMode").onclick = function(){
    checkIfEven++;
    window.localStorage.setItem("check",checkIfEven);
    checkEvenOrOdd();
}


checkEvenOrOdd();

// get items from local storage 
var theLevel = leveles[window.localStorage.getItem("currentdiv")-1];
theLevel.classList.add("choosen");
document.getElementById("userName").value = window.localStorage.getItem("userName");
document.getElementById("Timer").innerText = window.localStorage.getItem("time");
currentIndex = Number(window.localStorage.getItem("currentdiv"));
if (currentIndex === 1) {
    document.getElementById("choosenLevel").innerHTML = "Easy";
} else if (currentIndex === 2) {
    document.getElementById("choosenLevel").innerHTML = "Medium";
} else if (currentIndex === 3) {
    document.getElementById("choosenLevel").innerHTML = "Hard";
}
// window.localStorage.clear();