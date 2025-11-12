// Background script for managing password-protected sites

// Listen for web navigation events
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return; // Only handle main frame
  
  const url = new URL(details.url);
  const domain = url.hostname;
  
  // Check if this site is password protected
  const result = await chrome.storage.sync.get(['protectedSites']);
  const protectedSites = result.protectedSites || {};
  
  if (protectedSites[domain]) {
    // Send message to content script to show password prompt
    chrome.tabs.sendMessage(details.tabId, {
      action: 'checkPassword',
      domain: domain
    }).catch(() => {
      // Content script might not be ready yet, will be handled by content script on load
    });
  }
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'verifyPassword') {
    verifyPassword(request.domain, request.password).then(sendResponse);
    return true; // Will respond asynchronously
  } else if (request.action === 'isProtected') {
    isProtected(request.domain).then(sendResponse);
    return true;
  }
});

async function verifyPassword(domain, password) {
  const result = await chrome.storage.sync.get(['protectedSites']);
  const protectedSites = result.protectedSites || {};
  
  if (protectedSites[domain] && protectedSites[domain].password === password) {
    // Store temporary access token
    const sessionKey = `session_${domain}`;
    const sessionData = {
      timestamp: Date.now(),
      expires: Date.now() + (30 * 60 * 1000) // 30 minutes
    };
    
    await chrome.storage.local.set({ [sessionKey]: sessionData });
    return { success: true };
  }
  
  return { success: false };
}

async function isProtected(domain) {
  const result = await chrome.storage.sync.get(['protectedSites']);
  const protectedSites = result.protectedSites || {};
  
  if (!protectedSites[domain]) {
    return { protected: false };
  }
  
  // Check if there's a valid session
  const sessionKey = `session_${domain}`;
  const sessionResult = await chrome.storage.local.get([sessionKey]);
  const session = sessionResult[sessionKey];
  
  if (session && session.expires > Date.now()) {
    return { protected: false }; // Has valid session
  }
  
  return { protected: true };
}

// Clear expired sessions periodically
setInterval(async () => {
  const allData = await chrome.storage.local.get(null);
  const now = Date.now();
  
  for (const key in allData) {
    if (key.startsWith('session_') && allData[key].expires < now) {
      await chrome.storage.local.remove(key);
    }
  }
}, 60000); // Check every minute
