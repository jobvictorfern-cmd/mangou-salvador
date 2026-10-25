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
- O perfil público apresenta fotografias, artes e Reels. A seleção e a coleta utilizadas nesta versão estão registradas na seção 8.
- WhatsApp oficial ainda não configurado no projeto. A ação de contato permanece direcionada ao Instagram até haver número confirmado.

## 3. Plano por etapas

| Etapa | Entrega | Critério para concluir | Estado |
| --- | --- | --- | --- |
| 0. Documento inicial | Este arquivo, objetivo, escopo e sequência | Documento salvo antes de alterar HTML, CSS ou JS | Concluída |
| 1. Pesquisa e direção visual | Perfil, referências de sites, seleção de fotos e paleta | Fontes registradas, ativos selecionados e direção definida neste documento | Concluída |
| 2. Estrutura e conteúdo | HTML completo e fluxos de navegação | Conteúdo curto, ações reais, sem informação comercial presumida | Concluída |
| 3. Design e interações | CSS mobile first e JS necessário | Layout completo no celular e desktop, componentes operacionais | Concluída |
| 4. Validação | Conferência visual, interações, mídia e acessibilidade | Verificações executadas e resultados/limites registrados | Concluída |
| 5. Publicação | Commit, push e GitHub Pages | Deploy concluído e versão pública conferida | Concluída |

Cada etapa atualiza este documento antes da seguinte. Uma falha observada deve ser corrigida ou registrada como limitação; uma etapa não será marcada como concluída apenas porque o código foi escrito.

## 4. Direção visual definida

Ponto de partida: marca de comida de rua da Barra, fresca e informal. Usar fotografia com contexto real, tipografia expressiva e poucos elementos visuais com função clara. Evitar blocos genéricos de vantagens, selos sem fundamento, ícones repetidos e efeitos decorativos contínuos que disputem atenção com o produto.

Conceito: um cartaz de rua da Mangou levado para a web. Papel claro nas áreas de leitura, amarelo no cardápio, fotografias com enquadramento próprio e xadrez em faixas curtas. Após o feedback registrado na seção 14, a abertura passou a usar verde sólido, letras claras/amarelas e o produto recortado; o restante da direção foi preservado.

### Tokens

| Token | Valor | Uso |
| --- | --- | --- |
| `--green` | `#123c29` | Marca, títulos, botões e localização |
| `--yellow` | `#f6cc37` | Cardápio e chamadas sobre o verde |
| `--paper` | `#fcf8e9` | Fundo principal e leitura |
| `--white` | `#fffdf5` | Molduras e detalhes |
| `--muted` | `#576656` | Texto secundário sobre fundo claro |
| `--line` | `#123c2933` | Separações discretas |

Paleta interpretada das cores recorrentes do perfil e do logo já existente; não se trata de um manual de marca oficial fornecido pela empresa.

- Títulos: Bricolage Grotesque local, peso 800–850, entrelinha curta e tamanhos fluidos.
- Corpo: DM Sans local, base 16 px e entrelinha de pelo menos 1,5.
- Escala de espaçamento: 4, 8, 12, 16, 24, 32, 48, 64 e 96 px.
- Conteúdo: largura máxima de 1240 px; margens de 20 px no celular, ampliadas progressivamente.
- Fotografias: produto integrado ao hero por máscara SVG; bordas de papel e pequenas inclinações na galeria e no cardápio. Sem filtro que altere o alimento.
- Botões: área de toque de pelo menos 48 px, borda definida e contraste forte. Sem botões flutuantes cobrindo conteúdo.
- Foco: contorno visível de alto contraste. Movimento: somente estados de interação; sem chuva de elementos ou animação contínua na LP reconstruída.

### Componentes

| Componente | Solução | Estados importantes |
| --- | --- | --- |
| Cabeçalho | Marca, três âncoras e Instagram | Menu móvel fechado/aberto, Escape, retorno de foco |
| Hero | Frase da embalagem, produto recortado, sabores e localização | Imagem priorizada, SVG com nome acessível, ações visíveis |
| Cardápio | Seis elementos `details` com ingredientes | Primeiro aberto; abertura pelo toque e teclado; uso sem JS |
| Galeria | Fotos/capas reais ligadas aos Reels originais | Links com nome acessível, rolagem horizontal interna no celular |
| Filme do produto | Abertura voluntária em `dialog`, com vídeo nativo | Abrir, reproduzir, pausar, fechar e devolver foco |
| Localização | Foto do Farol, Maps, Waze e Instagram | Sem afirmar ponto ou horário exato não confirmado |

