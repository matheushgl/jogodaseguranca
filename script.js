let userData = { name: '', email: '' };
let modulesCompleted = 0;
let currentModuleType = ''; 
let completedModulesList = []; 
let currentQuestions = [];

const phishingScenarios = [
    {
        sender: "netflix-support@verify-account-br.com",
        subject: "Sua conta foi suspensa temporariamente",
        body: "Prezado cliente, não conseguimos processar seu pagamento. Clique <span class='fake-link'>aqui</span> para atualizar ou perderá o acesso.",
        isPhishing: true,
        reason: "O remetente não é oficial (@netflix.com) e cria senso de urgência falso."
    },
    {
        sender: "rh@suaempresa.com.br",
        subject: "Convite: Reunião Geral de Fim de Ano",
        body: "Olá a todos, Segue o convite para nossa confraternização. Esperamos todos lá!",
        isPhishing: false,
        reason: "E-mail corporativo legítimo e sem solicitações de dados sensíveis."
    },
    {
        sender: "seguranca@banco-itau-alertas.com",
        subject: "Token Expirado - Renove Agora",
        body: "Seu token de segurança expirou. Baixe o anexo 'Atualizador.exe' para corrigir.",
        isPhishing: true,
        reason: "Bancos nunca pedem para baixar executáveis (.exe) por e-mail."
    }
];
let gameIndex = 0;
let gameScore = 0;

