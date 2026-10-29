# Validação de RF07 e RF10

## Verificações automatizadas

- `npm test`: serviço de autenticação com um cofre simulado. Cobre cadastro,
  normalização do e-mail, login incorreto, duplicidade, logout, restauração,
  contas independentes e falhas de leitura/gravação do armazenamento.
- `npm run typecheck`: TypeScript de toda a aplicação.
- `CI=1 npx expo export --platform android --platform ios`: compilação dos bundles
  para as duas plataformas. Não substitui execução no aparelho.

## RF07: roteiro no aparelho

O usuário confirmou testes no celular sem problemas: cadastro/login, rejeição de
senha incorreta, sessão após fechar e reabrir, avaliação de séries, consulta,
alteração e remoção de notas. A confirmação foi fornecida pelo usuário; a execução
no dispositivo não foi observada pelo agente. Modelo e versão do sistema não foram
informados. O roteiro completo abaixo fica como referência para regressão.

1. Criar uma conta, sair e confirmar que o botão Voltar não abre o catálogo.
2. Tentar login com senha errada; confirmar mensagem e permanência no login.
3. Entrar com a senha correta e reiniciar o app; confirmar sessão restaurada.
4. Nos detalhes, escolher uma nota de 1 a 5 e abrir Assistidos pelo catálogo.
5. Alterar a nota e confirmar atualização, sem duplicar a série na lista.
6. Reiniciar o app e confirmar favoritos, assistidos e notas preservados.
7. Sair e cadastrar outra conta; conferir listas vazias. Voltar à primeira conta
   e confirmar que os dados originais reaparecem.
8. Remover uma série dos assistidos; reiniciar e confirmar a remoção.

Credenciais e sessão usam exclusivamente o SecureStore. As listas usam
AsyncStorage por conta. É autenticação local, sem serviço de nuvem. Dados globais
anteriores não são migrados para uma conta, pois não há vínculo de proprietário.
Referência: [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/).

## RF10: implementação

| Área | Comportamento |
|---|---|
| Cards | Um elemento acessível com nome, nota e estado favorito; ação de abrir detalhes |
| Imagens | Pôster dos detalhes com rótulo; imagem do card e ícones decorativos não recebem foco separado |
| Favoritos | Rótulo de adicionar/remover e estado selecionado |
| Assistidos | Botões de avaliação com nota atual no rótulo e estado selecionado |
| Formulários | Campo com rótulo, dica de erro e mensagens de erro anunciadas |
| Carregamento | Rótulo e estado ocupado; botão desabilitado durante autenticação |
| Fonte ampliada | Grade vira uma coluna a partir de escala 1,3 ou largura menor que 360; títulos completos e controles com altura mínima, sem altura de texto fixa |
| Toque | Botões e ações no cabeçalho com área mínima de 44; controles de nota permitem quebra de linha |

Contraste calculado pela luminância relativa sRGB, com os tokens em estado normal:

| Cores | Razão |
|---|---|
| Texto / superfície alternativa | 12,89:1 |
| Texto secundário / superfície alternativa | 6,58:1 |
| Branco / botão primário | 5,06:1 |
| Destaque / superfície | 5,13:1 |
| Erro / superfície | 7,43:1 |
| Borda de controle / superfície | 3,61:1 |

A borda passou de `#343A47` para `#697588` para distinguir os campos e botões
secundários do fundo. Referências de implementação:
[acessibilidade no React Native](https://reactnative.dev/docs/accessibility) e
[dimensões e escala de fonte](https://reactnative.dev/docs/usewindowdimensions).

## RF10: roteiro de leitor de tela e fonte ampliada

- Ativar o leitor de tela e percorrer login/cadastro, catálogo, favoritos,
  detalhes e assistidos. Conferir ordem de foco e leitura em português.
- Confirmar que cada card e botão é anunciado uma única vez e pode ser acionado.
- Provocar erros de formulário e login; confirmar anúncio e correção dos campos.
- Favoritar/desfavoritar e escolher notas; confirmar leitura do novo estado.
- Aumentar a fonte para 200%, testar tela estreita e abrir o teclado: conferir
  rolagem, campos, nomes completos, sinopse e ações sem sobreposição.
- Confirmar retorno do foco ao navegar e ausência de elementos fora da tela que
  recebam foco indevidamente.

O usuário confirmou que os testes com TalkBack e fonte ampliada passaram sem
problemas. Essa confirmação cobre o dispositivo utilizado; não houve confirmação
de teste separado com VoiceOver no iOS. O roteiro fica como referência para a
revisão e para novos testes após a integração dos PRs da equipe.

## Integração com o trabalho da equipe

Os PRs de busca (#21) e feedback (#20) estavam abertos durante a implementação.
Ao integrá-los, preservar AuthProvider, a opção Assistidos, os controles de fonte
ampliada e os rótulos/estados acessíveis. A tela de busca adicionada pelo PR #21
também deve passar pelo roteiro de leitor de tela e fonte ampliada.
