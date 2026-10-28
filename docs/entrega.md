# Rascunho do PDF de entrega (issue #12)

Fonte para montar o PDF único enviado pelo **campo oficial** do Canvas (não por comentário: -30%).
Cada item faltante = -20%. Itens `TODO` dependem do grupo ou dos RFs ainda abertos.

---

## Capa
- **Disciplina:** Desenvolvimento Mobile Híbrido - Bacharelado em Sistemas de Informação (BSI)
- **Professor:** Mark Joselli
- **Turma:** TODO
- **Data de entrega:** 02/11/2026
- **Projeto:** CineLista - Catálogo Interativo 2.0 (catálogo de séries de TV)
- **Integrantes (nome completo, igual ao dito no vídeo; quem faltar leva ZERO):**
  - TODO (jvecodev)
  - TODO (Jcliz)
  - TODO (eduardofabrii)
  - TODO (rdsalvesPUC)

## Seção 1 - Links
- **Repositório (público):** https://github.com/jvecodev/cinelist (README explica `npx expo start`)
- **Vídeo (YouTube, público):** TODO

## Seção 2 - Tema e Configuração
- **Tema:** catálogo de séries de TV
- **API:** TVMaze (https://www.tvmaze.com/api), pública e sem chave: `/shows?page=`, `/shows/:id`, `/search/shows?q=`
- **Persistência:** Local, com `@react-native-async-storage/async-storage` (RF06)
- **Login:** Local (RF07), TODO confirmar: senha com `expo-secure-store`/hash
- Tema/API diferente do somativo de Flutter: TODO confirmar (o Flutter usou ______)

## Seção 3 - Autoavaliação RF01-RF10
| RF | Implementado | Arquivo principal |
|---|---|---|
| RF01 Catálogo, FlatList e paginação | Sim | `src/screens/HomeScreen.tsx`, `src/hooks/useShows.ts` |
| RF02 Navegação | Sim | `src/navigation/RootNavigator.tsx` |
| RF03 Detalhes | Sim | `src/screens/DetailsScreen.tsx`, `src/utils/html.ts` |
| RF04 Favoritos com Context | TODO (PR #17) | `src/contexts/FavoritesContext.tsx` |
| RF05 Tela de favoritos | TODO (PR #18) | `src/screens/FavoritesScreen.tsx` |
| RF06 Persistência local | TODO (PR #19) | `src/hooks/usePersistentState.ts`, `src/services/storage.ts` |
| RF07 Login, sessão e consumidos | TODO (#7) | TODO |
| RF08 Busca | TODO (PR #21) | `src/screens/SearchScreen.tsx` |
| RF09 Feedback de UI | Parcial, falta o login (PR #20) | `src/hooks/useFetch.ts`, `src/components/LoadingView.tsx`, `src/components/ErrorView.tsx` |
| RF10 Acessibilidade | TODO (#10) | `src/theme/index.ts`, `docs/design-system.md` |

## Seção 4 - Flutter x React Native (meia página)
TODO grupo: revisar com a experiência real do somativo de Flutter. Pontos que a rubrica pede, com o que temos do lado RN:
- **Estado global (Provider x Context):** aqui, `FavoritesContext`/`ConsumedContext` com `createContext` + hook customizado (`useFavorites`). No Flutter: ______.
- **Listas (GridView x FlatList):** `FlatList` com `numColumns`, `onEndReached` e `keyExtractor` virtualiza a grade. No Flutter: `GridView.builder` ______.
- **Assincronismo (FutureBuilder x useEffect/useState):** estados explícitos no `useFetch`/`useShows`, com cancelamento via `AbortController`. No Flutter: `FutureBuilder` ______.
- **Ferramentas (hot reload x Fast Refresh/Expo Go):** Expo Go no celular, sem build nativo. No Flutter: ______.

## Seção 5 - Explicação Técnica
- **Tema:** TODO (sugestão: "Tratamento de falhas de rede": erro na rolagem infinita sem perder a lista, retry, cancelamento com `AbortController` no `useFetch`)
- **Minuto no vídeo:** 5:30-8:00

## Seção 6 - Screenshots
TODO: login, catálogo, detalhes, busca, favoritos, itens consumidos.

---

## Roteiro do vídeo (6 a 9 min; -5% por minuto fora)
| Tempo | Bloco | Quem |
|---|---|---|
| 0:00-0:30 | Cada um diz o nome completo | Todos |
| 0:30-2:00 | Demo: login, rolagem infinita, busca, detalhes, favoritos, consumidos, reabrir o app (persistência) | TODO |
| 2:00-5:30 | Código (~50s cada) | jvecodev RF01-03, Jcliz RF04-06, eduardofabrii RF07/RF10, rdsalvesPUC RF08/RF09 |
| 5:30-8:00 | Explicação técnica | TODO |

## Checklist antes de enviar
- [ ] Repositório público
- [ ] Nenhum `.env` ou chave commitada
- [ ] Todos os nomes completos na capa
- [ ] Vídeo público entre 6 e 9 min
- [ ] PDF enviado pelo campo oficial até 02/11/2026 23:59
