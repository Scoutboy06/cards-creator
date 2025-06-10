export class CardFront {
    constructor(id, onImageChange) {
        this.id = id;
        this.onImageChange = onImageChange;
        this.frontImg = null;
        this.fileInput = null;
        this.uploadOverlay = null;
        this.cardFront = null;
        
        this.createElement();
        this.setupEventListeners();
    }

    createElement() {
        const container = document.createElement('div');
        container.className = 'card-container';
        container.innerHTML = `
            <div class="card-content card-front" data-card-id="${this.id}">
                <img id="card-front-img-${this.id}" 
                     src="https://placehold.co/300x171/E0E0E0/333333?text=Click+to+Upload+${this.id}"
                     alt="Business Card Front ${this.id}" />
                <input type="file" id="file-input-${this.id}" 
                       class="hidden file-input"
                       accept="image/jpeg, image/png, image/gif, image/svg+xml, image/webp" />
                <div class="upload-overlay">
                    <span>+</span>Click to Upload
                </div>
            </div>
        `;
        
        this.container = container;
        this.frontImg = container.querySelector(`#card-front-img-${this.id}`);
        this.fileInput = container.querySelector(`#file-input-${this.id}`);
        this.uploadOverlay = container.querySelector('.upload-overlay');
        this.cardFront = container.querySelector('.card-front');
    }

    setupEventListeners() {
        // Click to upload functionality
        this.cardFront.addEventListener('click', () => {
            this.fileInput.click();
        });

        // Handle file selection
        this.fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];

            if (file) {
                if (!file.type.startsWith('image/')) {
                    console.error('Selected file is not an image.');
                    return;
                }

                const reader = new FileReader();

                reader.onload = (e) => {
                    this.frontImg.src = e.target.result;
                    this.uploadOverlay.style.opacity = 0;
                    if (this.onImageChange) {
                        this.onImageChange();
                    }
                };

                reader.onerror = (e) => {
                    console.error('Error reading file:', e);
                };

                reader.readAsDataURL(file);
            }
        });

        // Handle file dialog cancel
        this.fileInput.addEventListener('cancel', () => {
            if (!this.frontImg.src || this.frontImg.src.includes('placehold.co')) {
                this.uploadOverlay.style.opacity = 0;
            }
        });
    }

    getElement() {
        return this.container;
    }

    setImage(imageSrc) {
        if (this.frontImg && imageSrc) {
            this.frontImg.src = imageSrc;
            // Only hide overlay if it's not a placeholder image
            if (!imageSrc.includes('placehold.co')) {
                this.uploadOverlay.style.opacity = 0;
            } else {
                this.uploadOverlay.style.opacity = '';
            }
        }
    }

    getImageSrc() {
        return this.frontImg ? this.frontImg.src : '';
    }

    clear() {
        // Reset image to placeholder
        this.frontImg.src = `https://placehold.co/300x171/E0E0E0/333333?text=Click+to+Upload+${this.id}`;
        
        // Reset file input
        this.fileInput.value = '';
        
        // Show upload overlay again by removing the inline style
        this.uploadOverlay.style.opacity = '';
        
        // Trigger save after clearing
        if (this.onImageChange) {
            this.onImageChange();
        }
    }
}
