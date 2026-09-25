"use client";

import { useState } from "react";
import { QuizQuestion } from "@/lib/course-data";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Trophy,
} from "lucide-react";

type Props = {
  questions: QuizQuestion[];
  existingScore: number | undefined;
  onComplete: (score: number) => void;
};

type AnswerState = "unanswered" | "correct" | "incorrect";

export default function QuizPanel({
  questions,
  existingScore,
  onComplete,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null),
  );
  const [showResults, setShowResults] = useState(existingScore !== undefined);
  const [finalScore, setFinalScore] = useState(existingScore ?? 0);

  const current = questions[currentIndex];
  const isAnswered = selectedIndex !== null;
  const isCorrect = isAnswered && selectedIndex === current.correctIndex;
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedIndex(index);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = index;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLast) {
      const score = answers.filter(
        (ans, i) => ans === questions[i].correctIndex,
      ).length;
      setFinalScore(score);
      setShowResults(true);
      onComplete(score);
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedIndex(answers[currentIndex + 1]);
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setAnswers(Array(questions.length).fill(null));
    setShowResults(false);
    setFinalScore(0);
  };

  const handleReview = (index: number) => {
    setCurrentIndex(index);
    setSelectedIndex(answers[index]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <ResultsScreen
        questions={questions}
        answers={answers}
        score={finalScore}
        onRetake={handleRetake}
        onReview={handleReview}
      />
    );
  }

  return (
    <div className="max-w-2xl">
      {/* progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-muted-foreground">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i);
                setSelectedIndex(answers[i]);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex
                  ? "bg-primary"
                  : answers[i] !== null
                    ? answers[i] === questions[i].correctIndex
                      ? "bg-emerald-500"
                      : "bg-red-500"
                    : "bg-muted"
              }`}
              aria-label={`Go to question ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="mb-6 p-5 rounded-xl border border-border bg-card">
        <p className="text-sm font-medium text-foreground leading-relaxed">
          {current.question}
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {current.options.map((option, i) => {
          const state: AnswerState = !isAnswered
            ? "unanswered"
            : i === current.correctIndex
              ? "correct"
              : i === selectedIndex
                ? "incorrect"
                : "unanswered";

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={isAnswered}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left text-sm transition-all ${
                state === "correct"
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                  : state === "incorrect"
                    ? "border-red-500 bg-red-500/10 text-red-400"
                    : isAnswered
                      ? "border-border bg-card text-muted-foreground opacity-60"
                      : selectedIndex === i
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted cursor-pointer"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium shrink-0 ${
                  state === "correct"
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : state === "incorrect"
                      ? "border-red-500 bg-red-500 text-white"
                      : selectedIndex === i && !isAnswered
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-current"
                }`}
              >
                {state === "correct"
                  ? "✓"
                  : state === "incorrect"
                    ? "✗"
                    : String.fromCharCode(65 + i)}
              </span>
              <span className="leading-relaxed">{option}</span>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div
          className={`mb-6 p-4 rounded-xl border ${
            isCorrect
              ? "border-emerald-500/30 bg-emerald-500/5"
              : "border-red-500/30 bg-red-500/5"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500 shrink-0" />
            )}
            <span
              className={`text-sm font-medium ${isCorrect ? "text-emerald-400" : "text-red-400"}`}
            >
              {isCorrect ? "Correct!" : "Incorrect"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {current.explanation}
          </p>
        </div>
      )}

      {isAnswered && (
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {isLast ? "See Results" : "Next Question"}
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

function ResultsScreen({
  questions,
  answers,
  score,
  onRetake,
  onReview,
}: {
  questions: QuizQuestion[];
  answers: (number | null)[];
  score: number;
  onRetake: () => void;
  onReview: (index: number) => void;
}) {
  const percent = Math.round((score / questions.length) * 100);
  const isPerfect = score === questions.length;
  const isPassing = percent >= 60;

  return (
    <div className="max-w-2xl">
      {/* score card */}
      <div
        className={`p-6 rounded-2xl border mb-6 text-center ${
          isPerfect
            ? "border-emerald-500/30 bg-emerald-500/5"
            : isPassing
              ? "border-yellow-500/30 bg-yellow-500/5"
              : "border-red-500/30 bg-red-500/5"
        }`}
      >
        <div className="flex justify-center mb-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isPerfect
                ? "bg-emerald-500"
                : isPassing
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
          >
            <Trophy className="w-8 h-8 text-white" />
          </div>
        </div>
        <p className="text-4xl font-bold text-foreground mb-1">
          {score}/{questions.length}
        </p>
        <p
          className={`text-lg font-medium mb-1 ${
            isPerfect
              ? "text-emerald-400"
              : isPassing
                ? "text-yellow-400"
                : "text-red-400"
          }`}
        >
          {isPerfect
            ? "Perfect Score!"
            : isPassing
              ? "Good job!"
              : "Keep practicing!"}
        </p>
        <p className="text-sm text-muted-foreground">{percent}% correct</p>
      </div>

      {/* question review */}
      <h3 className="text-sm font-semibold text-foreground mb-3">
        Review Answers
      </h3>
      <div className="space-y-2 mb-6">
        {questions.map((q, i) => {
          const userAnswer = answers[i];
          const isCorrect = userAnswer === q.correctIndex;
          return (
            <button
              key={i}
              onClick={() => onReview(i)}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:bg-muted transition-colors text-left"
            >
              {isCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500 shrink-0" />
              )}
              <span className="text-xs text-foreground/90 flex-1 leading-relaxed line-clamp-1">
                Q{i + 1}: {q.question}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            </button>
          );
        })}
      </div>

      <button
        onClick={onRetake}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Retake Quiz
      </button>
    </div>
  );
}
