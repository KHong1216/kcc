import { useState, useRef, useEffect } from "react";
import { Form, useNavigation } from "react-router";
import clsx from "clsx";
import type { MetaFunction } from "react-router";
import type { Route } from "./+types/event-page";
import client from "../../../lib/supa-client";

export const meta: MetaFunction = () => [
  { title: "Re-Frame 이벤트 퀴즈" },
  {
    name: "description",
    content: "퀴즈를 풀고 리 프레임에서 진행하는 프로그램을 알아보세요.",
  },
];

export function loader(_: Route.LoaderArgs) {
  return {};
}

interface ReservationActionResult {
  success?: boolean;
  message?: string;
  error?: string;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const userName = String(formData.get("userName") ?? "").trim();
  const userAgeInput = String(formData.get("userAge") ?? "").trim();
  const userPhone = String(formData.get("userPhone") ?? "").trim();
  const userJob = String(formData.get("userJob") ?? "").trim();
  const selectedTime = String(formData.get("selectedTime") ?? "").trim();
  const userAge = Number(userAgeInput);

  if (!userName || !userAgeInput || Number.isNaN(userAge) || userAge <= 0 || !userPhone || !userJob || !selectedTime) {
    return {
      success: false,
      error: "모든 항목을 입력해 주세요.",
    };
  }

