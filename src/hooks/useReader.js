import { useState, useRef } from 'react';
import { bookMap, denoBookMap } from '../data/bookMaps';

/**
 * Manages the Bible reader modal: fetching verses from both the
 * Spanish (Deno) and English (bible-api.com) fallback APIs.
 */
export function useReader() {
  const [isReading, setIsReading] = useState(false);
  const [isLoadingReader, setIsLoadingReader] = useState(false);
  const [chapterContent, setChapterContent] = useState([]);

  const openReader = async (chapters) => {
    setIsReading(true);
    setIsLoadingReader(true);
    setChapterContent([]);

    try {
      const results = await Promise.all(
        chapters.map(async (chap) => {
          let fetchedVerses = [];
          const apiBookEsp = denoBookMap[chap.book];

          // --- Primary source: Spanish RV1960 (Deno API) ---
          try {
            const resEsp = await fetch(
              `https://bible-api.deno.dev/api/read/rv1960/${apiBookEsp}/${chap.chapter}`
            );
            if (resEsp.ok) {
              const dataEsp = await resEsp.json();
              const versArray = Array.isArray(dataEsp)
                ? dataEsp
                : dataEsp.vers || dataEsp.verses || [];
              if (versArray.length > 0) {
                fetchedVerses = versArray.map((v) => ({
                  verse: v.number || v.verse || v.id,
                  text: v.text || v.verse || '...',
                }));
              }
            }
          } catch (_) {
            // silent fail, try backup
          }

          // --- Fallback: English bible-api.com ---
          if (fetchedVerses.length === 0) {
            const engBook = bookMap[chap.book] || chap.book;
            const searchQuery = encodeURIComponent(`${engBook} ${chap.chapter}`);
            const resEng = await fetch(`https://bible-api.com/${searchQuery}`);
            if (!resEng.ok) throw new Error('Fallo Backup');
            const dataEng = await resEng.json();
            fetchedVerses = dataEng.verses.map((v) => ({
              verse: v.verse,
              text: v.text,
            }));
          }

          return { reference: `${chap.book} ${chap.chapter}`, verses: fetchedVerses };
        })
      );
      setChapterContent(results);
    } catch (error) {
      setChapterContent([
        {
          reference: 'Fallo en la conexión',
          verses: [{ verse: 1, text: 'Pergaminos inaccesibles. Usa el botón externo.' }],
        },
      ]);
    } finally {
      setIsLoadingReader(false);
    }
  };

  const closeReader = () => {
    setIsReading(false);
    setChapterContent([]);
  };

  return { isReading, isLoadingReader, chapterContent, openReader, closeReader };
}
