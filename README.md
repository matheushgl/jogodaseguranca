# O Jogo da Segurança - Treinamento Corporativo

Sistema gamificado de treinamento em Segurança da Informação desenvolvido para capacitação de colaboradores em ambientes corporativos.

## Descrição do Projeto

O Jogo da Segurança é uma plataforma interativa de treinamento que aborda os principais pilares da segurança digital corporativa através de módulos educacionais, desafios práticos e avaliações. O sistema utiliza gamificação para engajar os usuários e garantir a absorção do conteúdo.

## Objetivos

- Capacitar colaboradores em boas práticas de segurança da informação
- Reduzir riscos de ataques de phishing e engenharia social
- Promover conformidade com a LGPD
- Conscientizar sobre a importância de senhas fortes
- Certificar colaboradores após conclusão bem-sucedida

## Funcionalidades

### Módulos de Treinamento

**Módulo 1: Senhas Fortes**
- Explicação matemática sobre força de senhas
- Tabela de tempo de quebra de senhas
- Boas práticas e uso de gerenciadores

**Módulo 2: Desafio Phishing**
- Sistema interativo tipo card game
- Cenários reais de e-mails fraudulentos
- Feedback educativo imediato
- Sistema de pontuação

**Módulo 3: LGPD**
- Conteúdo em vídeo explicativo
- Conceitos fundamentais da legislação
- Dados pessoais vs dados sensíveis

### Sistema de Progresso

- Sistema XP: Acompanhamento visual do progresso
- Desbloqueio progressivo: Quiz final liberado após conclusão dos 3 módulos
- Status visual: Módulos marcados como Concluído

### Avaliação Final

- Banco de 40 questões sobre todos os temas abordados
- 10 questões aleatórias por tentativa
- Aprovação com 70% de acertos
- Certificado em PDF gerado automaticamente para aprovados

## Tecnologias Utilizadas

- HTML5: Estrutura semântica
- CSS3: Estilização responsiva e moderna
- JavaScript: Lógica de negócio e interatividade
- jsPDF: Geração de certificados em PDF
- Google Fonts: Tipografia Inter

## Estrutura de Arquivos

projeto/
- index.html (Página principal)
- style.css (Estilos globais)
- script.js (Lógica da aplicação)
- imagens/
  - ground.webp (Background da aplicação)
  - quebrasenha.png (Tabela de força de senhas)
- video.mp4 (Vídeo educativo sobre LGPD)

## Como Usar

### Instalação

1. Clone ou baixe o repositório
2. Certifique-se de que todos os arquivos estão na mesma estrutura de pastas
3. Adicione os arquivos de mídia necessários:
   - imagens/ground.webp
   - imagens/quebrasenha.png
   - video.mp4 (na raiz do projeto)

### Execução

Abra o arquivo index.html diretamente no navegador. Não é necessário servidor local.

### Fluxo de Uso

1. Login: Usuário insere nome completo e e-mail corporativo
2. Módulos: Completa os 3 módulos interativos em qualquer ordem
3. Avaliação: Após 3/3 módulos, o quiz final é liberado
4. Certificado: Ao atingir 70% ou mais, o certificado PDF pode ser baixado

## Mecânicas de Gamificação

### Sistema de Progressão
- Cada módulo concluído adiciona 1 XP
- Interface visual mostra progresso
- Botões de módulos mudam de cor ao serem concluídos

### Desafio Phishing
- 3 cenários de e-mails (legítimos e fraudulentos)
- Escolha binária: É Seguro ou É Phishing
- Feedback imediato com explicação
- Mínimo de 2/3 acertos para aprovação
- Possibilidade de tentar novamente

### Quiz Final
- 10 questões aleatórias de um banco de 40
- Múltipla escolha
- Nota mínima: 70%
- Certificado automático para aprovados

## Certificado

O certificado gerado inclui:
- Nome completo do colaborador
- Data de emissão
- ID único de validação
- Selo de aprovação
- Design profissional em formato paisagem

## Características Visuais

- Design Moderno: Interface limpa e profissional
- Responsivo: Adaptável a diferentes tamanhos de tela
- Cores Corporativas: Paleta em azul escuro e azul royal
- Feedback Visual: Estados hover, disabled e completed bem definidos
- Acessibilidade: Contraste adequado e fontes legíveis

## Banco de Questões

O sistema conta com 40 questões divididas em temas:
- Senhas e autenticação (15 questões)
- Phishing e engenharia social (10 questões)
- LGPD (5 questões)
- Segurança geral (10 questões)

A cada avaliação, 10 questões são selecionadas aleatoriamente para garantir variedade.

## Segurança e Privacidade

- Dados armazenados apenas em memória
- Nenhuma informação enviada para servidores externos
- Certificado gerado localmente no navegador
- Não há coleta de dados pessoais além do necessário para o certificado

## Compatibilidade

- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+
- Opera 76+

## Requisitos Técnicos

- Navegador moderno com suporte a ES6+
- JavaScript habilitado
- Resolução mínima: 360px (mobile)
- Conexão com internet (apenas para fontes do Google Fonts e jsPDF CDN)

## Público-Alvo

- Colaboradores de empresas de todos os setores
- Novos funcionários em onboarding
- Equipes que lidam com dados sensíveis
- Departamentos de TI e Segurança

## Licença

Este projeto é de uso educacional e corporativo. Sinta-se livre para adaptar conforme as necessidades da sua organização.

## Suporte

Para dúvidas ou sugestões sobre o projeto, entre em contato com a equipe de Segurança da Informação da sua organização.

Desenvolvido para promover a cultura de segurança digital nas organizações
