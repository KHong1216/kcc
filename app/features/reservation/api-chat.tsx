// app/routes/api.chat.tsx
import OpenAI from "openai";
import { validateAndNormalizePhone } from "../../lib/validation";
import type { Route } from "./+types/api-chat";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Resource route는 GET 요청도 처리할 수 있도록 loader 추가
export async function loader({ request }: Route.LoaderArgs) {
  // GET 요청은 허용하지 않음
  return Response.json({ error: "Method not allowed. Use POST." }, { status: 405 });
}

export async function action({ request }: Route.ActionArgs) {
    try {
      // 요청 본문 파싱
      let body;
      try {
        body = await request.json();
      } catch (parseError) {
        console.error("Request body parse error:", parseError);
        return Response.json({
          response: "죄송합니다. 요청 데이터를 처리할 수 없습니다. 다시 시도해주세요.",
          error: "Invalid request body"
        }, { status: 400 });
      }

      const { messages, programs, collectedData = {} } = body;
  
      // 입력 데이터 검증
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        console.error("Invalid messages:", messages);
        return Response.json({
          response: "죄송합니다. 메시지가 올바르지 않습니다. 다시 시도해주세요.",
          error: "Invalid messages format"
        }, { status: 400 });
      }

      if (!programs || !Array.isArray(programs)) {
        console.error("Invalid programs:", programs);
        return Response.json({
          response: "죄송합니다. 프로그램 정보를 불러올 수 없습니다. 다시 시도해주세요.",
          error: "Invalid programs format"
        }, { status: 400 });
      }

      // 현재 수집된 데이터에서 누락된 필드 확인 (시스템 메시지에 힌트 추가용)
      const currentMissingFields: string[] = [];
      if (!collectedData.program_id) currentMissingFields.push('프로그램');
      if (!collectedData.user_name) currentMissingFields.push('이름');
      if (!collectedData.user_age || isNaN(Number(collectedData.user_age)) || Number(collectedData.user_age) <= 0) {
        currentMissingFields.push('나이');
      }
      if (!collectedData.user_job) currentMissingFields.push('직업/학교');
      if (!collectedData.user_phone) currentMissingFields.push('연락처');
      if (!collectedData.selected_dates && !collectedData.available_time_text) {
        currentMissingFields.push('가능한 시간');
      }

      // 시스템 메시지에 누락된 필드 정보 추가
      const enhancedMessages = messages.map((msg: any) => {
        if (msg.role === 'system' && currentMissingFields.length > 0) {
          const missingHint = `\n\n⚠️ 현재 누락된 필수 정보: ${currentMissingFields.join(', ')}. 반드시 이 정보들을 먼저 수집해야 합니다. 다른 질문을 하기 전에 누락된 필드를 먼저 물어보세요.`;
          return {
            ...msg,
            content: msg.content + missingHint
          };
        }
        return msg;
      });

      // 예약 정보 추출을 위한 함수 정의
      const reservationExtractionFunction = {
        name: "extract_reservation_info",
        description: "대화에서 예약에 필요한 정보를 추출합니다. 사용자가 제공한 정보만 추출하고, 누락된 정보는 null로 설정합니다.",
        parameters: {
          type: "object",
          properties: {
            program_id: {
              type: "string",
              enum: ["love", "photo", "essay"],
              description: "선택한 프로그램 ID"
            },
            user_name: {
              type: "string",
              description: "사용자 이름 (한글 2-4자)"
            },
            user_age: {
              type: "integer",
              description: "사용자 나이 (10-150 사이의 숫자)"
            },
            user_job: {
              type: "string",
              description: "직업 또는 대학교명"
            },
            user_phone: {
              type: "string",
              description: "연락처 (010-XXXX-XXXX 형식). 사용자가 실제로 제공한 연락처만 추출하고, 예시 번호(예: 010-1234-5678)는 절대 추출하지 마세요."
            },
            available_time_text: {
              type: "string",
              description: "가능한 시간에 대한 상세한 텍스트 설명 (예: '평일 오후 19시 이후', '월화 18시 전' 등)"
            }
          },
          required: []
        }
      };

      // OpenAI API 호출 (function calling 사용)
      let completion;
      try {
        completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: enhancedMessages,
          temperature: 0.7,
          max_tokens: 500,
          tools: [
            {
              type: "function",
              function: reservationExtractionFunction
            }
          ],
          tool_choice: "auto", // 필요할 때 자동으로 함수 호출
        });
      } catch (openaiError: any) {
        console.error("OpenAI API error:", openaiError);
        const errorMsg = openaiError?.message || "OpenAI API 호출 실패";
        return Response.json({
          response: `죄송합니다. AI 응답을 받을 수 없습니다. 잠시 후 다시 시도해주세요.`,
          error: errorMsg
        }, { status: 500 });
      }
  
      // Function calling 응답 처리
      const message = completion.choices[0]?.message;
      const toolCalls = message?.tool_calls;
      
      let extractedData: any = null;
      let chatMessage = message?.content?.trim() || "";
      
      // Function calling으로 추출된 데이터가 있으면 우선 사용
      if (toolCalls && toolCalls.length > 0) {
        for (const toolCall of toolCalls) {
          // 타입 가드: function 속성이 있는지 확인
          if ('function' in toolCall && toolCall.function.name === "extract_reservation_info") {
            try {
              const functionArgs = JSON.parse(toolCall.function.arguments);
              console.log("Function calling으로 추출된 데이터:", functionArgs);
              
              // 기존 collectedData와 병합 (null이 아닌 값만 업데이트)
              extractedData = { ...collectedData };
              if (functionArgs.program_id) extractedData.program_id = functionArgs.program_id;
              if (functionArgs.user_name) extractedData.user_name = functionArgs.user_name;
              if (functionArgs.user_age !== null && functionArgs.user_age !== undefined) {
                extractedData.user_age = Number(functionArgs.user_age);
              }
              if (functionArgs.user_job) extractedData.user_job = functionArgs.user_job;
              // 연락처 검증 및 정규화
              if (functionArgs.user_phone) {
                const phoneStr = String(functionArgs.user_phone).trim();
                
                // 예시 번호 패턴을 더 엄격하게 체크 (시스템 프롬프트나 AI 응답의 예시 문구에서만 제외)
                // 사용자가 직접 입력한 번호는 예시로 간주하지 않음
                const isExampleNumber = 
                  // 명확한 예시 문구와 함께 나온 경우만 제외
                  (phoneStr === '010-1234-5678' && functionArgs.user_phone.includes('예')) ||
                  (phoneStr === '01012345678' && functionArgs.user_phone.includes('예')) ||
                  (phoneStr === '010 1234 5678' && functionArgs.user_phone.includes('예'));
                
                if (isExampleNumber) {
                  console.log("예시 번호로 인식하여 연락처 추출 제외:", phoneStr);
                  extractedData.user_phone = null;
                } else {
                  const phoneValidation = validateAndNormalizePhone(functionArgs.user_phone);
                  if (phoneValidation.isValid && phoneValidation.normalized) {
                    extractedData.user_phone = phoneValidation.normalized;
                  } else {
                    // 검증 실패 시 null로 설정하여 AI가 다시 물어보도록 함
                    extractedData.user_phone = null;
                    console.log("연락처 검증 실패:", phoneValidation.error);
                  }
                }
              }
              // available_time_text는 사용자가 실제로 입력한 경우에만 업데이트
              // 예시 문구나 빈 값은 제외
              if (functionArgs.available_time_text && 
                  typeof functionArgs.available_time_text === 'string' &&
                  functionArgs.available_time_text.trim().length > 0 &&
                  functionArgs.available_time_text.trim() !== '미정' &&
                  functionArgs.available_time_text.trim() !== '없음' &&
                  !/예를\s*들어|예시|예\s*를|같은\s*형식|형식으로/.test(functionArgs.available_time_text)) {
                extractedData.available_time_text = functionArgs.available_time_text.trim();
              }
              
              console.log("병합된 extractedData:", extractedData);
              break;
            } catch (parseError) {
              console.error("Function arguments 파싱 오류:", parseError);
            }
          }
        }
        
        // Function calling만 있고 content가 비어있으면 2차 요청으로 자연스러운 응답 생성
        if (!chatMessage) {
          console.log("Function calling 후 content가 비어있음, 2차 요청으로 자연스러운 응답 생성");
          
          // 2차 요청: tool_calls 결과를 포함하여 자연스러운 응답 생성
          const secondRequestMessages = [
            ...enhancedMessages,
            {
              role: "assistant" as const,
              content: null,
              tool_calls: toolCalls
            },
            {
              role: "tool" as const,
              tool_call_id: toolCalls[0].id,
              content: JSON.stringify({ success: true, extracted: extractedData })
            },
            {
              role: "user" as const,
              content: "위 정보를 바탕으로 사용자에게 자연스럽고 친절한 응답을 생성해주세요. 누락된 정보가 있으면 다음에 물어볼 정보를 안내해주세요."
            }
          ];
          
          try {
            const secondCompletion = await openai.chat.completions.create({
              model: "gpt-4o-mini",
              messages: secondRequestMessages,
              temperature: 0.7,
              max_tokens: 300,
            });
            
            chatMessage = secondCompletion.choices[0]?.message?.content?.trim() || "";
            
            if (!chatMessage) {
              chatMessage = "정보를 확인했습니다. 추가로 필요한 정보가 있으면 알려주세요.";
            }
            
            console.log("2차 요청으로 생성된 응답:", chatMessage);
          } catch (secondError: any) {
            console.error("2차 요청 오류:", secondError);
            chatMessage = "정보를 확인했습니다. 추가로 필요한 정보가 있으면 알려주세요.";
          }
        }
      }
      
      // Function calling으로 추출 실패 시 기존 방식 사용 (백업)
      if (!extractedData) {
        try {
          extractedData = extractInfoFromConversation(messages, programs, collectedData);
          console.log("정규식으로 추출된 데이터 (백업):", extractedData);
        } catch (extractError) {
          console.error("Data extraction error:", extractError);
          extractedData = collectedData || {};
        }
      }
      
      // 기존 collectedData와 최종 병합
      if (collectedData) {
        extractedData = { ...collectedData, ...extractedData };
      }
      
      console.log("최종 extractedData:", extractedData);
      
      let shouldSave = false;
  
      // 정보 추출 확인
      try {
        
        // 정보가 완전히 수집되었는지 확인
        const complete = isComplete(extractedData);
        console.log("isComplete 결과:", complete);
        
        if (complete) {
          // 모든 정보가 수집되었지만, 사용자 확인을 위해 먼저 요약을 보여줌
          // shouldSave는 true로 설정하되, 실제 저장은 사용자 확인 후에만 진행
          shouldSave = true;
          
          // 가능한 시간이 실제로 유효한지 다시 한 번 확인
          const hasValidTime = !!(
            (extractedData.selected_dates && Object.keys(extractedData.selected_dates).length > 0) ||
            (extractedData.available_time_text && 
             typeof extractedData.available_time_text === 'string' && 
             extractedData.available_time_text.trim().length > 0 &&
             extractedData.available_time_text.trim() !== '미정' &&
             extractedData.available_time_text.trim() !== '없음')
          );
          
          // 가능한 시간이 유효할 때만 요약 메시지 생성
          if (hasValidTime) {
            // Function calling으로 이미 응답이 있으면 그대로 사용, 없으면 요약 메시지 생성
            if (!chatMessage || chatMessage.length < 10) {
              // 요약 메시지 생성
              const programName = extractedData.program_id === 'love' ? '연애' : extractedData.program_id === 'photo' ? '사진' : '에세이';
              const summary = `✅ 예약 정보가 모두 수집되었습니다!\n\n` +
                `📋 예약 정보 요약:\n` +
                `- 프로그램: ${programName}\n` +
                `- 이름: ${extractedData.user_name}\n` +
                `- 나이: ${extractedData.user_age}세\n` +
                `- 직업/학교: ${extractedData.user_job}\n` +
                `- 연락처: ${extractedData.user_phone}\n` +
                `- 가능한 시간: ${extractedData.available_time_text}\n\n` +
                `위 내용으로 예약을 신청하시겠습니까?\n` +
                `(예 또는 네를 입력해주세요)`;
              chatMessage = summary;
            } else {
              // 이미 응답이 있지만 요약이 포함되어 있지 않으면 요약 추가
              if (!chatMessage.includes('예약 정보') && !chatMessage.includes('요약')) {
                const programName = extractedData.program_id === 'love' ? '연애' : extractedData.program_id === 'photo' ? '사진' : '에세이';
                const summary = `\n\n📋 예약 정보 요약:\n` +
                  `- 프로그램: ${programName}\n` +
                  `- 이름: ${extractedData.user_name}\n` +
                  `- 나이: ${extractedData.user_age}세\n` +
                  `- 직업/학교: ${extractedData.user_job}\n` +
                  `- 연락처: ${extractedData.user_phone}\n` +
                  `- 가능한 시간: ${extractedData.available_time_text}\n\n` +
                  `위 내용으로 예약을 신청하시겠습니까?\n` +
                  `(예 또는 네를 입력해주세요)`;
                chatMessage = chatMessage + summary;
              } else if (!chatMessage.includes('신청하시겠습니까') && !chatMessage.includes('저장하시겠습니까')) {
                // 요약은 있지만 확인 문구가 없으면 추가
                chatMessage = chatMessage + `\n\n위 내용으로 예약을 신청하시겠습니까? (예 또는 네를 입력해주세요)`;
              }
            }
          } else {
            // 가능한 시간이 없으면 요약하지 않고 시간을 물어봐야 함
            if (!chatMessage || chatMessage.length < 10) {
              chatMessage = "가능한 시간을 알려주시겠어요? 예를 들어 '평일 오후 19시 이후'나 '월화 18시 전'과 같은 형식으로 말씀해주세요!";
            }
            // shouldSave를 false로 변경 (시간 정보가 없으므로)
            shouldSave = false;
          }
          console.log("저장 가능 상태:", shouldSave);
        } else {
          // 정보가 불완전할 때도 기본 메시지가 없으면 생성
          if (!chatMessage) {
            chatMessage = "추가 정보가 필요합니다. 계속 진행하시겠어요?";
          }
          console.log("저장 불가 - 정보 불완전");
          // 누락된 필드 확인
          const missing = [];
          if (!extractedData.program_id) missing.push('프로그램');
          if (!extractedData.user_name) missing.push('이름');
          if (!extractedData.user_age || isNaN(Number(extractedData.user_age)) || Number(extractedData.user_age) <= 0) {
            missing.push('나이');
          }
          if (!extractedData.user_job) missing.push('직업/학교');
          if (!extractedData.user_phone) missing.push('연락처');
          if (!extractedData.selected_dates && !extractedData.available_time_text) missing.push('가능한 시간');
          console.log("누락된 필드:", missing);
          console.log("현재 extractedData 상태:", JSON.stringify(extractedData, null, 2));
          
          // 누락된 필드가 있으면 AI 응답에 힌트 추가
          if (missing.length > 0) {
            const missingText = missing.join(', ');
            // AI가 누락된 필드를 자연스럽게 물어보도록 시스템 메시지에 힌트 추가
            // 실제로는 시스템 프롬프트에서 처리하지만, 여기서는 응답에 누락 정보 포함
          }
        }
      } catch (extractError) {
        console.error("Data extraction error:", extractError);
        // 추출 실패해도 계속 진행
      }
  
      // 연락처 검증 (최종 검증)
      let phoneValidationError: string | null = null;
      if (extractedData?.user_phone) {
        const phoneValidation = validateAndNormalizePhone(extractedData.user_phone);
        if (!phoneValidation.isValid) {
          // 검증 실패 시 null로 설정하여 다시 물어보도록 함
          extractedData.user_phone = null;
          phoneValidationError = phoneValidation.error || "연락처 형식이 올바르지 않습니다.";
          console.log("최종 연락처 검증 실패:", phoneValidationError);
          
          // AI 응답에 연락처 재입력 요청 추가
          if (!chatMessage || chatMessage.length < 10) {
            chatMessage = `죄송합니다. 연락처 형식이 올바르지 않습니다.\n\n연락처는 010-xxxx-xxxx 형식으로 입력해주세요.\n예: 010-1234-5678\n\n다시 입력해주시겠어요?`;
          } else if (!chatMessage.includes('연락처') && !chatMessage.includes('010-')) {
            chatMessage = `${chatMessage}\n\n참고로, 연락처는 010-xxxx-xxxx 형식으로 입력해주세요. (예: 010-1234-5678)`;
          }
        } else if (phoneValidation.normalized) {
          // 검증 성공 시 정규화된 형식으로 업데이트
          extractedData.user_phone = phoneValidation.normalized;
        }
      }

      // 누락된 필드 정보 계산
      let missingFields: string[] = [];
      if (!shouldSave) {
        if (!extractedData?.program_id) missingFields.push('프로그램');
        if (!extractedData?.user_name) missingFields.push('이름');
        if (!extractedData?.user_age || isNaN(Number(extractedData.user_age)) || Number(extractedData.user_age) <= 0) {
          missingFields.push('나이');
        }
        if (!extractedData?.user_job) missingFields.push('직업/학교');
        // 연락처 검증 실패도 누락으로 처리
        if (!extractedData?.user_phone || phoneValidationError) {
          missingFields.push('연락처');
        }
        if (!extractedData?.selected_dates && !extractedData?.available_time_text) {
          missingFields.push('가능한 시간');
        }
      }

      return Response.json({
        response: chatMessage,
        extractedData,
        shouldSave,
        missingFields: missingFields.length > 0 ? missingFields : undefined
      });
    } catch (error: any) {
      console.error("Chat API error:", error);
      const errorMessage = error?.message || "알 수 없는 오류";
      return Response.json({
        response: "죄송합니다. 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        error: errorMessage
      }, { status: 500 });
    }
  }