## 5. Estrutura final para implementação

1. Cabeçalho compacto: marca, navegação e acesso claro ao Instagram.
2. Hero: “O que rima com / Manga verde e sal? / Lá ele!”, fotografia original recortada e ações “Escolher meu sabor” e “Onde encontrar”. A frase vem do rótulo visível na própria foto.
3. Sabores: cardápio amarelo com seis opções, ingredientes em disclosure e acesso ao perfil para preços/disponibilidade.
4. O rolê: três fotografias/capas reais, links para os Reels correspondentes e botão para o filme de produto existente.
5. Localização e atendimento: “O encontro é na Barra.”, foto do Farol, rotas e confirmação de ponto/horário no Instagram.
6. Rodapé: marca, navegação e fontes. Sem outro bloco repetindo a apresentação.

Evitar solicitar pedido ou pagamento se não existe fluxo real para isso. Não inserir formulário, checkout, conta ou backend.

## 6. Arquitetura técnica

- `index.html`: conteúdo, semântica, metadados e alternativas que continuam úteis sem JavaScript.
- `styles.css`: tokens do sistema visual, base para 320 px e melhorias progressivas por largura.
- `script.js`: somente comportamento necessário à navegação, sabores e controles de mídia.
- `assets/`: fotos, marca, fontes e mídia servidas localmente.
- `SYSTEM DESIGN.MD`: decisões, fontes, etapas e evidências de validação.
- `README.md`: instruções operacionais e manutenção da versão final.
- `checks/site.mjs`: verificação estrutural em Node.js, sem dependências nem participação na carga da LP.

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
- A bio e a grade pública foram acessadas novamente em 25/10/2026. Ao abrir publicações completas, o Instagram solicitou login. Não houve tentativa de contornar esse bloqueio nem coleta de conteúdo privado.

| Arquivo | Origem pública observada | Uso |
| --- | --- | --- |
| `assets/manga.webp` | https://www.instagram.com/mangou.salvador/p/Ddr6zo-EYwB/ | Hero; fotografia real já preservada no projeto |
| `assets/role-barra.jpg` | https://www.instagram.com/mangou.salvador/reel/Dcg7NSwpMDw/ | Capa do Reel com duas pessoas na orla |
| `assets/role-resenha.jpg` | https://www.instagram.com/esthervasconcelos2001/reel/DdM_B7ihvQf/ | Capa de publicação colaborativa, pessoa experimentando o produto |
| `assets/role-manga.jpg` | https://www.instagram.com/es.sancho/reel/DdMwPkLJcX_/ | Fotografia/capa do produto com a orla ao fundo |
| `assets/role-preparo.jpg` | https://www.instagram.com/conhecendosalvador_/reel/Dct_3Nshrob/ | Capa da publicação sobre o preparo |
| `assets/logo.webp` | Marca já existente no projeto, compatível com o perfil conferido | Identidade |
| `assets/farol-barra.webp` | Wikimedia, crédito mantido no README/rodapé | Referência de localização |
| `assets/mangou-hero-4k.mp4` | Arquivo anteriormente enviado/aprovado pelo usuário | Filme do produto, aberto voluntariamente |

As novas capas foram baixadas das URLs de imagem presentes no DOM público da grade. A resolução disponível é 360 × 640; por isso entram em formatos pequenos, não como hero ampliado. Os Reels completos não foram baixados: a galeria leva às publicações originais. O filme local existente permanece independente desses Reels. Não apresentar uma capa como se fosse um vídeo local novo.

### Referências de design consultadas

- Ma‘ono: https://www.maonoseattle.com/
- Fishwife: https://eatfishwife.com/
- Tacombi: https://www.tacombi.com/

Ma‘ono: título forte, fotografia próxima do alimento e navegação curta. Fishwife: linguagem de embalagem, contornos e cores expressivas; evitar importar a complexidade de loja ou o popup comercial. Tacombi: hierarquia entre produto, cardápio e localização. Foram acessadas páginas oficiais; Ma‘ono e Fishwife também foram inspecionados visualmente no navegador. Não reutilizar fotos, textos, ilustrações ou identidade dessas marcas.

## 9. Validação e publicação

Critérios usados na conferência. Os resultados executados estão nas seções 12 e 13:

1. Sintaxe de JavaScript, integridade de referências locais, IDs e âncoras.
2. Composição mobile/desktop e ausência de transbordamento horizontal.
3. Menu, seleção de sabores, vídeo, links de rota e links de contato.
4. Imagem principal carregada, proporções estáveis e vídeo sem download antecipado.
5. Erros de console e recursos ausentes.
6. Commit publicado, status do deploy e correspondência da página pública.

