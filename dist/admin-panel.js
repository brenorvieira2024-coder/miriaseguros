// Painel Administrativo para Chat Rosany Seguros
// Permite resposta direta aos clientes

window.ROSANY_ADMIN_PANEL = {
    // Configurações
    adminName: "Rosany",
    isOnline: true,
    messages: [],
    currentCustomer: null,
    
    // Inicializar painel
    init: function() {
        this.createAdminPanel();
        this.loadMessages();
        this.setupEventListeners();
        console.log("✅ Painel Admin Rosany Seguros inicializado!");
    },
    
    // Criar painel administrativo
    createAdminPanel: function() {
        const panel = document.createElement('div');
        panel.id = 'rosanyAdminPanel';
        panel.innerHTML = `
            <div class="admin-panel-container">
                <div class="admin-panel-header">
                    <h3>🎛️ Painel Admin - Rosany Seguros</h3>
                    <button class="admin-close-btn" onclick="this.parentElement.parentElement.parentElement.style.display='none'">×</button>
                </div>
                
                <div class="admin-panel-content">
                    <!-- Status e Controles -->
                    <div class="admin-section">
                        <h4>📊 Status do Atendimento</h4>
                        <div class="status-controls">
                            <button id="toggleStatus" class="status-btn online">🟢 Online</button>
                            <button onclick="window.ROSANY_ADMIN_PANEL.clearChat()" class="clear-btn">🗑️ Limpar Chat</button>
                            <button onclick="window.ROSANY_ADMIN_PANEL.exportChat()" class="export-btn">📥 Exportar</button>
                        </div>
                    </div>
                    
                    <!-- Resposta Rápida -->
                    <div class="admin-section">
                        <h4>💬 Responder Cliente</h4>
                        <div class="response-area">
                            <textarea id="adminMessage" placeholder="Digite sua resposta para o cliente..." rows="3"></textarea>
                            <button onclick="window.ROSANY_ADMIN_PANEL.sendMessage()" class="send-btn">📤 Enviar</button>
                        </div>
                    </div>
                    
                    <!-- Respostas Pré-definidas -->
                    <div class="admin-section">
                        <h4>⚡ Respostas Rápidas</h4>
                        <div class="quick-responses">
                            <button onclick="window.ROSANY_ADMIN_PANEL.sendQuickResponse('saudacao')" class="quick-btn">👋 Saudação</button>
                            <button onclick="window.ROSANY_ADMIN_PANEL.sendQuickResponse('cotacao')" class="quick-btn">📋 Cotação</button>
                            <button onclick="window.ROSANY_ADMIN_PANEL.sendQuickResponse('informacoes')" class="quick-btn">ℹ️ Informações</button>
                            <button onclick="window.ROSANY_ADMIN_PANEL.sendQuickResponse('contato')" class="quick-btn">📞 Contato</button>
                            <button onclick="window.ROSANY_ADMIN_PANEL.sendQuickResponse('emergencia')" class="quick-btn">🚨 Emergência</button>
                            <button onclick="window.ROSANY_ADMIN_PANEL.sendQuickResponse('agradecimento')" class="quick-btn">🙏 Agradecimento</button>
                        </div>
                    </div>
                    
                    <!-- Estatísticas -->
                    <div class="admin-section">
                        <h4>📈 Estatísticas</h4>
                        <div class="stats">
                            <div class="stat-item">
                                <span class="stat-label">Mensagens Hoje:</span>
                                <span class="stat-value" id="messagesToday">0</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Clientes Atendidos:</span>
                                <span class="stat-value" id="customersServed">0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Adicionar CSS
        const style = document.createElement('style');
        style.textContent = `
            .admin-panel-container {
                position: fixed;
                top: 20px;
                left: 20px;
                width: 350px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                z-index: 100000;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                border: 1px solid #e0e0e0;
                max-height: 80vh;
                overflow-y: auto;
            }
            
            .admin-panel-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 20px;
                border-radius: 15px 15px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .admin-panel-header h3 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
            }
            
            .admin-close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .admin-close-btn:hover {
                background: rgba(255,255,255,0.2);
            }
            
            .admin-panel-content {
                padding: 20px;
            }
            
            .admin-section {
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #f0f0f0;
            }
            
            .admin-section:last-child {
                border-bottom: none;
                margin-bottom: 0;
            }
            
            .admin-section h4 {
                margin: 0 0 10px 0;
                color: #333;
                font-size: 14px;
                font-weight: 600;
            }
            
            .status-controls {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
            }
            
            .status-btn {
                padding: 8px 12px;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                font-size: 12px;
                font-weight: 500;
                transition: all 0.3s;
            }
            
            .status-btn.online {
                background: #4CAF50;
                color: white;
            }
            
            .status-btn.offline {
                background: #ff4444;
                color: white;
            }
            
            .clear-btn, .export-btn {
                padding: 8px 12px;
                border: 1px solid #ddd;
                border-radius: 20px;
                background: white;
                cursor: pointer;
                font-size: 12px;
                transition: all 0.3s;
            }
            
            .clear-btn:hover {
                background: #ff4444;
                color: white;
                border-color: #ff4444;
            }
            
            .export-btn:hover {
                background: #2196F3;
                color: white;
                border-color: #2196F3;
            }
            
            .response-area {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            #adminMessage {
                width: 100%;
                padding: 10px;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-family: inherit;
                font-size: 14px;
                resize: vertical;
                min-height: 60px;
            }
            
            #adminMessage:focus {
                outline: none;
                border-color: #667eea;
            }
            
            .send-btn {
                padding: 10px 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: transform 0.2s;
            }
            
            .send-btn:hover {
                transform: translateY(-2px);
            }
            
            .quick-responses {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
            }
            
            .quick-btn {
                padding: 8px 12px;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                background: white;
                cursor: pointer;
                font-size: 12px;
                transition: all 0.3s;
                text-align: center;
            }
            
            .quick-btn:hover {
                background: #f0f0f0;
                border-color: #667eea;
            }
            
            .stats {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .stat-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 12px;
                background: #f8f9fa;
                border-radius: 8px;
            }
            
            .stat-label {
                font-size: 12px;
                color: #666;
            }
            
            .stat-value {
                font-weight: 600;
                color: #333;
            }
            
            @media (max-width: 768px) {
                .admin-panel-container {
                    width: 300px;
                    left: 10px;
                    top: 10px;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(panel);
    },
    
    // Configurar event listeners
    setupEventListeners: function() {
        // Enter para enviar mensagem
        document.getElementById('adminMessage').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Toggle status
        document.getElementById('toggleStatus').addEventListener('click', () => {
            this.toggleStatus();
        });
    },
    
    // Enviar mensagem
    sendMessage: function() {
        const messageInput = document.getElementById('adminMessage');
        const message = messageInput.value.trim();
        
        if (!message) {
            alert('Por favor, digite uma mensagem!');
            return;
        }
        
        // Adicionar mensagem ao chat
        this.addMessageToChat(message, 'admin');
        
        // Limpar input
        messageInput.value = '';
        
        // Atualizar estatísticas
        this.updateStats();
        
        console.log('✅ Mensagem enviada:', message);
    },
    
    // Adicionar mensagem ao chat
    addMessageToChat: function(message, sender) {
        const messagesContainer = document.getElementById('rosanyChatMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `rosany-chat-message ${sender}`;
        
        const time = new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="rosany-chat-message-content">
                ${sender === 'admin' ? '<strong>Rosany:</strong> ' : ''}${message.replace(/\n/g, '<br>')}
                <div class="message-time">${time}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Salvar mensagem
        this.messages.push({
            id: Date.now(),
            message: message,
            sender: sender,
            timestamp: new Date()
        });
        this.saveMessages();
    },
    
    // Respostas rápidas
    sendQuickResponse: function(type) {
        const responses = {
            'saudacao': 'Olá! 👋 Bem-vindo à Rosany Seguros! Como posso ajudá-lo hoje?',
            'cotacao': 'Claro! Para fazer uma cotação personalizada, preciso de algumas informações:\n\n• Tipo de seguro (Auto, Residencial, Vida, etc.)\n• Seus dados pessoais\n• Informações do bem a ser segurado\n\nPosso te ajudar com isso?',
            'informacoes': 'Oferecemos diversos tipos de seguros:\n\n🚗 **Seguro Auto** - Proteção completa\n🏠 **Seguro Residencial** - Proteja sua casa\n❤️ **Seguro de Vida** - Segurança para a família\n🏢 **Seguro Empresarial** - Proteção para seu negócio\n\nQual tipo te interessa?',
            'contato': 'Para um atendimento mais personalizado, você pode me contatar:\n\n📱 **WhatsApp:** (27) 99999-9999\n📞 **Telefone:** (27) 99999-9999\n📧 **Email:** contato@rosanyseguros.com',
            'emergencia': '🚨 **ATENDIMENTO DE EMERGÊNCIA** 🚨\n\nPara sinistros e emergências:\n\n📱 **WhatsApp 24h:** (27) 99999-9999\n📞 **Telefone 24h:** (27) 99999-9999\n\nNossa equipe está sempre disponível!',
            'agradecimento': 'Obrigada pelo seu contato! 😊\n\nFoi um prazer atendê-lo. Se precisar de mais alguma coisa, estarei aqui para ajudar!\n\nTenha um ótimo dia! 🌟'
        };
        
        const response = responses[type];
        if (response) {
            this.addMessageToChat(response, 'admin');
            this.updateStats();
        }
    },
    
    // Alternar status online/offline
    toggleStatus: function() {
        this.isOnline = !this.isOnline;
        const statusBtn = document.getElementById('toggleStatus');
        
        if (this.isOnline) {
            statusBtn.textContent = '🟢 Online';
            statusBtn.className = 'status-btn online';
            this.addMessageToChat('Rosany está online e pronta para atendê-lo! 😊', 'admin');
        } else {
            statusBtn.textContent = '🔴 Offline';
            statusBtn.className = 'status-btn offline';
            this.addMessageToChat('Rosany está offline. Deixe sua mensagem que retornaremos em breve!', 'admin');
        }
    },
    
    // Limpar chat
    clearChat: function() {
        if (confirm('Tem certeza que deseja limpar todo o chat?')) {
            this.messages = [];
            this.saveMessages();
            
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
            
            this.updateStats();
            console.log('✅ Chat limpo!');
        }
    },
    
    // Exportar chat
    exportChat: function() {
        const chatData = {
            timestamp: new Date().toISOString(),
            messages: this.messages,
            totalMessages: this.messages.length
        };
        
        const dataStr = JSON.stringify(chatData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `chat-rosany-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        console.log('✅ Chat exportado!');
    },
    
    // Atualizar estatísticas
    updateStats: function() {
        const today = new Date().toDateString();
        const todayMessages = this.messages.filter(msg => 
            new Date(msg.timestamp).toDateString() === today
        );
        
        document.getElementById('messagesToday').textContent = todayMessages.length;
        document.getElementById('customersServed').textContent = this.messages.length;
    },
    
    // Salvar mensagens
    saveMessages: function() {
        localStorage.setItem('rosany_chat_messages', JSON.stringify(this.messages));
    },
    
    // Carregar mensagens
    loadMessages: function() {
        const saved = localStorage.getItem('rosany_chat_messages');
        if (saved) {
            this.messages = JSON.parse(saved);
            this.updateStats();
        }
    }
};

// Inicializar painel quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => window.ROSANY_ADMIN_PANEL.init(), 3000);
    });
} else {
    setTimeout(() => window.ROSANY_ADMIN_PANEL.init(), 3000);
}

console.log("🎛️ Painel Admin Rosany Seguros carregado!");