// 정보 추출이 필요한 시점 판단
function shouldExtractInfo(messages: any[]): boolean {
  const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
  return lastUserMessage.includes("완료") || 
         lastUserMessage.includes("저장") ||
         lastUserMessage.includes("예약");
}

// 대화에서 정보 추출
function extractInfoFromConversation(messages: any[], programs: any[], collectedData?: any): any {
  const conversation = messages.map(m => `${m.role}: ${m.content}`).join('\n');
  
  const extracted: any = {};
  
  // 기존 collectedData가 있으면 먼저 사용 (하지만 최신 정보로 덮어쓸 수 있음)
  if (collectedData) {
    Object.assign(extracted, collectedData);
  }
  
  // 사용자의 최신 메시지들을 우선 분석 (최신 정보가 우선)
  const userMessages = messages.filter(m => m.role === 'user').map(m => m.content);
  const latestUserMessages = userMessages.slice(-3); // 최근 3개 메시지
  const recentConversation = latestUserMessages.join('\n');

  // 프로그램 추출
  const programKeywords = {
    'love': ['연애', 'love', '1번', '첫번째'],
    'photo': ['사진', '포토', 'photo', '2번', '두번째'],
    'essay': ['에세이', 'essay', '3번', '세번째']
  };

  for (const [key, keywords] of Object.entries(programKeywords)) {
    if (keywords.some(k => conversation.toLowerCase().includes(k))) {
      extracted.program_id = key as 'love' | 'photo' | 'essay';
      break;
    }
  }

  // 이름 추출 (최신 메시지 우선, 더 유연한 패턴)
  // 최신 메시지에서 찾은 정보는 항상 업데이트 (기존 데이터 덮어쓰기)
  const namePatterns = [
    /(?:이름|성함)[은는]?\s*[:：]\s*([가-힣]{1,4})/i,
    /-?\s*이름[은는]?\s*[:：]\s*([가-힣]{1,4})/i,
    /이름[은는]?\s*[:：]\s*([가-힣]{1,4})/i,
    /이름[은는]?\s*([가-힣]{1,4})/i,
    /이름\s*[:：]\s*([가-힣]{1,4})/i,
    /이름\s*([가-힣]{1,4})/i,
    // 사용자가 직접 이름만 입력한 경우 (한글 2-4자)
    /^([가-힣]{2,4})$/,
    // "저는 [이름]입니다" 형식
    /(?:저는|제 이름은|이름은)\s*([가-힣]{2,4})/i
  ];
  
  // 최신 메시지에서 먼저 찾기 (기존 데이터가 있어도 최신 정보로 업데이트)
  let foundInLatest = false;
  for (const pattern of namePatterns) {
    for (const msg of latestUserMessages) {
      const match = msg.match(pattern);
      if (match && match[1]) {
        const name = match[1].trim();
        // 한글 이름인지 확인 (2-4자)
        if (name.length >= 2 && name.length <= 4 && /^[가-힣]+$/.test(name)) {
          extracted.user_name = name;
          foundInLatest = true;
          break;
        }
      }
    }
    if (foundInLatest) break;
  }
  
  // 최신 메시지에서 못 찾았고 기존 데이터도 없으면 전체 대화에서 찾기
  if (!foundInLatest && !extracted.user_name) {
    for (const pattern of namePatterns) {
      const match = conversation.match(pattern);
      if (match && match[1]) {
        const name = match[1].trim();
        if (name.length >= 2 && name.length <= 4 && /^[가-힣]+$/.test(name)) {
          extracted.user_name = name;
          break;
        }
      }
    }
  }

  // 나이 추출 (최신 메시지 우선, 기존 데이터 덮어쓰기 가능)
  const agePatterns = [
    /(?:나이|연령)[은는]?\s*[:：]\s*(\d{1,3})/i,
    /-?\s*나이[은는]?\s*[:：]\s*(\d{1,3})/i,
    /나이[은는]?\s*[:：]\s*(\d{1,3})/i,
    /나이[은는]?\s*(\d{1,3})/i,
    /나이\s*[:：]\s*(\d{1,3})/i,
    /(\d{1,3})세/i,
    /나이\s*[:：]\s*(\d{1,3})세/i,
    // 사용자가 직접 숫자만 입력한 경우 (나이일 가능성)
    /^(?:저는|제가|나는|내가)\s*(\d{1,3})(?:세|살|살이에요|살입니다)/i,
    /(\d{1,3})(?:세|살)/i
  ];
  
  // 최신 메시지에서 먼저 찾기 (기존 데이터가 있어도 최신 정보로 업데이트)
  let foundAgeInLatest = false;
  for (const pattern of agePatterns) {
    for (const msg of latestUserMessages) {
      const match = msg.match(pattern);
      if (match && match[1]) {
        const ageNum = parseInt(match[1], 10);
        if (!isNaN(ageNum) && ageNum > 0 && ageNum < 150) {
          extracted.user_age = ageNum;
          foundAgeInLatest = true;
          break;
        }
      }
    }
    if (foundAgeInLatest) break;
  }
  
  // 숫자만 입력된 경우 처리 (나이 질문 직후에 숫자만 입력했다면 나이로 인식)
  if (!foundAgeInLatest) {
    // 최근 AI 메시지에서 나이 관련 질문이 있는지 확인
    const assistantMessages = messages.filter(m => m.role === 'assistant').slice(-3);
    const hasAgeQuestion = assistantMessages.some(msg => 
      /나이|연령|몇\s*살|몇\s*세/.test(msg.content)
    );
    
    // 나이 질문 직후에 숫자만 입력했다면 나이로 인식
    if (hasAgeQuestion) {
      for (const msg of latestUserMessages) {
        // 숫자만 있는 메시지 (1-3자리, 10-99 사이가 가장 일반적)
        const numberOnly = /^(\d{1,3})$/.test(msg.trim());
        if (numberOnly) {
          const ageNum = parseInt(msg.trim(), 10);
          if (!isNaN(ageNum) && ageNum >= 10 && ageNum < 150) {
            extracted.user_age = ageNum;
            foundAgeInLatest = true;
            console.log("숫자만 입력된 메시지를 나이로 인식:", ageNum);
            break;
          }
        }
      }
    }
  }
  
  // 최신 메시지에서 못 찾았고 기존 데이터도 없으면 전체 대화에서 찾기
  if (!foundAgeInLatest && !extracted.user_age) {
    for (const pattern of agePatterns) {
      const match = conversation.match(pattern);
      if (match && match[1]) {
        const ageNum = parseInt(match[1], 10);
        if (!isNaN(ageNum) && ageNum > 0 && ageNum < 150) {
          extracted.user_age = ageNum;
          break;
        }
      }
    }
  }
  
  // AI 요약 형식에서 나이 추출 (예: "- 나이: 25", "나이는 25세" 등)
  if (!extracted.user_age) {
    const summaryPatterns = [
      /(?:나이|연령)[은는]?\s*[:：]\s*(\d{1,3})/i,
      /-?\s*나이[은는]?\s*[:：]\s*(\d{1,3})/i,
      /나이\s*[:：]\s*(\d{1,3})/i,
      /나이는\s*(\d{1,3})(?:세|살)?/i
    ];
    
    // AI 응답 메시지에서 찾기
    const assistantMessages = messages.filter(m => m.role === 'assistant').map(m => m.content);
    for (const msg of assistantMessages) {
      for (const pattern of summaryPatterns) {
        const match = msg.match(pattern);
        if (match && match[1]) {
          const ageNum = parseInt(match[1], 10);
          if (!isNaN(ageNum) && ageNum > 0 && ageNum < 150) {
            extracted.user_age = ageNum;
            console.log("AI 요약에서 나이 추출:", ageNum);
            break;
          }
        }
      }
      if (extracted.user_age) break;
    }
  }

  // 직업/학교 추출 (최신 메시지 우선, 기존 데이터 덮어쓰기 가능)
  const jobPatterns = [
    /(?:직업|학교|대학|대학교)[은는]?\s*[:：]\s*([가-힣\s\/\w]+)/i,
    /-?\s*직업[은는]?\s*[:：]\s*([가-힣\s\/\w]+)/i,
    /직업[은는]?\s*[:：]\s*([가-힣\s\/\w]+)/i,
    /직업[은는]?\s*([가-힣\s\/\w]+)/i,
    /직업\/대학교명[은는]?\s*[:：]\s*([가-힣\s\/\w]+)/i,
    /직업\/대학교명\s*[:：]\s*([가-힣\s\/\w]+)/i,
    // "저는 [직업]입니다" 형식
    /(?:저는|제가|나는)\s*([가-힣\s\/\w]+)(?:입니다|이에요|예요|입니다|입니다)/i,
    /무직/i
  ];
  
  // 최신 메시지에서 먼저 찾기 (기존 데이터가 있어도 최신 정보로 업데이트)
  let foundJobInLatest = false;
  for (const pattern of jobPatterns) {
    for (const msg of latestUserMessages) {
      const match = msg.match(pattern);
      if (match && match[1]) {
        const job = match[1].trim();
        if (job && job !== '무직' && job.length > 0) {
          extracted.user_job = job;
          foundJobInLatest = true;
          break;
        }
      }
    }
    if (foundJobInLatest) break;
  }
  
  // "무직" 직접 체크 (최신 메시지 우선)
  if (!foundJobInLatest) {
    if (recentConversation.toLowerCase().includes('무직')) {
      extracted.user_job = '무직';
      foundJobInLatest = true;
    } else if (!extracted.user_job && conversation.toLowerCase().includes('무직')) {
      extracted.user_job = '무직';
    }
  }
  
  // 최신 메시지에서 못 찾았고 기존 데이터도 없으면 전체 대화에서 찾기
  if (!foundJobInLatest && !extracted.user_job) {
    for (const pattern of jobPatterns) {
      const match = conversation.match(pattern);
      if (match && match[1]) {
        const job = match[1].trim();
        if (job && job.length > 0) {
          extracted.user_job = job;
          break;
        }
      }
    }
  }

  // 연락처 추출 (사용자 메시지에서만 추출 - AI 응답의 예시 문구 제외)
  // 사용자 메시지만 사용 (AI 응답에서 추출하지 않음)
  const userMessagesOnly = messages.filter(m => m.role === 'user').map(m => m.content);
  const userConversationForPhone = userMessagesOnly.join('\n');
  
  // 예시 문구 패턴 (이런 문구가 포함된 경우 제외)
  const examplePatterns = [
    /예\s*[:：]\s*010/i,
    /예를\s*들어/i,
    /예시/i,
    /예\s*를/i,
    /같은\s*형식/i,
    /형식으로/i,
    /\(예\s*[:：]\s*010/i,
    /예\s*를\s*들어/i
  ];
  
  const phonePatterns = [
    /(?:연락처|전화|핸드폰|번호)[은는]?\s*[:：]\s*(010[-.\s]?\d{4}[-.\s]?\d{4})/i,
    /-?\s*연락처[은는]?\s*[:：]\s*(010[-.\s]?\d{4}[-.\s]?\d{4})/i,
    /연락처[은는]?\s*[:：]\s*(010[-.\s]?\d{4}[-.\s]?\d{4})/i,
    /연락처\s*[:：]\s*(010[-.\s]?\d{4}[-.\s]?\d{4})/i,
    // 전화번호만 직접 입력한 경우 (예시 문구 제외)
    /(010[-.\s]?\d{4}[-.\s]?\d{4})/i,
    // 하이픈 없는 형식
    /(010\d{8})/i
  ];
  
  // 최신 사용자 메시지에서 먼저 찾기
  let foundPhoneInLatest = false;
  for (const pattern of phonePatterns) {
    for (const msg of latestUserMessages) {
      // 예시 문구가 포함된 메시지는 제외
      const isExample = examplePatterns.some(expPattern => expPattern.test(msg));
      if (isExample) {
        console.log("예시 문구로 인식하여 연락처 추출 제외:", msg);
        continue;
      }
      
      const match = msg.match(pattern);
      if (match && match[1]) {
        // 매칭된 부분의 앞뒤 문맥 확인 (예시 문구가 있는지)
        const matchIndex = msg.indexOf(match[0]);
        const contextBefore = msg.substring(Math.max(0, matchIndex - 20), matchIndex);
        const isContextExample = examplePatterns.some(expPattern => expPattern.test(contextBefore));
        
        if (isContextExample) {
          console.log("문맥에서 예시 문구 감지하여 연락처 추출 제외:", msg);
          continue;
        }
        
        const phone = match[1].replace(/[-.\s]/g, '');
        // 010으로 시작하고 11자리인지 확인
        if (phone.startsWith('010') && phone.length === 11) {
          const normalizedPhone = phone.slice(0, 3) + '-' + phone.slice(3, 7) + '-' + phone.slice(7);
          // zod로 검증
          const phoneValidation = validateAndNormalizePhone(normalizedPhone);
          if (phoneValidation.isValid && phoneValidation.normalized) {
            extracted.user_phone = phoneValidation.normalized;
            foundPhoneInLatest = true;
            console.log("사용자 메시지에서 연락처 추출 성공:", normalizedPhone);
            break;
          } else {
            console.log("연락처 검증 실패 (최신 메시지):", phoneValidation.error);
          }
        }
      }
    }
    if (foundPhoneInLatest) break;
  }
  
  // 최신 메시지에서 못 찾았고 기존 데이터도 없으면 전체 사용자 대화에서 찾기
  if (!foundPhoneInLatest && !extracted.user_phone) {
    for (const pattern of phonePatterns) {
      let match;
      while ((match = pattern.exec(userConversationForPhone)) !== null) {
        // 예시 문구가 포함된 경우 제외
        const matchIndex = match.index;
        const contextBefore = userConversationForPhone.substring(Math.max(0, matchIndex - 30), matchIndex);
        const isContextExample = examplePatterns.some(expPattern => expPattern.test(contextBefore));
        
        if (isContextExample) {
          console.log("문맥에서 예시 문구 감지하여 연락처 추출 제외 (전체 대화):", match[0]);
          continue;
        }
        
        if (match && match[1]) {
          const phone = match[1].replace(/[-.\s]/g, '');
          if (phone.startsWith('010') && phone.length === 11) {
            const normalizedPhone = phone.slice(0, 3) + '-' + phone.slice(3, 7) + '-' + phone.slice(7);
            // zod로 검증
            const phoneValidation = validateAndNormalizePhone(normalizedPhone);
            if (phoneValidation.isValid && phoneValidation.normalized) {
              extracted.user_phone = phoneValidation.normalized;
              console.log("사용자 대화에서 연락처 추출 성공:", normalizedPhone);
              break;
            } else {
              console.log("연락처 검증 실패 (전체 대화):", phoneValidation.error);
            }
          }
        }
      }
      if (extracted.user_phone) break;
    }
  }

  // 시간 정보 추출 (사용자 메시지에서만 추출 - AI 예시 문구 제외)
  // 사용자가 실제로 입력한 시간 정보만 추출
  // userMessages는 이미 위에서 선언됨
  const userConversation = userMessages.join('\n');
  
  // 사용자 메시지에서 시간 정보 추출 (우선)
  if (!extracted.available_time_text) {
    const timeKeywords = ['시간', '가능', '일정', '요일', '평일', '주말', '오전', '오후', '저녁', '프리', '자유', '월', '화', '수', '목', '금', '토', '일', '시', '이후', '전', '18시', '19시', '20시'];
    const timeRelatedMessages = userMessages.filter(msg => {
      // 예시 문구 제외 (예: "예를 들어", "예시" 등이 포함된 메시지는 제외)
      const isExample = /예를\s*들어|예시|예\s*를|같은\s*형식|형식으로/.test(msg);
      if (isExample) return false;
      
      // 시간 관련 키워드가 포함되어 있고, 실제 시간 정보일 가능성이 있는지 확인
      return timeKeywords.some(keyword => msg.toLowerCase().includes(keyword)) &&
             msg.trim().length >= 3;
    });
    
    if (timeRelatedMessages.length > 0) {
      // 사용자가 말한 시간 정보를 텍스트로 저장 (마지막 시간 관련 메시지 우선)
      const timeText = timeRelatedMessages[timeRelatedMessages.length - 1].trim();
      // 예시 문구가 아닌지 다시 확인
      if (timeText && 
          !/예를\s*들어|예시|예\s*를|같은\s*형식|형식으로/.test(timeText) &&
          timeText.length >= 3) {
        extracted.available_time_text = timeText;
        console.log("사용자 메시지에서 시간 정보 추출:", timeText);
      }
    }
  }
  
  // 사용자 메시지에서 요약 형식으로 추출 (예: "가능한 시간: 평일 18시 이후")
  if (!extracted.available_time_text) {
    const timeSummaryPatterns = [
      /(?:가능한\s*시간|시간)[은는]?\s*[:：]\s*([가-힣\s\d시이후전월화수목금토일]+)/i,
      /-?\s*가능한\s*시간[은는]?\s*[:：]\s*([가-힣\s\d시이후전월화수목금토일]+)/i,
      /가능한\s*시간\s*[:：]\s*([가-힣\s\d시이후전월화수목금토일]+)/i,
      /시간\s*[:：]\s*([가-힣\s\d시이후전월화수목금토일]+)/i
    ];
    for (const pattern of timeSummaryPatterns) {
      const match = userConversation.match(pattern);
      if (match && match[1]) {
        const timeText = match[1].trim();
        // 예시 문구가 아닌지 확인
        if (timeText.length >= 3 && 
            !/예를\s*들어|예시|예\s*를|같은\s*형식|형식으로/.test(timeText)) {
          extracted.available_time_text = timeText;
          console.log("사용자 요약에서 시간 정보 추출:", timeText);
          break;
        }
      }
    }
  }

  // 구조화된 시간 추출 (사용자 메시지에서만 추출 - AI 예시 제외)
  const selectedDates: Record<string, string[]> = {};
  
  // 사용자 메시지에서만 시간 패턴 추출
  const timePattern = /(월|화|수|목|금|토|일)요일[은는]?\s*[:：]?\s*([\d:시\s,]+)/gi;
  let match;
  
  while ((match = timePattern.exec(userConversation)) !== null) {
    const day = match[1];
    const times = match[2].split(/[,，]/).map(t => t.trim());
    const dayKey = getDayKey(day);
    if (dayKey) {
      selectedDates[dayKey] = times;
    }
  }

  // 평일 패턴 추출 (사용자 메시지에서만)
  const weekdayPattern = /평일[은는]?\s*(오전|오후|저녁|[\d]+시?\s*(이후|전)?|이후|전|프리|자유)/gi;
  let weekdayMatch;
  while ((weekdayMatch = weekdayPattern.exec(userConversation)) !== null) {
    // 예시 문구가 아닌지 확인
    const context = userConversation.substring(Math.max(0, weekdayMatch.index - 20), weekdayMatch.index + weekdayMatch[0].length + 20);
    if (!/예를\s*들어|예시|예\s*를|같은\s*형식|형식으로/.test(context)) {
      const timeInfo = weekdayMatch[1] || weekdayMatch[2] || '';
      if (timeInfo) {
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].forEach(day => {
          if (!selectedDates[day]) {
            selectedDates[day] = [timeInfo.trim()];
          }
        });
      }
    }
  }
  
  // 주말 패턴 추출 (사용자 메시지에서만)
  const weekendPattern = /(주말|토일|토요일|일요일)[은는]?\s*(오전|오후|저녁|[\d]+시?\s*(이후|전)?|이후|전|프리|자유)/gi;
  let weekendMatch;
  while ((weekendMatch = weekendPattern.exec(userConversation)) !== null) {
    // 예시 문구가 아닌지 확인
    const context = userConversation.substring(Math.max(0, weekendMatch.index - 20), weekendMatch.index + weekendMatch[0].length + 20);
    if (!/예를\s*들어|예시|예\s*를|같은\s*형식|형식으로/.test(context)) {
      const timeInfo = weekendMatch[2] || '프리';
      ['Sat', 'Sun'].forEach(day => {
        if (!selectedDates[day]) {
          selectedDates[day] = [timeInfo.trim()];
        }
      });
    }
  }

  // 개별 요일 패턴 추출 (사용자 메시지에서만)
  const dayRangePatterns = [
    /월화\s*(오전|오후|저녁|[\d]+시?\s*(이후|전)?|이후|전|프리|자유)/gi,
    /화수\s*(오전|오후|저녁|[\d]+시?\s*(이후|전)?|이후|전|프리|자유)/gi,
    /수목\s*(오전|오후|저녁|[\d]+시?\s*(이후|전)?|이후|전|프리|자유)/gi,
    /목금\s*(오전|오후|저녁|[\d]+시?\s*(이후|전)?|이후|전|프리|자유)/gi,
    /수목금\s*(오전|오후|저녁|[\d]+시?\s*(이후|전)?|이후|전|프리|자유)/gi,
    /토일\s*(오전|오후|저녁|[\d]+시?\s*(이후|전)?|이후|전|프리|자유)/gi,
  ];
  
  dayRangePatterns.forEach((pattern, idx) => {
    let match;
    const dayRanges: Record<number, string[]> = {
      0: ['Mon', 'Tue'],      // 월화
      1: ['Tue', 'Wed'],      // 화수
      2: ['Wed', 'Thu'],      // 수목
      3: ['Thu', 'Fri'],      // 목금
      4: ['Wed', 'Thu', 'Fri'], // 수목금
      5: ['Sat', 'Sun'],      // 토일
    };
    
    while ((match = pattern.exec(userConversation)) !== null) {
      // 예시 문구가 아닌지 확인
      const context = userConversation.substring(Math.max(0, match.index - 20), match.index + match[0].length + 20);
      if (!/예를\s*들어|예시|예\s*를|같은\s*형식|형식으로/.test(context)) {
        const timeInfo = (match[1] || match[2] || '').trim();
        const days = dayRanges[idx] || [];
        days.forEach(day => {
          if (day && !selectedDates[day]) {
            selectedDates[day] = [timeInfo || '자유'];
          }
        });
      }
    }
  });

  // 단일 요일 패턴 (사용자 메시지에서만)
  const singleDayPattern = /(월|화|수|목|금|토|일)요일?\s*(오전|오후|저녁|[\d]+시?\s*(이후|전)?|이후|전|프리|자유)/gi;
  let singleDayMatch;
  while ((singleDayMatch = singleDayPattern.exec(userConversation)) !== null) {
    // 예시 문구가 아닌지 확인
    const context = userConversation.substring(Math.max(0, singleDayMatch.index - 20), singleDayMatch.index + singleDayMatch[0].length + 20);
    if (!/예를\s*들어|예시|예\s*를|같은\s*형식|형식으로/.test(context)) {
      const day = singleDayMatch[1];
      const timeInfo = (singleDayMatch[2] || singleDayMatch[3] || '').trim();
      const dayKey = getDayKey(day);
      if (dayKey && !selectedDates[dayKey]) {
        selectedDates[dayKey] = [timeInfo || '자유'];
      }
    }
  }

  if (Object.keys(selectedDates).length > 0) {
    extracted.selected_dates = selectedDates;
  }

  return extracted;
}

