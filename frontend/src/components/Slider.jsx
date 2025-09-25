import { useRef, useEffect, useState } from "react";

export default function Slider() {
  const trackRef = useRef(null);
  const dotsRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const dots = dotsRef.current;
    if (!track || !dots) return;
    const slides = Array.from(track.children);
    dots.innerHTML = "";
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.setAttribute("aria-label", `Slide ${i + 1}`);
      b.onclick = () => setSlideIndex(i);
      dots.appendChild(b);
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const dots = dotsRef.current;
    if (!track || !dots) return;
    const offset = slideIndex * track.clientWidth;
    track.scrollTo({ left: offset, behavior: "smooth" });
    Array.from(dots.children).forEach((b, i) =>
      b.setAttribute("aria-selected", i === slideIndex)
    );
  }, [slideIndex]);

  return (
    <section className="slider-section">
      <div className="container">
        <div className="slider">
          <div className="slider-track" ref={trackRef}>
            <div className="slide"><img src="/assets/slider1.jpg" alt="CNC Freze" /></div>
            <div className="slide"><img src="/assets/slider2.jpg" alt="Lazer Kesim" /></div>
            <div className="slide"><img src="/assets/slider3.jpg" alt="Forklift" /></div>
          </div>
          <div className="slider-dots" ref={dotsRef}></div>
        </div>
      </div>
    </section>
  );
}
