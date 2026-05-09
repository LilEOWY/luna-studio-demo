const STORAGE_KEY = "luna-studio-demo-state-v1";
const AUTH_KEY = "luna-studio-demo-auth-v1";
const CUSTOMER_AUTH_KEY = "luna-studio-demo-customer-auth-v1";
const demoCredentials = {
  email: "owner@lunastudio.co",
  password: "LunaDemo2026",
};
const customerCredentials = {
  email: "ece@demo.com",
  password: "LunaClient2026",
  phone: "0553 440 10 22",
};

const seedState = {
  appointments: [
    {
      id: "apt-1",
      name: "Ece Demir",
      phone: "0553 440 10 22",
      service: "Renk + bakım",
      staff: "Melis",
      date: "2026-05-10",
      time: "11:30",
      notes: "Geçen sefer küllü tona yakın çalışıldı.",
      status: "confirmed",
      createdAt: "2026-05-09T09:15:00Z",
    },
    {
      id: "apt-2",
      name: "Selin Akın",
      phone: "0554 221 44 10",
      service: "Kesim + fön",
      staff: "Derya",
      date: "2026-05-10",
      time: "13:00",
      notes: "Öğle arasında hızlı akış istiyor.",
      status: "confirmed",
      createdAt: "2026-05-09T10:45:00Z",
    },
    {
      id: "apt-3",
      name: "Zeynep Korkmaz",
      phone: "0555 120 88 66",
      service: "Bakım paketi",
      staff: "Selin",
      date: "2026-05-10",
      time: "16:30",
      notes: "İlk ziyaret, işlem öncesi saç analizi istiyor.",
      status: "pending",
      createdAt: "2026-05-09T12:20:00Z",
    },
    {
      id: "apt-4",
      name: "Mina Yalçın",
      phone: "0532 888 11 70",
      service: "Gelin saçı / özel gün",
      staff: "Melis",
      date: "2026-05-11",
      time: "10:00",
      notes: "Deneme randevusu için arandı.",
      status: "pending",
      createdAt: "2026-05-09T15:05:00Z",
    },
  ],
  customers: [
    {
      id: "cus-1",
      name: "Ece Demir",
      phone: "0553 440 10 22",
      email: "ece@demo.com",
      favoriteService: "Renk + bakım",
      lastVisit: "2026-04-22",
      visits: 6,
      spend: 18250,
      note: "Ton koruma ürünü önerisine sıcak.",
      loyalty: "yüksek",
      vipPoints: 860,
      vipTier: "Gold",
      referrals: 3,
      rewardProgress: 140,
    },
    {
      id: "cus-2",
      name: "Selin Akın",
      phone: "0554 221 44 10",
      email: "selin@demo.com",
      favoriteService: "Kesim + fön",
      lastVisit: "2026-05-01",
      visits: 3,
      spend: 7200,
      note: "Cuma öğlen saatlerini tercih ediyor.",
      loyalty: "orta",
      vipPoints: 340,
      vipTier: "Silver",
      referrals: 1,
      rewardProgress: 60,
    },
    {
      id: "cus-3",
      name: "Derya Öztürk",
      phone: "0541 555 91 30",
      email: "derya@demo.com",
      favoriteService: "Bakım paketi",
      lastVisit: "2026-03-28",
      visits: 2,
      spend: 5100,
      note: "Uzun süredir geri çağrı yapılmamış.",
      loyalty: "geri kazanım",
      vipPoints: 180,
      vipTier: "Bronze",
      referrals: 0,
      rewardProgress: 20,
    },
  ],
  activity: [
    {
      title: "Öğlen yoğunluğu",
      detail: "12:00 - 15:00 arası iki slot daha açılabilir.",
    },
    {
      title: "Geri dönüş fırsatı",
      detail: "Derya Öztürk için bakım hatırlatma mesajı öneriliyor.",
    },
    {
      title: "Ekip notu",
      detail: "Melis'in 17:00 sonrası boya blokları dolu görünüyor.",
    },
  ],
  staff: [
    {
      name: "Melis",
      role: "Color Specialist",
      occupancy: 92,
      revenue: 12600,
      rating: 4.9,
      nextSlot: "17:30",
    },
    {
      name: "Derya",
      role: "Cut & Styling",
      occupancy: 74,
      revenue: 7800,
      rating: 4.8,
      nextSlot: "15:00",
    },
    {
      name: "Selin",
      role: "Care Treatments",
      occupancy: 61,
      revenue: 5100,
      rating: 4.7,
      nextSlot: "14:30",
    },
  ],
};

