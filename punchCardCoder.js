// Function to convert string to binary
function stringToBinary(message) {
    const binaryArray = [];
    
    for (let i = 0; i < message.length; i++) {
        const binary = message.charCodeAt(i).toString(2).padStart(8, '0');
        binaryArray.push(binary);
    }
    
    return binaryArray;
}

// Function to create punch card visualization
function createPunchCard(message) {
    const binaryArray = stringToBinary(message);
    
    const rows = ["Bit 7", "Bit 6", "Bit 5", "Bit 4", "Bit 3", "Bit 2", "Bit 1", "Bit 0"];
    const visual = Array(8).fill("");
    
    for (let bitPos = 0; bitPos < 8; bitPos++) {
        for (let byte of binaryArray) {
            visual[bitPos] += byte[bitPos] === "1" ? "● " : "  ";
        }
    }
    
    let punchCard = ``;
    
    for (let i = 0; i < 8; i++) {
        punchCard += `${rows[i]} | ${visual[i]}\n`;
    }
    
    return punchCard;
}

// Function to copy the punch card to clipboard
function copyToClipboard() {
    const codeElement = document.getElementById('code');
    const textToCopy = codeElement.textContent;
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // Optional: Add visual feedback for successful copy
            const copyBtn = document.querySelector('.copy-btn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
}

// Set up event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.querySelector('input[type="text"]');
    const convertBtn = document.querySelector('.convert-btn');
    const codeElement = document.getElementById('code');
    
    // Add event listener to the convert button
    convertBtn.addEventListener('click', () => {
        const inputText = inputField.value.trim();
        
        if (inputText) {
            const punchCard = createPunchCard(inputText);
            codeElement.textContent = punchCard;
        } else {
            codeElement.textContent = "Please enter some text to convert.";
        }
    });
    
    // Also allow Enter key to trigger conversion
    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            convertBtn.click();
        }
    });
    
    // Make the copy button work
    window.copyToClipboard = copyToClipboard;
});