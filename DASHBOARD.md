# Dashboard de Analytics — BrinkPark (plataforma própria)

Documentação da conversa de 16/07/2026. **Orçamento APROVADO pelo cliente: R$ 2.000.**
Cliente pega LP todo mês → plataforma é gancho de recorrência (cada LP nova = integração adicional).

## O problema do cliente

Eles não sabem **onde o cliente deles abandona a página / perde interesse no produto**.
Querem todas as métricas: % de vídeo assistido, cliques, visualizações, fluxos do funil,
conversões de contato pro WhatsApp. Plataforma própria, customizada, multi-LP
(essa LP e todas as próximas que rodarem) + o site oficial.

## Arquitetura decidida (4 camadas)

### 1. Coleta (script JS vanilla, ~100 linhas, roda no navegador)
- **session_id** anônimo via `crypto.randomUUID()` no localStorage — costura a jornada
  de cada visitante (abandono = jornada que para num evento sem o próximo).
- **Progresso de vídeo**: listener `timeupdate` com marcos 10/25/50/75/90/100% por vídeo
  → responde onde abandona DENTRO do vídeo, não só entre etapas.
- Eventos extras: tempo na página, swipes do carrossel v4, `visibilitychange`
  (saiu da aba = abandono), device, UTMs.
- Envio via **`navigator.sendBeacon()`** — POST que o navegador garante entregar mesmo
  fechando a aba (o abandono acontece exatamente quando a pessoa sai).
- Reusa os eventos GTM já existentes na LP: `funil_inicio`, `funil_etapa`,
  `funil_escolha`, `funil_whatsapp_click`, `funil_ver_detalhes`.
- Todo evento carrega **`lp_id`** → multi-LP desde o dia 1. Formato:

```json
{
  "lp_id": "brinkpark-video",
  "session_id": "a1b2c3...",
  "event": "video_progress",
  "props": { "video": "03-escolha-finalidade", "pct": 50 },
  "ts": 1752684000,
  "utm": "meta-campanha-x", "device": "mobile"
}
```

### 2. Ingestão — **Vercel Function** (`POST /events`)
~30 linhas: recebe JSON, grava cru no banco (append-only), responde rápido.
**Decisão importante**: ingestão fica na Vercel (não na VPS do Euller) porque se a
ingestão cair os eventos são PERDIDOS PRA SEMPRE (sendBeacon não tem retry após fechar
a página). Dashboard fora do ar é recuperável; ingestão fora do ar não.

### 3. Banco — **Postgres gerenciado free (Neon ou Supabase)**
- Tabela `events` append-only; inteligência vira queries de agregação (GROUP BY).
- Firestore foi DESCARTADO: free tier 20k writes/dia estoura fácil e Firestore não tem
  GROUP BY (funil exigiria ler milhões de docs ou manter contadores pré-agregados).
- Volume estimado: 200–2.000 visitas/dia × 20–40 eventos = pior caso ~80k eventos/dia,
  ~2,4 mi/mês ≈ 500 MB/ano. Neon free (0,5 GB) segura 1+ ano.
- Euller nunca usou Postgres — sem problema, queries são escritas pelo Claude; SQL ~igual.
- Alternativa descartada: tudo na VPS (SQLite aguentaria fácil, mas VPS = PC pessoal do
  Euller via Tailscale = único ponto de falha; economiza R$ 0 pois cloud é free).
  Híbrido possível no futuro: Vercel recebe → fila → VPS puxa quando online.
- Query exemplo do funil:

```sql
SELECT props->>'etapa', COUNT(DISTINCT session_id)
FROM events WHERE event = 'funil_etapa' AND lp_id = 'brinkpark-video'
GROUP BY 1;
```

### 4. Dashboard — **Next.js no Vercel** (padrão do finance app do Euller)
App Router + Recharts + auth simples (Firebase Auth ok — único uso certo do Firebase aqui).
Postgres via `@neondatabase/serverless` ou Drizzle. Telas:
- **Funil visual** (o ouro): grafo do funil com % de retenção em cada seta / onde vaza.
- **Heatmap de vídeo**: curva de retenção por vídeo (quantos chegaram a 25/50/75%...).
- Conversões WhatsApp por tipo/modelo/região.
- Comparativo entre versões v1–v4 (A/B test de graça).
- Filtros: período, UTM, device. Seletor de LP.

## Integração com o site oficial (Magazord)

Site https://www.brinkpark.com.br/ roda na Magazord (plataforma fechada, sem acesso ao
código) — MAS **já usa o mesmo GTM: GTM-NVFJB7JC**. Solução:
- Tag **Custom HTML no GTM** com o script de coleta, publicada pra todas as páginas.
- No site coleta o básico: pageviews, cliques em produto, cliques WhatsApp, UTMs, scroll.
  `lp_id: "site-oficial"`, mesmo banco.
- Bônus: quando a LP for pra `oferta.brinkpark.com.br`, dá pra costurar jornada
  site ↔ LP com cookie no domínio raiz (localStorage é por domínio).

## Custos

Custo marginal ~R$ 0: script próprio, Vercel free, Neon free, GTM/domínio já existem,
Claude já pago na assinatura. Dos R$ 2.000, sobra quase tudo (Euller vai comprar
estabilizador pro PC/servidor com a grana).

## Precificação (referência p/ próximas LPs)

- Setup dessa plataforma: R$ 2.000 (fechado).
- Cada LP nova plugada: R$ 300–500 por integração, ou embutido no preço da LP
  (é só colar o script de coleta com novo `lp_id`).
- Sugestão futura: mensalidade R$ 200–400/mês (manutenção + evolução).

## Ordem de construção (próxima sessão)

1. Schema do banco + endpoint de ingestão (Vercel Function + Neon).
2. Script de coleta plugado na **v4** (versão atual da LP).
3. Tag GTM Custom HTML pro site oficial.
4. Dashboard Next.js (funil visual → heatmap de vídeo → conversões → filtros).

## Estimativas

- Complexidade: média-baixa. 7–10 dias úteis pra v1 completa da plataforma.
- Risco técnico ~zero; trabalho está no design das telas e nas queries de agregação.
