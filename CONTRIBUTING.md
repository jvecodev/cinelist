# Como contribuir

## Fluxo
1. Pegue uma issue (veja o responsavel e o milestone = bloco do video).
2. Crie uma branch a partir da `main` atualizada.
3. Commits pequenos e descritivos; PR para `main` com `Closes #N` na descricao.
4. Pelo menos 1 colega revisa antes do merge. Nao commitar direto na `main`.

## Nome das branches
| Tipo | Padrao | Exemplo |
|---|---|---|
| Requisito funcional | `feat/rfNN-nome` | `feat/rf01-catalogo` |
| Setup/infra | `chore/nome` | `chore/setup` |
| Correcao | `fix/nome` | `fix/paginacao-duplicada` |
| Documentacao | `docs/nome` | `docs/readme` |

## Mapa de branches e issues
| Branch | Issue | Responsavel |
|---|---|---|
| `chore/setup` | #11 | jvecodev |
| `feat/rf01-catalogo` | #1 | jvecodev |
| `feat/rf02-navegacao` | #2 | jvecodev |
| `feat/rf03-detalhes` | #3 | jvecodev |
| `feat/rf04-favoritos-context` | #4 | Jcliz |
| `feat/rf05-tela-favoritos` | #5 | Jcliz |
| `feat/rf06-persistencia` | #6 | Jcliz |
| `feat/rf07-login-consumidos` | #7 | eduardofabrii |
| `feat/rf08-busca` | #8 | rdsalvesPUC |
| `feat/rf09-feedback-ui` | #9 | rdsalvesPUC |
| `feat/rf10-acessibilidade` | #10 | eduardofabrii |
| `docs/entregaveis` | #12 | rdsalvesPUC |

## Estrutura do codigo (src/)
`components/` reutilizaveis, `contexts/` Context API, `hooks/` hooks customizados,
`screens/` telas, `services/` chamadas de API, `navigation/` stacks, `types/` tipos TS,
`theme/` tokens do design system (`docs/design-system.md`).

## Segredos
Nunca commitar `.env`. Use `.env.example` e variaveis `EXPO_PUBLIC_*`.