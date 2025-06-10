import { CardGrid } from '../components/CardGrid.js';

document.addEventListener('DOMContentLoaded', () => {
    // Get the grid containers
    const frontGrid = document.getElementById('card-fronts-grid');
    const backGrid = document.getElementById('card-backs-grid');
    
    // Create the card grid with 8 cards
    const cardGrid = new CardGrid(frontGrid, backGrid, 8);
    
    // Make it globally accessible
    window.cardGrid = cardGrid;
    
    // Get UI elements
    const clearBtn = document.getElementById('clear-btn');
    const saveStatus = document.getElementById('save-status');
    
    // Setup clear button
    clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all card data? This cannot be undone.')) {
            cardGrid.clearAll();
            updateSaveStatus('Data cleared');
        }
    });
    
    // Show initial save status
    if (cardGrid.hasStoredData()) {
        updateSaveStatus('Previous session restored');
    } else {
        updateSaveStatus('Ready');
    }
    
    // Monitor storage saves
    const originalSave = cardGrid.saveToStorage.bind(cardGrid);
    cardGrid.saveToStorage = function() {
        originalSave();
        updateSaveStatus('Saved');
        // Clear status after 2 seconds
        setTimeout(() => updateSaveStatus(''), 2000);
    };
    
    function updateSaveStatus(message) {
        saveStatus.textContent = message;
    }
});
