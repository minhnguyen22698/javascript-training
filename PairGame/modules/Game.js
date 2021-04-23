import Node from '../lib/Node.js'
import { Sprite } from '../lib/Sprite.js'
import { Card } from './Card.js'
import { Label } from '../lib/Label.js'

var cardHolder = []
var cardShuffer=[]
let index =0
let timeline = gsap.timeline({ delay: (index) / 10 })

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
        this.shufferCard()
    }
    _initPlayBtn() {
        var btn = new Sprite('./img/play.png');
        btn.width = 300;
        btn.height = 200;
        btn.x = 550
        btn.y = 350
        btn.on('mousedown', this.onPlay.bind(this))
        this.addChild(btn)
    }
    onPlay(evt) {
        this._initCard();
        this.initLabel();
        // this._initPLayagain();
    }
    _initPLayagain() {
        var playAgain = new Sprite('./img/again.png')
        playAgain.width = 100;
        playAgain.height = 100;
        playAgain.y = 200
        playAgain.x=20
        playAgain.on('mousedown', this.onPlayAgain.bind(this))
        this.addChild(playAgain)
    
    }
    onPlayAgain() {
        this.shufferCard()
        this._initCard();
        this.initLabel();
        location.reload();
    }
    initLabel() {
        var label = new Label('Score: ', 50, 'red');
        label.y = 50
        this.addChild(label);
        var score = new Label(10000, 50);
        score.x = 150;
        score.y = 50
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
     this.ele.children[1].style.display='none'
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++) {
                index++;
                // do {
                //     var randCard = Math.floor(Math.random() * cardHolder.length);
                // } while (cardHolder[randCard].available == 0 && cardHolder[randCard].value !== undefined);
                // cardHolder[randCard].available--;
                console.log('Shuffle card value' + index + ': ' + cardShuffer[index-1].value);
                var card = new Card(cardShuffer[index-1].img, index, cardShuffer[index-1].value);
                gsap.set(card, { x: (j + 1.5) * 150 + j * 20, y: (i + 0.5) * 160+100,opacity:1})
                card.zIndex = 20 - index
                card.ele.id = cardShuffer[index-1].value;
                this.addChild(card);
                timeline.from(card, {
                    duration: 0.4, x: 600,
                    // y: Math.floor(((0.5) * window.innerWidth / 10)),
                    y: 350,
                    zIndex:99,
                    ease: 'back',
                })
            }
        }
    }
    shufferCard(){
        cardShuffer=[]
        for(let i =0;i<10;i++){
            cardHolder[i].available=2
        }
        for(let i=0;i<20;i++){
            do {
                var randCard = Math.floor(Math.random() * cardHolder.length);
                console.log('lol')
            } while (cardHolder[randCard].available == 0 && cardHolder[randCard].value !== undefined);
            cardHolder[randCard].available--;
            cardShuffer.push(cardHolder[randCard])
        }
        console.log(cardShuffer)
    }
}