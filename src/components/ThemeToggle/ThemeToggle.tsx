import { CloudSun, MoonStar } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

interface ThemeToggleProps {
  // 'sticky': acompanha o Header fixo — texto/ícone sempre claros (o fundo
  // ali é a foto do Hero ou o glass preto do header rolado, nunca uma cor
  // sólida do tema), em vez de adaptativo.
  sticky?: boolean
}

// Duas "corcovas" de onda desenhadas uma vez (0-100 do viewBox) e repetidas
// (100-200) — a cópia deixa o desenho deslizar -50% da própria largura em
// loop sem dar pra perceber o corte (ver @keyframes theme-toggle-wave-drift
// no index.css), já que o que sai por um lado é idêntico ao que já estava
// entrando pelo outro.
const WAVE_PATH =
  'M0,20 C25,4 25,36 50,20 C75,4 75,36 100,20 C125,4 125,36 150,20 C175,4 175,36 200,20 L200,40 L0,40 Z'

function ThemeToggle({ sticky = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      className={`group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border transition-colors ${
        sticky
          ? 'border-white/30 hover:bg-white/10'
          : 'border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800'
      }`}
    >
      {/* Preenchimento "líquido": sobe do fundo ao hover/foco até cobrir o
          botão inteiro, como água enchendo um copo até a borda — a curva com
          leve "estouro" (cubic-bezier > 1) dá o efeito de balançar ao
          assentar, tanto subindo quanto descendo. A onda fica um pouco acima
          do corpo branco (-top negativo): enquanto sobe, ela é a borda
          molhada que ainda está "chegando"; quando termina de subir, ela
          passa do limite do botão e o overflow-hidden corta — sobra só o
          branco liso, cheio até a borda, sem a marca da onda no resultado
          final. translate-y-[120%] (não -full/100%) de propósito: 100%
          desloca só a altura do próprio wrapper, mas a onda mora 12% ACIMA
          dele (-top-[12%]) — deslocado só 100%, um fiapo da onda (a parte
          que sobra depois do 12% de folga) ainda caía dentro da área visível
          do botão, mesmo "escondido". 120% garante que a onda inteira,
          protrusão incluída, saia da área visível. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
      >
        <span className="absolute inset-0 bg-white/85" />
        <svg
          viewBox="0 0 200 40"
          preserveAspectRatio="none"
          className="theme-toggle-wave absolute inset-x-0 -top-[12%] h-[22%] w-[200%] text-white/85"
        >
          <path d={WAVE_PATH} fill="currentColor" />
        </svg>
      </span>

      {/* Ícone: contorno branco simples em repouso (fill-none — só o traço).
          No hover/foco, junto com o líquido subindo, ganha preenchimento
          sólido colorido (fill-current segue a mesma cor do texto) — a
          "revelação" do ícone acontece junto com a do líquido, não antes. */}
      {isDark ? (
        <CloudSun className="relative z-10 h-4 w-4 fill-none text-white transition-colors duration-300 group-hover:fill-current group-hover:text-yellow-400 group-focus-visible:fill-current group-focus-visible:text-yellow-400" />
      ) : (
        <MoonStar className="relative z-10 h-4 w-4 fill-none text-white transition-colors duration-300 group-hover:fill-current group-hover:text-black group-focus-visible:fill-current group-focus-visible:text-black" />
      )}
    </button>
  )
}

export default ThemeToggle
