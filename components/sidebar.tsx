"use client";

import {
  CheckCircle2,
  Circle,
  BookOpen,
  X,
  Home,
  ClipboardList,
} from "lucide-react";
import { Course } from "@/lib/course-data";

type Props = {
  courses: Course[];
  activeChapterId: string | null;
  completedChapters: Set<string>;
  quizScores: Record<string, number>;
  onSelectChapter: (id: string) => void;
  onSelectHome: () => void;
  onOpenMockExam: () => void;
  isMockExamActive: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({
  courses,
  activeChapterId,
  completedChapters,
  quizScores,
  onSelectChapter,
  onSelectHome,
  onOpenMockExam,
  isMockExamActive,
  isOpen,
  onClose,
}: Props) {
  const totalChapters = courses.flatMap((c) => c.chapters).length;
  const completedCount = completedChapters.size;
  const progress =
    totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-72 flex flex-col
          bg-card/80 backdrop-blur-xl border-r border-border/60
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        aria-label="Course navigation"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-border/60">
          <button
            onClick={onSelectHome}
            className="flex items-center gap-2 group"
            aria-label="Go to home"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground leading-none group-hover:text-primary transition-colors">
                IP Study Hub
              </p>
              <p className="text-xs text-muted-foreground leading-none mt-0.5">
                COSC 3031/3032
              </p>
            </div>
          </button>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-border/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">
              Overall progress
            </span>
            <span className="text-xs font-medium text-foreground">
              {completedCount}/{totalChapters}
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        <div className="px-2 pt-2 space-y-0.5">
          <button
            onClick={onSelectHome}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeChapterId === null && !isMockExamActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={onOpenMockExam}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isMockExamActive
                ? "bg-amber-500/15 text-amber-400 font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <ClipboardList className="w-4 h-4 shrink-0" />
            <span>Mock Exam</span>
            <span className="ml-auto text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-medium">
              100Q
            </span>
          </button>
        </div>

        <nav
          className="flex-1 overflow-y-auto px-2 pb-4 mt-2"
          aria-label="Chapters"
        >
          {courses.map((course) => (
            <CourseSection
              key={course.id}
              course={course}
              activeChapterId={activeChapterId}
              completedChapters={completedChapters}
              quizScores={quizScores}
              onSelectChapter={onSelectChapter}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}

function CourseSection({
  course,
  activeChapterId,
  completedChapters,
  quizScores,
  onSelectChapter,
}: {
  course: Course;
  activeChapterId: string | null;
  completedChapters: Set<string>;
  quizScores: Record<string, number>;
  onSelectChapter: (id: string) => void;
}) {
  const completedInCourse = course.chapters.filter((ch) =>
    completedChapters.has(ch.id),
  ).length;
  const isIPII = course.id === "IP-II";

  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 px-2 py-1.5 rounded-md">
        <div
          className={`w-2 h-2 rounded-full shrink-0 ${
            isIPII ? "bg-emerald-500" : "bg-cyan-400"
          }`}
        />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {course.id} — {course.chapters.length} ch
        </span>
        <span className="ml-auto text-xs text-muted-foreground">
          {completedInCourse}/{course.chapters.length}
        </span>
      </div>

      <div className="mt-0.5 space-y-0.5">
        {course.chapters.map((chapter) => {
          const isChapterActive = chapter.id === activeChapterId;
          const isCompleted = completedChapters.has(chapter.id);
          const score = quizScores[chapter.id];

          return (
            <button
              key={chapter.id}
              onClick={() => onSelectChapter(chapter.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-sm transition-colors group ${
                isChapterActive
                  ? isIPII
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-cyan-500/10 text-cyan-400"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
              aria-current={isChapterActive ? "page" : undefined}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
              ) : (
                <Circle className="w-3.5 h-3.5 shrink-0 opacity-30" />
              )}
              <span className="flex-1 truncate text-xs leading-relaxed">
                Ch.{chapter.number} — {chapter.title}
              </span>
              {score !== undefined && (
                <span
                  className={`text-xs shrink-0 font-medium ${
                    score === chapter.quiz.length
                      ? "text-emerald-500"
                      : score >= chapter.quiz.length * 0.6
                        ? "text-yellow-500"
                        : "text-red-400"
                  }`}
                >
                  {score}/{chapter.quiz.length}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
