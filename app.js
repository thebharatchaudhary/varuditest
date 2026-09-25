/**
 * Varudi Enterprise - VARUDI Protective Covers & Tarpaulins
 * Comprehensive Interactive Web Application Logic
 * 
 * Features:
 * 1. Multi-Language Switcher (English, Gujarati, Hindi) with localStorage persistence
 * 2. Mobile Drawer Navigation & Touch Interaction
 * 3. Tarpaulin Size Scanner (8 Standard Sizes) with Dynamic Multi-Language Specs
 * 4. Farm Pond (Khet Talavadi) Live Engineering Dimension & Weight Calculator
 * 5. "Get Quote" Modal System with Auto-Population
 * 6. Direct WhatsApp Structured Inquiry Generator (Multi-Language aware)
 * 7. Form Submission Handlers & Toast Notification System
 * 8. Active Scrollspy for Navigation Links
 */

// Global State
const APP_CONFIG = {
  factoryPhone: "918128278542",
  factoryPhone2: "919712858529",
  currentLanguage: "gu", // Default to Gujarati as requested for local farm / APMC audience
  currentSelectedSize: "6 × 9",
  currentSelectedArea: "54",
  currentSelectedUse: "Small grain pile, motorcycle/engine cover, household waterproofing",
  currentSelectedWeight: "~1.1 kg (180 GSM)"
};

// Tarpaulin 8 Standard Sizes Metadata (Multi-lingual support for scanner)
const TARP_SIZES = [
  {
    index: 1,
    size: "6 × 9",
    area: "54",
    use: {
      en: "Small grain pile, motorcycle/engine cover, household waterproofing",
      gu: "નાના અનાજના ઢગલા, બાઇક/એન્જિન કવર, ઘર વપરાશ વોટરપ્રૂફિંગ",
      hi: "छोटे अनाज के ढेर, बाइक/इंजन कवर, घरेलू वाटरप्रूफिंग"
    },
    weight: {
      en: "~1.1 kg (180 GSM)",
      gu: "~૧.૧ કિગ્રા (180 GSM)",
      hi: "~1.1 किग्रा (180 GSM)"
    }
  },
  {
    index: 2,
    size: "9 × 12",
    area: "108",
    use: {
      en: "Small tractor trolley, firewood stack, mini tempo luggage",
      gu: "નાની ટ્રેક્ટર ટ્રોલી, લાકડાં-ઘાસ ઢાંકવા, મિની ટેમ્પો માલસામાન",
      hi: "छोटी ट्रैक्टर ट्रॉली, लकड़ी-चारा ढकने, मिनी टेम्पो सामान"
    },
    weight: {
      en: "~2.2 kg (180 GSM)",
      gu: "~૨.૨ કિગ્રા (180 GSM)",
      hi: "~2.2 किग्रा (180 GSM)"
    }
  },
  {
    index: 3,
    size: "12 × 15",
    area: "180",
    use: {
      en: "Crop drying floor, tractor hood, agricultural machinery cover",
      gu: "પાક સુકવણી પાથરણું, ટ્રેક્ટર હૂડ, ખેતી મશીનરી સુરક્ષા કવર",
      hi: "फसल सुखाने हेतु फर्श, ट्रैक्टर हूड, कृषि मशीनरी सुरक्षा"
    },
    weight: {
      en: "~3.6 kg (200 GSM)",
      gu: "~૩.૬ કિગ્રા (200 GSM)",
      hi: "~3.6 किग्रा (200 GSM)"
    }
  },
  {
    index: 4,
    size: "15 × 20",
    area: "300",
    use: {
      en: "Standard grain bag stack, 14-ft truck body, farm yard protection",
      gu: "અનાજની બોરીઓનો મોટો ઢગલો, ૧૪ ફૂટ ટ્રક ડાલો, વાડા સુરક્ષા",
      hi: "अनाज की बोरियों का ढेर, 14-फीट ट्रक डाला, बाड़ा सुरक्षा"
    },
    weight: {
      en: "~6.5 kg (200 GSM)",
      gu: "~૬.૫ કિગ્રા (200 GSM)",
      hi: "~6.5 किग्रा (200 GSM)"
    }
  },
  {
    index: 5,
    size: "18 × 24",
    area: "432",
    use: {
      en: "Large agricultural trolley, open goods carrier, construction shed",
      gu: "મોટી કૃષિ ટ્રોલી, ખુલ્લું માલવાહક વાહન, બાંધકામ શેડ રક્ષણ",
      hi: "बड़ी कृषि ट्रॉली, खुला मालवाहक वाहन, निर्माण शेड सुरक्षा"
    },
    weight: {
      en: "~10.8 kg (250 GSM)",
      gu: "~૧૦.૮ કિગ્રા (250 GSM)",
      hi: "~10.8 किग्रा (250 GSM)"
    }
  },
  {
    index: 6,
    size: "20 × 30",
    area: "600",
    use: {
      en: "Commercial warehouse stock, multi-ton harvest storage, godown pile",
      gu: "કોમર્શિયલ ગોડાઉન સ્ટોક, ટનબદ્ધ ઉપજ સંગ્રહ, માર્કેટ યાર્ડ ઢગલા",
      hi: "कमर्शियल वेयरहाउस स्टॉक, टन-भर उपज भंडारण, मंडी सुरक्षा"
    },
    weight: {
      en: "~15.0 kg (250 GSM)",
      gu: "~૧૫.૦ કિગ્રા (250 GSM)",
      hi: "~15.0 किग्रा (250 GSM)"
    }
  },
  {
    index: 7,
    size: "30 × 30",
    area: "900",
    use: {
      en: "Large square silage bunker, APMC yard wholesale shelter, hay mound",
      gu: "વિશાળ સાઇલેજ બંકર, APMC યાર્ડ જથ્થાબંધ શેડ, મોટો ઘાસચારો",
      hi: "बड़ा साइलेज बंकर, APMC यार्ड थोक शेड, बड़ा चारा ढेर"
    },
    weight: {
      en: "~25.0 kg (300 GSM)",
      gu: "~૨૫.૦ કિગ્રા (300 GSM)",
      hi: "~25.0 किग्रा (300 GSM)"
    }
  },
  {
    index: 8,
    size: "40 × 60",
    area: "2400",
    use: {
      en: "Heavy mega transport trailer, industrial yard storage, emergency pond liner",
      gu: "હેવી ટ્રેલર કન્ટેનર, ઔદ્યોગિક ખુલ્લો સંગ્રહ, કામચલાઉ તળાવ",
      hi: "हेवी ट्रांसपोर्ट ट्रेलर, औद्योगिक खुला भंडारण, आकस्मिक तालाब"
    },
    weight: {
      en: "~68.0 kg (300 GSM)",
      gu: "~૬૮.૦ કિગ્રા (300 GSM)",
      hi: "~68.0 किग्रा (300 GSM)"
    }
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initMobileMenu();
  initTarpaulinSizeChips();
  initPondCalculator();
  initScrollspy();
  initModalListeners();
  initHeroShowcaseSlider();
});

