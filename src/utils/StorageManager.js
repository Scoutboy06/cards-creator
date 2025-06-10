export class StorageManager {
    constructor(storageKey = 'cards-creator-data') {
        this.storageKey = storageKey;
    }

    save(data) {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(this.storageKey, serializedData);
            console.log('Data saved to localStorage');
            return true;
        } catch (error) {
            console.error('Failed to save data to localStorage:', error);
            return false;
        }
    }

    load() {
        try {
            const serializedData = localStorage.getItem(this.storageKey);
            if (serializedData) {
                const data = JSON.parse(serializedData);
                console.log('Data loaded from localStorage');
                return data;
            }
            return null;
        } catch (error) {
            console.error('Failed to load data from localStorage:', error);
            return null;
        }
    }

    clear() {
        try {
            localStorage.removeItem(this.storageKey);
            console.log('Data cleared from localStorage');
            return true;
        } catch (error) {
            console.error('Failed to clear data from localStorage:', error);
            return false;
        }
    }

    exists() {
        return localStorage.getItem(this.storageKey) !== null;
    }
}
