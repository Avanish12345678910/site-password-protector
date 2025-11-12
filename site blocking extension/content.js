// Content script to block page and show password prompt

(async function() {
  const currentDomain = window.location.hostname;
  
  // Check if this site is protected
  const response = await chrome.runtime.sendMessage({
    action: 'isProtected',
    domain: currentDomain
  });
  
  if (response.protected) {
    blockPage();
  }
})();

function blockPage() {
  // Stop page execution
  document.documentElement.innerHTML = '';
  
  // Create password prompt overlay
  const overlay = document.createElement('div');
  overlay.id = 'site-password-overlay';
  overlay.innerHTML = `
    <div class="password-container">
      <div class="password-box">
        <div class="lock-icon">🔒</div>
        <h1>Password Protected Site</h1>
        <p>This website is password protected. Please enter the password to continue.</p>
        <div class="input-group">
          <input type="password" id="site-password-input" placeholder="Enter password" autocomplete="off">
          <button id="site-password-submit">Unlock</button>
        </div>
        <div id="error-message" class="error-message"></div>
      </div>
    </div>
  `;
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    #site-password-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      z-index: 2147483647;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }
    
    .password-container {
      width: 100%;
      max-width: 400px;
      padding: 20px;
    }
    
    .password-box {
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      text-align: center;
      animation: slideIn 0.4s ease-out;
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .lock-icon {
      font-size: 60px;
      margin-bottom: 20px;
    }
    
    .password-box h1 {
      margin: 0 0 10px 0;
      font-size: 24px;
      color: #333;
    }
    
    .password-box p {
      margin: 0 0 30px 0;
      color: #666;
      font-size: 14px;
      line-height: 1.6;
    }
    
    .input-group {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
    }
    
    #site-password-input {
      flex: 1;
      padding: 12px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.3s;
    }
    
    #site-password-input:focus {
      outline: none;
      border-color: #667eea;
    }
    
    #site-password-submit {
      padding: 12px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    #site-password-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    
    #site-password-submit:active {
      transform: translateY(0);
    }
    
    .error-message {
      color: #e74c3c;
      font-size: 14px;
      min-height: 20px;
      animation: shake 0.5s;
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }
  `;
  
  document.documentElement.appendChild(overlay);
  document.head.appendChild(style);
  
  // Setup event listeners
  const input = document.getElementById('site-password-input');
  const button = document.getElementById('site-password-submit');
  const errorDiv = document.getElementById('error-message');
  
  async function checkPassword() {
    const password = input.value;
    
    if (!password) {
      errorDiv.textContent = 'Please enter a password';
      return;
    }
    
    button.disabled = true;
    button.textContent = 'Checking...';
    
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'verifyPassword',
        domain: currentDomain,
        password: password
      });
      
      if (response.success) {
        errorDiv.style.color = '#27ae60';
        errorDiv.textContent = 'Access granted! Reloading...';
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        errorDiv.style.color = '#e74c3c';
        errorDiv.textContent = 'Incorrect password. Please try again.';
        button.disabled = false;
        button.textContent = 'Unlock';
        input.value = '';
        input.focus();
      }
    } catch (error) {
      errorDiv.textContent = 'Error occurred. Please try again.';
      button.disabled = false;
      button.textContent = 'Unlock';
    }
  }
  
  button.addEventListener('click', checkPassword);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      checkPassword();
    }
  });
  
  input.focus();
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkPassword') {
    blockPage();
  }
});