function loadState() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedState));
    return structuredClone(seedState);
  }

  try {
    return JSON.parse(existing);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedState));
    return structuredClone(seedState);
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === "true";
}

function setAuthenticated(value) {
  localStorage.setItem(AUTH_KEY, value ? "true" : "false");
}

function isCustomerAuthenticated() {
  return localStorage.getItem(CUSTOMER_AUTH_KEY) === "true";
}

function setCustomerAuthenticated(value) {
  localStorage.setItem(CUSTOMER_AUTH_KEY, value ? "true" : "false");
}

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "short",
  }).format(new Date(dateString));
}

function formatMoney(value) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

function servicePrice(service) {
  const prices = {
    "Kesim + fön": 1800,
    "Renk + bakım": 4200,
    "Bakım paketi": 2400,
    "Gelin saçı / özel gün": 6500,
  };

  return prices[service] || 2000;
}

function getTodayAppointments(state) {
  return [...state.appointments].sort((a, b) => {
    const first = `${a.date}T${a.time}`;
    const second = `${b.date}T${b.time}`;
    return first.localeCompare(second);
  });
}

function upsertCustomerFromAppointment(state, appointment) {
  const existing = state.customers.find((customer) => customer.phone === appointment.phone);

  if (existing) {
    existing.favoriteService = appointment.service;
    existing.note = appointment.notes || existing.note;
    existing.rewardProgress = Math.min((existing.rewardProgress || 0) + 20, 200);
    return;
  }

  state.customers.unshift({
    id: `cus-${Date.now()}`,
    name: appointment.name,
    phone: appointment.phone,
    favoriteService: appointment.service,
    lastVisit: appointment.date,
    visits: 1,
    spend: servicePrice(appointment.service),
    note: appointment.notes || "Yeni müşteri adayı.",
    loyalty: "yeni",
    vipPoints: 80,
    vipTier: "Bronze",
    referrals: 0,
    rewardProgress: 20,
  });
}

function tierFromPoints(points) {
  if (points >= 900) return "Platinum";
  if (points >= 600) return "Gold";
  if (points >= 300) return "Silver";
  return "Bronze";
}

function statusLabel(status) {
  if (status === "confirmed") return "Onaylandı";
  if (status === "completed") return "Tamamlandı";
  if (status === "cancelled") return "Reddedildi";
  return "Bekliyor";
}

function statusClass(status) {
  if (status === "confirmed") return "status-confirmed";
  if (status === "completed") return "status-confirmed";
  if (status === "cancelled") return "status-cancelled";
  return "status-pending";
}

