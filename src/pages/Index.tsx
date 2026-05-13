import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

type LucideIconName = Parameters<typeof Icon>[0]["name"];

const IMAGES = {
  hero: "https://cdn.poehali.dev/projects/4b11b191-bd14-4e10-9066-ea255ef34f92/files/d821017f-4e4d-48f6-8a95-b588e2379f09.jpg",
  bedroom: "https://cdn.poehali.dev/projects/4b11b191-bd14-4e10-9066-ea255ef34f92/files/4497d938-50f7-4539-a7f1-0ab1bfb56fbd.jpg",
  kitchen: "https://cdn.poehali.dev/projects/4b11b191-bd14-4e10-9066-ea255ef34f92/files/fea4aedb-7a99-44c7-9f81-5d87c947b9ed.jpg",
};

const NAV_ITEMS = [
  { label: "О нас", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "3D-визуализация", href: "#visualization" },
  { label: "Блог", href: "#blog" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Pencil", title: "Дизайн-проект", desc: "Полный пакет документации: планировки, развёртки, спецификации материалов и мебели." },
  { icon: "Box", title: "3D-визуализация", desc: "Фотореалистичные рендеры каждого помещения до начала ремонта." },
  { icon: "Zap", title: "Авторский надзор", desc: "Контролируем реализацию проекта на всех этапах строительства." },
  { icon: "Home", title: "Под ключ", desc: "От первого эскиза до финальной расстановки мебели и декора." },
  { icon: "Lightbulb", title: "Электрика и свет", desc: "Проектирование электросхем и световых сценариев для каждой зоны." },
  { icon: "Palette", title: "Подбор материалов", desc: "Работаем с ведущими брендами отделочных материалов и мебели." },
];

const PORTFOLIO_ITEMS = [
  { img: IMAGES.hero, title: "Пентхаус на Тверской", area: "340 м²", style: "Современная классика" },
  { img: IMAGES.bedroom, title: "Загородный дом", area: "520 м²", style: "Органический минимализм" },
  { img: IMAGES.kitchen, title: "Квартира в ЖК Маяк", area: "180 м²", style: "Неоклассика" },
  { img: IMAGES.hero, title: "Офис в Москва-Сити", area: "600 м²", style: "Лофт-индустриал" },
  { img: IMAGES.kitchen, title: "Вилла в Подмосковье", area: "800 м²", style: "Арт-деко" },
  { img: IMAGES.bedroom, title: "Студия на Арбате", area: "55 м²", style: "Скандинавский стиль" },
];

const BLOG_POSTS = [
  { date: "10 мая 2026", tag: "Тренды", title: "Минимализм возвращается: что будет в моде в 2026 году", preview: "Разбираем главные тенденции в мире интерьерного дизайна и рассказываем, как внедрить их в ваш дом." },
  { date: "2 апреля 2026", tag: "Советы", title: "5 ошибок при выборе освещения в квартире", preview: "Свет — главный инструмент дизайнера. Рассказываем, каких ошибок важно избегать при проектировании световых сценариев." },
  { date: "18 марта 2026", tag: "Материалы", title: "Мрамор vs кварцит: что выбрать для кухни", preview: "Сравниваем два самых популярных натуральных камня и помогаем принять правильное решение для вашего интерьера." },
];

const REVIEWS = [
  { name: "Анна Ковалёва", project: "Квартира 120 м²", text: "FORMA полностью изменила моё представление о том, каким может быть дом. Работали чётко, в срок, и результат превзошёл все ожидания.", rating: 5 },
  { name: "Михаил Громов", project: "Загородный дом 400 м²", text: "Профессионализм на высшем уровне. 3D-визуализация помогла нам точно понять, как всё будет выглядеть. Ни одной неожиданности при ремонте.", rating: 5 },
  { name: "Светлана Дмитриева", project: "Офис 300 м²", text: "Благодаря FORMA наш офис стал визитной карточкой компании. Клиенты всегда делают комплименты при входе.", rating: 5 },
];

const STATS = [
  { value: "12+", label: "лет на рынке" },
  { value: "340+", label: "реализованных проектов" },
  { value: "98%", label: "довольных клиентов" },
  { value: "25+", label: "наград и премий" },
];

function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="section-divider" />
      <span className="font-golos text-xs tracking-[0.3em] uppercase text-gold font-semibold">{children}</span>
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Все");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const aboutSection = useIntersection();
  const servicesSection = useIntersection();
  const portfolioSection = useIntersection();
  const vizSection = useIntersection();
  const blogSection = useIntersection();
  const reviewsSection = useIntersection();
  const contactSection = useIntersection();

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "py-6 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex flex-col leading-none">
            <span className={`font-cormorant font-bold tracking-[0.2em] text-xl transition-colors ${scrolled ? "text-graphite" : "text-white"}`}>FORMA</span>
            <span className={`font-golos text-[9px] tracking-[0.35em] uppercase transition-colors ${scrolled ? "text-gold" : "text-white/70"}`}>Студия дизайна</span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`nav-link font-golos text-sm transition-colors ${scrolled ? "text-graphite hover:text-gold" : "text-white/90 hover:text-white"}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("#contacts")}
            className={`hidden lg:flex items-center gap-2 px-5 py-2 text-sm font-golos font-medium transition-all duration-300 ${
              scrolled
                ? "bg-graphite text-white hover:bg-gold hover:text-graphite"
                : "border border-white/60 text-white hover:bg-white hover:text-graphite"
            }`}
          >
            Консультация
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden transition-colors ${scrolled ? "text-graphite" : "text-white"}`}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-lg border-t border-border px-6 py-6 flex flex-col gap-5 animate-fade-in">
            {NAV_ITEMS.map(item => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-left font-golos text-graphite hover:text-gold transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contacts")}
              className="mt-2 bg-graphite text-white py-3 text-sm font-medium hover:bg-gold hover:text-graphite transition-colors"
            >
              Получить консультацию
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <img
          src={IMAGES.hero}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up delay-100">
              <span className="inline-block font-golos text-xs tracking-[0.4em] uppercase text-gold font-semibold mb-6 border border-gold/40 px-4 py-2">
                Студия роскошных интерьеров
              </span>
            </div>
            <h1 className="font-cormorant text-6xl md:text-8xl text-white leading-none font-light animate-fade-in-up delay-200 mb-6">
              Создаём<br />
              <em className="text-shimmer not-italic">пространство</em><br />
              вашей жизни
            </h1>
            <p className="font-golos text-white/75 text-lg md:text-xl leading-relaxed animate-fade-in-up delay-400 mb-10 max-w-lg">
              От идеи до финального интерьера — дизайн-проект, 3D-визуализация, авторский надзор и реализация под ключ.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-500">
              <button
                onClick={() => scrollTo("#portfolio")}
                className="bg-gold text-graphite px-8 py-4 font-golos font-semibold text-sm tracking-wide hover:bg-white transition-all duration-300 hover-lift"
              >
                Смотреть портфолио
              </button>
              <button
                onClick={() => scrollTo("#contacts")}
                className="border border-white/60 text-white px-8 py-4 font-golos font-medium text-sm tracking-wide hover:bg-white/10 transition-all duration-300"
              >
                Бесплатная консультация
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/15">
            {STATS.map((s, i) => (
              <div key={i} className="py-6 px-8 text-center">
                <div className="font-cormorant text-3xl text-gold font-semibold">{s.value}</div>
                <div className="font-golos text-white/60 text-xs mt-1 tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 bg-cream" ref={aboutSection.ref}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutSection.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <SectionLabel>О студии</SectionLabel>
            <h2 className="font-cormorant text-5xl md:text-6xl text-graphite leading-tight mb-8 font-light">
              Двенадцать лет<br />
              <em className="not-italic text-gold">безупречных</em><br />
              интерьеров
            </h2>
            <p className="font-golos text-muted-foreground leading-relaxed mb-6 text-base">
              FORMA — команда архитекторов и дизайнеров, которые верят, что дом — это не просто квадратные метры. Это ваша история, ваш ритм жизни, ваша эстетика.
            </p>
            <p className="font-golos text-muted-foreground leading-relaxed mb-10 text-base">
              Мы работаем с объектами от 50 до 2000 м² по всей России и за рубежом. Каждый проект — авторский, уникальный и реализованный до последней детали.
            </p>
            <button
              onClick={() => scrollTo("#contacts")}
              className="inline-flex items-center gap-3 font-golos font-semibold text-sm text-graphite border-b-2 border-gold pb-1 hover:text-gold transition-colors"
            >
              Познакомиться с командой
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
          <div className={`relative transition-all duration-1000 delay-300 ${aboutSection.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="relative">
              <img src={IMAGES.bedroom} alt="О студии" className="w-full h-[500px] object-cover" />
              <div className="absolute -bottom-8 -left-8 bg-gold p-8 shadow-2xl">
                <div className="font-cormorant text-4xl text-graphite font-semibold">340+</div>
                <div className="font-golos text-graphite/70 text-sm mt-1">проектов реализовано</div>
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 border border-gold/30" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 bg-white" ref={servicesSection.ref}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <SectionLabel>Что мы делаем</SectionLabel>
            <h2 className="font-cormorant text-5xl md:text-6xl text-graphite font-light">
              Услуги студии
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className={`bg-white p-10 group hover:bg-graphite transition-all duration-500 hover-lift ${servicesSection.visible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                  <Icon name={s.icon as LucideIconName} size={20} className="text-gold group-hover:text-graphite" />
                </div>
                <h3 className="font-cormorant text-2xl text-graphite group-hover:text-white mb-4 font-medium">{s.title}</h3>
                <p className="font-golos text-muted-foreground group-hover:text-white/60 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-gold text-sm font-golos opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Подробнее</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-32 bg-cream" ref={portfolioSection.ref}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <SectionLabel>Наши работы</SectionLabel>
              <h2 className="font-cormorant text-5xl md:text-6xl text-graphite font-light">Портфолио</h2>
            </div>
            <div className="flex gap-3 flex-wrap">
              {["Все", "Квартиры", "Дома", "Офисы"].map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2 text-sm font-golos font-medium transition-all ${activeFilter === f ? "bg-graphite text-white" : "border border-border text-muted-foreground hover:border-graphite hover:text-graphite"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`portfolio-card group overflow-hidden relative cursor-pointer ${portfolioSection.visible ? "animate-scale-in" : "opacity-0"}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="overflow-hidden h-72">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-graphite/0 group-hover:bg-graphite/60 transition-all duration-500 flex items-end">
                  <div className="p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="text-gold text-xs font-golos tracking-widest uppercase mb-2">{item.style}</div>
                    <div className="text-white font-cormorant text-2xl font-medium">{item.title}</div>
                    <div className="text-white/60 font-golos text-sm mt-1">{item.area}</div>
                  </div>
                </div>
                <div className="pt-4 pb-2">
                  <div className="font-cormorant text-xl text-graphite font-medium">{item.title}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-golos text-muted-foreground text-sm">{item.style}</span>
                    <span className="font-golos text-gold text-sm">{item.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="border border-graphite text-graphite px-10 py-4 font-golos font-medium text-sm hover:bg-graphite hover:text-white transition-all duration-300">
              Смотреть все проекты
            </button>
          </div>
        </div>
      </section>

      {/* 3D VISUALIZATION */}
      <section id="visualization" className="py-32 bg-graphite relative overflow-hidden" ref={vizSection.ref}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 border border-gold rounded-full" />
          <div className="absolute bottom-20 right-20 w-96 h-96 border border-gold rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-gold rotate-45" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center relative z-10">
          <div className={`transition-all duration-1000 ${vizSection.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <SectionLabel>Фотореализм до ремонта</SectionLabel>
            <h2 className="font-cormorant text-5xl md:text-6xl text-white font-light leading-tight mb-8">
              Увидите результат<br />
              <em className="text-gold not-italic">до начала</em><br />
              любых работ
            </h2>
            <p className="font-golos text-white/60 leading-relaxed mb-8 text-base">
              Наши 3D-визуализации неотличимы от фотографий. Мы покажем каждый угол, каждый световой сценарий и каждый материал ещё на стадии проектирования.
            </p>
            <ul className="space-y-4 mb-10">
              {["Фотореалистичный рендер каждой комнаты", "Несколько вариантов отделки на выбор", "Анимированные туры по проекту", "Корректировки без ограничений"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-golos text-white/80 text-sm">
                  <div className="w-1.5 h-1.5 bg-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => scrollTo("#contacts")}
              className="bg-gold text-graphite px-8 py-4 font-golos font-semibold text-sm hover:bg-white transition-all duration-300"
            >
              Заказать визуализацию
            </button>
          </div>
          <div className={`transition-all duration-1000 delay-300 ${vizSection.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="relative">
              <img src={IMAGES.bedroom} alt="3D визуализация" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 border border-gold/20 m-4 pointer-events-none" />
              <div className="absolute top-4 right-4 bg-gold text-graphite px-4 py-2 font-golos text-xs font-bold tracking-widest uppercase">
                3D-рендер
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-32 bg-white" ref={blogSection.ref}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <SectionLabel>Экспертный блог</SectionLabel>
              <h2 className="font-cormorant text-5xl md:text-6xl text-graphite font-light">Блог</h2>
            </div>
            <button className="font-golos text-sm text-gold border-b border-gold hover:border-graphite hover:text-graphite transition-colors pb-1 self-start md:self-auto">
              Все статьи →
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => (
              <article
                key={i}
                className={`group cursor-pointer ${blogSection.visible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="h-1 bg-border group-hover:bg-gold transition-colors duration-300 mb-6" />
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-secondary text-secondary-foreground font-golos text-xs px-3 py-1">{post.tag}</span>
                  <span className="font-golos text-muted-foreground text-xs">{post.date}</span>
                </div>
                <h3 className="font-cormorant text-xl text-graphite group-hover:text-gold transition-colors font-medium leading-snug mb-3">{post.title}</h3>
                <p className="font-golos text-muted-foreground text-sm leading-relaxed">{post.preview}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-golos text-graphite group-hover:text-gold transition-colors">
                  <span>Читать</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-32 bg-cream" ref={reviewsSection.ref}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <SectionLabel>Говорят клиенты</SectionLabel>
            <h2 className="font-cormorant text-5xl md:text-6xl text-graphite font-light">Отзывы</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className={`bg-white p-10 hover-lift ${reviewsSection.visible ? "animate-scale-in" : "opacity-0"}`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Icon key={j} name="Star" size={14} className="text-gold" />
                  ))}
                </div>
                <p className="font-cormorant text-xl text-graphite leading-relaxed mb-8 italic font-light">«{r.text}»</p>
                <div className="border-t border-border pt-6">
                  <div className="font-golos font-semibold text-graphite text-sm">{r.name}</div>
                  <div className="font-golos text-muted-foreground text-xs mt-1">{r.project}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-32 bg-white" ref={contactSection.ref}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-start">
          <div className={`transition-all duration-1000 ${contactSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <SectionLabel>Напишите нам</SectionLabel>
            <h2 className="font-cormorant text-5xl md:text-6xl text-graphite font-light mb-8">
              Начнём ваш<br />
              <em className="text-gold not-italic">проект вместе</em>
            </h2>
            <p className="font-golos text-muted-foreground leading-relaxed mb-12 text-base">
              Оставьте заявку — мы свяжемся в течение 2 часов, обсудим задачу и предложим оптимальное решение. Первая консультация бесплатна.
            </p>

            <div className="space-y-6">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                { icon: "Mail", label: "Email", value: "hello@forma-studio.ru" },
                { icon: "MapPin", label: "Адрес", value: "Москва, ул. Тверская, 1" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-5">
                  <div className="w-12 h-12 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon as LucideIconName} size={18} className="text-gold" />
                  </div>
                  <div>
                    <div className="font-golos text-xs text-muted-foreground uppercase tracking-widest">{c.label}</div>
                    <div className="font-golos text-graphite font-medium mt-0.5">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-200 ${contactSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="font-golos text-xs text-muted-foreground uppercase tracking-widest block mb-2">Имя</label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full border border-border bg-cream px-4 py-3 font-golos text-sm text-graphite placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="font-golos text-xs text-muted-foreground uppercase tracking-widest block mb-2">Телефон</label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full border border-border bg-cream px-4 py-3 font-golos text-sm text-graphite placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-golos text-xs text-muted-foreground uppercase tracking-widest block mb-2">Тип объекта</label>
                <select className="w-full border border-border bg-cream px-4 py-3 font-golos text-sm text-graphite focus:outline-none focus:border-gold transition-colors appearance-none">
                  <option value="">Выберите тип</option>
                  <option>Квартира</option>
                  <option>Загородный дом</option>
                  <option>Офис</option>
                  <option>Коммерческое помещение</option>
                </select>
              </div>

              <div>
                <label className="font-golos text-xs text-muted-foreground uppercase tracking-widest block mb-2">Площадь, м²</label>
                <input
                  type="text"
                  placeholder="Например: 120"
                  className="w-full border border-border bg-cream px-4 py-3 font-golos text-sm text-graphite placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="font-golos text-xs text-muted-foreground uppercase tracking-widest block mb-2">Пожелания</label>
                <textarea
                  rows={4}
                  placeholder="Расскажите о вашем проекте..."
                  className="w-full border border-border bg-cream px-4 py-3 font-golos text-sm text-graphite placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-graphite text-white py-4 font-golos font-semibold text-sm tracking-wide hover:bg-gold hover:text-graphite transition-all duration-300"
              >
                Отправить заявку
              </button>

              <p className="font-golos text-xs text-muted-foreground text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-graphite py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="font-cormorant text-2xl text-white font-bold tracking-[0.2em]">FORMA</div>
              <div className="font-golos text-white/40 text-xs tracking-widest uppercase mt-1">Студия дизайна интерьеров</div>
            </div>
            <div className="hidden md:flex gap-8">
              {NAV_ITEMS.slice(0, 5).map(item => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="font-golos text-white/50 hover:text-gold text-sm transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              {[
                { icon: "Instagram", label: "Instagram" },
                { icon: "Send", label: "Telegram" },
                { icon: "Youtube", label: "YouTube" },
              ].map((s, i) => (
                <div key={i} className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold text-white/40 hover:text-gold transition-all cursor-pointer">
                  <Icon name={s.icon as LucideIconName} size={14} />
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-4">
            <div className="font-golos text-white/30 text-xs">© 2026 FORMA. Все права защищены.</div>
            <div className="font-golos text-white/30 text-xs">Политика конфиденциальности · Договор оферты</div>
          </div>
        </div>
      </footer>
    </div>
  );
}