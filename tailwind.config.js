/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}"
	],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: '1rem',
				'2xl': '1.5rem'
			},
			fontFamily: {
				sans: ['Pretendard', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
			backgroundImage: {
				'koi-gradient': 'linear-gradient(90deg, #A8C5F8 0%, #F3C3E6 50%, #FFE6C5 100%)',
				'koi-gradient-vertical': 'linear-gradient(180deg, #A8C5F8 0%, #F3C3E6 50%, #FFE6C5 100%)',
				'koi-gradient-diagonal': 'linear-gradient(135deg, #A8C5F8 0%, #F3C3E6 50%, #FFE6C5 100%)',
				'koi-gradient-warm': 'linear-gradient(90deg, #A8C5F8 0%, #F3C3E6 50%, #FFE6C5 100%)',
				'koi-soft': 'linear-gradient(135deg, #E8F4FB 0%, #FFF0F5 100%)',
				'koi-soft-horizontal': 'linear-gradient(90deg, #E8F4FB 0%, #FFF0F5 100%)',
				'koi-warm': 'linear-gradient(135deg, #FFF0F5 0%, #FFE6C5 30%, #F3C3E6 100%)',
				'koi-sky':	 'linear-gradient(135deg, #A8C5F8 0%, #E8F4FB 100%)',
				'koi-pink': 'linear-gradient(135deg, #F3C3E6 0%, #FFF0F5 100%)',
				// Hero, Card, Footer 배경 (더 밝고 부드러운 톤)
				'koi-hero': 'linear-gradient(90deg, #A8C5F8, #F3C3E6, #FFE6C5)',
				'koi-card': 'linear-gradient(180deg, #FFFFFF, #FFF7F5)',
				'koi-footer': 'linear-gradient(90deg, #FFF0F5, #FDF6F0)',
				// 프로그램별 그라데이션
				'koi-essay': 'linear-gradient(135deg, #E8D5FF 0%, #F0E8FF 50%, #F5EDFF 100%)',
				'koi-love': 'linear-gradient(135deg, #FFE5E5 0%, #FFE6C5 50%, #FFF0F5 100%)',
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: '#2D6A9F',
					light: '#E8F4FB',
					dark: '#1E3A8A',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					yellow: '#F5A623',
					pink: '#FADADD',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				// KOI 브랜드 컬러 시스템 (더 밝고 부드러운 톤)
				koi: {
					background: '#FDF6F0',
					text: '#3B2F2F',
					blue: '#A8C5F8',
					lavender: '#F3C3E6',
					peach: '#FFE6C5',
					border: '#FADADD',
					accent: '#FADADD',
					primary: '#2D6A9F',
					'primary-light': '#E8F4FB',
					'primary-dark': '#1E3A8A',
					pastel: '#E8F4FB',
					// 그라데이션 컬러
					gradient: {
						start: '#A8C5F8',
						middle: '#F3C3E6',
						end: '#FFE6C5',
						warm: '#FFE6C5',
					},
					soft: {
						light: '#FFF0F5',
						blue: '#E8F4FB',
					},
					// 프로그램별 컬러
					essay: {
						DEFAULT: '#E8D5FF',
						light: '#F0E8FF',
						lighter: '#F5EDFF',
						text: '#6B46C1',
					},
					love: {
						DEFAULT: '#FFE6C5',
						light: '#FFE5E5',
						lighter: '#FFF0F5',
						text: '#C2410C',
					},
				},
				gray: {
					light: '#FAFBFC',
					DEFAULT: '#D1D5DB',
					dark: '#374151',
				},
				text: {
					DEFAULT: '#333333',
					soft: '#555555',
					muted: '#888888',
				},
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
	safelist: [
		// Dynamic gradient colors
		'from-green-400', 'to-teal-400',
		'from-green-500', 'to-teal-500',
		'from-blue-400', 'to-purple-400',
		'from-blue-500', 'to-purple-500',
		'from-pink-400', 'to-purple-400',
		'from-pink-500', 'to-purple-500',
		'from-pink-400', 'to-red-400',
		'from-pink-500', 'to-red-500',
		// Add more gradient combinations as needed
		{
			pattern: /(from|to)-(green|teal|blue|purple|pink|red)-(400|500|600)/,
		}
	]
}