const questionBank = [
    { q: "Qual a melhor prática para senhas?", options: ["Usar data de aniversário", "123456", "Misturar letras, números e símbolos", "Nome do pet"], a: 2 },
    { q: "Qual o tamanho ideal de uma senha?", options: ["4 caracteres", "8 caracteres", "12 ou mais", "6 números"], a: 2 },
    { q: "O que é Phishing?", options: ["Vírus de USB", "E-mail falso para roubar dados", "Software de proteção", "Um jogo"], a: 1 },
    { q: "Você recebeu um link suspeito. O que fazer?", options: ["Clicar para ver", "Encaminhar para amigos", "Não clicar e reportar ao TI", "Ignorar"], a: 2 },
    { q: "Qual dado é considerado Sensível pela LGPD?", options: ["Nome", "E-mail comercial", "Religião ou biometria", "Cargo"], a: 2 },
    { q: "Ao sair da mesa, o que fazer?", options: ["Desligar o monitor", "Bloquear a tela (Win+L)", "Deixar aberto", "Pedir pro colega olhar"], a: 1 },
    { q: "Https no site indica:", options: ["Site lento", "Site criptografado/seguro", "Site de governo", "Site bloqueado"], a: 1 },
    { q: "Engenharia social ataca:", options: ["O firewall", "O antivírus", "O ser humano (psicológico)", "O servidor"], a: 2 },
    { q: "Pode emprestar a senha pro colega?", options: ["Sim, se for rápido", "Nunca", "Só se for o chefe", "Talvez"], a: 1 },
    { q: "Onde guardar senhas?", options: ["Post-it no monitor", "Bloco de notas", "Gerenciador de Senhas", "Na agenda"], a: 2 },
    { q: "Com que frequência devo trocar minha senha?", options: ["Todo dia", "A cada 3-6 meses ou se houver suspeita", "Nunca", "Uma vez por ano"], a: 1 },
    { q: "É seguro usar a mesma senha em vários sites?", options: ["Sim, facilita lembrar", "Não, se um site vazar todos ficam vulneráveis", "Sim, se for forte", "Depende do site"], a: 1 },
    { q: "O que é autenticação de dois fatores (2FA)?", options: ["Duas senhas diferentes", "Senha + código do celular/app", "Login duplo", "Senha com 2 palavras"], a: 1 },
    { q: "Qual dessas senhas é mais segura?", options: ["senha123", "Senha@2024", "C@s@D3M@r1@!2024", "12345678"], a: 2 },
    { q: "Posso salvar senhas no navegador?", options: ["Sim, sempre", "Não, nunca", "Sim, mas prefira gerenciadores dedicados", "Só em casa"], a: 2 },
    { q: "O que caracteriza um e-mail de phishing?", options: ["E-mail bonito", "Urgência + links suspeitos + erros", "E-mail longo", "E-mail do chefe"], a: 1 },
    { q: "Recebeu anexo .exe por e-mail. O que fazer?", options: ["Abrir para ver", "Não abrir e reportar", "Salvar no computador", "Encaminhar"], a: 1 },
    { q: "Um e-mail pede para confirmar dados bancários:", options: ["Responder com os dados", "Ligar no banco para verificar", "Clicar no link", "Ignorar"], a: 1 },
    { q: "WhatsApp clone é um tipo de:", options: ["Vírus", "Phishing/Engenharia Social", "Spam", "Malware de hardware"], a: 1 },
    { q: "Verifica-se um remetente seguro por:", options: ["Nome bonito", "Domínio oficial (@empresa.com)", "Assunto urgente", "Muitas imagens"], a: 1 },
    { q: "A LGPD protege qual tipo de informação?", options: ["Dados públicos", "Dados pessoais de pessoas físicas", "Dados de empresas", "Dados financeiros apenas"], a: 1 },
    { q: "Quem fiscaliza o cumprimento da LGPD?", options: ["Polícia Federal", "ANPD (Autoridade Nacional)", "Ministério Público", "Receita Federal"], a: 1 },
    { q: "Titular dos dados tem direito a:", options: ["Vender seus dados", "Solicitar exclusão de seus dados", "Processar empresas", "Nada"], a: 1 },
    { q: "Vazamento de dados pode gerar:", options: ["Nada", "Multa de até 2% do faturamento", "Apenas advertência", "Prisão do CEO"], a: 1 },
    { q: "Dado anonimizado está na LGPD?", options: ["Sim, totalmente", "Não, se não identifica pessoa", "Depende", "Só em casos especiais"], a: 1 },
    { q: "O que é ransomware?", options: ["Antivírus", "Vírus que sequestra dados", "Firewall", "E-mail spam"], a: 1 },
    { q: "Wi-Fi público é seguro para:", options: ["Acessar banco", "Navegar com VPN", "Fazer compras", "Login em redes sociais"], a: 1 },
    { q: "USB encontrado no chão deve ser:", options: ["Conectado para ver conteúdo", "Entregue ao TI/Segurança", "Usado normalmente", "Formatado e usado"], a: 1 },
    { q: "Backup de dados deve ser feito:", options: ["Nunca", "Regularmente (diário/semanal)", "Só uma vez", "Quando lembrar"], a: 1 },
    { q: "Antivírus deve estar:", options: ["Desligado", "Sempre atualizado e ativo", "Só quando navegar", "Opcional"], a: 1 },
    { q: "Recebeu e-mail com prêmio que não participou:", options: ["Clicar e resgatar", "Desconfiar, é provável golpe", "Comemorar", "Compartilhar"], a: 1 },
    { q: "Senha fraca pode causar:", options: ["Nada", "Invasão de conta e roubo de dados", "Lentidão", "Erro de sistema"], a: 1 },
    { q: "Software pirata pode conter:", options: ["Descontos", "Malware e vírus", "Atualizações", "Suporte técnico"], a: 1 },
    { q: "Ao descartar documentos físicos com dados:", options: ["Jogar no lixo", "Rasgar ou usar fragmentadora", "Deixar na mesa", "Queimar"], a: 1 },
    { q: "Permissões de apps no celular devem:", options: ["Aceitar todas", "Revisar e permitir só necessárias", "Negar todas", "Ignorar"], a: 1 },
    { q: "Computador compartilhado requer:", options: ["Senha compartilhada", "Logout após uso", "Deixar logado", "Senha fácil"], a: 1 },
    { q: "VPN serve para:", options: ["Aumentar velocidade", "Proteger conexão e privacidade", "Bloquear sites", "Desligar antivírus"], a: 1 },
    { q: "Política de mesa limpa significa:", options: ["Limpar o pó", "Não deixar documentos/senhas expostos", "Organizar cabos", "Usar mouse pad"], a: 1 },
    { q: "Incidente de segurança deve ser:", options: ["Escondido", "Reportado imediatamente ao TI", "Resolvido sozinho", "Ignorado"], a: 1 },
    { q: "Atualização de sistema operacional é:", options: ["Opcional", "Importante para segurança", "Desnecessária", "Só estética"], a: 1 }
];

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    userData.name = document.getElementById('username').value;
    userData.email = document.getElementById('email').value;

    document.getElementById('display-name').innerText = userData.name.split(' ')[0];
    
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('content-screen').classList.remove('hidden');
    document.getElementById('user-stats').classList.remove('hidden');
});

