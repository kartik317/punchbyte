// Function to parse punch card and convert it back to text
function parsePunchCard(punchCardText) {
    // Split the input by lines
    const lines = punchCardText.trim().split('\n');
    
    // Find the bit lines (they should have format "Bit X | ...")
    const bitLines = lines.filter(line => line.startsWith('Bit ') && line.includes(' | '));
    
    if (bitLines.length !== 8) {
        return { success: false, message: "Invalid punch card format. Expected 8 bit lines." };
    }
    
    // Extract the visual representation from each bit line
    const visualBits = bitLines.map(line => {
        const separatorIndex = line.indexOf(' | ');
        if (separatorIndex === -1) return "";
        return line.substring(separatorIndex + 3); // +3 to skip " | "
    });
    
    // Determine the number of characters in the original message
    const charCount = Math.floor(visualBits[0].length / 2); // Each char takes 2 spaces (● or space + space)
    
    if (charCount === 0) {
        return { success: false, message: "No characters found in the punch card." };
    }
    
    // Reconstruct binary representations for each character
    const binaryChars = [];
    for (let charIndex = 0; charIndex < charCount; charIndex++) {
        let binaryChar = '';
        for (let bitIndex = 0; bitIndex < 8; bitIndex++) {
            const visualChar = visualBits[bitIndex].charAt(charIndex * 2); // Get the visual character (● or space)
            binaryChar += (visualChar === '●') ? '1' : '0';
        }
        binaryChars.push(binaryChar);
    }
    
    // Convert binary to text
    let resultText = '';
    for (const binaryChar of binaryChars) {
        const charCode = parseInt(binaryChar, 2);
        resultText += String.fromCharCode(charCode);
    }
    
    return { success: true, text: resultText };
}

// Function to copy the decoded text to clipboard
function copyToClipboard() {
    const outputElement = document.getElementById('output');
    const textToCopy = outputElement.textContent.replace(/^Decoded Text: "/, '').replace(/"$/, '');
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // Visual feedback for successful copy
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
    const punchcardInput = document.getElementById('punchcard-input');
    const convertBtn = document.querySelector('.convert-btn');
    const outputElement = document.getElementById('output');
    
    // Add event listener to the convert button
    convertBtn.addEventListener('click', () => {
        const inputText = punchcardInput.value.trim();
        
        if (inputText) {
            const result = parsePunchCard(inputText);
            if (result.success) {
                outputElement.textContent = `Decoded Text: "${result.text}"`;
            } else {
                outputElement.textContent = `Error: ${result.message}`;
            }
        } else {
            outputElement.textContent = "Please enter a punch card to decode.";
        }
    });
    
    // Allow Ctrl+Enter to trigger conversion (common for textareas)
    punchcardInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            convertBtn.click();
        }
    });
    
    window.copyToClipboard = copyToClipboard;
});