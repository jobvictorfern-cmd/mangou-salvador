# Mangou Salvador — System Design

Documento de trabalho da reconstrução da landing page. Criado em 25/10/2026, antes das alterações de implementação.

## 1. Objetivo e limites

Refazer a landing page com prioridade para celular, identidade própria e conteúdo curto. A página deve tornar claros o produto, os sabores e como encontrar a Mangou ou consultar o atendimento no Instagram.

Conversão pretendida: abrir o cardápio, consultar o Instagram e traçar uma rota. Não há resultado de conversão medido; o redesenho não implica garantia de aumento de vendas.

- Implementação: HTML semântico, CSS e JavaScript puro, sem framework nem etapa de build.
- Fotografias e identidade: recolher e conferir materiais do perfil oficial; manter a procedência dos arquivos utilizados.
- Conteúdo: não inventar avaliações, números comerciais, preços, ingredientes, horários ou telefone.
- Hero: fotografia real do produto, conforme decisão nesta conversa. Vídeo como conteúdo complementar, com reprodução voluntária.
- Preservar os seis sabores já informados pelo responsável, distinguindo receitas ainda não confirmadas.
- Publicação: atualizar o repositório e o GitHub Pages existentes depois da validação.

## 2. Contexto conferido

- Repositório: `jobvictorfern-cmd/mangou-salvador`, branch `main`, publicação pela raiz.
- Base da reconstrução: commit `57b37f60c55f784d91ff2abadbe2926f664c3d77`; cópia local sincronizada com `origin/main` no início desta etapa.
- Perfil oficial acessado no navegador: https://www.instagram.com/mangou.salvador/
- Bio observada: “Manga Fresca, Sabor que Vicia”; sábados e domingos na Barra, Salvador; dias adicionais avisados nos Stories.
- O perfil público apresenta fotografias, artes e Reels. A seleção visual e a coleta de mídia estão em andamento.
- WhatsApp oficial ainda não configurado no projeto. A ação de contato permanece direcionada ao Instagram até haver número confirmado.

## 3. Plano por etapas

| Etapa | Entrega | Critério para concluir | Estado |
| --- | --- | --- | --- |
| 0. Documento inicial | Este arquivo, objetivo, escopo e sequência | Documento salvo antes de alterar HTML, CSS ou JS | Concluída |
| 1. Pesquisa e direção visual | Perfil, referências de sites, seleção de fotos e paleta | Fontes registradas, ativos selecionados e direção definida neste documento | Em andamento |
| 2. Estrutura e conteúdo | HTML completo e fluxos de navegação | Conteúdo curto, ações reais, sem informação comercial presumida | Pendente |
| 3. Design e interações | CSS mobile first e JS necessário | Layout completo no celular e desktop, componentes operacionais | Pendente |
| 4. Validação | Conferência visual, interações, mídia e acessibilidade | Verificações executadas e resultados/limites registrados | Pendente |
| 5. Publicação | Commit, push e GitHub Pages | Deploy concluído e versão pública conferida | Pendente |

Cada etapa atualiza este documento antes da seguinte. Uma falha observada deve ser corrigida ou registrada como limitação; uma etapa não será marcada como concluída apenas porque o código foi escrito.

## 4. Direção visual — a fechar na etapa 1

Ponto de partida: marca de comida de rua da Barra, fresca e informal. Usar fotografia com contexto real, tipografia expressiva e poucos elementos visuais com função clara. Evitar blocos genéricos de vantagens, selos sem fundamento, ícones repetidos e efeitos decorativos contínuos que disputem atenção com o produto.

O sistema visual deve registrar, depois da pesquisa:

- Cores e respectivos usos: fundo principal, superfícies de leitura, chamadas e contraste.
- Tipografia: títulos, corpo e rótulos, com tamanhos adequados a telas pequenas.
- Espaçamento, largura de leitura, bordas e proporções das fotografias.
- Componentes: cabeçalho, navegação móvel, botões, seleção de sabores, mídia e localização.
- Estados: foco, hover, seleção, menu aberto, mídia pausada e movimento reduzido.

