import { useState, useRef, useEffect } from 'react';

const GEMINI_API_KEY = 'AIzaSyC9STq--ancsu3LhlFokPVSPoPLvwLjwXI';
const GEMINI_MODEL  = 'gemini-3-flash-preview';
const GEMINI_URL    = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Manages the AI scholar assistant chat state and Gemini API calls.
 */
export function useAssistant(currentDayData) {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isAssistantOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAssistantOpen]);

  const handleSendMessage = async (e, presetText = null) => {
    if (e) e.preventDefault();
    const textToSend = presetText || chatInput;
    if (!textToSend.trim()) return;

    const contextInfo = `El usuario está en el Día ${currentDayData.day}, leyendo: ${currentDayData.chapters
      .map((c) => `${c.book} ${c.chapter}`)
      .join(', ')}.`;

    const newUserMsg = { role: 'user', text: textToSend };
    const newHistory = [...chatMessages, newUserMsg];

    setChatMessages(newHistory);
    if (!presetText) setChatInput('');
    setIsTyping(true);

    const systemPrompt = `Eres un erudito bíblico integrado en la app "Cronos Bíblico". Ayudas a explicar el contexto histórico, teológico y cultural. ${contextInfo} Sé didáctico, amable y conciso (no uses formato demasiado complejo, máximo negritas cortas).`;

    const contents = newHistory.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    let responseText =
      'Lo siento, la llama de mi sabiduría titubeó. Por favor, intenta de nuevo.';

    for (let i = 0; i < 5; i++) {
      try {
        const res = await fetch(GEMINI_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents,
          }),
        });
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();
        responseText =
          data.candidates?.[0]?.content?.parts?.[0]?.text || responseText;
        break;
      } catch (err) {
        if (i === 4) console.error('Error API Gemini:', err);
        await new Promise((r) =>
          setTimeout(r, [1000, 2000, 4000, 8000, 16000][i])
        );
      }
    }

    setChatMessages([...newHistory, { role: 'model', text: responseText }]);
    setIsTyping(false);
  };

  return {
    isAssistantOpen,
    setIsAssistantOpen,
    chatMessages,
    chatInput,
    setChatInput,
    isTyping,
    messagesEndRef,
    handleSendMessage,
  };
}
