/**
 * js/app.js - Controlador Principal da Aplicação
 * Arquitetura modular, reativa e ergonomia veicular avançada (Road Copilot).
 */

import {
  TRIP_METRICS,
  CHECKPOINTS_DATA,
  PRE_VIAGEM_DATA,
  GPS_ROUTES,
  EMERGENCY_CONTACTS,
  FUEL_STOPS,
  HOTELS_DATA
} from './data.js';

import { store } from './store.js';
import { getSvgIcon, hydrateIcons } from './icons.js';

class TripApp {
  constructor() {
    this.currentFilter = 'all';
    this.deferredPrompt = null;
  }

  init() {
    this.initPwa();
    this.initTheme();
    this.initNetworkStatus();
    this.renderSummaryMetrics();
    this.renderCheckpoints();
    this.renderPreViagem();
    this.initFuelCalculator();
    this.renderFuelStops();
    this.renderHotels();
    this.renderEmergencyContacts();
    this.bindEvents();
    hydrateIcons();

    // Reatividade com a Store
    store.subscribe((event) => {
      if (event === 'checkpoints_updated') {
        this.renderCheckpoints();
      } else if (event === 'previagem_updated') {
        this.renderPreViagem();
      } else if (event === 'theme_updated') {
        this.applyTheme(store.getTheme());
      }
    });
  }

