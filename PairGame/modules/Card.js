import Node from '../lib/Node.js'
import { Sprite } from '../lib/Sprite.js';
import { Label } from '../lib/Label.js'
import { cardFlipAnimate, cardZoomOutAnimate } from '../engine/Animate.js'
var listClick = [];
var parentNode = [];
var score = 500;
var matched = 9;
var ready=false;

export class Card extends Node {
    constructor(src, index, value, padding) {
        super()
        this._initElement(src, index)
        this._src = 'testing'
        this._index = '';
        this._value = '';
        if (index) this.index = index
        if (value) this.value = value
        this._width = 50;
        this._height = 50;
    }
    _initElement(src, index) {
        super._initElement();
        this._initImage(src);
        this._initCover(index);
        setTimeout(() => {
            ready=true
        }, 7000);
    }
    get src() {
        return this._src
    }
    set src(val) {
        this._src = val
    }
    get index() {
        return this._index
    }
    set index(val) {
        this._index = val
    }
    get index() {
        return this._index
    }
    set value(val) {
        this._value = val
        this.ele.value = val
    }
    _initCover(index) {
        var cover = new Node()
        cover.background = './img/cover.jpg';
        cover.width = window.innerWidth / 8 - 20;
        cover.height = window.innerWidth / 8 - 20;
        cover.x = 100;
        cover.y = 100;
        // cover.border='5px solid gray'
        cover.alignItem = 'center'
        this.addChild(cover);
        cover.on("mousedown", () => this.onClickCard(cover));
        var label = new Label(this.index)
        label.text = index;
        label.fontColor = 'white'
        label.fontSize = 30
        cover.addChild(label)
    }
    _initScore() {
        var label = new Label('Score : ', 30, 'red')
        label.setText = "Score: "
        this.addChild(label)
    }
    _initImage(src) {
        var img = new Sprite(src)
        img.width = window.innerWidth / 8 - 20;
        img.height = window.innerWidth / 8 - 20;
        img.x = 100;
        img.y = 100;
        img.scaleX = 0;
        this.addChild(img);
    }
    setScore(val) {
        if (matched == 10) {
            alert('You win');
        }
        var obj = {
            value: score
        }
        TweenLite.to(obj, 0.4, {
            value: val,
            roundProps: {
                value: 20,
            },
            onUpdate: () => {

                document.getElementById('score').innerHTML = obj.value
                score=obj.value
            }
        })
    }

    onClickCard(cover) {
        if(ready==false) return
        if (listClick.length >= 2 || cover.isClicked == 1) { return }
        cardFlipAnimate(cover, this.ele.children[0])
        parentNode.push(this);
        listClick.push(cover);
        cover.isClicked = 1;
        if (parentNode.length == 2) {
            if (parentNode[0]._value === parentNode[1]._value) {
                cardZoomOutAnimate(parentNode[0].ele.children[0]);
                cardZoomOutAnimate(parentNode[1].ele.children[0]);
                setTimeout(() => {
                    parentNode[0].active = false;
                    parentNode[1].active = false;
                    parentNode = []; listClick = [];
                    matched++;
                    this.setScore(score + 1000)
                }, 2500);
            } else {
                setTimeout(() => {
                    cardFlipAnimate(parentNode[0].ele.children[0], listClick[0])
                    cardFlipAnimate(parentNode[1].ele.children[0], listClick[1])
                    parentNode = []; listClick = []
                    this.setScore(score - 500)
                }, 1500);
            }
        }
    }
}