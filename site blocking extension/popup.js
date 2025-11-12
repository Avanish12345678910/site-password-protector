// Popup script for managing protected sites

document.addEventListener('DOMContentLoaded', () => {
  loadProtectedSites();
  
  document.getElementById('add-site-btn').addEventListener('click', addSite);
  document.getElementById('domain-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addSite();
  });
  document.getElementById('password-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addSite();
  });
});

async function addSite() {
  const domainInput = document.getElementById('domain-input');
  const passwordInput = document.getElementById('password-input');
  const messageDiv = document.getElementById('message');
  
  let domain = domainInput.value.trim().toLowerCase();
  const password = passwordInput.value;
  
  // Clear previous message
  messageDiv.textContent = '';
  messageDiv.className = 'message';
  
  // Validate inputs
  if (!domain || !password) {
    showMessage('Please enter both domain and password', 'error');
    return;
  }
  
  // Clean up domain (remove http://, https://, www., trailing slashes)
  domain = domain
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
    .split('/')[0]; // Take only domain part
  
  // Validate domain format
  if (!isValidDomain(domain)) {
    showMessage('Please enter a valid domain (e.g., example.com)', 'error');
    return;
  }
  
  // Get existing protected sites
  const result = await chrome.storage.sync.get(['protectedSites']);
  const protectedSites = result.protectedSites || {};
  
  // Add new site
  protectedSites[domain] = {
    password: password,
    addedAt: Date.now()
  };
  
  // Save to storage
  await chrome.storage.sync.set({ protectedSites });
  
  // Clear inputs
  domainInput.value = '';
  passwordInput.value = '';
  
  // Show success message
  showMessage(`Successfully added ${domain}`, 'success');
  
  // Reload list
  loadProtectedSites();
}

async function loadProtectedSites() {
  const result = await chrome.storage.sync.get(['protectedSites']);
  const protectedSites = result.protectedSites || {};
  const sitesListDiv = document.getElementById('sites-list');
  
  if (Object.keys(protectedSites).length === 0) {
    sitesListDiv.innerHTML = '<p class="empty-message">No protected sites yet</p>';
    return;
  }
  
  sitesListDiv.innerHTML = '';
  
  for (const [domain, data] of Object.entries(protectedSites)) {
    const siteItem = document.createElement('div');
    siteItem.className = 'site-item';
    siteItem.innerHTML = `
      <div class="site-info">
        <div class="site-domain">${domain}</div>
        <div class="site-password">Password: ${'•'.repeat(data.password.length)}</div>
      </div>
      <div class="site-actions">
        <button class="btn-small btn-clear-session" data-domain="${domain}">Clear Session</button>
        <button class="btn-small btn-delete" data-domain="${domain}">Delete</button>
      </div>
    `;
    
    sitesListDiv.appendChild(siteItem);
  }
  
  // Add event listeners for delete buttons
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const domain = e.target.dataset.domain;
      deleteSite(domain);
    });
  });
  
  // Add event listeners for clear session buttons
  document.querySelectorAll('.btn-clear-session').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const domain = e.target.dataset.domain;
      clearSession(domain);
    });
  });
}

async function deleteSite(domain) {
  if (!confirm(`Are you sure you want to remove password protection from ${domain}?`)) {
    return;
  }
  
  const result = await chrome.storage.sync.get(['protectedSites']);
  const protectedSites = result.protectedSites || {};
  
  delete protectedSites[domain];
  
  await chrome.storage.sync.set({ protectedSites });
  
  // Also clear session
  await clearSession(domain);
  
  showMessage(`Removed ${domain}`, 'success');
  loadProtectedSites();
}

async function clearSession(domain) {
  const sessionKey = `session_${domain}`;
  await chrome.storage.local.remove(sessionKey);
  showMessage(`Session cleared for ${domain}`, 'success');
}

function showMessage(text, type) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  
  setTimeout(() => {
    messageDiv.textContent = '';
    messageDiv.className = 'message';
  }, 3000);
}

function isValidDomain(domain) {
  // Simple domain validation regex
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?(\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?)*\.[a-zA-Z]{2,}$/;
  return domainRegex.test(domain) || domain === 'localhost' || /^(\d{1,3}\.){3}\d{1,3}$/.test(domain);
}
