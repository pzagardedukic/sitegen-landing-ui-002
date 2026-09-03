# sitegen-landing-ui-002 — nova vizualna tema

## Kontekst

`sitegen-landing-ui-001` je prva vizualna izvedba sitegen landing pogodbe. Vsa logika (podatki, jeziki, poti, SEO, filtri, paginacija) je v paketu `@ptlabTadej/sitegen-landing-core@1.0.0`; UI repozitorij ima samo vizual in tanke adapterje. `README` v `ui-001` postopek za drugo temo že predpisuje: nov repo, obdrži `src/core` in vedenje, zamenjaj MUI temo in vizualne komponente.

Cilj: `ui-002` z dizajnom iz Figme (*Petrin projekt*, 23 sekcij), ki se **logično ne razlikuje od `ui-001` v ničemer**. Isti `website.json`, isti core major, isti pogoji prikaza sekcij, iste poti in sidra, isti SEO.

**Obseg te faze: samo light različica**, v treh širinah (390 / 768 / 1440). Dark variante iz Figme se zdaj ne delajo — tema se postavi tako, da jih je kasneje mogoče dodati brez prepisovanja komponent (barve izključno prek MUI palete, nikjer trdo zapisanih vrednosti v komponentah).

Repozitorij je že ustvarjen: **https://github.com/pzagardedukic/sitegen-landing-ui-002** (privaten, prazen). Tadej ga kasneje prenese na `ptlabTadej`.

## Sprejete odločitve

1. **Barve in pisave vodi `website.json`.** Sora/Manrope in prelivanje `#8258C8 → #2C84C8` so samo privzetki; ob zagonu jih povozita `theme.colors` (primary/secondary/text) in `theme.fonts` (heading/body/banner). Urejevalnik teme mora delovati enako kot na `ui-001`.
2. **Najprej celotno ogrodje, potem sekcije.** Repo, tema, layout, glava/noga, routing in vse sekcije v obliki, ki se zgradi; vizual se dopolnjuje po sekcijah.
3. **Izhodišče je kopija `ui-001`** (brez git zgodovine), vizual se zamenjuje postopoma. Vsako vmesno stanje se zgradi.

## Kaj se NE spreminja (logika)

Te datoteke gredo v `ui-002` nespremenjene in se jih med redizajnom ne ureja:

- `src/core/*` — 8 adapterjev, 147 vrstic, edini most do core paketa
- `scripts/*` — `generateWebsiteData.ts`, `generatePages.ts`, `updateWebsiteData.ts`, `checkCoreBoundary.mjs`
- `templates/pages/**` — 19 predlog poti; vsaka le uvozi komponento iz `@/page-content/pages/*`
- `next.config.ts` (static export, `basePath`), `tsconfig.json` (alias `@/*`), `.npmrc` (GitHub Packages)
- `website.json`, `src/data/`, `public/data/`, `meta.json`
- Vrstni red sekcij in pogoji prikaza v `src/page-content/pages/*` — vključno s podrobnostmi kot `enabled: !isSectionEnabled("reviews") && isSectionEnabled("blog")` na domači strani
- `src/app/layout.tsx`, `AppProviders.tsx` in `.editor` različice — mehanizem urejevalnika teme

## Kaj se zamenja (vizual)

`src/theme.ts`, `src/app/theme/{colors,fonts}.ts`, `src/app/globals.css`, `src/components/**` (20 dat.), `src/page-content/components/**` (90 dat.), `public/images/*`. Skupaj ~10.500 vrstic, od tega 8.000 v `page-content`.

---

## Faza 0 — načrt v repozitorij, potem stop

**Edino, kar naredim takoj po tvoji potrditvi tega načrta:**

1. Ta načrt shranim v `sitegen-landing-ui-002` kot `PLAN.md`.
2. `git init`, prvi commit, push na `main`.
3. **Ustavim se.** Fazo 1 začnem šele, ko mi ti rečeš.

