export const DEFAULT_TRANSITION_TIMEOUT = 300;

export const TICKET_CATEGORIES = [
    {
      GR: "Στρατιωτικό",
      EN: "Army",
      value: "army",
      discount: 0.25,
      priority: 8,
    },
    {
      GR: "Παιδικό έως 12 ετών",
      EN: "Child up to 12 years old",
      value: "child",
      discount: 0.5,
      priority: 7,
    },
    {
      GR: "ΑμεΑ",
      EN: "Physically challenged",
      value: "disabled",
      discount: 0.5,
      priority: 2,
    },
    {
      GR: "Άνω των 65 ετών",
      EN: "Over 65 years old",
      value: "elder",
      discount: 0.25,
      priority: 3,
    },
    {
      GR: "Μέλη FIP",
      EN: "FIP members",
      value: "fipCard",
      discount: 0.5,
      priority: 9,
    },
    {
      GR: "Κανονικό",
      EN: "Full Price",
      value: "full",
      discount: 0,
      priority: 1,
    },
    {
      GR: "Πολύτεκνο",
      EN: "Multi-child",
      value: "multiChild",
      discount: 0.5,
    },
    {
      GR: "Κάτοχοι μαθητικής κάρτας",
      EN: "Pupil card holders",
      value: "pupilCard",
      discount: 0.5,
      priority: 6,
    },
    {
      GR: "Μέλη Rail Plus",
      EN: "Rail Plus members",
      value: "railPlus",
      discount: 0.15,
      priority: 10,
    },
    {
      GR: "Φοιτητικό 25%",
      EN: "Student 25%",
      value: "student25",
      discount: 0.25,
      priority: 4,
    },
    {
      GR: "Φοιτητικό 50%",
      EN: "Student 50%",
      value: "student50",
      discount: 0.5,
      priority: 5,
    }
]