function showLesson(type) {
    currentModuleType = type;
    const modal = document.getElementById('lesson-modal');
    const title = document.getElementById('lesson-title');
    const body = document.getElementById('lesson-body');
    const defaultBtn = document.getElementById('default-finish-btn');

    defaultBtn.style.display = 'block'; 
    body.innerHTML = '';

    if (type === 'passwords') {
        title.innerText = "🔐 Módulo 1: A Matemática das Senhas";
        
        body.innerHTML = `
            <h3>Por que 8 caracteres não são mais suficientes?</h3>
            <p>Muitas pessoas ainda usam senhas curtas com números (ex: <em>Senha123</em>). Veja na tabela abaixo como hackers quebram essas senhas rapidamente:</p>
            
            <div style="text-align: center; margin: 20px 0;">
                <img src="imagens/quebrasenha.png" 
                     alt="Tabela de tempo para quebrar senhas" 
                     style="width: 100%; max-width: 500px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 1px solid #e2e8f0;">
                <p style="font-size: 0.8em; color: #64748b; margin-top: 5px;">Fonte: Estimativa de força bruta (Hardware moderno)</p>
            </div>

            <h3>A Regra de Ouro: Comprimento > Complexidade</h3>
            <ul>
                <li><strong>12+ Caracteres:</strong> Aumenta o tempo de quebra de "minutos" para "séculos".</li>
                <li><strong>Frases-senha:</strong> Use frases fáceis de lembrar, mas longas. <br>
                    Ex: <em>O-Ceu-Esta-Azul-Hoje-2024!</em> (Muito forte e fácil de digitar).</li>
                <li><strong>Gerenciador de Senhas:</strong> Para não precisar decorar senhas como <em>Xy7#b9@L</em>.</li>
            </ul>
        `;
    } 

    else if (type === 'lgpd') { 
        title.innerText = "💾 Módulo 3: Entendendo a LGPD";
        
        defaultBtn.style.display = 'block'; 
        defaultBtn.innerText = "Entendi, concluir módulo";

        body.innerHTML = `
            <h3>A Lei Geral de Proteção de Dados</h3>
            <p>Você sabe o que é a LGPD? A Lei Geral de Proteção de Dados Pessoais é uma legislação criada para regulamentar a coleta e armazenamento de dados, além de garantir a proteção dos mesmos. 

A lei entrou em vigor em setembro de 2020, e pra entender um pouco melhor os principais objetivos da LGPD e as mudanças que ela trouxe para o ambiente empresarial, assista ao vídeo:</p>

            <div class="video-container" style="text-align:center; margin: 20px 0;">
                <video width="100%" height="auto" controls style="border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); max-height: 400px; background: #000;">
                    <source src="video.mp4" type="video/mp4">
                    <p style="color:white; padding:20px;">Vídeo não encontrado. Por favor, coloque o arquivo 'video.mp4' na pasta do projeto.</p>
                </video>
            </div>
            
            <h3>Pontos Chave:</h3>
            <ul>
                <li><strong>Dado Pessoal:</strong> Informação que identifica você (Nome, CPF).</li>
                <li><strong>Dado Sensível:</strong> Origem racial, saúde, biometria.</li>
                <li><strong>Obrigação:</strong> Transparência e segurança na coleta.</li>
            </ul>
        `;
    }

    else if (type === 'phishing') {
        title.innerText = "🎣 Módulo 2: Desafio Phishing";
        defaultBtn.style.display = 'none'; 
        startGame();
    }

    modal.classList.remove('hidden');
}

