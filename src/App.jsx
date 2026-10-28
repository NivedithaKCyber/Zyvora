import { useState, useEffect } from "react";
import "./App.css";

const platforms = [
  {
    id: 1,
    name: "Savana",
    category: "Fashion",
    description: "Discover trending styles and everyday fashion.",
    url: "https://www.savana.com/",
    image:
      "/logos/savana.png",
    label: "TRENDING FASHION",
  },
  {
    id: 2,
    name: "Nykaa",
    category: "Beauty",
    description: "Explore makeup, skincare and beauty essentials.",
    url: "https://www.nykaa.com/",
    image:
      "/logos/nykaa.png",
    label: "BEAUTY & SKINCARE",
  },
  {
    id: 3,
    name: "Purplle",
    category: "Beauty",
    description: "Find beauty products for your everyday routine.",
    url: "https://www.purplle.com/",
    image:

      "/logos/purple.png",
    label: "BEAUTY DISCOVERY",
  },
  {
    id: 4,
    name: "Myntra",
    category: "Fashion",
    description: "Explore fashion, footwear and accessories.",
    url: "https://www.myntra.com/",
    image:
      "/logos/myntra.png",
    label: "STYLE & FASHION",
  },
  {
    id: 5,
    name: "AJIO",
    category: "Fashion",
    description: "Discover contemporary fashion and lifestyle styles.",
    url: "https://www.ajio.com/",
    image:
      "/logos/ajio.png",
    label: "FASHION FINDS",
  },
  {
    id: 6,
    name: "H&M",
    category: "Fashion",
    description: "Explore modern clothing and everyday essentials.",
    url: "https://www2.hm.com/en_in/index.html",
    image:
      "/logos/hm.png",
    label: "MODERN WARDROBE",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [shieldUrl, setShieldUrl] = useState("");
  const [shieldReport, setShieldReport] = useState(null);
  const [category, setCategory] = useState("All");
  // 🔔 Smart Shopping Notifications
const [notifications, setNotifications] = useState([]);
const [showNotifications, setShowNotifications] = useState(false);
function addNotification(message, type = "success") {
  const notification = {
    id: Date.now() + Math.random(),
    message,
    type,
  };

  setNotifications((current) =>
    [notification, ...current].slice(0, 10)
  );
}

function removeNotification(id) {
  setNotifications((current) =>
    current.filter((notification) => notification.id !== id)
  );
}
  // 🤖 Smart Shopping Assistant
const [assistantCategory, setAssistantCategory] = useState("Fashion");
const [assistantNeed, setAssistantNeed] = useState("Everyday wear");
const [assistantBudget, setAssistantBudget] = useState("2000");
const [assistantResults, setAssistantResults] = useState(null);
 const [favorites, setFavorites] = useState(() => {
  const savedFavorites = localStorage.getItem("zyvora-favorites");
  return savedFavorites ? JSON.parse(savedFavorites) : [];
});
const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("zyvora-dark-mode") === "true";
});
const [recentlyVisited, setRecentlyVisited] = useState(() => {
  const saved = localStorage.getItem("zyvora-recently-visited");
  return saved ? JSON.parse(saved) : [];
});
const [shoppingList, setShoppingList] = useState(() => {
  const savedList = localStorage.getItem("zyvora-shopping-list");
  return savedList ? JSON.parse(savedList) : [];
});

const [newItem, setNewItem] = useState("");
const [budget, setBudget] = useState(() => {
  const savedBudget = localStorage.getItem("zyvora-budget");
  return savedBudget ? Number(savedBudget) : 5000;
});

const [plannedPurchases, setPlannedPurchases] = useState(() => {
  const savedPurchases = localStorage.getItem("zyvora-planned-purchases");
  return savedPurchases ? JSON.parse(savedPurchases) : [];
});

const [purchaseName, setPurchaseName] = useState("");
const [purchasePrice, setPurchasePrice] = useState("");
// 🎁 Cashback & Rewards
const [cashbackAmount, setCashbackAmount] = useState("");
const [cashbackRate, setCashbackRate] = useState("5");
const [rewardName, setRewardName] = useState("");
const [rewardValue, setRewardValue] = useState("");
const [rewards, setRewards] = useState(() => {
  const savedRewards = localStorage.getItem("zyvora-rewards");
  return savedRewards ? JSON.parse(savedRewards) : [];
});
// 💰 Calculate total planned spending
const totalSpending = plannedPurchases.reduce(
  (total, purchase) => total + purchase.price,
  0
);

