/**
 * Available Bible versions from the Deno API.
 * Each entry has the display label and API slug.
 */
export const bibleVersions = [
  { label: 'Reina Valera 1960',        slug: 'rv1960', lang: 'es' },
  { label: 'Reina Valera 1995',        slug: 'rv1995', lang: 'es' },
  { label: 'Nueva Versión Internacional', slug: 'nvi',  lang: 'es' },
  { label: 'Dios Habla Hoy',           slug: 'dhh',    lang: 'es' },
  { label: 'Palabra de Dios para Todos', slug: 'pdt',  lang: 'es' },
  { label: 'King James Version',       slug: 'kjv',    lang: 'en' },
];

export const DEFAULT_VERSION = 'rv1960';
