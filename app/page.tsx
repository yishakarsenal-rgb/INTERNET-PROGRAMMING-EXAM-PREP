"use client"

import { useState, useEffect } from "react"
import { courses } from "@/lib/course-data"
import Dashboard from "@/components/dashboard"
import ChapterView from "@/components/chapter-view"
import Sidebar from "@/components/sidebar"
import MockExam from "@/components/mock-exam"
import WaterBackground from "@/components/water-background"

type View = "dashboard" | "chapter" | "mock-exam"

export default function Home() {
  const [view, setView] = useState<View>("dashboard")
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null)
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(new Set())
  const [quizScores, setQuizScores] = useState<Record<string, number>>({})
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("ip-study-progress")
    if (stored) {
      const data = JSON.parse(stored)
      setCompletedChapters(new Set(data.completedChapters || []))
      setQuizScores(data.quizScores || {})
    }
  }, [])

  const saveProgress = (completed: Set<string>, scores: Record<string, number>) => {
    localStorage.setItem(
      "ip-study-progress",
      JSON.stringify({ completedChapters: Array.from(completed), quizScores: scores })
    )
  }

  const markChapterComplete = (chapterId: string) => {
    const updated = new Set(completedChapters)
    updated.add(chapterId)
    setCompletedChapters(updated)
    saveProgress(updated, quizScores)
  }

  const saveQuizScore = (chapterId: string, score: number) => {
    const updated = { ...quizScores, [chapterId]: score }
    setQuizScores(updated)
    saveProgress(completedChapters, updated)
  }

  const handleSelectChapter = (id: string) => {
    setActiveChapterId(id)
    setView("chapter")
    setSidebarOpen(false)
  }

  const handleSelectHome = () => {
    setView("dashboard")
    setActiveChapterId(null)
    setSidebarOpen(false)
  }

  const handleOpenMockExam = () => {
    setView("mock-exam")
    setSidebarOpen(false)
  }

  const activeChapter = activeChapterId
    ? courses.flatMap((c) => c.chapters).find((ch) => ch.id === activeChapterId)
    : null

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Animated water background */}
      <WaterBackground />

      <Sidebar
        courses={courses}
        activeChapterId={activeChapterId}
        completedChapters={completedChapters}
        quizScores={quizScores}
        onSelectChapter={handleSelectChapter}
        onSelectHome={handleSelectHome}
        onOpenMockExam={handleOpenMockExam}
        isMockExamActive={view === "mock-exam"}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 overflow-y-auto relative z-10 flex flex-col min-h-screen">
        <div className="flex-1">
          {view === "mock-exam" ? (
            <MockExam
              onBack={handleSelectHome}
              onOpenSidebar={() => setSidebarOpen(true)}
            />
          ) : view === "chapter" && activeChapter ? (
            <ChapterView
              chapter={activeChapter}
              isCompleted={completedChapters.has(activeChapter.id)}
              quizScore={quizScores[activeChapter.id]}
              onMarkComplete={() => markChapterComplete(activeChapter.id)}
              onSaveQuizScore={(score) => saveQuizScore(activeChapter.id, score)}
              onOpenSidebar={() => setSidebarOpen(true)}
              onBack={handleSelectHome}
            />
          ) : (
            <Dashboard
              courses={courses}
              completedChapters={completedChapters}
              quizScores={quizScores}
              onSelectChapter={handleSelectChapter}
              onOpenSidebar={() => setSidebarOpen(true)}
              onOpenMockExam={handleOpenMockExam}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="py-4 px-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            Made with <span className="text-red-400">❤️</span> by Yishak
          </p>
        </footer>
      </main>
    </div>
  )
}
