"use strict";

let body = document.querySelector("body");
let catGrid = document.querySelector("#grid");
let catItem = document.querySelector(".item");

let catRow = document.querySelectorAll(".row .item");
let catAmount1 = document.querySelectorAll("#one .item");
let catAmount2 = document.querySelectorAll("#two .item");
let catAmount3 = document.querySelectorAll("#three .item");
let catAmount4 = document.querySelectorAll("#four .item");
let catAmount5 = document.querySelectorAll("#five .item");

let closeBtn = document.querySelector(".close");
let catScore = document.querySelector("h4");
let catModal = document.querySelector(".modal");
let catTitle = document.querySelector(".title");
let catQuest = document.querySelector(".question");
let catAns = document.querySelector(".answer");
let catAnsBtn = document.querySelector(".answer-btn");

let j = 0;
let i = j++;
let catObj = [];
let count = 0;
let score = `Your Score: $${count}`;
// let count = 0;

//ASYNC/AWAIT FUNCTION
let jeopardyData = async () => {
  let response = await fetch("jeopardy.json");
  let data = await response.json();

  let dataValue = _.groupBy(data, "value");
  // console.log(dataValue);
  // console.log(data);

  let cat100 = dataValue.$100;
  let cat200 = dataValue.$200;
  let cat300 = dataValue.$300;
  let cat400 = dataValue.$400;
  let cat500 = dataValue.$500;
  // console.log(cat100);

  //DOM Events

  catModal.addEventListener("click", (e) => {
    //Prevent Modal from disappearing (refreshing)
    e.preventDefault();
  });

  catAmount1.forEach((e) => {
    e.addEventListener("click", () => {
      catModal.style.display = "block";

      let numReplace = cat100[i].value.replace(/[^0-9]/g, ""); //Removes all non numbers from a string
      let catNum = Number(numReplace); //Convert The Category Value to a number

      for (let i = 0; i < cat100.length; i++) {
        catTitle.innerText = `${cat100[i].category} for $${catNum}`; //Need to figure how to populate modal correctly
        catQuest.innerText = cat100[i].question;
        // console.log(cat100[i].category);
        // console.log(catNum);
        // console.log(cat100[i].question);
        // console.log(cat100[i].answer);

        // catQuest.style.display = "inline-block";
        catAns.style.display = "inline-block";
        catAnsBtn.style.display = "inline-block";

        catAnsBtn.addEventListener("click", () => {
          catAns = document.querySelector(".answer");
          console.log(catAns.value);
          console.log(cat100[i].answer);
          if (catAns.value !== cat100[i].answer) {
            console.log(catAns.value);
            closeBtn.style.display = "block";
            catTitle.innerText = `Wrong Answer!! The Correct Answer is ${cat100[i].answer}`;
            catQuest.style.display = "none";
            catAns.style.display = "none";
            catAnsBtn.style.display = "none";
            catAns.value = "";
          } else if (catAns.value === cat100[i].answer) {
            closeBtn.style.display = "block";
            catTitle.innerText = `Correct Answer!!`;
            // catQuest.style.display = "none";
            catQuest.innerText = catAns.value;
            catAns.style.display = "none";
            catAnsBtn.style.display = "none";
            count += catNum;
            score = `Your Score: $${count}`;
            catScore.innerText = score;
            catAns.value = "";
          }
        });

        closeBtn.onclick = function () {
          catModal.style.display = "none";
          // closeBtn.style.display = "none";
        };
      }
    });
  });
};

jeopardyData();