function renderMarketingPage(state) {
  const pending = state.appointments.filter((item) => item.status === "pending");
  const schedule = getTodayAppointments(state).slice(0, 4);
  const customers = state.customers.slice(0, 4);

  setText('[data-stat="todayBookings"]', String(state.appointments.length));
  setText('[data-stat="pendingCount"]', String(pending.length));
  setText('[data-stat="customerCount"]', String(state.customers.length));

  const pendingPreview = document.querySelector("#pendingPreview");
  const schedulePreview = document.querySelector("#schedulePreview");
  const customerPreview = document.querySelector("#customerPreview");

  if (pendingPreview) {
    pendingPreview.innerHTML = pending.length
      ? pending
          .map(
            (item) => `
              <div class="stack-item">
                <div class="stack-main">
                  <strong>${item.name}</strong>
                  <span>${item.service} • ${item.staff}</span>
                </div>
                <div class="stack-meta">
                  <span class="status-pill ${statusClass(item.status)}">${statusLabel(item.status)}</span>
                  <em>${formatDate(item.date)} • ${item.time}</em>
                </div>
              </div>
            `
          )
          .join("")
      : `<div class="stack-item"><div class="stack-main"><strong>Bekleyen talep yok</strong><span>Yeni form bırakıldığında burada görünür.</span></div></div>`;
  }

  if (schedulePreview) {
    schedulePreview.innerHTML = schedule
      .map(
        (item) => `
          <div class="stack-item">
            <div class="stack-main">
              <strong>${item.time} • ${item.name}</strong>
              <span>${item.service}</span>
            </div>
            <span class="status-pill ${statusClass(item.status)}">${statusLabel(item.status)}</span>
          </div>
        `
      )
      .join("");
  }

  if (customerPreview) {
    customerPreview.innerHTML = customers
      .map(
        (customer) => `
          <article class="customer-card">
            <div class="customer-brief">
              <strong>${customer.name}</strong>
              <span class="tag">${customer.loyalty}</span>
            </div>
            <p>${customer.favoriteService}</p>
            <div class="customer-meta">
              <span>${customer.visits} ziyaret</span>
              <span>${formatMoney(customer.spend)}</span>
            </div>
          </article>
        `
      )
      .join("");
  }

  const bookingForm = document.querySelector("#bookingForm");
  const formFeedback = document.querySelector("#formFeedback");
  setupBookingCalendar(state);
  if (bookingForm && bookingForm.dataset.bound !== "true") {
    bookingForm.dataset.bound = "true";
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(bookingForm);
      const appointment = {
        id: `apt-${Date.now()}`,
        name: formData.get("name")?.toString().trim(),
        phone: formData.get("phone")?.toString().trim(),
        service: formData.get("service")?.toString().trim(),
        staff: formData.get("staff")?.toString().trim(),
        date: formData.get("date")?.toString().trim(),
        time: formData.get("time")?.toString().trim(),
        profile: formData.get("profile")?.toString().trim(),
        visitType: formData.get("visitType")?.toString().trim(),
        notes: formData.get("notes")?.toString().trim(),
        expectation: formData.get("expectation")?.toString().trim(),
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      state.appointments.unshift(appointment);
      upsertCustomerFromAppointment(state, appointment);
      state.activity.unshift({
        title: "Yeni randevu talebi",
        detail: `${appointment.name} • ${appointment.service} • ${appointment.date} ${appointment.time}`,
      });
      saveState(state);
      bookingForm.reset();
      const calendarGrid = document.querySelector("#calendarGrid");
      calendarGrid?._resetBookingCalendar?.();

      if (formFeedback) {
        formFeedback.textContent =
          "Talep oluşturuldu. Admin panelinde onay bekleyenler listesine eklendi.";
      }

      renderMarketingPage(state);
    });
  }
}

