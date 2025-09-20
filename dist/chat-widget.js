// Chat Widget para Rosany Seguros
(function() {
    'use strict';

    // Configurações do chat
    const CHAT_CONFIG = {
        businessName: "Rosany Seguros",
        whatsapp: "5527999999999", // Substitua pelo número real
        email: "contato@rosanyseguros.com",
        phone: "5527999999999",
        position: "bottom-right", // bottom-right, bottom-left, top-right, top-left
        theme: "blue" // blue, green, purple
    };

    // Mensagens automáticas
    const AUTO_RESPONSES = {
        "cotação": "Para fazer uma cotação personalizada, preciso de algumas informações:\n\n• Tipo de seguro (Auto, Residencial, Vida, etc.)\n• Seus dados pessoais\n• Informações do bem a ser segurado\n\nPosso te ajudar com isso?",
        "informações": "Oferecemos diversos tipos de seguros:\n\n🚗 **Seguro Auto** - Proteção completa para seu veículo\n🏠 **Seguro Residencial** - Proteja sua casa e família\n❤️ **Seguro de Vida** - Segurança para quem você ama\n🏢 **Seguro Empresarial** - Proteção para seu negócio\n\nQual tipo te interessa?",
        "corretor": "Vou conectar você com um de nossos corretores especializados!\n\n📱 **WhatsApp:** " + CHAT_CONFIG.whatsapp + "\n📞 **Telefone:** " + CHAT_CONFIG.phone + "\n📧 **Email:** " + CHAT_CONFIG.email,
        "emergência": "🚨 **ATENDIMENTO DE EMERGÊNCIA** 🚨\n\nPara sinistros e emergências:\n\n📱 **WhatsApp 24h:** " + CHAT_CONFIG.whatsapp + "\n📞 **Telefone 24h:** " + CHAT_CONFIG.phone + "\n\nNossa equipe está sempre disponível para ajudá-lo!"
    };

    // CSS do widget
    const widgetCSS = `
        <style id="rosany-chat-widget-styles">
            .rosany-chat-widget {
                position: fixed;
                z-index: 99999;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            .rosany-chat-widget.bottom-right {
                bottom: 80px;
                right: 20px;
            }
            
            .rosany-chat-widget.bottom-left {
                bottom: 20px;
                left: 20px;
            }
            
            .rosany-chat-widget.top-right {
                top: 20px;
                right: 20px;
            }
            
            .rosany-chat-widget.top-left {
                top: 20px;
                left: 20px;
            }
            
            .rosany-chat-toggle {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                position: relative;
            }
            
            .rosany-chat-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 25px rgba(0,0,0,0.2);
            }
            
            .rosany-chat-toggle svg {
                width: 24px;
                height: 24px;
                color: white;
            }
            
            .rosany-chat-toggle .notification-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #ff4444;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            }
            
            .rosany-chat-container {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 350px;
                height: 500px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                display: none;
                flex-direction: column;
                overflow: hidden;
                border: 1px solid #e0e0e0;
            }
            
            .rosany-chat-container.bottom-left {
                right: auto;
                left: 0;
            }
            
            .rosany-chat-container.top-right {
                bottom: auto;
                top: 80px;
            }
            
            .rosany-chat-container.top-left {
                bottom: auto;
                top: 80px;
                right: auto;
                left: 0;
            }
            
            .rosany-chat-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .rosany-chat-header-info h3 {
                font-size: 16px;
                margin: 0;
                font-weight: 600;
            }
            
            .rosany-chat-header-info p {
                font-size: 12px;
                margin: 2px 0 0 0;
                opacity: 0.9;
            }
            
            .rosany-chat-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 20px;
                padding: 5px;
                border-radius: 50%;
                transition: background 0.3s;
            }
            
            .rosany-chat-close:hover {
                background: rgba(255,255,255,0.2);
            }
            
            .rosany-chat-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background: #f8f9fa;
            }
            
            .rosany-chat-message {
                margin-bottom: 10px;
                display: flex;
                align-items: flex-end;
            }
            
            .rosany-chat-message.user {
                justify-content: flex-end;
            }
            
            .rosany-chat-message.bot {
                justify-content: flex-start;
            }
            
            .rosany-chat-message-content {
                max-width: 80%;
                padding: 10px 15px;
                border-radius: 18px;
                font-size: 14px;
                line-height: 1.4;
            }
            
            .rosany-chat-message.user .rosany-chat-message-content {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-bottom-right-radius: 5px;
            }
            
            .rosany-chat-message.bot .rosany-chat-message-content {
                background: white;
                color: #333;
                border: 1px solid #e0e0e0;
                border-bottom-left-radius: 5px;
            }
            
            .rosany-chat-quick-actions {
                display: flex;
                gap: 8px;
                margin-bottom: 10px;
                flex-wrap: wrap;
            }
            
            .rosany-chat-quick-action {
                padding: 6px 12px;
                background: #f0f0f0;
                border: none;
                border-radius: 15px;
                font-size: 11px;
                cursor: pointer;
                transition: background 0.3s;
            }
            
            .rosany-chat-quick-action:hover {
                background: #e0e0e0;
            }
            
            .rosany-chat-input-container {
                padding: 15px;
                background: white;
                border-top: 1px solid #e0e0e0;
            }
            
            .rosany-chat-input-wrapper {
                display: flex;
                gap: 10px;
                align-items: center;
            }
            
            .rosany-chat-input {
                flex: 1;
                padding: 10px 15px;
                border: 2px solid #e0e0e0;
                border-radius: 20px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.3s;
            }
            
            .rosany-chat-input:focus {
                border-color: #667eea;
            }
            
            .rosany-chat-send {
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
                border-radius: 50%;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.2s;
            }
            
            .rosany-chat-send:hover {
                transform: scale(1.05);
            }
            
            .rosany-chat-send:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none;
            }
            
            .rosany-chat-typing {
                display: none;
                align-items: center;
                gap: 5px;
                padding: 10px 15px;
                background: white;
                border: 1px solid #e0e0e0;
                border-radius: 18px;
                border-bottom-left-radius: 5px;
                max-width: 80px;
                margin-bottom: 10px;
            }
            
            .rosany-chat-typing-dot {
                width: 6px;
                height: 6px;
                background: #999;
                border-radius: 50%;
                animation: rosany-typing 1.4s infinite;
            }
            
            .rosany-chat-typing-dot:nth-child(2) {
                animation-delay: 0.2s;
            }
            
            .rosany-chat-typing-dot:nth-child(3) {
                animation-delay: 0.4s;
            }
            
            @keyframes rosany-typing {
                0%, 60%, 100% {
                    transform: translateY(0);
                }
                30% {
                    transform: translateY(-10px);
                }
            }
            
            @media (max-width: 480px) {
                .rosany-chat-container {
                    width: 300px;
                    height: 450px;
                }
            }
        </style>
    `;

    // HTML do widget
    const widgetHTML = `
        <div class="rosany-chat-widget ${CHAT_CONFIG.position}">
            <button class="rosany-chat-toggle" id="rosanyChatToggle">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
                <div class="notification-badge" id="rosanyNotificationBadge" style="display: none;">1</div>
            </button>
            
            <div class="rosany-chat-container" id="rosanyChatContainer">
                <div class="rosany-chat-header">
                    <div class="rosany-chat-header-info">
                        <h3>${CHAT_CONFIG.businessName}</h3>
                        <p>Atendimento Online</p>
                    </div>
                    <button class="rosany-chat-close" id="rosanyChatClose">×</button>
                </div>
                
            <div class="rosany-chat-messages" id="rosanyChatMessages">
                <div class="rosany-chat-message bot">
                    <div class="rosany-chat-message-content">
                        Olá! 👋 Bem-vindo à ${CHAT_CONFIG.businessName}!<br>
                        Digite sua mensagem e nossa equipe responderá em breve.
                    </div>
                </div>
            </div>
                
                <div class="rosany-chat-typing" id="rosanyChatTyping">
                    <div class="rosany-chat-typing-dot"></div>
                    <div class="rosany-chat-typing-dot"></div>
                    <div class="rosany-chat-typing-dot"></div>
                </div>
                
                <div class="rosany-chat-input-container">
                    <div class="rosany-chat-input-wrapper">
                        <input type="text" class="rosany-chat-input" id="rosanyChatInput" placeholder="Digite sua mensagem..." maxlength="500">
                        <button class="rosany-chat-send" id="rosanyChatSend" onclick="rosanySendMessage()">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Funções do widget
    let isOpen = false;
    let hasNewMessage = false;

    function initWidget() {
        // Adicionar CSS
        document.head.insertAdjacentHTML('beforeend', widgetCSS);
        
        // Adicionar HTML
        document.body.insertAdjacentHTML('beforeend', widgetHTML);
        
        // Event listeners
        document.getElementById('rosanyChatToggle').addEventListener('click', toggleChat);
        document.getElementById('rosanyChatClose').addEventListener('click', closeChat);
        document.getElementById('rosanyChatInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                rosanySendMessage();
            }
        });
        
        // Mostrar notificação após 3 segundos
        setTimeout(() => {
            if (!isOpen) {
                showNotification();
            }
        }, 3000);
    }

    function toggleChat() {
        const container = document.getElementById('rosanyChatContainer');
        const badge = document.getElementById('rosanyNotificationBadge');
        
        if (isOpen) {
            closeChat();
        } else {
            openChat();
        }
    }

    function openChat() {
        const container = document.getElementById('rosanyChatContainer');
        const badge = document.getElementById('rosanyNotificationBadge');
        
        container.style.display = 'flex';
        badge.style.display = 'none';
        isOpen = true;
        hasNewMessage = false;
        
        // Focar no input
        setTimeout(() => {
            document.getElementById('rosanyChatInput').focus();
        }, 100);
    }

    function closeChat() {
        const container = document.getElementById('rosanyChatContainer');
        container.style.display = 'none';
        isOpen = false;
    }

    function showNotification() {
        if (!isOpen && !hasNewMessage) {
            const badge = document.getElementById('rosanyNotificationBadge');
            badge.style.display = 'flex';
            hasNewMessage = true;
        }
    }

    function rosanySendMessage() {
        const input = document.getElementById('rosanyChatInput');
        const message = input.value.trim();
        
        if (!message) return;

        // Gerar ID único para o cliente
        let customerId = localStorage.getItem('rosany_customer_id');
        if (!customerId) {
            customerId = 'customer_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('rosany_customer_id', customerId);
        }

        // Obter nome do cliente
        let customerName = localStorage.getItem('rosany_customer_name');
        if (!customerName) {
            customerName = prompt('Por favor, digite seu nome:') || 'Cliente';
            localStorage.setItem('rosany_customer_name', customerName);
        }

        addMessage(message, 'user');
        input.value = '';

        // Enviar mensagem para o painel admin
        sendMessageToAdmin(customerId, customerName, message);
    }

    function rosanySendQuickMessage(message) {
        const input = document.getElementById('rosanyChatInput');
        input.value = message;
        rosanySendMessage();
    }

    function addMessage(content, sender) {
        const messagesContainer = document.getElementById('rosanyChatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `rosany-chat-message ${sender}`;
        
        messageDiv.innerHTML = `
            <div class="rosany-chat-message-content">
                ${content.replace(/\n/g, '<br>')}
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Função para enviar mensagem para o painel admin
    function sendMessageToAdmin(customerId, customerName, message) {
        // Simular envio para o painel admin
        // Em um sistema real, isso seria uma chamada para o servidor
        console.log('Mensagem enviada para admin:', {
            customerId: customerId,
            customerName: customerName,
            message: message,
            timestamp: new Date()
        });
        
        // Mostrar mensagem de confirmação
        addMessage('Mensagem enviada! Aguarde a resposta da nossa equipe. 😊', 'bot');
    }

    function showTyping() {
        const typing = document.getElementById('rosanyChatTyping');
        typing.style.display = 'flex';
        
        const messagesContainer = document.getElementById('rosanyChatMessages');
        messagesContainer.appendChild(typing);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function hideTyping() {
        const typing = document.getElementById('rosanyChatTyping');
        typing.style.display = 'none';
    }

    // Funções globais para uso externo
    window.rosanySendMessage = rosanySendMessage;
    window.rosanySendQuickMessage = rosanySendQuickMessage;
    window.rosanyOpenChat = openChat;
    window.rosanyCloseChat = closeChat;

    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }

})();
