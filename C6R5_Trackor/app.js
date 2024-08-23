const TOTAL_ITEM_A = 165000; // Approx C6R5 cost

let currentProgressA = parseInt(localStorage.getItem('currentProgressA')) || 0;
let progressSaved = true; 

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const progressPercentage = (currentProgressA / TOTAL_ITEM_A) * 100;
    progressBar.style.width = progressPercentage + '%';
    progressText.textContent = progressPercentage.toFixed(2) + '%';

    if (progressPercentage < 20) {
        progressBar.style.backgroundColor = 'red';
    } else if (progressPercentage <= 85) {
        progressBar.style.backgroundColor = 'yellow';
    } else {
        progressBar.style.backgroundColor = 'green';
    }

    if (progressPercentage > 100) {
        progressBar.style.width = progressPercentage + '%';
    }

    updateStatus();
}

function updateStatus() {
    const primogems = currentProgressA % 160;
    const fates = Math.floor(currentProgressA / 160);
    document.getElementById('primogemsStatus').textContent = `Primogems: ${primogems}`;
    document.getElementById('fatesStatus').textContent = `Fates: ${fates}`;
}

function addProgress(value) {
    currentProgressA += value;
    if (currentProgressA < 0) {
        currentProgressA = 0;
    }
    progressSaved = false; 
    updateProgressBar();
}

function updateProgress() {
    const itemAInput = document.getElementById('itemAInput').value;
    const itemBInput = document.getElementById('itemBInput').value;
    const itemAValue = parseInt(itemAInput) || 0;
    const itemBValue = (parseInt(itemBInput) || 0) * 160;

    currentProgressA += itemAValue + itemBValue;
    if (currentProgressA < 0) {
        currentProgressA = 0;
    }
    progressSaved = false;  
    updateProgressBar();
}

function setPrimogems() {
    const itemAInput = document.getElementById('primogemInput').value;
    const itemAValue = (parseInt(itemAInput) || 0);
    if (currentProgressA !== 0) {
        if (!confirm('Setting this value will overwrite the current progress. Do you wish to continue?')) {
            return;
        }
    }
    currentProgressA = (Math.floor(currentProgressA / 160) * 160) + itemAValue;
    if (currentProgressA < 0) {
        currentProgressA = 0;
    }
    progressSaved = false;  
    updateProgressBar();
}

function setFates() {
    const itemBInput = document.getElementById('fateInput').value;
    const itemBValue = (parseInt(itemBInput) || 0) * 160;
    if (currentProgressA !== 0) {
        if (!confirm('Setting this value will overwrite the current progress. Do you wish to continue?')) {
            return;
        }
    }
    currentProgressA = (currentProgressA % 160) + itemBValue;
    if (currentProgressA < 0) {
        currentProgressA = 0;
    }
    progressSaved = false;  
    updateProgressBar();
}

function saveProgress() {
    localStorage.setItem('currentProgressA', currentProgressA);
    progressSaved = true; 
    alert('Progress saved, you\'re good to leave!');
}

function resetProgress() {
    if (confirm('Are you sure you want to reset your progress? This action cannot be undone.')) {
        localStorage.removeItem('currentProgressA');
        currentProgressA = 0;
        progressSaved = true; 
        updateProgressBar();
        alert('Progress has been reset.');
    }
}

window.addEventListener('beforeunload', (event) => {
    if (!progressSaved) {
        event.preventDefault();
        event.returnValue = '';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateProgressBar();
});