/* ==========================================================================
   1. MULTI-LANGUAGE SYSTEM (EN, GU, HI)
   ========================================================================== */
function initLanguage() {
  const savedLang = localStorage.getItem("varudi_lang") || "gu";
  setLanguage(savedLang, false);
}

function setLanguage(lang, showNotification = true) {
  if (!["en", "gu", "hi"].includes(lang)) {
    lang = "en";
  }

  APP_CONFIG.currentLanguage = lang;
  localStorage.setItem("varudi_lang", lang);
  document.documentElement.setAttribute("lang", lang);

  // Update button active state
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  document.querySelectorAll(".mobile-lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  // Apply translations from TRANSLATIONS dictionary
  if (typeof TRANSLATIONS !== "undefined" && TRANSLATIONS[lang]) {
    const dict = TRANSLATIONS[lang];

    // Text content / HTML
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    // Placeholders
    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
      const key = el.getAttribute("data-i18n-ph");
      if (dict[key] !== undefined) {
        el.setAttribute("placeholder", dict[key]);
      }
    });
  }

  // Update dynamic preview boxes
  updateTarpPreview();
  updatePondCalculation();

  // Gentle notification if requested
  if (showNotification) {
    let msg = "Language updated: English";
    if (lang === "gu") msg = "ભાષા બદલાઈ: ગુજરાતી";
    if (lang === "hi") msg = "भाषा बदली गई: हिन्दी";
    showToast(msg, "info");
  }
}

// Expose globally for inline onclick
window.setLanguage = setLanguage;

/* ==========================================================================
   2. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-nav-toggle");
  const drawer = document.getElementById("mobile-drawer");

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) {
      closeMobileDrawer();
    } else {
      openMobileDrawer();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeMobileDrawer();
    }
  });
}

function openMobileDrawer() {
  const toggleBtn = document.getElementById("mobile-nav-toggle");
  const drawer = document.getElementById("mobile-drawer");
  if (drawer) drawer.classList.add("open");
  if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeMobileDrawer() {
  const toggleBtn = document.getElementById("mobile-nav-toggle");
  const drawer = document.getElementById("mobile-drawer");
  if (drawer) drawer.classList.remove("open");
  if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

window.openMobileDrawer = openMobileDrawer;
window.closeMobileDrawer = closeMobileDrawer;

/* ==========================================================================
   3. TARPAULIN INTERACTIVE SIZE SCANNER (8 Sizes)
   ========================================================================== */
function initTarpaulinSizeChips() {
  const chipsContainer = document.getElementById("size-chips-list");
  if (!chipsContainer) return;

  const chips = chipsContainer.querySelectorAll(".size-chip");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      selectTarpSize(chip.dataset.size, false);
    });
  });
}