Testes no navegador não equivalem a teste em aparelho físico ou a um experimento de conversão. Registrar essa distinção na entrega.

## 10. Registro de execução

- 25/10/2026 — Etapa 0: documento criado antes da implementação. Repositório sincronizado e sem alterações locais no início. Perfil oficial acessado; pesquisa visual em andamento.
- 25/10/2026 — Etapa 1: grade e bio verificadas; quatro capas/fotografias reais coletadas; referências oficiais consultadas; paleta, componentes e estrutura definidos. Limitação de acesso a publicações completas registrada. Nenhum HTML, CSS ou JS alterado até concluir esta etapa.
- 25/10/2026 — Etapa 2: HTML reconstruído com hero, seis sabores, galeria de três publicações, localização e créditos. Ingredientes em `details`, vídeo em `dialog` e alternativas sem JS. Não há popup de cadastro, checkout, métricas inventadas ou botão flutuante. CSS e JavaScript da nova estrutura ainda em implementação; etapa visual não considerada concluída.
- 25/10/2026 — Etapa 3: CSS refeito com tokens, base de uma coluna, cardápio amarelo, fotografia em moldura, xadrez e composição desktop a partir de 960 px. No celular, a ação principal foi posicionada antes da fotografia: em 390 × 844 px, seu topo ficou em aproximadamente 292 px, visível na primeira tela. Menu, vídeo em diálogo e configuração opcional do WhatsApp implementados em JS puro. Ingredientes e créditos usam controles HTML nativos. Sem animação contínua, bibliotecas ou dependências novas.
- 25/10/2026 — Início da etapa 4: enquadramento conferido no navegador. A primeira passagem encontrou o título alguns pixels além da coluna desktop; a escala foi reduzida para corrigir esse limite antes da rodada final. Vídeo permanece sem atributo `src` até a abertura voluntária.
- 25/10/2026 — Etapa 4 concluída: verificações estruturais, contraste dos tokens, 11 larguras, navegação, ingredientes, mídia e revisão visual realizadas. Fechamento rápido do filme também conferido: diálogo fechado, vídeo pausado, rolagem liberada e foco no acionador. README atualizado para a nova manutenção. Resultados e limites na seção 12. Publicação iniciada após essas verificações.
- 25/10/2026 — Etapa 5 concluída: código enviado ao GitHub, deploy do Pages finalizado com sucesso e página pública verificada por HTTP e no navegador. Este registro final é publicado em um commit separado da implementação.

## 11. Decisões de implementação

- O CSS usa as próprias fontes locais existentes e não consulta Google Fonts durante a visita.
- O CTA vem antes da foto no layout móvel; a ordem de leitura do HTML continua produto → descrição → ações. No desktop, texto e ações ficam à esquerda da fotografia.
- O cardápio usa `details name="sabores"`; o navegador controla a expansão e oferece teclado sem código adicional. O comportamento continua útil em navegadores que permitem mais de um item aberto.
- O `dialog` usa os controles nativos do vídeo. Ao fechar, a reprodução pausa e o foco retorna ao botão de abertura. Escape e clique no fundo também fecham o diálogo.
- A pausa também ocorre diretamente no acionamento de fechar e no evento de Escape, antes do evento assíncrono `close`, para cobrir fechamento rápido enquanto a mídia ainda está carregando.
- O MP4 só ganha uma URL de fonte depois do clique. O download de 18,8 MB não faz parte da carga inicial. O link direto continua disponível como alternativa quando JS/dialog não estão disponíveis.
- Capas do Instagram são imagens locais. Não há iframe de Instagram, SDK de rede social, mapa incorporado, analytics ou rastreadores novos.
- A localização usa fotografia do Farol e links de rota, em lugar do iframe de mapa da versão anterior.
- A prévia 3D anterior e seus ativos foram preservados; a nova LP não os carrega.

## 12. Resultados da etapa 4