## 5. Estrutura proposta — sujeita à pesquisa

1. Cabeçalho compacto: marca, navegação e acesso claro ao Instagram.
2. Hero: produto reconhecível, uma mensagem curta e ações para sabores e localização.
3. Sabores: seis opções com ingredientes conhecidos e interação simples para explorar.
4. Experiência real: fotografia e/ou vídeo do preparo, sem texto repetido.
5. Localização e atendimento: Barra, rotas e confirmação dos horários nos Stories.
6. Fechamento: chamada objetiva para visitar o perfil e rodapé com fontes.

Evitar solicitar pedido ou pagamento se não existe fluxo real para isso. Não inserir formulário, checkout, conta ou backend.

## 6. Arquitetura técnica

- `index.html`: conteúdo, semântica, metadados e alternativas que continuam úteis sem JavaScript.
- `styles.css`: tokens do sistema visual, base para 320 px e melhorias progressivas por largura.
- `script.js`: somente comportamento necessário à navegação, sabores e controles de mídia.
- `assets/`: fotos, marca, fontes e mídia servidas localmente.
- `SYSTEM DESIGN.MD`: decisões, fontes, etapas e evidências de validação.
- `README.md`: instruções operacionais e manutenção da versão final.

As páginas e fontes da prévia 3D anterior não precisam ser apagadas para refazer a landing page; permanecem separadas da página principal. A decisão sobre arquivos novos ou substituídos será registrada ao implementar.

## 7. Responsividade, acessibilidade e mídia

- Começar com uma coluna no celular e ampliar a composição quando houver espaço.
- Conferir ao menos 320, 390, 600, 800, 1024 e 1440 px, incluindo transições de layout.
- Sem rolagem horizontal involuntária, elementos sobrepostos ou ações encobertas.
- Navegação por teclado, foco visível, rótulos acessíveis, textos alternativos e contraste legível.
- Respeitar `prefers-reduced-motion`; não depender de animação para apresentar o produto.
- Reservar as proporções das imagens para evitar saltos de layout.
- Priorizar a foto do hero; adiar imagens secundárias e o download do vídeo.
- Preservar o MP4 4K existente sem recompressão caso seja reutilizado, conforme preferência anterior do usuário.
- Não inserir fotos de uma combinação como se comprovassem outra receita.

## 8. Fontes e referências

### Marca e conteúdo

- Instagram oficial: https://www.instagram.com/mangou.salvador/
- Publicação já usada no projeto para fotografia do produto: https://www.instagram.com/mangou.salvador/p/Ddr6zo-EYwB/
- A relação dos novos materiais e seus usos será preenchida na etapa 1.

### Pesquisa de design iniciada

- Ma‘ono: https://www.maonoseattle.com/
- Fishwife: https://eatfishwife.com/
- Tacombi: https://www.tacombi.com/

Esses sites são referências de composição e navegação a inspecionar. Não reutilizar fotos, textos, ilustrações ou identidade dessas marcas.

## 9. Validação e publicação

Resultados ainda pendentes para a nova versão. A conferência deve registrar:

1. Sintaxe de JavaScript, integridade de referências locais, IDs e âncoras.
2. Composição mobile/desktop e ausência de transbordamento horizontal.
3. Menu, seleção de sabores, vídeo, links de rota e links de contato.
4. Imagem principal carregada, proporções estáveis e vídeo sem download antecipado.
5. Erros de console e recursos ausentes.
6. Commit publicado, status do deploy e correspondência da página pública.

Testes no navegador não equivalem a teste em aparelho físico ou a um experimento de conversão. Registrar essa distinção na entrega.

## 10. Registro de execução

- 25/10/2026 — Etapa 0: documento criado antes da implementação. Repositório sincronizado e sem alterações locais no início. Perfil oficial acessado; pesquisa visual em andamento.
