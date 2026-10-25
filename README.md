# Mangou Salvador

Landing page estática em HTML, CSS e JavaScript, sem frameworks e sem etapa de build.

## Abrir e publicar

Abra `index.html` no navegador ou sirva a raiz do repositório com qualquer servidor estático. Para testar por HTTP, execute `python -m http.server 8080` na raiz do projeto. A raiz do repositório é o conteúdo a publicar em hospedagem estática.

## Arquivos

- `index.html`: conteúdo, navegação e SEO básico.
- `styles.css`: estilos, layout responsivo e fontes locais.
- `script.js`: menu mobile, abas de sabores com teclado e créditos.
- `assets`: fotografias otimizadas em WebP, marca, favicon e fontes.

## Decisões de conteúdo e conversão

O hero usa a fotografia real do produto como fundo de toda a seção. O contraste sobre a foto preserva a leitura. As chamadas conduzem aos sabores, às informações de atendimento e ao Instagram real da empresa. O menu mobile, as abas e as perguntas frequentes são operacionais. Não há checkout, envio de pedidos ou formulário com armazenamento.

O material usa as cores verde e amarelo da marca. Não inclui depoimentos inventados, contadores, selos comerciais, preços desatualizados, telefone não confirmado ou horário fixo. A comunicação de atendimento direciona aos Stories. Melhorar a conversão é um objetivo do projeto, não um resultado medido ou garantido.

O cardápio mostra três combinações verificadas. Limão e sal descreve a combinação e não presume um nome comercial. Miserê e seu uso de Tajín foram observados no perfil oficial. Os ingredientes de Fumacê foram descritos na matéria indicada abaixo. A foto de manga usada ao apresentar Fumacê ilustra o formato do produto, sem afirmar que mostra essa receita. Todas as linhas de apoio acima dos títulos foram removidas.

## Fontes

- Perfil oficial, bio e publicações: https://www.instagram.com/mangou.salvador/
- Foto principal: https://www.instagram.com/mangou.salvador/p/Ddr6zo-EYwB/
- Publicação sobre Tajín e Miserê: https://www.instagram.com/mangou.salvador/p/DdSbNK6xsrm/
- Matéria e foto da equipe: https://aloalobahia.com/uncategorized/2026/08/30/manga-temperada-vira-novidade-na-barra-com-combinacoes-que-vao-do-picante-ao-defumado/

As fotografias e a marca pertencem a seus respectivos titulares. As fontes tipográficas são Bricolage Grotesque e DM Sans, distribuídas pelo Google Fonts. Antes de uma campanha comercial, valide com a empresa o conteúdo, as imagens e as informações de atendimento.

## Manutenção

Altere as chamadas e os links no HTML. As descrições dos sabores também estão no objeto `flavors` de `script.js`; atualize o conteúdo inicial correspondente no HTML para preservar a experiência sem JavaScript. As mídias são locais, evitando depender de URLs temporárias do Instagram. Mantenha a pasta `assets` junto dos três arquivos principais.

## WhatsApp e localização

O botão flutuante usa a cor e o símbolo do WhatsApp. O usuário optou por configurar o número depois. Preencha `WHATSAPP_NUMBER` no início de `script.js` com DDI, DDD e número. Enquanto estiver vazio, o botão permanece sem navegação, com estado acessível de indisponível; não há número fictício.

Os botões “Venha de Waze” e “Venha de Maps” levam ao Farol da Barra como referência de localização. O mapa incorporado utiliza o mesmo destino. O ponto exato da Mangou deve ser confirmado nos Stories. Endereço do Farol: https://www.salvadordabahia.com/experiencias/farol-da-barra/

## Animação da chamada final

Tiras de manga com textura fotográfica em WebP transparente caem nas laterais da seção “Vem mangar com a gente”. A animação usa transforms de CSS, não intercepta cliques e utiliza a otimização nativa do navegador para abas ocultas. O usuário solicitou reprodução explícita da animação; nesta seção o efeito é exibido mesmo quando o navegador prefere movimento reduzido. Um botão local permite pausar e retomar. As demais animações do site continuam respeitando a preferência geral. No celular, a quantidade e o tamanho das tiras são menores para preservar a leitura e o desempenho.

O arquivo `assets/mango-strips-real.webp` é uma imagem gerada com a ferramenta de imagens integrada a partir da referência de manga cortada enviada pelo usuário, com três variações recortadas por CSS. Brief do ativo: fotografia macro de três tiras finas de manga verde crua, amarelo pálido, fibras e umidade naturais, curvas distintas, fundo transparente, sem contornos vetoriais ou bordas de alimento frito. O original permanece preservado.

## Textura e faixas da identidade

Os fundos da faixa de sabores, da localização e da chamada final receberam granulação de papel e fibras sutis. O ativo local `assets/paper-grain.svg` utiliza ruído estático reproduzível e mistura suave com as cores existentes. O padrão xadrez aparece em uma faixa estreita na base da seção de localização. A referência é o post da Mangou fornecido pelo usuário. Textos e botões permanecem em camadas de leitura separadas do padrão.

## Hero com vídeo

O vídeo enviado pelo usuário substitui as animações do copo. A página abre com o vídeo; `?hero=foto` abre a fotografia original. Links anteriores com `?hero=montagem` ou `?hero=montagem-original` também exibem o vídeo. O vídeo reproduz uma vez e mantém o último quadro, com controles de pausa, reprodução e repetição. Se o navegador bloquear a reprodução automática, o mesmo botão permite iniciá-la. A foto continua disponível pelo botão “Ver foto”.

A versão atual usa `assets/mangou-hero-4k.mp4`, uma cópia exata de “MANGOU_food_commercial_production_20261025001208_4K.mp4”: H.264, 3840 × 2160, 24 fps, 8 segundos e 18.8 MB. Essa é a versão 4K gerada anteriormente a partir do vídeo enviado pelo usuário, com upscale Lanczos e nitidez suave. O arquivo 4K foi copiado sem nova conversão ou recompressão; sua integridade foi conferida por SHA-256.

A faixa de áudio original está preservada no arquivo. A reprodução no hero permanece silenciosa pelo atributo `muted`. Os arquivos de mídia usam novos nomes para evitar a reutilização da versão anterior pelo cache do navegador.

`assets/mangou-hero-poster-4k-mp4.webp` é o primeiro quadro do MP4 4K, exportado em WebP em 3840 × 2160. No desktop, o vídeo preenche o hero com o produto deslocado para a direita e um gradiente preserva o contraste do texto. No celular, o vídeo é exibido inteiro em 16:9 abaixo do texto, preservando a composição original. O vídeo usa `autoplay muted playsinline`.

A chamada final com tiras fotográficas de manga permanece independente do hero. A faixa xadrez fica apenas na base da seção de localização.