function selectTarpSize(size, shouldScroll = true) {
  const chipsContainer = document.getElementById("size-chips-list");
  if (!chipsContainer) return;

  const chips = chipsContainer.querySelectorAll(".size-chip");
  chips.forEach((c) => {
    if (c.dataset.size === size) {
      c.classList.add("active");
      c.setAttribute("aria-checked", "true");
      APP_CONFIG.currentSelectedSize = size;
      APP_CONFIG.currentSelectedArea = c.dataset.area;
    } else {
      c.classList.remove("active");
      c.setAttribute("aria-checked", "false");
    }
  });

  // Synchronize active state on catalog cards below
  const guideCards = document.querySelectorAll(".size-spec-card");
  guideCards.forEach((card) => {
    if (card.dataset.size === size) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });

  updateTarpPreview();

  if (shouldScroll) {
    const target = document.getElementById("tarpaulin");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

function updateTarpPreview() {
  const lang = APP_CONFIG.currentLanguage || "en";
  const item = TARP_SIZES.find(s => s.size === APP_CONFIG.currentSelectedSize) || TARP_SIZES[0];

  APP_CONFIG.currentSelectedUse = item.use[lang] || item.use.en;
  APP_CONFIG.currentSelectedWeight = item.weight[lang] || item.weight.en;

  const titleEl = document.getElementById("tarp-detail-title");
  const areaEl = document.getElementById("tarp-detail-area");
  const useEl = document.getElementById("tarp-detail-use");
  const weightEl = document.getElementById("tarp-detail-weight");

  let feetLabel = "Feet Tarpaulin";
  let sqftLabel = "Sq. Ft Coverage";

  if (lang === "gu") {
    feetLabel = "ફૂટ તાડપત્રી";
    sqftLabel = "ચોરસ ફૂટ કવરેજ";
  } else if (lang === "hi") {
    feetLabel = "फीट तिरपाल";
    sqftLabel = "वर्ग फुट कवरेज";
  }

  if (titleEl) titleEl.textContent = `${item.size} ${feetLabel}`;
  if (areaEl) areaEl.textContent = `${item.area} ${sqftLabel}`;
  if (useEl) useEl.textContent = APP_CONFIG.currentSelectedUse;
  if (weightEl) weightEl.textContent = APP_CONFIG.currentSelectedWeight;
}

function quoteForCurrentTarpSize() {
  const lang = APP_CONFIG.currentLanguage || "en";
  let prodLabel = `VARUDI Tarpaulin (${APP_CONFIG.currentSelectedSize} ft)`;
  if (lang === "gu") prodLabel = `VARUDI તાડપત્રી (${APP_CONFIG.currentSelectedSize} ફૂટ)`;
  if (lang === "hi") prodLabel = `VARUDI तिरपाल (${APP_CONFIG.currentSelectedSize} फीट)`;

  openQuoteModal(
    prodLabel,
    `${APP_CONFIG.currentSelectedSize} ft (${APP_CONFIG.currentSelectedArea} sq.ft)`,
    "200 GSM (Medium)"
  );
}

const TARP_MATERIAL_STATE = [
  {
    type: "HDPE",
    name: "HDPE Tarpaulin",
    size: "15 × 20",
    area: "300",
    color: "Blue",
    gsm: "",
    customSize: ""
  },
  {
    type: "LDPE",
    name: "LDPE Tarpaulin",
    size: "12 × 15",
    area: "180",
    color: "Silver",
    gsm: "",
    customSize: ""
  },
  {
    type: "PVC",
    name: "PVC Tarpaulin",
    size: "18 × 24",
    area: "432",
    color: "Royal Blue",
    gsm: "",
    customSize: ""
  },
  {
    type: "Canvas",
    name: "Canvas Tarpaulin",
    size: "12 × 15",
    area: "180",
    color: "Olive Green",
    gsm: "",
    customSize: ""
  },
  {
    type: "Transparent",
    name: "Transparent Tarpaulin",
    size: "9 × 12",
    area: "108",
    color: "Clear Transparent",
    gsm: "",
    customSize: ""
  },
  {
    type: "Consultation",
    name: "Material Consultation",
    size: "Custom Recommendation",
    area: "",
    color: "Any Color / Recommended",
    gsm: "Recommended by Expert",
    customSize: ""
  }
];

const STANDARD_SIZE_SQFT_MAP = {
  "6 × 9": 54,
  "9 × 12": 108,
  "10 × 12": 120,
  "12 × 15": 180,
  "15 × 20": 300,
  "18 × 24": 432,
  "20 × 30": 600,
  "30 × 30": 900,
  "40 × 60": 2400
};

function selectMaterialSize(cardIdx, sizeVal) {
  if (!TARP_MATERIAL_STATE[cardIdx]) return;
  const state = TARP_MATERIAL_STATE[cardIdx];
  const customInput = document.getElementById(`card-custom-size-input-${cardIdx}`);

  if (sizeVal === "custom" || (typeof sizeVal === "string" && sizeVal.toLowerCase().includes("custom"))) {
    state.size = "Custom Size";
    state.area = "";
    if (customInput) {
      customInput.style.display = "block";
      customInput.classList.add("active");
      customInput.focus();
      state.customSize = customInput.value ? customInput.value.trim() : "";
    }
  } else {
    state.size = sizeVal;
    state.customSize = "";
    if (customInput) {
      customInput.style.display = "none";
      customInput.classList.remove("active");
      customInput.value = "";
    }
    const sqft = STANDARD_SIZE_SQFT_MAP[sizeVal] || "";
    state.area = sqft ? String(sqft) : "";
  }
}

function updateMaterialCustomSize(cardIdx, val) {
  if (!TARP_MATERIAL_STATE[cardIdx]) return;
  const state = TARP_MATERIAL_STATE[cardIdx];
  const trimmed = val ? val.trim() : "";
  state.customSize = trimmed;

  if (trimmed) {
    const parts = trimmed.split(/[x×*]/i).map(p => parseFloat(p.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      state.area = String(Math.round(parts[0] * parts[1]));
    } else {
      state.area = "";
    }
  } else {
    state.area = "";
  }
}

function selectMaterialColor(cardIdx, colorKey, event) {
  if (event) event.stopPropagation();
  if (!TARP_MATERIAL_STATE[cardIdx]) return;
  TARP_MATERIAL_STATE[cardIdx].color = colorKey;

  const card = document.querySelector(`.size-spec-card[data-card-idx="${cardIdx}"]`);
  if (card) {
    const badges = card.querySelectorAll(".color-badge.color-selectable");
    badges.forEach(b => {
      if (b.getAttribute("data-color") === colorKey) {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });

    if (cardIdx === 0) {
      const imgEl = document.getElementById(`card-tarp-img-${cardIdx}`);
      if (imgEl) {
        if (colorKey === "Green") {
          imgEl.src = "assets/tarpaulin-green.jpg";
        } else if (colorKey === "Blue") {
          imgEl.src = "assets/tarpaulin-blue.jpg";
        } else {
          imgEl.src = "assets/tarpaulin-hdpe.jpg";
        }
      }
    }
  }
}

function updateMaterialGsm(cardIdx, value) {
  if (!TARP_MATERIAL_STATE[cardIdx]) return;
  TARP_MATERIAL_STATE[cardIdx].gsm = value ? value.trim() : "";
}

function getCardColorLocalized(colorKey, lang) {
  const map = {
    Black: { en: "Black", gu: "કાળો (Black)", hi: "काला (Black)" },
    Blue: { en: "Blue", gu: "વાદળી (Blue)", hi: "नीला (Blue)" },
    Green: { en: "Green", gu: "લીલો (Green)", hi: "हरा (Green)" },
    White: { en: "White", gu: "સફેદ (White)", hi: "सफेद (White)" },
    Brown: { en: "Brown", gu: "બ્રાઉન (Brown)", hi: "ब्राउन (Brown)" },
    Wood: { en: "Brown", gu: "બ્રાઉન (Brown)", hi: "ब्राउन (Brown)" },
    Orange: { en: "Orange", gu: "નારંગી (Orange)", hi: "नारंगी (Orange)" },
    Red: { en: "Red", gu: "લાલ (Red)", hi: "लाल (Red)" },
    Silver: { en: "Silver", gu: "સિલ્વર (Silver)", hi: "સિલ્વર (Silver)" },
    Yellow: { en: "Yellow", gu: "પીળો (Yellow)", hi: "पीला (Yellow)" },
    "Royal Blue": { en: "Royal Blue", gu: "રોયલ બ્લુ (Royal Blue)", hi: "रॉयल ब्लू (Royal Blue)" },
    "Olive Green": { en: "Olive Green", gu: "ઓલિવ ગ્રીન (Olive Green)", hi: "ओलिव ग्रीन (Olive Green)" },
    Khaki: { en: "Khaki", gu: "ખાખી (Khaki)", hi: "खाकी (Khaki)" },
    Grey: { en: "Grey", gu: "ગ્રે (Grey)", hi: "ग्रे (Grey)" },
    "Clear Transparent": { en: "Clear Transparent", gu: "પારદર્શક (Clear)", hi: "पारदर्शी (Clear)" }
  };
  return (map[colorKey] && map[colorKey][lang]) ? map[colorKey][lang] : colorKey;
}

function quoteForMaterialCard(cardIdx) {
  const state = TARP_MATERIAL_STATE[cardIdx] || { type: "HDPE", name: "HDPE Tarpaulin", size: "15 × 20", area: "300", color: "Blue", gsm: "" };
  const lang = APP_CONFIG.currentLanguage || "en";
  const isCustom = state.size === "Custom Size" || state.size === "custom";
  let effSize = "";
  if (isCustom) {
    effSize = state.customSize ? state.customSize : (lang === "gu" ? "કસ્ટમ સાઇઝ" : (lang === "hi" ? "कस्टम साइज" : "Custom Size"));
  } else {
    effSize = `${state.size} ${lang === "gu" ? "ફૂટ" : (lang === "hi" ? "फीट" : "ft")}`;
  }

  const colorDisplay = getCardColorLocalized(state.color, lang);
  const gsmDisplay = state.gsm ? (state.gsm.toLowerCase().includes("gsm") ? state.gsm : `${state.gsm} GSM`) : "Standard Factory Recommended";

  let prodLabel = `VARUDI TARPAULIN (${state.name} - ${effSize})`;
  const specDetails = `${state.name} | Size: ${effSize} ${state.area ? '(' + state.area + ' sq.ft)' : ''} | Color: ${colorDisplay}`;

  openQuoteModal(
    prodLabel,
    specDetails,
    gsmDisplay
  );
}

function whatsappMaterialCard(cardIdx) {
  const state = TARP_MATERIAL_STATE[cardIdx] || { type: "HDPE", name: "HDPE Tarpaulin", size: "15 × 20", area: "300", color: "Blue", gsm: "" };
  const lang = APP_CONFIG.currentLanguage || "en";
  const isCustom = state.size === "Custom Size" || state.size === "custom";
  let effSize = "";
  if (isCustom) {
    effSize = state.customSize ? state.customSize : (lang === "gu" ? "કસ્ટમ સાઇઝ (જરૂરિયાત મુજબ)" : (lang === "hi" ? "कस्टम साइज (आवश्यकता अनुसार)" : "Custom Size (As required)"));
  } else {
    effSize = `${state.size} ${lang === "gu" ? "ફૂટ" : (lang === "hi" ? "फीट" : "Feet")}`;
  }
  const areaText = state.area ? ` (${state.area} ${lang === "gu" ? "ચોરસ ફૂટ" : (lang === "hi" ? "वर्ग फुट" : "Sq. Ft")})` : "";
  const colorDisplay = getCardColorLocalized(state.color, lang);
  const gsmDisplay = state.gsm ? (state.gsm.toLowerCase().includes("gsm") ? state.gsm : `${state.gsm} GSM`) : "Standard Factory Grade";

  let message = "";
  if (lang === "gu") {
    message = `નમસ્તે વરુડી એન્ટરપ્રાઇઝ,\n\nમને VARUDI TARPAULIN માટે ડાયરેક્ટ ફેક્ટરી ભાવ જોઈએ છે:\n• પ્રોડક્ટ: ${state.name}\n• મટિરિયલ પ્રકાર: ${state.type}\n• પસંદ કરેલ સાઇઝ: ${effSize}${areaText}\n• પસંદ કરેલ કલર: ${colorDisplay}\n• પસંદ કરેલ GSM: ${gsmDisplay}\n\nકૃપા કરીને આ સ્પેસિફિકેશન માટે તાત્કાલિક ફેક્ટરી રેટ અને ડિલિવરી વિગત જણાવો.`;
  } else if (lang === "hi") {
    message = `नमस्ते वरुडी एंटरप्राइज,\n\nमुझे VARUDI TARPAULIN के लिए डायरेक्ट फैक्ट्री कोटेशन चाहिए:\n• प्रोडक्ट: ${state.name}\n• मटेरियल प्रकार: ${state.type}\n• चयनित साइज: ${effSize}${areaText}\n• चयनित कलर: ${colorDisplay}\n• चयनित GSM: ${gsmDisplay}\n\nकृपया इस स्पेसिफिकेशन के लिए डायरेक्ट निर्माता दर एवं डिलीवरी विवरण बताएं।`;
  } else {
    message = `Hello Varudi Enterprise Team,\n\nI want a factory price quote for VARUDI TARPAULIN:\n• Product: ${state.name}\n• Material Type: ${state.type}\n• Selected Size: ${effSize}${areaText}\n• Selected Color: ${colorDisplay}\n• Desired GSM: ${gsmDisplay}\n\nPlease share direct factory pricing and dispatch details.`;
  }

  openWhatsAppUrl(message);
}

function whatsappMaterialConsult() {
  const lang = APP_CONFIG.currentLanguage || "en";
  let message = "";
  if (lang === "gu") {
    message = `નમસ્તે વરુડી એન્ટરપ્રાઇઝ ટેકનિકલ ટીમ,\n\nમને મારા ઉપયોગ માટે શ્રેષ્ઠ તાડપત્રી મટિરિયલ (HDPE, LDPE, PVC, કેનવાસ કે પારદર્શક) પસંદ કરવા માટે નિષ્ણાત સલાહ જોઈએ છે.\n\nકૃપા કરીને યોગ્ય મટિરિયલ, GSM, કસ્ટમ સાઇઝ અને ડાયરેક્ટ ફેક્ટરી રેટ જણાવો.`;
  } else if (lang === "hi") {
    message = `नमस्ते वरुडी एंटरप्राइज तकनीकी टीम,\n\nमुझे अपने उपयोग के लिए सर्वोत्तम तिरपाल मटेरियल (HDPE, LDPE, PVC, कैनवास या पारदर्शी) चुनने हेतु विशेषज्ञ मार्गदर्शन चाहिए।\n\nकृपया उचित मटेरियल, GSM, कस्टम साइज और फैक्ट्री रेट्स की जानकारी दें।`;
  } else {
    message = `Hello Varudi Enterprise Technical Team,\n\nI need expert guidance on choosing the best tarpaulin material (HDPE, LDPE, PVC, Canvas, or Transparent) for my application.\n\nPlease advise on the optimal material, GSM grade, custom sizing, and factory pricing.`;
  }
  openWhatsAppUrl(message);
}

function quoteForSpecificTarpSize(size, area) {
  const lang = APP_CONFIG.currentLanguage || "en";
  let prodLabel = `VARUDI TARPAULIN (${size} ft)`;
  if (lang === "gu") prodLabel = `VARUDI TARPAULIN (${size} ફૂટ)`;
  if (lang === "hi") prodLabel = `VARUDI TARPAULIN (${size} फीट)`;
  openQuoteModal(prodLabel, `${size} ft (${area} sq.ft)`, "200 GSM (Standard)");
}

function whatsappSpecificTarpSize(size, area) {
  quoteForSpecificTarpSize(size, area);
}

function whatsappCurrentTarpSize() {
  whatsappMaterialConsult();
}

window.TARP_MATERIAL_STATE = TARP_MATERIAL_STATE;
window.selectMaterialSize = selectMaterialSize;
window.updateMaterialCustomSize = updateMaterialCustomSize;
window.selectMaterialColor = selectMaterialColor;
window.updateMaterialGsm = updateMaterialGsm;
window.quoteForMaterialCard = quoteForMaterialCard;
window.whatsappMaterialCard = whatsappMaterialCard;
window.whatsappMaterialConsult = whatsappMaterialConsult;

// Backward-compatibility aliases
window.selectCardColor = selectMaterialColor;
window.selectCardMaterial = () => {};
window.updateCardGsm = updateMaterialGsm;
window.quoteForTarpCard = quoteForMaterialCard;
window.whatsappTarpCard = whatsappMaterialCard;
window.selectTarpSize = selectMaterialSize;
window.quoteForSpecificTarpSize = quoteForSpecificTarpSize;
window.whatsappSpecificTarpSize = whatsappSpecificTarpSize;
window.quoteForCurrentTarpSize = quoteForMaterialCard;
window.whatsappCurrentTarpSize = whatsappCurrentTarpSize;

/* ==========================================================================
   4. FARM POND (KHET TALAVADI) CONFIGURATOR & CALCULATOR
   ========================================================================== */
function initPondCalculator() {
  const inputs = ["pond-l", "pond-w", "pond-d", "input-material", "input-gsm", "input-location"];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", updatePondCalculation);
      el.addEventListener("change", updatePondCalculation);
    }
  });

  updatePondCalculation();
}

function updatePondCalculation() {
  const lengthInput = document.getElementById("pond-l");
  const widthInput = document.getElementById("pond-w");
  const depthInput = document.getElementById("pond-d");
  const gsmInput = document.getElementById("input-gsm");

  if (!lengthInput || !widthInput || !depthInput) return;

  const L = parseFloat(lengthInput.value) || 60;
  const W = parseFloat(widthInput.value) || 60;
  const D = parseFloat(depthInput.value) || 10;
  const gsmStr = gsmInput ? gsmInput.value : "350 GSM";

  const slopeAllowance = 1.8 * D;
  const anchorAllowance = 6; // 3ft anchor trench each side
  
  const totalSheetL = Math.ceil(L + (2 * slopeAllowance) + anchorAllowance);
  const totalSheetW = Math.ceil(W + (2 * slopeAllowance) + anchorAllowance);
  const totalAreaSqFt = totalSheetL * totalSheetW;

  const avgDimL = L - (0.5 * D);
  const avgDimW = W - (0.5 * D);
  const volumeCuFt = Math.max(100, (avgDimL * avgDimW * D) * 0.78);
  const volumeLitres = Math.round(volumeCuFt * 28.317);

  const areaSqMeters = totalAreaSqFt / 10.764;
  let gsmNum = 350;
  if (gsmStr.includes("250")) gsmNum = 250;
  if (gsmStr.includes("500")) gsmNum = 500;
  if (gsmStr.includes("750")) gsmNum = 750;

  const totalWeightKg = Math.round((areaSqMeters * gsmNum) / 1000);

  const lang = APP_CONFIG.currentLanguage || "en";
  const dimEl = document.getElementById("res-sheet-dim");
  const areaEl = document.getElementById("res-total-area");
  const volEl = document.getElementById("res-water-vol");
  const wtEl = document.getElementById("res-sheet-wt");

  let unitFt = "ft";
  let unitSqFt = "Sq. Ft";
  let unitLitres = "Litres";
  let unitKg = "Kilograms";

  if (lang === "gu") {
    unitFt = "ફૂટ";
    unitSqFt = "ચોરસ ફૂટ";
    unitLitres = "લીટર";
    unitKg = "કિલોગ્રામ";
  } else if (lang === "hi") {
    unitFt = "फीट";
    unitSqFt = "वर्ग फुट";
    unitLitres = "लीटर";
    unitKg = "किलोग्राम";
  }

  if (dimEl) dimEl.textContent = `${totalSheetL} ${unitFt} × ${totalSheetW} ${unitFt}`;
  if (areaEl) areaEl.textContent = `${totalAreaSqFt.toLocaleString("en-IN")} ${unitSqFt}`;
  if (volEl) volEl.textContent = `~${formatIndianNumber(volumeLitres, lang)} ${unitLitres}`;
  if (wtEl) wtEl.textContent = `~${totalWeightKg.toLocaleString("en-IN")} ${unitKg}`;
}

function quoteCustomPondLiner() {
  whatsappCustomPondLiner();
}

function whatsappCustomPondLiner() {
  const L = document.getElementById("pond-l").value;
  const W = document.getElementById("pond-w").value;
  const D = document.getElementById("pond-d").value;
  const material = document.getElementById("input-material").value;
  const gsm = document.getElementById("input-gsm").value;
  const location = document.getElementById("input-location").value;
  const sheetDim = document.getElementById("res-sheet-dim").textContent;
  const totalArea = document.getElementById("res-total-area").textContent;
  const capacity = document.getElementById("res-water-vol").textContent;
  const lang = APP_CONFIG.currentLanguage || "en";

  let message = "";
  if (lang === "gu") {
    message = `નમસ્તે વરુડી એન્ટરપ્રાઇઝ એન્જિનિયરિંગ ટીમ,\n\nમને ખેત તલાવડી લાઇનર માટે ભાવ જોઈએ છે:\n• તલાવડી માપ: ${L} ફૂટ (લંબાઈ) × ${W} ફૂટ (પહોળાઈ) × ${D} ફૂટ (ઊંડાઈ)\n• મટીરિયલ: ${material}\n• જીએસએમ (GSM): ${gsm}\n• ગણતરી કરેલ શીટ સાઇઝ: ${sheetDim} (${totalArea})\n• જળ સંગ્રહ ક્ષમતા: ${capacity}\n• ડિલિવરી જિલ્લો: ${location}\n\nકૃપા કરીને ફેક્ટરી ભાવ અને ડિલિવરી માહિતી આપો.`;
  } else if (lang === "hi") {
    message = `नमस्ते वरुडी एंटरप्राइज इंजीनियरिंग टीम,\n\nमुझे खेत तलाई लाइनर के लिए कोटेशन चाहिए:\n• तालाब नाप: ${L} फीट (लंबाई) × ${W} फीट (चौड़ाई) × ${D} फीट (गहराई)\n• मटेरियल: ${material}\n• जीएसएम (GSM): ${gsm}\n• कुल शीट साइज: ${sheetDim} (${totalArea})\n• जल भंडारण क्षमता: ${capacity}\n• डिलीवरी जिला: ${location}\n\nकृपया फैक्ट्री भाव और डिलीवरी का समय बताएं।`;
  } else {
    message = `Hello Varudi Enterprise Engineering Team,\n\nI need a quotation for a Farm Pond Liner (Khet Talavadi):\n• Pond Size: ${L} ft (L) × ${W} ft (W) × ${D} ft (Depth)\n• Material: ${material}\n• Density: ${gsm}\n• Calculated Sheet Size: ${sheetDim} (${totalArea})\n• Water Capacity: ${capacity}\n• Delivery District: ${location}\n\nPlease share factory rate with delivery timeline.`;
  }

  openWhatsAppUrl(message);
}

window.updatePondCalculation = updatePondCalculation;
window.quoteCustomPondLiner = quoteCustomPondLiner;
window.whatsappCustomPondLiner = whatsappCustomPondLiner;

/* ==========================================================================
   5. "GET QUOTE" MODAL SYSTEM
   ========================================================================== */
function initModalListeners() {
  const modalOverlay = document.getElementById("quote-modal-overlay");
  if (!modalOverlay) return;

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeQuoteModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeQuoteModal();
    }
  });
}

