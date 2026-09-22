"use client";

import { Course } from "@/lib/course-data";
import {
  CheckCircle2,
  BookOpen,
  Trophy,
  Target,
  Menu,
  ChevronRight,
  Star,
  ClipboardList,
} from "lucide-react";

type Props = {
  courses: Course[];
  completedChapters: Set<string>;
  quizScores: Record<string, number>;
  onSelectChapter: (id: string) => void;
  onOpenSidebar: () => void;
  onOpenMockExam: () => void;
};

export default function Dashboard({
  courses,
  completedChapters,
  quizScores,
  onSelectChapter,
  onOpenSidebar,
  onOpenMockExam,
}: Props) {
  const allChapters = courses.flatMap((c) => c.chapters);
  const totalChapters = allChapters.length;
  const completedCount = completedChapters.size;
  const overallProgress =
    totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

  const totalCorrect = Object.entries(quizScores).reduce(
    (acc, [, score]) => acc + score,
    0,
  );
  const quizAccuracy =
    Object.keys(quizScores).length > 0
      ? Math.round(
          (totalCorrect /
            Object.entries(quizScores).reduce((acc, [id]) => {
              const ch = allChapters.find((c) => c.id === id);
              return acc + (ch ? ch.quiz.length : 0);
            }, 0)) *
            100,
        )
      : 0;

  const nextChapter = allChapters.find((ch) => !completedChapters.has(ch.id));

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-background/50 backdrop-blur-xl border-b border-border/50 px-4 py-3 flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-1.5 rounded-md hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold text-foreground">Dashboard</h1>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground text-balance">
            Internet Programming Study Hub
          </h2>
          <p className="text-muted-foreground mt-1 leading-relaxed">
            COSC 3031 &amp; COSC 3032 — Compiled by Ephrem Tesfaye Tsidu
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<BookOpen className="w-4 h-4" />}
            label="Chapters read"
            value={`${completedCount}/${totalChapters}`}
            color="cyan"
          />
          <StatCard
            icon={<Target className="w-4 h-4" />}
            label="Overall progress"
            value={`${overallProgress}%`}
            color="blue"
          />
          <StatCard
            icon={<Trophy className="w-4 h-4" />}
            label="Quiz accuracy"
            value={
              Object.keys(quizScores).length > 0 ? `${quizAccuracy}%` : "—"
            }
            color="amber"
          />
          <StatCard
            icon={<Star className="w-4 h-4" />}
            label="Quizzes taken"
            value={`${Object.keys(quizScores).length}/${totalChapters}`}
            color="emerald"
          />
        </div>

        <button
          onClick={onOpenMockExam}
          className="w-full mb-6 group relative overflow-hidden rounded-2xl border border-amber-500/30 bg-card/70 backdrop-blur-md hover:border-amber-400/60 transition-all duration-300 text-left"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-yellow-500/5 group-hover:from-amber-500/10 group-hover:via-orange-500/8 group-hover:to-yellow-500/8 transition-all duration-300" />
          <div className="relative flex items-center gap-5 p-5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
              <ClipboardList className="w-6 h-6 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-semibold text-foreground">
                  Mock Exam
                </p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-medium border border-amber-500/20">
                  100 Questions
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Full-length practice exam covering HTML, CSS, JavaScript, PHP
                &amp; MySQL with a 60-minute timer, question grid, and flagging.
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-medium shrink-0 group-hover:bg-amber-500/25 transition-colors">
              Start Exam
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </button>

        {nextChapter && (
          <div className="mb-8 p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-md flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Continue learning</p>
              <p className="text-sm font-medium text-foreground truncate">
                Ch.{nextChapter.number} — {nextChapter.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {nextChapter.course}
              </p>
            </div>
            <button
              onClick={() => onSelectChapter(nextChapter.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity shrink-0"
            >
              Continue
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="space-y-8">
          {courses.map((course) => (
            <CourseBlock
              key={course.id}
              course={course}
              completedChapters={completedChapters}
              quizScores={quizScores}
              onSelectChapter={onSelectChapter}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: "cyan" | "blue" | "amber" | "emerald";
}) {
  const colorMap = {
    cyan: "bg-cyan-500/15 text-cyan-400",
    blue: "bg-blue-500/15 text-blue-400",
    amber: "bg-amber-500/15 text-amber-400",
    emerald: "bg-emerald-500/15 text-emerald-400",
  };

  return (
    <div className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-md">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${colorMap[color]}`}
      >
        {icon}
      </div>
      <p className="text-xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}

function CourseBlock({
  course,
  completedChapters,
  quizScores,
  onSelectChapter,
}: {
  course: Course;
  completedChapters: Set<string>;
  quizScores: Record<string, number>;
  onSelectChapter: (id: string) => void;
}) {
  const completedInCourse = course.chapters.filter((ch) =>
    completedChapters.has(ch.id),
  ).length;
  const progressPercent = Math.round(
    (completedInCourse / course.chapters.length) * 100,
  );
  const isIPII = course.id === "IP-II";

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-2.5 h-2.5 rounded-full ${isIPII ? "bg-emerald-500" : "bg-cyan-400"}`}
          />
          <div>
            <h3 className="font-semibold text-foreground text-sm">
              {course.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {course.code} · {course.chapters.length} chapters
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block w-24 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isIPII ? "bg-emerald-500" : "bg-cyan-400"}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {completedInCourse}/{course.chapters.length}
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {course.chapters.map((chapter) => {
          const isCompleted = completedChapters.has(chapter.id);
          const score = quizScores[chapter.id];
          const totalQ = chapter.quiz.length;
          const hasScore = score !== undefined;
          const isPerfect = hasScore && score === totalQ;
          const isGood = hasScore && score >= totalQ * 0.6;

          return (
            <button
              key={chapter.id}
              onClick={() => onSelectChapter(chapter.id)}
              className="group relative flex flex-col p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-md hover:border-primary/40 hover:bg-card/80 transition-all text-left"
            >
              {isCompleted && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              )}

              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 text-sm font-bold shrink-0 ${
                  isIPII
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-cyan-500/15 text-cyan-400"
                }`}
              >
                {chapter.number}
              </div>

              <p className="text-xs font-semibold text-foreground leading-snug mb-1 pr-5 text-balance">
                {chapter.title}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-2">
                {chapter.description}
              </p>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                <span className="text-xs text-muted-foreground">
                  {chapter.sections.length} sections
                </span>
                {hasScore ? (
                  <span
                    className={`text-xs font-medium ${
                      isPerfect
                        ? "text-emerald-500"
                        : isGood
                          ? "text-yellow-500"
                          : "text-red-400"
                    }`}
                  >
                    Quiz: {score}/{totalQ}
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    {totalQ} quiz Qs
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
