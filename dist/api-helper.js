// API Helper para comunicação entre dispositivos
(function() {
    'use strict';

    // Configuração da API (usando JSONBin.io gratuito)
    const API_CONFIG = {
        baseUrl: 'https://api.jsonbin.io/v3/b',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$X8kFqGJ7K2hL9mN3pQ6rWe1vB4cD7eF9gH2iJ5kL8nO1pR3sT6uV9xY2zA5bC8eF' // Chave gratuita
        }
    };

    // Bins específicos para cada tipo de mensagem
    const BINS = {
        admin_messages: '667f2b1ce41b4d34e8e8b5a1',
        customer_responses: '667f2b1ce41b4d34e8e8b5a2'
    };

    // Função para enviar dados para a API
    window.sendToAPI = async function(key, data, replace = false) {
        try {
            const binId = BINS[key];
            if (!binId) {
                console.error('Bin ID não encontrado para:', key);
                return;
            }

            let payload;
            if (replace) {
                // Substituir completamente o conteúdo
                payload = data;
            } else {
                // Buscar dados existentes e adicionar novo
                const existing = await getFromAPI(key);
                payload = [...(existing || []), data];
            }

            const response = await fetch(`${API_CONFIG.baseUrl}/${binId}`, {
                method: 'PUT',
                headers: API_CONFIG.headers,
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Dados enviados para API:', result);
            return result;

        } catch (error) {
            console.error('Erro ao enviar para API:', error);
            throw error;
        }
    };

    // Função para obter dados da API
    window.getFromAPI = async function(key) {
        try {
            const binId = BINS[key];
            if (!binId) {
                console.error('Bin ID não encontrado para:', key);
                return [];
            }

            const response = await fetch(`${API_CONFIG.baseUrl}/${binId}/latest`, {
                method: 'GET',
                headers: API_CONFIG.headers
            });

            if (!response.ok) {
                if (response.status === 404) {
                    return []; // Bin não existe ainda, retornar array vazio
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result.record || [];

        } catch (error) {
            console.error('Erro ao obter da API:', error);
            return [];
        }
    };

    console.log('✅ API Helper carregado');

})();
