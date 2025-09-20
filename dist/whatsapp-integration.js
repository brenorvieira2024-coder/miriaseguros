// Integração WhatsApp para Chat Rosany Seguros
// Este arquivo permite conectar o chat diretamente ao WhatsApp

window.ROSANY_WHATSAPP_INTEGRATION = {
    // Configurações do WhatsApp
    whatsappNumber: "5527999999999", // Substitua pelo seu número real
    businessName: "Rosany Seguros",
    
    // Função para enviar mensagem para WhatsApp
    sendToWhatsApp: function(message, customerName = "") {
        const baseMessage = customerName ? 
            `Olá! Sou ${customerName} e gostaria de falar sobre: ${message}` :
            `Olá! Gostaria de falar sobre: ${message}`;
            
        const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(baseMessage)}`;
        window.open(whatsappUrl, '_blank');
    },
    
    // Função para coletar dados do cliente antes de enviar
    collectCustomerData: function(message) {
        const customerName = prompt("Digite seu nome:");
        const customerPhone = prompt("Digite seu telefone:");
        
        if (customerName && customerPhone) {
            const fullMessage = `Nome: ${customerName}\nTelefone: ${customerPhone}\nMensagem: ${message}`;
            this.sendToWhatsApp(fullMessage, customerName);
        } else {
            alert("Por favor, preencha todos os campos para continuar.");
        }
    },
    
    // Função para abrir WhatsApp com mensagem pré-definida
    openWhatsApp: function(messageType = "geral") {
        const messages = {
            "cotação": "Olá! Gostaria de fazer uma cotação de seguro. Pode me ajudar?",
            "informações": "Olá! Gostaria de mais informações sobre os seguros oferecidos.",
            "emergência": "URGENTE! Preciso de atendimento imediato para um sinistro.",
            "corretor": "Olá! Gostaria de falar com um corretor especializado.",
            "geral": "Olá! Gostaria de mais informações sobre os serviços da Rosany Seguros."
        };
        
        const message = messages[messageType] || messages.geral;
        this.sendToWhatsApp(message);
    }
};

// Função global para usar no chat
window.openWhatsAppChat = function(messageType) {
    window.ROSANY_WHATSAPP_INTEGRATION.openWhatsApp(messageType);
};

// Função para coletar dados e enviar
window.collectAndSend = function(message) {
    window.ROSANY_WHATSAPP_INTEGRATION.collectCustomerData(message);
};

console.log("✅ Integração WhatsApp carregada!");
console.log("📱 Número configurado:", window.ROSANY_WHATSAPP_INTEGRATION.whatsappNumber);