function renderAdminPage(state) {
  if (!isAuthenticated()) {
    window.location.href = "./portal.html";
    return;
  }

  const pending = state.appointments.filter((item) => item.status === "pending");
  const schedule = getTodayAppointments(state);
  const returningCount = state.customers.filter((customer) => customer.visits > 1).length;
  const returningRate = state.customers.length
    ? Math.round((returningCount / state.customers.length) * 100)
    : 0;
  const revenue = state.appointments
    .filter((item) => item.status === "confirmed")
    .reduce((sum, item) => sum + servicePrice(item.service), 0);
  const occupancy = Math.round(
    state.staff.reduce((sum, person) => sum + person.occupancy, 0) / state.staff.length
  );
  const riskCount = state.customers.filter((customer) => customer.loyalty === "geri kazanım").length;
  const serviceSummary = summarizeServices(state.appointments);

  setText("#adminTodayBookings", String(state.appointments.length));
  setText("#adminPendingCount", String(pending.length));
  setText("#adminReturningRate", `%${returningRate}`);
  setText("#adminRevenue", formatMoney(revenue));
  setText("#adminOccupancy", `%${occupancy}`);
  setText("#adminRiskCount", String(riskCount));

  const pendingList = document.querySelector("#pendingList");
  const scheduleList = document.querySelector("#scheduleList");
  const customerList = document.querySelector("#customerList");
  const activityList = document.querySelector("#activityList");
  const teamList = document.querySelector("#teamList");
  const serviceInsights = document.querySelector("#serviceInsights");
  const loyaltyAdminList = document.querySelector("#loyaltyAdminList");
  const campaignIdeas = document.querySelector("#campaignIdeas");

  if (pendingList) {
    pendingList.innerHTML = pending.length
      ? pending
          .map(
            (item) => `
              <div class="stack-item">
                <div class="stack-main">
                  <strong>${item.name}</strong>
                  <span>${item.service} • ${item.staff}</span>
                  <span>${formatDate(item.date)} • ${item.time}</span>
                </div>
                <div class="action-row">
                  <span class="tag">${item.phone}</span>
                  <button class="chip-button approve" data-action="approve" data-id="${item.id}">Onayla</button>
                  <button class="chip-button reject" data-action="reject" data-id="${item.id}">Reddet</button>
                </div>
              </div>
            `
          )
          .join("")
      : `<div class="stack-item"><div class="stack-main"><strong>Bekleyen talep yok</strong><span>Tüm yeni talepler işlendi.</span></div></div>`;
  }

  if (scheduleList) {
    scheduleList.innerHTML = schedule
      .map(
        (item) => `
          <div class="stack-item">
            <div class="stack-main">
              <strong>${item.time} • ${item.name}</strong>
              <span>${item.service} • ${item.staff}</span>
              <span>${item.notes || "Ek not yok."}</span>
            </div>
            <div class="action-row">
              <span class="status-pill ${statusClass(item.status)}">${statusLabel(item.status)}</span>
              ${
                item.status === "confirmed"
                  ? `<button class="chip-button arrived" data-action="arrived" data-id="${item.id}">Geldi olarak işle</button>`
                  : ""
              }
            </div>
          </div>
        `
      )
      .join("");
  }

  if (customerList) {
    customerList.innerHTML = state.customers
      .map(
        (customer) => `
          <article class="customer-card">
            <div class="customer-brief">
              <strong>${customer.name}</strong>
              <span class="tag">${customer.loyalty}</span>
            </div>
            <p>${customer.favoriteService}</p>
            <div class="customer-meta">
              <span>${customer.visits} ziyaret</span>
              <span>Son: ${formatDate(customer.lastVisit)}</span>
            </div>
            <div class="customer-meta">
              <span>${formatMoney(customer.spend)}</span>
              <span>${customer.phone}</span>
            </div>
            <span>${customer.note}</span>
          </article>
        `
      )
      .join("");
  }

  if (teamList) {
    teamList.innerHTML = state.staff
      .map(
        (person) => `
          <div class="stack-item">
            <div class="stack-main">
              <strong>${person.name}</strong>
              <span>${person.role}</span>
              <span>Doluluk %${person.occupancy} • Sıradaki boşluk ${person.nextSlot}</span>
            </div>
            <div class="stack-meta">
              <span class="tag">${formatMoney(person.revenue)}</span>
              <em>${person.rating} puan</em>
            </div>
          </div>
        `
      )
      .join("");
  }

  if (activityList) {
    activityList.innerHTML = state.activity
      .slice(0, 6)
      .map(
        (item) => `
          <div class="note-item">
            <strong>${item.title}</strong>
            <span>${item.detail}</span>
          </div>
        `
      )
      .join("");
  }

  if (serviceInsights) {
    serviceInsights.innerHTML = serviceSummary
      .map(
        (item) => `
          <div class="note-item">
            <strong>${item.service}</strong>
            <span>${item.count} talep • ${formatMoney(item.revenue)} potansiyel ciro</span>
          </div>
        `
      )
      .join("");
  }

  if (loyaltyAdminList) {
    loyaltyAdminList.innerHTML = state.customers
      .slice(0, 4)
      .map(
        (customer) => `
          <article class="customer-card">
            <div class="customer-brief">
              <strong>${customer.name}</strong>
              <span class="tag">${customer.vipTier}</span>
            </div>
            <p>${customer.vipPoints} puan • ${customer.referrals} davet</p>
            <div class="customer-meta">
              <span>Ödül ilerlemesi %${customer.rewardProgress || 0}</span>
              <span>${customer.loyalty}</span>
            </div>
            <span>Bir sonraki ödül: ücretsiz bakım mini paketi</span>
          </article>
        `
      )
      .join("");
  }

  if (campaignIdeas) {
    campaignIdeas.innerHTML = [
      "Arkadaşını getirene 150 puan + mini bakım hediyesi",
      "3 işlem sonrası Silver, 6 işlem sonrası Gold seviye",
      "45 gün gelmeyene VIP dönüş kampanyası gönder",
      "Yorum bırakan müşteriye puan bonusu tanımla",
    ]
      .map(
        (item) => `
          <div class="note-item">
            <strong>Kampanya</strong>
            <span>${item}</span>
          </div>
        `
      )
      .join("");
  }

  document.body.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const { action, id } = button.dataset;
    const appointment = state.appointments.find((item) => item.id === id);
    if (!appointment) return;

    if (action === "approve") {
      appointment.status = "confirmed";
      state.activity.unshift({
        title: "Randevu onaylandı",
        detail: `${appointment.name} • ${appointment.date} ${appointment.time}`,
      });
    }

    if (action === "reject") {
      appointment.status = "cancelled";
      state.activity.unshift({
        title: "Randevu reddedildi",
        detail: `${appointment.name} için slot kapatıldı.`,
      });
    }

    if (action === "arrived") {
      appointment.status = "completed";
      const customer = state.customers.find((item) => item.phone === appointment.phone);
      if (customer) {
        customer.visits += 1;
        customer.lastVisit = appointment.date;
        customer.spend += servicePrice(appointment.service);
        customer.loyalty = customer.visits >= 5 ? "yüksek" : "orta";
        customer.vipPoints += Math.round(servicePrice(appointment.service) / 20);
        customer.vipTier = tierFromPoints(customer.vipPoints);
        customer.rewardProgress = Math.min((customer.rewardProgress || 0) + 35, 200);
      }

      state.activity.unshift({
        title: "Müşteri geldi olarak işlendi",
        detail: `${appointment.name} ziyareti tamamlandı.`,
      });
    }

    saveState(state);
    renderAdminPage(state);
  }, { once: true });

  const logoutButton = document.querySelector("#logoutButton");
  if (logoutButton && logoutButton.dataset.bound !== "true") {
    logoutButton.dataset.bound = "true";
    logoutButton.addEventListener("click", () => {
      setAuthenticated(false);
      window.location.href = "./portal.html";
    });
  }
}

