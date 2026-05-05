import { BookOpen, Scroll, CheckCircle, X, Crown, Send } from 'lucide-react';
import { chapterImages } from '../data/chapterImages';
import { bibleVersions } from '../data/bibleVersions';

/* ──────────────────────────────────────────────────────────
   Flame sub-component (decorative candle flame for the AI btn)
────────────────────────────────────────────────────────── */
function Flame({ style = {} }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center pt-2">
      <div className="flame-main" style={style} />
      <div className="flame-inner" style={style} />
      <div className="w-2 h-5 bg-gradient-to-r from-[#1a0f09] via-[#4a2e15] to-[#1a0f09] border-x border-[#1a0f09] rounded-b-sm z-10" />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Assistant Chat Panel
────────────────────────────────────────────────────────── */
function AssistantPanel({
  isAssistantOpen,
  setIsAssistantOpen,
  chatMessages,
  chatInput,
  setChatInput,
  isTyping,
  messagesEndRef,
  handleSendMessage,
}) {
  return (
    <div
      className={`absolute bottom-4 right-4 md:bottom-8 md:right-8 w-[calc(100%-2rem)] sm:w-[350px] max-h-[70vh]
        bg-[#f4e8d1] shadow-[0_0_40px_rgba(0,0,0,0.6)] z-[100] rounded-2xl border-2 border-[#8b5a2b]
        flex flex-col overflow-hidden transition-all transform origin-bottom-right duration-300
        ${isAssistantOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-0 opacity-0 pointer-events-none'}`}
    >
      {/* Panel header */}
      <div className="bg-[#4a2e15] text-[#f4e8d1] p-3 flex justify-between items-center shadow-md z-10">
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 flex justify-center items-end pb-1 border border-[#8b5a2b] rounded bg-[#2c1a0f]">
            <div className="flame-main" style={{ width: '10px', height: '10px', top: '-5px', marginLeft: '-5px' }} />
            <div className="flame-inner" style={{ width: '6px', height: '6px', top: '-2px', marginLeft: '-3px' }} />
          </div>
          <h3 className="font-cinzel font-bold text-sm leading-none">Erudito IA</h3>
        </div>
        <button
          onClick={() => setIsAssistantOpen(false)}
          className="p-1 rounded-full hover:bg-[#8b5a2b]/30"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 reader-scroll bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] min-h-[200px]">
        {chatMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-80 px-2 py-4">
            <p className="text-[#4a2e15] font-cinzel font-bold mb-1 text-sm">¡Ilumina tu lectura!</p>
            <p className="text-xs text-[#4a2e15]">
              Selecciona una pregunta rápida o escribe tu duda sobre el contexto de estos capítulos.
            </p>
          </div>
        ) : (
          chatMessages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-lg p-2 shadow-sm text-sm ${
                  msg.role === 'user'
                    ? 'bg-[#8b5a2b] text-[#f4e8d1] rounded-br-none'
                    : 'bg-white border border-[#e3ceaa] text-[#2c1a0f] rounded-bl-none'
                }`}
              >
                {msg.role === 'model' && <Crown size={12} className="text-[#8b5a2b] mb-1" />}
                <div
                  className="chat-markdown"
                  dangerouslySetInnerHTML={{
                    __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                  }}
                />
              </div>
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#e3ceaa] text-[#8b5a2b] rounded-lg rounded-bl-none p-2 shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#8b5a2b] rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-[#8b5a2b] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 bg-[#8b5a2b] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick prompts */}
      <div className="bg-[#e3ceaa] px-2 py-2 flex gap-2 overflow-x-auto reader-scroll border-t border-[#8b5a2b]/30">
        {['🏛️ Contexto Histórico', '🤔 Significado de palabras', '💡 Resumen del capítulo'].map(
          (prompt, i) => (
            <button
              key={i}
              onClick={(e) => handleSendMessage(e, prompt)}
              disabled={isTyping}
              className="whitespace-nowrap text-[10px] sm:text-xs font-bold bg-[#f4e8d1] border border-[#8b5a2b] text-[#4a2e15] px-2 py-1 rounded-full hover:bg-[#8b5a2b] hover:text-[#f4e8d1] disabled:opacity-50"
            >
              {prompt}
            </button>
          )
        )}
      </div>

      {/* Input form */}
      <form onSubmit={(e) => handleSendMessage(e)} className="p-2 bg-[#e3ceaa] border-t border-[#8b5a2b]/30 flex gap-2">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Escribe tu duda..."
          className="flex-1 bg-[#f4e8d1] border border-[#8b5a2b]/50 rounded-full px-3 py-1.5 text-sm focus:outline-none focus:ring-2 ring-[#8b5a2b]"
        />
        <button
          type="submit"
          disabled={isTyping || !chatInput.trim()}
          className="bg-[#4a2e15] text-[#f4e8d1] p-1.5 rounded-full hover:bg-[#2c1a0f] disabled:opacity-50 shadow-md flex justify-center items-center w-8 h-8"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Main Reader Modal
────────────────────────────────────────────────────────── */
export default function ReaderModal({
  currentDayData,
  isLoadingReader,
  chapterContent,
  onClose,
  onFinishedReading,
  selectedVersion,
  // assistant props
  isAssistantOpen,
  setIsAssistantOpen,
  chatMessages,
  chatInput,
  setChatInput,
  isTyping,
  messagesEndRef,
  handleSendMessage,
}) {
  const versionLabel = bibleVersions.find((v) => v.slug === selectedVersion)?.label || selectedVersion;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="parchment-bg leather-border w-full max-w-4xl max-h-[90vh] rounded-lg overflow-hidden flex flex-col relative shadow-2xl">

        {/* Modal header */}
        <div className="p-4 border-b border-[#8b5a2b]/30 flex justify-between items-center bg-[#e3ceaa]">
          <h2 className="font-cinzel font-bold text-xl text-[#2c1a0f] flex items-center gap-2">
            <BookOpen size={20} className="text-[#8b5a2b]" />
            <span>Día {currentDayData.day}</span>
            <span className="text-xs bg-[#4a2e15] text-[#f4e8d1] px-2 py-0.5 rounded-full font-bold tracking-wide">
              {versionLabel}
            </span>
          </h2>
          <button
            id="btn-close-reader"
            onClick={onClose}
            className="p-1 rounded hover:bg-[#8b5a2b]/20 text-[#4a2e15]"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto reader-scroll p-6 md:p-12 text-lg leading-relaxed text-[#2c1a0f]">
          {isLoadingReader ? (
            <div className="flex flex-col items-center justify-center h-64 opacity-70">
              <Scroll className="animate-pulse mb-4 text-[#8b5a2b]" size={48} />
              <p className="font-cinzel text-xl text-[#4a2e15]">Desenrollando pergaminos...</p>
            </div>
          ) : (
            chapterContent.map((ch, i) => (
              <div key={i} className="mb-16 last:mb-4">
                <h3 className="font-cinzel text-3xl md:text-5xl font-bold mb-6 text-center text-[#4a2e15] border-b-2 border-[#8b5a2b]/20 pb-4 inline-block mx-auto w-full">
                  {ch.reference}
                </h3>

                {/* Gustave Doré illustration */}
                {chapterImages[ch.reference] && (
                  <img
                    src={chapterImages[ch.reference]}
                    alt={`Ilustración de ${ch.reference}`}
                    className="ink-engraving"
                  />
                )}

                <div className="text-justify mt-4">
                  {ch.verses.map((v, idx) => {
                    if (idx === 0) {
                      return (
                        <p key={v.verse} className="mb-2">
                          <span
                            className="float-left text-6xl md:text-7xl font-cinzel text-[#8b5a2b] pr-3 pt-2 leading-none"
                            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
                          >
                            {v.text.charAt(0)}
                          </span>
                          <sup className="text-xs font-bold text-[#8b5a2b] mr-1">{v.verse}</sup>
                          {v.text.slice(1)}{' '}
                        </p>
                      );
                    }
                    return (
                      <span key={v.verse}>
                        <sup className="text-xs font-bold text-[#8b5a2b] mr-1 ml-1">{v.verse}</sup>
                        {v.text}{' '}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))
          )}

          {!isLoadingReader && (
            <div className="mt-12 flex justify-center pb-8">
              <button
                id="btn-finished-reading"
                onClick={onFinishedReading}
                className="flex gap-2 bg-[#8b5a2b] hover:bg-[#4a2e15] text-[#f4e8d1] px-6 py-3 rounded-full font-cinzel font-bold shadow-lg"
              >
                <CheckCircle size={20} /> He terminado de leer
              </button>
            </div>
          )}
        </div>

        {/* Flame button to open AI assistant */}
        <button
          id="btn-open-assistant"
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className={`absolute bottom-4 right-4 md:bottom-8 md:right-8 z-[90] w-14 h-14 bg-gradient-to-br from-[#2c1a0f] to-[#1a0f09] rounded-full border-2 border-[#8b5a2b] shadow-[0_0_20px_rgba(255,140,0,0.4)] flex justify-center transition-all hover:scale-110 ${
            isAssistantOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
          }`}
        >
          <Flame />
        </button>

        {/* AI Chat panel */}
        <AssistantPanel
          isAssistantOpen={isAssistantOpen}
          setIsAssistantOpen={setIsAssistantOpen}
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
