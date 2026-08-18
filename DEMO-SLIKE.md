# Popis slik za demo podatke (Reforma Pilates)

Kaj `website.json` potrebuje, v kakšnem izrezu se posamezna slika izriše in kaj mora prikazovati. Merjeno na dejansko izrisani strani pri 1440 px.

Trenutno so v podatkih fotografije interierjev iz prejšnjega nabora. Berejo se kot prostor, niso pa pilates.

## Vrstni red po učinku

Če ne bo časa za vse, se v tem vrstnem redu najbolj pozna.

| # | Kje | Kos | Izris | Razmerje | Kaj mora biti na sliki |
|---|---|---|---|---|---|
| 1 | `theme.images.banner` | **1** | 1440×550 in čez cel hero | **2.6 : 1**, zelo široka | Notranjost studia s reformerji, brez ljudi ali z enim. Uporabi se v heroju, na naslovnem pasu vsake podstrani, v CTA pasu in pri novicah — torej **štirikrat**. Naj bo svetla in ne prezasedena, ker gre čez njo črn prekriv 60 % in belo besedilo. |
| 2 | `gallery.items[]` | **12** | 373×260, 373×320, 373×380 | mešano, **0.98 / 1.17 / 1.43** | Mozaik. Potrebuje pestrost: nekaj pokončnih, nekaj ležečih. Detajli opreme, vzmeti, roke na drogu, prostor od strani, skupina med vadbo. |
| 3 | `portfolio.items[].images[]` | **6** (+12 neobvezno) | 373×420 kartica | **0.89**, rahlo pokončno | Prva slika programa je kartica. Po programih: reformer začetni, reformer nadaljevalni, matt skupina, pisarniško telo, rehabilitacija (individualno), nosečniški. Ostali dve na program sta za podstran in nista nujni. |
| 4 | `services.items[].image` | **4** | 373×560 | **0.67**, izrazito pokončno | Kartica storitve je fotografija pod črnim prekrivom, čez njo bel naslov in seznam. Naj bo mirna, brez pomembnih detajlov v spodnji polovici, ker jo prekrije besedilo. |
| 5 | `team.items[].image` | **4** | 320×391 | **0.82**, pokončno | Portreti inštruktorjev, do pasu, v studiu. Ana Kovač, Luka Zupan, Maja Vidmar, Nejc Potočnik. |
| 6 | `reviews.items[].image` | **4** | 44×44 krog | **1 : 1** | Obrazni portreti članov, obrez v krog. Lahko manjša ločljivost. |
| 7 | `about.items[].image` | **3** | 709×470 in 411×470 | **1.51** in **0.87** | Karusel o studiu: uvodna analiza, oprema in vzmeti, majhna skupina med uro. |
| 8 | `blog.items[].image` | **5** | 352×200 | **1.76**, ležeče | Naslovne slike objav: bolečina po prvi uri, nevtralna medenica, vzmeti, pogostost vadbe, po porodu. |
| 9 | `events.items[].image` | **5** | 363×210 | **1.73**, ležeče | Delavnice in predavanja: dihanje, tekači, po porodu, odprti dan, ergonomija. |
| — | `pricing.items[].images[]` | 20 | — | — | **Ni potrebno.** Pri postavitvi `PRICING_PACKAGES` se ne izrišejo; vidne so samo na podstrani posameznega paketa. |

**Fotografij skupaj: 44** za polno pokritost, **23** za tisto, kar se vidi na domači strani (vrstice 1–4).

## Logotipi — teh ne kupuj

Trije certifikati (`experience`) in osem partnerjev (`clients`) so trenutno generirane ploščice s `placehold.co`. To je za demo v redu; prave logotipe bi bilo treba imeti pravico uporabljati.

## Ločljivost

Naloži največjo razpoložljivo. Slike gredo skozi `next/image` z `unoptimized: true` (stran je statični izvoz), zato se ne pomanjšujejo same. Za banner vzemi vsaj **2800 px široko**, za ostalo **1600 px** po daljši stranici.

## Iskalne povezave

- [reformer pilates studio](https://www.shutterstock.com/search/reformer-pilates-studio) — banner, galerija, programi
- [pilates reformer](https://www.shutterstock.com/search/pilates-reformer) — širši nabor
- [pilates reformer poses](https://www.shutterstock.com/search/pilates-reformer-poses) — vaje, programi
- [pilates](https://www.shutterstock.com/search/pilates?studio=1) — matt in skupine

Ena konkretna, ki jo je vrnilo iskanje in ustreza opisu za banner: [Serene Pilates Studio Natural Light Reformer](https://www.shutterstock.com/image-photo/serene-pilates-studio-natural-light-reformer-2714725793).

## Ko slike izbereš

Pošlji povezave ali ID-je po vrsticah iz zgornje tabele. Vstavim jih v `website.json`, pregenerirama podatke in preverim vsak izrez pri 390, 768 in 1440 — pri pokončnih karticah se hitro zgodi, da glava ali oprema odpade iz kadra.