function startGame() {
    gameIndex = 0;
    gameScore = 0;
    loadGameScenario();
}

function loadGameScenario() {
    const body = document.getElementById('lesson-body');
    
    if (gameIndex >= phishingScenarios.length) {
        finishGame();
        return;
    }

    const item = phishingScenarios[gameIndex];

    body.innerHTML = `
        <div class="game-area">
            <p>E-mail ${gameIndex + 1} de ${phishingScenarios.length}</p>
            <div class="email-mockup">
                <div class="email-header">
                    <strong>De:</strong> ${item.sender}<br>
                    <strong>Assunto:</strong> ${item.subject}
                </div>
                <div class="email-body">${item.body}</div>
            </div>
            <div class="game-controls">
                <button class="btn-safe" onclick="checkAnswer(false)">✅ É Seguro</button>
                <button class="btn-phishing" onclick="checkAnswer(true)">🚫 É Phishing</button>
            </div>
            <div id="feedback-area"></div>
        </div>
    `;
}

function checkAnswer(userChoiceIsPhishing) {
    const item = phishingScenarios[gameIndex];
    const isCorrect = userChoiceIsPhishing === item.isPhishing;
    const feedbackDiv = document.getElementById('feedback-area');

    document.querySelectorAll('.game-controls button').forEach(b => b.disabled = true);

    if (isCorrect) {
        gameScore++;
        feedbackDiv.innerHTML = `<div class="feedback-box correct">🎉 Acertou! ${item.reason}</div>`;
    } else {
        feedbackDiv.innerHTML = `<div class="feedback-box wrong">❌ Errou! ${item.reason}</div>`;
    }

    setTimeout(() => {
        gameIndex++;
        
        const nextBtn = document.createElement('button');
        nextBtn.innerText = "Próximo ➡";
        nextBtn.className = "btn-primary";
        nextBtn.onclick = loadGameScenario;
        feedbackDiv.appendChild(nextBtn);
    }, 1000);
}

function finishGame() {
    const body = document.getElementById('lesson-body');
    const passed = gameScore >= 2; 

    if (passed) {
        body.innerHTML = `
            <div style="text-align:center">
                <h2>Parabéns! 🛡️</h2>
                <p>Você identificou ${gameScore}/${phishingScenarios.length} ameaças.</p>
                <button class="btn-finish" onclick="finishLesson()">Concluir Módulo e Ganhar XP</button>
            </div>
        `;
    } else {
        body.innerHTML = `
            <div style="text-align:center">
                <h2>Atenção ⚠️</h2>
                <p>Você acertou apenas ${gameScore}. Precisamos de mais atenção.</p>
                <button class="btn-primary" onclick="startGame()">Tentar Novamente</button>
            </div>
        `;
    }
}

function finishLesson() {
    closeLesson();
    
    if (!completedModulesList.includes(currentModuleType)) {
        completedModulesList.push(currentModuleType);
        modulesCompleted++;
        document.getElementById('score-points').innerText = `${modulesCompleted}/3`;

        const btn = document.getElementById(`btn-${currentModuleType}`);
        if(btn) {
            btn.innerText = "Concluído ✔";
            btn.classList.add('completed');
            btn.disabled = true;
        }

        if (modulesCompleted >= 3) {
            const quizBtn = document.getElementById('btn-start-quiz');
            quizBtn.disabled = false;
            quizBtn.innerText = "🚀 Iniciar Avaliação Final";
        }
    }
}