// 💵 Calculate remaining budget
const remainingBudget = budget - totalSpending;
// 🎁 Calculate estimated cashback
const estimatedCashback =
  Number(cashbackAmount) * (Number(cashbackRate) / 100);

const totalRewards = rewards.reduce(
  (total, reward) => total + reward.amount,
  0
);

  const filteredPlatforms = platforms.filter((platform) => {
    const matchesSearch = (
      platform.name +
      " " +
      platform.category +
      " " +
      platform.description
    )
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesCategory =
      category === "All" || platform.category === category;

    return matchesSearch && matchesCategory;
  });

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }
  // 🤖 Generate shopping recommendations
function findShoppingRecommendations() {
  const amount = Number(assistantBudget);

  if (
    assistantBudget.trim() === "" ||
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    alert("Please enter a valid shopping budget.");
    return;
  }

  const results = platforms.filter((platform) => {
    const matchesCategory =
      platform.category === assistantCategory;

    const matchesNeed =
      assistantNeed === "Everything" ||
      (assistantNeed === "Everyday wear" &&
        platform.category === "Fashion") ||
      (assistantNeed === "Makeup" &&
        platform.name === "Nykaa") ||
      (assistantNeed === "Skincare" &&
        platform.category === "Beauty") ||
      (assistantNeed === "Clothing" &&
        platform.category === "Fashion") ||
      (assistantNeed === "Footwear" &&
        ["Myntra", "AJIO"].includes(platform.name));

    return matchesCategory && matchesNeed;
  });

  setAssistantResults(results);
}
  function recordVisit(platform) {
  setRecentlyVisited((current) => [
    platform.id,
    ...current.filter((id) => id !== platform.id),
  ].slice(0, 5));
}
function addShoppingItem() {
  const item = newItem.trim();

  if (item === "") return;

  setShoppingList((current) => [
    ...current,
    {
      id: Date.now(),
      name: item,
      purchased: false,
    },
  ]);

  setNewItem("");

  // 🔔 Show notification
  addNotification(`"${item}" added to your shopping list! 🛍️`);
}
function removeShoppingItem(id) {
  setShoppingList((current) =>
    current.filter((item) => item.id !== id)
  );
}

function togglePurchased(id) {
  setShoppingList((current) =>
    current.map((item) =>
      item.id === id
        ? { ...item, purchased: !item.purchased }
        : item
    )
  );
}
// 💰 Add a planned purchase
function addPlannedPurchase() {
  const name = purchaseName.trim();
  const price = Number(purchasePrice);

  if (name === "" || purchasePrice.trim() === "" || !Number.isFinite(price) || price <= 0) {
    alert("Please enter an item name and a valid price.");
    return;
  }

  setPlannedPurchases((current) => [
    ...current,
    {
      id: Date.now(),
      name,
      price,
    },
  ]);

  setPurchaseName("");
  setPurchasePrice("");
}

// 🗑️ Remove a planned purchase
function removePlannedPurchase(id) {
  setPlannedPurchases((current) =>
    current.filter((purchase) => purchase.id !== id)
  );
}
function addReward() {
  const name = rewardName.trim();
  const amount = Number(rewardValue);

  if (
    name === "" ||
    rewardValue.trim() === "" ||
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    alert("Please enter a reward name and a valid amount.");
    return;
  }

  setRewards((current) => [
    ...current,
    {
      id: Date.now(),
      name,
      amount,
    },
  ]);

  setRewardName("");
  setRewardValue("");
}
function removeReward(id) {
  setRewards((current) =>
    current.filter((reward) => reward.id !== id)
  );
}
  useEffect(() => {
  localStorage.setItem("zyvora-favorites", JSON.stringify(favorites));
}, [favorites]);
useEffect(() => {
  localStorage.setItem("zyvora-dark-mode", darkMode);
}, [darkMode]);
useEffect(() => {
  localStorage.setItem(
    "zyvora-recently-visited",
    JSON.stringify(recentlyVisited)
  );
}, [recentlyVisited]);
useEffect(() => {
  localStorage.setItem(
    "zyvora-shopping-list",
    JSON.stringify(shoppingList)
  );
}, [shoppingList]);
// 💰 Save Budget
useEffect(() => {
  localStorage.setItem("zyvora-budget", String(budget));
}, [budget]);

