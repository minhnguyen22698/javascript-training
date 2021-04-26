import Node from '../lib/Node.js'
import { Sprite } from '../lib/Sprite.js'
import { Card } from './Card.js'
import { Label } from '../lib/Label.js'
import { cardFlipAnimate, cardZoomOutAnimate } from '../engine/Animate.js'

var cardHolder = []
var cardShuffer = []


for (let i = 0; i < 10; i++) {
    var arrTemp = []
    arrTemp.img = './img/trucxanh' + i + '.jpg';
    arrTemp.value = i + 1;
    arrTemp.available = 2
    cardHolder.push(arrTemp)
}

export class Game extends Node {
    init() {
        this._initBackGround();
        this._initPlayBtn();
        this.shufferCard();
        this.ready = false;
        this.clickedCard = [];
        this.score = 10000;
        this.countMatch = 0;
    }
    _initTutorial(move) {
        if (move) {
            var rule = [
                'Chọn hai thẻ giống nhau để nhận được 1000 điểm',
                'Chọn hai thẻ khác nhau sẽ bị trừ 500 điểm',
                'Mở hết thẻ để trở thành bá chủ, hết điểm về ngủ'];
            var ruleContainer = new Node()
            ruleContainer.width = 1000
            ruleContainer.x = 450
            ruleContainer.y = 30
            ruleContainer.ele.id = 'rule'
            for (let i = 0; i < rule.length; i++) {
                var ruleDetail = rule[i];
                var renderRule = new Label(ruleDetail, 30)
                renderRule.y = i * 30
                ruleContainer.addChild(renderRule)
            }
            this.addChild(ruleContainer)
        }
        else {
            document.getElementById('rule').remove()
        }


    }
    _initHTPbtn() {
        var tutorial = new Sprite('./img/tutorial.png')
        tutorial.x = 300;
        tutorial.y = 30;
        tutorial.on('mouseenter', () => { this._initTutorial(true) })
        tutorial.on('mouseleave', () => { this._initTutorial(false) })
        this.addChild(tutorial)
    }

    _initPlayBtn() {
        var btn = new Sprite('./img/play.png');
        btn.width = 300;
        btn.height = 200;
        btn.x = 550;
        btn.y = 350;
        btn.on('mousedown', this.onPlay.bind(this));
        this.addChild(btn)
    }
    onPlay() {
        this._initCard();
        this.initLabel();
        this._initPLayagain();
        this._initHTPbtn();
        setTimeout(() => {
            this.ready = true
        }, 6000);
    }
    _initPLayagain() {
        var playAgain = new Sprite('./img/again.png')
        playAgain.width = 100;
        playAgain.height = 100;
        playAgain.y = 200
        playAgain.x = 20
        playAgain.on('mousedown', this.onPlayAgain.bind(this))
        this.addChild(playAgain)

    }
    onPlayAgain() {
        location.reload();
    }
    initLabel() {
        var label = new Label('Score: ', 50, 'red');
        label.y = 50;
        this.addChild(label);
        var score = new Label(this.score, 50);
        score.x = 150;
        score.y = 50;
        score.ele.id = "score";
        this.addChild(score);
    }
    _initBackGround() {
        var bg = new Sprite('./img/trucxanh_bg.jpg')
        bg.width = 1500;
        bg.height = 1000;
        this.addChild(bg);
    }

    _initCard() {
        let index = 0
        this.ele.children[1].style.display = 'none'
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++) {
                index++;
                console.log('Shuffle card value' + index + ': ' + cardShuffer[index - 1].value);
                var card = new Card(cardShuffer[index - 1].img, index, cardShuffer[index - 1].value);
                card.x = 650;
                card.y = 350;
                card.opacity = 0;
                let timeline = gsap.timeline();
                timeline.fromTo(card, { opacity: 0 }, { delay: (index) * 0.2, duration: 0.2, opacity: 1 })
                card.on('mousedown', this.onClickCard.bind(this, card, index, cardShuffer[index - 1].value))
                card.ele.id = cardShuffer[index - 1].value;
                var moveCard = gsap.timeline({ delay: 3 })
                moveCard.fromTo(card, { x: 650, y: 350 }, { delay: index / 20, x: (j + 2) * 150 + j * 20, y: (i + 1) * 160, opacity: 1, ease: "back.out(3)", })
                this.addChild(card);
            }
        }
    }
    shufferCard() {
        cardShuffer = []
        for (let i = 0; i < 10; i++) {
            cardHolder[i].available = 2
        }
        for (let i = 0; i < 20; i++) {
            do {
                var randCard = Math.floor(Math.random() * cardHolder.length);
            } while (cardHolder[randCard].available == 0 && cardHolder[randCard].value !== undefined);
            cardHolder[randCard].available--;
            cardShuffer.push(cardHolder[randCard])
        }
    }
    onClickCard(card, index, value) {
        if (this.ready == false || card.isClicked == 1 || this.clickedCard.length >= 2) return;
        let cardCover = card.children[1];
        let cardImg = card.children[0];
        card.isClicked = 1
        cardFlipAnimate(cardCover, cardImg)
        this.clickedCard.push(card)
        if (this.clickedCard.length >= 2) {
            this.ready = false;
            if (this.clickedCard[0].value === value) {
                cardZoomOutAnimate(card.children[0]);
                cardZoomOutAnimate(this.clickedCard[0].children[0], () => {
                    this.clickedCard = [];
                    this.ready = true;
                    this.countMatch++
                    this.playSound('correct.mp3')
                    this.setScore(this.score + 1000)
                })
            } else {
                setTimeout(() => {
                    this.playSound('ohno.mp3')
                    cardFlipAnimate(this.clickedCard[0].children[0], this.clickedCard[0].children[1]);
                    cardFlipAnimate(cardImg, cardCover,
                        () => {
                            this.setScore(this.score - 500)
                            this.clickedCard[0].isClicked = 0
                            card.isClicked = 0;
                            this.clickedCard = []
                            this.ready = true
                        }
                    );
                }, 1500)
            }
        }
    }
    setScore(val) {
        var obj = {
            value: this.score
        }
        TweenLite.to(obj, 0.4, {
            value: val,
            roundProps: {
                value: 20,
            },
            onUpdate: () => {
                this.score = obj.value;
                document.getElementById('score').innerHTML = obj.value;
            },
            onComplete: () => {
                if (this.countMatch == 10) {
                    this.onWin();
                } else if (val <= 0) {
                    this.onLose();
                }
            }
        })
    }
    onWin() {
        this.ready = false
        var winQuotes = "You win with score : " + this.score;
        this.removeCard(700, 400)
        var winLabel = new Label(winQuotes, 50, 'red')
        winLabel.x = 500,
            winLabel.y = 350,
            winLabel.width = winQuotes.length * 60
        this.addChild(winLabel)
        this.playSound('winSound.mp3')
    }
    onLose() {
        this.ready = false
        this.removeCard(700, 340)
        var loseLabel = new Label('You lose', 60, 'red')
        loseLabel.x = 600;
        loseLabel.y = 300;
        loseLabel.opacity = 0
        this.playSound('loseSound.mp3')
        gsap.to(loseLabel, { duration: 2, opacity: 1 })
        this.addChild(loseLabel)
    }
    removeCard(x, y) {
        for (let i = 2; i < this.children.length; i++) {
            if (i != 24) {
                this.children[i].ele.remove()
            }
            else {
                gsap.to(this.children[i], { duration: 2, x: x, y: y })
            }
        }
    }
    playSound(src) {
        var loseSound = document.createElement('audio')
        loseSound.src = `./sound/${src}`
        loseSound.play()
    }
}