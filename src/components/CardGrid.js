import { Card } from './Card.js';
import { StorageManager } from '../utils/StorageManager.js';

export class CardGrid {
    constructor(frontContainer, backContainer, cardCount = 8) {
        this.frontContainer = frontContainer;
        this.backContainer = backContainer;
        this.cardCount = cardCount;
        this.cards = [];
        this.storageManager = new StorageManager();
        this.autoSave = true;
        this.saveTimeout = null;
        
        this.createCards();
        this.renderCards();
        this.loadFromStorage();
    }

    createCards() {
        for (let i = 1; i <= this.cardCount; i++) {
            const card = new Card(i, () => this.saveToStorage());
            this.cards.push(card);
        }
    }

    renderCards() {
        // Clear existing content
        this.frontContainer.innerHTML = '';
        this.backContainer.innerHTML = '';

        // Add front cards
        this.cards.forEach(card => {
            this.frontContainer.appendChild(card.getFrontElement());
        });

        // Add back cards
        this.cards.forEach(card => {
            this.backContainer.appendChild(card.getBackElement());
        });
    }

    getCard(id) {
        return this.cards.find(card => card.id === id);
    }

    getAllCards() {
        return this.cards;
    }

    exportData() {
        return {
            timestamp: new Date().toISOString(),
            cards: this.cards.map(card => ({
                id: card.id,
                image: card.getImageSrc(),
                text: card.getText()
            }))
        };
    }

    importData(data) {
        if (data && data.cards) {
            data.cards.forEach(cardData => {
                const card = this.getCard(cardData.id);
                if (card) {
                    if (cardData.image) card.setImage(cardData.image);
                    if (cardData.text) card.setText(cardData.text);
                }
            });
        }
    }

    saveToStorage() {
        // Debounce saving to avoid too frequent saves
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }
        
        this.saveTimeout = setTimeout(() => {
            const data = this.exportData();
            this.storageManager.save(data);
        }, 500); // Save after 500ms of inactivity
    }

    loadFromStorage() {
        const data = this.storageManager.load();
        if (data) {
            this.importData(data);
            console.log('Loaded saved data from previous session');
        }
    }

    clearAll() {
        // Clear all card data
        this.cards.forEach(card => card.clear());
        
        // Clear from localStorage
        this.storageManager.clear();
        
        console.log('All card data cleared');
    }

    hasStoredData() {
        return this.storageManager.exists();
    }
}
