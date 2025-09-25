// data/recognition.ts

type Img = string;

export const awards = [
  {
    year: 2023,
    title: "Gold Medal — Salon International des Inventions de Genève",
    org: "Geneva International Exhibition of Inventions",
    location: "Geneva, Switzerland",
    blurb:
      "Gold Medal for the Witness project, awarded by an international jury.",
    images: ["/images/geneva_2023.jpg"] as Img[],
    professionalImpact:
      "Strengthened international credibility and opened doors for senior engineering interviews and cross-border collaborations.",
  },
  {
    year: 2018,
    title: "Gold Medal — Salon International des Inventions de Genève",
    org: "Geneva International Exhibition of Inventions",
    location: "Geneva, Switzerland",
    blurb: "Gold Medal for the Smart Wind Controller (SWC).",
    images: ["/images/geneva_2018.jpg"],
    professionalImpact:
      "Showcased end-to-end R&D to prototype execution with measurable value.",
  },
  {
    year: 2022,
    title: "Silver Medal — iENA International Trade Fair",
    org: "iENA",
    location: "Nuremberg, Germany",
    blurb: "Silver Medal for the Witness (Smart Contract) project.",
    images: ["/images/iena_2022.jpg"],
    professionalImpact:
      "Improved technical storytelling for juries and customers.",
  },
  {
    year: 2017,
    title: "Bronze Medal — iENA International Trade Fair (Youth Invention)",
    org: "iENA",
    location: "Nuremberg, Germany",
    blurb: "Bronze Medal for the Smart Wind Controller (SWC).",
    images: ["/images/iena_2017.jpg"],
    professionalImpact:
      "Early international validation of reliability and control work.",
  },
  {
    year: 2017,
    title: "Silver Medal — IIFME International Invention Fair of the Middle East",
    org: "Kuwait Science Club (IIFME)",
    location: "Kuwait City, Kuwait",
    blurb: "Silver Medal for the Magnetic Gun (M-Gun).",
    images: ["/images/iifme_2017.jpg"],
    professionalImpact:
      "Built confidence demoing hardware to non-technical audiences.",
  },
  {
    year: 2023,
    title: "Gold Medal — IIFME International Invention Fair of the Middle East",
    org: "Kuwait Science Club (IIFME)",
    location: "Kuwait City, Kuwait",
    blurb: "Gold Medal for the Witness project.",
    images: ["/images/iifme_2023.png"],
    professionalImpact:
      "Reinforced focus on auditability—useful for fintech/govtech.",
  },
  {
    year: 2016,
    title: "Bronze Prize — Seoul International Invention Fair",
    org: "KIPA",
    location: "Seoul, South Korea",
    blurb: "Bronze Prize for the Magnetic Coil Gun.",
    images: ["/images/seoul_2016_bronze.jpg"],
    professionalImpact:
      "Exposure to Asian evaluation standards (safety + novelty).",
  },
  {
    year: 2016,
    title: "German Special Prize — SIIF",
    org: "KIT-HAG Invention Association, Germany",
    location: "Seoul, South Korea",
    blurb: "German Special Prize for innovative invention (M-Gun).",
    images: ["/images/seoul_2016_germany.jpg"],
    professionalImpact:
      "Learned to tailor demos for different juries and criteria.",
  },
  {
    year: 2016,
    title: "National Science Fair — Participation (Lebanon)",
    org: "CNRS / Mobarat El Oloum",
    location: "Beirut, Lebanon",
    blurb: "Participation certificate and medal for M-Gun prototype.",
    images: ["/images/NASR.jpg"],
    professionalImpact:
      "First public showcase; drove rapid iteration and clear docs.",
  },
];

export const memberships = [
  {
    year: 2023,
    title: "IFIA Membership (Inv)",
    org: "International Federation of Inventors' Associations (IFIA)",
    blurb: "Recognized as an IFIA ‘Inv’ member.",
    images: ["/images/ifia_membership.jpg"],
    verifyUrl: "https://www.ifia.com/lb2023jun147acxa/",
    professionalImpact:
      "Strengthened innovation credentials and international network.",
  },
];

export const patents = [
  {
    year: 2017,
    title: "Smart Wind Controller",
    blurb:
      "Controller that optimizes turbine loads; demonstrated lifespan extension in testing contexts.",
    images: ["/images/patent_swc.jpg"], // place this image file in /public/images
    pdfUrl: "/docs/patents_portfolio.pdf",
    professionalImpact:
      "Signals systems-thinking and reliability engineering.",
  },
  {
    year: 2017,
    title: "Magnetic Gun (M-Gun)",
    blurb:
      "Magnetic propulsion prototype for controlled, non-combustion launching.",
    images: ["/images/patent_mgun.jpg"],
    pdfUrl: "/docs/patents_portfolio.pdf",
    professionalImpact:
      "Shows practical prototyping, risk assessment, and iteration.",
  },
];
