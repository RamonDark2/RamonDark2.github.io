// Fundo em pílula que "acende" atrás de links/botões de texto ao passar o mouse (efeito
// disparado via CSS :hover puro, não pelo Cursor.tsx — evita conflitos de stacking context
// com ancestrais animados por framer-motion). O Cursor.tsx global se esconde nesses elementos
// (ver Cursor.tsx) para os dois efeitos não aparecerem sobrepostos.
//
// `isolate` no link cria um stacking context PRÓPRIO e contido: sem ele, um `::before` com
// z-index negativo é comparado contra o card animado por framer-motion inteiro (que também cria
// stacking context, via transform) em vez de só contra o texto do próprio link, e some atrás do
// card inteiro. Com `isolate`, o z-index negativo do ::before fica isolado dentro do link, então
// só afeta a ordem de pintura entre o preenchimento e o texto desse link específico.

// Uso geral: acompanha o tema do site (claro → fundo branco/texto escuro, escuro → o oposto).
// Borda + sombra dão definição ao preenchimento mesmo sobre fundos claros/escuros parecidos.
export const CURSOR_FILL_CLASSNAME =
  "relative isolate before:absolute before:-inset-x-3 before:-inset-y-2 before:-z-10 before:scale-0 before:rounded-full before:border before:border-neutral-200 before:bg-white before:shadow-md before:transition-transform before:duration-300 before:ease-out before:content-[''] dark:before:border-neutral-800 dark:before:bg-neutral-900 hover:before:scale-100"

// Uso dentro de seções que são sempre escuras independente do tema (ex: ContactSection) —
// o preenchimento fica sempre claro, já que o fundo ao redor nunca muda com o tema. Pensado
// para botões que já têm caixa/borda própria (rounded-xl): preenche a caixa em vez de crescer
// além dela. Combine com `hover:text-neutral-900` no próprio link para o texto ficar legível.
export const CURSOR_FILL_LIGHT_CLASSNAME =
  "relative isolate before:absolute before:inset-0 before:-z-10 before:scale-0 before:rounded-xl before:bg-white before:transition-transform before:duration-300 before:ease-out before:content-[''] hover:before:scale-100"
