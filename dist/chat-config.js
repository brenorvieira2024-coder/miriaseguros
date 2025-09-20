// Configuração do Chat Widget - Rosany Seguros
// Personalize estas informações com os dados reais da empresa

window.ROSANY_CHAT_CONFIG = {
    // Informações da empresa
    businessName: "Rosany Seguros",
    businessDescription: "Sua Parceira de Confiança em Seguros",
    
    // Contatos
    whatsapp: "5527999999999", // Substitua pelo número real do WhatsApp
    phone: "5527999999999",    // Substitua pelo número real do telefone
    email: "contato@rosanyseguros.com", // Substitua pelo email real
    
    // Configurações do widget
    position: "bottom-right", // bottom-right, bottom-left, top-right, top-left
    theme: "blue", // blue, green, purple
    
    // Horário de funcionamento
    workingHours: {
        enabled: true,
        start: "08:00",
        end: "18:00",
        timezone: "America/Sao_Paulo",
        message: "Nosso horário de atendimento é de 8h às 18h, de segunda a sexta."
    },
    
    // Mensagens personalizadas
    messages: {
        welcome: "Olá! 👋 Bem-vindo à Rosany Seguros!\nComo posso ajudá-lo hoje?",
        offline: "No momento estamos offline. Deixe sua mensagem que retornaremos em breve!",
        workingHours: "Fora do horário de atendimento. Deixe sua mensagem que retornaremos no próximo dia útil!",
        default: "Obrigada pelo seu contato! 😊\n\nPara um atendimento mais personalizado, entre em contato conosco:"
    },
    
    // Respostas automáticas personalizadas
    autoResponses: {
        "cotação": `Para fazer uma cotação personalizada, preciso de algumas informações:

• Tipo de seguro (Auto, Residencial, Vida, etc.)
• Seus dados pessoais
• Informações do bem a ser segurado

Posso te ajudar com isso?`,
        
        "informações": `Oferecemos diversos tipos de seguros:

🚗 **Seguro Auto** - Proteção completa para seu veículo
🏠 **Seguro Residencial** - Proteja sua casa e família
❤️ **Seguro de Vida** - Segurança para quem você ama
🏢 **Seguro Empresarial** - Proteção para seu negócio
👥 **Seguro de Saúde** - Cuidado com sua saúde e da família

Qual tipo te interessa?`,
        
        "corretor": `Vou conectar você com um de nossos corretores especializados!

📱 **WhatsApp:** ${window.ROSANY_CHAT_CONFIG?.whatsapp || "5527999999999"}
📞 **Telefone:** ${window.ROSANY_CHAT_CONFIG?.phone || "5527999999999"}
📧 **Email:** ${window.ROSANY_CHAT_CONFIG?.email || "contato@rosanyseguros.com"}`,
        
        "emergência": `🚨 **ATENDIMENTO DE EMERGÊNCIA** 🚨

Para sinistros e emergências:

📱 **WhatsApp 24h:** ${window.ROSANY_CHAT_CONFIG?.whatsapp || "5527999999999"}
📞 **Telefone 24h:** ${window.ROSANY_CHAT_CONFIG?.phone || "5527999999999"}

Nossa equipe está sempre disponível para ajudá-lo!`,
        
        "preços": `Nossos preços são personalizados de acordo com:

• Tipo de seguro
• Perfil do cliente
• Coberturas escolhidas
• Histórico de sinistros

Para uma cotação personalizada, entre em contato conosco!`,
        
        "cobertura": `Oferecemos coberturas completas:

✅ **Cobertura Total** - Proteção máxima
✅ **Cobertura Parcial** - Proteção essencial
✅ **Cobertura Personalizada** - Adaptada às suas necessidades

Qual tipo de cobertura você precisa?`
    },
    
    // Ações rápidas personalizadas
    quickActions: [
        { text: "📋 Cotação", message: "Cotação de seguro" },
        { text: "ℹ️ Informações", message: "Informações sobre seguros" },
        { text: "👤 Corretor", message: "Falar com corretor" },
        { text: "🚨 Emergência", message: "Emergência" },
        { text: "💰 Preços", message: "Preços e valores" },
        { text: "🛡️ Cobertura", message: "Tipos de cobertura" }
    ],
    
    // Configurações avançadas
    settings: {
        showNotification: true,
        notificationDelay: 3000, // 3 segundos
        autoOpen: false,
        rememberState: true,
        analytics: false
    }
};

// Função para atualizar configurações em tempo real
window.updateRosanyChatConfig = function(newConfig) {
    window.ROSANY_CHAT_CONFIG = { ...window.ROSANY_CHAT_CONFIG, ...newConfig };
    
    // Recarregar o widget se estiver ativo
    if (window.rosanyReloadWidget) {
        window.rosanyReloadWidget();
    }
};

// Função para obter configurações atuais
window.getRosanyChatConfig = function() {
    return window.ROSANY_CHAT_CONFIG;
};

console.log("✅ Chat Widget Rosany Seguros configurado!");
console.log("📞 WhatsApp:", window.ROSANY_CHAT_CONFIG.whatsapp);
console.log("📧 Email:", window.ROSANY_CHAT_CONFIG.email);
console.log("🏢 Empresa:", window.ROSANY_CHAT_CONFIG.businessName);