  try {
    const { error } = await client.from("reservations").insert({
      user_name: userName,
      user_age: userAge,
      user_job: userJob,
      user_phone: userPhone,
      program_id: "event",
      notes: selectedTime,
      status: "pending",
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: "신청이 완료되었습니다. 리 프레임이 연락드릴게요.",
    };
  } catch (error) {
    console.error("[event-quiz] reservation action error", error);
    return {
      success: false,
      error: "요청 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }
}

interface QuizOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

interface FormState {
  name: string;
  age: string;
  contact: string;
  job: string;
  time: string;
}

const QUIZ_QUESTION = "리 프레임에서 진행하지 않는 프로그램은?";

const QUIZ_OPTIONS: QuizOption[] = [
  { id: "1", label: "1. 클릭무드", isCorrect: false },
  { id: "2", label: "2. 연애의 발견", isCorrect: false },
  { id: "3", label: "3. 아무, 말", isCorrect: false },
  { id: "4", label: "4. 인생 수업", isCorrect: true },
];

const JOB_OPTIONS = ["학생", "직장인", "프리랜서", "주부", "기타"];
const TIME_OPTIONS = ["2시", "2시30분", "3시", "3시30분", "4시", "4시30분", "5시", "5시30분", "6시", "6시30분"];

function formatContactInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

interface QuizOptionCardProps {
  option: QuizOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function QuizOptionCard({ option, isSelected, onSelect }: QuizOptionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      className={clsx(
        "quiz-option-button w-full rounded-2xl border-2 px-6 py-4 text-left transition-[transform,opacity,box-shadow]",
        isSelected
          ? "border-[#8b5cf6] bg-[#f4ecff] text-[#31155f] shadow-lg"
          : "border-[#e8e1ff] bg-white text-[#322553]"
      )}
    >
      <span className="text-lg font-semibold">{option.label}</span>
    </button>
  );
}

interface ResultModalProps {
  selectedOption: QuizOption;
  correctOption: QuizOption;
  onClose: () => void;
  onTicketApply: () => void;
}

function ResultModal({ selectedOption, correctOption, onClose, onTicketApply }: ResultModalProps) {
  const isCorrect = selectedOption.id === correctOption.id;
  const title = isCorrect ? "🎉 정답입니다! 축하합니다!" : "🥺 아쉽습니다! 오답입니다.";
  const description = isCorrect
    ? "정답을 맞히셨네요! 특별한 혜택을 드릴게요."
    : "아쉽지만 틀렸어요. 그래도 관심 가져주셔서 감사합니다!";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-3xl border border-[#efe7ff] bg-white px-6 py-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <p className="text-xl font-semibold text-[#332750]">{title}</p>
          <p className="mt-3 text-sm text-[#5d4d87]">{description}</p>
        </div>

        <div className="mt-6 grid gap-3 text-sm">
          <div className="rounded-2xl border border-[#e4dcff] bg-[#f9f7ff] px-4 py-3">
            <p className="text-xs font-semibold text-[#8b5cf6]">선택</p>
            <p className="mt-1 font-medium text-[#332750]">{selectedOption.label}</p>
          </div>
          <div className="rounded-2xl border border-[#d2c4ff] bg-[#f9f7ff] px-4 py-3">
            <p className="text-xs font-semibold text-[#8b5cf6]">정답</p>
            <p className="mt-1 font-medium text-[#332750]">{correctOption.label}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onTicketApply}
          className="modal-button mt-6 w-full rounded-full bg-[#8b5cf6] py-3 text-sm font-semibold text-white transition"
        >
          티켓 신청하기
        </button>
      </div>
    </div>
  );
}

export function EventPage({ actionData }: Route.ComponentProps) {
  const reservationFormRef = useRef<HTMLFormElement | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [formState, setFormState] = useState<FormState>({
    name: "",
    age: "",
    contact: "",
    job: "",
    time: "",
  });
  const navigation = useNavigation();
  const actionFeedback = actionData as ReservationActionResult | undefined;
  const isFormSubmitting = navigation.state === "submitting";

  const correctOption = QUIZ_OPTIONS.find((option) => option.isCorrect)!;
  const selectedOption = QUIZ_OPTIONS.find((option) => option.id === selectedOptionId) ?? null;

  useEffect(() => {
    if (actionFeedback?.success && reservationFormRef.current) {
      reservationFormRef.current.reset();
      setFormState({ name: "", age: "", contact: "", job: "", time: "" });
    }
  }, [actionFeedback]);

  function handleSelect(optionId: string) {
    setSelectedOptionId(optionId);
    setShowModal(true);
  }

  function handleTicketApply() {
    setShowModal(false);
    setCurrentPage(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleFormChange(field: keyof FormState, value: string) {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }

  function handleResetToQuiz() {
    setCurrentPage(1);
    setSelectedOptionId(null);
    setShowModal(false);
    setFormState({ name: "", age: "", contact: "", job: "", time: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const nameInput = ((form.elements.namedItem("userName") as HTMLInputElement | null)?.value ?? "").trim();
    const ageInput = ((form.elements.namedItem("userAge") as HTMLInputElement | null)?.value ?? "").trim();
    const contactInput = ((form.elements.namedItem("userPhone") as HTMLInputElement | null)?.value ?? "").trim();
    const jobInput = ((form.elements.namedItem("userJob") as HTMLSelectElement | null)?.value ?? "").trim();
    const timeInput = ((form.elements.namedItem("selectedTime") as HTMLSelectElement | null)?.value ?? "").trim();
    const ageValue = Number(ageInput);

    if (!nameInput || !ageInput || Number.isNaN(ageValue) || ageValue <= 0 || !contactInput || !jobInput || !timeInput) {
      event.preventDefault();
      return;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f7ff] to-[#f2f5ff]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            * {
              -webkit-tap-highlight-color: transparent;
            }
            .quiz-option-button,
            .quiz-option-button:focus,
            .quiz-option-button:focus-within,
            .quiz-option-button::-moz-focus-inner,
            .quiz-option-button:focus::-moz-focus-inner {
              outline: none !important;
              box-shadow: none !important;
            }
            .quiz-option-button:active {
              transform: scale(0.98);
              opacity: 0.9;
            }
            .quiz-option-button:focus-visible {
              outline: 2px solid #8b5cf6 !important;
              outline-offset: 3px;
              box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15) !important;
            }
            @media (hover: hover) and (pointer: fine) {
              .quiz-option-button:not(:disabled):hover {
                border-color: #cdb8ff;
                transform: scale(1.005);
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
              }
            }
            .modal-button,
            .modal-button:focus,
            .modal-button:focus-within,
            .modal-button::-moz-focus-inner,
            .modal-button:focus::-moz-focus-inner {
              outline: none !important;
              box-shadow: none !important;
            }
            .modal-button:active {
              transform: scale(0.98);
              opacity: 0.9;
            }
            .modal-button:focus-visible {
              outline: 2px solid #8b5cf6 !important;
              outline-offset: 3px;
              box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15) !important;
            }
            @media (hover: hover) and (pointer: fine) {
              .modal-button:not(:disabled):hover {
                background-color: #7848e3 !important;
              }
            }
            .cta-submit-button,
            .cta-submit-button:focus,
            .cta-submit-button:focus-within,
            .cta-submit-button::-moz-focus-inner,
            .cta-submit-button:focus::-moz-focus-inner {
              outline: none !important;
              box-shadow: none !important;
            }
            .cta-submit-button:active:not(:disabled) {
              transform: scale(0.98);
              opacity: 0.9;
            }
            .cta-submit-button:focus-visible {
              outline: 2px solid #8b5cf6 !important;
              outline-offset: 3px;
              box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15) !important;
            }
            @media (hover: hover) and (pointer: fine) {
              .cta-submit-button:not(:disabled):hover {
                background-color: #7848e3 !important;
              }
            }
          `,
        }}
      />
      {/* Page 1: Quiz */}
      {currentPage === 1 && (
        <div key="page-1" className="flex min-h-screen items-center justify-center px-4 py-20">
          <div className="w-full max-w-2xl space-y-8">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a28cdc]">RE-FRAME EVENT QUIZ</p>
              <h1 className="mt-3 text-3xl font-semibold text-[#20163a]">{QUIZ_QUESTION}</h1>
              <p className="mt-2 text-sm text-[#61567e]">정답을 맞히면 숨겨둔 선물을 바로 안내해 드려요.</p>
            </div>

            <div className="space-y-4">
              {QUIZ_OPTIONS.map((option) => (
                <QuizOptionCard
                  key={option.id}
                  option={option}
                  isSelected={selectedOptionId === option.id}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Page 2: CTA Form */}
      {currentPage === 2 && (
        <div key="page-2" className="flex min-h-screen items-start justify-center px-4 py-20">
          <div className="w-full max-w-2xl space-y-6">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a28cdc]">RE-FRAME EVENT</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#20163a]">티켓 신청하기</h2>
              <p className="mt-2 text-sm text-[#61567e]">정보를 입력해 주시면 리 프레임이 연락드릴게요.</p>
            </div>

            <div className="rounded-3xl border border-[#efe7ff] bg-white px-6 py-8 shadow-lg">
              {actionFeedback?.error && (
                <div className="mb-6 rounded-2xl border border-[#FB7185] bg-[#FFF5F7] px-4 py-3 text-sm font-semibold text-[#C2410C]">
                  {actionFeedback.error}
                </div>
              )}
              {actionFeedback?.success && (
                <div className="mb-6 rounded-2xl border border-[#6EE7B7] bg-[#ECFDF5] px-4 py-3 text-sm font-semibold text-[#047857]">
                  {actionFeedback.message ?? "신청이 완료되었습니다."}
                </div>
              )}

              <Form method="post" ref={reservationFormRef} onSubmit={handleFormSubmit} className="space-y-4" replace>
                <label className="block text-sm font-semibold text-[#4a3b66]">
                  이름
                  <input
                    type="text"
                    name="userName"
                    value={formState.name}
                    onChange={(event) => handleFormChange("name", event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#e4dcff] px-4 py-3 text-sm text-[#2d1f44] placeholder:text-[#a29ab6] focus:border-[#c5b0ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4c2ff]"
                    placeholder="이름을 입력하세요"
                    required
                  />
                </label>

                <label className="block text-sm font-semibold text-[#4a3b66]">
                  나이
                  <input
                    type="number"
                    name="userAge"
                    min={1}
                    max={120}
                    value={formState.age}
                    onChange={(event) => handleFormChange("age", event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#e4dcff] px-4 py-3 text-sm text-[#2d1f44] placeholder:text-[#a29ab6] focus:border-[#c5b0ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4c2ff]"
                    placeholder="예: 25"
                    required
                  />
                </label>

                <label className="block text-sm font-semibold text-[#4a3b66]">
                  연락처
                  <input
                    type="tel"
                    name="userPhone"
                    inputMode="numeric"
                    value={formState.contact}
                    onChange={(event) => handleFormChange("contact", formatContactInput(event.target.value))}
                    className="mt-2 w-full rounded-2xl border border-[#e4dcff] px-4 py-3 text-sm text-[#2d1f44] placeholder:text-[#a29ab6] focus:border-[#c5b0ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4c2ff]"
                    placeholder="010-0000-0000"
                    required
                  />
                </label>

                <label className="block text-sm font-semibold text-[#4a3b66]">
                  직업
                  <select
                    name="userJob"
                    value={formState.job}
                    onChange={(event) => handleFormChange("job", event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#e4dcff] bg-white px-4 py-3 text-sm text-[#2d1f44] focus:border-[#c5b0ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4c2ff]"
                    required
                  >
                    <option value="">선택해주세요</option>
                    {JOB_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-semibold text-[#4a3b66]">
                  시간
                  <select
                    name="selectedTime"
                    value={formState.time}
                    onChange={(event) => handleFormChange("time", event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#e4dcff] bg-white px-4 py-3 text-sm text-[#2d1f44] focus:border-[#c5b0ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4c2ff]"
                    required
                  >
                    <option value="">시간을 선택해주세요</option>
                    {TIME_OPTIONS.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  type="submit"
                  disabled={isFormSubmitting}
                  className={clsx(
                    "cta-submit-button w-full rounded-full py-3 text-sm font-semibold text-white transition",
                    isFormSubmitting
                      ? "bg-[#a29ab6] cursor-wait"
                      : "bg-[#8b5cf6]"
                  )}
                >
                  {isFormSubmitting ? "전송 중..." : "신청하기"}
                </button>
              </Form>

              <button
                type="button"
                onClick={handleResetToQuiz}
                className="mt-4 w-full text-sm text-[#8b5cf6] underline underline-offset-4"
              >
                퀴즈로 돌아가기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {showModal && selectedOption && (
        <ResultModal
          selectedOption={selectedOption}
          correctOption={correctOption}
          onClose={() => setShowModal(false)}
          onTicketApply={handleTicketApply}
        />
      )}
    </div>
  );
}

export default EventPage;