function openQuoteModal(productName = "", sizeDetails = "", gsmValue = "", locationValue = "") {
  const modalOverlay = document.getElementById("quote-modal-overlay");
  if (!modalOverlay) return;

  const productSelect = document.getElementById("mq-product");
  const sizeInput = document.getElementById("mq-size");
  const gsmSelect = document.getElementById("mq-gsm");
  const cityInput = document.getElementById("mq-city");

  if (productSelect) {
    const genericTriggers = [
      "header cta",
      "footer button",
      "main hero banner",
      "mobile drawer quote",
      "general product inquiry",
      "general inquiry",
      "general"
    ];
    const cleanTarget = (productName || "").trim().toLowerCase();
    const isGeneric = !cleanTarget || genericTriggers.includes(cleanTarget);

    if (isGeneric) {
      if (!productSelect.value) {
        productSelect.selectedIndex = 0;
      }
    } else {
      let matched = false;
      for (let opt of productSelect.options) {
        if (!opt.value) continue;
        const optVal = opt.value.trim().toLowerCase();
        const optText = opt.textContent.trim().toLowerCase();
        if (
          cleanTarget === optVal ||
          cleanTarget === optText ||
          cleanTarget.includes(optVal) ||
          optVal.includes(cleanTarget) ||
          cleanTarget.includes(optText)
        ) {
          opt.selected = true;
          matched = true;
          break;
        }
      }
      if (!matched) {
        let customOpt = productSelect.querySelector("option[data-custom='true']");
        if (!customOpt) {
          customOpt = document.createElement("option");
          customOpt.setAttribute("data-custom", "true");
          productSelect.appendChild(customOpt);
        }
        customOpt.value = productName;
        customOpt.textContent = productName;
        customOpt.selected = true;
      }
    }
  }

  if (sizeInput) {
    sizeInput.value = sizeDetails || "";
  }
  if (cityInput && locationValue) {
    cityInput.value = locationValue;
  }

  if (gsmSelect && gsmValue) {
    let matched = false;
    for (let opt of gsmSelect.options) {
      if (gsmValue.toLowerCase().includes(opt.value.toLowerCase().split(" ")[0])) {
        opt.selected = true;
        matched = true;
        break;
      }
    }
    if (!matched) {
      let customOpt = gsmSelect.querySelector("option[data-custom='true']");
      if (!customOpt) {
        customOpt = document.createElement("option");
        customOpt.setAttribute("data-custom", "true");
        gsmSelect.appendChild(customOpt);
      }
      customOpt.value = gsmValue;
      customOpt.textContent = `${gsmValue} (Custom Selected)`;
      customOpt.selected = true;
    }
  }

  modalOverlay.removeAttribute("hidden");
  setTimeout(() => {
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }, 10);
}

