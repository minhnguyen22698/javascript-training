import Node from '../lib/Node.js'
import { Sprite } from '../lib/Sprite.js'
import { Card } from './Card.js'
import { Label } from '../lib/Label.js'

var cardHolder = []

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
        // this._initCard();
        // this.initLabel();
        // var btn =document.createElement('button')
        // btn.innerHTML='Play again'
        // btn.addEventListener('click',()=>{location.reload()})
        // btn.style.zIndex='99'
        // btn.style.position='relative'
        // document.body.appendChild(btn)
    }
    _initPlayBtn() {
        var btn = new Sprite('./img/play.png');
        btn.width = 300;
        btn.height = 200;
        btn.x = window.innerWidth / 3 + 20
        btn.y = window.innerHeight / 3 + 20
        btn.on('mousedown', this.onPlay.bind(this))
        this.addChild(btn)

    }
    onPlay(evt) {
        evt.target.style.display = 'none'
        this._initCard();
        this.initLabel();
        // this.active=false
    }
    initLabel() {
        var label = new Label('Score: ', 50, 'red');
        label.y = 50
        this.addChild(label);
        var score = new Label(500, 50);
        score.x = 150;
        score.y = 50
        score.ele.id = "score";
        this.addChild(score);
    }
    _initBackGround() {
        var bg = new Sprite('./img/trucxanh_bg.jpg')
        bg.width = window.innerWidth;
        bg.height = window.innerHeight;
        this.addChild(bg)
    }
    _initCard() {
        let index = 0;
        let timeline = gsap.timeline({ delay: (index) / 3 })
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++) {
                index++;
                do {
                    var randCard = Math.floor(Math.random() * cardHolder.length);
                } while (cardHolder[randCard].available == 0 && cardHolder[randCard].value !== undefined);
                cardHolder[randCard].available--;
                console.log('Shuffle card value' + index + ': ' + cardHolder[randCard].value)
                var card = new Card(cardHolder[randCard].img, index, cardHolder[randCard].value);
                card.zIndex = 20 - index
                gsap.set(card, { x: Math.floor(((j + 1) * window.innerWidth / 8)), y: Math.floor(((i + 0.5) * window.innerWidth / 8)) })
                card.ele.id = cardHolder[randCard].value;
                this.addChild(card);
                timeline.from(card, {
                    duration: 0.4, x: 5,
                    y: Math.floor(((0.5) * window.innerWidth / 8)),
                    ease: 'back',
                })
            }
        }
    }
}