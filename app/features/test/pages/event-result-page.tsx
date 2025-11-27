import { useEffect, useState, useRef } from "react";
import type { MetaFunction } from "react-router";
import { Form, useNavigation, useNavigate, useRevalidator } from "react-router";
import { Button } from "../../../common/components/ui/button";
import { Input } from "../../../common/components/ui/input";
import { Label } from "../../../common/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../common/components/ui/dialog";
import { Heart, Camera, MessageSquare, Loader2 } from "lucide-react";
import clsx from "clsx";
import type { Route } from "./+types/event-result-page";
import { getProgramVoteCount, createProgramVote } from "../queries";

export const meta: MetaFunction = () => {
  return [
    { title: "프로그램 선호도 조사 - 코이창작소" },
    { name: "description", content: "가장 내 취향이었던 프로그램에 투표해 주세요!" },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const program1 = url.searchParams.get("program1");
  const program2 = url.searchParams.get("program2");
  const program3 = url.searchParams.get("program3");

  const programNames = [program1, program2, program3].filter(
    (name): name is string => name !== null && name.trim() !== ""
  );

  let voteCount = 0;
  try {
    voteCount = await getProgramVoteCount(programNames.length > 0 ? programNames : undefined);
  } catch (error) {
    console.error("[event-result-page] failed to load vote count", error);
    // 에러가 발생해도 0으로 처리하여 페이지는 정상적으로 표시
    voteCount = 0;
  }

  return {
    voteCount,
    programNames: programNames.length === 3 ? programNames : null,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const programName = String(formData.get("programName") ?? "").trim();

  if (!programName) {
    return {
      success: false,
      error: "프로그램 이름을 선택해주세요.",
    };
  }

  const result = await createProgramVote(programName);

  if (!result.success) {
    return {
      success: false,
      error: result.error || "투표 저장 중 오류가 발생했습니다.",
    };
  }

  return {
    success: true,
    message: "소중한 의견 감사합니다! 💌",
  };
}

interface ProgramButton {
  name: string;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

const PROGRAM_COLORS = [
  {
    icon: Heart,
    colorClass: "text-[#B85676]",
    bgClass: "bg-[#FFE1E9] hover:bg-[#FFD1E0]",
    borderClass: "border-[#FF8FB1]",
  },
  {
    icon: Camera,
    colorClass: "text-[#4970B6]",
    bgClass: "bg-[#E6F1FF] hover:bg-[#D1E7F5]",
    borderClass: "border-[#A8C5F8]",
  },
  {
    icon: MessageSquare,
    colorClass: "text-[#B65E36]",
    bgClass: "bg-[#FFEEDC] hover:bg-[#FFE5C5]",
    borderClass: "border-[#FFE6C5]",
  },
];

export default function EventResultPage({ loaderData, actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const isSubmitting = navigation.state === "submitting";

  const [step, setStep] = useState<"input" | "voting">("input");
  const [program1, setProgram1] = useState("");
  const [program2, setProgram2] = useState("");
  const [program3, setProgram3] = useState("");
  const [inputErrors, setInputErrors] = useState<string[]>([]);
  const [showVotingModal, setShowVotingModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const voteCount = loaderData?.voteCount ?? 0;
  const savedProgramNames = loaderData?.programNames;
  const actionResult = actionData as { success?: boolean; error?: string; message?: string } | undefined;
  const prevActionResultRef = useRef<typeof actionResult>(undefined);

  // Initialize from URL params if available
  useEffect(() => {
    if (savedProgramNames && savedProgramNames.length === 3) {
      setProgram1(savedProgramNames[0]);
      setProgram2(savedProgramNames[1]);
      setProgram3(savedProgramNames[2]);
      setStep("voting");
    }
  }, [savedProgramNames]);

  // 모달이 열리면 Form 제출
  useEffect(() => {
    if (showVotingModal && selectedProgram) {
      const form = document.getElementById("vote-form") as HTMLFormElement;
      if (form) {
        const programNameInput = form.querySelector('input[name="programName"]') as HTMLInputElement;
        if (programNameInput) {
          programNameInput.value = selectedProgram;
        }
        // 약간의 지연 후 제출 (모달이 먼저 표시되도록)
        setTimeout(() => {
          form.requestSubmit();
        }, 100);
      }
    }
  }, [showVotingModal, selectedProgram]);

  // Handle vote success - 바로 리다이렉트
  useEffect(() => {
    if (actionResult?.success && prevActionResultRef.current !== actionResult) {
      prevActionResultRef.current = actionResult;
      // 모달 닫기
      setShowVotingModal(false);
      setSelectedProgram(null);
      // Revalidate to refresh vote count
      revalidator.revalidate();
      // 바로 리다이렉트 (actionData 초기화)
      const currentUrl = new URL(window.location.href);
      navigate(currentUrl.pathname + currentUrl.search, { replace: true });
    } else if (actionResult?.error && prevActionResultRef.current !== actionResult) {
      prevActionResultRef.current = actionResult;
      // 에러 발생 시 모달 닫기
      setShowVotingModal(false);
      setSelectedProgram(null);
    }
  }, [actionResult, revalidator, navigate]);

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: string[] = [];
    const trimmed1 = program1.trim();
    const trimmed2 = program2.trim();
    const trimmed3 = program3.trim();

    if (!trimmed1) errors.push("첫 번째 프로그램 이름을 입력해주세요.");
    if (!trimmed2) errors.push("두 번째 프로그램 이름을 입력해주세요.");
    if (!trimmed3) errors.push("세 번째 프로그램 이름을 입력해주세요.");

    if (trimmed1 && trimmed2 && trimmed1 === trimmed2) {
      errors.push("프로그램 이름은 중복될 수 없습니다.");
    }
    if (trimmed1 && trimmed3 && trimmed1 === trimmed3) {
      errors.push("프로그램 이름은 중복될 수 없습니다.");
    }
    if (trimmed2 && trimmed3 && trimmed2 === trimmed3) {
      errors.push("프로그램 이름은 중복될 수 없습니다.");
    }

    if (errors.length > 0) {
      setInputErrors(errors);
      return;
    }

    setInputErrors([]);
    // Update URL with program names and proceed to voting
    const params = new URLSearchParams({
      program1: trimmed1,
      program2: trimmed2,
      program3: trimmed3,
    });
    navigate(`?${params.toString()}`, { replace: true });
    setStep("voting");
  };

  const programButtons: ProgramButton[] = savedProgramNames
    ? savedProgramNames.map((name: string, index: number) => {
        const colorConfig = PROGRAM_COLORS[index % PROGRAM_COLORS.length];
        const IconComponent = colorConfig.icon;
        return {
          name,
          icon: <IconComponent className="w-6 h-6" />,
          colorClass: colorConfig.colorClass,
          bgClass: colorConfig.bgClass,
          borderClass: colorConfig.borderClass,
        };
      })
    : [];

  const formattedVoteCount = new Intl.NumberFormat("ko-KR").format(voteCount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F5] via-[#FFEFF8] to-[#FDF6F0] text-[#3B2F2F]">
      {/* Step 1: Program Name Input */}
      {step === "input" && (
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <Card className="w-full max-w-2xl bg-white/85 backdrop-blur shadow-lg">
            <CardHeader className="text-center space-y-3">
              <CardTitle className="text-3xl font-semibold text-[#3B2F2F]">
                프로그램 이름 입력
              </CardTitle>
              <p className="text-base text-[#5A4A4A]">
                투표할 3가지 프로그램의 이름을 입력해주세요.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInputSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="program1" className="text-sm font-semibold text-[#3B2F2F]">
                    첫 번째 프로그램
                  </Label>
                  <Input
                    id="program1"
                    type="text"
                    value={program1}
                    onChange={(e) => setProgram1(e.target.value)}
                    placeholder="프로그램 이름을 입력하세요"
                    className="rounded-2xl border-[#EEC2D0] bg-white/70 text-[#3B2F2F]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="program2" className="text-sm font-semibold text-[#3B2F2F]">
                    두 번째 프로그램
                  </Label>
                  <Input
                    id="program2"
                    type="text"
                    value={program2}
                    onChange={(e) => setProgram2(e.target.value)}
                    placeholder="프로그램 이름을 입력하세요"
                    className="rounded-2xl border-[#EEC2D0] bg-white/70 text-[#3B2F2F]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="program3" className="text-sm font-semibold text-[#3B2F2F]">
                    세 번째 프로그램
                  </Label>
                  <Input
                    id="program3"
                    type="text"
                    value={program3}
                    onChange={(e) => setProgram3(e.target.value)}
                    placeholder="프로그램 이름을 입력하세요"
                    className="rounded-2xl border-[#EEC2D0] bg-white/70 text-[#3B2F2F]"
                  />
                </div>

                {inputErrors.length > 0 && (
                  <div className="rounded-2xl border border-[#FB7185] bg-[#FFF5F7] px-4 py-3 space-y-1">
                    {inputErrors.map((error, index) => (
                      <p key={index} className="text-sm font-semibold text-[#C2410C]">
                        {error}
                      </p>
                    ))}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full rounded-full bg-[#FF8FB1] text-white py-4 text-lg font-semibold shadow-md hover:bg-[#ff7aa4] transition"
                >
                  투표 시작하기
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Step 2: Voting */}
      {step === "voting" && savedProgramNames && savedProgramNames.length === 3 && (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 space-y-8">
          {/* Header - Participant Count */}
          <div className="text-center space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FF8FB1]">
              참여 현황
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#3B2F2F]">
              총 {formattedVoteCount}명이 참여했어요!
            </h1>
          </div>

          {/* Main Message */}
          <div className="text-center space-y-4 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3B2F2F]">
              가장 내 취향이었던 프로그램에 투표해 주세요!
            </h2>
          </div>

          {/* Voting Buttons */}
          <div className="w-full max-w-3xl space-y-4">
            {actionResult?.error && (
              <div className="rounded-2xl border border-[#FB7185] bg-[#FFF5F7] px-4 py-3 text-center">
                <p className="text-sm font-semibold text-[#C2410C]">{actionResult.error}</p>
              </div>
            )}

            <Form method="post" id="vote-form" className="space-y-4">
              <input type="hidden" name="programName" value={selectedProgram || ""} />
              {programButtons.map((program, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setSelectedProgram(program.name);
                    setShowVotingModal(true);
                  }}
                  className={clsx(
                    "w-full rounded-3xl border-2 p-6 md:p-8 flex items-center justify-center gap-4 transition-all shadow-lg",
                    program.bgClass,
                    program.borderClass,
                    "hover:scale-[1.02] active:scale-[0.98]"
                  )}
                >
                  <div className={clsx("flex-shrink-0", program.colorClass)}>
                    {program.icon}
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-xl md:text-2xl font-bold text-[#3B2F2F]">{program.name}</p>
                  </div>
                </button>
              ))}
            </Form>

            {/* 투표 중 모달 */}
            <Dialog open={showVotingModal} onOpenChange={setShowVotingModal}>
              <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-bold text-[#3B2F2F]">
                    투표 중...
                  </DialogTitle>
                  <DialogDescription className="text-center pt-4">
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="w-12 h-12 animate-spin text-[#FF8FB1]" />
                      <p className="text-base text-[#5A4A4A]">
                        {selectedProgram && `"${selectedProgram}"에 투표하고 있습니다.`}
                      </p>
                      <p className="text-sm text-[#8B7D7D]">잠시만 기다려주세요...</p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          {/* Footer - KOI Logo */}
          <div className="mt-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#A78BFA]">
              KOI Creative Lab
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

