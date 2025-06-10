import { CardFront } from './CardFront.js';
import { CardBack } from './CardBack.js';

export class Card {
    constructor(id, onDataChange) {
        this.id = id;
        this.onDataChange = onDataChange;
        
        this.front = new CardFront(id, () => this.triggerSave());
        this.back = new CardBack(id, () => this.triggerSave());
    }

    triggerSave() {
        if (this.onDataChange) {
            this.onDataChange();
        }
    }

    getFrontElement() {
        return this.front.getElement();
    }

    getBackElement() {
        return this.back.getElement();
    }

    setText(text) {
        this.back.setText(text);
    }

    getText() {
        return this.back.getText();
    }

    setImage(imageSrc) {
        this.front.setImage(imageSrc);
    }

    getImageSrc() {
        return this.front.getImageSrc();
    }

    clear() {
        this.front.clear();
        this.back.clear();
    }
}