| Verificação executada | Resultado |
| --- | --- |
| Estrutura e sintaxe: `node checks/site.mjs` | Passou: 41 referências locais, IDs únicos, relações ARIA, imagens com dimensões/alt, seis sabores e sintaxe JS |
| Larguras 320, 360, 390, 430, 600, 800, 959, 960, 1024, 1440 e 1885 px | Sem rolagem horizontal; título dentro da coluna em todas as larguras após o ajuste |
| Foto principal | Carregada em todas as larguras verificadas |
| Demais imagens | Sete imagens da página carregadas e decodificadas no navegador |
| Menu móvel | Abre, fecha com Escape, devolve foco ao botão e fecha ao seguir uma âncora |
| Cardápio | As seis receitas conferidas; abertura por clique e teclado; Dengo não recebe ingredientes presumidos |
| Filme | Fonte ausente antes do clique; abertura voluntária; reprodução dos 8 segundos completos, sem erro de mídia |
| Fechamento do diálogo | Escape fecha, pausa vídeo, libera rolagem e devolve foco ao acionador |
| JavaScript no navegador | Nenhum erro de console registrado na rodada de interação |
| Contraste calculado das cores-base | Verde/papel 11,59:1; verde/amarelo 7,99:1; secundário/papel 5,74:1 |
| MP4 4K preservado | Hash Git do arquivo local igual ao ativo anterior; nenhuma recompressão |

Os resultados de contraste cobrem esses pares de cores, não constituem auditoria completa de acessibilidade. A validação visual foi feita no navegador com viewports ajustados; não foi realizada em aparelho físico. A alternativa sem JavaScript foi conferida estruturalmente, sem uma sessão de navegador com JS desativado. Não há experimento A/B, analytics novo ou conversão medida.

Evidências locais: `verificacao/mangou-redesign/` na pasta de trabalho acima do repositório, incluindo pesquisa de mídia e resultados responsivos. Essas evidências não são dependências da página publicada.

## 13. Publicação verificada

- Documento inicial criado e commitado antes da implementação: `19ef4f1`.
- Implementação publicada: `cc4fe4a4760732f0fcd8c85e1ee6c30749149aca`.
- GitHub Actions: execução `40225562142`, workflow `pages build and deployment`, resultado `success`.
- URL da versão: https://jobvictorfern-cmd.github.io/mangou-salvador/?v=cc4fe4a
- HTTP 200 para HTML, CSS v20, JavaScript v21 e as quatro novas imagens.
- Navegador público em 390 × 844 px: identidade nova, fotografia correta, seis sabores e fonte do vídeo ainda ausente antes do clique. Menu e abertura de Xodó conferidos; ingredientes mostrados corretamente. Após o carregamento das fontes, largura do documento igual à largura útil, sem transbordamento.
- O arquivo MP4 continua sendo o ativo anterior, e a nova página permanece em HTML, CSS e JS, sem framework ou dependências novas de runtime.

Todas as etapas previstas neste documento foram executadas. Permanecem os limites explicitados na seção 12: aparelhos físicos, auditoria completa de acessibilidade e resultados reais de conversão não foram verificados.

## 14. Revisão do hero após feedback

25/10/2026 — O usuário aprovou a LP, mas considerou o hero genérico. Escopo desta revisão: somente a abertura e seus metadados, preservando cardápio, galeria, localização e comportamentos já aprovados.

Direção: trocar a composição de foto inclinada + marca-texto + selo por uma campanha da própria Mangou. Usar a brincadeira sobre manga verde e sal presente no rótulo fotografado, fundo verde, tipografia clara/amarela e a fotografia original integrada à composição. O produto não será redesenhado nem gerado novamente; o recorte será definido por uma máscara SVG na página, mantendo o arquivo fotográfico intacto.

| Etapa da revisão | Estado |
| --- | --- |
| Registrar diagnóstico, referência e escopo | Concluída |
| Compor o novo hero com os ativos existentes | Concluída |
| Conferir recorte, celular, desktop e links | Concluída |
| Publicar e conferir a versão pública | Pendente |

Implementação: fundo verde sólido; pergunta em papel claro e resposta amarela; copo e mão recortados por `clipPath` SVG inline. `assets/manga.webp` permanece intacto e recebe preload prioritário. O SVG possui nome acessível via `title`. No celular, a ação de sabores aparece antes da fotografia; em desktop, texto e produto dividem a abertura. A foto não anima e não depende de JavaScript.

Validação local desta revisão: `node checks/site.mjs` passou; `git diff --check` sem erro de whitespace. Larguras 320, 360, 390, 430, 600, 800, 959, 960, 1024, 1440 e 1885 px, com fontes carregadas: sem transbordamento horizontal e com o título dentro da largura útil. Ações com aproximadamente 52 px e 44 px de altura. Recorte conferido visualmente em celular, transição de desktop e tela ampla. A fotografia e o MP4 não foram modificados; `script.js` permanece igual ao da versão aprovada. Mantêm-se os limites de validação da seção 12.
