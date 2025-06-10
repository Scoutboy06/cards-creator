export class CardBack {
    constructor(id, onTextChange) {
        this.id = id;
        this.onTextChange = onTextChange;
        this.backTextarea = null;
        
        this.createElement();
        this.setupEventListeners();
    }

    createElement() {
        const container = document.createElement('div');
        container.className = 'card-container';
        container.innerHTML = `
            <div class="card-content card-back">
                <textarea id="card-back-text-${this.id}" placeholder="Enter card text..."></textarea>
            </div>
        `;
        
        this.container = container;
        this.backTextarea = container.querySelector(`#card-back-text-${this.id}`);
    }

    setupEventListeners() {
        // Auto-save on textarea change
        this.backTextarea.addEventListener('input', () => {
            if (this.onTextChange) {
                this.onTextChange();
            }
        });

        // Also save on blur (when user leaves the textarea)
        this.backTextarea.addEventListener('blur', () => {
            if (this.onTextChange) {
                this.onTextChange();
            }
        });
    }

    getElement() {
        return this.container;
    }

    setText(text) {
        if (this.backTextarea) {
            this.backTextarea.value = text;
        }
    }

    getText() {
        return this.backTextarea ? this.backTextarea.value : '';
    }

    clear() {
        this.setText('');
        if (this.onTextChange) {
            this.onTextChange();
        }
    }
}
