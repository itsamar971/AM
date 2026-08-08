import { Wave } from "@/components/ui/wave";

export function Hero() {
  return (
    <section
      className="scene scene--hero-empty"
      id="top"
      data-scene="00"
      aria-label="Hero Section"
    >
      <div className="scene__stage hero-empty__stage">
        <div className="hero-empty__content">
          <div className="flex flex-col -translate-y-[10vh]">
            <h1 className="hero-empty__title">AM</h1>
            <h2 className="hero-empty__title text-white/80" style={{ fontSize: 'clamp(3rem, 11vw, 12rem)', marginTop: '0.2em', fontFamily: '"Black Ops One", system-ui', letterSpacing: '0.05em' }}>
              STUDIO
            </h2>
          </div>
          <Wave 
            className="shrink-0" 
            style={{ width: '200px', height: '200px', marginLeft: '11vw' }}
          />
        </div>
      </div>
    </section>
  );
}
