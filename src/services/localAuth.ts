export type AuthUser = { email: string };

export type CredentialStore = {
  getItemAsync: (key: string) => Promise<string | null>;
  setItemAsync: (key: string, value: string) => Promise<void>;
  deleteItemAsync: (key: string) => Promise<void>;
};

export class AuthError extends Error {}

const SESSION_KEY = 'cinelista.session';
const normalizeEmail = (email: string) => email.trim().toLowerCase();
// SecureStore aceita apenas letras, numeros, ponto, hifen e underscore nas chaves.
const accountKey = (email: string) => `cinelista.account.${email.split('').map((c) => c.charCodeAt(0).toString(16).padStart(4, '0')).join('')}`;

export function createLocalAuth(store: CredentialStore) {
  function validate(email: string, password: string) {
    if (email.length > 254 || !/^\S+@\S+\.\S+$/.test(email)) throw new AuthError('Informe um e-mail válido.');
    if (password.length < 6 || password.length > 128) throw new AuthError('A senha deve ter entre 6 e 128 caracteres.');
  }

  return {
    async restore(): Promise<AuthUser | null> {
      const email = await store.getItemAsync(SESSION_KEY);
      if (!email) return null;
      if (email !== normalizeEmail(email) || !/^\S+@\S+\.\S+$/.test(email) || !(await store.getItemAsync(accountKey(email)))) {
        await store.deleteItemAsync(SESSION_KEY);
        return null;
      }
      return { email };
    },
    async authenticate(rawEmail: string, password: string, register: boolean): Promise<AuthUser> {
      const email = normalizeEmail(rawEmail);
      validate(email, password);
      const key = accountKey(email);
      const stored = await store.getItemAsync(key);
      if (register) {
        if (stored !== null) throw new AuthError('Já existe uma conta com este e-mail neste aparelho. Faça login.');
        // A senha fica exclusivamente no cofre criptografado do sistema (SecureStore).
        await store.setItemAsync(key, password);
      } else if (stored === null || stored !== password) {
        throw new AuthError('E-mail ou senha incorretos.');
      }
      await store.setItemAsync(SESSION_KEY, email);
      return { email };
    },
    async signOut() {
      await store.deleteItemAsync(SESSION_KEY);
    },
  };
}
