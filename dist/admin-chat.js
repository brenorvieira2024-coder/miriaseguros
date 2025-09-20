// Sistema de Chat Admin para Rosany Seguros
// Permite que você responda diretamente aos clientes

window.ROSANY_ADMIN_CHAT = {
    // Configurações
    adminName: "Rosany",
    isOnline: true,
    messages: [],
    
    // Função para adicionar mensagem do admin
    addAdminMessage: function(message) {
        const messageObj = {
            id: Date.now(),
            type: 'admin',
            message: message,
            timestamp: new Date(),
            adminName: this.adminName
        };
        
        this.messages.push(messageObj);
        this.displayMessage(messageObj);
        this.saveMessages();
    },
    
    // Função para exibir mensagem
    displayMessage: function(messageObj) {
        const messagesContainer = document.getElementById('rosanyChatMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `rosany-chat-message ${messageObj.type}`;
        messageDiv.innerHTML = `
            <div class="rosany-chat-message-content">
                ${messageObj.type === 'admin' ? 
                    `<strong>${messageObj.adminName}:</strong> ` : ''}${messageObj.message}
                <div class="message-time">${messageObj.timestamp.toLocaleTimeString('pt-BR')}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
    
    // Função para salvar mensagens
    saveMessages: function() {
        localStorage.setItem('rosany_chat_messages', JSON.stringify(this.messages));
    },
    
    // Função para carregar mensagens
    loadMessages: function() {
        const saved = localStorage.getItem('rosany_chat_messages');
        if (saved) {
            this.messages = JSON.parse(saved);
            this.messages.forEach(msg => this.displayMessage(msg));
        }
    },
    
    // Função para limpar chat
    clearChat: function() {
        this.messages = [];
        localStorage.removeItem('rosany_chat_messages');
        const messagesContainer = document.getElementById('rosanyChatMessages');
        if (messagesContainer) {
            messagesContainer.innerHTML = `
                <div class="rosany-chat-message bot">
                    <div class="rosany-chat-message-content">
                        Olá! 👋 Bem-vindo à Rosany Seguros!<br>
                        Como posso ajudá-lo hoje?
                    </div>
                </div>
            `;
        }
    },
    
    // Função para alternar status online/offline
    toggleStatus: function() {
        this.isOnline = !this.isOnline;
        const statusIndicator = document.querySelector('.status-indicator');
        if (statusIndicator) {
            statusIndicator.style.background = this.isOnline ? '#4CAF50' : '#ff4444';
        }
        
        // Adicionar mensagem de status
        const statusMessage = this.isOnline ? 
            "Rosany está online e pronta para atendê-lo!" :
            "Rosany está offline. Deixe sua mensagem que retornaremos em breve!";
            
        this.addAdminMessage(statusMessage);
    }
};

// Painel de controle para admin
function createAdminPanel() {
    const adminPanel = document.createElement('div');
    adminPanel.id = 'rosanyAdminPanel';
    adminPanel.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            left: 20px;
            background: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            z-index: 100000;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-width: 300px;
        ">
            <h3 style="margin: 0 0 15px 0; color: #333;">🎛️ Painel Admin - Rosany Seguros</h3>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Status:</label>
                <button id="toggleStatus" style="
                    padding: 8px 15px;
                    border: none;
                    border-radius: 5px;
                    background: #4CAF50;
                    color: white;
                    cursor: pointer;
                    margin-right: 10px;
                ">Online</button>
                <button onclick="window.ROSANY_ADMIN_CHAT.clearChat()" style="
                    padding: 8px 15px;
                    border: none;
                    border-radius: 5px;
                    background: #ff4444;
                    color: white;
                    cursor: pointer;
                ">Limpar Chat</button>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Responder Cliente:</label>
                <textarea id="adminMessage" placeholder="Digite sua resposta..." style="
                    width: 100%;
                    height: 60px;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    resize: vertical;
                    font-family: inherit;
                "></textarea>
                <button onclick="sendAdminMessage()" style="
                    margin-top: 8px;
                    padding: 8px 15px;
                    border: none;
                    border-radius: 5px;
                    background: #667eea;
                    color: white;
                    cursor: pointer;
                    width: 100%;
                ">Enviar Resposta</button>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Ações Rápidas:</label>
                <button onclick="sendQuickResponse('cotação')" style="
                    margin: 2px;
                    padding: 5px 10px;
                    border: none;
                    border-radius: 3px;
                    background: #f0f0f0;
                    cursor: pointer;
                    font-size: 12px;
                ">📋 Cotação</button>
                <button onclick="sendQuickResponse('informações')" style="
                    margin: 2px;
                    padding: 5px 10px;
                    border: none;
                    border-radius: 3px;
                    background: #f0f0f0;
                    cursor: pointer;
                    font-size: 12px;
                ">ℹ️ Info</button>
                <button onclick="sendQuickResponse('contato')" style="
                    margin: 2px;
                    padding: 5px 10px;
                    border: none;
                    border-radius: 3px;
                    background: #f0f0f0;
                    cursor: pointer;
                    font-size: 12px;
                ">📞 Contato</button>
            </div>
            
            <div style="font-size: 12px; color: #666;">
                💡 <strong>Dica:</strong> Use este painel para responder diretamente aos clientes no chat!
            </div>
        </div>
    `;
    
    document.body.appendChild(adminPanel);
    
    // Event listeners
    document.getElementById('toggleStatus').addEventListener('click', function() {
        window.ROSANY_ADMIN_CHAT.toggleStatus();
        this.textContent = window.ROSANY_ADMIN_CHAT.isOnline ? 'Online' : 'Offline';
        this.style.background = window.ROSANY_ADMIN_CHAT.isOnline ? '#4CAF50' : '#ff4444';
    });
    
    // Enter para enviar mensagem
    document.getElementById('adminMessage').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendAdminMessage();
        }
    });
}

// Função para enviar mensagem do admin
function sendAdminMessage() {
    const messageInput = document.getElementById('adminMessage');
    const message = messageInput.value.trim();
    
    if (message) {
        window.ROSANY_ADMIN_CHAT.addAdminMessage(message);
        messageInput.value = '';
    }
}

// Função para respostas rápidas
function sendQuickResponse(type) {
    const responses = {
        'cotação': 'Olá! Para fazer uma cotação personalizada, preciso de algumas informações. Qual tipo de seguro você precisa?',
        'informações': 'Claro! Oferecemos seguros para Auto, Residencial, Vida, Empresarial e Saúde. Qual te interessa mais?',
        'contato': 'Para um atendimento mais personalizado, você pode me contatar diretamente pelo WhatsApp: (27) 99999-9999'
    };
    
    const response = responses[type];
    if (response) {
        window.ROSANY_ADMIN_CHAT.addAdminMessage(response);
    }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(createAdminPanel, 2000); // Aguardar o chat carregar
        window.ROSANY_ADMIN_CHAT.loadMessages();
    });
} else {
    setTimeout(createAdminPanel, 2000);
    window.ROSANY_ADMIN_CHAT.loadMessages();
}

console.log("✅ Sistema Admin Chat carregado!");
console.log("🎛️ Painel de controle disponível no canto superior esquerdo");
