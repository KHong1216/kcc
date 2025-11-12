# 🎨 KOI Creative Lab 톤앤매너 가이드

> 따뜻하고 감성적인 파스텔 기반 톤앤매너 시스템

---

## 📋 목차

1. [전체 톤앤매너](#전체-톤앤매너)
2. [컬러 시스템](#컬러-시스템)
3. [컴포넌트 스타일](#컴포넌트-스타일)
4. [프로그램별 색상](#프로그램별-색상)
5. [사용 예시](#사용-예시)

---

## 🌈 전체 톤앤매너

### 핵심 키워드

- **따뜻함**: 파스텔 기반의 부드러운 컬러
- **감성**: 여백과 그림자로 표현되는 감정선
- **창의성**: 프로그램별 색상 차별화
- **청춘**: 밝고 따뜻한 그라데이션

### 텍스트 컬러

전체 텍스트는 따뜻한 브라운 톤을 사용합니다:

- **기본 텍스트**: `text-[#3B2F2F]` 또는 `text-koi-text`
- **부드러운 텍스트**: `text-[#5A4A4A]` 또는 `text-koi-text-soft`
- **약한 텍스트**: `text-[#8B7D7D]` 또는 `text-koi-text-muted`

---

## 🎨 컬러 시스템

### 배경 그라데이션

#### Hero 섹션
```tsx
<section className="bg-koi-hero">
  {/* 콘텐츠 */}
</section>
```

#### 카드 배경
```tsx
<Card className="bg-koi-card">
  {/* 카드 내용 */}
</Card>
```

#### Footer 배경
```tsx
<Footer />
// 또는
<footer className="bg-koi-footer">
  {/* Footer 내용 */}
</footer>
```

### 버튼 그라데이션

```tsx
// 따뜻한 그라데이션 버튼
<Button variant="gradient">
  참여하기
</Button>

// 또는 직접 클래스 사용
<Button className="bg-[linear-gradient(90deg,#A1C4FD,#FBC2EB,#FFD1BA)] hover:opacity-90">
  참여하기
</Button>
```

---

## 🧩 컴포넌트 스타일

### Card (카드)

카드는 자동으로 따뜻한 톤이 적용됩니다:

```tsx
<Card>
  <CardHeader>
    <CardTitle>에세이 캠프</CardTitle>
    <CardDescription>매주 글로 연결되는 대화</CardDescription>
  </CardHeader>
  <CardContent>
    {/* 콘텐츠 */}
  </CardContent>
</Card>
```

**특징:**
- 배경: `bg-koi-card` (부드러운 화이트 그라데이션)
- 그림자: `shadow-[0_4px_24px_rgba(0,0,0,0.05)]`
- 호버: `hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]`
- 텍스트: `text-[#3B2F2F]`

### Button (버튼)

```tsx
// 그라데이션 버튼 (메인 CTA)
<Button variant="gradient">참여하기</Button>

// 기본 버튼
<Button variant="default">기본 버튼</Button>

// 아웃라인 버튼
<Button variant="outline">아웃라인</Button>
```

---

## 🎭 프로그램별 색상

### Essay (에세이 캠프) - 라벤더

```tsx
import { ProgramCard, ProgramBadge } from "~/common/components/program-theme";

<ProgramCard program="essay">
  <CardHeader>
    <ProgramBadge program="essay">#에세이</ProgramBadge>
    <CardTitle className="text-koi-essay-text">에세이 캠프</CardTitle>
  </CardHeader>
</ProgramCard>
```

**컬러:**
- 배경: `bg-koi-essay` (라벤더 그라데이션)
- 텍스트: `text-koi-essay-text` (#6B46C1)
- 배지: `bg-koi-essay-light`

### Love (연애 캠프) - 코랄

```tsx
<ProgramCard program="love">
  <CardHeader>
    <ProgramBadge program="love">#연애</ProgramBadge>
    <CardTitle className="text-koi-love-text">연애 캠프</CardTitle>
  </CardHeader>
</ProgramCard>
```

**컬러:**
- 배경: `bg-koi-love` (코랄 그라데이션)
- 텍스트: `text-koi-love-text` (#C2410C)
- 배지: `bg-koi-love-light`

### Photo (사진 프로젝트) - 기본

```tsx
<Card>
  <CardHeader>
    <Badge variant="accent">#사진</Badge>
    <CardTitle>사진 프로젝트</CardTitle>
  </CardHeader>
</Card>
```

---

## 📖 사용 예시

### Hero 섹션

```tsx
<section className="bg-koi-hero py-20 px-8">
  <div className="max-w-6xl mx-auto text-center">
    <h1 className="text-title-1 mb-6 text-[#3B2F2F]">
      따뜻한 창작, 연결된 청춘
    </h1>
    <p className="text-subtitle mb-8 text-[#5A4A4A]">
      KOI Creative Lab은 청년들이 함께 성장하는 창작 플랫폼입니다.
    </p>
    <Button variant="gradient" size="lg">
      프로그램 둘러보기
    </Button>
  </div>
</section>
```

### 프로그램 카드 그리드

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <ProgramCard program="essay">
    <CardHeader>
      <ProgramBadge program="essay" className="mb-2">#에세이</ProgramBadge>
      <CardTitle className="text-koi-essay-text">에세이 캠프</CardTitle>
      <CardDescription className="text-koi-essay-text/70">
        매주 글로 연결되는 대화
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-body text-koi-essay-text/80">
        나의 한해를 기록하고, 함께 성장하는 에세이 캠프입니다.
      </p>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full border-koi-essay text-koi-essay-text">
        자세히 보기
      </Button>
    </CardFooter>
  </ProgramCard>

  <ProgramCard program="love">
    <CardHeader>
      <ProgramBadge program="love" className="mb-2">#연애</ProgramBadge>
      <CardTitle className="text-koi-love-text">연애 캠프</CardTitle>
      <CardDescription className="text-koi-love-text/70">
        나의 연애를 알아보는 시간
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-body text-koi-love-text/80">
        연애 경향성을 탐구하고, 더 나은 관계를 만들어가는 캠프입니다.
      </p>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full border-koi-love text-koi-love-text">
        자세히 보기
      </Button>
    </CardFooter>
  </ProgramCard>
</div>
```

### Footer

```tsx
import { Footer } from "~/common/components/footer";

<Footer />
```

---

## 🎯 디자인 원칙

### 1. 여백 (Spacing)

충분한 여백으로 숨 쉴 수 있는 레이아웃:

```tsx
<Section background="light">
  <Container>
    {/* 충분한 여백이 있는 콘텐츠 */}
  </Container>
</Section>
```

### 2. 그림자 (Shadow)

부드러운 그림자로 깊이감 표현:

- 카드: `shadow-[0_4px_24px_rgba(0,0,0,0.05)]`
- 호버: `hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]`

### 3. 타이포그래피

따뜻한 브라운 톤의 텍스트:

```tsx
<h1 className="text-title-1 text-[#3B2F2F]">제목</h1>
<p className="text-body text-[#5A4A4A]">본문</p>
<span className="text-caption text-[#8B7D7D]">설명</span>
```

### 4. 그라데이션

자연스러운 파스텔 그라데이션:

- Hero: `bg-koi-hero`
- Card: `bg-koi-card`
- Footer: `bg-koi-footer`
- Button: `variant="gradient"`

---

## 💡 팁

1. **일관성 유지**: 모든 텍스트는 `#3B2F2F` 계열 사용
2. **프로그램별 차별화**: Essay는 라벤더, Love는 코랄 사용
3. **여백 활용**: 충분한 여백으로 감성적 분위기 연출
4. **그림자 조절**: 부드러운 그림자로 깊이감 표현

---

**마지막 업데이트**: 2024년

