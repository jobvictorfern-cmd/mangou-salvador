# Mangou Salvador

Landing page estática em **HTML, CSS e JavaScript puro**, sem framework, dependências de runtime ou build.

## Abrir e verificar

Sirva a raiz com `python -m http.server 8130 --bind 127.0.0.1` e abra http://127.0.0.1:8130/.

Execute `node checks/site.mjs` para conferir referências locais, IDs, ARIA, imagens, seis sabores, ausência do componente de filme e sintaxe de JavaScript.
Execute `node checks/parallax.mjs` para testar interpolação, limites, sensores simulados, permissões, orientação e fallback do parallax.

O GitHub Pages publica a raiz da branch `main`: https://jobvictorfern-cmd.github.io/mangou-salvador/

## Projeto

O [SYSTEM DESIGN.MD](<SYSTEM DESIGN.MD>) documenta escopo, fontes, tokens visuais, componentes, etapas, validação e limites. Foi criado antes da reconstrução.

- `index.html`: conteúdo, receitas, links e créditos.
- `styles.css`: sistema visual e layout mobile first.
- `script.js`: menu, pausa da animação, ano do rodapé e WhatsApp opcional.
- `hero-parallax.js`: cursor, inclinação autorizada, interpolação e fallback do produto.
- `assets/`: mídias e fontes locais.
- `checks/site.mjs`: verificação de desenvolvimento, sem dependências.

A composição usa papel claro, verde, amarelo, xadrez e fotos reais. O hero traz a brincadeira do rótulo e o copo integrado ao fundo verde. A ação de sabores aparece antes da fotografia no celular. Não há botão flutuante, formulário, checkout, contadores, depoimentos fabricados ou rastreador novo.

Os fios de manga caem por toda a área do hero: 28 trilhas no desktop e 14 no celular. O botão no canto pausa/retoma a queda. Fora da tela ou com a aba oculta, a animação para. Com movimento reduzido no aparelho, começa parada e pode ser iniciada pelo botão. O PNG `assets/fios-manga.png` é o original transparente enviado pelo usuário, reaproveitado em três sprites CSS.

`assets/papel-grain.svg` aplica uma textura estática de papel impresso aos fundos e molduras por `background-blend-mode: soft-light`. A textura não cobre fotos, textos ou controles. Não há dependência nova.

O copo reage ao cursor com deslocamento de até 12 px e rotação de até 5° por eixo. Os fios acompanham 40% do deslocamento e o fundo reage a 18% em sentido oposto. No celular compatível, “Ativar movimento” solicita acesso ao sensor quando necessário e calibra a posição inicial. Sem autorização/dados, o copo fica estático. O parallax não roda com movimento reduzido, fora do hero ou na aba oculta. Sensores exigem contexto seguro, como o site HTTPS publicado; não há solicitação automática nem envio desses dados.

## Manutenção

Edite os ingredientes nos seis elementos `details.flavor` do HTML. Não há cópia das receitas no JavaScript. As receitas conhecidas foram informadas pelo responsável; os ingredientes de Dengo continuam sujeitos a confirmação.

A bio pública foi revisitada em 25/10/2026: sábados e domingos na Barra, com dias extras nos Stories. As rotas usam o Farol da Barra como referência; ponto e horário exatos devem ser confirmados no perfil.

O WhatsApp fica oculto enquanto `WHATSAPP_NUMBER` em `script.js` estiver vazio. Quando houver confirmação, preencha 55 + DDD + número, somente dígitos. O contato aparece no rodapé, sem botão flutuante.

## Fotografias e ativos preservados

O hero usa `assets/copo-parallax.png`, PNG transparente enviado pelo usuário, preservado sem edição ou recompressão em 1122 × 1402 px. O navegador usa `object-fit: contain`; o movimento acontece no contêiner, sem modificar o arquivo. `assets/manga.webp`, fotografia anterior, permanece no projeto e na prévia de compartilhamento. Quatro capas públicas foram recolhidas da grade do Instagram: `role-barra.jpg`, `role-resenha.jpg`, `role-manga.jpg` e `role-preparo.jpg`. Fontes e usos estão no System Design; cada imagem da galeria abre sua publicação original.

As publicações completas solicitaram login. Foram coletadas as capas públicas; os Reels completos não foram baixados. O filme local é o material anterior do projeto, independente desses Reels.

O botão do filme, seu diálogo e os controles associados foram removidos da LP a pedido do usuário. O MP4 4K permanece no repositório sem recompressão, sem ser referenciado ou carregado pela página principal. As fontes Bricolage Grotesque e DM Sans são locais e suas licenças permanecem em `assets/`.

Créditos e links de procedência estão no rodapé e no System Design. As referências de design Maono, Fishwife e Tacombi não forneceram ativos para a LP. Fotografias e marca pertencem aos respectivos titulares.

## Arquivos anteriores

A página `animacao-3d.html`, seus módulos `cup-*` e o Three.js local foram preservados separadamente. A LP reconstruída não os carrega.

Conversão é um objetivo; não há experimento ou resultado comercial medido.
