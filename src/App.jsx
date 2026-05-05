import { useState } from 'react';

import Header       from './components/Header';
import ProgressBar  from './components/ProgressBar';
import NavTabs      from './components/NavTabs';
import MusicButton  from './components/MusicButton';
import DailyCard    from './components/DailyCard';
import TimelineView from './components/TimelineView';
import ReaderModal  from './components/ReaderModal';

import { useProgress  } from './hooks/useProgress';
import { useReader    } from './hooks/useReader';
import { useAudio     } from './hooks/useAudio';
import { useAssistant } from './hooks/useAssistant';

import { totalDays } from './data/readingPlan';

export default function App() {
  const [viewMode, setViewMode] = useState('daily');

  // ── Custom hooks ──────────────────────────────────────
  const {
    completedDays,
    currentViewDay,
    setCurrentViewDay,
    isLoaded,
    toggleDayCompletion,
    progressPercentage,
    currentDayData,
  } = useProgress();

  const { isReading, isLoadingReader, chapterContent, openReader, closeReader } = useReader();

  const { audioRef, isPlayingMusic, toggleMusic } = useAudio();

  const {
    isAssistantOpen,
    setIsAssistantOpen,
    chatMessages,
    chatInput,
    setChatInput,
    isTyping,
    messagesEndRef,
    handleSendMessage,
  } = useAssistant(currentDayData);

  // Don't render until localStorage is loaded
  if (!isLoaded) return null;

  const isCompleted = completedDays.includes(currentViewDay);

  const handleOpenReader = (chapters) => {
    openReader(chapters);
    setIsAssistantOpen(false);
  };

  const handleFinishedReading = () => {
    toggleDayCompletion(currentViewDay);
    closeReader();
    setIsAssistantOpen(false);
  };

  return (
    <div className="min-h-screen relative font-serif text-amber-900 selection:bg-amber-900 selection:text-amber-100 flex flex-col">

      {/* Ambient music — local file (Bach Air on G String) */}
      <audio ref={audioRef} src="/audio/ambient.mp3" loop preload="auto" style={{ display: 'none' }} />

      {/* Floating music button */}
      <MusicButton isPlayingMusic={isPlayingMusic} toggleMusic={toggleMusic} />

      {/* Page header */}
      <Header />

      {/* Progress bar */}
      <ProgressBar
        completedDays={completedDays.length}
        totalDays={totalDays}
        progressPercentage={progressPercentage}
      />

      {/* View switcher tabs */}
      <NavTabs viewMode={viewMode} setViewMode={setViewMode} />

      {/* Main content */}
      <main className="flex-grow flex items-start justify-center p-4 z-10 w-full overflow-y-auto">
        {viewMode === 'daily' ? (
          <DailyCard
            currentDayData={currentDayData}
            currentViewDay={currentViewDay}
            setCurrentViewDay={setCurrentViewDay}
            isCompleted={isCompleted}
            toggleDayCompletion={toggleDayCompletion}
            onOpenReader={handleOpenReader}
          />
        ) : (
          <TimelineView
            completedDays={completedDays}
            currentViewDay={currentViewDay}
            setCurrentViewDay={setCurrentViewDay}
            setViewMode={setViewMode}
          />
        )}
      </main>

      {/* Reader modal (only when open) */}
      {isReading && (
        <ReaderModal
          currentDayData={currentDayData}
          isLoadingReader={isLoadingReader}
          chapterContent={chapterContent}
          onClose={() => { closeReader(); setIsAssistantOpen(false); }}
          onFinishedReading={handleFinishedReading}
          isAssistantOpen={isAssistantOpen}
          setIsAssistantOpen={setIsAssistantOpen}
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
          handleSendMessage={handleSendMessage}
        />
      )}

      <footer className="text-center p-6 text-amber-200/40 text-sm font-cinzel z-10 flex-shrink-0">
        Lectura en Orden Histórico
      </footer>
    </div>
  );
}