function closeQuoteModal() {
  const modalOverlay = document.getElementById("quote-modal-overlay");
  if (!modalOverlay) return;

  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";

  setTimeout(() => {
    modalOverlay.setAttribute("hidden", "");
  }, 250);
}

function handleModalQuoteSubmit(event) {
  if (event && event.preventDefault) {
    event.preventDefault();
  }

  const product = document.getElementById("mq-product").value || "Tarpaulin & Agro Covers";
  const size = document.getElementById("mq-size").value || "-";
  const gsm = document.getElementById("mq-gsm").value || "Factory Recommended Standard";
  const name = document.getElementById("mq-name").value || "Customer";
  const phone = document.getElementById("mq-phone").value || "Direct";
  const city = document.getElementById("mq-city").value || "Gujarat";
  const lang = APP_CONFIG.currentLanguage || "en";

  let toastMsg = `Thank you, ${name}! Redirecting to WhatsApp with your quotation request for "${product}"...`;
  if (lang === "gu") {
    toastMsg = `આભાર, ${name}! "${product}" માટે ભાવપત્રક મોકલવા વોટ્સએપ પર રીડાયરેક્ટ કરી રહ્યા છીએ...`;
  } else if (lang === "hi") {
    toastMsg = `धन्यवाद, ${name}! "${product}" के कोटेशन अनुरोध के लिए व्हाट्सएप खोला जा रहा है...`;
  }

  closeQuoteModal();
  showToast(toastMsg, "success");

  const form = document.getElementById("modal-quote-form");
  if (form) form.reset();

  let message = "";
  if (lang === "gu") {
    message = `*વરુડી એન્ટરપ્રાઇઝ - ભાવ પૂછપરછ*\n-----------------------\n• ગ્રાહકનું નામ: ${name}\n• મોબાઈલ નંબર: ${phone}\n• પ્રોડક્ટ: ${product}\n• સાઇઝ / માપ: ${size}\n• જીએસએમ (GSM): ${gsm}\n• ડિલિવરી જિલ્લો / શહેર: ${city}\n\nકૃપા કરીને શ્રેષ્ઠ ફેક્ટરી ભાવ અને ડિલિવરી માહિતી મોકલો.`;
  } else if (lang === "hi") {
    message = `*वरुडी एंटरप्राइज - मूल्य कोटेशन अनुरोध*\n-----------------------\n• ग्राहक का नाम: ${name}\n• मोबाइल नंबर: ${phone}\n• उत्पाद: ${product}\n• साइज / नाप: ${size}\n• जीएसएम (GSM): ${gsm}\n• डिलीवरी शहर / जिला: ${city}\n\nकृपया सर्वोत्तम फैक्ट्री मूल्य और डिलीवरी विवरण भेजें।`;
  } else {
    message = `*Varudi Enterprise Quotation Request*\n-----------------------\n• Customer Name: ${name}\n• Phone / WhatsApp: ${phone}\n• Product: ${product}\n• Size / Dimension: ${size}\n• Preferred GSM: ${gsm}\n• Delivery City / District: ${city}\n\nPlease share factory rate quote and delivery timeline.`;
  }

  openWhatsAppUrl(message);
}

