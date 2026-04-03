import React, { useMemo, useState } from "react";
import { SECTIONS } from "../data/menu.ts"; 

const formatPrice = (price, currency = "MYR") =>
  new Intl.NumberFormat("ms-MY", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

export default function MenuSection({ sections = SECTIONS, defaultSectionId }) {
  const initial = defaultSectionId ?? (sections[0]?.id || "");
  const [active, setActive] = useState(initial);

  const activeSection = useMemo(
    () => sections.find((s) => s.id === active) ?? sections[0],
    [sections, active]
  );

  const [leftCol, rightCol] = useMemo(() => {
    const items = activeSection?.items ?? [];
    const mid = Math.ceil(items.length / 2);
    return [items.slice(0, mid), items.slice(mid)];
  }, [activeSection]);

  if (!sections?.length) return null;

  return (
    <section id="menu" className="py-4 menu">
      <div className="container">
        <div className="title-wrap menu-title">
          <h2 className="lg-title">Menu</h2>
        </div>

        <div className="menu-container">
          <ul className="menu-tabs" role="tablist" aria-label="Menu sections">
            {sections.map((sec) => (
                <li
                    key={sec.id}
                    className={`tab ${active === sec.id ? "active" : ""}`}
                    data-target={sec.id}     
                    onClick={() => setActive(sec.id)}
                    role="tab"
                    aria-selected={active === sec.id}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setActive(sec.id);
                    }}
                >
                    {sec.label}
                </li>
            ))}
          </ul>

          {activeSection && (
            <div
              id={`panel-${activeSection.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeSection.id}`}
              className="menu-content active"
            >
              <div className="menu-columns">
                {[leftCol, rightCol].map((col, i) => (
                  <div className="column" key={i}>
                    {col.map((item) => (
                      <div className="menu-item" key={item.id}>
                        <h3>{item.name}</h3>
                        <p>{item.desc}</p>
                        <span className="price">
                          {formatPrice(item.price, item.currency || "MYR")}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
