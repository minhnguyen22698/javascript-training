export default class Node{
    constructor(){
        this._initElement();
        this._x=0;
        this._y=0;
        this._width=0;
        this._height=0;
        this._active=true;
        this.children=[];
    }

    _initElement(){
        this.ele=document.createElement('div');
        this.ele.style.position='absolute'
    }
    get x(){
        return this._x;
    }
    set x(value){
        this._x=value;
        this.ele.style.left=this._x+'px';
    }
    get y(){
        return this._y;
    }
    set y(value){
        this._y=value
        this.ele.style.top=this._y+'px'
    }
    get width(){
        return this._width;
    }
    set width(value){
        this._width=value
        this.ele.style.width=this._width+'px'
    }
    get height(){
        return this._height;
    }
    set height(value){
        this._height=value;
        this.ele.style.height=this._height+'px';
    }
    get active() {
        return this._active;
    }

    set active(value) {
        this._active = value;
        this.ele.style.display = this._active ? "block" : "none";
    }
    addChild(node){
        this.ele.appendChild(node.ele)
    //  this.children.push(node)
    }
    on(evt,listener){
        this.ele.addEventListener(evt,listener)
    }

}