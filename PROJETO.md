# LP BrinkPark — Funil de Vídeo Interativo

Documentação da sessão de 04/07/2026 (v1/v2/v3) + sessão de 12/07/2026 (v4).
Status: v1-v3 aguardando aprovação de orçamento; **v4 construída na madrugada de
12/07 com os 14 vídeos novos do cliente + fluxo.pdf enviados**, aguardando validação.

## O que é

LP mobile-first onde vídeos do "Richard" (vendedor) rodam em sequência; ao fim de cada vídeo
sobem botões de escolha (região → finalidade → modelo) até fechar o pedido no WhatsApp com
mensagem pré-preenchida (modelo, finalidade, região + template de nome/endereço/telefones).
Conceito veio de 2 áudios do cliente no WhatsApp (transcritos com whisper.cpp).

## URLs

- Produção (teste): https://brinkpark-video-lp.vercel.app/ (Vercel plugado neste repo — push = deploy)
- Repo: https://github.com/oileer/brinkpark-video-lp (público)
- GitHub Pages (backup): https://oileer.github.io/brinkpark-video-lp/

## Estrutura do repo

```
index.html            → seletora V1/V2/V3 (apresentação p/ cliente)
v1/                   → Original: fullscreen escuro, literal aos áudios
v2/                   → Identidade da Marca: header + banner vermelho #d10000 + card
v3/                   → Completa (RECOMENDADA): v2 + preços nos botões + pill
                        "Ver todos os modelos" + botões sobem 3s antes do fim do vídeo
videos/               → 10 MP4 (do WhatsApp, comprimidos — pedir originais por Drive)
modelos/              → LP anterior (22/03) com hub + 7 páginas de produto (links relativos)
assets/logo-brinkpark.svg → logo oficial (bp vermelho #D51F26 + raio amarelo #FFC609)
index-v1-backup.html.bak  → primeira versão única (histórico)
```

As 3 versões compartilham o mesmo core (grafo `FUNIL` em JS vanilla + double buffering de
2 `<video>` + preload via fetch + gate de autoplay iOS + eventos GTM `funil_*` no GTM-NVFJB7JC).
v1 e v3 são o mesmo arquivo da v2 com overrides de CSS/JS — alteração no fluxo precisa ser
replicada nos 3 arquivos (`v*/index.html`).

## Mapa do funil (grafo em cada v*/index.html)

boasVindas(01) → regiao(02: Sul/Sudeste/Nordeste/Outra→whats) → finalidade(03: Locação/Casa)
→ residencial(04: 2,44m / 3,05m) ou locacao(05: 2,44m / 4,27m Nacional)
→ modelo244(06) / modelo305(07) / modelo427(08) → fechamento(10: CTA WhatsApp)
Vídeo 09-transicao ("eu volto antes de fechar") está FORA do fluxo v1 — encaixar se o cliente pedir.

## Configurações importantes (topo do script em cada v*/index.html)

- `WHATS_NUMERO = '5549998282916'` ← ATENÇÃO: site oficial usa (49) 99972-6205. Confirmar com cliente.
- `WHATS_URL = 'https://linkdowhats.app/kxx'` (link da LP de março, p/ dúvidas)
- Preços nos botões da v3 (vindos da LP de março, conferir): 2,44m R$1.397 / 3,05m R$1.797 /
  2,44m Nacional R$1.497 / 4,27m R$3.497. OBS: no site oficial atual os preços são outros
  (ex.: Europa 2,44m R$1.470 no cartão / R$1.397 pix) — validar antes de ir pro ar.

## Materiais de origem (neste PC do escritório)

