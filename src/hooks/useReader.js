import { useState } from 'react';
import { bookMap, denoBookMap } from '../data/bookMaps';

/**
 * Manages the Bible reader modal: fetching verses from the Deno API
 * for a given version, with fallback to bible-api.com (English).
 */
export function useReader() {
  const [isReading, setIsReading] = useState(false);
  const [isLoadingReader, setIsLoadingReader] = useState(false);
  const [chapterContent, setChapterContent] = useState([]);

  const openReader = async (chapters, version = 'rv1960') => {
    setIsReading(true);
    setIsLoadingReader(true);
    setChapterContent([]);

    try {
      const results = await Promise.all(
        chapters.map(async (chap) => {
          let fetchedVerses = [];

          // --- Primary: Deno API with selected version ---
          const apiBookEsp = denoBookMap[chap.book];
          if (apiBookEsp) {
            try {
              const res = await fetch(
                `https://bible-api.deno.dev/api/read/${version}/${apiBookEsp}/${chap.chapter}`
              );
              if (res.ok) {
                const data = await res.json();
                const versArray = Array.isArray(data)
                  ? data
                  : data.vers || data.verses || [];
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
          }

          // --- Fallback: English bible-api.com ---
          if (fetchedVerses.length === 0) {
            const engBook = bookMap[chap.book] || chap.book;
            const searchQuery = encodeURIComponent(`${engBook} ${chap.chapter}`);
            try {
              const resEng = await fetch(`https://bible-api.com/${searchQuery}`);
              if (resEng.ok) {
                const dataEng = await resEng.json();
                fetchedVerses = (dataEng.verses || []).map((v) => ({
                  verse: v.verse,
                  text: v.text,
                }));
              }
            } catch (_) {
              // both failed
            }
          }

          if (fetchedVerses.length === 0) {
            fetchedVerses = [{ verse: 1, text: 'Pergaminos inaccesibles. Usa el botón externo.' }];
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
