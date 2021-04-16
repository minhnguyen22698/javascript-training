
//intruction
var game = document.createElement("div");
game.style.width = 'auto'
game.style.height = 'auto'
game.style.position = "relative";
document.body.appendChild(game);



function playButton() {
    var playBtn = document.createElement('button')
    playBtn.innerHTML = 'Play Game';
    playBtn.addEventListener('click', () => {
        shuffleCard()
        // playBtn.style.display = 'none'
        var sound = new Audio('./assets/sound/play.mp3')
        sound.play()
    })
    playBtn.style.position = 'absolute'
    playBtn.style.zIndex = '99'
    playBtn.style.width = '200px'
    playBtn.style.height = '50px'
    playBtn.style.backgroundColor = 'aqua'
    playBtn.style.top = window.innerHeight / 2 + 'px'
    playBtn.style.left = window.innerWidth / 2 - window.innerWidth / 12 + 'px'

    game.appendChild(playBtn)
}
playButton()

var img = document.createElement('img');
img.src = './img/trucxanh_bg.jpg';
img.style.top = 0 + pageXOffset;
img.style.width = window.innerWidth + 'px'
img.style.height = window.innerHeight + 'px'
game.appendChild(img);

var cardContainer = document.createElement('div')
cardContainer.id = 'cardContainer'
game.appendChild(cardContainer)


// var score = document.createElement('label')
// score.style.position='static'
// score.innerHTML='Score: '
// game.appendChild(score)
var carHolder = [
    {
        img: './img/trucxanh0.jpg',
        value: 0,
        show: false,
        available: 2,
    },
    {
        img: './img/trucxanh1.jpg',
        value: 1,
        show: false,
        available: 2,
    },
    {
        img: './img/trucxanh2.jpg',
        value: 2,
        show: false,
        available: 2,
    },
    {
        img: './img/trucxanh3.jpg',
        value: 3,
        show: false,
        available: 2,
    },
    {
        img: './img/trucxanh4.jpg',
        value: 4,
        show: false,
        available: 2,
    },
    {
        img: './img/trucxanh5.jpg',
        value: 5,
        show: false,
        available: 2,
    },
    {
        img: './img/trucxanh6.jpg',
        value: 6,
        show: false,
        available: 2,
    },
    {
        img: './img/trucxanh7.jpg',
        value: 7,
        show: false,
        available: 2,
    },
    {
        img: './img/trucxanh8.jpg',
        value: 8,
        show: false,
        available: 2,
    },
    {
        img: './img/trucxanh9.jpg',
        value: 9,
        show: false,
        available: 2,
    },

]
function createImage(imageDetail, top, left, width, height, index) {
    var cover = document.createElement('div')
    var child = document.createElement('img')
    cover.style.backgroundImage = "url('./img/cover.jpg')";
    cover.style.position = 'absolute';
    cover.innerHTML = index
    cover.id = 'cover' + index
    cover.style.color = 'white'
    cover.style.display = 'flex'
    cover.style.justifyContent = 'center'
    cover.style.alignItems = 'center'
    cover.addEventListener('click', () => {
        clickCover(cover, imageDetail)
    })
    width && (cover.style.width = width + "px");
    height && (cover.style.height = height + "px");
    cover.style.top = top + "px";
    cover.style.left = left + "px";

    child.src = imageDetail.img;
    child.id = 'child' + index;
    child.style.position = "absolute";
    width && (child.style.width = width + "px");
    height && (child.style.height = height + "px");
    child.style.top = top + "px";
    child.style.left = left + "px";
    cardContainer.appendChild(child);
    cardContainer.appendChild(cover);

}
var clickedImage = [];
var clickedId = [];
var matched = 0;

function clickCover(cover, imageDetail) {
    if (score > 0) {
        if (clickedImage.length >= 2) {
            return
        }
        imageDetail.show = true
        cover.style.display = 'none'
        clickedId.push(cover.id)
        clickedImage.push(imageDetail.img)
        if (clickedImage.length == 2) {
            if (clickedImage[0] === clickedImage[1]) {
                console.log("Same")
                setTimeout(() => {
                    clickedId.map(item => {
                        document.getElementById('child' + item.substring(5)).style.display = 'none'
                        console.log('Erase: ', item)
                        score += 500;
                        getScore()
                        clickedId = []
                        clickedImage = []
                    })
                }, 200);
                matched++
            }
            else {
                setTimeout(() => {
                    clickedId.map(item => {
                        document.getElementById('cover' + item.substring(5)).style.display = 'flex'
                        console.log('close:', item)
                        score -= 250
                        getScore()
                        clickedImage = []
                        clickedId = []
                    })
                }, 500);
                console.log("Diff")
            }
            if (matched == 10) {
                setTimeout(() => {
                    alert('You win!!!')
                }, 510);
            }
        }
    }
    else {
        alert('Game Over');
    }
}
function getScore() {
    var ss = document.getElementById('score');
    ss.innerHTML = score.toString();
}

var score = 10000;

function shuffleCard() {
    score = 10000;
    matched = 0
    var scoreLabel = document.createElement('div')
    scoreLabel.style.position = "absolute"
    scoreLabel.innerHTML = "Score: "
    scoreLabel.style.fontSize = '30px'
    scoreLabel.style.zIndex = '99'
    scoreLabel.style.top = window.innerHeight / 20 + 'px'
    scoreLabel.style.left = window.innerWidth / 20 + 'px'
    game.appendChild(scoreLabel)

    var scoreCount = document.createElement('div');
    scoreCount.style.position = 'absolute';
    scoreCount.id = 'score';
    scoreCount.innerText = score;
    scoreCount.style.fontSize = '30px';
    scoreCount.style.zIndex = '98';
    scoreCount.style.top = window.innerHeight / 20 + 'px'
    scoreCount.style.left = window.innerWidth / 20 + 80 + 'px'
    game.appendChild(scoreCount)
    createCard()
}
function createCard() {
    var count = 1;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
            do {
                var randCard = Math.floor(Math.random() * carHolder.length)
            } while (carHolder[randCard].available == 0)
            carHolder[randCard].available--
            createImage(carHolder[randCard], ((i) * img.width / 12) + img.height * 0.2, (j * img.width / 12) + img.width * 0.3, img.width / 12, img.width / 12, count++)
        }
    }
}