function getDayKey(day: string): string | null {
  const dayMap: Record<string, string> = {
    '월': 'Mon', '화': 'Tue', '수': 'Wed', '목': 'Thu',
    '금': 'Fri', '토': 'Sat', '일': 'Sun'
  };
  return dayMap[day] || null;
}

function isComplete(data: any): boolean {
  // user_age는 숫자이고 0보다 커야 함
  const hasValidAge = !!(
    data.user_age !== undefined && 
    data.user_age !== null && 
    !isNaN(Number(data.user_age)) && 
    Number(data.user_age) > 0 &&
    Number(data.user_age) < 150
  );
  
  const hasRequiredFields = !!(
    data.program_id &&
    data.user_name &&
    hasValidAge &&
    data.user_job &&
    data.user_phone
  );
  
  // 가능한 시간 정보가 실제로 유효한지 확인 (빈 문자열이나 공백만 있으면 안 됨)
  const hasTimeInfo = !!(
    (data.selected_dates && Object.keys(data.selected_dates).length > 0) ||
    (data.available_time_text && 
     typeof data.available_time_text === 'string' && 
     data.available_time_text.trim().length > 0 &&
     data.available_time_text.trim() !== '미정' &&
     data.available_time_text.trim() !== '없음')
  );
  
  const isComplete = hasRequiredFields && hasTimeInfo;
  
  console.log("isComplete 체크:", {
    hasValidAge,
    hasRequiredFields,
    hasTimeInfo,
    isComplete,
    data: {
      program_id: data.program_id,
      user_name: data.user_name,
      user_age: data.user_age,
      user_age_type: typeof data.user_age,
      user_job: data.user_job,
      user_phone: data.user_phone,
      selected_dates: data.selected_dates,
      available_time_text: data.available_time_text
    }
  });
  
  return isComplete;
}