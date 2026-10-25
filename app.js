/* =====================================================================
 *  MOM'S BIRTHDAY COUNTDOWN & CELEBRATION ENGINE (26 OCTOBER)
 * ===================================================================== */
(() => {
  'use strict';

  const C = window.BIRTHDAY_CONFIG || {};
  const BIRTHDAY = Date.parse(C.birthday || '2026-10-26T00:00:00+08:00');
  const COUNT_START = Date.parse(C.countdownStart || '2026-10-25T00:00:00+08:00');

  const $ = (s, r = document) => r.querySelector(s);
  const el = (t, cls, txt) => {
    const n = document.createElement(t);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  };
  const pad = n => String(Math.max(0, Math.floor(n))).padStart(2, '0');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const fmtDur = ms => {
    const s = Math.max(0, Math.ceil(ms / 1000));
    const d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), r = s % 60;
    if (d > 0) return `${d}d ${h}h`;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${r}s`;
    return `${r}s`;
  };
  const fmtClock = sec => !isFinite(sec) || sec < 0 ? '0:00' : `${Math.floor(sec / 60)}:${pad(sec % 60)}`;

  /* ===================================================================
   *  CRISP 8-BIT PIXEL ART SVGS (Floral & Travel Boutique Theme)
   * =================================================================== */
  const PX_ICONS = {
    lock: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">
      <rect x="5" y="2" width="6" height="1" fill="#AD3B55"/>
      <rect x="4" y="3" width="2" height="4" fill="#AD3B55"/>
      <rect x="10" y="3" width="2" height="4" fill="#AD3B55"/>
      <rect x="3" y="7" width="10" height="7" fill="#E56B86"/>
      <rect x="4" y="8" width="8" height="5" fill="#F5C6D1"/>
      <rect x="7" y="9" width="2" height="3" fill="#4D2C3A"/>
    </svg>`,
    wordle: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">
      <rect x="2" y="2" width="3" height="3" fill="#5BA37E"/>
      <rect x="6" y="2" width="3" height="3" fill="#E0B24C"/>
      <rect x="10" y="2" width="4" height="3" fill="#5BA37E"/>
      <rect x="2" y="6" width="3" height="3" fill="#F5C6D1"/>
      <rect x="6" y="6" width="3" height="3" fill="#5BA37E"/>
      <rect x="10" y="6" width="4" height="3" fill="#E0B24C"/>
      <rect x="2" y="10" width="12" height="4" fill="#E56B86"/>
      <rect x="4" y="11" width="8" height="2" fill="#FFFFFF"/>
    </svg>`,
    puzzle: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">
      <rect x="3" y="3" width="6" height="2" fill="#E0B24C"/>
      <rect x="2" y="5" width="2" height="6" fill="#E0B24C"/>
      <rect x="8" y="5" width="2" height="6" fill="#E0B24C"/>
      <rect x="3" y="11" width="6" height="2" fill="#B5841E"/>
      <rect x="5" y="7" width="2" height="2" fill="#4D2C3A"/>
      <rect x="10" y="7" width="5" height="2" fill="#E0B24C"/>
      <rect x="13" y="9" width="2" height="3" fill="#B5841E"/>
    </svg>`,
    bouquet: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">
      <rect x="3" y="3" width="4" height="4" fill="#E56B86"/>
      <rect x="4" y="4" width="2" height="2" fill="#F6C85F"/>
      <rect x="9" y="2" width="4" height="4" fill="#F49BB0"/>
      <rect x="10" y="3" width="2" height="2" fill="#FFFFFF"/>
      <rect x="6" y="5" width="4" height="4" fill="#E0B24C"/>
      <rect x="7" y="6" width="2" height="2" fill="#FFFFFF"/>
      <rect x="5" y="9" width="6" height="3" fill="#5BA37E"/>
      <rect x="6" y="12" width="4" height="3" fill="#E56B86"/>
    </svg>`,
    travel: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">
      <rect x="7" y="1" width="2" height="13" fill="#E56B86"/>
      <rect x="2" y="6" width="12" height="2" fill="#E56B86"/>
      <rect x="4" y="5" width="8" height="1" fill="#F49BB0"/>
      <rect x="5" y="12" width="6" height="2" fill="#AD3B55"/>
      <rect x="7" y="3" width="2" height="2" fill="#FFFFFF"/>
    </svg>`,
    album: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">
      <rect x="2" y="4" width="12" height="10" fill="#4D2C3A"/>
      <rect x="5" y="2" width="6" height="2" fill="#4D2C3A"/>
      <rect x="3" y="5" width="10" height="8" fill="#FCEFF2"/>
      <rect x="6" y="7" width="4" height="4" fill="#E56B86"/>
      <rect x="7" y="8" width="2" height="2" fill="#FFFFFF"/>
      <rect x="11" y="6" width="1" height="1" fill="#E0B24C"/>
    </svg>`,
    heart: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">
      <rect x="3" y="3" width="4" height="2" fill="#E56B86"/>
      <rect x="9" y="3" width="4" height="2" fill="#E56B86"/>
      <rect x="2" y="5" width="12" height="4" fill="#E56B86"/>
      <rect x="3" y="9" width="10" height="2" fill="#E56B86"/>
      <rect x="5" y="11" width="6" height="2" fill="#E56B86"/>
      <rect x="7" y="13" width="2" height="1" fill="#E56B86"/>
      <rect x="4" y="5" width="2" height="1" fill="#FFFFFF"/>
    </svg>`,
  };

  /* Pixel Stickers for Photo Album Decorator */
  const STICKERS = {
    flower: `<svg viewBox="0 0 14 14" shape-rendering="crispEdges"><rect x="5" y="1" width="4" height="3" fill="#E56B86"/><rect x="5" y="10" width="4" height="3" fill="#E56B86"/><rect x="1" y="5" width="3" height="4" fill="#E56B86"/><rect x="10" y="5" width="3" height="4" fill="#E56B86"/><rect x="4" y="4" width="6" height="6" fill="#F49BB0"/><rect x="5" y="5" width="4" height="4" fill="#F6C85F"/></svg>`,
    heart: `<svg viewBox="0 0 13 12" shape-rendering="crispEdges"><rect x="2" y="1" width="3" height="1" fill="#E56B86"/><rect x="8" y="1" width="3" height="1" fill="#E56B86"/><rect x="1" y="2" width="5" height="1" fill="#E56B86"/><rect x="7" y="2" width="5" height="1" fill="#E56B86"/><rect x="1" y="3" width="11" height="3" fill="#E56B86"/><rect x="2" y="6" width="9" height="2" fill="#E56B86"/><rect x="3" y="8" width="7" height="1" fill="#E56B86"/><rect x="4" y="9" width="5" height="1" fill="#E56B86"/><rect x="5" y="10" width="3" height="1" fill="#E56B86"/><rect x="6" y="11" width="1" height="1" fill="#E56B86"/><rect x="2" y="3" width="2" height="1" fill="#FFFFFF"/></svg>`,
    plane: `<svg viewBox="0 0 14 14" shape-rendering="crispEdges"><rect x="6" y="1" width="2" height="11" fill="#5BA37E"/><rect x="2" y="5" width="10" height="2" fill="#5BA37E"/><rect x="4" y="10" width="6" height="2" fill="#3E7D5D"/></svg>`,
    sparkle: `<svg viewBox="0 0 13 13" shape-rendering="crispEdges"><rect x="6" y="0" width="1" height="13" fill="#E0B24C"/><rect x="0" y="6" width="13" height="1" fill="#E0B24C"/><rect x="4" y="4" width="5" height="5" fill="#FAF0D4"/><rect x="5" y="5" width="3" height="3" fill="#E0B24C"/></svg>`,
  };

  /* Pixel Stems for Bouquet Builder */
  function stemSvg(petalMain, petalLight, centerCol) {
    return `<svg viewBox="0 0 24 56" shape-rendering="crispEdges" aria-hidden="true">
      <rect x="11" y="20" width="2" height="36" fill="#5BA37E"/>
      <rect x="7" y="32" width="4" height="2" fill="#5BA37E"/>
      <rect x="13" y="28" width="4" height="2" fill="#3E7D5D"/>
      <rect x="8" y="4" width="8" height="3" fill="${petalMain}"/>
      <rect x="5" y="7" width="14" height="9" fill="${petalMain}"/>
      <rect x="8" y="16" width="8" height="4" fill="${petalMain}"/>
      <rect x="7" y="6" width="5" height="3" fill="${petalLight}"/>
      <rect x="9" y="9" width="6" height="5" fill="${centerCol}"/>
      <rect x="11" y="10" width="2" height="2" fill="#FFFFFF"/>
    </svg>`;
  }

  const FLOWER_TYPES = [
    { key: 'rose',      label: 'Rose',      main: '#E56B86', light: '#F8B4C4', center: '#F6C85F' },
    { key: 'tulip',     label: 'Tulip',     main: '#F28482', light: '#FBC3BC', center: '#FFF3B0' },
    { key: 'sunflower', label: 'Sunflower', main: '#E9B44C', light: '#F7D98C', center: '#6B4226' },
    { key: 'lavender',  label: 'Lavender',  main: '#9B7EDE', light: '#C8B6FF', center: '#FFF1D0' },
    { key: 'lily',      label: 'Lily',      main: '#F497AC', light: '#FFFFFF', center: '#E0B24C' },
  ];

  /* ===================================================================
   *  PERSISTENCE
   * =================================================================== */
  const STORE_KEY = 'mom_bday_2026_v1';
  const mem = {};
  const storage = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : (k in mem ? mem[k] : d); } catch { return k in mem ? mem[k] : d; } },
    set(k, v) { mem[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
    clear()   { delete mem[STORE_KEY]; try { localStorage.removeItem(STORE_KEY); } catch {} },
  };
  const state = Object.assign({ opened: [], score: 0, candlesOut: false, sfx: true, crackle: true }, storage.get(STORE_KEY, {}));
  const save = () => storage.set(STORE_KEY, state);

  /* ===================================================================
   *  TOASTS
   * =================================================================== */
  function toast(msg, ms = 3000) {
    const box = $('#toasts');
    const t = el('div', 'toast', msg);
    box.append(t);
    while (box.children.length > 3) box.firstChild.remove();
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 240); }, ms);
  }

  /* ===================================================================
   *  CLOCK SYNC
   * =================================================================== */
  const withTimeout = (p, ms) => {
    const ac = new AbortController();
    const id = setTimeout(() => ac.abort(), ms);
    return p(ac.signal).finally(() => clearTimeout(id));
  };

  const Time = {
    offset: 0,
    realOffset: 0,
    now() { return Date.now() + this.offset; },
    async sync() {
      const endpoints = [
        ['https://worldtimeapi.org/api/timezone/' + encodeURIComponent(C.timeZone || 'Asia/Singapore'),
          r => r.json().then(j => Date.parse(j.datetime))],
        ['https://timeapi.io/api/time/current/zone?timeZone=' + encodeURIComponent(C.timeZone || 'Asia/Singapore'),
          r => r.json().then(j => Date.parse(j.dateTime + '+08:00'))],
      ];
      for (const [url, parse] of endpoints) {
        try {
          const t0 = Date.now();
          const server = await withTimeout(sig => fetch(url, { signal: sig, cache: 'no-store' }).then(r => {
            if (!r.ok) throw new Error(r.status);
            return parse(r);
          }), 2800);
          if (Number.isFinite(server)) {
            this.realOffset = server - (t0 + Date.now()) / 2;
            if (!Tester.mode) this.offset = this.realOffset;
            return;
          }
        } catch { /* fallback */ }
      }
    },
  };

  /* ===================================================================
   *  WEB AUDIO + 3 BUILT-IN MUSIC BOX MELODIES + SOUND EFFECTS
   * =================================================================== */
  const AudioEngine = {
    ctx: null, master: null, music: null, analyser: null,
    ensure() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.music = this.ctx.createGain();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 256;
        this.analyser.smoothingTimeConstant = 0.78;
        this.music.connect(this.analyser);
        this.analyser.connect(this.master);
        this.master.connect(this.ctx.destination);
      }
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      return this.ctx;
    },
  };

  const tone = (freq, dur, { type = 'triangle', gain = 0.14, delay = 0, slide = null } = {}) => {
    if (!state.sfx) return;
    const ctx = AudioEngine.ensure();
    if (!ctx) return;
    const t = ctx.currentTime + delay;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(AudioEngine.master);
    o.start(t); o.stop(t + dur + 0.03);
  };

  const noise = (dur, { gain = 0.14, freq = 1400, q = 1.2, delay = 0 } = {}) => {
    if (!state.sfx) return;
    const ctx = AudioEngine.ensure();
    if (!ctx) return;
    const t = ctx.currentTime + delay;
    const buf = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * dur)), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain(); g.gain.value = gain;
    src.connect(f); f.connect(g); g.connect(AudioEngine.master);
    src.start(t);
  };

  const SFX = {
    click:    () => tone(660, 0.045, { type: 'triangle', gain: 0.07 }),
    key:      () => tone(520 + Math.random() * 80, 0.03, { type: 'triangle', gain: 0.04 }),
    deny:     () => { tone(240, 0.09, { type: 'square', gain: 0.07 }); tone(185, 0.13, { type: 'square', gain: 0.07, delay: 0.09 }); },
    unlock:   () => [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, 0.2, { gain: 0.11, delay: i * 0.065 })),
    bloom:    (i = 0) => {
      const notes = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
      tone(notes[i % notes.length], 0.18, { type: 'sine', gain: 0.11 });
    },
    stamp:    () => { noise(0.06, { gain: 0.14, freq: 650, q: 1.5 }); tone(320, 0.08, { type: 'triangle', gain: 0.09 }); },
    scratch:  () => { if (Math.random() < 0.35) noise(0.03, { gain: 0.04, freq: 2400, q: 2 }); },
    firework: () => {
      tone(340, 0.16, { type: 'sine', gain: 0.07, slide: 780 });
      noise(0.22, { gain: 0.14, freq: 1400, q: 0.9, delay: 0.1 });
      [784, 1046.5, 1318.5].forEach((f, i) => tone(f, 0.22, { type: 'triangle', gain: 0.07, delay: 0.11 + i * 0.04 }));
    },
    puff:     () => noise(0.18, { gain: 0.13, freq: 600, q: 0.7 }),
    fanfare:  () => {
      [[523.25, 0, .14], [659.25, .11, .14], [783.99, .22, .14], [1046.5, .34, .48], [783.99, .5, .14], [1046.5, .64, .65]]
        .forEach(([f, d, l]) => { tone(f, l, { gain: 0.13, delay: d }); tone(f / 2, l, { type: 'sine', gain: 0.08, delay: d }); });
    },
  };

  /* ===================================================================
   *  PROCEDURAL LO-FI CHILLHOP ENGINE (Rhodes Chords, Boom-Bap & Vinyl)
   * =================================================================== */
  const LOFI_STATIONS = {
    'lofi:flowers': {
      bpm: 74,
      chords: [
        [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9
        [164.81, 196.00, 246.94, 293.66, 392.00], // Em7
        [146.83, 174.61, 220.00, 261.63, 329.63], // Dm9
        [130.81, 164.81, 196.00, 246.94, 293.66], // Cmaj9
      ],
      bells: { 2: 523.25, 5: 659.25, 11: 587.33, 18: 523.25, 21: 440.00, 27: 493.88, 30: 392.00 },
    },
    'lofi:kdrama': {
      bpm: 68,
      chords: [
        [146.83, 185.00, 220.00, 277.18, 329.63], // Dmaj9
        [123.47, 146.83, 185.00, 220.00, 277.18], // Bm9
        [196.00, 246.94, 293.66, 369.99, 440.00], // Gmaj9
        [110.00, 146.83, 164.81, 196.00, 277.18], // A13sus4
      ],
      bells: { 3: 587.33, 6: 554.37, 12: 493.88, 19: 587.33, 22: 659.25, 28: 554.37 },
    },
    'lofi:travel': {
      bpm: 76,
      chords: [
        [116.54, 146.83, 174.61, 220.00, 261.63], // Bbmaj9
        [196.00, 233.08, 293.66, 349.23, 440.00], // Gm9
        [155.56, 196.00, 233.08, 293.66, 349.23], // Ebmaj9
        [174.61, 233.08, 261.63, 311.13, 392.00], // F11
      ],
      bells: { 1: 587.33, 5: 523.25, 10: 466.16, 17: 587.33, 21: 698.46, 26: 587.33, 29: 523.25 },
    },
    'lofi:birthday': {
      bpm: 72,
      chords: [
        [130.81, 164.81, 196.00, 246.94, 293.66], // Cmaj9
        [110.00, 130.81, 164.81, 196.00, 246.94], // Am9
        [146.83, 174.61, 220.00, 261.63, 329.63], // Dm9
        [196.00, 246.94, 293.66, 349.23, 440.00], // G13
      ],
      bells: {
        0: 392.00, 1: 392.00, 2: 440.00, 4: 392.00, 6: 523.25,
        8: 493.88, 12: 392.00, 13: 392.00, 14: 440.00, 16: 392.00,
        18: 587.33, 20: 523.25, 26: 659.25, 28: 523.25, 30: 587.33,
      },
    },
  };

  const LofiEngine = {
    stationKey: 'lofi:flowers',
    playing: false,
    bus: null,
    filter: null,
    noiseBuf: null,
    crackleSrc: null,
    crackleGain: null,
    timerId: 0,
    step: 0,
    nextStepTime: 0,
    startedAt: 0,
    elapsedOffset: 0,

    setup() {
      const ctx = AudioEngine.ensure();
      if (!ctx || this.bus) return ctx;
      this.filter = ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.value = 1380;
      this.filter.Q.value = 0.65;

      this.bus = ctx.createGain();
      this.bus.gain.value = 0.92;
      this.bus.connect(this.filter);
      this.filter.connect(AudioEngine.music);

      // Gentle tape flutter on the lowpass cutoff for warm cassette feel
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.value = 0.33;
      lfoGain.gain.value = 140;
      lfo.connect(lfoGain);
      lfoGain.connect(this.filter.frequency);
      lfo.start();

      // Reusable 2s white noise buffer for snare & hats
      const len = Math.floor(ctx.sampleRate * 2);
      this.noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      const nd = this.noiseBuf.getChannelData(0);
      for (let i = 0; i < len; i++) nd[i] = Math.random() * 2 - 1;

      return ctx;
    },

    startCrackle() {
      const ctx = this.setup();
      if (!ctx || this.crackleSrc) return;
      const len = Math.floor(ctx.sampleRate * 4);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < len; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.04 * white) / 1.04;
        const pop = Math.random() < 0.0007 ? (Math.random() * 0.55 - 0.27) : 0;
        d[i] = last * 0.18 + pop;
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;

      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 1850;
      bp.Q.value = 0.85;

      const g = ctx.createGain();
      g.gain.value = state.crackle ? 0.14 : 0.0001;

      src.connect(bp);
      bp.connect(g);
      g.connect(AudioEngine.music);
      src.start();
      this.crackleSrc = src;
      this.crackleGain = g;
    },

    stopCrackle() {
      if (this.crackleSrc) {
        try { this.crackleSrc.stop(); } catch {}
        this.crackleSrc.disconnect();
        this.crackleSrc = null;
        this.crackleGain = null;
      }
    },

    updateCrackle() {
      if (this.crackleGain && AudioEngine.ctx) {
        this.crackleGain.gain.setTargetAtTime(state.crackle ? 0.14 : 0.0001, AudioEngine.ctx.currentTime, 0.05);
      }
    },

    setStation(src) {
      this.stationKey = LOFI_STATIONS[src] ? src : 'lofi:flowers';
    },

    station() {
      return LOFI_STATIONS[this.stationKey] || LOFI_STATIONS['lofi:flowers'];
    },

    start() {
      const ctx = this.setup();
      if (!ctx) return;
      this.stop(true);
      this.playing = true;
      this.startedAt = ctx.currentTime;
      this.step = 0;
      this.nextStepTime = ctx.currentTime + 0.05;
      this.startCrackle();
      this.scheduler();
      this.timerId = setInterval(() => this.scheduler(), 75);
    },

    stop(keepElapsed = false) {
      if (this.playing && AudioEngine.ctx) {
        this.elapsedOffset += AudioEngine.ctx.currentTime - this.startedAt;
      }
      if (!keepElapsed) { /* preserve session timer on pause */ }
      this.playing = false;
      clearInterval(this.timerId);
      this.timerId = 0;
      this.stopCrackle();
    },

    resetTimer() {
      this.elapsedOffset = 0;
      if (AudioEngine.ctx) this.startedAt = AudioEngine.ctx.currentTime;
    },

    elapsed() {
      if (!this.playing || !AudioEngine.ctx) return this.elapsedOffset;
      return this.elapsedOffset + (AudioEngine.ctx.currentTime - this.startedAt);
    },

    scheduler() {
      if (!this.playing || !AudioEngine.ctx) return;
      const ctx = AudioEngine.ctx;
      const st = this.station();
      const eighth = (60 / st.bpm) / 2;

      while (this.nextStepTime < ctx.currentTime + 0.26) {
        const s = this.step % 32;
        const swingOffset = (s % 2 === 1) ? eighth * 0.17 : 0;
        const t = this.nextStepTime + swingOffset;
        const barIdx = Math.floor(s / 8) % st.chords.length;
        const barStep = s % 8;
        const chord = st.chords[barIdx];

        // Warm Rhodes chord at start of bar + soft ghost chord on step 5 of even bars
        if (barStep === 0) {
          this.playChord(chord, t, eighth * 7.6, 0.052);
          this.playBass(chord[0] / 2, t, eighth * 4.5, 0.14);
        } else if (barStep === 5 && barIdx % 2 === 1) {
          this.playChord(chord, t, eighth * 2.4, 0.026);
          this.playBass(chord[0] / 2, t, eighth * 2.2, 0.09);
        }

        // Boom-bap lo-fi kick
        if (barStep === 0 || (barStep === 5 && barIdx % 2 === 0) || (barStep === 3 && barIdx % 2 === 1)) {
          this.playKick(t, barStep === 0 ? 0.24 : 0.16);
        }

        // Soft brushed snare on beats 2 & 4
        if (barStep === 2 || barStep === 6) {
          this.playSnare(t);
        }

        // Swung dusty hi-hat
        this.playHat(t, (s % 2 === 0) ? 0.032 : 0.02);

        // Gentle Rhodes top bell note
        if (st.bells && st.bells[s]) {
          this.playBell(st.bells[s], t + 0.015, eighth * 3.2);
        }

        this.nextStepTime += eighth;
        this.step++;
      }
    },

    playChord(freqs, time, dur, gainPerNote) {
      const ctx = AudioEngine.ctx;
      freqs.forEach((f, idx) => {
        const t0 = time + idx * 0.032;
        for (const [type, detune, mul] of [['sine', 0, 1], ['triangle', -5, 0.35]]) {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = type;
          o.frequency.setValueAtTime(f, t0);
          o.detune.setValueAtTime(detune, t0);
          g.gain.setValueAtTime(0.0001, t0);
          g.gain.linearRampToValueAtTime(gainPerNote * mul, t0 + 0.035);
          g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
          o.connect(g);
          g.connect(this.bus);
          o.start(t0);
          o.stop(t0 + dur + 0.05);
        }
      });
    },

    playBass(freq, time, dur, peak) {
      const ctx = AudioEngine.ctx;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, time);
      g.gain.setValueAtTime(0.0001, time);
      g.gain.linearRampToValueAtTime(peak, time + 0.025);
      g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
      o.connect(g);
      g.connect(this.bus);
      o.start(time);
      o.stop(time + dur + 0.04);
    },

    playBell(freq, time, dur) {
      const ctx = AudioEngine.ctx;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, time);
      g.gain.setValueAtTime(0.0001, time);
      g.gain.linearRampToValueAtTime(0.048, time + 0.018);
      g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
      o.connect(g);
      g.connect(this.bus);
      o.start(time);
      o.stop(time + dur + 0.04);
    },

    playKick(time, peak) {
      const ctx = AudioEngine.ctx;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(122, time);
      o.frequency.exponentialRampToValueAtTime(42, time + 0.12);
      g.gain.setValueAtTime(0.0001, time);
      g.gain.linearRampToValueAtTime(peak, time + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, time + 0.22);
      o.connect(g);
      g.connect(this.bus);
      o.start(time);
      o.stop(time + 0.25);
    },

    playSnare(time) {
      const ctx = AudioEngine.ctx;
      // Soft body
      const o = ctx.createOscillator();
      const og = ctx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(180, time);
      o.frequency.exponentialRampToValueAtTime(110, time + 0.08);
      og.gain.setValueAtTime(0.08, time);
      og.gain.exponentialRampToValueAtTime(0.0001, time + 0.11);
      o.connect(og); og.connect(this.bus);
      o.start(time); o.stop(time + 0.13);

      // Brushed dust snap
      const src = ctx.createBufferSource();
      src.buffer = this.noiseBuf;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 1150;
      bp.Q.value = 0.9;
      const ng = ctx.createGain();
      ng.gain.setValueAtTime(0.09, time);
      ng.gain.exponentialRampToValueAtTime(0.0001, time + 0.13);
      src.connect(bp); bp.connect(ng); ng.connect(this.bus);
      src.start(time, Math.random() * 0.8, 0.15);
    },

    playHat(time, peak) {
      const ctx = AudioEngine.ctx;
      const src = ctx.createBufferSource();
      src.buffer = this.noiseBuf;
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 5800;
      const g = ctx.createGain();
      g.gain.setValueAtTime(peak, time);
      g.gain.exponentialRampToValueAtTime(0.0001, time + 0.042);
      src.connect(hp); hp.connect(g); g.connect(AudioEngine.music);
      src.start(time, Math.random() * 1.2, 0.05);
    },
  };

  /* ===================================================================
   *  LO-FI RADIO PLAYER
   * =================================================================== */
  const ICON_PLAY  = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
  const ICON_PAUSE = '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>';
  const isLofi = t => t && String(t.src || '').startsWith('lofi:');

  const Player = {
    tracks: [], i: 0, audio: new Audio(), playing: false, connected: false, vol: 0.8, seeking: false,
    init() {
      const list = (C.playlist && C.playlist.length) ? C.playlist : [
        { title: 'Flower Shop Rain', artist: 'lofi beats · 74 bpm', src: 'lofi:flowers' },
      ];
      this.tracks = list.map(t => ({ ...t }));
      this.audio.preload = 'metadata';
      this.audio.addEventListener('ended', () => this.next(true));

      $('#pPlay').addEventListener('click', () => this.toggle());
      $('#discBtn').addEventListener('click', () => this.toggle());
      $('#pNext').addEventListener('click', () => this.next(false));
      $('#pPrev').addEventListener('click', () => this.prev());
      $('#pMore').addEventListener('click', e => { e.stopPropagation(); $('#pPanel').hidden = !$('#pPanel').hidden; });
      document.addEventListener('click', e => { if (!$('#player').contains(e.target)) $('#pPanel').hidden = true; });
      const seek = $('#pSeek');
      seek.addEventListener('input', () => { this.seeking = true; });
      seek.addEventListener('change', () => { this.seekTo(seek.value / 1000); this.seeking = false; });
      $('#pVol').addEventListener('input', e => { this.vol = e.target.value / 100; this.applyVol(); });

      $('#pCrackle').checked = state.crackle !== false;
      $('#pCrackle').addEventListener('change', e => {
        state.crackle = e.target.checked;
        save();
        LofiEngine.updateCrackle();
      });

      $('#pSfx').checked = state.sfx;
      $('#pSfx').addEventListener('change', e => { state.sfx = e.target.checked; save(); });

      this.load(0);
      this.loop();
    },
    cur() { return this.tracks[this.i]; },
    load(i) {
      this.audio.pause();
      LofiEngine.stop();
      LofiEngine.resetTimer();
      this.playing = false;
      this.i = (i + this.tracks.length) % this.tracks.length;
      const t = this.cur();
      if (isLofi(t)) {
        LofiEngine.setStation(t.src);
        this.audio.removeAttribute('src');
        $('#pSeek').hidden = true;
        $('#lofiBar').hidden = false;
      } else {
        this.audio.src = t.src;
        $('#pSeek').hidden = false;
        $('#lofiBar').hidden = false;
      }
      $('#pTitle').textContent = t.title;
      $('#pArtist').textContent = t.artist || 'lofi radio';
      this.renderList(); this.ui();
    },
    applyVol() {
      if (AudioEngine.music) AudioEngine.music.gain.value = this.vol;
      this.audio.volume = this.connected ? 1 : this.vol;
    },
    play() {
      AudioEngine.ensure();
      this.applyVol();
      const t = this.cur();
      this.playing = true;
      if (isLofi(t)) {
        LofiEngine.setStation(t.src);
        LofiEngine.start();
      } else {
        this.audio.play().catch(() => { this.playing = false; this.ui(); });
      }
      this.ui();
    },
    pause() {
      this.playing = false;
      if (isLofi(this.cur())) LofiEngine.stop(true);
      else this.audio.pause();
      this.ui();
    },
    toggle() { this.playing ? this.pause() : this.play(); },
    next(auto) {
      const resume = this.playing || auto;
      this.load(this.i + 1);
      if (resume) this.play();
    },
    prev() {
      const resume = this.playing;
      this.load(this.i - 1);
      if (resume) this.play();
    },
    playIndex(i) {
      this.load(i);
      this.play();
    },
    pos() { return isLofi(this.cur()) ? LofiEngine.elapsed() : (this.audio.currentTime || 0); },
    dur() { return isLofi(this.cur()) ? 0 : (isFinite(this.audio.duration) ? this.audio.duration : 0); },
    seekTo(frac) {
      const d = this.dur();
      if (d) this.audio.currentTime = frac * d;
    },
    renderList() {
      const ol = $('#pTracks');
      ol.replaceChildren();
      this.tracks.forEach((t, idx) => {
        const li = el('li', idx === this.i ? 'active' : '');
        const b = el('button', 'p-track-btn', `${idx + 1}. ${t.title}`);
        b.type = 'button';
        b.addEventListener('click', () => this.playIndex(idx));
        li.append(b);
        ol.append(li);
      });
    },
    ui() {
      $('#pPlay').innerHTML = this.playing ? ICON_PAUSE : ICON_PLAY;
      $('#pPlay').setAttribute('aria-label', this.playing ? 'Pause' : 'Play');
      $('#discBtn').classList.toggle('spin', this.playing);
      $('#lofiDot').classList.toggle('on', this.playing);
    },
    loop() {
      const cv = $('#viz'), g = cv.getContext('2d'), data = new Uint8Array(128);
      let lastUi = 0;
      const draw = ts => {
        const dpr = Math.min(2, devicePixelRatio || 1), w = cv.clientWidth, h = cv.clientHeight;
        if (cv.width !== Math.round(w * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
        g.setTransform(dpr, 0, 0, dpr, 0, 0);
        g.clearRect(0, 0, w, h);
        const real = this.playing && AudioEngine.analyser && (isLofi(this.cur()) || this.connected);
        if (real) AudioEngine.analyser.getByteFrequencyData(data);
        const bars = Math.max(20, Math.floor(w / 10)), bw = w / bars;
        g.fillStyle = '#E56B86';
        for (let k = 0; k < bars; k++) {
          let v;
          if (real) v = data[Math.floor(k / bars * 64)] / 255;
          else if (this.playing) v = 0.2 + 0.18 * Math.abs(Math.sin(ts / 260 + k * 0.55));
          else v = 0.03;
          const bh = Math.max(2, Math.round((v * h) / 4) * 4);
          g.fillRect(Math.round(k * bw) + 1, h - bh, Math.max(2, Math.floor(bw) - 3), bh);
        }
        if (ts - lastUi > 250) {
          lastUi = ts;
          const p = this.pos(), d = this.dur();
          $('#pCur').textContent = fmtClock(p);
          if (!isLofi(this.cur()) && !this.seeking) $('#pSeek').value = d ? Math.round(p / d * 1000) : 0;
        }
        requestAnimationFrame(draw);
      };
      requestAnimationFrame(draw);
    },
  };

  /* ===================================================================
   *  PETAL CONFETTI & SPARKS
   * =================================================================== */
  const FX = {
    cv: null, g: null, parts: [], on: false,
    colors: ['#E56B86', '#F49BB0', '#5BA37E', '#E0B24C', '#F7D77E', '#C8B6FF'],
    init() {
      this.cv = $('#fx'); this.g = this.cv.getContext('2d');
      const resize = () => {
        const d = Math.min(2, devicePixelRatio || 1);
        this.cv.width = innerWidth * d; this.cv.height = innerHeight * d;
        this.g.setTransform(d, 0, 0, d, 0, 0);
      };
      resize(); addEventListener('resize', resize);
    },
    burst(x, y, o = {}) {
      const n = Math.round((o.count ?? 75) * (reduceMotion ? 0.3 : 1));
      for (let i = 0; i < n; i++) {
        const a = (o.angle ?? -Math.PI / 2) + (Math.random() - 0.5) * (o.spread ?? Math.PI * 2);
        const sp = (o.speed ?? 9) * (0.4 + Math.random() * 0.8);
        this.parts.push({
          x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
          size: o.spark ? 3 : 6 + Math.floor(Math.random() * 3) * 2,
          color: o.spark ? (Math.random() < 0.6 ? '#E0B24C' : '#E56B86') : this.colors[i % this.colors.length],
          shape: o.spark ? 'spark' : 'rect',
          life: 0, max: o.spark ? 22 + Math.random() * 14 : 150 + Math.random() * 80,
          grav: o.spark ? 0.15 : 0.19, drag: o.spark ? 0.9 : 0.985,
        });
      }
      if (!this.on) { this.on = true; requestAnimationFrame(() => this.step()); }
    },
    sparks(x, y) { this.burst(x, y, { count: 28, speed: 7.5, spark: true }); },
    cannons() {
      const fire = () => {
        this.burst(0, innerHeight * 0.85, { count: 80, angle: -Math.PI / 3, spread: 0.7, speed: 17 });
        this.burst(innerWidth, innerHeight * 0.85, { count: 80, angle: -2 * Math.PI / 3, spread: 0.7, speed: 17 });
      };
      fire(); setTimeout(fire, 340);
      setTimeout(() => this.burst(innerWidth / 2, innerHeight * 0.35, { count: 100, speed: 11 }), 700);
    },
    step() {
      const g = this.g;
      g.clearRect(0, 0, innerWidth, innerHeight);
      this.parts = this.parts.filter(p => p.life < p.max && p.y < innerHeight + 40);
      for (const p of this.parts) {
        p.life++;
        p.vx = p.vx * p.drag + (p.shape === 'spark' ? 0 : Math.sin(p.life * 0.12 + p.rot) * 0.12);
        p.vy = p.vy * p.drag + p.grav;
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        g.globalAlpha = 1 - Math.max(0, (p.life - p.max * 0.7) / (p.max * 0.3));
        g.fillStyle = p.color;
        if (p.shape === 'spark') {
          g.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
        } else {
          g.save(); g.translate(p.x, p.y); g.rotate(p.rot);
          g.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
          g.restore();
        }
      }
      g.globalAlpha = 1;
      if (this.parts.length) requestAnimationFrame(() => this.step());
      else { this.on = false; g.clearRect(0, 0, innerWidth, innerHeight); }
    },
  };
  const centerOf = node => { const r = node.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };

  /* ===================================================================
   *  OVERLAYS (Modal, Password Modal, Console, Lightbox)
   * =================================================================== */
  const OVERLAY_IDS = ['#modal', '#passModal', '#terminal', '#lightbox'];
  const Overlay = {
    open(id) { $(id).hidden = false; document.body.classList.add('no-scroll'); },
    close(id) {
      $(id).hidden = true;
      if (OVERLAY_IDS.every(s => $(s).hidden)) document.body.classList.remove('no-scroll');
    },
  };
  OVERLAY_IDS.forEach(id => {
    $(id).addEventListener('click', e => {
      if (e.target === $(id) || e.target.closest('[data-close]') || id === '#lightbox') Overlay.close(id);
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') OVERLAY_IDS.forEach(id => Overlay.close(id));
    if ((e.key === '`' || e.key === '~') && !['termIn', 'passInput'].includes(document.activeElement?.id) && document.activeElement?.tagName !== 'INPUT') {
      e.preventDefault(); Term.open();
    }
  });

  /* Smart multi-extension photo loader (.jpg -> .png -> .jpeg -> .webp -> floral placeholder) */
  function photoEl(src, alt) {
    const base = String(src || '').replace(/\.(jpg|jpeg|png|webp)$/i, '');
    const candidates = [src, `${base}.jpg`, `${base}.png`, `${base}.jpeg`, `${base}.webp`]
      .filter((v, idx, arr) => v && arr.indexOf(v) === idx);
    let attempt = 0;

    const img = el('img', 'ph-img');
    img.alt = alt || '';
    img.loading = 'lazy';
    img.src = candidates[0] || '';

    img.addEventListener('error', () => {
      attempt++;
      if (attempt < candidates.length) {
        img.src = candidates[attempt];
        return;
      }
      const shortName = base.split('/').pop() || 'photo';
      const box = el('div', 'ph-img ph-placeholder');
      box.innerHTML = `${PX_ICONS.bouquet}<span>add ${shortName}.jpg or .png into /photos</span>`;
      img.replaceWith(box);
    });
    return img;
  }

  function makePolaroidGrid(items, cls = 'album-grid', shouldOpenLightbox = () => true) {
    const grid = el('div', cls);
    const tilts = [-1.6, 1.9, -1.8, 2.1, -1.5, 1.7];
    (items || []).forEach((item, i) => {
      const fig = el('button', 'polaroid');
      fig.type = 'button';
      fig.style.setProperty('--r', tilts[i % tilts.length] + 'deg');
      fig.append(photoEl(item.photo, item.caption), el('figcaption', null, item.caption || ''));
      fig.addEventListener('click', () => {
        if (!shouldOpenLightbox()) return;
        $('#lbMedia').replaceChildren(photoEl(item.photo, item.caption));
        $('#lbCap').textContent = item.caption || '';
        Overlay.open('#lightbox');
      });
      grid.append(fig);
    });
    return grid;
  }

  /* ===================================================================
   *  6 INTERACTIVE ACTIVITY CARD BUILDERS
   * =================================================================== */
  let cleanupModalKey = null;

  const Cards = {
    head(card) {
      const h = el('div', 'card-head');
      if (card.dateText) h.append(el('span', 'date-pill', card.dateText));
      h.append(el('h3', 'card-title', card.title));
      if (card.subtitle) h.append(el('p', 'card-sub', card.subtitle));
      return h;
    },

    /* Card 1: Birthday Wordle (Answer: HAPPY) */
    wordle(card) {
      const w = el('div');
      w.append(this.head(card));

      const answer = String(card.answer || 'HAPPY').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 5) || 'HAPPY';
      const maxRows = 6;
      const box = el('div', 'interactive-box wordle-wrap');
      const board = el('div', 'wordle-board');
      const status = el('div', 'wordle-status', 'type or tap letters below!');
      const kb = el('div', 'wordle-kb');
      const replayBtn = el('button', 'btn btn-ghost', 'Play again');
      replayBtn.type = 'button';
      replayBtn.hidden = true;

      let rowIdx = 0, curGuess = '', gameOver = false;
      const keyNodes = {};
      const keyRank = { absent: 1, present: 2, correct: 3 };
      const keyState = {};
      const tiles = [];

      const buildBoard = () => {
        board.replaceChildren();
        tiles.length = 0;
        for (let r = 0; r < maxRows; r++) {
          const rowEl = el('div', 'wordle-row');
          const rowTiles = [];
          for (let c = 0; c < 5; c++) {
            const t = el('div', 'wordle-tile');
            rowEl.append(t);
            rowTiles.push(t);
          }
          tiles.push(rowTiles);
          board.append(rowEl);
        }
      };

      const KB_ROWS = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'],
      ];

      const buildKb = () => {
        kb.replaceChildren();
        Object.keys(keyNodes).forEach(k => delete keyNodes[k]);
        Object.keys(keyState).forEach(k => delete keyState[k]);
        KB_ROWS.forEach(r => {
          const rEl = el('div', 'kb-row');
          r.forEach(k => {
            const btn = el('button', 'kb-key' + (k.length > 1 ? ' wide' : ''), k === 'DEL' ? '⌫' : k);
            btn.type = 'button';
            btn.addEventListener('click', () => handleKey(k));
            keyNodes[k] = btn;
            rEl.append(btn);
          });
          kb.append(rEl);
        });
      };

      const renderCurrentRow = () => {
        if (rowIdx >= maxRows) return;
        for (let c = 0; c < 5; c++) {
          const ch = curGuess[c] || '';
          const t = tiles[rowIdx][c];
          t.textContent = ch;
          t.classList.toggle('filled', Boolean(ch));
        }
      };

      const evaluateGuess = guess => {
        const res = Array(5).fill('absent');
        const counts = {};
        for (let i = 0; i < 5; i++) {
          const a = answer[i];
          counts[a] = (counts[a] || 0) + 1;
        }
        for (let i = 0; i < 5; i++) {
          if (guess[i] === answer[i]) {
            res[i] = 'correct';
            counts[guess[i]]--;
          }
        }
        for (let i = 0; i < 5; i++) {
          if (res[i] === 'correct') continue;
          const ch = guess[i];
          if (counts[ch] > 0) {
            res[i] = 'present';
            counts[ch]--;
          }
        }
        return res;
      };

      const submitGuess = () => {
        if (curGuess.length < 5) {
          status.textContent = 'enter 5 letters first!';
          SFX.deny();
          return;
        }
        const guess = curGuess;
        const result = evaluateGuess(guess);
        const r = rowIdx;
        result.forEach((st, c) => {
          const tile = tiles[r][c];
          setTimeout(() => {
            tile.classList.add('flip', st);
            SFX.bloom(c);
          }, c * 95);
          const ch = guess[c];
          if ((keyRank[st] || 0) > (keyRank[keyState[ch]] || 0)) {
            keyState[ch] = st;
            if (keyNodes[ch]) {
              keyNodes[ch].classList.remove('absent', 'present', 'correct');
              keyNodes[ch].classList.add(st);
            }
          }
        });

        rowIdx++;
        curGuess = '';

        setTimeout(() => {
          if (guess === answer) {
            gameOver = true;
            status.textContent = card.winMessage || `yay!! you got ${answer}!!`;
            replayBtn.hidden = false;
            SFX.fanfare();
            FX.burst(...centerOf(board), { count: 95, speed: 10 });
          } else if (rowIdx >= maxRows) {
            gameOver = true;
            status.textContent = `so close!! the word was ${answer} :)`;
            replayBtn.hidden = false;
          } else {
            status.textContent = `guess ${rowIdx + 1} of ${maxRows}`;
          }
        }, 520);
      };

      const handleKey = k => {
        if (gameOver) return;
        if (k === 'ENTER') {
          submitGuess();
        } else if (k === 'DEL' || k === 'BACKSPACE') {
          if (curGuess.length > 0) {
            curGuess = curGuess.slice(0, -1);
            SFX.key();
            renderCurrentRow();
          }
        } else if (/^[A-Z]$/.test(k) && curGuess.length < 5) {
          curGuess += k;
          SFX.key();
          renderCurrentRow();
        }
      };

      const onWindowKey = e => {
        if ($('#modal').hidden || !board.isConnected) return;
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const k = e.key.toUpperCase();
        if (k === 'ENTER' || k === 'BACKSPACE' || /^[A-Z]$/.test(k)) {
          e.preventDefault();
          handleKey(k);
        }
      };
      window.addEventListener('keydown', onWindowKey);
      cleanupModalKey = () => window.removeEventListener('keydown', onWindowKey);

      replayBtn.addEventListener('click', () => {
        rowIdx = 0; curGuess = ''; gameOver = false;
        status.textContent = 'type or tap letters below!';
        replayBtn.hidden = true;
        buildBoard();
        buildKb();
        SFX.click();
      });

      buildBoard();
      buildKb();
      box.append(board, status, kb, replayBtn);
      w.append(box);
      return w;
    },

    /* Card 2: Unlock "BIRTHDAY" Acrostic Crossword Puzzle */
    birthdayPuzzle(card) {
      const w = el('div');
      w.append(this.head(card));

      const clues = card.clues || [];
      const target = String(card.targetWord || 'BIRTHDAY').toUpperCase();
      const box = el('div', 'interactive-box');

      const lockBar = el('div', 'lock-bar');
      const slots = [...target].map(() => {
        const s = el('div', 'lock-slot', '?');
        lockBar.append(s);
        return s;
      });

      const status = el('div', 'wordle-status', 'each solved row unlocks 1 golden letter above!');
      status.style.marginBottom = '.75rem';

      const list = el('div', 'clue-list');
      const solved = Array(clues.length).fill(false);
      const rowInputs = [];

      const checkAllDone = () => {
        if (solved.every(Boolean)) {
          status.textContent = card.winMessage || `${target} unlocked!!`;
          SFX.fanfare();
          FX.burst(...centerOf(lockBar), { count: 100, speed: 11 });
        }
      };

      clues.forEach((item, rIdx) => {
        const ans = String(item.answer || '').toUpperCase().replace(/[^A-Z]/g, '');
        const rowEl = el('div', 'clue-row');
        const head = el('div', 'clue-head');
        head.append(el('span', 'clue-text', `${rIdx + 1}. ${item.clue}`));

        const hintBtn = el('button', 'clue-hint', 'Hint');
        hintBtn.type = 'button';
        head.append(hintBtn);

        const cells = el('div', 'clue-cells');
        const inputs = [];

        const evaluateRow = () => {
          if (solved[rIdx]) return;
          const typed = inputs.map(inp => inp.value.toUpperCase()).join('');
          if (typed === ans) {
            solved[rIdx] = true;
            rowEl.classList.add('solved');
            inputs.forEach(inp => { inp.readOnly = true; });
            if (slots[rIdx]) {
              slots[rIdx].textContent = ans[0];
              slots[rIdx].classList.add('unlocked');
            }
            SFX.unlock();
            FX.sparks(...centerOf(slots[rIdx] || rowEl));
            const nextUnsolved = solved.findIndex(v => !v);
            if (nextUnsolved >= 0 && rowInputs[nextUnsolved]?.[0]) {
              rowInputs[nextUnsolved][0].focus();
            }
            checkAllDone();
          }
        };

        for (let c = 0; c < ans.length; c++) {
          const inp = el('input', 'clue-input' + (c === 0 ? ' first-cell' : ''));
          inp.type = 'text';
          inp.maxLength = 1;
          inp.autocomplete = 'off';
          inp.spellcheck = false;
          inp.setAttribute('aria-label', `Clue ${rIdx + 1} letter ${c + 1}`);

          inp.addEventListener('input', () => {
            const clean = inp.value.replace(/[^a-zA-Z]/g, '').slice(-1).toUpperCase();
            inp.value = clean;
            if (clean) {
              SFX.key();
              if (c + 1 < inputs.length) inputs[c + 1].focus();
              evaluateRow();
            }
          });

          inp.addEventListener('keydown', e => {
            if (e.key === 'Backspace' && !inp.value && c > 0 && !solved[rIdx]) {
              e.preventDefault();
              inputs[c - 1].value = '';
              inputs[c - 1].focus();
            } else if (e.key === 'ArrowRight' && c + 1 < inputs.length) {
              inputs[c + 1].focus();
            } else if (e.key === 'ArrowLeft' && c > 0) {
              inputs[c - 1].focus();
            }
          });

          inputs.push(inp);
          cells.append(inp);
        }

        hintBtn.addEventListener('click', () => {
          if (solved[rIdx]) return;
          for (let c = 0; c < ans.length; c++) {
            if (inputs[c].value.toUpperCase() !== ans[c]) {
              inputs[c].value = ans[c];
              SFX.bloom(c);
              if (c + 1 < inputs.length) inputs[c + 1].focus();
              break;
            }
          }
          evaluateRow();
        });

        rowInputs.push(inputs);
        rowEl.append(head, cells);
        list.append(rowEl);
      });

      box.append(lockBar, status, list);
      w.append(box);
      return w;
    },

    /* Card 3: Build Your Flower Bouquet */
    bouquet(card) {
      const w = el('div');
      w.append(this.head(card));

      const box = el('div', 'interactive-box');
      const stage = el('div', 'bouquet-stage');
      const vaseCanvas = el('div', 'vase-canvas');
      const vaseBox = el('div', 'vase-box');
      stage.append(vaseCanvas, vaseBox);

      const picker = el('div', 'flower-picker');
      const noteEl = el('div', 'bouquet-note', 'pick flowers below to fill the vase!');
      const notes = card.flowerNotes || ['fresh blooms for mom!!'];

      const SLOTS = [
        [-2, 0], [-22, -16], [22, 16], [-40, -28], [40, 28],
        [-12, -8], [12, 8], [-30, -22], [30, 22], [-48, -34], [48, 34],
      ];
      let count = 0;

      const addStem = fl => {
        if (count >= SLOTS.length) {
          vaseCanvas.firstChild?.remove();
        }
        const [tx, ang] = SLOTS[count % SLOTS.length];
        const stem = el('div', 'stem-item');
        stem.style.setProperty('--tx', tx + 'px');
        stem.style.setProperty('--ang', ang + 'deg');
        stem.innerHTML = stemSvg(fl.main, fl.light, fl.center);
        vaseCanvas.append(stem);
        SFX.bloom(count);
        FX.sparks(...centerOf(stage));
        noteEl.textContent = notes[count % notes.length];
        count++;
      };

      FLOWER_TYPES.forEach(fl => {
        const b = el('button', 'flower-btn-pick');
        b.type = 'button';
        b.innerHTML = `${PX_ICONS.bouquet}<span>+ ${fl.label}</span>`;
        b.addEventListener('click', () => addStem(fl));
        picker.append(b);
      });

      const actions = el('div', 'card-actions');
      actions.style.justifyContent = 'center';
      const bowBtn = el('button', 'btn btn-primary', 'Tie golden ribbon!');
      bowBtn.type = 'button';
      bowBtn.addEventListener('click', () => {
        if (!vaseCanvas.children.length) addStem(FLOWER_TYPES[0]);
        vaseBox.replaceChildren(el('span', 'vase-ribbon', 'FOR MOM ♥'));
        noteEl.textContent = 'bouquet wrapped & ready for mom!!';
        SFX.fanfare();
        FX.burst(...centerOf(stage), { count: 80, speed: 9.5 });
      });

      const clearBtn = el('button', 'btn btn-ghost', 'Fresh vase');
      clearBtn.type = 'button';
      clearBtn.addEventListener('click', () => {
        count = 0;
        vaseCanvas.replaceChildren();
        vaseBox.replaceChildren();
        noteEl.textContent = 'pick flowers below to fill the vase!';
        SFX.click();
      });
      actions.append(bowBtn, clearBtn);

      box.append(stage, picker, noteEl, actions);
      w.append(box);
      return w;
    },

    /* Card 4: Passport Stamper + Rose-Gold Scratch-Off Pass */
    travelScratch(card) {
      const w = el('div');
      w.append(this.head(card));

      const box = el('div', 'interactive-box');
      box.append(el('p', 'interactive-prompt', 'tap places below to stamp your birthday passport!'));

      const passport = el('div', 'passport-box');
      const stampGrid = el('div', 'stamp-grid');
      const emptyHint = el('span', 'tiny muted', 'no stamps yet, tap a city below!');
      stampGrid.append(emptyHint);
      passport.append(stampGrid);

      const chips = el('div', 'dest-chips');
      const colors = ['#AD3B55', '#3E7D5D', '#B5841E', '#7A4E9D'];
      (card.destinations || ['Seoul', 'Jeju', 'Kyoto', 'Paris']).forEach((place, i) => {
        const c = el('button', 'dest-chip', place);
        c.type = 'button';
        c.addEventListener('click', () => {
          if (c.classList.contains('stamped')) return;
          c.classList.add('stamped');
          emptyHint.remove();
          const st = el('span', 'passport-stamp', `✈ ${place.toUpperCase()} · APPROVED`);
          st.style.setProperty('--stamp-c', colors[i % colors.length]);
          st.style.setProperty('--sr', ((i % 2 ? 1 : -1) * (2 + (i % 4))) + 'deg');
          stampGrid.append(st);
          SFX.stamp();
          FX.sparks(...centerOf(st));
        });
        chips.append(c);
      });

      const prompt2 = el('p', 'interactive-prompt', card.scratchPrompt || 'rub / drag across the rose-gold foil below!');
      const wrap = el('div', 'scratch-wrap');
      wrap.append(el('div', 'scratch-secret', card.scratchSecret || 'good for: more family trips + kdrama marathons + fresh flowers!!'));
      const cv = el('canvas', 'scratch-canvas');
      wrap.append(cv);

      const foot = el('div', 'scratch-foot');
      const pctLbl = el('span', null, 'scratched: 0%');
      const resetBtn = el('button', 'dest-chip', 'Reset foil');
      resetBtn.type = 'button';
      foot.append(pctLbl, resetBtn);

      let done = false, down = false;
      const paintFoil = () => {
        done = false;
        cv.classList.remove('cleared');
        pctLbl.textContent = 'scratched: 0%';
        const rw = Math.max(240, wrap.clientWidth || 320);
        const rh = Math.max(115, wrap.clientHeight || 120);
        cv.width = rw; cv.height = rh;
        const g = cv.getContext('2d');
        g.globalCompositeOperation = 'source-over';
        const step = 12;
        for (let y = 0; y < rh; y += step) {
          for (let x = 0; x < rw; x += step) {
            g.fillStyle = ((x / step + y / step) % 2 === 0) ? '#E56B86' : '#E996A8';
            g.fillRect(x, y, step, step);
          }
        }
        g.fillStyle = '#FFFFFF';
        g.font = 'bold 13px Silkscreen, monospace';
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.fillText('SCRATCH HERE !!', rw / 2, rh / 2);
      };

      const rub = (clientX, clientY) => {
        if (done) return;
        const r = cv.getBoundingClientRect();
        const x = (clientX - r.left) * (cv.width / r.width);
        const y = (clientY - r.top) * (cv.height / r.height);
        const g = cv.getContext('2d');
        g.globalCompositeOperation = 'destination-out';
        g.fillRect(Math.floor(x / 10) * 10 - 14, Math.floor(y / 10) * 10 - 14, 28, 28);
        SFX.scratch();

        const data = g.getImageData(0, 0, cv.width, cv.height).data;
        let clear = 0, total = 0;
        for (let i = 3; i < data.length; i += 64) {
          total++;
          if (data[i] < 64) clear++;
        }
        const pct = Math.min(100, Math.round(clear / Math.max(1, total) * 100));
        pctLbl.textContent = `scratched: ${pct}%`;
        if (pct >= 48) {
          done = true;
          cv.classList.add('cleared');
          pctLbl.textContent = 'revealed!! :)';
          SFX.unlock();
          FX.burst(...centerOf(wrap), { count: 70, speed: 9 });
        }
      };

      cv.addEventListener('pointerdown', e => { down = true; cv.setPointerCapture(e.pointerId); rub(e.clientX, e.clientY); });
      cv.addEventListener('pointermove', e => { if (down) rub(e.clientX, e.clientY); });
      cv.addEventListener('pointerup', () => { down = false; });
      cv.addEventListener('pointercancel', () => { down = false; });
      resetBtn.addEventListener('click', () => { SFX.click(); paintFoil(); });

      requestAnimationFrame(() => requestAnimationFrame(paintFoil));
      box.append(passport, chips, prompt2, wrap, foot);
      w.append(box);
      return w;
    },

    /* Card 5: Photo Album + Pixel Sticker Decorator */
    album(card) {
      const w = el('div');
      w.append(this.head(card));

      let activeSticker = null;
      const bar = el('div', 'deco-bar');
      const zoomBtn = el('button', 'deco-chip active', 'Zoom photos');
      zoomBtn.type = 'button';

      const stickerBtns = [];
      const setTool = key => {
        activeSticker = key;
        zoomBtn.classList.toggle('active', !key);
        stickerBtns.forEach(b => b.node.classList.toggle('active', b.key === key));
        board.classList.toggle('stamp-mode', Boolean(key));
      };

      zoomBtn.addEventListener('click', () => { SFX.click(); setTool(null); });
      bar.append(zoomBtn);

      [
        ['flower', 'Flower'],
        ['heart', 'Heart'],
        ['plane', 'Plane'],
        ['sparkle', 'Sparkle'],
      ].forEach(([key, label]) => {
        const b = el('button', 'deco-chip');
        b.type = 'button';
        b.innerHTML = STICKERS[key] + `<span>${label}</span>`;
        b.addEventListener('click', () => { SFX.click(); setTool(key); });
        stickerBtns.push({ key, node: b });
        bar.append(b);
      });

      const clearBtn = el('button', 'deco-chip', 'Clear');
      clearBtn.type = 'button';

      const board = el('div', 'album-board');
      const grid = makePolaroidGrid(card.photos || C.photos || [], 'album-grid', () => !activeSticker);
      board.append(grid);

      board.addEventListener('click', e => {
        if (!activeSticker) return;
        const r = board.getBoundingClientRect();
        const s = el('span', 'album-sticker');
        s.innerHTML = STICKERS[activeSticker];
        s.style.left = (e.clientX - r.left) + 'px';
        s.style.top = (e.clientY - r.top) + 'px';
        board.append(s);
        SFX.bloom(stickerBtns.findIndex(x => x.key === activeSticker));
      });

      clearBtn.addEventListener('click', () => {
        SFX.click();
        board.querySelectorAll('.album-sticker').forEach(n => n.remove());
      });
      bar.append(clearBtn);

      w.append(bar, board);
      if (card.note) w.append(el('p', 'card-note', card.note));
      return w;
    },

    /* Card 6: Birthday Message + Night-Sky Firework Launcher */
    fireworks(card) {
      const w = el('div');
      w.append(this.head(card));
      if (card.message) w.append(el('div', 'note-card', card.message));

      const box = el('div', 'interactive-box');
      box.append(el('p', 'interactive-prompt', card.fireworkPrompt || 'tap inside the night sky to launch fireworks!!'));

      const padBox = el('div', 'sky-pad');
      const lbl = el('span', 'sky-pad-label', 'tap anywhere to launch!!');
      padBox.append(lbl);

      let count = 0;
      padBox.addEventListener('click', e => {
        count++;
        lbl.textContent = `fireworks launched: ${count} !!`;
        SFX.firework();
        FX.burst(e.clientX, e.clientY, { count: 75, speed: 10 });
      });

      const actions = el('div', 'card-actions');
      actions.style.justifyContent = 'center';
      const bigBtn = el('button', 'btn btn-primary', 'Launch mega burst!!');
      bigBtn.type = 'button';
      bigBtn.addEventListener('click', () => {
        SFX.fanfare();
        FX.cannons();
      });
      actions.append(bigBtn);

      if (Time.now() >= BIRTHDAY || Tester.mode === 'birthday') {
        const cakeBtn = el('button', 'btn btn-ghost', 'Go to cake');
        cakeBtn.type = 'button';
        cakeBtn.addEventListener('click', () => {
          Overlay.close('#modal');
          setTimeout(() => $('#cake').scrollIntoView({ behavior: 'smooth', block: 'center' }), 180);
        });
        actions.append(cakeBtn);
      }

      box.append(padBox, actions);
      w.append(box);
      return w;
    },
  };

  function openCard(card) {
    if (cleanupModalKey) { cleanupModalKey(); cleanupModalKey = null; }
    const box = $('#modalBox');
    box.classList.toggle('is-wide', card.type === 'album' || card.type === 'birthdayPuzzle');
    const builder = Cards[card.type] || Cards.fireworks;
    $('#modalBody').replaceChildren(builder.call(Cards, card));
    Overlay.open('#modal');
  }

  /* ===================================================================
   *  TESTER OVERRIDE SYSTEM (Top-Right Key Icon + Password)
   * =================================================================== */
  const Tester = {
    unlocked: false,
    mode: null,
    checkPassword(raw) {
      const expected = String(C.testPassword || '').trim();
      return String(raw || '').trim() === expected;
    },
    areAllCardsUnlocked() {
      return this.unlocked && (this.mode === 'cards' || this.mode === 'birthday');
    },
    activate() {
      this.unlocked = true;
      $('#keyBtn').classList.add('unlocked');
      $('#testerBar').hidden = false;
      document.body.classList.add('tester-open');
      SFX.unlock();
      this.setMode('cards');
    },
    updateButtons() {
      $('#tstCards').classList.toggle('active', this.mode === 'cards');
      $('#tstBday').classList.toggle('active', this.mode === 'birthday');
      $('#tstMidnight').classList.toggle('active', this.mode === 'midnight');
    },
    setMode(mode) {
      this.mode = mode;
      this.updateButtons();
      if (mode === 'cards') {
        Time.offset = Time.realOffset;
        phase = null;
        Advent.invalidate();
        tick();
        toast('All 6 activity cards unlocked!');
      } else if (mode === 'birthday') {
        Time.offset = BIRTHDAY + 2000 - Date.now();
        if (phase === 'birthday') phase = 'leadup';
        Advent.invalidate();
        tick();
        toast('Jumped to 26 Oct birthday mode!');
      } else if (mode === 'midnight') {
        state.candlesOut = false;
        if (Cake.built) Cake.relight(true);
        $('#aftermath').hidden = true;
        Time.offset = BIRTHDAY - 5200 - Date.now();
        phase = null;
        Advent.invalidate();
        tick();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        toast('5 seconds to midnight!');
      }
    },
    resetAndLock() {
      this.unlocked = false;
      this.mode = null;
      this.updateButtons();
      $('#testerBar').hidden = true;
      $('#keyBtn').classList.remove('unlocked');
      document.body.classList.remove('tester-open');

      storage.clear();
      state.opened = [];
      state.score = 0;
      state.candlesOut = false;
      $('#score').hidden = true;
      $('#aftermath').hidden = true;
      $('#envelope').classList.remove('open');
      $('#envHint').hidden = false;
      $('#letter').hidden = true;
      if (Cake.built) Cake.relight(true);

      Time.offset = Time.realOffset;
      phase = null;
      Advent.invalidate();
      tick();
      SFX.click();
      toast('Locked and reset to live clock.');
    },
  };

  /* ===================================================================
   *  ACTIVITY CARDS GRID
   * =================================================================== */
  const Advent = {
    nodes: [],
    render(now) {
      const root = $('#advent');
      root.replaceChildren();
      this.nodes = (C.advent || []).map(card => {
        const unlock = Date.parse(card.unlock);
        const tile = el('div', 'tile');
        const btn = el('button', 'tile-btn'); btn.type = 'button';

        const front = el('div', 'tile-face tile-front');
        const fTop = el('div', 'tile-top');
        fTop.append(el('span', 'tile-day', card.dateText || `Part ${card.day}`));
        const fTag = el('span', 'tile-tag');
        fTop.append(fTag);
        const fArt = el('div', 'tile-art');
        const fFoot = el('div');
        const fTitle = el('div', 'tile-title');
        const fEta = el('div', 'tile-eta');
        fFoot.append(fTitle, fEta);
        front.append(fTop, fArt, fFoot);

        const back = el('div', 'tile-face tile-back');
        const bTop = el('div', 'tile-top');
        bTop.append(el('span', 'tile-day', card.dateText || `Part ${card.day}`), el('span', 'tile-tag', 'opened'));
        const bArt = el('div', 'tile-art');
        bArt.innerHTML = PX_ICONS[card.iconKey] || PX_ICONS.bouquet;
        const bFoot = el('div');
        bFoot.append(el('div', 'tile-title', card.title), el('div', 'tile-eta', 'tap to play again'));
        back.append(bTop, bArt, bFoot);

        btn.append(front, back);
        tile.append(btn);
        root.append(tile);

        const rec = { card, unlock, tile, btn, fTag, fArt, fTitle, fEta, lastState: '' };
        btn.addEventListener('click', () => this.activate(rec));
        this.paint(rec, now);
        return rec;
      });
    },
    invalidate() {
      for (const r of this.nodes) r.lastState = '';
    },
    paint(r, now) {
      const unlocked = Tester.areAllCardsUnlocked() || now >= BIRTHDAY || now >= r.unlock;
      const opened = unlocked && state.opened.includes(r.card.day);
      const key = `${unlocked ? 1 : 0}:${opened ? 1 : 0}`;
      if (key !== r.lastState) {
        r.lastState = key;
        r.tile.classList.toggle('locked', !unlocked);
        r.tile.classList.toggle('opened', opened);
        r.fTag.textContent = unlocked ? 'open!' : 'locked';
        r.fTitle.textContent = unlocked ? r.card.title : 'Midnight surprise';
        r.fArt.innerHTML = unlocked ? (PX_ICONS[r.card.iconKey] || PX_ICONS.bouquet) : PX_ICONS.lock;
      }
      if (!unlocked) r.fEta.textContent = `in ${fmtDur(r.unlock - now)}`;
      else if (!opened) r.fEta.textContent = 'tap to open';
    },
    update(now) { for (const r of this.nodes) this.paint(r, now); },
    activate(r) {
      const now = Time.now();
      const unlocked = Tester.areAllCardsUnlocked() || now >= BIRTHDAY || now >= r.unlock;
      if (!unlocked) {
        SFX.deny();
        r.tile.classList.remove('shake'); void r.tile.offsetWidth; r.tile.classList.add('shake');
        toast(`Unlocks at midnight! (${fmtDur(r.unlock - now)} left)`);
        return;
      }
      if (!state.opened.includes(r.card.day)) {
        state.opened.push(r.card.day); save();
        r.tile.classList.add('opened');
        r.lastState = '1:1';
        SFX.unlock();
        FX.burst(...centerOf(r.tile), { count: 46, speed: 8 });
        setTimeout(() => openCard(r.card), 340);
      } else {
        SFX.click();
        openCard(r.card);
      }
    },
  };

  /* ===================================================================
   *  BIRTHDAY CAKE, MICROPHONE CANDLE BLOWOUT, LETTER & SCRAPBOOK
   * =================================================================== */
  const Cake = {
    built: false, candles: [], stream: null, raf: 0,
    build() {
      if (this.built) return;
      this.built = true;
      const host = $('#candles');
      const count = C.candles || 7;
      for (let i = 0; i < count; i++) {
        const c = el('div', 'candle');
        c.append(el('span', 'flame'), el('span', 'smoke'));
        c.addEventListener('click', () => this.snuffOne(c));
        host.append(c);
        this.candles.push(c);
      }
      $('#cakeHint').textContent = C.cake?.hint || 'make a wish and blow out the candles!';
      $('#micBtn').addEventListener('click', () => this.listen());
      $('#tapBtn').addEventListener('click', () => this.blowAll());
      $('#relightBtn').addEventListener('click', () => this.relight(false));
      if (!navigator.mediaDevices?.getUserMedia) $('#micBtn').hidden = true;
      if (state.candlesOut) {
        this.candles.forEach(c => c.classList.add('out'));
        $('#cakeHint').textContent = C.cake?.done || '';
        $('#relightBtn').hidden = false; $('#tapBtn').hidden = true; $('#micBtn').hidden = true;
      }
    },
    snuffOne(c) {
      if (c.classList.contains('out')) return;
      c.classList.add('out'); SFX.puff();
      if (this.candles.every(x => x.classList.contains('out'))) this.finish();
    },
    blowAll() {
      const lit = this.candles.filter(c => !c.classList.contains('out'));
      if (!lit.length) return;
      lit.slice().sort(() => Math.random() - 0.5).forEach((c, i) => setTimeout(() => this.snuffOne(c), i * 85));
    },
    async listen() {
      try {
        const ctx = AudioEngine.ensure();
        this.stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
        });
        const src = ctx.createMediaStreamSource(this.stream);
        const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520;
        const an = ctx.createAnalyser(); an.fftSize = 512;
        src.connect(lp); lp.connect(an);
        const buf = new Uint8Array(an.fftSize);
        $('#micMeter').hidden = false;
        $('#micBtn').textContent = 'Listening... blow!'; $('#micBtn').disabled = true;
        let charge = 0;
        const step = () => {
          an.getByteTimeDomainData(buf);
          let sum = 0;
          for (let i = 0; i < buf.length; i++) { const v = (buf[i] - 128) / 128; sum += v * v; }
          const rms = Math.sqrt(sum / buf.length);
          $('#micFill').style.width = clamp(rms * 380, 0, 100) + '%';
          if (rms > 0.085) {
            charge++;
            if (charge % 4 === 0) {
              const lit = this.candles.filter(c => !c.classList.contains('out'));
              if (lit.length) this.snuffOne(lit[Math.random() * lit.length | 0]);
            }
          } else charge = Math.max(0, charge - 0.4);
          if (this.candles.some(c => !c.classList.contains('out'))) this.raf = requestAnimationFrame(step);
          else this.stopMic();
        };
        this.raf = requestAnimationFrame(step);
      } catch {
        $('#micBtn').hidden = true;
        toast('Mic blocked, use "Tap to blow out" instead!');
      }
    },
    stopMic() {
      cancelAnimationFrame(this.raf);
      if (this.stream) { this.stream.getTracks().forEach(t => t.stop()); this.stream = null; }
      $('#micMeter').hidden = true;
      $('#micBtn').disabled = false; $('#micBtn').textContent = 'Blow into mic';
    },
    finish() {
      this.stopMic();
      state.candlesOut = true; save();
      $('#cakeHint').textContent = C.cake?.done || 'happy birthday mom!!';
      $('#relightBtn').hidden = false; $('#tapBtn').hidden = true; $('#micBtn').hidden = true;
      SFX.fanfare(); FX.cannons();
      showAftermath(true);
    },
    relight(silent) {
      this.stopMic();
      this.candles.forEach(c => c.classList.remove('out'));
      state.candlesOut = false; save();
      $('#relightBtn').hidden = true; $('#tapBtn').hidden = false;
      if (navigator.mediaDevices?.getUserMedia) $('#micBtn').hidden = false;
      $('#cakeHint').textContent = C.cake?.hint || '';
      if (!silent) SFX.unlock();
    },
  };

  let aftermathBuilt = false;
  function showAftermath(scroll) {
    const sec = $('#aftermath');
    sec.hidden = false;
    if (!aftermathBuilt) {
      aftermathBuilt = true;
      const L = C.letter || {};
      const paper = $('#letter');
      if (L.greeting) paper.append(el('h4', null, L.greeting));
      String(L.body || '').split(/\n\n+/).filter(Boolean).forEach(p => paper.append(el('p', null, p)));
      if (L.signoff) paper.append(el('div', 'sig', L.signoff));
      $('#envelope').addEventListener('click', () => {
        const env = $('#envelope');
        if (env.classList.contains('open')) return;
        env.classList.add('open'); SFX.unlock();
        $('#envHint').hidden = true;
        setTimeout(() => { paper.hidden = false; FX.sparks(...centerOf(env)); }, 420);
      });
      $('#scrapbook').append(makePolaroidGrid(C.photos || [], 'scrapbook'));
    }
    if (scroll) setTimeout(() => sec.scrollIntoView({ behavior: 'smooth', block: 'start' }), 550);
  }

  /* ===================================================================
   *  SECRET CONSOLE ([>_] Button + ` Key)
   * =================================================================== */
  const ASCII_CAKE = [
    '        i   i   i   i',
    '       |~| |~| |~| |~|',
    '     __|_|_|_|_|_|_|_|__',
    '    |~~~~~~~~~~~~~~~~~~~|',
    '    |   HAPPY BDAY MOM  |',
    '   _|___________________|_',
    '  |~~~~~~~~~~~~~~~~~~~~~~~|',
    '  |    26 . 10 . 1982     |',
    '  |_______________________|',
  ].join('\n');

  const T = C.terminal || {};
  const Term = {
    hist: [], hi: 0, booted: false,
    open() {
      Overlay.open('#terminal');
      if (!this.booted) {
        this.booted = true;
        this.print('hi mom!! secret console unlocked :)\ntype "help" to see what you can try!\n', 'ok');
      }
      setTimeout(() => $('#termIn').focus(), 60);
    },
    print(text, cls) { const out = $('#termOut'); out.append(el('div', cls, text)); out.scrollTop = out.scrollHeight; },
    run(raw) {
      const cmd = raw.trim();
      this.print('> ' + cmd, 'cmd');
      if (!cmd) return;
      this.hist.push(cmd); this.hi = this.hist.length;
      const [name, ...args] = cmd.split(/\s+/);
      const fn = this.cmds[name.toLowerCase()];
      if (!fn) { this.print(`hmm unknown command: ${name} (try "help")`, 'err'); return; }
      const r = fn.call(this, args);
      if (r) Array.isArray(r) ? this.print(r[0], r[1]) : this.print(r);
    },
    cmds: {
      help: () => [
        'commands you can try:',
        '  whoami      about mom',
        '  countdown   time till 26 oct',
        '  flowers     birthday bouquet',
        '  kdrama      tonight checklist',
        '  travel      next trip pass',
        '  wordle      open birthday wordle',
        '  photos      open photo album',
        '  wish        birthday note',
        '  cake        jump to birthday cake',
        '  lofi        play / pause lofi radio',
        '  clear       clear console',
        '  exit        close console',
      ].join('\n'),
      whoami: () => T.whoami || C.name,
      countdown: () => {
        const d = BIRTHDAY - Time.now();
        return d > 0 ? `${fmtDur(d)} left till mom's birthday!!` : ['HAPPY BIRTHDAY MOM!!', 'ok'];
      },
      flowers: () => [T.flowers || 'fresh blooms for mom!!', 'ok'],
      kdrama: () => T.kdrama || 'kdrama marathon time!!',
      travel: () => T.travel || 'next trip loading!!',
      wordle: () => {
        const card = C.advent.find(a => a.type === 'wordle');
        setTimeout(() => { Overlay.close('#terminal'); if (card) openCard(card); }, 220);
        return ['opening birthday wordle...', 'ok'];
      },
      photos: () => {
        const card = C.advent.find(a => a.type === 'album');
        setTimeout(() => { Overlay.close('#terminal'); if (card) openCard(card); }, 220);
        return ['opening photo album...', 'ok'];
      },
      wish: () => [T.wish || 'happy birthday mom!! love, josiah', 'ok'],
      cake: function () {
        if (Time.now() < BIRTHDAY && Tester.mode !== 'birthday') return ['wait till midnight 26 oct for the cake!!', 'err'];
        setTimeout(() => { Overlay.close('#terminal'); $('#cake').scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 350);
        return [ASCII_CAKE, 'ok'];
      },
      lofi: () => { Player.toggle(); return Player.playing ? `lofi radio on: ${Player.cur().title}` : 'lofi radio paused'; },
      music: () => { Player.toggle(); return Player.playing ? `lofi radio on: ${Player.cur().title}` : 'lofi radio paused'; },
      unlock: function (args) {
        if (args.length && Tester.checkPassword(args.join(' '))) {
          Tester.activate();
          setTimeout(() => Overlay.close('#terminal'), 400);
          return ['preview unlocked!! check the top bar.', 'ok'];
        }
        return ['password needed!', 'err'];
      },
      sudo: () => 'mom always has admin permissions in this house :)',
      hbd: () => [ASCII_CAKE, 'ok'],
      clear: () => { $('#termOut').replaceChildren(); },
      exit: () => { Overlay.close('#terminal'); },
    },
  };
  $('#termBtn').addEventListener('click', () => Term.open());
  $('#termForm').addEventListener('submit', e => { e.preventDefault(); const i = $('#termIn'); Term.run(i.value); i.value = ''; });
  $('#termIn').addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && Term.hi > 0) { Term.hi--; e.target.value = Term.hist[Term.hi]; e.preventDefault(); }
    else if (e.key === 'ArrowDown') { Term.hi = Math.min(Term.hist.length, Term.hi + 1); e.target.value = Term.hist[Term.hi] || ''; e.preventDefault(); }
    else if (e.key.length === 1) SFX.key();
  });

  /* ===================================================================
   *  DOUBLE-TAP SCOREBOARD PETALS + FOOTER FLOWER CHARM + PASSWORD MODAL
   * =================================================================== */
  let lastTap = 0;
  $('#digits').addEventListener('pointerup', e => {
    const now = performance.now();
    if (now - lastTap < 330) { lastTap = 0; sendFlower(e.clientX, e.clientY); } else lastTap = now;
  });

  function sendFlower(x, y) {
    SFX.bloom(state.score);
    FX.sparks(x, y);
    const pop = el('div', 'petal-pop');
    pop.style.left = x + 'px'; pop.style.top = y + 'px';
    pop.innerHTML = STICKERS.flower;
    document.body.append(pop); setTimeout(() => pop.remove(), 760);
    state.score++; save();
    showScore(true);
    $('#lampR').classList.add('flash'); setTimeout(() => $('#lampR').classList.remove('flash'), 350);
    const cheers = C.petalCheers || ['love u mom!!'];
    toast(cheers[(state.score - 1) % cheers.length]);
  }

  function showScore(bump) {
    if (!state.score) return;
    const s = $('#score'); s.hidden = false; $('#scoreVal').textContent = state.score;
    if (bump) { s.classList.remove('bump'); void s.offsetWidth; s.classList.add('bump'); }
  }

  $('#flowerBtn').addEventListener('click', e => {
    const btn = $('#flowerBtn');
    btn.classList.remove('bloom'); void btn.offsetWidth; btn.classList.add('bloom');
    const r = btn.getBoundingClientRect();
    sendFlower(r.left + r.width / 2, r.top);
  });

  $('#keyBtn').addEventListener('click', () => {
    SFX.click();
    if (Tester.unlocked) {
      $('#testerBar').hidden = !$('#testerBar').hidden;
      document.body.classList.toggle('tester-open', !$('#testerBar').hidden);
      return;
    }
    $('#passInput').value = '';
    $('#passErr').hidden = true;
    Overlay.open('#passModal');
    setTimeout(() => $('#passInput').focus(), 60);
  });

  $('#passForm').addEventListener('submit', e => {
    e.preventDefault();
    if (Tester.checkPassword($('#passInput').value)) {
      Overlay.close('#passModal');
      Tester.activate();
    } else {
      $('#passErr').hidden = false;
      SFX.deny();
      const box = $('#passModal .modal');
      box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake');
    }
  });

  $('#tstCards').addEventListener('click', () => { SFX.click(); Tester.setMode('cards'); });
  $('#tstBday').addEventListener('click', () => { SFX.click(); Tester.setMode('birthday'); });
  $('#tstMidnight').addEventListener('click', () => { SFX.click(); Tester.setMode('midnight'); });
  $('#tstExit').addEventListener('click', () => Tester.resetAndLock());

  /* ===================================================================
   *  MAIN COUNTDOWN CLOCK (Targets 26 October 00:00!)
   * =================================================================== */
  const D = { d: $('#dd'), h: $('#hh'), m: $('#mm'), s: $('#ss') };
  let phase = null, gateDone = false;

  function setNum(node, v) {
    if (node.textContent === v) return;
    node.textContent = v;
    node.classList.remove('tick'); void node.offsetWidth; node.classList.add('tick');
  }

  function enterLeadup() {
    document.body.classList.remove('is-birthday');
    $('#celebration').hidden = true;
    $('#lampL').classList.add('on'); $('#lampR').classList.remove('on');
    $('#hudTitle').textContent = C.countdownTitle || "Countdown to mom's birthday";
  }

  function enterBirthday(live) {
    document.body.classList.add('is-birthday');
    $('#celebration').hidden = false;
    $('#lampL').classList.remove('on'); $('#lampR').classList.add('on');
    $('#hudTitle').textContent = C.birthdayTitle || 'Happy birthday mom!!';
    Object.values(D).forEach(n => setNum(n, '00'));
    $('#progress').style.width = '100%';
    Cake.build();
    if (state.candlesOut) showAftermath(false);
    if (live && gateDone) celebrate();
  }

  function celebrate() {
    SFX.fanfare();
    FX.cannons();
    if (C.autoplayMusic && state.sfx && !Player.playing) {
      Player.playIndex(0);
    }
    setTimeout(() => $('#celebration').scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
  }

  function tick() {
    const now = Time.now(), diff = BIRTHDAY - now;
    const next = diff <= 0 ? 'birthday' : 'leadup';
    if (next !== phase) {
      const prev = phase; phase = next;
      if (phase === 'birthday') enterBirthday(prev === 'leadup'); else enterLeadup();
    }
    if (phase === 'leadup') {
      const s = Math.floor(diff / 1000);
      setNum(D.d, pad(s / 86400));
      setNum(D.h, pad(s % 86400 / 3600));
      setNum(D.m, pad(s % 3600 / 60));
      setNum(D.s, pad(s % 60));
      const pct = clamp((now - COUNT_START) / Math.max(1, BIRTHDAY - COUNT_START), 0, 1) * 100;
      $('#progress').style.width = pct.toFixed(2) + '%';
    }
    Advent.update(now);
  }

  function closeGate(withSound) {
    state.sfx = withSound; save();
    $('#pSfx').checked = withSound;
    if (withSound) AudioEngine.ensure();
    $('#gate').hidden = true;
    gateDone = true;
    if (phase === 'birthday') celebrate();
    else if (withSound && C.autoplayMusic) Player.play();
  }

  async function boot() {
    document.querySelectorAll('[data-name]').forEach(n => { n.textContent = C.name || 'Mom'; });
    $('#ageBadge').textContent = String(C.cakeBadge || '♥');
    $('#fromName').textContent = C.signoffLine || 'love, josiah';
    FX.init();
    Player.init();
    showScore(false);

    $('#gateSound').addEventListener('click', () => closeGate(true));
    $('#gateMute').addEventListener('click', () => closeGate(false));

    Advent.render(Time.now());
    tick();
    setInterval(tick, 250);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });

    await Time.sync();
    Advent.invalidate();
    tick();
  }

  boot();
})();
