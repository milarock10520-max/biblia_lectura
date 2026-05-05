import { BookOpen, Scroll, Shield, Crown, Map, MapPin, CheckCircle } from 'lucide-react';

/**
 * Returns the era icon component for a given era name.
 */
export const getEraIcon = (era) => {
  switch (era) {
    case "Los Orígenes":
      return <Scroll size={20} />;
    case "El Éxodo y la Tierra Prometida":
      return <Map size={20} />;
    case "El Reino Unido":
      return <Crown size={20} />;
    case "El Reino Dividido":
      return <Shield size={20} />;
    case "El Exilio y Retorno":
      return <MapPin size={20} />;
    case "La Vida de Jesús":
      return <BookOpen size={20} />;
    case "La Primera Iglesia y Cartas":
      return <CheckCircle size={20} />;
    default:
      return <Scroll size={20} />;
  }
};

/**
 * Builds a BibleGateway URL for the given chapters (NTV version).
 */
export const getGatewayUrl = (chapters) => {
  const searchString = chapters.map((c) => `${c.book} ${c.chapter}`).join(', ');
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(searchString)}&version=NTV`;
};
