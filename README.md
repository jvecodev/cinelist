# CineLista

Catalogo interativo de series em **React Native + Expo** (TypeScript), consumindo a
[TVMaze API](https://www.tvmaze.com/api). Somativo de Desenvolvimento Mobile Hibrido - BSI.

## Como rodar

Requisitos: Node.js LTS e o app **Expo Go** no celular (ou um emulador).

```bash
npm install
cp .env.example .env   # no Windows: copy .env.example .env
npx expo start
```

Escaneie o QR code com o Expo Go.

## Estrutura

```
src/
  components/  contexts/  hooks/  screens/
  services/    navigation/  types/  theme/
docs/design-system.md
```

## Equipe e organizacao
- Fluxo de branches, PRs e mapa issue -> branch: [CONTRIBUTING.md](CONTRIBUTING.md)
- Design system: [docs/design-system.md](docs/design-system.md)
- Enunciado: [projeto_somativo_react_native.md](projeto_somativo_react_native.md)

## Status dos requisitos
Acompanhe pelas issues e milestones do repositorio.

## Login local e assistidos (RF07)

No primeiro acesso, toque em **Criar uma conta**. A conta existe apenas neste
aparelho. Credenciais e sessão são guardadas no cofre criptografado do sistema
com `expo-secure-store`; não há autenticação em nuvem. Esse fluxo requer Android
ou iOS (não oferece armazenamento de senhas no navegador).

Nos detalhes de uma série, escolha uma nota de 1 a 5 em **Minha avaliação** para
marcá-la como assistida. O ícone de assistidos no catálogo abre a lista com suas
notas. É possível alterar a nota ou remover a série. Favoritos e assistidos ficam
no AsyncStorage, separados pelo e-mail da conta local, e sobrevivem ao logout.
Os registros globais da versão anterior ficam preservados, mas não são atribuídos
automaticamente a uma conta.

### Validação

Com Node.js 22.18+ e dependências instaladas:

```bash
npm test
npm run typecheck
```

Roteiro no dispositivo: criar conta, sair, tentar senha incorreta, entrar com a
senha correta, avaliar uma série, alterar a nota, favoritar, fechar e reabrir o app
e conferir sessão/listas. Sair e entrar em uma segunda conta deve mostrar listas
independentes. Voltar à primeira conta deve recuperar seus dados.

Para os critérios de acessibilidade, contraste e validação manual com leitor de
tela, consulte [o roteiro de RF07/RF10](docs/validacao-rf07-rf10.md).