function summarizeServices(appointments) {
  const totals = new Map();

  appointments.forEach((item) => {
    const existing = totals.get(item.service) || {
      service: item.service,
      count: 0,
      revenue: 0,
    };
    existing.count += 1;
    existing.revenue += servicePrice(item.service);
    totals.set(item.service, existing);
  });

  return [...totals.values()].sort((a, b) => b.count - a.count).slice(0, 4);
}

function renderPortalPage() {
  if (isAuthenticated()) {
    window.location.href = "./admin.html";
    return;
  }

  const portalForm = document.querySelector("#portalForm");
  const feedback = document.querySelector("#portalFeedback");
  if (!portalForm || portalForm.dataset.bound === "true") return;

  portalForm.dataset.bound = "true";
  portalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(portalForm);
    const email = formData.get("email")?.toString().trim().toLowerCase();
    const password = formData.get("password")?.toString().trim();

    if (email === demoCredentials.email && password === demoCredentials.password) {
      setAuthenticated(true);
      window.location.href = "./admin.html";
      return;
    }

    if (feedback) {
      feedback.textContent = "Giriş bilgileri eşleşmedi. Demo hesapla yeniden deneyin.";
      feedback.style.color = "var(--danger)";
    }
  });
}

function getCustomerProfile(state) {
  return (
    state.customers.find((customer) => customer.phone === customerCredentials.phone) ||
    state.customers[0] ||
    null
  );
}