function sendModalDetailsViaWhatsApp() {
  const form = document.getElementById("modal-quote-form");
  if (form && !form.checkValidity()) {
    form.reportValidity();
    return;
  }
  handleModalQuoteSubmit(new Event("submit"));
}

window.openQuoteModal = openQuoteModal;
window.closeQuoteModal = closeQuoteModal;
window.handleModalQuoteSubmit = handleModalQuoteSubmit;
window.sendModalDetailsViaWhatsApp = sendModalDetailsViaWhatsApp;

/* ==========================================================================
   6. CONTACT FORM HANDLERS
   ========================================================================== */
function handleContactSubmit(event) {
  if (event && event.preventDefault) {
    event.preventDefault();
  }

  const name = document.getElementById("c-name").value || "Valued Farmer / Client";
  const phone = document.getElementById("c-phone").value || "Direct";
  const location = document.getElementById("c-location").value || "Gujarat";
  const product = document.getElementById("c-product").value || "Protective Covers";
  const notes = document.getElementById("c-notes").value || "-";
  const lang = APP_CONFIG.currentLanguage || "en";

  let toastMsg = `Thank you ${name}! Opening WhatsApp with your inquiry...`;
  if (lang === "gu") {
    toastMsg = `આભાર ${name}! તમારી પૂછપરછ મોકલવા માટે વોટ્સએપ ખોલી રહ્યા છીએ...`;
  } else if (lang === "hi") {
    toastMsg = `धन्यवाद ${name}! आपकी पूछताछ के लिए व्हाट्सएप खोला जा रहा है...`;
  }

  showToast(toastMsg, "success");
  if (event && event.target && event.target.reset) {
    event.target.reset();
  }

  sendContactViaWhatsApp();
}