// 🛍️ Save Planned Purchases
useEffect(() => {
  localStorage.setItem(
    "zyvora-planned-purchases",
    JSON.stringify(plannedPurchases)
  );
}, [plannedPurchases]);
// 🎁 Save Cashback & Rewards
useEffect(() => {
  localStorage.setItem(
    "zyvora-rewards",
    JSON.stringify(rewards)
  );
}, [rewards]);
  function analyseShoppingUrl() {
    const raw = shieldUrl.trim();

    if (!raw) {
      setShieldReport({ error: "Paste a website link to analyse it." });
      return;
    }

    let parsed;
    try {
      parsed = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    } catch {
      setShieldReport({ error: "This does not look like a valid web address. Check the spelling and try again." });
      return;
    }

    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      setShieldReport({ error: "Please enter a website address beginning with http:// or https://." });
      return;
    }

    const host = parsed.hostname.toLowerCase();
    const warnings = [];
    let riskScore = 0;

    if (parsed.protocol !== "https:") {
      warnings.push({ title: "HTTPS encryption is missing", detail: "The link does not use HTTPS. Avoid entering sensitive information on an unencrypted connection.", points: 25 });
      riskScore += 25;
    }
    if (parsed.username || parsed.password) {
      warnings.push({ title: "Unusual login information in the URL", detail: "The address contains username or password syntax that may disguise the real destination.", points: 30 });
      riskScore += 30;
    }
    if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) {
      warnings.push({ title: "IP address used instead of a domain", detail: "The website uses a numeric IP address. Verify the destination before trusting it.", points: 25 });
      riskScore += 25;
    }
    if (host.split(".").some((part) => part.startsWith("xn--"))) {
      warnings.push({ title: "Internationalised domain detected", detail: "Some internationalised domain names can imitate familiar website names. Inspect the domain carefully.", points: 30 });
      riskScore += 30;
    }
    if (host.split(".").length >= 5) {
      warnings.push({ title: "Unusually many subdomains", detail: "The address contains several subdomain levels. Check which domain actually controls the website.", points: 15 });
      riskScore += 15;
    }
    if (host.includes("-") && /(nykaa|myntra|ajio|purplle|savana|hm)/i.test(host)) {
      warnings.push({ title: "Possible retailer impersonation pattern", detail: "The hostname contains a familiar retailer name alongside extra domain text. Compare it with the retailer's official domain.", points: 25 });
      riskScore += 25;
    }
    if (parsed.href.length > 180) {
      warnings.push({ title: "Unusually long URL", detail: "Long URLs are not necessarily malicious, but inspect unexpected parameters and redirects carefully.", points: 10 });
      riskScore += 10;
    }

    riskScore = Math.min(100, riskScore);
    let level;
    let recommendation;
    if (riskScore >= 50) {
      level = "High risk indicators";
      recommendation = "Do not enter passwords or payment details until you independently verify the website through its official domain.";
    } else if (riskScore >= 20) {
      level = "Medium risk indicators";
      recommendation = "Review the warnings carefully. Confirm the domain using the retailer's official website before shopping.";
    } else {
      level = "Low risk indicators";
      recommendation = "No major warning patterns were detected by these checks. This does not prove the website is legitimate or safe.";
    }

    setShieldReport({
      host,
      warnings,
      riskScore,
      level,
      recommendation,
      detail: warnings.length > 0
        ? "One or more URL patterns deserve a closer look."
        : "No warning patterns covered by this basic check were detected.",
    });
  }

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <div className="announcement">
        YOUR WORLD OF FASHION & BEAUTY — ALL IN ONE PLACE
      </div>

      <header className="navbar">
        <a className="logo" href="#home">
          zy<span>vora</span>
          <span className="logo-dot">.</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#platforms">Explore</a>
          <a href="#zyvora-shield">Shield</a>
          <a href="#about">About</a>
        </nav>

        <a className="wishlist-link" href="#platforms">
          ♡ Favorites ({favorites.length})
        </a>
        <button
  className="theme-toggle"
  onClick={() => setDarkMode((current) => !current)}
  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
>
  {darkMode ? "☀️ Light" : "🌙 Dark"}
</button>
<button
  className="notification-toggle"
  onClick={() => setShowNotifications((current) => !current)}
>
  🔔 Notifications ({notifications.length})