function getCustomerAppointments(state, phone) {
  return state.appointments
    .filter((appointment) => appointment.phone === phone)
    .sort((a, b) => `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`));
}

function renderAccountPage() {
  if (isCustomerAuthenticated()) {
    window.location.href = "./customer.html";
    return;
  }

  const accountForm = document.querySelector("#accountForm");
  const feedback = document.querySelector("#accountFeedback");
  if (!accountForm || accountForm.dataset.bound === "true") return;

  accountForm.dataset.bound = "true";
  accountForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(accountForm);
    const email = formData.get("email")?.toString().trim().toLowerCase();
    const password = formData.get("password")?.toString().trim();

    if (email === customerCredentials.email && password === customerCredentials.password) {
      setCustomerAuthenticated(true);
      window.location.href = "./customer.html";
      return;
    }

    if (feedback) {
      feedback.textContent = "Giriş bilgileri eşleşmedi. Demo müşteri hesabıyla deneyin.";
      feedback.style.color = "var(--danger)";
    }
  });
}

function renderCustomerPage(state) {
  if (!isCustomerAuthenticated()) {
    window.location.href = "./account.html";
    return;
  }

  const customer = getCustomerProfile(state);
  if (!customer) return;

  const appointments = getCustomerAppointments(state, customer.phone);
  const upcoming = appointments.find((appointment) =>
    appointment.status === "confirmed" || appointment.status === "pending"
  );
  const history = appointments.filter(
    (appointment) => appointment.status === "completed" || appointment.status === "confirmed"
  );
  const favoriteStaff = appointments[0]?.staff || "Melis";
  const rewardsContainer = document.querySelector("#customerRewards");
  const referralContainer = document.querySelector("#customerReferral");

  setText("#customerNextTime", upcoming ? `${formatDate(upcoming.date)} • ${upcoming.time}` : "Plan yok");
  setText("#customerNextService", upcoming ? upcoming.service : "Yeni rezervasyon öner");
  setText("#customerVisitCount", String(customer.visits));
  setText("#customerFavoriteService", customer.favoriteService || "-");
  setText("#customerFavoriteStaff", favoriteStaff);
  setText("#customerVipPoints", String(customer.vipPoints || 0));
  setText("#customerVipTier", `${customer.vipTier || "Bronze"} seviye`);
  setText("#customerReferralCount", String(customer.referrals || 0));

  const upcomingContainer = document.querySelector("#customerUpcoming");
  const historyContainer = document.querySelector("#customerHistory");
  const careContainer = document.querySelector("#customerCare");
  const actionContainer = document.querySelector("#customerActions");

  if (upcomingContainer) {
    upcomingContainer.innerHTML = upcoming
      ? `
        <div class="stack-item">
          <div class="stack-main">
            <strong>${upcoming.service}</strong>
            <span>${formatDate(upcoming.date)} • ${upcoming.time}</span>
            <span>Uzman: ${upcoming.staff}</span>
          </div>
          <div class="action-row">
            <span class="status-pill ${statusClass(upcoming.status)}">${statusLabel(upcoming.status)}</span>
            <span class="tag">${customer.phone}</span>
          </div>
        </div>
      `
      : `
        <div class="stack-item">
          <div class="stack-main">
            <strong>Yaklaşan randevu yok</strong>
            <span>Yeni rezervasyon için işletmeyle iletişime geçebilirsin.</span>
          </div>
        </div>
      `;
  }

  if (historyContainer) {
    historyContainer.innerHTML = history.slice(0, 4)
      .map(
        (appointment) => `
          <article class="customer-card">
            <div class="customer-brief">
              <strong>${appointment.service}</strong>
              <span class="tag">${appointment.staff}</span>
            </div>
            <p>${formatDate(appointment.date)} • ${appointment.time}</p>
            <div class="customer-meta">
              <span>${statusLabel(appointment.status)}</span>
              <span>${formatMoney(servicePrice(appointment.service))}</span>
            </div>
            <span>${appointment.notes || "Not eklenmedi."}</span>
          </article>
        `
      )
      .join("");
  }

  if (careContainer) {
    careContainer.innerHTML = [
      {
        title: "Bakım önerisi",
        detail: `${customer.favoriteService} sonrası 3-4 hafta içinde kontrol bakımı önerilir.`,
      },
      {
        title: "Favori uzman",
        detail: `${favoriteStaff} ile benzer saatlerde tekrar rezervasyon daha hızlı tamamlanır.`,
      },
      {
        title: "Yorum fırsatı",
        detail: "Son işleminden memnun kaldıysan Google yorum bırakman istenebilir.",
      },
      {
        title: "VIP puan fırsatı",
        detail: "Tekrar rezervasyon ve arkadaş daveti ile daha hızlı ödül açılır.",
      },
    ]
      .map(
        (item) => `
          <div class="note-item">
            <strong>${item.title}</strong>
            <span>${item.detail}</span>
          </div>
        `
      )
      .join("");
  }

  if (actionContainer) {
    actionContainer.innerHTML = [
      "Aynı uzmanla tekrar randevu al",
      "Bakım paketi sor",
      "İşlem sonrası yorum bırak",
      "WhatsApp'tan salonla konuş",
    ]
      .map(
        (item) => `
          <div class="note-item">
            <strong>${item}</strong>
            <span>Bu aksiyon müşteri panelinden tek tıkla çalışacak şekilde ürünleştirilebilir.</span>
          </div>
        `
      )
      .join("");
  }

  if (rewardsContainer) {
    rewardsContainer.innerHTML = [
      `Şu an ${customer.vipPoints || 0} VIP puanın var.`,
      `${customer.vipTier || "Bronze"} seviyedesin; bir üst seviyede öncelikli slot açılır.`,
      `Ödül ilerlemen %${customer.rewardProgress || 0}. 100%'de ücretsiz bakım hediyesi.`,
      "Yorum bırakırsan veya arkadaş getirirsen ekstra puan kazanırsın.",
    ]
      .map(
        (item) => `
          <div class="note-item">
            <strong>VIP Kulübü</strong>
            <span>${item}</span>
          </div>
        `
      )
      .join("");
  }

  if (referralContainer) {
    referralContainer.innerHTML = [
      `Kişisel davet kodun: LUNA-${customer.name.split(" ")[0].toUpperCase()}`,
      `${customer.referrals || 0} arkadaş sisteme geldi.`,
      "Her yeni üye için 150 puan ve mini hediye açılır.",
      "3 başarılı davette özel bakım veya indirim paketi tanımlanır.",
    ]
      .map(
        (item) => `
          <div class="note-item">
            <strong>Davet sistemi</strong>
            <span>${item}</span>
          </div>
        `
      )
      .join("");
  }

  const logoutButton = document.querySelector("#customerLogoutButton");
  if (logoutButton && logoutButton.dataset.bound !== "true") {
    logoutButton.dataset.bound = "true";
    logoutButton.addEventListener("click", () => {
      setCustomerAuthenticated(false);
      window.location.href = "./account.html";
    });
  }
}

