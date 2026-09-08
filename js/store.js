/**
 * js/store.js - Gerenciador de Estado Resiliente e Centralizado
 * Persistência segura em localStorage com fallback em memória e tratamento de erros.
 */

class SafeStorage {
  constructor() {
    this.memoryStore = new Map();
    this.isAvailable = this.testAvailability();
  }

  testAvailability() {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn('[Store] localStorage indisponível ou em modo anônimo restrito. Usando fallback em memória.');
      return false;
    }
  }

  getItem(key) {
    if (this.isAvailable) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.warn(`[Store] Erro ao ler chave "${key}":`, e);
      }
    }
    return this.memoryStore.get(key) || null;
  }

  setItem(key, value) {
    if (this.isAvailable) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (e) {
        console.warn(`[Store] Erro ao gravar chave "${key}" (possível cota excedida):`, e);
      }
    }
    this.memoryStore.set(key, value);
    return true;
  }

  removeItem(key) {
    if (this.isAvailable) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.warn(`[Store] Erro ao remover chave "${key}":`, e);
      }
    }
    this.memoryStore.delete(key);
  }
}

const storage = new SafeStorage();

class TripStore {
  constructor() {
    this.listeners = new Set();
    this.KEYS = {
      CHECKPOINTS: 'viagem_checkpoints_v3',
      PRE_VIAGEM: 'viagem_previagem_v3',
      FUEL: 'viagem_fuel_settings_v3',
      THEME: 'viagem_theme_v3'
    };
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(event, payload) {
    this.listeners.forEach((listener) => {
      try {
        listener(event, payload);
      } catch (err) {
        console.error('[Store] Erro em listener de evento:', err);
      }
    });
  }

  // --- CHECKPOINTS DOS MARCOS ---
  getCheckpoints() {
    const raw = storage.getItem(this.KEYS.CHECKPOINTS);
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch (e) {
      return {};
    }
  }

  toggleCheckpoint(id, checked, km = 0) {
    const state = this.getCheckpoints();
    if (checked) {
      const now = new Date();
      state[id] = {
        checked: true,
        time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        date: now.toLocaleDateString('pt-BR'),
        km: km
      };
    } else {
      delete state[id];
    }
    storage.setItem(this.KEYS.CHECKPOINTS, JSON.stringify(state));
    this.notify('checkpoints_updated', state);
    return state;
  }

  resetCheckpoints() {
    storage.setItem(this.KEYS.CHECKPOINTS, JSON.stringify({}));
    this.notify('checkpoints_updated', {});
  }

  // --- CHECKLIST PRÉ-VIAGEM (FOX) ---
  getPreViagem() {
    const raw = storage.getItem(this.KEYS.PRE_VIAGEM);
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch (e) {
      return {};
    }
  }

  togglePreViagem(id, checked) {
    const state = this.getPreViagem();
    if (checked) {
      state[id] = true;
    } else {
      delete state[id];
    }
    storage.setItem(this.KEYS.PRE_VIAGEM, JSON.stringify(state));
    this.notify('previagem_updated', state);
    return state;
  }

  resetPreViagem() {
    storage.setItem(this.KEYS.PRE_VIAGEM, JSON.stringify({}));
    this.notify('previagem_updated', {});
  }

  // --- CONFIGURAÇÕES DE COMBUSTÍVEL ---
  getFuelSettings() {
    const defaultSettings = {
      distance: 3080,
      consumption: 13.5,
      price: 6.35
    };
    const raw = storage.getItem(this.KEYS.FUEL);
    if (!raw) return defaultSettings;
    try {
      return { ...defaultSettings, ...JSON.parse(raw) };
    } catch (e) {
      return defaultSettings;
    }
  }

  setFuelSettings(settings) {
    const current = this.getFuelSettings();
    const updated = { ...current, ...settings };
    storage.setItem(this.KEYS.FUEL, JSON.stringify(updated));
    this.notify('fuel_updated', updated);
    return updated;
  }

  // --- TEMA (CLARO / ESCURO / AUTO) ---
  getTheme() {
    return storage.getItem(this.KEYS.THEME) || 'auto';
  }

  setTheme(theme) {
    storage.setItem(this.KEYS.THEME, theme);
    this.notify('theme_updated', theme);
    return theme;
  }
}

export const store = new TripStore();