</button>
      </header>
{showNotifications && (
  <section className="notification-panel" aria-live="polite">
    <div className="notification-heading">
      <h2>🔔 Notifications</h2>

      <button
        type="button"
        onClick={() => setShowNotifications(false)}
      >
        ✕
      </button>
    </div>

    {notifications.length === 0 ? (
      <p>No notifications yet. Your shopping updates will appear here!</p>
    ) : (
      <div className="notification-list">
        {notifications.map((notification) => (
          <div
            className={`notification-item ${notification.type}`}
            key={notification.id}
          >
            <span>{notification.message}</span>

            <button
              type="button"
              onClick={() => removeNotification(notification.id)}
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    )}
  </section>
)}
      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">WELCOME TO zyvora</p>

            <h1>
              Your world.
              <br />
              <span>Your style.</span>
            </h1>

            <p className="hero-description">
              Discover your favorite shopping platforms in one place.
              Explore fashion, beauty and everything in between.
            </p>

            <a className="hero-button" href="#platforms">
              Explore platforms <span>↗</span>
            </a>

            <p className="hero-note">
              DISCOVER · EXPLORE · SHOP
            </p>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200"
              alt="Fashion shopping inspiration"
            />

            <div className="image-caption">
              <span>YOUR NEXT DISCOVERY</span>
              <span>zyvora</span>
            </div>
          </div>
        </section>
<section className="recent-section">
  <h2>🕘 Recently Visited</h2>

  {recentlyVisited.length === 0 ? (
    <p>You haven't visited any platforms yet.</p>
  ) : (
    <div className="recent-list">
      {recentlyVisited.map((id) => {
        const platform = platforms.find((item) => item.id === id);

        if (!platform) return null;

        return (
          <a
            key={platform.id}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => recordVisit(platform)}
          >
            {platform.name} ↗
          </a>
        );
      })}
    </div>
  )}
</section>
{/* 🤖 SMART SHOPPING ASSISTANT */}
<section className="shopping-assistant" id="shopping-assistant">
  <div className="assistant-heading">
    <p className="section-label">YOUR PERSONAL SHOPPING GUIDE</p>

    <h2>Meet your Smart Shopping Assistant ✨</h2>

    <p>
      Tell us what you're looking for, choose your budget,
      and discover shopping platforms that match your interests.
    </p>
  </div>

  <div className="assistant-form">
    <label htmlFor="assistant-category">
      What would you like to explore?
    </label>

    <select
      id="assistant-category"
      value={assistantCategory}
      onChange={(event) => {
        setAssistantCategory(event.target.value);
        setAssistantResults(null);
      }}
    >
      <option value="Fashion">Fashion</option>
      <option value="Beauty">Beauty</option>
    </select>

    <label htmlFor="assistant-need">
      What are you looking for?
    </label>

    <select
      id="assistant-need"
      value={assistantNeed}
      onChange={(event) => {
        setAssistantNeed(event.target.value);
        setAssistantResults(null);
      }}
    >
      <option value="Everyday wear">Everyday wear</option>
      <option value="Clothing">Clothing</option>
      <option value="Footwear">Footwear</option>
      <option value="Makeup">Makeup</option>
      <option value="Skincare">Skincare</option>
      <option value="Everything">Explore everything</option>
    </select>

    <label htmlFor="assistant-budget">
      Your budget (₹)
    </label>

    <input
      id="assistant-budget"
      type="number"
      min="1"
      placeholder="Enter your budget"
      value={assistantBudget}
      onChange={(event) => {
        setAssistantBudget(event.target.value);
        setAssistantResults(null);
      }}
    />

    <button
      type="button"
      onClick={findShoppingRecommendations}
    >
      Find My Shopping Platforms ✨
    </button>
  </div>

  {assistantResults !== null && (
    <div className="assistant-results" aria-live="polite">
      <h3>Your Shopping Recommendations</h3>

      {assistantResults.length === 0 ? (
        <p>
          We couldn't find a matching platform for that combination.
          Try another category or shopping preference.
        </p>
      ) : (
        <>
          <p>
            We found {assistantResults.length} platform
            {assistantResults.length === 1 ? "" : "s"}
            {" "}to explore!
          </p>

          <div className="assistant-platforms">
            {assistantResults.map((platform) => (
              <article
                className="assistant-platform-card"
                key={platform.id}
              >
                <img
                  src={platform.image}
                  alt={`${platform.name} logo`}
                />

                <h4>{platform.name}</h4>

                <p>{platform.description}</p>

                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => recordVisit(platform)}
                >
                  Explore Platform ↗
                </a>
              </article>
            ))}
          </div>
        </>
      )}

      <p className="assistant-budget-note">
        Your budget is ₹
        {Number(assistantBudget).toLocaleString("en-IN")}.
        Recommendations are based on platform categories, not live
        product prices or availability.
      </p>
    </div>
  )}
</section>
{/* SHOPPING LIST */}
<section className="shopping-section">
  <h2>🛍️ My Shopping List</h2>
  <p>Add products you want to buy later.</p>

  <div className="shopping-input">
    <input
      type="text"
      placeholder="Enter an item..."
      value={newItem}
      onChange={(event) => setNewItem(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") addShoppingItem();
      }}
    />

    <button onClick={addShoppingItem}>
      + Add Item
    </button>
  </div>

  {shoppingList.length === 0 ? (
    <p>Your shopping list is empty. Add your first item!</p>
  ) : (
    <div className="shopping-items">
      {shoppingList.map((item) => (
        <div className="shopping-item" key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={item.purchased}
              onChange={() => togglePurchased(item.id)}
            />

            <span
              className={item.purchased ? "purchased" : ""}
            >
              {item.name}
            </span>
          </label>

          <button
            className="remove-item"
            onClick={() => removeShoppingItem(item.id)}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  )}
</section>
{/* 💰 BUDGET PLANNER */}
<section className="budget-section">
  <h2>💰 My Shopping Budget</h2>
  <p>Plan your purchases and keep track of your spending.</p>

  <div className="budget-setting">
    <label htmlFor="shopping-budget">Your Budget (₹)</label>

    <input
      id="shopping-budget"
      type="number"
      min="0"
      value={budget}
      onChange={(event) =>
        setBudget(Math.max(0, Number(event.target.value) || 0))
      }
    />
  </div>

  <div className="budget-summary">
    <div className="budget-card">
      <span>Total Budget</span>
      <strong>₹{budget.toLocaleString("en-IN")}</strong>
    </div>

    <div className="budget-card">
      <span>Planned Spending</span>
      <strong>₹{totalSpending.toLocaleString("en-IN")}</strong>
    </div>

    <div className="budget-card">
      <span>Remaining Budget</span>
      <strong className={remainingBudget < 0 ? "over-budget" : ""}>
        ₹{remainingBudget.toLocaleString("en-IN")}
      </strong>
    </div>
  </div>

  <h3>Add a Planned Purchase</h3>

  <div className="purchase-input">
    <input
      type="text"
      placeholder="Item name (e.g. Shoes)"
      value={purchaseName}
      onChange={(event) => setPurchaseName(event.target.value)}
    />

    <input
      type="number"
      min="0"
      step="0.01"
      placeholder="Price (₹)"
      value={purchasePrice}
      onChange={(event) => setPurchasePrice(event.target.value)}
    />

    <button onClick={addPlannedPurchase}>
      + Add Purchase
    </button>
  </div>

  <div className="planned-purchases">
    {plannedPurchases.length === 0 ? (
      <p>No planned purchases yet. Add your first item!</p>
    ) : (
      plannedPurchases.map((purchase) => (
        <div className="planned-purchase" key={purchase.id}>
          <span>{purchase.name}</span>

          <strong>
            ₹{purchase.price.toLocaleString("en-IN")}
          </strong>

          <button
            onClick={() => removePlannedPurchase(purchase.id)}
            aria-label={`Remove ${purchase.name}`}
            title="Remove purchase"
          >
            🗑️
          </button>
        </div>
      ))
    )}
  </div>

  {remainingBudget < 0 && (
  <p className="budget-warning">
    ⚠️ You've exceeded your shopping budget!
  </p>
)}

{remainingBudget >= 0 && budget > 0 && totalSpending >= budget * 0.8 && (
  <p className="budget-warning">
    ⚠️ You've used at least 80% of your shopping budget!
  </p>
)}
</section>
{/* 🎁 CASHBACK & REWARDS */}
<section className="rewards-section">
  <h2>🎁 Cashback & Rewards</h2>

  <p>
    Estimate potential cashback and track rewards you've received.
  </p>

  {/* CASHBACK CALCULATOR */}
  <div className="cashback-calculator">
    <h3>Cashback Calculator</h3>

    <label htmlFor="cashback-amount">
      Purchase Amount (₹)
    </label>

    <input
      id="cashback-amount"
      type="number"
      min="0"
      placeholder="Enter purchase amount"
      value={cashbackAmount}
      onChange={(event) => setCashbackAmount(event.target.value)}
    />

    <label htmlFor="cashback-rate">
      Estimated Cashback Rate (%)
    </label>

    <input
      id="cashback-rate"
      type="number"
      min="0"
      max="100"
      value={cashbackRate}
      onChange={(event) => setCashbackRate(event.target.value)}
    />

    <div className="cashback-result">
      <span>Estimated Cashback</span>

      <strong>
        ₹
        {(
          Number.isFinite(estimatedCashback)
            ? estimatedCashback
            : 0
        ).toLocaleString("en-IN", {
          maximumFractionDigits: 2,
        })}
      </strong>
    </div>

    <p className="rewards-note">
      This is an estimate, not a guaranteed cashback offer or payment.
    </p>
  </div>

  {/* REWARDS TRACKER */}
  <div className="rewards-tracker">
    <h3>My Rewards Tracker</h3>

    <p>
      Total rewards received:
      <strong>
        {" "}₹{totalRewards.toLocaleString("en-IN")}
      </strong>
    </p>

    <div className="reward-input">
      <input
        type="text"
        placeholder="Reward name (e.g. Nykaa cashback)"
        value={rewardName}
        onChange={(event) => setRewardName(event.target.value)}
      />

      <input
        type="number"
        min="0.01"
        step="0.01"
        placeholder="Amount received (₹)"
        value={rewardValue}
        onChange={(event) => setRewardValue(event.target.value)}
      />

      <button onClick={addReward}>
        + Add Reward
      </button>
    </div>

    {rewards.length === 0 ? (
      <p>No rewards recorded yet.</p>
    ) : (
      <div className="reward-list">
        {rewards.map((reward) => (
          <div className="reward-item" key={reward.id}>
            <span>{reward.name}</span>

            <strong>
              ₹{reward.amount.toLocaleString("en-IN")}
            </strong>

            <button
              onClick={() => removeReward(reward.id)}
              aria-label={`Remove ${reward.name}`}
              title="Remove reward"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
</section>
        <section className="shield-section" id="zyvora-shield">
          <div className="shield-intro">
            <span className="shield-icon" aria-hidden="true">🛡️</span>
            <p className="eyebrow">SHOPPING SAFETY TOOL</p>
            <h2>Check a link before you shop.</h2>
            <p>Paste a shopping URL to check for a few common warning signs. Your link is analysed in this browser; it is not sent to a security service.</p>
          </div>
          <form className="shield-form" onSubmit={(event) => { event.preventDefault(); analyseShoppingUrl(); }}>
            <label htmlFor="shield-url">Shopping website URL</label>
            <div className="shield-input-row">
              <input id="shield-url" type="text" inputMode="url" autoComplete="url" placeholder="https://example.com" value={shieldUrl} onChange={(event) => { setShieldUrl(event.target.value); setShieldReport(null); }} />
              <button type="submit">Analyse link ↗</button>
            </div>
            <p className="shield-privacy">🔒 Basic pattern checks only · No website is guaranteed safe</p>
          </form>
          {shieldReport && (
            <div className={`shield-report ${shieldReport.error ? "shield-error" : ""}`} aria-live="polite">
              {shieldReport.error ? <p>{shieldReport.error}</p> : <>
                <div className="shield-report-heading"><span>Analysis for</span><strong>{shieldReport.host}</strong></div>
                <div className="shield-risk-score">
                  <div className="shield-score-number">{shieldReport.riskScore}<span>/100</span></div>
                  <div className="shield-score-details">
                    <h3>{shieldReport.level}</h3>
                    <p>Heuristic URL risk score — not a confirmed security verdict.</p>
                  </div>
                </div>
                <p>{shieldReport.detail}</p>
                {shieldReport.warnings.length > 0 ? (
                  <ul className="shield-warning-list">
                    {shieldReport.warnings.map((warning, index) => (
                      <li key={index}>
                        <strong>{warning.title}</strong>
                        <p>{warning.detail}</p>
                        <span>Risk points: +{warning.points}</span>
                      </li>
                    ))}
                  </ul>
                ) : <p className="shield-no-warning">✓ No obvious warning patterns were detected by this basic check.</p>}
                <div className="shield-recommendation">
                  <strong>🛡️ Safety recommendation</strong>
                  <p>{shieldReport.recommendation}</p>
                </div>
                <p className="shield-disclaimer">This is not a reputation lookup or malware scan. Check the domain carefully and never enter passwords or payment details if you are unsure.</p>
              </>}
            </div>
          )}
        </section>

        <section className="discover-section" id="platforms">
          <div className="section-heading">
            <div>
              <p className="section-label">YOUR FAVORITE DESTINATIONS</p>
              <h2>Where will you explore?</h2>
              <p className="section-description">
                Choose a platform to browse its products on its official website.
              </p>
            </div>

            <span className="product-count">
              {filteredPlatforms.length} PLATFORMS
            </span>
          </div>

          <div className="filters">
            <div className="search-box">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search platforms or categories..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              {search && (
                <button
                  className="clear-search"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="category-filters">
              {["All", "Fashion", "Beauty"].map((item) => (
                <button
                  key={item}
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filteredPlatforms.map((platform) => (
              <article className="product-card" key={platform.id}>
                <div className="product-image">
                  <img src={platform.image} alt={platform.name} />

                  <button
                    className={`heart-button ${
                      favorites.includes(platform.id) ? "hearted" : ""
                    }`}
                    onClick={() => toggleFavorite(platform.id)}
                    aria-label={
                      favorites.includes(platform.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    {favorites.includes(platform.id) ? "♥" : "♡"}
                  </button>

                  <span className="product-tag">{platform.label}</span>
                </div>

                <div className="product-details">
                  <p className="product-brand">{platform.category}</p>
                  <h3>{platform.name}</h3>
                  <p className="platform-description">
                    {platform.description}
                  </p>

                  <div className="product-bottom">
                    <span className="product-price">
                      Explore {platform.name}
                    </span>

                    <a
                      className="shop-button"
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => recordVisit(platform)}
                    >
                      Visit ↗
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPlatforms.length === 0 && (
            <div className="empty-state">
              <h3>No platforms found</h3>
              <p>Try a different search or category.</p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="bottom-banner" id="about">
          <p>ONE PLACE. MANY POSSIBILITIES.</p>
          <h2>Your next favorite is just a click away.</h2>
          <a href="#platforms">Start exploring ↗</a>
        </section>
      </main>
{/* About & Help Section */}
<section className="about-help-section" id="about-help">
  <div className="about-help-heading">
    <span className="section-eyebrow">GET TO KNOW ZYVORA</span>

    <h2>Fashion discovery, made simple.</h2>

    <p>
      Zyvora brings fashion and beauty platforms together in one place,
      helping you discover styles, explore brands, and find your next
      favorite.
    </p>
  </div>

  <div className="about-help-grid">
    <div className="about-help-card">
      <span className="about-help-icon">✨</span>
      <h3>About Zyvora</h3>
      <p>
        Your personal destination for discovering fashion, beauty,
        and shopping platforms without the hassle of searching
        multiple websites.
      </p>
    </div>

    <div className="about-help-card">
      <span className="about-help-icon">🛍️</span>
      <h3>How It Works</h3>
      <p>
        Explore platforms, search by category, save your favorites,
        create shopping lists, and visit the retailer's website
        when you're ready to shop.
      </p>
    </div>

    <div className="about-help-card">
      <span className="about-help-icon">💡</span>
      <h3>Helpful Features</h3>
      <p>
        Use the Smart Shopping Assistant, budget planner, rewards
        tracker, and Zyvora Shield to organize your shopping
        experience.
      </p>
    </div>

    <div className="about-help-card">
      <span className="about-help-icon">🔒</span>
      <h3>Shop Mindfully</h3>
      <p>
        Zyvora helps you discover external shopping platforms.
        Always verify the retailer's website, product details,
        prices, and offers before purchasing.
      </p>
    </div>
  </div>
</section>
      <footer>
        <a className="logo footer-logo" href="#home">
          zy<span>vora</span>
          <span className="logo-dot">.</span>
        </a>

        <p>Discover fashion. Explore beauty. Find your world.</p>
        <span>© 2026 zyvora</span>
      </footer>
    </div>
  );
}

export default App;
