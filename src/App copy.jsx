import { useState } from "react";
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
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);

  const filteredPlatforms = platforms.filter((platform) => {
    const matchesSearch = (
      platform.name +
      " " +
      platform.category +
      " " +
      platform.description
    )
      .toLowerCase()
      .includes(search.toLowerCase());

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

  return (
    <div className="app">
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
          <a href="#about">About</a>
        </nav>

        <a className="wishlist-link" href="#platforms">
          ♡ Favorites ({favorites.length})
        </a>
      </header>

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