  // -------------------------------------------------------------
  // PWA & SERVICE WORKER
  // -------------------------------------------------------------
  initPwa() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => console.log('[PWA] Service Worker registrado:', reg.scope))
          .catch((err) => console.warn('[PWA] Falha no Service Worker:', err));
      });
    }

    const installBtn = document.getElementById('pwaInstallBtn');
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      if (installBtn) {
        installBtn.classList.remove('hidden');
        installBtn.classList.add('inline-flex');
      }
    });

    if (installBtn) {
      installBtn.addEventListener('click', async () => {
        if (!this.deferredPrompt) return;
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          installBtn.classList.add('hidden');
        }
        this.deferredPrompt = null;
      });
    }
  }

  // -------------------------------------------------------------
  // TEMA (MODO CLARO SOLAR / MODO ESCURO NOTURNO)
  // -------------------------------------------------------------
  initTheme() {
    const saved = store.getTheme();
    this.applyTheme(saved);

    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        const next = isDark ? 'light' : 'dark';
        store.setTheme(next);
      });
    }
  }

  applyTheme(theme) {
    let effectiveDark = false;

    if (theme === 'light') {
      effectiveDark = false;
    } else if (theme === 'dark') {
      effectiveDark = true;
    } else {
      // Automático: 06h às 18h Claro (contra reflexo do sol); 18h às 06h Escuro
      const hour = new Date().getHours();
      effectiveDark = !(hour >= 6 && hour < 18);
    }

    if (effectiveDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const container = document.getElementById('themeIconContainer');
    if (container) {
      container.innerHTML = getSvgIcon(effectiveDark ? 'sun' : 'moon', 'w-5 h-5');
    }
  }

  // -------------------------------------------------------------
  // REDE & STATUS OFFLINE
  // -------------------------------------------------------------
  initNetworkStatus() {
    const update = () => {
      const isOnline = navigator.onLine;
      const text = document.getElementById('offlineStatusText');
      const icon = document.getElementById('offlineIconContainer');

      if (!isOnline) {
        if (text) {
          text.innerText = 'Modo Offline Ativo';
          text.className = 'text-[11px] font-black text-amber-500';
        }
        if (icon) {
          icon.innerHTML = getSvgIcon('wifi-off', 'w-4 h-4 text-amber-500');
        }
      } else {
        if (text) {
          text.innerText = 'Online / Sincronizado';
          text.className = 'text-[11px] font-black text-emerald-700 dark:text-emerald-300';
        }
        if (icon) {
          icon.innerHTML = getSvgIcon('wifi', 'w-4 h-4 text-emerald-600 dark:text-emerald-400');
        }
      }
    };

    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    update();
  }

  // -------------------------------------------------------------
  // MÉTRICAS DO CABEÇALHO
  // -------------------------------------------------------------
  renderSummaryMetrics() {
    const el = document.getElementById('tripMetricsGrid');
    if (!el) return;

    el.innerHTML = `
      <div class="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 shadow-sm">
        <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          ${getSvgIcon('map-pin', 'w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400')} Distância
        </span>
        <p class="text-xl sm:text-2xl font-black mt-1 text-slate-900 dark:text-white">~${TRIP_METRICS.totalDistanceKm} km</p>
      </div>

      <div class="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 shadow-sm">
        <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          ${getSvgIcon('clock', 'w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400')} Duração
        </span>
        <p class="text-xl sm:text-2xl font-black mt-1 text-slate-900 dark:text-white">${TRIP_METRICS.estimatedDuration}</p>
      </div>

      <div class="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 shadow-sm">
        <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          ${getSvgIcon('car', 'w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400')} Veículo
        </span>
        <p class="text-xl sm:text-2xl font-black mt-1 text-slate-900 dark:text-white">Fox 1.6 (2017)</p>
      </div>

      <div class="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 shadow-sm">
        <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          ${getSvgIcon('bed-double', 'w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400')} Pernoites
        </span>
        <p class="text-xl sm:text-2xl font-black mt-1 text-emerald-700 dark:text-emerald-300">Formosa & PI</p>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // CHECKLIST DOS MARCOS COM ERGONOMIA VEICULAR (48PX TOUCH TARGETS)
  // -------------------------------------------------------------
  renderCheckpoints() {
    const container = document.getElementById('checkpointsList');
    if (!container) return;

    const state = store.getCheckpoints();
    container.innerHTML = '';

    let checkedCount = 0;
    let lastChecked = null;

    CHECKPOINTS_DATA.forEach((item, index) => {
      const record = state[item.id];
      const isChecked = !!(record && record.checked);
      if (isChecked) {
        checkedCount++;
        lastChecked = { item, record, index };
      }

      // Aplicação dos filtros rápidos
      if (this.currentFilter === 'dia1' && item.dayKey !== 'dia1') return;
      if (this.currentFilter === 'dia2' && item.dayKey !== 'dia2') return;
      if (this.currentFilter === 'dia3' && item.dayKey !== 'dia3') return;
      if (this.currentFilter === 'pending' && isChecked) return;

      const card = document.createElement('label');
      // Touch target ergonômico mínimo de 52px para uso com carro em movimento
      card.className = `flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer select-none min-h-[56px] active:scale-[0.99] ${
        isChecked
          ? 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500/50 text-slate-800 dark:text-slate-200'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200'
      }`;
      card.setAttribute('role', 'checkbox');
      card.setAttribute('aria-checked', isChecked ? 'true' : 'false');

      const timeTag = record && record.time
        ? `<span class="mt-2 inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 dark:text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-lg">
            ${getSvgIcon('check', 'w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400')} Passou às ${record.time} (${item.km} km)
          </span>`
        : '';

      card.innerHTML = `
        <div class="pt-0.5 min-w-[32px] flex items-center justify-center">
          <input
            type="checkbox"
            id="${item.id}"
            class="w-6 h-6 rounded-lg border-2 border-slate-400 dark:border-slate-600 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer shrink-0 transition"
            ${isChecked ? 'checked' : ''}
          />
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between gap-2">
            <span class="text-[11px] font-black ${isChecked ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'} uppercase tracking-wide">
              ${item.day} • Previsto: ${item.time} (~${item.km} km)
            </span>
            <span class="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
              #${index + 1}
            </span>
          </div>
          <h4 class="font-bold text-sm sm:text-base ${isChecked ? 'text-slate-900 dark:text-white line-through opacity-80' : 'text-slate-900 dark:text-white'} mt-0.5">
            ${item.title}
          </h4>
          <p class="text-xs ${isChecked ? 'text-emerald-800 dark:text-emerald-200/80' : 'text-slate-500 dark:text-slate-400'} mt-0.5 leading-relaxed">
            ${item.desc}
          </p>
          ${timeTag}
        </div>
      `;

      // Event listener no checkbox
      const input = card.querySelector('input');
      input.addEventListener('change', (e) => {
        store.toggleCheckpoint(item.id, e.target.checked, item.km);
      });

      container.appendChild(card);
    });

    // Atualização das estatísticas da barra de progresso
    const total = CHECKPOINTS_DATA.length;
    const percent = Math.round((checkedCount / total) * 100);
    const countEl = document.getElementById('checkpointCount');
    const percentEl = document.getElementById('checkpointPercent');
    const progressEl = document.getElementById('progressBar');

    if (countEl) countEl.innerText = `${checkedCount} de ${total}`;
    if (percentEl) percentEl.innerText = `${percent}%`;
    if (progressEl) progressEl.style.width = `${percent}%`;

    // Atualização do banner do último marco
    const lastBox = document.getElementById('lastCheckedBox');
    if (lastBox) {
      if (lastChecked) {
        lastBox.classList.remove('hidden');
        lastBox.classList.add('flex');
        const titleEl = document.getElementById('lastCheckedTitle');
        const timeEl = document.getElementById('lastCheckedTime');
        if (titleEl) titleEl.innerText = lastChecked.item.title;
        if (timeEl) {
          timeEl.innerText = lastChecked.record.time
            ? `Às ${lastChecked.record.time} (~${lastChecked.item.km} km)`
            : `~${lastChecked.item.km} km`;
        }
      } else {
        lastBox.classList.add('hidden');
        lastBox.classList.remove('flex');
      }
    }
  }

  // -------------------------------------------------------------
  // CHECKLIST PRÉ-VIAGEM (FOX 1.6 & MUDANÇA)
  // -------------------------------------------------------------
  renderPreViagem() {
    const container = document.getElementById('preViagemContainer');
    if (!container) return;

    const state = store.getPreViagem();
    container.innerHTML = '';

    let totalItems = 0;
    let checkedItems = 0;

    PRE_VIAGEM_DATA.forEach((cat) => {
      const card = document.createElement('div');
      card.className = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm';

      let itemsHtml = '';
      cat.items.forEach((item) => {
        totalItems++;
        const isChecked = !!state[item.id];
        if (isChecked) checkedItems++;

        itemsHtml += `
          <label class="flex items-start gap-3 text-xs text-slate-800 dark:text-slate-200 cursor-pointer select-none py-1.5 min-h-[44px] active:opacity-80">
            <input
              type="checkbox"
              id="${item.id}"
              class="w-5 h-5 mt-0.5 rounded border-2 border-slate-400 dark:border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
              ${isChecked ? 'checked' : ''}
              data-previagem="${item.id}"
            />
            <span class="${isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'font-medium'} leading-snug">
              ${item.text}
            </span>
          </label>
        `;
      });

      card.innerHTML = `
        <div>
          <div class="flex items-center gap-2 font-black text-slate-900 dark:text-white text-sm pb-2.5 mb-2 border-b border-slate-200 dark:border-slate-800">
            ${getSvgIcon(cat.icon, 'w-4 h-4 text-blue-500')}
            ${cat.category}
          </div>
          <div class="space-y-1">
            ${itemsHtml}
          </div>
        </div>
      `;

      card.querySelectorAll('input[data-previagem]').forEach((input) => {
        input.addEventListener('change', (e) => {
          store.togglePreViagem(e.target.dataset.previagem, e.target.checked);
        });
      });

      container.appendChild(card);
    });

    const countEl = document.getElementById('preViagemCount');
    if (countEl) {
      countEl.innerText = `${checkedItems} de ${totalItems} conferidos`;
    }
  }

  // -------------------------------------------------------------
  // CALCULADORA & AUTONOMIA DO TANQUE FOX 1.6
  // -------------------------------------------------------------
  initFuelCalculator() {
    const distInput = document.getElementById('distanceInput');
    const consInput = document.getElementById('consumptionInput');
    const priceInput = document.getElementById('fuelPriceInput');

    const settings = store.getFuelSettings();
    if (distInput) distInput.value = settings.distance;
    if (consInput) consInput.value = settings.consumption;
    if (priceInput) priceInput.value = settings.price;

    const update = () => {
      const distance = parseFloat(distInput?.value) || 0;
      const consumption = parseFloat(consInput?.value) || 1;
      const price = parseFloat(priceInput?.value) || 0;

      store.setFuelSettings({ distance, consumption, price });

      const liters = distance / consumption;
      const totalCost = liters * price;

      // Autonomia segura do Fox com margem de 1/4 (usando 37,5 L úteis de 50 L)
      const safeRange = Math.round(TRIP_METRICS.usableTankLiters * consumption);
      const stops = Math.ceil(distance / safeRange);

      const costEl = document.getElementById('costDisplay');
      const litersEl = document.getElementById('litersDisplay');
      const safeEl = document.getElementById('safeRangeDisplay');
      const stopsEl = document.getElementById('stopsCountDisplay');

      if (costEl) costEl.innerText = totalCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      if (litersEl) litersEl.innerText = `${liters.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} L`;
      if (safeEl) safeEl.innerText = `~${safeRange} km`;
      if (stopsEl) stopsEl.innerText = `~${stops} paradas`;
    };

    if (distInput) distInput.addEventListener('input', update);
    if (consInput) consInput.addEventListener('input', update);
    if (priceInput) priceInput.addEventListener('input', update);

    update();
  }

  // -------------------------------------------------------------
  // PARADAS DE ABASTECIMENTO SUGERIDAS
  // -------------------------------------------------------------
  renderFuelStops() {
    const container = document.getElementById('fuelStopsContainer');
    if (!container) return;

    container.innerHTML = FUEL_STOPS.map((stop) => `
      <div class="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
        <div>
          <strong class="text-slate-900 dark:text-white font-bold text-sm sm:text-base">${stop.id}. ${stop.city}</strong>
          <span class="text-slate-500 dark:text-slate-400 text-xs block sm:inline sm:ml-2">${stop.km} • ${stop.place}</span>
          <p class="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">${stop.tip}</p>
        </div>
        <span class="text-[11px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-extrabold px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-auto border border-emerald-500/20">
          ${stop.tag}
        </span>
      </div>
    `).join('');
  }

  // -------------------------------------------------------------
  // HOTÉIS NO GOOGLE MAPS
  // -------------------------------------------------------------
  renderHotels() {
    const container = document.getElementById('hotelsContainer');
    if (!container) return;

    container.innerHTML = HOTELS_DATA.map((section) => `
      <div class="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-blue-500"></span>
            <h3 class="text-lg font-black text-slate-900 dark:text-white">${section.city}</h3>
          </div>
          <span class="text-xs bg-blue-500/15 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-500/30 font-bold">
            ${section.badge}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${section.hotels.map((h) => `
            <div class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-600 transition">
              <div>
                <div class="flex justify-between items-start">
                  <h4 class="font-bold text-slate-900 dark:text-white text-base">${h.name}</h4>
                  <span class="text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700">${h.tag}</span>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  ${h.desc}
                </p>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=${h.mapsQuery}"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-4 min-h-[48px] inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition shadow active:scale-95"
              >
                ${getSvgIcon('navigation', 'w-4 h-4')} Abrir no Google Maps
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // -------------------------------------------------------------
  // CONTATOS DE EMERGÊNCIA (SOS)
  // -------------------------------------------------------------
  renderEmergencyContacts() {
    const container = document.getElementById('sosContactsGrid');
    if (!container) return;

    container.innerHTML = EMERGENCY_CONTACTS.map((c) => `
      <a
        href="${c.tel}"
        class="min-h-[56px] flex items-center justify-between p-3.5 rounded-2xl transition active:scale-95 ${
          c.primary
            ? 'bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 hover:bg-red-100 dark:hover:bg-red-950/70'
            : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
        }"
      >
        <div class="flex items-center gap-3">
          <span class="p-2.5 rounded-xl font-black text-xs text-white ${c.primary ? 'bg-red-600' : 'bg-slate-700'} min-w-[44px] text-center">
            ${c.number}
          </span>
          <div>
            <div class="font-extrabold text-sm text-slate-900 dark:text-white">${c.name}</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">${c.description}</div>
          </div>
        </div>
        ${getSvgIcon('phone', `w-5 h-5 shrink-0 ml-2 ${c.primary ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-400'}`)}
      </a>
    `).join('');
  }

  // -------------------------------------------------------------
  // COMPARTILHAMENTO VIA WHATSAPP (MENSAGEM DINÂMICA)
  // -------------------------------------------------------------
  shareWhatsApp() {
    const state = store.getCheckpoints();
    const total = CHECKPOINTS_DATA.length;
    let checkedCount = 0;
    let lastPointTitle = 'Guarujá (SP)';
    let lastPointTime = '';
    let maxKm = 0;

    CHECKPOINTS_DATA.forEach((item) => {
      if (state[item.id] && state[item.id].checked) {
        checkedCount++;
        lastPointTitle = item.title;
        lastPointTime = state[item.id].time ? ` (às ${state[item.id].time})` : '';
        if (item.km > maxKm) maxKm = item.km;
      }
    });

    const percent = Math.round((checkedCount / total) * 100);

    const message = `🚗 *Atualização da Viagem (Guarujá-SP ➔ Jaguaribe-CE)*\n\n` +
      `📍 *Último marco:* ${lastPointTitle}${lastPointTime}\n` +
      `🛣️ *Distância percorrida:* ~${maxKm} km de ~${TRIP_METRICS.totalDistanceKm} km\n` +
      `📊 *Progresso:* ${checkedCount} de ${total} marcos concluídos (${percent}%)\n` +
      `🚘 *Veículo:* Fox 1.6 carregado de mudança rodando com segurança!\n\n` +
      `Acompanhe nossa rota rumo ao Ceará! ✨`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  // -------------------------------------------------------------
  // EVENT LISTENERS & MODAL SOS
  // -------------------------------------------------------------
  bindEvents() {
    // Filtros de marcos
    document.querySelectorAll('[data-filter]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const filter = e.currentTarget.dataset.filter;
        this.currentFilter = filter;

        document.querySelectorAll('[data-filter]').forEach((b) => {
          b.classList.remove('bg-emerald-600', 'text-white');
          b.classList.add('bg-slate-100', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');
        });
        e.currentTarget.classList.remove('bg-slate-100', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');
        e.currentTarget.classList.add('bg-emerald-600', 'text-white');

        this.renderCheckpoints();
      });
    });

    // Compartilhar WhatsApp
    const shareBtn = document.getElementById('whatsappShareBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => this.shareWhatsApp());
    }

    // Reset de Marcos
    const resetCheckpointsBtn = document.getElementById('resetCheckpointsBtn');
    if (resetCheckpointsBtn) {
      resetCheckpointsBtn.addEventListener('click', () => {
        if (confirm('Tem certeza de que deseja reiniciar o checklist dos marcos da viagem?')) {
          store.resetCheckpoints();
        }
      });
    }

    // Reset Pré-Viagem
    const resetPreViagemBtn = document.getElementById('resetPreViagemBtn');
    if (resetPreViagemBtn) {
      resetPreViagemBtn.addEventListener('click', () => {
        if (confirm('Deseja limpar as conferências da inspeção do Fox?')) {
          store.resetPreViagem();
        }
      });
    }

    // Modal SOS
    const sosModal = document.getElementById('sosModal');
    const openSos = () => sosModal?.classList.remove('hidden');
    const closeSos = () => sosModal?.classList.add('hidden');

    document.querySelectorAll('[data-open-sos]').forEach((btn) => {
      btn.addEventListener('click', openSos);
    });
    document.querySelectorAll('[data-close-sos]').forEach((btn) => {
      btn.addEventListener('click', closeSos);
    });

    // Fechar SOS com tecla ESC ou clique fora
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSos();
    });
    sosModal?.addEventListener('click', (e) => {
      if (e.target === sosModal) closeSos();
    });
  }
}

// Inicialização segura no carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  const app = new TripApp();
  app.init();
});
