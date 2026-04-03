import React, {useEffect, useRef, useState } from "react";

function importAll(r) {
  const toNum = (key) => Number((key.match(/gallery-(\d+)\.jpg$/) || [])[1] || 0);
  return r
    .keys()
    .sort((a, b) => toNum(a) - toNum(b))
    .map(r);
}
const IMAGES = importAll(require.context("../assets/images", false, /gallery-\d+\.jpg$/));

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const scrollYRef = useRef(0);

  const openModal = (i) => {
    setIdx(i);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const next = () => setIdx((i) => (i + 1) % IMAGES.length);
  const prev = () => setIdx((i) => (i - 1 + IMAGES.length) % IMAGES.length);

  // Keyboard: Esc / ← →
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      // Save current scroll position and freeze body
      scrollYRef.current = window.scrollY || window.pageYOffset;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%"; // prevents layout shift from scrollbar
    } else {
      // Unfreeze and restore scroll
      const y = -parseInt(document.body.style.top || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      if (!Number.isNaN(y)) window.scrollTo(0, y);
    }

    // Safety cleanup on unmount
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
    };
  }, [open]);

  const currentUrl =
    typeof window !== "undefined" ? window.location.href: "";

  const shareToFacebook = () => {
    const u = encodeURIComponent(currentUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareToX = () => {
    const u = encodeURIComponent(currentUrl);
    const text = encodeURIComponent("Check this out at Laut!");
    window.open(
      `https://twitter.com/intent/tweet?url=${u}&text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareToInstagram = async() => {
    // Copy URL so user can paste in bio/story/caption
    try {await navigator.clipboard.writeText(currentUrl); } catch {} window.open(
      "https://www.instagram.com/accounts/login/?next=/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <div id="gallery" className="py-4">
        <div className="container">
          <div className="title-wrap">
            <span className="sm-title">Feast With Your Eyes</span>
            <h2 className="lg-title">Fresh From the Kitchen</h2>
          </div>

          <div className="gallery-row">
            {IMAGES.map((src, i) => (
              <div className="gallery-item shadow" key={i} onClick={() => openModal(i)}>
                <img src={src} alt={`gallery ${i + 1}`} />
                <span className="zoom-icon">
                  <i className="fas fa-search-plus" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div
          id="img-modal-box"
          onClick={(e) => {
            if (e.target.id === "img-modal-box") closeModal(); // click backdrop to close
          }}
        >
          <div id="img-modal">
            <button type="button" id="modal-close-btn" className="flex nav-btn" onClick={closeModal}>
              <i className="fas fa-times" />
            </button>
            <button type="button" id="prev-btn" className="flex nav-btn" onClick={prev}>
              <i className="fas fa-chevron-left" />
            </button>
            <button type="button" id="next-btn" className="flex nav-btn" onClick={next}>
              <i className="fas fa-chevron-right" />
            </button>

            <img src={IMAGES[idx]} alt={`gallery ${idx + 1}`} />

            <div className="social-share">
              <span>Share:</span>
              <button type = "button" className="linklike" title = "Share on Facebook" onClick = {shareToFacebook}>
                <i className="fab fa-facebook-f" />
              </button>
              <button type="button" className="linklike" title="Share on X" onClick={shareToX}>
                <i className="fab fa-x-twitter" />
              </button>
              <button type="button" className="linklike" title="Open Instagram (link copied)" onClick={shareToInstagram}>
                <i className="fab fa-instagram" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}