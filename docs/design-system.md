# Design System - CineLista

Tokens implementados em `src/theme/index.ts`. Use sempre os tokens, nunca cores/valores soltos.
Tema escuro. Regras vindas do RF10 do enunciado (`projeto_somativo_react_native.md`).

## Cores (contraste WCAG calculado)

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| background | `#0F1115` | fundo das telas | - |
| surface | `#1A1D24` | cards, inputs | - |
| surfaceAlt | `#262B35` | itens em destaque, placeholder de imagem | - |
| border | `#343A47` | bordas | - |
| text | `#F2F4F8` | texto principal | 17.2:1 no fundo, 15.3:1 no card |
| textMuted | `#A9B1BF` | texto secundario | 8.8:1 no fundo, 7.8:1 no card |
| primary | `#D81F2A` | botoes principais | texto branco 5.1:1 |
| accent | `#FF4B55` | links, icones ativos | 5.8:1 no fundo, 5.1:1 no card |
| star | `#FFC857` | estrelas de nota | 11:1 no card |
| error | `#FF8A8A` | mensagens de erro | 8.3:1 no fundo |

Minimo exigido: 4.5:1 (AA) para texto.

## Espacamento e forma
`spacing`: 4, 8, 12, 16, 24, 32. `radius`: 6, 10, 16.

## Tipografia
title 24/700, heading 18/700, body 16/400, caption 14/400.
Nao desabilitar `allowFontScaling` e nao usar altura fixa em textos (RF10).

## Regras de acessibilidade (RF10)
- Area de toque minima 44x44 (`MIN_TOUCH`); em icones pequenos use `hitSlop`.
- Todo tocavel e imagem com `accessible`, `accessibilityLabel` e `accessibilityRole`.
- Botoes de estado (favoritar, consumido) usam `accessibilityState={{ selected }}`.
- Nunca transmitir informacao so por cor.

## Componentes base (`src/components`)

| Componente | Uso |
|---|---|
| `Button` | `variant` primary/secondary, `loading`, `disabled`; altura minima 44, role/state de acessibilidade |
| `TextField` | label + input + mensagem de erro (`accessibilityRole="alert"`) |
| `ItemCard` | card do catalogo (RF01): poster com `aspectRatio`, placeholder "Sem imagem", nota |
| `LoadingView` | carga de tela inteira com `ActivityIndicator` (RF09) |
| `ErrorView` | mensagem amigavel + botao "Tentar novamente" (RF09) |

Novos componentes devem usar apenas tokens de `src/theme`.