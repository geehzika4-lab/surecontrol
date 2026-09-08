SureControl V4.2.8

Alterações principais desta versão:
- A Casa 1 passa a ser sempre a referência da calculadora de surebet.
- O usuário informa odd + valor da primeira aposta; as demais stakes ficam somente leitura e são recalculadas automaticamente.
- Mantidos cálculos com Back, Lay, comissão, Freebet e aumento de odd.
- O relatório em PNG agora carrega os logos reais das casas utilizadas, com fallback por iniciais se algum arquivo de logo falhar.
- O cabeçalho do relatório também destaca até 3 casas presentes nas movimentações recentes.
- Primeiro login neste navegador faz mesclagem segura entre o histórico local e o histórico já salvo na nuvem, sem apagar nenhum dos dois.
- Conflitos de um mesmo registro continuam sendo resolvidos pela versão mais recente.
- Alterações pendentes de outros dispositivos são preservadas durante a sincronização.
- Ao sair da conta, o app tenta concluir a sincronização antes e cancela a saída se houver falha, para evitar perda de dados locais ainda não enviados.
- Sincronização automática entre dispositivos continua ativa, com atualização por Realtime e verificação periódica.

Arquivos principais:
- index.html
- styles.css
- app.js
- casas.json
- assets/bets/

Abra o projeto por Preview/Live Server (não diretamente em file://).
