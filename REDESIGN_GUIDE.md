# 🎨 KOI Creative Lab 전체 UI 리디자인 가이드

> 텍스트 로고 기반 사이트에 감성적 톤을 부여한 통합 리디자인

---

## 📋 목차

1. [전역 설정](#전역-설정)
2. [컬러 시스템](#컬러-시스템)
3. [컴포넌트 리디자인](#컴포넌트-리디자인)
4. [사용 예시](#사용-예시)

---

## 🌍 전역 설정

### 1. app.css - 전역 배경 및 폰트

```css
html,
body {
  @apply bg-[#FDF6F0] text-[#3B2F2F];
  font-family: 'Pretendard', 'Inter', sans-serif;
  background-image: linear-gradient(180deg, #FFF7F5 0%, #FDF6F0 100%);
  min-height: 100vh;
}
```

**효과:**
- 브라우저 전체 배경이 따뜻한 아이보리로 설정
- 모든 텍스트가 `#3B2F2F` 브라운 톤으로 통일
- 페이지 전체에 그라데이션 배경 적용

### 2. shadcn/ui CSS 변수 테마

```css
:root {
  --background: 25 45% 97%;
  --foreground: 0 0% 20%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 20%;
  --primary: 223 85% 85%;   /* 하늘톤 */
  --primary-foreground: 0 0% 98%;
  --secondary: 320 85% 85%; /* 핑크톤 */
  --secondary-foreground: 0 0% 15%;
  --accent: 35 95% 85%;     /* 피치톤 */
  --accent-foreground: 0 0% 20%;
  --ring: 223 85% 85%;
}
```

**효과:**
- Button, Dialog, Card 등 모든 shadcn 컴포넌트가 KOI 브랜드톤으로 변경
- Tailwind와 shadcn이 동일한 색상 변수 공유

---

## 🎨 컬러 시스템

### Tailwind Config 확장

```ts
colors: {
  koi: {
    background: '#FDF6F0',
    text: '#3B2F2F',
    blue: '#A1C4FD',
    pink: '#FBC2EB',
    peach: '#FFD1BA',
    accent: '#FADADD',
  },
},
backgroundImage: {
  'koi-hero': 'linear-gradient(90deg, #A1C4FD, #FBC2EB, #FFD1BA)',
  'koi-card': 'linear-gradient(180deg, #FFFFFF, #FFF7F5)',
  'koi-footer': 'linear-gradient(90deg, #FDF6F0, #FFF0F5)',
}
```

**사용법:**
- `bg-koi-hero`: Hero 섹션 배경
- `bg-koi-card`: 카드 배경
- `bg-koi-footer`: Footer 배경
- `text-koi-text`: 기본 텍스트 컬러

---

## 🧩 컴포넌트 리디자인

### 1. Navigation - 그라데이션 로고

```tsx
<Link to="/">
  <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#A1C4FD,#FBC2EB,#FFD1BA)]">
    KOI
  </span>
  <span className="text-[#7B6E6E] font-medium ml-1">Creative Lab</span>
</Link>
```

**효과:**
- 'KOI'는 생동감 있는 그라데이션
- 'Creative Lab'은 따뜻한 여운의 브라운 톤
- 로고가 UI 색상 체계와 감정적으로 연결

### 2. Hero Section

```tsx
<section className="bg-koi-hero py-20 text-center text-[#3B2F2F]">
  <h2 className="text-5xl font-extrabold tracking-tight mb-6">
    따뜻한 창작, 연결되는 이야기
  </h2>
  <p className="max-w-xl mx-auto text-lg text-[#4A3B3B] opacity-90">
    KOI Creative Lab은 청년들의 감정을 이야기로 바꾸는 실험실입니다.
  </p>
  <Button className="mt-8 bg-white text-[#3B2F2F] hover:bg-[#FFF7F5] border border-[#FBC2EB] shadow-sm rounded-xl px-8 py-3">
    지금 참여하기
  </Button>
</section>
```

**특징:**
- `bg-koi-hero`: 파스텔 그라데이션 배경
- 큰 타이틀과 부드러운 설명 텍스트
- 흰색 버튼에 핑크 테두리로 포인트

### 3. Card

```tsx
<Card className="bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all">
  <CardHeader>
    <CardTitle className="text-xl font-semibold text-[#3B2F2F]">Essay Camp</CardTitle>
    <CardDescription className="text-[#7A6666]">
      한 달 동안 감정을 글로 기록해요
    </CardDescription>
  </CardHeader>
  <CardContent>
    <Button className="bg-[linear-gradient(90deg,#A1C4FD,#FBC2EB)] text-white rounded-xl shadow-sm hover:opacity-90 px-4 py-2">
      참여하기
    </Button>
  </CardContent>
</Card>
```

**특징:**
- 부드러운 화이트 → 피치 그라데이션 배경
- 부드러운 그림자 (`shadow-[0_4px_24px_rgba(0,0,0,0.05)]`)
- 호버 시 그림자 강화

### 4. Footer

```tsx
<footer className="bg-koi-footer text-[#7B6E6E] py-12 text-center border-t border-[#FADADD]">
  <p>© 2025 KOI Creative Lab — 당신의 이야기가 세상을 따뜻하게 합니다.</p>
</footer>
```

**특징:**
- `bg-koi-footer`: 따뜻한 그라데이션 배경
- 핑크 테두리로 감성 강조
- 따뜻한 메시지 포함

---

## 📖 사용 예시

### 전체 페이지 구조

```tsx
import { Navigation } from "~/common/components/navigation";
import { HeroSectionNew } from "~/common/components/hero-section-new";
import { Footer } from "~/common/components/footer";
import { Card } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";

export default function HomePage() {
  return (
    <div>
      <Navigation />
      
      <HeroSectionNew />
      
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-title-2 mb-8 text-center">프로그램</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
              <CardHeader>
                <CardTitle className="text-[#3B2F2F]">Essay Camp</CardTitle>
                <CardDescription className="text-[#7A6666]">
                  한 달 동안 감정을 글로 기록해요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="bg-[linear-gradient(90deg,#A1C4FD,#FBC2EB)] text-white hover:opacity-90">
                  참여하기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
```

---

## ✅ 리디자인 체크리스트

### 전역 설정
- [x] `app.css`에 전역 배경 및 폰트 설정
- [x] shadcn/ui CSS 변수 테마 변경
- [x] Tailwind Config에 KOI 컬러 확장

### 컴포넌트
- [x] Navigation에 그라데이션 로고 적용
- [x] Hero 섹션 리디자인
- [x] Card 컴포넌트 스타일 업데이트
- [x] Footer 리디자인
- [x] Button 컴포넌트 그라데이션 variant 추가

### 일관성
- [x] 전체 텍스트 컬러 `#3B2F2F` 계열로 통일
- [x] 모든 배경이 따뜻한 파스텔 톤
- [x] 그림자와 여백으로 감정선 표현

---

## 🎯 주요 개선 사항

### Before (이전)
- ❌ 페이지 전체 배경이 흰색
- ❌ shadcn 컴포넌트가 회색 톤
- ❌ 로고가 단순 텍스트
- ❌ 컴포넌트별 색상 불일치

### After (리디자인 후)
- ✅ 페이지 전체가 따뜻한 아이보리 배경
- ✅ 모든 shadcn 컴포넌트가 KOI 브랜드톤
- ✅ 로고가 그라데이션으로 생동감 있게
- ✅ 전체 UI가 일관된 감성적 톤

---

## 💡 추가 팁

### 다크모드 대응

나중에 다크모드를 추가하려면:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: 0 0% 10%;
    --foreground: 0 0% 90%;
    /* ... */
  }
}
```

### 커스텀 그라데이션

필요에 따라 새로운 그라데이션 추가:

```ts
backgroundImage: {
  'koi-custom': 'linear-gradient(135deg, #A1C4FD, #FBC2EB)',
}
```

---

**마지막 업데이트**: 2024년

