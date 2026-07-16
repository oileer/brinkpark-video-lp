# Sugestões de melhoria — LP BrinkPark v4

Levantadas em 16/07/2026 (nada implementado ainda; apenas backlog).

## Críticos antes de apontar o domínio (oferta.brinkpark.com.br)

1. **Banda de vídeo no Vercel** — cada sessão baixa ~20-40MB de vídeo; free tier = 100GB/mês
   (~3-4 mil visitas). Com Meta Ads rodando de verdade, estoura.
   Opções: Vercel Pro (US$20/mês, 1TB — repassar na mensalidade do cliente) ou mover MP4s
   pra CDN (Bunny ~US$5-10/TB, Cloudflare R2 egress grátis).
   **Snapshot 16/07 (últimos 30 dias, só testes): 1,84 GB / 100 GB — folga total por enquanto.
   Decidir quando a campanha for escalar; o dashboard vai mostrar o consumo real.**
2. **Preços desencontrados no `/modelos`** (LP de março) e nas v1-v3 — ex.: 4,27m a R$3.497
   (errado; correto R$2.898). A v4 ainda linka pra lá ("prefiro ver os modelos direto" +
   botão do CTA final). Corrigir preços, tirar os links ou apontar pro site oficial antes de ir pro ar.
3. **`/versoes` e v1-v3 públicas em produção** — subir só a v4 no domínio deles, ou noindex + remover seletora.
4. **Evento de Lead no Meta Pixel via GTM** — disparar Lead/Contact no `funil_whatsapp_click`
   pra campanha otimizar por clique no WhatsApp, não por pageview. Maior alavanca de mídia, ~15min no GTM.

## Conversão (pós-lançamento, validar com o dashboard)

5. **Cronômetro dentro do vídeo** — pill compacta ("⏰ 2d 14:03") flutuando no stage;
   o banner some da tela quando o vídeo ocupa o celular.
6. **Botão voltar do Android** — `history.pushState` por etapa: voltar = etapa anterior, não abandono.
7. **Poster + loading no primeiro vídeo** — frame do Richard + spinner; evita quadro preto no 4G.
8. **Retomar de onde parou** — etapa no localStorage; quem volta (retargeting) não reassiste tudo.
9. **Fallback se vídeo falhar** — `onerror` pula pros botões da etapa ou mostra CTA WhatsApp;
   falha técnica nunca deve matar lead.
10. **OG tags** (`og:image`/`og:title`) — card bonito ao compartilhar o link no WhatsApp.

## Nota comercial

11. **Cronômetro sábado→sábado reinicia pra sempre** — prática confirmada pelo Deiwidy, mas garantir
    que algo de fato muda no sábado (preço/condição/brinde). Escassez falsa = risco Procon
    (eles listam Procon SC no rodapé do site oficial).

**Top 3 se for escolher:** CDN/banda (1), preços do /modelos (2), Pixel de Lead (4).
