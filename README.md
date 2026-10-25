# Mangou Salvador

Landing page estática em **HTML, CSS e JavaScript puro**, sem framework, dependências de runtime ou build.

## Abrir e verificar

Sirva a raiz com `python -m http.server 8130 --bind 127.0.0.1` e abra http://127.0.0.1:8130/.

Execute `node checks/site.mjs` para conferir referências locais, IDs, ARIA, imagens, seis sabores, carregamento do vídeo e sintaxe de JavaScript.

O GitHub Pages publica a raiz da branch `main`: https://jobvictorfern-cmd.github.io/mangou-salvador/

## Projeto

O [SYSTEM DESIGN.MD](<SYSTEM DESIGN.MD>) documenta escopo, fontes, tokens visuais, componentes, etapas, validação e limites. Foi criado antes da reconstrução.

- `index.html`: conteúdo, receitas, links, créditos e vídeo.
- `styles.css`: sistema visual e layout mobile first.
- `script.js`: menu, diálogo do filme e WhatsApp opcional.
- `assets/`: mídias e fontes locais.
- `checks/site.mjs`: verificação de desenvolvimento, sem dependências.

A composição usa papel claro, verde, amarelo, xadrez e fotos reais. O hero traz a brincadeira do rótulo e o copo integrado ao fundo verde. A ação de sabores aparece antes da fotografia no celular. Não há botão flutuante, formulário, checkout, contadores, depoimentos fabricados ou rastreador novo.

## Manutenção

Edite os ingredientes nos seis elementos `details.flavor` do HTML. Não há cópia das receitas no JavaScript. As receitas conhecidas foram informadas pelo responsável; os ingredientes de Dengo continuam sujeitos a confirmação.

A bio pública foi revisitada em 25/10/2026: sábados e domingos na Barra, com dias extras nos Stories. As rotas usam o Farol da Barra como referência; ponto e horário exatos devem ser confirmados no perfil.

O WhatsApp fica oculto enquanto `WHATSAPP_NUMBER` em `script.js` estiver vazio. Quando houver confirmação, preencha 55 + DDD + número, somente dígitos. O contato aparece no rodapé, sem botão flutuante.

## Fotografias e filme

O hero usa `assets/manga.webp`, foto real já existente no projeto, com o copo e a mão recortados por `clipPath` SVG inline em `index.html`. O arquivo da fotografia permanece intacto. Ao trocar a foto, ajuste também essa máscara. Quatro novas capas públicas foram recolhidas da grade do Instagram: `role-barra.jpg`, `role-resenha.jpg`, `role-manga.jpg` e `role-preparo.jpg`. Fontes e usos estão no System Design; cada imagem da galeria abre sua publicação original.

As publicações completas solicitaram login. Foram coletadas as capas públicas; os Reels completos não foram baixados. O filme local é o material anterior do projeto, independente desses Reels.

O MP4 4K existente permanece sem recompressão. Seu endereço só é atribuído ao vídeo depois do clique. Sem JS ou suporte ao diálogo, há link direto. As fontes Bricolage Grotesque e DM Sans são locais e suas licenças permanecem em `assets/`.

Créditos e links de procedência estão no rodapé e no System Design. As referências de design Maono, Fishwife e Tacombi não forneceram ativos para a LP. Fotografias e marca pertencem aos respectivos titulares.

## Arquivos anteriores

A página `animacao-3d.html`, seus módulos `cup-*` e o Three.js local foram preservados separadamente. A LP reconstruída não os carrega.

Conversão é um objetivo; não há experimento ou resultado comercial medido.
