import Slider from "../components/Slider";
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  const demoSlides = [
    { img: "/assets/slider1.jpg", title: "CNC Freze", desc: "Yüksek hassasiyet" },
    { img: "/assets/slider2.jpg", title: "Lazer Kesim", desc: "Hızlı kesim" },
  ];

  return (
    <div>
      <Slider slides={demoSlides} />
      <ProductGrid />
    </div>
  );
}
