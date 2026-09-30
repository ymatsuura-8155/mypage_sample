document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    
    // Web App States
    const webUnauth = document.getElementById('web-unauthenticated');
    const webAuthn = document.getElementById('web-authenticating');
    const webAuthd = document.getElementById('web-authenticated');
    
    // Smartphone States
    const spHome = document.getElementById('sp-home');
    const spPerm = document.getElementById('sp-permission');
    const spSuccess = document.getElementById('sp-success');
    
    // Buttons
    const btnWebLogin = document.getElementById('btn-web-login');
    const btnSpAllow = document.getElementById('btn-sp-allow');
    const btnSpDeny = document.getElementById('btn-sp-deny');
    const btnSpClose = document.getElementById('btn-sp-close');
    const btnAiApply = document.getElementById('btn-ai-apply');

    // AI Agent UI
    const aiOverlay = document.getElementById('ai-processing-overlay');
    const aiStatusText = document.getElementById('ai-status-text');
    const aiProgressBar = document.querySelector('.progress-bar-fill');
    const aiProposalItem = document.getElementById('ai-proposal-item');
    const progressList = document.querySelector('.progress-list');

    // --- Helper Functions ---
    
    function switchWebState(showElement) {
        webUnauth.classList.remove('active');
        webAuthn.classList.remove('active');
        webAuthd.classList.remove('active');
        showElement.classList.add('active');
    }

    function switchSpState(showElement) {
        spHome.classList.remove('active');
        spPerm.classList.remove('active');
        spSuccess.classList.remove('active');
        showElement.classList.add('active');
    }

    // --- Event Listeners ---

    // 1. Web App: Click Login
    btnWebLogin.addEventListener('click', () => {
        // Change Web app to loading state
        switchWebState(webAuthn);
        
        // Change Smartphone to permission request state (simulate network delay)
        setTimeout(() => {
            switchSpState(spPerm);
        }, 600);
    });

    // 2. Smartphone: Click Allow
    btnSpAllow.addEventListener('click', () => {
        // Change Web app to dashboard after a slight delay
        setTimeout(() => {
            switchWebState(webAuthd);
        }, 500);

        // Change Smartphone to success state
        switchSpState(spSuccess);
    });

    // 3. Smartphone: Click Deny
    btnSpDeny.addEventListener('click', () => {
        // Reset both sides
        switchWebState(webUnauth);
        switchSpState(spHome);
    });

    // 4. Smartphone: Click Close Success Message
    btnSpClose.addEventListener('click', () => {
        // Return smartphone to home screen
        switchSpState(spHome);
    });

    // 5. AI Agent: Click Apply
    if (btnAiApply) {
        btnAiApply.addEventListener('click', () => {
            // Show overlay
            aiOverlay.classList.remove('hidden');
            aiProgressBar.style.width = '0%';
            aiStatusText.textContent = '保育料無償化の申請に必要な情報を収集しています...';

            // Step 1
            setTimeout(() => {
                aiProgressBar.style.width = '40%';
                aiStatusText.textContent = '公金受取口座の情報を連携中...';
            }, 1200);

            // Step 2
            setTimeout(() => {
                aiProgressBar.style.width = '80%';
                aiStatusText.textContent = '申請データを作成し、電子署名を付与しています...';
            }, 2400);

            // Step 3 (Completion)
            setTimeout(() => {
                aiProgressBar.style.width = '100%';
                aiStatusText.textContent = '申請が完了しました！';
            }, 3600);

            // Hide and update UI
            setTimeout(() => {
                aiOverlay.classList.add('hidden');
                
                // Remove proposal
                if (aiProposalItem) {
                    aiProposalItem.style.display = 'none';
                }

                // Add to progress list
                const now = new Date();
                const todayStr = `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日`;
                
                const newProgressHTML = `
                    <div class="progress-item" style="animation: fadeIn 0.5s ease-out;">
                        <div class="item-info">
                            <h4>保育料無償化 認定申請</h4>
                            <span class="date">${todayStr} 申請 (AI代理)</span>
                        </div>
                        <div class="status badge-review" style="background-color: #e0e7ff; color: #3730a3;">受付済</div>
                    </div>
                `;
                progressList.insertAdjacentHTML('afterbegin', newProgressHTML);
                
            }, 4500);
        });
    }

    // Clock update for smartphone
    const timeDisplay = document.querySelector('.status-bar .time');
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}`;
    }
    updateClock();
    setInterval(updateClock, 60000);
});