Nič drugega — brez kloniranja `ui-001`, brez namestitev, brez kode.

## Faza 1 — postavitev repozitorija

1. `git clone` `ui-001` → delovni imenik, odstrani `.git`, ohrani obstoječi `main` z `PLAN.md`.
2. Preimenovanja identitete: `package.json` (`name`, `description`, `sitegen.uiId: "002"`), `sitegen-ui.json` (`uiId: "002"`), `README.md`.
3. `pnpm install` z žetonom, ki ima `read:packages` (glej *Predpogoji*), `pnpm verify`, `pnpm build` — **zabeleži, da se `ui-001` zgradi, preden karkoli spremenim.** To je referenčno stanje.
4. Prvi commit = delujoča kopija. Push šele po tvoji potrditvi.

## Faza 2 — ogrodje in dizajnerski sistem

**`src/app/theme/fonts.ts`** — Sora (naslovi), Manrope (telo), tretja za `slogan`/banner. Prek `next/font/google`, enak izvoz `fontConfig` kot zdaj.

**`src/app/theme/colors.ts`** — privzetki iz teme: `#111111` besedilo, `#5A5A66` sekundarno, `#8258C8` primary, `#2C84C8` secondary, ločeni `header`/`footer` odseki (obstoječa razširitev palete se ohrani).

**`src/theme.ts`** — nova tipografska lestvica po Figmi: h1 80/90, h2 60, naslov sekcije 44, kartica 20–24, telo 16 pri 180 %, napis 14; `navLink` in `slogan` varianti ostaneta. Dodam razširitev palete `brandGradient`, izračunano iz `primary.main → secondary.main`, da prelivanje sledi stranki.

**`src/app/theme/utils/createPreviewTheme.ts`** — razširim tako, da poleg pisav in barv preračuna tudi `brandGradient`. Vhodi, izhodi in vedenje do urejevalnika ostanejo nespremenjeni.

### Urejevalnik teme — obvezna pravila

Urejevalnik prek `postMessage` (`THEME_EDITOR_UPDATE`) v živo povozi natanko sedem stvari: `primary`, `secondary`, `text`, `fontHeading`, `fontBody`, `fontBanner`, `banner`. Iz tega sledi:

1. **Vse izpeljanke v obeh vejah.** `createPreviewTheme()` ima zgodnji `if (!hasOverrides) return baseTheme`. Karkoli izračunam iz barv — `brandGradient`, odtenki — mora obstajati v osnovni temi **in** v veji s povozi. Sicer se prelivanje zamrzne na privzetkih in strankinim barvam ne sledi, lokalno pa izgleda pravilno.
2. **Nobene trdo zapisane barve v komponentah.** Vse prek `theme.palette`; odtenki z `alpha`/`lighten`/`darken` ob gradnji teme, ne v `sx`.
3. **Nobene trdo zapisane pisave.** Samo `typography` variante. `loadGoogleFont` naloži le debeline **300–700** — težje rezine se v urejevalniku tiho ne naložijo.
4. **Varianti `slogan` in `navLink` ohranita imeni** — `createPreviewTheme` ju izrecno preslika.
5. **`Section` še naprej kliče `useBannerImage()`** pri `useHeaderImage`, sicer zamenjava banner slike neha delovati.
6. **Preverjanje tudi z `NEXT_PUBLIC_THEME_EDITOR_ENABLED=true`**, ne le v privzetem načinu.

Podedovano iz `ui-001` — **odločeno, oboje popravim v `ui-002`**:

