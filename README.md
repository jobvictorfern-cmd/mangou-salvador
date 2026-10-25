# Mangou Salvador

Landing page estática em HTML, CSS e JavaScript, sem frameworks e sem etapa de build.

## Abrir e publicar

Abra `index.html` no navegador ou sirva a raiz do repositório com qualquer servidor estático. Para testar por HTTP, execute `python -m http.server 8080` na raiz do projeto. A raiz do repositório é o conteúdo a publicar em hospedagem estática.

## Arquivos

- `index.html`: conteúdo, navegação e SEO básico.
- `styles.css`: estilos mobile first, layout responsivo e fontes locais.
- `script.js`: menu mobile, abas de sabores com teclado e créditos.
- `cup-3d.js` e `cup-3d.css`: cena e montagem 3D com fundo transparente.
- `cup-textures.js`: materiais derivados dos recortes macro existentes de manga, plástico e limão.
- `cup-software.js`: projeção da mesma cena no Canvas em aparelhos sem WebGL.
- `animacao-3d.html`: página dedicada à prévia interativa.
- `assets/vendor`: Three.js r170 e sua licença MIT, servidos localmente.
- `assets`: fotografias otimizadas em WebP, marca, favicon e fontes.

## Decisões de conteúdo e conversão

O hero apresenta a fotografia real do copo cheio, com uma entrada suave que respeita a preferência por movimento reduzido. No celular, a foto fica logo abaixo do título; no desktop, o produto ocupa a direita e um gradiente preserva o contraste do texto à esquerda. O vídeo de preparo fica na seção “A experiência”, com reprodução iniciada pelo visitante. As chamadas conduzem aos sabores, às informações de atendimento e ao Instagram real da empresa. O menu mobile e as abas de sabores são operacionais. Os textos foram reduzidos e a seção de perguntas frequentes foi removida para evitar repetição. Não há checkout, envio de pedidos ou formulário com armazenamento.

O material usa as cores verde e amarelo da marca. Não inclui depoimentos inventados, contadores, selos comerciais, preços desatualizados, telefone não confirmado ou horário fixo. A comunicação de atendimento direciona aos Stories. Melhorar a conversão é um objetivo do projeto, não um resultado medido ou garantido.

O cardápio apresenta seis sabores informados pelo responsável: Não tem erro (manga, limão e sal); Miserê (manga, limão, sal e Tajín); Fumacê (manga, limão, sal, pimenta-do-reino, fumaça em pó e páprica defumada); Dengosa (manga, limão, lemon pepper e leite condensado); Dengo (receita ainda não informada, exibida como “Ingredientes em breve”); Xodó (manga, limão, mostarda e mel). A receita de Dengo não foi presumida. As fotografias genéricas ilustram a apresentação do produto e não pretendem retratar as novas receitas. As abas mantêm navegação por teclado e o conteúdo inicial do HTML corresponde a Não tem erro.

## Layout mobile first

O CSS base atende telas a partir de 320 px em uma coluna, com áreas de toque de pelo menos 44 px nos controles principais. Até 800 px, as etapas e os sabores ficam em uma coluna; as abas de sabores aparecem antes da fotografia. A navegação de desktop entra a partir de 801 px. O título inicial usa duas linhas no celular, a foto tem enquadramento próprio e os botões principais têm pelo menos 52 px de altura. A chamada flutuante “Bora de Mangou” foi removida para não cobrir o conteúdo. A foto do hero tem prioridade de carregamento; o MP4 usa `preload="none"`, sem reprodução automática. A página principal não carrega a biblioteca ou os módulos da montagem 3D.

## Fontes

- Perfil oficial, bio e publicações: https://www.instagram.com/mangou.salvador/
- Foto principal: https://www.instagram.com/mangou.salvador/p/Ddr6zo-EYwB/
- Publicação sobre Tajín e Miserê: https://www.instagram.com/mangou.salvador/p/DdSbNK6xsrm/
- Matéria e foto da equipe: https://aloalobahia.com/uncategorized/2026/08/30/manga-temperada-vira-novidade-na-barra-com-combinacoes-que-vao-do-picante-ao-defumado/

As fotografias e a marca pertencem a seus respectivos titulares. As fontes tipográficas são Bricolage Grotesque e DM Sans, distribuídas pelo Google Fonts. Antes de uma campanha comercial, valide com a empresa o conteúdo, as imagens e as informações de atendimento.

## Manutenção

Altere as chamadas e os links no HTML. As descrições dos sabores também estão no objeto `flavors` de `script.js`; atualize o conteúdo inicial correspondente no HTML para preservar a experiência sem JavaScript. As mídias são locais, evitando depender de URLs temporárias do Instagram. Mantenha a pasta `assets` junto dos três arquivos principais.

## WhatsApp e localização

