# Simony Ferreira Estética — Landing Page

Landing page estática (HTML5 + CSS3 + JavaScript vanilla) para a **Estética facial e corporal em Fortaleza — Dra. Simony Ferreira**, construída a partir do briefing e do perfil do Google Meu Negócio da empresa.

## Como executar localmente

Não há build, nem dependências de Node.js/npm. É um site 100% estático.

**Opção 1 — abrir direto no navegador**
Dê duplo clique em `index.html`.

**Opção 2 — servidor local (recomendado, evita problemas de CORS com o `fetch` do config.json)**

Com Python instalado:
```bash
python -m http.server 5500
```
Depois acesse `http://localhost:5500` no navegador.

Ou com a extensão "Live Server" do VS Code, clicando em "Go Live".

## Estrutura do projeto

```
empresa-teste/
├── index.html              # Página única
├── vercel.json              # Config de deploy (sem build)
├── assets/
│   ├── css/style.css        # Estilos (paleta, layout, animações)
│   ├── js/script.js         # Scroll reveal, parallax, carrossel, editor
│   ├── config.json          # Dados editáveis da página
│   └── imagens/image.png    # Imagem real fornecida no briefing
└── README.md
```

## Stack

- HTML5 semântico
- CSS3 puro (Grid, Flexbox, Custom Properties)
- JavaScript vanilla (IntersectionObserver para scroll reveal, parallax, carrossel de depoimentos, menu mobile)
- Google Fonts: Playfair Display (títulos) + Poppins (corpo)

## Seções da página

1. Header fixo (logo + menu + CTA WhatsApp)
2. Hero (headline, CTAs, estatísticas reais do Google — nota 5,0, 100 avaliações)
3. Procedimentos (Skinbooster, Botox, Enzimas, Crio HD — direto do Google Meu Negócio)
4. Sobre o atendimento (texto oficial do perfil da empresa)
5. Diferenciais
6. Depoimentos (avaliações reais do Google, em carrossel automático)
7. Galeria de resultado (antes & depois — imagem real fornecida)
8. CTA final
9. Contato (WhatsApp, telefone, endereço, mapa do Google incorporado)
10. Footer + botão flutuante de WhatsApp

## Sistema de edição

O botão "✏️ Editar Página" abre um modal para editar título, subtítulo, telefone, endereço e Instagram. Como o site é estático (sem backend), salvar faz o download de um `config-edicoes.json` atualizado — não sobrescreve o arquivo original no servidor.

## Observação sobre as imagens

O briefing listava 8 entradas de imagem, porém todas com o mesmo nome de arquivo (`image.png`), resultando em **1 único arquivo real** salvo em `assets/imagens/`. Essa imagem (antes & depois de procedimento facial) foi reutilizada nas seções Hero, Sobre e Galeria, por ser o único material fornecido — nenhuma imagem adicional foi inventada ou gerada.

## Deploy

Não faça deploy a partir daqui. O `vercel.json` já está preparado para quando o processo de publicação for executado separadamente.
