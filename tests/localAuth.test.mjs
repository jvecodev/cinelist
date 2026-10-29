import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createLocalAuth } from '../src/services/localAuth.ts';

function setup() {
  const data = new Map();
  const store = {
    async getItemAsync(key) { return data.get(key) ?? null; },
    async setItemAsync(key, value) { data.set(key, value); },
    async deleteItemAsync(key) { data.delete(key); },
  };
  return { data, store, auth: createLocalAuth(store) };
}

test('cadastro normaliza o email e restaura sessao em outra instancia', async () => {
  const { auth, store, data } = setup();
  assert.deepEqual(await auth.authenticate('  Ana@Example.com ', 'senha123', true), { email: 'ana@example.com' });
  assert.deepEqual(await createLocalAuth(store).restore(), { email: 'ana@example.com' });
  assert.equal(data.get('cinelista.session'), 'ana@example.com');
  assert.ok([...data.keys()].every((key) => /^[\w.-]+$/.test(key)));
});

test('login rejeita usuario ausente e senha incorreta sem criar sessao', async () => {
  const { auth } = setup();
  await assert.rejects(auth.authenticate('ana@example.com', 'senha123', false), /incorretos/);
  await auth.authenticate('ana@example.com', 'senha123', true);
  await auth.signOut();
  await assert.rejects(auth.authenticate('ana@example.com', 'errada123', false), /incorretos/);
  assert.equal(await auth.restore(), null);
});

test('logout persiste, preserva a conta e permite novo login', async () => {
  const { auth, store } = setup();
  await auth.authenticate('ana@example.com', 'senha123', true);
  await auth.signOut();
  assert.equal(await createLocalAuth(store).restore(), null);
  assert.deepEqual(await auth.authenticate('ANA@example.com', 'senha123', false), { email: 'ana@example.com' });
});

test('cadastro duplicado nao sobrescreve credenciais', async () => {
  const { auth } = setup();
  await auth.authenticate('ana@example.com', 'original', true);
  await auth.signOut();
  await assert.rejects(auth.authenticate('ANA@example.com', 'diferente', true), /Já existe/);
  await auth.authenticate('ana@example.com', 'original', false);
});

test('validacao impede gravacao de email e senha invalidos', async () => {
  const { auth, data } = setup();
  for (const [email, password] of [['invalido', 'senha123'], ['ana@example.com', '123'], ['ana@example.com', 'x'.repeat(129)]]) {
    await assert.rejects(auth.authenticate(email, password, true));
  }
  assert.equal(data.size, 0);
});

test('contas diferentes mantem credenciais independentes', async () => {
  const { auth } = setup();
  await auth.authenticate('ana@example.com', 'senhaAna', true);
  await auth.authenticate('bia@example.com', 'senhaBia', true);
  await assert.rejects(auth.authenticate('bia@example.com', 'senhaAna', false), /incorretos/);
  await auth.authenticate('ana@example.com', 'senhaAna', false);
});

test('sessao sem conta e sessao invalida sao descartadas', async () => {
  const { auth, data } = setup();
  for (const value of ['ana@example.com', 'corrompido']) {
    data.set('cinelista.session', value);
    assert.equal(await auth.restore(), null);
    assert.equal(data.has('cinelista.session'), false);
  }
});

test('falhas do cofre sao propagadas, sem simular sucesso', async () => {
  const { store, auth } = setup();
  await auth.authenticate('ana@example.com', 'senha123', true);
  store.deleteItemAsync = async () => { throw new Error('cofre indisponivel'); };
  await assert.rejects(auth.signOut(), /cofre indisponivel/);
  assert.deepEqual(await auth.restore(), { email: 'ana@example.com' });
  store.getItemAsync = async () => { throw new Error('falha de leitura'); };
  await assert.rejects(auth.restore(), /falha de leitura/);
});

test('falha ao persistir sessao nao autentica e permite login apos tentar novamente', async () => {
  const { store, auth } = setup();
  const originalSet = store.setItemAsync;
  store.setItemAsync = async (key, value) => {
    if (key === 'cinelista.session') throw new Error('sem espaco');
    await originalSet(key, value);
  };
  await assert.rejects(auth.authenticate('ana@example.com', 'senha123', true), /sem espaco/);
  assert.equal(await auth.restore(), null);
  store.setItemAsync = originalSet;
  await auth.authenticate('ana@example.com', 'senha123', false);
});
