import Node from './Node.js'

export class Label extends Node{
    constructor(text,fontSize,fontColor){
        super();
        this._text='';
        this._fontSize='';
        this._fontColor='';
        if(text) this.text=text;
        if(fontSize) this.fontSize=fontSize;
        if(fontColor) this.fontColor=fontColor;
        }
    get text(){
        return this._text;
    }
    set text(val){
        this._text=val
        this.ele.innerHTML=this._text
    }
    get fontSize(){
        return this._fontSize
    }
    set fontSize(val){
        this._fontSize=val
        this.ele.style.fontSize=this._fontSize+'px'
    }
    get fontColor(){
        return this._fontColor
    }
    set fontColor(val){
        this._fontColor=val
        this.ele.style.color=this._fontColor
    }
    setText(val){
        this.text=val
    }
    
}