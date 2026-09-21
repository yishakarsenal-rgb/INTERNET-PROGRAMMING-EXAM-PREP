"use client";

import { useState } from "react";
import { Chapter } from "@/lib/course-data";
import {
  CheckCircle2,
  ChevronLeft,
  BookOpen,
  ClipboardList,
  Menu,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import QuizPanel from "@/components/quiz-panel";
import ContentRenderer from "@/components/content-renderer";
type Tab = "notes" | "quiz";
type Props = {
  chapter: Chapter;
  isCompleted: boolean;
  quizScore: number | undefined;
  onMarkComplete: () => void;
  onSaveQuizScore: (score: number) => void;
  onOpenSidebar: () => void;
  onBack: () => void;
};

export default function ChapterView({
  chapter,
  isCompleted,
  quizScore,
  onMarkComplete,
  onSaveQuizScore,
  onOpenSidebar,
  onBack,
}: Props) {
  const [tab, setTab] = useState<Tab>("notes");
  const [activeSectionId, setActiveSectionId] = useState<string>(
    chapter.sections[0]?.id ?? "",
  );
  const isIPII = chapter.course === "IP-II";

  const accentColor = isIPII
    ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
    : "text-blue-400 bg-blue-500/10 border-blue-500/30";

  const badgeColor = isIPII
    ? "bg-emerald-500/20 text-emerald-400"
    : "bg-blue-500/20 text-blue-400";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-background/50 backdrop-blur-xl border-b border-border/50 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${badgeColor}`}
              >
                {chapter.course} · Ch.{chapter.number}
              </span>
              <h1 className="text-sm font-semibold text-foreground truncate">
                {chapter.title}
              </h1>
            </div>
          </div>
          {!isCompleted ? (
            <button
              onClick={onMarkComplete}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mark done</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-500 text-xs shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Completed</span>
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground text-balance mb-1">
            {chapter.title}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {chapter.description}
          </p>
        </div>

        <div className={`mb-6 p-4 rounded-xl border ${accentColor}`}>
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-2.5 opacity-70">
            Learning Objectives
          </h3>
          <ul className="space-y-1.5">
            {chapter.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-current shrink-0 opacity-60" />
                <span className="leading-relaxed">{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-muted rounded-lg mb-6 w-fit">
          <TabButton
            active={tab === "notes"}
            onClick={() => setTab("notes")}
            icon={<BookOpen className="w-3.5 h-3.5" />}
            label="Study Notes"
          />
          <TabButton
            active={tab === "quiz"}
            onClick={() => setTab("quiz")}
            icon={<ClipboardList className="w-3.5 h-3.5" />}
            label={`Quiz${quizScore !== undefined ? ` (${quizScore}/${chapter.quiz.length})` : ""}`}
          />
        </div>

        {/* Tab content */}
        {tab === "notes" ? (
          <NotesTab
            chapter={chapter}
            activeSectionId={activeSectionId}
            onSelectSection={setActiveSectionId}
          />
        ) : (
          <QuizPanel
            questions={chapter.quiz}
            existingScore={quizScore}
            onComplete={(score) => {
              onSaveQuizScore(score);
              if (score >= chapter.quiz.length * 0.6) {
                onMarkComplete();
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function NotesTab({
  chapter,
  activeSectionId,
  onSelectSection,
}: {
  chapter: Chapter;
  activeSectionId: string;
  onSelectSection: (id: string) => void;
}) {
  return (
    <div className="flex gap-6">
      {/* Section nav (desktop) */}
      <nav className="hidden lg:block w-48 shrink-0" aria-label="Sections">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
          Sections
        </p>
        <div className="space-y-0.5">
          {chapter.sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSelectSection(section.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors leading-relaxed ${
                activeSectionId === section.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </nav>

      {/* section content */}
      <div className="flex-1 min-w-0">
        {/* mobile accordion */}
        <div className="lg:hidden space-y-3 mb-4">
          {chapter.sections.map((section) => (
            <MobileSection
              key={section.id}
              section={section}
              isActive={activeSectionId === section.id}
              onToggle={() =>
                onSelectSection(
                  section.id === activeSectionId ? "" : section.id,
                )
              }
            />
          ))}
        </div>

        {/* desktop full content */}
        <div className="hidden lg:block">
          {chapter.sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className={`mb-8 ${activeSectionId === section.id ? "" : "opacity-70 hover:opacity-100 transition-opacity"}`}
              onClick={() => onSelectSection(section.id)}
            >
              <h3 className="text-base font-semibold text-foreground mb-4 cursor-pointer hover:text-primary transition-colors">
                {section.title}
              </h3>
              <ContentRenderer content={section.content} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileSection({
  section,
  isActive,
  onToggle,
}: {
  section: { id: string; title: string; content: string };
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted transition-colors"
      >
        <span className="text-sm font-medium text-foreground">
          {section.title}
        </span>
        {isActive ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>
      {isActive && (
        <div className="px-4 pb-4 border-t border-border bg-card">
          <div className="pt-4">
            <ContentRenderer content={section.content} />
          </div>
        </div>
      )}
    </div>
  );
}