function sendContactViaWhatsApp() {
  const name = document.getElementById("c-name").value || "Valued Farmer / Client";
  const phone = document.getElementById("c-phone").value || "Direct";
  const location = document.getElementById("c-location").value || "Gujarat";
  const product = document.getElementById("c-product").value || "Protective Covers";
  const notes = document.getElementById("c-notes").value || "-";
  const lang = APP_CONFIG.currentLanguage || "en";

  let message = "";
  if (lang === "gu") {
    message = `*વરુડી એન્ટરપ્રાઇઝ - તાત્કાલિક પૂછપરછ*\n• નામ: ${name}\n• ફોન: ${phone}\n• જિલ્લો: ${location}\n• પ્રોડક્ટ: ${product}\n• વિશેષ વિગત: ${notes}\n\nકૃપા કરીને બ્રોશર અને ફેક્ટરી ભાવ મોકલો.`;
  } else if (lang === "hi") {
    message = `*वरुडी एंटरप्राइज - त्वरित पूछताछ*\n• नाम: ${name}\n• फोन: ${phone}\n• जिला: ${location}\n• उत्पाद: ${product}\n• विवरण: ${notes}\n\nकृपया उत्पाद सूची और डायरेक्ट फैक्ट्री भाव भेजें।`;
  } else {
    message = `*Varudi Enterprise Quick Inquiry*\n• Name: ${name}\n• Phone: ${phone}\n• Location: ${location}\n• Product: ${product}\n• Requirement Notes: ${notes}\n\nPlease send pricing brochure.`;
  }

  openWhatsAppUrl(message);
}

