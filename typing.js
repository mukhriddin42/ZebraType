const words = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter ".split(' ');
let wordsCount = words.length;

function addClass(el, name){
    el.className += " "+name;
}

function removeClass(el, name) {
    el.className = el.className.replace(name, "");
}

function randomWord(){
    const randomIndex = Math.ceil(Math.random() * wordsCount);
    return words[randomIndex - 1];
}

function formatWord(word){
    return `<div class="word">
                <span class="letter">${word.split('').join('</span><span class="letter">')}</span>
            </div>`
}

function newGame(){
    document.getElementById('words').innerHTML = '';
    for (let i = 0; i < 150; i++){
        document.getElementById('words').innerHTML += formatWord(randomWord());
    }

    addClass(document.querySelector(".word"), "current");
    console.log(document.querySelector(".word"));
    addClass(document.querySelector(".letter"), "current");
}
newGame();
document.getElementById("game").addEventListener("keyup", ev => {
    const key = ev.key;
    const currentWord = document.querySelector(".word.current");
    const currentLetter = document.querySelector(".letter.current")
    const expected = currentLetter?.innerHTML || " ";
    const isLetter = key.length === 1 && key !== " ";
    const isSpace = key === " ";
    const isBackspace = key === "Backspace";
    const isFisrtletter = currentLetter === currentWord.firstChild;

    console.log({key, expected});

    if(isLetter) {
        if(currentLetter) {
            addClass(currentLetter, key === expected ? "correct" : "incorrect");
            removeClass(currentLetter, "current");
            addClass(currentLetter.nextSibling, "current")
        } else {
            const incorrectLetter = document.createElement("span");
            incorrectLetter.innerHTML = key;
            incorrectLetter.className = "letter incorrect extra";
            currentWord.appendChild(incorrectLetter);
        }
    }

    if(isSpace){
        if(expected !== " "){
            const lettersToInvalidate = [...document.querySelectorAll(".word.current .letter:not(.correct)")];
            lettersToInvalidate.forEach(letter => {
                addClass(letter, "incorrect")
            })
        }

        removeClass(currentWord, "current");
        // addClass(currentWord.nextSibling, "current");
        if (currentWord.nextElementSibling) {
            addClass(currentWord.nextElementSibling, "current");
        }
        if(currentLetter) {
            removeClass(currentLetter, "current");
        }
        addClass(currentWord.nextElementSibling.firstChild, "current");
        addClass(currentWord.nextSibling.firstChild.nextElementSibling, "current");
    }

    // moving cursor
    const nextLetter = document.querySelector(".letter.current");
    const nextWord = document.querySelector(".word.current");
    const cursor = document.getElementById("cursor");
    cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top + 2 + "px";
    cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? "left" : "right"] + "px";
    if(nextLetter){
        cursor.style.top = nextLetter.getBoundingClientRect().top + 2 + "px";
        cursor.style.left = nextLetter.getBoundingClientRect().left + "px";
    } else {
        cursor.style.top = nextWord.getBoundingClientRect().top + 2 + "px";
        cursor.style.left = nextWord.getBoundingClientRect().right + "px";
    }

    if(isBackspace){
        if(currentLetter && isFisrtletter) {
            removeClass(currentWord, "current");
            addClass(currentWord.previousSibling, "current");
            removeClass(currentLetter, "current");
            // addClass(currentWord.previousSibling.lastChild, "current");
            addClass(currentWord.previousSibling.lastChild.previousSibling, "current");
        }
    }
})