function setupBookingCalendar(state) {
  const calendarGrid = document.querySelector("#calendarGrid");
  const slotGrid = document.querySelector("#slotGrid");
  const calendarLabel = document.querySelector("#calendarLabel");
  const selectedDateInput = document.querySelector("#selectedDateInput");
  const selectedTimeInput = document.querySelector("#selectedTimeInput");
  const summary = document.querySelector("#bookingSummary");
  const prevMonth = document.querySelector("#prevMonth");
  const nextMonth = document.querySelector("#nextMonth");
  if (!calendarGrid || !slotGrid || !calendarLabel || !selectedDateInput || !selectedTimeInput) return;
  if (calendarGrid.dataset.bound === "true") {
    calendarGrid._refreshBookingCalendar?.();
    return;
  }
  calendarGrid.dataset.bound = "true";

  const viewState = {
    monthOffset: 0,
    selectedDate: "",
    selectedTime: "",
  };

  const baseDate = new Date("2026-05-01T00:00:00");

  function availableSlots(dateText) {
    const all = ["09:30", "10:30", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"];
    const busy = state.appointments
      .filter((item) => item.date === dateText && item.status !== "cancelled")
      .map((item) => item.time);
    return all.filter((slot) => !busy.includes(slot));
  }

  function renderSlots() {
    const slots = viewState.selectedDate ? availableSlots(viewState.selectedDate) : [];
    slotGrid.innerHTML = slots.length
      ? slots
          .map(
            (slot) => `
              <button class="slot-button ${viewState.selectedTime === slot ? "is-selected" : ""}" type="button" data-slot="${slot}">
                <strong>${slot}</strong>
              </button>
            `
          )
          .join("")
      : `<div class="note-item"><strong>Önce gün seç</strong><span>Müsait saatler burada görünür.</span></div>`;
  }

  function renderSummary() {
    if (!summary) return;
    summary.textContent =
      viewState.selectedDate && viewState.selectedTime
        ? `${formatDate(viewState.selectedDate)} tarihinde ${viewState.selectedTime} için talep oluşturulacak. Bu gün için ${
            availableSlots(viewState.selectedDate).length
          } müsait slot var.`
        : "Tarih ve saat seçildiğinde kısa özet burada görünür.";
  }

  function renderCalendar() {
    const current = new Date(baseDate);
    current.setMonth(baseDate.getMonth() + viewState.monthOffset);
    const year = current.getFullYear();
    const month = current.getMonth();
    calendarLabel.textContent = new Intl.DateTimeFormat("tr-TR", {
      month: "long",
      year: "numeric",
    }).format(current);

    const firstDay = new Date(year, month, 1);
    const startIndex = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];

    for (let i = 0; i < startIndex; i += 1) {
      cells.push(`<div class="day-cell is-empty"></div>`);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const dateText = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const slotCount = availableSlots(dateText).length;
      cells.push(`
        <button class="day-cell ${viewState.selectedDate === dateText ? "is-selected" : ""} ${
          slotCount <= 3 ? "is-busy" : ""
        }" type="button" data-date="${dateText}">
          <strong>${day}</strong>
          <small>${slotCount} slot</small>
        </button>
      `);
    }

    calendarGrid.innerHTML = cells.join("");
    renderSlots();
    renderSummary();
    selectedDateInput.value = viewState.selectedDate;
    selectedTimeInput.value = viewState.selectedTime;
  }

  calendarGrid._refreshBookingCalendar = renderCalendar;
  calendarGrid._resetBookingCalendar = () => {
    viewState.selectedDate = "";
    viewState.selectedTime = "";
    selectedDateInput.value = "";
    selectedTimeInput.value = "";
    renderCalendar();
  };

  calendarGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-date]");
    if (!button) return;
    viewState.selectedDate = button.dataset.date || "";
    viewState.selectedTime = "";
    renderCalendar();
  });

  slotGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-slot]");
    if (!button) return;
    viewState.selectedTime = button.dataset.slot || "";
    selectedTimeInput.value = viewState.selectedTime;
    renderSlots();
    renderSummary();
  });

  prevMonth?.addEventListener("click", () => {
    viewState.monthOffset -= 1;
    viewState.selectedDate = "";
    viewState.selectedTime = "";
    renderCalendar();
  });

  nextMonth?.addEventListener("click", () => {
    viewState.monthOffset += 1;
    viewState.selectedDate = "";
    viewState.selectedTime = "";
    renderCalendar();
  });

  renderCalendar();
}

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
}

function setupRevealAnimation() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

const state = loadState();
const page = document.body.dataset.page;

if (page === "marketing") {
  renderMarketingPage(state);
}

if (page === "admin") {
  renderAdminPage(state);
}

if (page === "portal") {
  renderPortalPage();
}

if (page === "account") {
  renderAccountPage();
}

if (page === "customer") {
  renderCustomerPage(state);
}

setupRevealAnimation();
