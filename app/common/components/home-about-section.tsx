/**
 * 코이창작소 메인페이지 About 섹션
 * 코이창작소의 철학과 정체성을 소개하는 공간
 */
export function HomeAboutSection() {
  return (
    <section className="py-24 px-6 bg-[#FFF7F5] text-center">
      <h2 className="text-4xl font-extrabold tracking-tight text-[#3B2F2F] mb-6" style={{ lineHeight: '1.6' }}>
        이야기로 연결되는 창작의 시작
      </h2>
      <p className="max-w-2xl mx-auto text-lg leading-relaxed text-[#3B2F2F]/85" style={{ lineHeight: '1.6' }}>
        코이창작소는 청년들이 자신의 이야기를 발견하고,  
        그것을 함께 나누며 성장하는 <span className="font-semibold text-[#A47772]">따뜻한 공간</span>입니다.  
        우리는 마음이 닿는 소통을 통해, 각자의 결이 모여 하나의 창작이 되는 순간을 만들어갑니다.
      </p>
    </section>
  );
}

