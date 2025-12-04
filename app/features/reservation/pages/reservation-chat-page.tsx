// 챗봇 UI
import { useState, useRef, useEffect } from "react";
import { useNavigate, useFetcher, type MetaFunction } from "react-router";
import { Card } from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Input } from "../../../common/components/ui/input";
import { Send, Bot, User, Loader2, Sparkles, MessageCircle } from "lucide-react";
import { getPrograms } from "../queries";
import { createReservation } from "../queries";
import { validateAndNormalizePhone } from "../../../lib/validation";
import type { Route } from "./+types/reservation-chat-page";

export const meta: MetaFunction = () => {
    const url = "https://www.koicreativelab.com/reservation";
    return [
        { title: "예약 상담 - 코이창작소" },
        { name: "description", content: "AI 챗봇과 함께 예약을 진행하세요" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:title", content: "예약 상담 - 코이창작소" },
        { property: "og:description", content: "AI 챗봇과 함께 예약을 진행하세요" },
        { property: "og:site_name", content: "코이창작소" },
        { property: "og:locale", content: "ko_KR" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "예약 상담 - 코이창작소" },
        { name: "twitter:description", content: "AI 챗봇과 함께 예약을 진행하세요" },
    ];
};

export async function loader() {
    const result = await getPrograms();

    if (result.error) {
        console.error("[loader] programs error:", result.error);
        return { programs: [] };
    }

    return { programs: result.data ?? [] };
}

export async function action({ request }: Route.ActionArgs) {
    console.log("[action] 예약 저장 요청 수신");
    const formData = await request.formData();
    const intent = formData.get("intent") as string;
    console.log("[action] intent:", intent);

    if (intent === "save-reservation") {
        try {
            // 필수 필드 검증
            const user_name = formData.get("user_name") as string;
            const user_age = formData.get("user_age") as string;
            const user_job = formData.get("user_job") as string;
            const user_phone = formData.get("user_phone") as string;
            const program_id = formData.get("program_id") as string;
            const selected_dates_str = formData.get("selected_dates") as string;
            const notes = formData.get("notes") as string;
            
            console.log("[action] 받은 데이터:", {
                user_name,
                user_age,
                user_job,
                user_phone,
                program_id,
                selected_dates_str,
                notes
            });

            // 필수 필드 검증
            const missingFields: string[] = [];
            if (!user_name) missingFields.push('이름');
            if (!user_age || isNaN(parseInt(user_age, 10)) || parseInt(user_age, 10) <= 0) {
                missingFields.push('나이');
            }
            if (!user_job) missingFields.push('직업/학교');
            
            // 연락처 검증 및 정규화
            let normalizedPhone = user_phone;
            if (!user_phone) {
                missingFields.push('연락처');
            } else {
                const phoneValidation = validateAndNormalizePhone(user_phone);
                if (!phoneValidation.isValid) {
                    console.error("연락처 검증 실패:", phoneValidation.error);
                    return {
                        success: false,
                        error: phoneValidation.error || "연락처 형식이 올바르지 않습니다. 010-xxxx-xxxx 형식으로 입력해주세요."
                    };
                }
                normalizedPhone = phoneValidation.normalized!;
            }
            
            if (!program_id) missingFields.push('프로그램');
            
            if (missingFields.length > 0) {
                console.error("필수 필드 누락:", { user_name, user_age, user_job, user_phone, program_id, missingFields });
                return { 
                    success: false, 
                    error: `필수 정보가 누락되었습니다: ${missingFields.join(', ')}` 
                };
            }

            // selected_dates 파싱
            let selected_dates: Record<string, string[]> = {};
            try {
                if (selected_dates_str) {
                    selected_dates = JSON.parse(selected_dates_str);
                }
            } catch (parseError) {
                console.error("selected_dates 파싱 오류:", parseError, selected_dates_str);
                // 파싱 실패해도 빈 객체로 진행
            }

            const reservationData = {
                user_name,
                user_age: parseInt(user_age),
                user_job,
                user_phone: normalizedPhone, // 검증 및 정규화된 연락처 사용
                program_id: program_id as 'love' | 'photo' | 'essay',
                selected_dates,
                notes: notes || undefined,
                status: 'pending' as const
            };

            console.log("[action] 예약 데이터 저장 시도:", reservationData);

            const result = await createReservation(reservationData);

            if (result.error) {
                console.error("[action] 예약 저장 오류:", result.error);
                console.error("[action] 오류 상세:", {
                    code: result.error.code,
                    message: result.error.message,
                    details: result.error.details,
                    hint: result.error.hint
                });
                return { success: false, error: result.error.message || "예약 저장 중 오류가 발생했습니다." };
            }

            console.log("[action] 예약 저장 성공:", result.data);
            console.log("[action] 저장된 예약 ID:", result.data?.id);
            return { success: true, reservationId: result.data?.id };
        } catch (error: any) {
            console.error("예약 저장 예외:", error);
            return { success: false, error: error?.message || "예약 저장 중 오류가 발생했습니다." };
        }
    }

    return { success: false };
}

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export default function ReservationChatPage({ loaderData, actionData }: Route.ComponentProps) {
    const navigate = useNavigate();
    const fetcher = useFetcher();
    const { programs } = loaderData;
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [collectedData, setCollectedData] = useState<{
        program_id?: 'love' | 'photo' | 'essay';
        user_name?: string;
        user_age?: number;
        user_job?: string;
        user_phone?: string;
        selected_dates?: Record<string, string[]>;
        available_time_text?: string; // 상세한 시간 정보를 텍스트로 저장
    }>({});
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 초기 메시지 설정
    useEffect(() => {
        if (messages.length === 0 && programs.length > 0) {
            const programList = programs.map((p, idx) =>
                `${idx + 1}. ${p.title}${p.description ? ` - ${p.description}` : ''}`
            ).join('\n');

            const initialMessage: Message = {
                role: "assistant",
                content: `안녕하세요! 코이창작소 상담 예약을 도와드리겠습니다. 😊\n\n저희 프로그램은 다음과 같습니다:\n\n${programList}\n\n어떤 프로그램에 관심이 있으신가요? (번호나 프로그램 이름으로 선택해주세요)`,
                timestamp: new Date()
            };
            setMessages([initialMessage]);
        }
    }, [programs]);

    // 성공 메시지 처리 (actionData 또는 fetcher.data)
    useEffect(() => {
        const successData = actionData || fetcher.data;
        if (successData?.success) {
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "✅ 예약이 완료되었습니다! 코이창작소 매니저가 곧 연락드리겠습니다. 감사합니다! 😊",
                timestamp: new Date()
            }]);
            // 3초 후 홈으로 이동
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } else if (successData?.success === false && successData?.error) {
            setMessages(prev => [...prev, {
                role: "assistant",
                content: `죄송합니다. 예약 저장 중 오류가 발생했습니다: ${successData.error}`,
                timestamp: new Date()
            }]);
        }
    }, [actionData, fetcher.data, navigate]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: "user",
            content: input.trim(),
            timestamp: new Date()
        };

        // "예" 또는 "네"로 답하면 저장 (모든 필수 필드 확인)
        // "예", "네", "yes", "ok", "확인", "신청" 등 다양한 확인 표현 지원
        const confirmKeywords = ["예", "네", "yes", "ok", "확인", "신청", "저장", "맞아", "맞습니다"];
        const isConfirm = confirmKeywords.some(keyword => 
            input.trim().toLowerCase() === keyword.toLowerCase() || 
            input.trim().includes(keyword)
        );
        
        if (isConfirm) {
            // 모든 필수 필드가 있는지 확인
            const hasAllRequiredFields = !!(
                collectedData.program_id &&
                collectedData.user_name &&
                collectedData.user_age &&
                !isNaN(Number(collectedData.user_age)) &&
                Number(collectedData.user_age) > 0 &&
                collectedData.user_job &&
                collectedData.user_phone &&
                (collectedData.selected_dates || 
                 (collectedData.available_time_text && 
                  collectedData.available_time_text.trim().length > 0 &&
                  collectedData.available_time_text.trim() !== '미정' &&
                  collectedData.available_time_text.trim() !== '없음'))
            );
            
            if (hasAllRequiredFields) {
                await saveReservation(collectedData);
                setInput("");
                return;
            } else {
                // 필수 필드가 누락된 경우
                const missingFields: string[] = [];
                if (!collectedData.program_id) missingFields.push('프로그램');
                if (!collectedData.user_name) missingFields.push('이름');
                if (!collectedData.user_age || isNaN(Number(collectedData.user_age)) || Number(collectedData.user_age) <= 0) {
                    missingFields.push('나이');
                }
                if (!collectedData.user_job) missingFields.push('직업/학교');
                if (!collectedData.user_phone) missingFields.push('연락처');
                if (!collectedData.selected_dates && 
                    (!collectedData.available_time_text || 
                     collectedData.available_time_text.trim().length === 0 ||
                     collectedData.available_time_text.trim() === '미정' ||
                     collectedData.available_time_text.trim() === '없음')) {
                    missingFields.push('가능한 시간');
                }
                
                setMessages(prev => [...prev, {
                    role: "assistant",
                    content: `죄송합니다. 저장하기 전에 다음 정보가 필요합니다:\n\n${missingFields.map(f => `- ${f}`).join('\n')}\n\n${missingFields.length === 1 ? '이 정보를 알려주시겠어요?' : '이 정보들을 알려주시겠어요?'}`,
                    timestamp: new Date()
                }]);
                setInput("");
                return;
            }
        }

        setInput("");
        setIsLoading(true);
        setMessages(prev => [...prev, userMessage]);

        try {
            // 전체 대화 히스토리 구성
            const conversationHistory = [
                {
                    role: "system" as const,
                    content: getSystemPrompt(programs)
                },
                ...messages.map(msg => ({
                    role: msg.role === "user" ? "user" as const : "assistant" as const,
                    content: msg.content
                })),
                {
                    role: "user" as const,
                    content: userMessage.content
                }
            ];

            // OpenAI API 호출 (서버 사이드)
            let response: Response;
            try {
                response = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        messages: conversationHistory,
                        programs: programs,
                        collectedData: collectedData
                    }),
                });
            } catch (fetchError) {
                console.error("Fetch error:", fetchError);
                throw new Error("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
            }

            if (!response.ok) {
                let errorData = null;
                try {
                    const errorText = await response.text();
                    if (errorText) {
                        try {
                            errorData = JSON.parse(errorText);
                        } catch (e) {
                            // JSON이 아니면 텍스트로 처리
                            errorData = { response: errorText };
                        }
                    }
                } catch (e) {
                    console.error("Error reading error response:", e);
                }
                
                console.error("API 호출 실패:", response.status, errorData);
                const errorMsg = errorData?.response || `서버 오류가 발생했습니다 (${response.status})`;
                throw new Error(errorMsg);
            }

            let data;
            try {
                data = await response.json();
            } catch (parseError) {
                console.error("Response parse error:", parseError);
                throw new Error("서버 응답을 처리할 수 없습니다.");
            }
            
            // 응답 데이터 검증
            if (!data || typeof data !== 'object') {
                console.error("Invalid response data:", data);
                throw new Error("잘못된 응답 형식입니다.");
            }

            // response 필드가 없거나 빈 문자열인 경우 처리
            let responseText = data.response?.trim();
            if (!responseText) {
                console.warn("Empty response field, using default message:", data);
                // Function calling으로 데이터는 추출되었지만 응답이 비어있는 경우
                if (data.extractedData) {
                    responseText = "정보를 확인했습니다. 추가로 필요한 정보가 있으면 알려주세요.";
                } else {
                    responseText = "죄송합니다. 응답을 생성하는 중 문제가 발생했습니다. 다시 시도해주세요.";
                }
            }

            const assistantMessage: Message = {
                role: "assistant",
                content: responseText,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);

            // 수집된 정보 업데이트 (먼저 업데이트)
            if (data.extractedData) {
                setCollectedData(prev => {
                    const updated = { ...prev };
                    
                    // extractedData의 각 필드를 안전하게 병합
                    if (data.extractedData.program_id) {
                        updated.program_id = data.extractedData.program_id;
                    }
                    if (data.extractedData.user_name) {
                        updated.user_name = data.extractedData.user_name;
                    }
                    // user_age는 숫자로 변환
                    if (data.extractedData.user_age !== undefined && data.extractedData.user_age !== null) {
                        const ageNum = typeof data.extractedData.user_age === 'string' 
                            ? parseInt(data.extractedData.user_age, 10) 
                            : Number(data.extractedData.user_age);
                        if (!isNaN(ageNum) && ageNum > 0) {
                            updated.user_age = ageNum;
                        }
                    }
                    if (data.extractedData.user_job) {
                        updated.user_job = data.extractedData.user_job;
                    }
                    if (data.extractedData.user_phone) {
                        updated.user_phone = data.extractedData.user_phone;
                    }
                    if (data.extractedData.selected_dates) {
                        updated.selected_dates = data.extractedData.selected_dates;
                    }
                    if (data.extractedData.available_time_text) {
                        updated.available_time_text = data.extractedData.available_time_text;
                    }
                    
                    console.log("collectedData 업데이트:", updated);
                    return updated;
                });
            }

            // 예약 완료 감지 및 저장
            console.log("API 응답:", { shouldSave: data.shouldSave, extractedData: data.extractedData });
            
            // collectedData와 extractedData 병합 (user_age 숫자 변환 포함)
            const mergedData = { ...collectedData };
            
            // extractedData의 각 필드를 안전하게 병합
            if (data.extractedData) {
                if (data.extractedData.program_id) mergedData.program_id = data.extractedData.program_id;
                if (data.extractedData.user_name) mergedData.user_name = data.extractedData.user_name;
                // user_age는 숫자로 변환
                if (data.extractedData.user_age !== undefined && data.extractedData.user_age !== null) {
                    const ageNum = typeof data.extractedData.user_age === 'string' 
                        ? parseInt(data.extractedData.user_age, 10) 
                        : Number(data.extractedData.user_age);
                    if (!isNaN(ageNum) && ageNum > 0) {
                        mergedData.user_age = ageNum;
                    }
                }
                if (data.extractedData.user_job) mergedData.user_job = data.extractedData.user_job;
                if (data.extractedData.user_phone) mergedData.user_phone = data.extractedData.user_phone;
                if (data.extractedData.selected_dates) mergedData.selected_dates = data.extractedData.selected_dates;
                if (data.extractedData.available_time_text) mergedData.available_time_text = data.extractedData.available_time_text;
            }
            
            console.log("병합된 데이터:", mergedData);
            
            // 필수 필드 확인 (user_age는 숫자이고 0보다 커야 함)
            const hasAllFields = !!(
                mergedData.program_id &&
                mergedData.user_name &&
                mergedData.user_age && 
                !isNaN(Number(mergedData.user_age)) && 
                Number(mergedData.user_age) > 0 &&
                mergedData.user_job &&
                mergedData.user_phone &&
                (mergedData.selected_dates || mergedData.available_time_text)
            );
            
            console.log("필수 필드 확인:", {
                program_id: mergedData.program_id,
                user_name: mergedData.user_name,
                user_age: mergedData.user_age,
                user_age_type: typeof mergedData.user_age,
                user_job: mergedData.user_job,
                user_phone: mergedData.user_phone,
                selected_dates: mergedData.selected_dates,
                available_time_text: mergedData.available_time_text,
                hasAllFields
            });
            
            // 필수 필드 누락 확인 및 재질문
            // API 응답에서 누락된 필드 정보를 우선 사용, 없으면 직접 계산
            const missingFields = data.missingFields || (() => {
                const missing: string[] = [];
                if (!mergedData.program_id) missing.push('프로그램');
                if (!mergedData.user_name) missing.push('이름');
                if (!mergedData.user_age || isNaN(Number(mergedData.user_age)) || Number(mergedData.user_age) <= 0) {
                    missing.push('나이');
                }
                if (!mergedData.user_job) missing.push('직업/학교');
                if (!mergedData.user_phone) missing.push('연락처');
                if (!mergedData.selected_dates && !mergedData.available_time_text) {
                    missing.push('가능한 시간');
                }
                return missing;
            })();
            
            if (!hasAllFields && missingFields.length > 0) {
                console.log("저장 불가 - 필수 필드 누락:", missingFields);
                
                // AI 응답이 이미 누락된 필드를 물어봤는지 확인
                const responseHasMissingInfo = missingFields.some((field: string) => 
                    responseText.includes(field) || 
                    responseText.includes('필요') || 
                    responseText.includes('누락') ||
                    responseText.includes('알려주')
                );
                
                // AI가 현재 다른 질문을 하고 있는지 확인
                // 물음표가 있거나, 질문 단어가 있으면 AI가 질문 중인 것으로 간주
                const hasQuestionMark = responseText.includes('?') || responseText.includes('？');
                const hasQuestionWords = /(어떤|언제|어디|누구|무엇|몇|어느|어떻게|왜|어떠한)/.test(responseText);
                const isAskingQuestion = hasQuestionMark || hasQuestionWords;
                
                // AI가 질문을 하고 있지 않고, 누락된 필드에 대한 언급도 없을 때만 추가 메시지 표시
                // AI가 이미 질문을 하고 있다면, 그 질문에 대한 답을 기다려야 함
                if (!responseHasMissingInfo && !isAskingQuestion) {
                    setMessages(prev => [...prev, {
                        role: "assistant",
                        content: `죄송합니다. 예약을 완료하기 위해 다음 정보가 더 필요합니다:\n\n${missingFields.map((f: string) => `- ${f}`).join('\n')}\n\n${missingFields.length === 1 ? '이 정보를 알려주시겠어요?' : '이 정보들을 알려주시겠어요?'}`,
                        timestamp: new Date()
                    }]);
                } else if (isAskingQuestion && !responseHasMissingInfo) {
                    // AI가 질문을 하고 있지만, 누락된 필드에 대한 언급이 없는 경우
                    // 다음 사용자 응답 후에 누락된 필드를 확인하도록 함 (지금은 메시지 추가 안 함)
                    console.log("AI가 질문 중이므로 누락된 필드 메시지는 다음 응답 후에 표시됩니다.");
                }
            } else if (data.shouldSave && hasAllFields) {
                // shouldSave가 true이고 모든 필드가 있을 때, 사용자 입력이 "예/네"인지 확인
                const confirmKeywords = ["예", "네", "yes", "ok", "확인", "신청", "저장", "맞아", "맞습니다"];
                const isConfirm = confirmKeywords.some(keyword => 
                    userMessage.content.toLowerCase() === keyword.toLowerCase() || 
                    userMessage.content.toLowerCase().includes(keyword.toLowerCase())
                );
                
                if (isConfirm) {
                    // 사용자가 "예/네"로 확인했고, 모든 필드가 있으면 저장
                    console.log("사용자 확인 및 저장 시작:", mergedData);
                    await saveReservation(mergedData);
                } else {
                    // 사용자가 "예/네"를 입력하지 않았을 때 안내 메시지 표시
                    // AI 응답에 이미 안내가 포함되어 있는지 확인
                    const hasConfirmPrompt = responseText.includes('예 또는 네') || 
                                          responseText.includes('예/네') ||
                                          responseText.includes('신청하시겠습니까') ||
                                          responseText.includes('저장하시겠습니까');
                    
                    if (!hasConfirmPrompt) {
                        setMessages(prev => [...prev, {
                            role: "assistant",
                            content: "예약을 신청하시려면 '예' 또는 '네'를 입력해주세요. 😊",
                            timestamp: new Date()
                        }]);
                    }
                    console.log("모든 정보 수집 완료, 사용자 확인 대기 중");
                }
            } else if (responseText.includes("예약 정보가 모두 수집되었습니다") || 
                       responseText.includes("모든 정보를 요약") ||
                       responseText.includes("저장하시겠습니까")) {
                // AI가 요약을 했는데 저장이 안 된 경우
                // 사용자 입력이 "예/네"인지 확인
                const confirmKeywords = ["예", "네", "yes", "ok", "확인", "신청", "저장", "맞아", "맞습니다"];
                const isConfirm = confirmKeywords.some(keyword => 
                    userMessage.content.toLowerCase() === keyword.toLowerCase() || 
                    userMessage.content.toLowerCase().includes(keyword.toLowerCase())
                );
                
                if (hasAllFields && isConfirm) {
                    // 모든 필드가 있고 사용자가 "예/네"로 확인했으면 저장
                    console.log("AI 요약 후 사용자 확인 및 저장 시작:", mergedData);
                    await saveReservation(mergedData);
                } else if (hasAllFields) {
                    // 모든 필드가 있지만 사용자가 "예/네"를 입력하지 않았을 때
                    // AI 응답에 확인 요청이 없으면 강제로 추가
                    const hasConfirmPrompt = responseText.includes('예 또는 네') || 
                                          responseText.includes('예/네') ||
                                          responseText.includes('신청하시겠습니까') ||
                                          responseText.includes('저장하시겠습니까') ||
                                          responseText.includes('입력해주세요');
                    
                    if (!hasConfirmPrompt) {
                        // AI 응답을 수정하여 확인 요청 추가
                        setMessages(prev => {
                            const lastMessage = prev[prev.length - 1];
                            if (lastMessage && lastMessage.role === "assistant") {
                                // 마지막 메시지에 확인 요청 추가
                                const updatedMessages = [...prev];
                                updatedMessages[updatedMessages.length - 1] = {
                                    ...lastMessage,
                                    content: lastMessage.content + `\n\n위 내용으로 예약을 확정하시겠습니까? '예' 또는 '네'를 입력해주세요. 😊`
                                };
                                return updatedMessages;
                            }
                            // 마지막 메시지가 없거나 assistant가 아니면 새 메시지 추가
                            return [...prev, {
                                role: "assistant",
                                content: "위 내용으로 예약을 확정하시겠습니까? '예' 또는 '네'를 입력해주세요. 😊",
                                timestamp: new Date()
                            }];
                        });
                    }
                    console.log("AI가 요약 완료, 사용자 확인 대기 중");
                } else {
                    console.log("AI가 요약했지만 필수 필드가 누락됨:", {
                        hasAllFields,
                        missing: {
                            program_id: !mergedData.program_id,
                            user_name: !mergedData.user_name,
                            user_age: !mergedData.user_age || isNaN(Number(mergedData.user_age)),
                            user_job: !mergedData.user_job,
                            user_phone: !mergedData.user_phone,
                            timeInfo: !mergedData.selected_dates && !mergedData.available_time_text
                        }
                    });
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            let errorMessage = "죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.";
            
            if (error instanceof Error) {
                // 이미 "죄송합니다"로 시작하는 메시지는 그대로 사용
                if (error.message.includes("죄송합니다")) {
                    errorMessage = error.message;
                } else {
                    errorMessage = `죄송합니다. ${error.message}`;
                }
            }
            
            setMessages(prev => [...prev, {
                role: "assistant",
                content: errorMessage,
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const saveReservation = async (data: typeof collectedData) => {
        // 필수 필드 검증 및 누락된 필드 확인
        const missingFields: string[] = [];
        
        if (!data.program_id) missingFields.push('프로그램');
        if (!data.user_name) missingFields.push('이름');
        if (!data.user_age || isNaN(Number(data.user_age)) || Number(data.user_age) <= 0) {
            missingFields.push('나이');
        }
        if (!data.user_job) missingFields.push('직업/학교');
        if (!data.user_phone) missingFields.push('연락처');
        if (!data.selected_dates && !data.available_time_text) {
            missingFields.push('가능한 시간');
        }

        // 누락된 필드가 있으면 다시 물어보기
        if (missingFields.length > 0) {
            console.error("저장 조건 불만족 - 누락된 필드:", missingFields, "현재 데이터:", data);
            
            const missingFieldsText = missingFields.join(', ');
            setMessages(prev => [...prev, {
                role: "assistant",
                content: `죄송합니다. 예약을 완료하기 위해 다음 정보가 필요합니다:\n\n${missingFields.map(f => `- ${f}`).join('\n')}\n\n${missingFields.length === 1 ? '이 정보를 알려주시겠어요?' : '이 정보들을 알려주시겠어요?'}`,
                timestamp: new Date()
            }]);
            return;
        }

        // user_age를 숫자로 변환하여 검증
        const userAge = typeof data.user_age === 'number' 
            ? data.user_age 
            : parseInt(String(data.user_age), 10);
        
        if (isNaN(userAge) || userAge <= 0) {
            console.error("유효하지 않은 나이:", data.user_age);
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "죄송합니다. 나이 정보가 올바르지 않습니다. 나이를 다시 알려주시겠어요?",
                timestamp: new Date()
            }]);
            return;
        }

        try {
            // 이 시점에서는 모든 필수 필드가 존재함이 보장됨
            const formData = new FormData();
            formData.append("intent", "save-reservation");
            formData.append("user_name", data.user_name!);
            formData.append("user_age", userAge.toString());
            formData.append("user_job", data.user_job!);
            formData.append("user_phone", data.user_phone!);
            formData.append("program_id", data.program_id!);
            formData.append("selected_dates", JSON.stringify(data.selected_dates || {}));
            
            // notes에 상세 정보 저장
            let notes = `직업/학교: ${data.user_job}`;
            if (data.available_time_text) {
                notes += `\n가능한 시간: ${data.available_time_text}`;
            }
            formData.append("notes", notes);

            console.log("예약 저장 요청 데이터:", {
                user_name: data.user_name,
                user_age: userAge,
                user_job: data.user_job,
                user_phone: data.user_phone,
                program_id: data.program_id,
                selected_dates: data.selected_dates,
                notes
            });

            // useFetcher를 사용하여 저장 (actionData 자동 업데이트)
            // action: "/reservation"은 현재 페이지의 action을 호출합니다
            console.log("예약 저장 요청 전송 시작 - action: /reservation");
            fetcher.submit(formData, {
                method: "POST",
                action: "/reservation"
            });
            
            console.log("예약 저장 요청 전송 완료, fetcher.state:", fetcher.state);
        } catch (error) {
            console.error("예약 저장 오류:", error);
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "죄송합니다. 예약 저장 중 오류가 발생했습니다. 다시 시도해주세요.",
                timestamp: new Date()
            }]);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="min-h-screen w-full pt-14 sm:pt-16 lg:pt-[4.5rem] bg-[#FDF6F0] relative overflow-hidden" style={{ fontFamily: 'Pretendard, Inter, sans-serif' }}>
            {/* 배경 장식 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{ backgroundColor: '#A8C5F8' }}></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" style={{ backgroundColor: '#F3C3E6' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" style={{ backgroundColor: '#FFE6C5' }}></div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <Card className="h-[calc(100vh-12rem)] flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#FADADD]/30 overflow-hidden bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)]">
                    {/* 헤더 */}
                    <div className="p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #E8F4FB 0%, #FFF0F5 50%, #FFF7F5 100%)' }}>
                        <div className="absolute inset-0 opacity-50" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6, #FFE6C5)' }}></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-extrabold tracking-tight text-[#3B2F2F]">예약 상담</h1>
                                    <p className="text-[#3B2F2F]/80 text-sm flex items-center gap-2 font-medium">
                                        <Sparkles className="w-4 h-4" style={{ color: '#A8C5F8' }} />
                                        AI 챗봇이 도와드립니다
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 메시지 영역 */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FDF6F0]">
                        {messages.length === 0 && (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center space-y-4">
                                    <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                                        <Bot className="w-10 h-10 text-white" />
                                    </div>
                                    <p className="text-[#7A6666] opacity-80" style={{ lineHeight: '1.6' }}>대화를 시작해보세요!</p>
                                </div>
                            </div>
                        )}
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex gap-4 items-start animate-in fade-in slide-in-from-bottom-4 duration-500 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {msg.role === "assistant" && (
                                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                                        <Bot className="w-6 h-6 text-white" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[75%] rounded-3xl px-5 py-4 shadow-[0_4px_24px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_6px_32px_rgba(0,0,0,0.08)] ${
                                        msg.role === "user"
                                            ? "text-white rounded-br-md"
                                            : "bg-white text-[#3B2F2F] border border-[#FADADD]/30 rounded-bl-md"
                                    }`}
                                    style={msg.role === "user" ? { background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' } : {}}
                                >
                                    <p className="whitespace-pre-wrap text-[15px] leading-relaxed font-medium" style={{ lineHeight: '1.6' }}>
                                        {msg.content}
                                    </p>
                                </div>
                                {msg.role === "user" && (
                                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white" style={{ background: 'linear-gradient(135deg, #FFE6C5, #F3C3E6)' }}>
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-4 items-start justify-start animate-in fade-in slide-in-from-bottom-4">
                                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div className="bg-white rounded-3xl rounded-bl-md px-5 py-4 shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-[#FADADD]/30">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: "0ms", backgroundColor: '#A8C5F8' }}></div>
                                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: "150ms", backgroundColor: '#F3C3E6' }}></div>
                                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: "300ms", backgroundColor: '#FFE6C5' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* 입력 영역 */}
                    <div className="border-t border-[#FADADD]/30 bg-white/80 backdrop-blur-sm p-5">
                        <div className="flex gap-3 items-end">
                            <div className="flex-1 relative">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="메시지를 입력하세요..."
                                    disabled={isLoading || actionData?.success || fetcher.state === "submitting"}
                                    className="w-full h-12 px-4 pr-12 rounded-2xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all duration-200 bg-white shadow-sm text-[#3B2F2F]"
                                />
                            </div>
                            <Button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim() || actionData?.success || fetcher.state === "submitting"}
                                className="h-12 w-12 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                            </Button>
                        </div>
                        {(actionData?.success || fetcher.data?.success) && (
                            <div className="mt-3 text-center">
                                <p className="text-sm font-medium" style={{ color: '#2D6A9F' }}>✅ 예약이 완료되었습니다!</p>
                            </div>
                        )}
                        {fetcher.state === "submitting" && (
                            <div className="mt-3 text-center">
                                <p className="text-sm font-medium" style={{ color: '#A8C5F8' }}>예약 저장 중...</p>
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            <style>{`
                @keyframes blob {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}

function getSystemPrompt(programs: any[]) {
    // programs 테이블에서 실제 program_id를 가져오거나
    // title에서 추출하는 방식으로 변경
    const programInfo = programs.map(p => {
        // title에서 추출하거나, DB에 program_id 필드가 있다면 사용
        let programId = 'essay'; // 기본값
        const title = p.title?.toLowerCase() || '';

        if (title.includes('연애') || title.includes('love')) {
            programId = 'love';
        } else if (title.includes('사진') || title.includes('포토') || title.includes('photo')) {
            programId = 'photo';
        } else if (title.includes('에세이') || title.includes('essay')) {
            programId = 'essay';
        }

        return {
            id: programId,
            title: p.title,
            description: p.description
        };
    });

    return `당신은 코이창작소의 친절한 예약 상담 챗봇입니다.
  
  역할:
  - 사용자에게 프로그램을 안내하고 예약을 도와드립니다
  - 자연스럽고 친근한 대화로 정보를 수집합니다
  
  프로그램 정보:
  ${programInfo.map((p, idx) => `${idx + 1}. ${p.id}: ${p.title}${p.description ? ` (${p.description})` : ''}`).join('\n')}
  
  수집해야 할 정보:
  1. 프로그램 선택 (${programInfo.map(p => p.id).join(', ')} 중 하나)
  2. 이름
  3. 나이 (숫자)
  4. 직업/대학교명
  5. 연락처 (반드시 010-xxxx-xxxx 형식으로 입력받아야 함)
     - 형식이 맞지 않으면 반드시 다시 입력해달라고 요청해야 함
     - 하이픈 없이 입력해도 자동으로 변환되지만, 최종적으로는 010-xxxx-xxxx 형식으로 저장됨
     - ⚠️ 매우 중요: 예시 번호(예: 010-1234-5678)는 절대 실제 데이터로 추출하지 마세요. 사용자가 실제로 제공한 연락처만 추출해야 합니다.
  6. 가능한 시간 (상세하게, 예: "평일 오후 19시 이후", "월화 18시 전" 등)
  
  대화 스타일:
  - 친근하고 따뜻한 톤
  - 한 번에 하나씩 질문
  - 사용자의 답변에 공감하며 진행
  
  중요:
  - 정보를 수집할 때마다 extract_reservation_info 함수를 사용하여 구조화된 데이터로 저장하세요
  - 사용자가 정보를 제공할 때마다 즉시 extract_reservation_info 함수를 호출하여 업데이트하세요
  - extract_reservation_info 함수를 호출한 후에는 반드시 사용자에게 친절한 응답 메시지를 제공하세요 (함수 호출만 하고 응답을 비워두지 마세요)
  - 누락된 정보가 있으면 반드시 먼저 물어봐야 합니다 (프로그램 > 이름 > 나이 > 직업/학교 > 연락처 > 시간 순서)
  - 모든 정보가 수집되면 "예약 정보가 모두 수집되었습니다"라고 말하세요
  - 이메일은 수집하지 않습니다
  - ⚠️ 연락처 추출 시 주의사항: 예시 번호(예: 010-1234-5678)나 설명 문구에 포함된 번호는 절대 추출하지 마세요. 사용자가 실제로 입력하거나 말한 연락처만 추출해야 합니다.
  
  필수 정보 확인 (매우 중요):
  - 매 응답마다 모든 필수 필드(프로그램, 이름, 나이, 직업/학교, 연락처, 가능한 시간)가 채워졌는지 확인하세요
  - 필드가 하나라도 누락되어 있으면 반드시 그 필드를 먼저 물어봐야 합니다
  - 다른 질문을 하기 전에 누락된 필드를 먼저 수집하세요
  - 모든 필드가 채워졌는지 다시 한 번 확인한 후, 부족한 것이 있으면 질문하세요
  
  응답 생성 규칙:

  - extract_reservation_info 함수를 호출한 후에는 반드시 사용자에게 자연스러운 응답 문장을 함께 생성해야 합니다. 함수만 호출하고 대답을 생략하지 마세요.
  - 예: "감사합니다! [이름]님의 정보를 확인했습니다. 다음으로 [누락된 필드]를 알려주시겠어요?"
  - 함수 호출만 하고 응답을 비워두지 마세요`;


}