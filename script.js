
let createdDiv = document.createElement("div");
createdDiv.className = "wordHandler";

createdDiv.style.cssText =
  `z-index: 3; width:17vw; display: none; max-width:25vw; 
  margin: 0; padding: 0;min-height:20vh;position: fixed;
  top: 20%;right: 0;border: 1px solid rgb(236, 225, 225);
   background-color: rgb(221, 221, 221); 
   overflow: scroll; `;

let element = ` <span> <i class="fa fa-times" aria-hidden="true" id="cross" style="padding: 0.3rem 0 0 0.3rem;"></i></span>
                <p class="newWord" style="letter-spacing: 1px;  font-size: 1rem;font-weight: bold;
                text-align: center;"></p>
                <audio class="pronounce" src="" controls style = " width: 95%;height: 2rem;"></audio>
                <p class="newWord2" style="padding:5px 10px;  letter-spacing: 1px;  font-size: 0.9rem; line-height: 17px;" > </p>
                <p class="newWord3"  style="padding:5px 10px;  letter-spacing: 1px;  font-size: 0.9rem; line-height: 15px;"></p>
                <p class="newWord4"  style="padding:5px 10px;  letter-spacing: 1px;  font-size: 0.9rem; line-height: 15px;"></p>
                `;
createdDiv.innerHTML = element;
document.body.appendChild(createdDiv);
let wordContainer = document.querySelector(".wordHandler ");
let first = document.querySelector(".newWord");
let second = document.querySelector(".newWord2");
let third = document.querySelector(".newWord3");
let fourth = document.querySelector(".newWord4");

let audioElement = document.querySelector(".pronounce");
let hidebtn = document.getElementById("cross");

function getSelectedText() {
  var textSelected = "";
  if (window.getSelection) {
    textSelected = window.getSelection().toString().trim().trim(".");
  }
  if (textSelected.length) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${textSelected}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => getData(data));
  }

  function getData(result) {
    if (result[0] !== undefined) {
      console.log(result);
      let word = result[0].word;
      let history = result[0].origin;
      let meaning = result[0].meanings[0].definitions[0].definition;
      let example = result[0].meanings[0].definitions[0].example;


      const audio = result[0].phonetics[0].audio;
      audioElement.src = audio;
      first.innerText = `${word.toUpperCase()}`;
      second.innerText = `Origin: ${history}}`;
      third.innerText = `Meaning: ${meaning}`;
      fourth.innerText = `Example: ${example}`;
      wordContainer.style.display = "block";
    } else {
      alert("Not any word");
    }
  }
}
hidebtn.addEventListener("click", removeMeaning);
function removeMeaning() {
  wordContainer.style.display = "none";
}
document.querySelector("main").addEventListener("mouseup", getSelectedText);
document.body.addEventListener('dblclick', removeMeaning);