O botão flutuante usa a cor e o símbolo do WhatsApp. O usuário optou por configurar o número depois. Preencha `WHATSAPP_NUMBER` no início de `script.js` com DDI, DDD e número. Enquanto estiver vazio, o botão fica oculto; não há número fictício.

Os botões “Venha de Waze” e “Venha de Maps” levam ao Farol da Barra como referência de localização. O mapa incorporado utiliza o mesmo destino. O ponto exato da Mangou deve ser confirmado nos Stories. Endereço do Farol: https://www.salvadordabahia.com/experiencias/farol-da-barra/

## Animação da chamada final

Tiras de manga com textura fotográfica em WebP transparente caem nas laterais da seção “Vem mangar com a gente”. A animação usa transforms de CSS, não intercepta cliques e utiliza a otimização nativa do navegador para abas ocultas. O usuário solicitou reprodução explícita da animação; nesta seção o efeito é exibido mesmo quando o navegador prefere movimento reduzido. Um botão local permite pausar e retomar. As demais animações do site continuam respeitando a preferência geral. No celular, a quantidade e o tamanho das tiras são menores para preservar a leitura e o desempenho.

O arquivo `assets/mango-strips-real.webp` é uma imagem gerada com a ferramenta de imagens integrada a partir da referência de manga cortada enviada pelo usuário, com três variações recortadas por CSS. Brief do ativo: fotografia macro de três tiras finas de manga verde crua, amarelo pálido, fibras e umidade naturais, curvas distintas, fundo transparente, sem contornos vetoriais ou bordas de alimento frito. O original permanece preservado.

## Textura e faixas da identidade

Os fundos da faixa de sabores, da localização e da chamada final receberam granulação de papel e fibras sutis. O ativo local `assets/paper-grain.svg` utiliza ruído estático reproduzível e mistura suave com as cores existentes. O padrão xadrez aparece em uma faixa estreita na base da seção de localização. A referência é o post da Mangou fornecido pelo usuário. Textos e botões permanecem em camadas de leitura separadas do padrão.

## Foto no hero e vídeo de preparo

A página abre sempre com `assets/manga.webp`, a fotografia real do copo cheio na mão. A entrada da imagem dura 650 ms, acontece uma vez e é desativada quando o navegador prefere movimento reduzido. Links antigos com o parâmetro `hero` continuam abrindo a página com a fotografia.

O vídeo fica depois das três etapas da seção “A experiência”. Usa o arquivo existente `assets/mangou-hero-4k.mp4` sem nova conversão ou recompressão: 3840 × 2160, 24 fps, 8 segundos. O primeiro quadro permanece em `assets/mangou-hero-poster-4k-mp4.webp`. A exibição é integral em 16:9 em todas as telas, com `controls muted playsinline preload="none"`. O visitante inicia a reprodução e pode ativar o áudio original nos controles nativos.

## Prévia 3D separada

A montagem anterior permanece disponível em `animacao-3d.html`, independente da página principal.

O copo é uma malha de revolução com paredes de PET, borda, frisos e tampa abobadada. O logo original é aplicado em uma superfície curva. A manga usa 330 instâncias de uma geometria fina e curva, com variações de cor, mapa de superfície extraído do recorte macro e relevo de fibras. Um volume interno texturizado dá densidade ao preenchimento; pequenas gotas e microvariações no PET refinam o acabamento. O movimento é coreografado, sem motor de colisões: entrada do copo, queda da manga, tempero e limão, encaixe da tampa e rotação final suave.

A sequência dura 11,5 segundos e toca uma vez. Não há controles ou textos visuais sobre a cena. Um botão de pausa e repetição permanece disponível a leitores de tela e só aparece ao receber foco pelo teclado. Ao sair da tela ou ocultar a aba, a renderização para; ao concluir a montagem, também não há loop contínuo. A densidade de pixels é limitada a 1,5 no celular e 2 no desktop. Com preferência por movimento reduzido, a página começa com o copo pronto; o visitante pode iniciar a sequência manualmente.

Three.js r170 é servido de `assets/vendor/three.module.min.js`, sem CDN. Se WebGL não estiver disponível, `cup-software.js` projeta as mesmas coordenadas e instâncias 3D no Canvas 2D, com materiais derivados dos mesmos recortes macro e iluminação simplificada. Se ambos falharem, permanece um recorte do copo com transparência. Essa primeira versão é uma interpretação tridimensional do produto, sem captura volumétrica ou promessa de fidelidade fotográfica.

Validação: sintaxe dos módulos; ausência de painel e barra de progresso; pausa acessível por teclado; renderização alternativa sem GPU; verificação dos vértices da manga dentro do copo concluído. O navegador de testes não oferece WebGL, portanto materiais físicos e reflexos da versão com GPU ainda precisam de conferência em um aparelho com WebGL.