- **Glava in noga se barvata po stranki.** `createPreviewTheme` zdaj preslika tudi `header` in `footer` paleti, izpeljani iz razrešenih `primary`/`secondary`/`text` — v obeh vejah, tako kot velja za `brandGradient`. V `ui-001` sta trdo `rgba(0,0,0,0.9)` in `rgb(245,245,245)` in urejevalnik ju ne doseže. → [ui-001#3](https://github.com/ptlabTadej/sitegen-landing-ui-001/issues/3)
- **Popravljena banner slika v urejevalniku.** `useBannerImage.editor` ob shranjenem bannerju v `sessionStorage` naredi `return` pred `addEventListener`, zato po osvežitvi predogleda žive posodobitve bannerja odpadejo. V `ui-002` se stanje prebere brez zgodnjega izhoda in poslušalec se registrira vedno. → [ui-001#2](https://github.com/ptlabTadej/sitegen-landing-ui-001/issues/2)

Oboje pomeni, da se `ui-002` na teh dveh točkah **namerno obnaša drugače kot `ui-001`**. To ni odstop od pravila „logika ostane ista" — gre za popravka napak v vizualni plasti, ne za spremembo pogodbe s core paketom.

### Pravilo za najdene napake v `ui-001`

Kar med delom najdem v `ui-001` in bi bilo dobro popraviti, a ne sodi v `ui-002`, **odprem kot issue na `ui-001`** in ne popravljam tam. Doslej odprto:

| | |
|---|---|
| [#1](https://github.com/ptlabTadej/sitegen-landing-ui-001/issues/1) | `Section.tsx:23` kliče `useBannerImage()` pogojno — kršitev pravil hookov |
| [#2](https://github.com/ptlabTadej/sitegen-landing-ui-001/issues/2) | žive posodobitve banner slike odpovejo po osvežitvi predogleda |
| [#3](https://github.com/ptlabTadej/sitegen-landing-ui-001/issues/3) | `createPreviewTheme` ne preslika `header`/`footer` palet |
| [#4](https://github.com/ptlabTadej/sitegen-landing-ui-001/issues/4) | svež klon se ne namesti ne zgradi — `pnpm-workspace.yaml` ni pod verzijo |
| [#5](https://github.com/ptlabTadej/sitegen-landing-ui-001/issues/5) | vsaka podstran izriše isti id dvakrat — ovoj naslovnega pasu ponovi id vsebinske sekcije |
| [#6](https://github.com/ptlabTadej/sitegen-landing-ui-001/issues/6) | današnji dan v delovnem času se ne obarva — oblikovano ime dneva proti velikim tiskanim oznakam |

`#1` popravim tudi v `ui-002` (klic hooka brezpogojno, pogoj na rezultatu) — je čista napaka brez vidne spremembe vedenja.

**Prelomne točke — privzete MUI, nespremenjene** (`xs 0, sm 600, md 900, lg 1200, xl 1536`). Figmine tri širine se nanje preslikajo takole:

| Figma | MUI obseg | rob vsebine |
|---|---|---|
| mobile 390 | `xs` (0–599) | 36 px |
| tablet 768 | `sm` (600–899) | 64 px |
| desktop 1440 | `md` in navzgor (≥900), `Container maxWidth="lg"` | 120 px |

Robovi so uveljavljeni na enem mestu v `Section.tsx`, ne po komponentah. Ker prelomnih točk ne premikam, obstoječe `sx` postavitve iz `ui-001` med prehodom ne razpadejo.

**Layout primitivi** — `src/components/section/Section.tsx`, `layout/PageLayout.tsx`, `layout/HeaderLayout.tsx`, `layout/FooterLayout.tsx` prepišem na nove robove in ritem. `Section` ohrani obstoječi API (`id`, `useHeaderImage`, `headerHeight`, `color`), ker ga `SectionRenderer` uporablja.

**Skupni gradniki**, ki jih po Figmi potrebuje več sekcij — zgradim jih tu, enkrat:
- `MediaFrame` — slikovni okvir s črnim prekrivom 60 % in belim napisom v spodnjem traku
- `Carousel` — puščice spodaj levo, pike spodaj desno, desktop 2 rezini, mobile 1 brez pokukavanja
- `SectionHeading` / `SectionDescription` — obstajata, prilagodim tipografiji
- `GradientButton`, `Chip`/filter vrstica, `Badge` (priporočeno/status)
- `MarqueeBand` — drseči napis čez celo širino (`react-fast-marquee` je že odvisnost)

**Glava in noga** — `page-content/components/header/Header.tsx`, `footer/Footer.tsx`, `components/navigation/*`, `language-selector/*`. Vključno z vstavljeno kartico hero z belim izrezom in dvema konkavnima zaokrožitvama iz Figme.

Ob koncu faze 2 se mora projekt zgraditi in vse strani odpreti — sekcije so lahko še v vizualu `ui-001`. Vprašam te za zeleno luč za zagon strežnika, javim naslov za računalnik in za telefon in **počakam, da potrdiš temo, glavo in nogo**, preden se lotim sekcij.

## Faza 3 — sekcije

Vsaka sekcija je ena zaokrožena enota: prepiši vizual, ne dotikaj se klicev na `@/core/*`. Preslikava Figma → obstoječe datoteke:

| Figma | Datoteke v `src/page-content/components/section/` |
|---|---|
| 1 hero | `home/HomeSection.tsx` |
| 2 naslovni pas | `header/HeaderSection.tsx` |
| 3 o nas | `about/{AboutSection,AboutPreviewSection,ImageCarousel}.tsx` |
| 4 izkušnje | `why-us/{WhyUsSection,ExperienceItems,StatBox}.tsx` |
| 5 stranke | `clients/{ClientsSection,ClientLogoSlider}.tsx` |
| 6 ekipa | `team/{TeamSection,TeamCard}.tsx` |
| 7 storitve | `services/{ServicesSection,ServicesPreviewSection,Services,ServiceCard,ServiceRow}.tsx` |
| 8 projekti | `portfolio/*` (6 dat.) |
| 9 galerija | `gallery/*`, `common/CustomGallery.tsx` |
| 10 mnenja | `review/{ReviewSection,Reviews,ReviewCard}.tsx` |
| 11 blog | `blog/*` (5 dat.) |
| 12 cta pas | `call-to-action/CallToAction.tsx` |
| 13 novice | `subscribe/SubscribeSection.tsx` |
| 14 kontakt | `contact/*` (8 dat.) |
| 15 katalogi | `catalogue/{CatalogueSection,FileIcon}.tsx` |
| 16 videi | `video/{VideoSection,VideoThumbnail}.tsx` |
| 17 cenik | `pricing/**` (10 dat.: PriceList / Subscription / Store) |
| 18 zaposlitev | `careers/*` (4 dat.) |
| 19 pogosta vprašanja | `faq/{FaqSection,FaqItem}.tsx` |
| 20 urnik | `schedule/{ScheduleSection,ScheduleTableView}.tsx` |
| 21 dogodki | `events/*` (3 dat.) |
| 22 pravno | `legal/LegalSection.tsx` |
| 23 404 | `not-found/NotFoundSection.tsx` |

Vrstni red: domača stran (1, 3, 7, 8, 12, 9, 10, 13, 14) → podstrani z največ vsebine (11, 17, 8, 21, 18) → ostalo.

Za vsako sekcijo se izdela **light** v treh širinah: desktop 1440, tablet 768, mobile 390. Različica „s fotografijami" ni ločena koda, ampak isti vizual z drugačnimi podatki. Dark variante se preskočijo.

### Delovni ritem — potrditev po vsaki sekciji

Po **vsaki** dokončani sekciji:

1. **Preden zaženem strežnik, te vprašam za potrditev** — da preveriš, da na vratih 3000 ne teče že kaj drugega. Strežnika ne zaženem sam od sebe.
2. Po tvoji potrditvi `pnpm dev -H 0.0.0.0` v ozadju (zaženem enkrat, ostane gor; Next osveži sam ob spremembi). Vezava na vse vmesnike, da je strežnik dosegljiv tudi s telefona v istem omrežju.
3. Javim ti **dva naslova** s sidrom sekcije:
   - računalnik: `http://localhost:3000/#o-nas`
   - telefon: `http://<IP-računalnika-v-LAN>:3000/#o-nas` (IP preberem ob zagonu in ga napišem)
4. **Počakam na tvojo potrditev.** Naslednje sekcije ne začnem, dokler ne rečeš, da je v redu.
5. Če imaš pripombe, jih popravim na tej sekciji in ti spet javim oba naslova.

Šele po potrditvi commit te sekcije. Če se dev strežnik sesuje ali so vrata zasedena, javim in ne nadaljujem tiho.

Dvoje, kar zna ponagajati pri telefonu, in kako rešim:
- **Požarni zid Windows** privzeto zavrne dohodne povezave na vrata 3000. Če telefon ne odpre strani, javim in ti povem točen ukaz za enkratno dovolitev — sam ga ne izvedem brez tvojega privoljenja.
- **Telefon mora biti na istem Wi-Fi** kot računalnik. Če je na mobilnih podatkih, ne bo šlo.

## Faza 4 — zaključek

`pnpm verify` (meja core/UI + typecheck), `pnpm build`, primerjava izrisov z Figmo, `README`/`ARCHITECTURE` posodobljena za `002`, `VALIDATION.md` z zapisom preverjanja.

---

## Predpogoji

**Žeton z `read:packages`.** Trenutni ima `gist, read:org, repo, workflow` — brez tega `pnpm install` ne dobi `@ptlabTadej/sitegen-landing-core@1.0.0` z `npm.pkg.github.com`. Paket je objavljen (lockfile v `ui-001` ima veljaven tarball), potrebujem samo dostop. Rešiš z `gh auth refresh -h github.com -s read:packages` ali z osebnim žetonom v `~/.npmrc`.

## Preverjanje

- `pnpm verify` — `checkCoreBoundary.mjs` pade, če vizualna koda uvozi `website.json`, `@/data/`, shared-types ali core paket neposredno; to je varovalka, da redizajn ne prebije meje
- `pnpm build` — static export mora uspeti; `out/` primerjam s tistim iz `ui-001` po številu strani in poteh
- Sproti: dev strežnik vezan na `0.0.0.0`, ti pogledaš vsako sekcijo na računalniku **in na telefonu** ter jo potrdiš
- Ob koncu faze: `pnpm build` + `npx serve out` in posnetki v headless Edge proti produkcijskemu izvozu pri 390, 768 in 1440 — dev strežnik za posnetke ni zanesljiv
- Logična enakovrednost: za isti `website.json` morata `ui-001` in `ui-002` ustvariti isti seznam poti (`out/**/index.html`) in ista sidra sekcij
- Urejevalnik teme: zagon z `NEXT_PUBLIC_THEME_EDITOR_ENABLED=true` in preverba, da sprememba `primary`/`secondary` v živo premakne tudi prelivanje, ne samo gumbov

## Tveganja

- **Prelivanje iz barv stranke.** Če sta primary in secondary preblizu, prelivanje izgine. Potrebuje varovalko (npr. minimalna razlika svetlosti, sicer prelivanje v odtenkih primary).
- **Dark pride kasneje.** V tej fazi ni v obsegu. Da bo dodajanje pozneje poceni, v komponentah ne sme biti trdo zapisanih barv — vse gre prek `theme.palette`. To je pravilo, ki ga bom upošteval od prve komponente naprej. Odprto ostaja, ali je dark ločena tema stranke ali stikalo — vprašam, ko pridemo do tja.
- **Tablet pri 768 pade v `sm`.** Figma tablet je 768 px, MUI `sm` pa pokriva 600–899. Postavitev, narisana za 768, mora zdržati tudi pri 600 in pri 899. Kjer ne bo, gre vrstica v mobilno postavitev pri tisti širini — ne stiskam robov, da bi se izšlo.
