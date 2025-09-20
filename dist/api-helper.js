// Sistema de Comunicação Simplificado
(function() {
    'use strict';

    // Sistema de sincronização usando localStorage + eventos
    // Para comunicação entre dispositivos, vamos usar um sistema de polling inteligente
    
    // Função para enviar dados (simulando API)
    window.sendToAPI = async function(key, data, replace = false) {
        try {
            // Salvar no localStorage com timestamp para sincronização
            const syncData = {
                data: data,
                timestamp: Date.now(),
                key: key,
                replace: replace
            };
            
            // Salvar no localStorage local
            const existing = JSON.parse(localStorage.getItem(`sync_${key}`) || '[]');
            if (replace) {
                localStorage.setItem(`sync_${key}`, JSON.stringify([syncData]));
            } else {
                existing.push(syncData);
                localStorage.setItem(`sync_${key}`, JSON.stringify(existing));
            }
            
            // Disparar evento para notificar outros componentes
            window.dispatchEvent(new CustomEvent('dataSync', {
                detail: { key, data: syncData }
            }));
            
            console.log('Dados sincronizados localmente:', syncData);
            return { success: true };
            
        } catch (error) {
            console.error('Erro ao sincronizar dados:', error);
            throw error;
        }
    };

    // Função para obter dados (simulando API)
    window.getFromAPI = async function(key) {
        try {
            const syncData = JSON.parse(localStorage.getItem(`sync_${key}`) || '[]');
            
            // Retornar apenas os dados, não os metadados de sincronização
            return syncData.map(item => item.data);
            
        } catch (error) {
            console.error('Erro ao obter dados sincronizados:', error);
            return [];
        }
    };

    // Sistema de limpeza automática (remove dados antigos)
    function cleanupOldData() {
        const keys = ['rosany_admin_messages', 'rosany_customer_responses'];
        const maxAge = 24 * 60 * 60 * 1000; // 24 horas
        
        keys.forEach(key => {
            try {
                const syncData = JSON.parse(localStorage.getItem(`sync_${key}`) || '[]');
                const filtered = syncData.filter(item => 
                    Date.now() - item.timestamp < maxAge
                );
                localStorage.setItem(`sync_${key}`, JSON.stringify(filtered));
            } catch (error) {
                console.error('Erro na limpeza de dados:', error);
            }
        });
    }

    // Limpeza a cada hora
    setInterval(cleanupOldData, 60 * 60 * 1000);
    
    // Limpeza inicial
    cleanupOldData();

    console.log('✅ Sistema de Comunicação Simplificado carregado');

})();
