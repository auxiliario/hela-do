export interface Region {
  name: string;
  slug: string;
  emoji: string;
  cities: string[]; // city slugs
}

export const regions: Region[] = [
  {
    name: "Distrito Nacional & Santo Domingo",
    slug: "distrito-nacional",
    emoji: "🏛️",
    cities: [
      "santo-domingo",
      "santo-domingo-este",
      "pantoja",
      "hato-nuevo",
      "la-caleta",
    ],
  },
  {
    name: "Cibao Norte",
    slug: "cibao-norte",
    emoji: "⛪",
    cities: [
      "santiago",
      "puerto-plata",
      "moca",
      "sosua",
      "cabarete",
      "villa-gonzalez",
      "esperanza",
      "villa-vasquez",
    ],
  },
  {
    name: "Cibao Sur",
    slug: "cibao-sur",
    emoji: "🏔️",
    cities: [
      "la-vega",
      "jarabacoa",
      "constanza",
      "bonao",
      "cotui",
      "fantino",
      "piedra-blanca",
      "maimon",
      "villa-altagracia",
      "baitoa",
      "el-pino",
    ],
  },
  {
    name: "Cibao Nordeste",
    slug: "cibao-nordeste",
    emoji: "🌊",
    cities: [
      "san-francisco-de-macoris",
      "nagua",
      "samana",
      "las-terrenas",
      "salcedo",
      "tenares",
      "san-victor",
      "el-valle",
    ],
  },
  {
    name: "Cibao Noroeste",
    slug: "cibao-noroeste",
    emoji: "🌵",
    cities: [
      "mao",
      "monte-cristi",
      "moncion",
      "jicome-de-moncion",
      "santa-cruz-de-mao",
      "las-matas-de-santa-cruz",
      "buen-hombre",
      "villa-sinda",
    ],
  },
  {
    name: "Yuma (Este)",
    slug: "yuma",
    emoji: "🏖️",
    cities: [
      "la-romana",
      "higuey",
      "bayahibe",
      "san-pedro-de-macoris",
      "boca-chica",
      "hato-mayor-del-rey",
      "guaymate",
      "miches",
      "el-llano",
      "sabana-de-la-mar",
      "andres",
      "villa-hermosa",
      "cruce-de-guayacanes",
      "la-mata",
      "capilla",
    ],
  },
  {
    name: "Valdesia (Sur)",
    slug: "valdesia",
    emoji: "🌿",
    cities: [
      "san-cristobal",
      "bani",
      "azua",
      "san-jose-de-ocoa",
      "san-gregorio-de-nigua",
      "bajos-de-haina",
      "la-guayiga",
      "sabana-buey",
      "estebania",
      "el-prado",
      "sabana-larga",
    ],
  },
  {
    name: "Enriquillo (Suroeste)",
    slug: "enriquillo",
    emoji: "🏜️",
    cities: [
      "barahona",
      "neiba",
      "la-descubierta",
      "quita-coraza",
    ],
  },
  {
    name: "El Valle",
    slug: "el-valle-region",
    emoji: "🌾",
    cities: [
      "san-juan-de-la-maguana",
      "el-caimito",
      "san-jose-de-las-matas",
      "jabon-de-pueblo-nuevo",
      "juan-lopez",
      "rio-verde-arriba",
      "la-torre",
      "sabana-grande-de-boya",
      "bayaguana",
      "yamasa",
    ],
  },
];

// Flat lookup: city slug → region name
export function getRegionForCity(citySlug: string): string {
  for (const region of regions) {
    if (region.cities.includes(citySlug)) return region.name;
  }
  return "Otras";
}
