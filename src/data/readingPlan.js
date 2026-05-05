// --- DATOS CRONOLÓGICOS ---
const chronologicalBooks = [
  { book: "Génesis", start: 1, end: 11, era: "Los Orígenes" },
  { book: "Job", start: 1, end: 42, era: "Los Orígenes" },
  { book: "Génesis", start: 12, end: 50, era: "Los Orígenes" },
  { book: "Éxodo", start: 1, end: 40, era: "El Éxodo y la Tierra Prometida" },
  { book: "Levítico", start: 1, end: 27, era: "El Éxodo y la Tierra Prometida" },
  { book: "Números", start: 1, end: 36, era: "El Éxodo y la Tierra Prometida" },
  { book: "Deuteronomio", start: 1, end: 34, era: "El Éxodo y la Tierra Prometida" },
  { book: "Josué", start: 1, end: 24, era: "El Éxodo y la Tierra Prometida" },
  { book: "Jueces", start: 1, end: 21, era: "El Éxodo y la Tierra Prometida" },
  { book: "Rut", start: 1, end: 4, era: "El Éxodo y la Tierra Prometida" },
  { book: "1 Samuel", start: 1, end: 31, era: "El Reino Unido" },
  { book: "2 Samuel", start: 1, end: 24, era: "El Reino Unido" },
  { book: "Salmos", start: 1, end: 150, era: "El Reino Unido" },
  { book: "1 Crónicas", start: 1, end: 29, era: "El Reino Unido" },
  { book: "Proverbios", start: 1, end: 31, era: "El Reino Unido" },
  { book: "Eclesiastés", start: 1, end: 12, era: "El Reino Unido" },
  { book: "Cantares", start: 1, end: 8, era: "El Reino Unido" },
  { book: "1 Reyes", start: 1, end: 11, era: "El Reino Unido" },
  { book: "1 Reyes", start: 12, end: 22, era: "El Reino Dividido" },
  { book: "2 Reyes", start: 1, end: 25, era: "El Reino Dividido" },
  { book: "2 Crónicas", start: 1, end: 36, era: "El Reino Dividido" },
  { book: "Isaías", start: 1, end: 66, era: "El Reino Dividido" },
  { book: "Oseas", start: 1, end: 14, era: "El Reino Dividido" },
  { book: "Joel", start: 1, end: 3, era: "El Reino Dividido" },
  { book: "Amós", start: 1, end: 9, era: "El Reino Dividido" },
  { book: "Abdías", start: 1, end: 1, era: "El Reino Dividido" },
  { book: "Jonás", start: 1, end: 4, era: "El Reino Dividido" },
  { book: "Miqueas", start: 1, end: 7, era: "El Reino Dividido" },
  { book: "Nahúm", start: 1, end: 3, era: "El Reino Dividido" },
  { book: "Habacuc", start: 1, end: 3, era: "El Reino Dividido" },
  { book: "Sofonías", start: 1, end: 3, era: "El Reino Dividido" },
  { book: "Jeremías", start: 1, end: 52, era: "El Reino Dividido" },
  { book: "Lamentaciones", start: 1, end: 5, era: "El Reino Dividido" },
  { book: "Ezequiel", start: 1, end: 48, era: "El Exilio y Retorno" },
  { book: "Daniel", start: 1, end: 12, era: "El Exilio y Retorno" },
  { book: "Esdras", start: 1, end: 10, era: "El Exilio y Retorno" },
  { book: "Nehemías", start: 1, end: 13, era: "El Exilio y Retorno" },
  { book: "Ester", start: 1, end: 10, era: "El Exilio y Retorno" },
  { book: "Hageo", start: 1, end: 2, era: "El Exilio y Retorno" },
  { book: "Zacarías", start: 1, end: 14, era: "El Exilio y Retorno" },
  { book: "Malaquías", start: 1, end: 4, era: "El Exilio y Retorno" },
  { book: "Mateo", start: 1, end: 28, era: "La Vida de Jesús" },
  { book: "Marcos", start: 1, end: 16, era: "La Vida de Jesús" },
  { book: "Lucas", start: 1, end: 24, era: "La Vida de Jesús" },
  { book: "Juan", start: 1, end: 21, era: "La Vida de Jesús" },
  { book: "Hechos", start: 1, end: 28, era: "La Primera Iglesia y Cartas" },
  { book: "Santiago", start: 1, end: 5, era: "La Primera Iglesia y Cartas" },
  { book: "Gálatas", start: 1, end: 6, era: "La Primera Iglesia y Cartas" },
  { book: "1 Tesalonicenses", start: 1, end: 5, era: "La Primera Iglesia y Cartas" },
  { book: "2 Tesalonicenses", start: 1, end: 3, era: "La Primera Iglesia y Cartas" },
  { book: "1 Corintios", start: 1, end: 16, era: "La Primera Iglesia y Cartas" },
  { book: "2 Corintios", start: 1, end: 13, era: "La Primera Iglesia y Cartas" },
  { book: "Romanos", start: 1, end: 16, era: "La Primera Iglesia y Cartas" },
  { book: "Efesios", start: 1, end: 6, era: "La Primera Iglesia y Cartas" },
  { book: "Filipenses", start: 1, end: 4, era: "La Primera Iglesia y Cartas" },
  { book: "Colosenses", start: 1, end: 4, era: "La Primera Iglesia y Cartas" },
  { book: "Filemón", start: 1, end: 1, era: "La Primera Iglesia y Cartas" },
  { book: "1 Timoteo", start: 1, end: 6, era: "La Primera Iglesia y Cartas" },
  { book: "Tito", start: 1, end: 3, era: "La Primera Iglesia y Cartas" },
  { book: "1 Pedro", start: 1, end: 5, era: "La Primera Iglesia y Cartas" },
  { book: "Hebreos", start: 1, end: 13, era: "La Primera Iglesia y Cartas" },
  { book: "2 Timoteo", start: 1, end: 4, era: "La Primera Iglesia y Cartas" },
  { book: "2 Pedro", start: 1, end: 3, era: "La Primera Iglesia y Cartas" },
  { book: "1 Juan", start: 1, end: 5, era: "La Primera Iglesia y Cartas" },
  { book: "2 Juan", start: 1, end: 1, era: "La Primera Iglesia y Cartas" },
  { book: "3 Juan", start: 1, end: 1, era: "La Primera Iglesia y Cartas" },
  { book: "Judas", start: 1, end: 1, era: "La Primera Iglesia y Cartas" },
  { book: "Apocalipsis", start: 1, end: 22, era: "La Primera Iglesia y Cartas" },
];

const generatePlan = (books, chaptersPerDay) => {
  const plan = [];
  let currentDayChapters = [];
  books.forEach((block) => {
    for (let i = block.start; i <= block.end; i++) {
      currentDayChapters.push({ book: block.book, chapter: i, era: block.era });
      if (currentDayChapters.length === chaptersPerDay) {
        plan.push({
          day: plan.length + 1,
          chapters: currentDayChapters,
          era: currentDayChapters[0].era,
        });
        currentDayChapters = [];
      }
    }
  });
  if (currentDayChapters.length > 0) {
    plan.push({
      day: plan.length + 1,
      chapters: currentDayChapters,
      era: currentDayChapters[0].era,
    });
  }
  return plan;
};

export const readingPlan = generatePlan(chronologicalBooks, 2);
export const totalDays = readingPlan.length;

export const erasList = [
  "Los Orígenes",
  "El Éxodo y la Tierra Prometida",
  "El Reino Unido",
  "El Reino Dividido",
  "El Exilio y Retorno",
  "La Vida de Jesús",
  "La Primera Iglesia y Cartas",
];

export const planByEra = erasList.map((eraName) => ({
  name: eraName,
  days: readingPlan.filter((d) => d.era === eraName),
}));