function closeLesson() {
    document.getElementById('lesson-modal').classList.add('hidden');
}

function startQuiz() {
    document.getElementById('content-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');

    questionBank.sort(() => Math.random() - 0.5);
    currentQuestions = questionBank.slice(0, 10);
    
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';

    currentQuestions.forEach((q, idx) => {
        let html = `<div class="question-block"><p><strong>${idx+1}.</strong> ${q.q}</p>`;
        
        q.options.forEach((opt, optIdx) => {
            html += `
                <label>
                    <input type="radio" name="q${idx}" value="${optIdx}" required> ${opt}
                </label>
            `;
        });
        html += `</div>`;
        container.innerHTML += html;
    });
}

function submitQuiz() {
    let score = 0;
    let answered = 0;
    
    currentQuestions.forEach((q, idx) => {
        const selected = document.querySelector(`input[name="q${idx}"]:checked`);
        if (selected) {
            answered++;
            if (parseInt(selected.value) === q.a) score++;
        }
    });

    if (answered < currentQuestions.length) {
        alert("Responda todas as perguntas!");
        return;
    }

    showResult(score, currentQuestions.length);
}

function showResult(score, total) {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');

    const perc = (score/total)*100;
    const title = document.getElementById('result-title');
    const msg = document.getElementById('result-message');
    const certArea = document.getElementById('certificate-area');

    if (perc >= 70) {
        title.innerText = "Aprovado! 🎉";
        title.style.color = "green";
        msg.innerText = `Você acertou ${score} de ${total} (${perc}%)`;
        certArea.classList.remove('hidden');
    } else {
        title.innerText = "Reprovado ❌";
        title.style.color = "red";
        msg.innerText = `Nota: ${perc}%. Mínimo necessário: 70%.`;
        certArea.classList.add('hidden');
    }
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape' });

    doc.setDrawColor(15, 23, 42);
    doc.setLineWidth(4);
    doc.rect(10, 10, 277, 190);

    doc.setLineWidth(1);
    doc.rect(15, 15, 267, 180);

    doc.setFillColor(241, 245, 249);
    doc.rect(15, 15, 267, 180, 'F');

    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(36);
    doc.text("CERTIFICADO DE CONCLUSÃO", 148.5, 55, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(100, 116, 139);
    doc.text("Este documento certifica que", 148.5, 75, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(42);
    doc.setTextColor(37, 99, 235);
    doc.text(userData.name.toUpperCase(), 148.5, 100, { align: "center" });

    doc.setLineWidth(0.5);
    doc.setDrawColor(37, 99, 235);
    doc.line(60, 105, 237, 105);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(51, 65, 85);
    doc.text("Concluiu com êxito o Treinamento Corporativo de Segurança da Informação,", 148.5, 125, { align: "center" });
    doc.text("demonstrando competência em Prevenção a Phishing, Políticas de Senha e LGPD.", 148.5, 135, { align: "center" });

    doc.setDrawColor(15, 23, 42);
    doc.setLineWidth(0.5);
    doc.line(100, 165, 197, 165);
    
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text("Gestor de Cibersegurança", 148.5, 172, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const today = new Date().toLocaleDateString('pt-BR');
    doc.text(`Emitido em: ${today}`, 20, 185);
    
    const certId = Math.random().toString(36).substr(2, 9).toUpperCase();
    doc.text(`ID: ${certId}`, 230, 185);

    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(2);
    doc.circle(250, 40, 15);
    doc.setFontSize(8);
    doc.setTextColor(37, 99, 235);
    doc.text("APROVADO", 250, 41, { align: "center" });
    doc.text("100%", 250, 45, { align: "center" });

    doc.save(`Certificado_${userData.name.replace(/\s/g, '_')}.pdf`);
}