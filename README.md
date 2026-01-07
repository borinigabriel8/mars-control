# 🔵 MARS CONTROL — Terminal Simulation System

Simulador de terminal sci-fi inspirado em sistemas de controle de missão espacial em Marte.
Interface retrô com efeitos sonoros, animação de digitação e comandos interativos em tempo real.

O projeto recria a experiência de um centro de comando marciano, incluindo logs do sistema, mapas setoriais, mini-game e sequência de autodestruição.

📸 Demonstração

![View](https://github.com/borinigabriel8/mars-control/blob/main/Screenshot_1.png)
---

![Versão](https://img.shields.io/badge/versão-1.0.0-E50914?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Finalizado-success?style=for-the-badge)
![Licença](https://img.shields.io/badge/Licença-MIT-white?style=for-the-badge)

Acesso pelo **Pages**: https://borinigabriel8.github.io/mars-control/

---

## 🧠 Funcionalidades

🖥️ Interface estilo terminal futurista
⌨️ Efeito de digitação com som retro
🔊 Beeps gerados por Web Audio API
🛰️ Logs e mensagens do sistema
🧭 Mapa ASCII de setores
🧪 Simulação de scanner
🛡️ Sistema de Security Override
💣 Sequência de Self-Destruct
🎮 Mini-game embutido de exploração
🎮 Mini-Game incluso

Mini-simulação exploratória com estado dinâmico:
- SCAN → verifica área
- MOVE NORTH → deslocamento no terreno
- EXIT → encerra simulação

Inclui:
- zonas radioativas
- mensagens dinâmicas
- avisos sonoros

---

## 🔐 Sistema de Segurança
Autodestruição só funciona após override.
SELFDESTRUCT  → ❌ ACCESS DENIED
OVERRIDE      → 🔓 ADMIN ENABLED
SELFDESTRUCT  → 💣 countdown + alarme

Durante a autodestruição:
- alarme sonoro é ativado
- tela limpa
- exibe falha crítica do sistema

---

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Web Audio API

---
