import { Link } from "react-router";
import { cn } from "~/lib/utils";

interface FooterProps {
  className?: string;
}

/**
 * KOI Creative Lab Footer 컴포넌트
 * 따뜻하고 감성적인 톤앤매너를 표현합니다.
 */
export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "bg-koi-footer text-[#7B6E6E] py-12 px-6 text-center border-t border-[#FADADD]",
        className
      )}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 브랜드 정보 */}
          <div>
            <h3 className="text-xl font-bold text-[#3B2F2F] mb-4">KOI Creative Lab</h3>
            <p className="text-[#5A4A4A] leading-relaxed">
              따뜻한 창작, 연결된 청춘
              <br />
              청년들이 함께 성장하는 창작 플랫폼
            </p>
          </div>

          {/* 프로그램 */}
          <div>
            <h4 className="font-semibold text-[#3B2F2F] mb-4">프로그램</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/programs/essay"
                  className="text-[#5A4A4A] hover:text-[#3B2F2F] transition-colors"
                >
                  아무, 말
                </Link>
              </li>
              <li>
                <Link
                  to="/programs/love"
                  className="text-[#5A4A4A] hover:text-[#3B2F2F] transition-colors"
                >
                  연애의 발견
                </Link>
              </li>
              <li>
                <Link
                  to="/programs/photo"
                  className="text-[#5A4A4A] hover:text-[#3B2F2F] transition-colors"
                >
                  클릭무드
                </Link>
              </li>
            </ul>
          </div>

          {/* 문의 */}
          <div>
            <h4 className="font-semibold text-[#3B2F2F] mb-4">문의</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about/representative"
                  className="text-[#5A4A4A] hover:text-[#3B2F2F] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/reservation"
                  className="text-[#5A4A4A] hover:text-[#3B2F2F] transition-colors"
                >
                  예약하기
                </Link>
              </li>
              <li>
                <Link
                  to="/community/contact"
                  className="text-[#5A4A4A] hover:text-[#3B2F2F] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-[#FADADD] pt-8 text-center">
          <p className="text-[#7B6E6E] text-sm opacity-80">
            © {new Date().getFullYear()} KOI Creative Lab — 당신의 이야기가 세상을 따뜻하게 합니다.
          </p>
        </div>
      </div>
    </footer>
  );
}