- `C:\Users\user\Downloads\lp brinkpark\` → áudios .ogg, vídeos originais do WhatsApp,
  WAVs extraídos, `BRIEFING.md` (transcrições completas + mapa do funil) e `transcricao_videos_4a10.txt`
- whisper.cpp instalado em `C:\Users\user\whisper.cpp\Release\whisper-cli.exe`
  (modelos small e large-v3-turbo em `models/`); ffmpeg via winget
- LP de março clonada em `C:\Users\user\Desktop\public-projects\`

## Pendências (quando aprovar)

1. Confirmar número do WhatsApp do CTA (ver acima).
2. Confirmar preços e nomes dos modelos por ramo (assumi "Nacional" = linha Tradicional).
3. Pedir vídeos originais por Google Drive (WhatsApp comprime) e re-encodar:
   `ffmpeg -i in.mp4 -c:v libx264 -b:v 1500k -vf scale=720:-2 -movflags +faststart out.mp4`
4. Confirmar sequência dos vídeos com o cliente (ordem foi deduzida das transcrições).
5. Cliente escolhe versão → promover pra raiz e subir no domínio deles
   (`oferta.brinkpark.com.br/video/` — caminhos relativos já funcionam).
6. Se tráfego alto: mover MP4s pra CDN (Cloudinary).

## Analytics

Eventos dataLayer: `funil_inicio`, `funil_etapa` (etapa), `funil_escolha` (regiao/finalidade/modelo),
`funil_whatsapp_click` (tipo: pedido/duvida/outra_regiao), `funil_ver_detalhes`.
GTM já instalado: GTM-NVFJB7JC (mesmo do site) → dá pra montar funil no GA4 e públicos no Meta Ads.

---

## V4 (12/07/2026) — fluxo novo + carrossel estilo Stories

Cliente mandou 14 vídeos renumerados + `fluxo.pdf` (diagrama do funil) na madrugada.
V4 reaproveita o MESMO engine da v3 (double buffering, GTM, WhatsApp CTA) e adiciona um
**modo carrossel estilo Stories** pra etapa de "ver tamanhos e valores" (era pedido do
cliente: "vídeo e descrição de cama modelo como se fosse um carrossel de storys, tipo
tem no nosso site com os clientes").

### Mapa do funil v4

```
01-inicio → 02-apresentacao (pergunta: região)
  ├─ Norte → 04-norte-nao-atendemos → (CTA WhatsApp "atende mesmo assim?")
  └─ Sul/Sudeste/Nordeste → 03-escolha-finalidade (pergunta: locação / casa / ver todas)
        ├─ Locação        → 05-locacao        → carrossel NACIONAL (427,305,244,490)
        ├─ Ter em casa     → 07-nacional-e-europa (pergunta: Nacional / Europa / as duas)
        │     ├─ Nacional  → carrossel NACIONAL
        │     ├─ Europa    → 06-europa → carrossel EUROPA (305,244)
        │     └─ As duas   → carrossel TODOS (Nacional + Europa)
        └─ Ver todas       → 07-nacional-e-europa → (mesmos 3 sub-ramos acima)

Carrossel (stories, swipe lateral, barra de progresso no topo):
  [tamanhos do grupo, maior→menor] → 14-finalizacao (trava, mostra botão WhatsApp)
```

### Sobre o carrossel

Cada slide = 1 vídeo de modelo (`videos/08` a `13`) com card sobreposto (nome + preço
ou "Consulte no WhatsApp" quando o preço não foi confirmado) e botão "Quero este" que já
manda pro WhatsApp com o modelo preenchido. Tocar na lateral esquerda/direita da tela
troca de slide (como Stories do Instagram); barra de progresso no topo mostra em qual
slide está. Último slide é sempre o vídeo `14-finalizacao`, que ao acabar mostra o CTA
final (não precisa clicar "Quero este" nele).

### Pendências específicas da v4

1. **Preços não confirmados**: só 2,44m Nacional (R$1.497), 4,27m Nacional (R$3.497) e
   2,44m Europa (R$1.397) têm preço da LP de março. **3,05m Nacional, 4,90m Nacional e
   3,05m Europa são modelos NOVOS sem preço** — a v4 mostra "Consulte o valor no
   WhatsApp" pra esses em vez de inventar. Preencher em `PRECOS` no `v4/index.html`
   assim que o cliente confirmar.
2. Minha leitura do `fluxo.pdf` (desenho à mão) pode não bater 100% com a intenção do
   cliente, principalmente: (a) se "locação" deveria também ter acesso à linha Europa;
   (b) se o vídeo 05-locacao já explica tudo ou se falta um vídeo específico de
   "diferenças da nacional" pra esse ramo (o diagrama menciona um "vídeo 4" separado
   que não bate com nenhum arquivo entregue — pode ser que o cliente ainda vá gravar).
   Validar o fluxo entero assistindo a v4 antes de aprovar.
3. Vídeos originais (100-250MB cada) comprimidos para libx264 720p CRF 26 — ok pra
   mobile, mas comparar qualidade com o cliente antes de publicar.
4. Mesmas pendências da v1-v3: confirmar número do WhatsApp e revisar preços existentes.
