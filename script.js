function copyToClipboard() {
  const text = document.getElementById("code").innerText;
  
  // Create a temporary textarea element to hold the text
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  
  // Select the text and copy it
  textarea.select();
  let success = false;
  try {
    success = document.execCommand('copy');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
  
  // Clean up
  document.body.removeChild(textarea);
  
  let originalText = document.querySelector(".copy-btn").textContent;
  
  if(success){
    document.querySelector(".copy-btn").textContent = "Copied";
    setTimeout(() => {
      document.querySelector(".copy-btn").textContent = originalText;
    }, 2000);
  } else{
    document.querySelector(".copy-btn").textContent = "Faild";
    setTimeout(() => {
      document.querySelector(".copy-btn").textContent = originalText;
    }, 2000);
  }
  
}