window.handleContactSubmit = handleContactSubmit;
window.sendContactViaWhatsApp = sendContactViaWhatsApp;

/* ==========================================================================
   7. SCROLLSPY FOR NAVIGATION
   ========================================================================== */
function initScrollspy() {
  const sections = document.querySelectorAll("section[id], article[id], div.core-block-wrapper[id]");
  const navLinks = document.querySelectorAll(".nav-item-link");

  if (!sections.length || !navLinks.length) return;

  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (currentId && link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   8. TOAST NOTIFICATION & HELPER UTILITIES
   ========================================================================== */
function showToast(message, type = "info") {
  const container = document.getElementById("toast-center");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-item";
  toast.innerHTML = `
    <span style="font-size:1.2rem;">${type === "success" ? "✅" : "ℹ️"}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(16px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function openWhatsAppUrl(text) {
  const encoded = encodeURIComponent(text);
  const url = `https://wa.me/${APP_CONFIG.factoryPhone}?text=${encoded}`;
  window.open(url, "_blank", "noopener");
}

function formatIndianNumber(num, lang = "en") {
  if (num >= 10000000) {
    const val = (num / 10000000).toFixed(2);
    if (lang === "gu") return `${val} કરોડ`;
    if (lang === "hi") return `${val} करोड़`;
    return `${val} Crore`;
  } else if (num >= 100000) {
    const val = (num / 100000).toFixed(1);
    if (lang === "gu") return `${val} લાખ`;
    if (lang === "hi") return `${val} लाख`;
    return `${val} Lakh`;
  }
  return num.toLocaleString("en-IN");
}

/* ==========================================================================
   9. HERO SHOWCASE PHOTO SLIDER (AUTO CHANGE 3 SECONDS)
   ========================================================================== */
let heroSliderTimer = null;
let heroCurrentSlide = 0;
const HERO_SLIDE_INTERVAL = 3000; // 3 seconds

function initHeroShowcaseSlider() {
  const slides = document.querySelectorAll(".showcase-slide");
  if (!slides.length) return;

  heroCurrentSlide = 0;
  showSlide(0);

  startHeroSliderTimer();

  const frame = document.getElementById("hero-slider-frame");
  if (frame) {
    frame.addEventListener("mouseenter", pauseHeroSliderTimer);
    frame.addEventListener("mouseleave", startHeroSliderTimer);
  }
}

function showSlide(index) {
  const slides = document.querySelectorAll(".showcase-slide");
  const dots = document.querySelectorAll(".slider-dot");
  if (!slides.length) return;

  if (index >= slides.length) {
    heroCurrentSlide = 0;
  } else if (index < 0) {
    heroCurrentSlide = slides.length - 1;
  } else {
    heroCurrentSlide = index;
  }

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === heroCurrentSlide);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === heroCurrentSlide);
  });
}

function heroSliderNext() {
  showSlide(heroCurrentSlide + 1);
  resetHeroSliderTimer();
}

function heroSliderPrev() {
  showSlide(heroCurrentSlide - 1);
  resetHeroSliderTimer();
}

function heroSliderGoTo(index) {
  showSlide(index);
  resetHeroSliderTimer();
}

function startHeroSliderTimer() {
  if (heroSliderTimer) clearInterval(heroSliderTimer);
  heroSliderTimer = setInterval(() => {
    showSlide(heroCurrentSlide + 1);
  }, HERO_SLIDE_INTERVAL);
}

function pauseHeroSliderTimer() {
  if (heroSliderTimer) {
    clearInterval(heroSliderTimer);
    heroSliderTimer = null;
  }
}

function resetHeroSliderTimer() {
  pauseHeroSliderTimer();
  startHeroSliderTimer();
}

window.heroSliderNext = heroSliderNext;
window.heroSliderPrev = heroSliderPrev;
window.heroSliderGoTo = heroSliderGoTo;

