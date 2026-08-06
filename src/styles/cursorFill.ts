// Fundo em pílula que "acende" atrás de links/botões de texto ao passar o mouse (efeito
// disparado via CSS :hover puro, não pelo Cursor.tsx — evita conflitos de stacking context
// com ancestrais animados por framer-motion). O Cursor.tsx global se esconde nesses elementos
// e escreve as variáveis --cursor-origin-x/-y com o ponto exato onde o mouse entrou no link,
// então o preenchimento cresce a partir dali (mesmo lugar em que a bolinha estava) em vez de
// nascer do centro — dá a sensação de transição contínua entre a bolinha e o link.
//
// `isolate` no link cria um stacking context PRÓPRIO e contido: sem ele, um `::before` com
// z-index negativo é comparado contra o card animado por framer-motion inteiro (que também cria
// stacking context, via transform) em vez de só contra o texto do próprio link, e some atrás do
// card inteiro. Com `isolate`, o z-index negativo do ::before fica isolado dentro do link, então
// só afeta a ordem de pintura entre o preenchimento e o texto desse link específico.

const ORIGIN = "before:origin-[var(--cursor-origin-x,50%)_var(--cursor-origin-y,50%)]"

// Uso geral: acompanha o tema do site, invertido — claro → fundo preto/texto branco,
// escuro → fundo branco/texto preto. `hover:text-*` muda a cor do texto (e dos ícones
// lucide, que herdam via currentColor) junto com o preenchimento.
export const CURSOR_FILL_CLASSNAME =
  `relative isolate transition-colors before:absolute before:-inset-x-3 before:-inset-y-2 before:-z-10 before:scale-0 ${ORIGIN} before:rounded-full before:bg-neutral-900 before:shadow-md before:transition-transform before:duration-300 before:ease-out before:content-[''] dark:before:bg-white hover:text-white dark:hover:text-neutral-900 hover:before:scale-100`

// Uso dentro de seções que são sempre escuras independente do tema (ex: ContactSection) —
// o preenchimento fica sempre claro (equivalente a "inverter" um fundo que já é sempre
// escuro), já que o fundo ao redor nunca muda com o tema. Pensado para botões que já têm
// caixa/borda própria (rounded-xl): preenche a caixa em vez de crescer além dela. Combine
// com `hover:text-neutral-900` no próprio link para o texto ficar legível.
export const CURSOR_FILL_LIGHT_CLASSNAME =
  `relative isolate before:absolute before:inset-0 before:-z-10 before:scale-0 ${ORIGIN} before:rounded-xl before:bg-white before:transition-transform before:duration-300 before:ease-out before:content-[''] hover:before:scale-100`

// Mesma cor de preenchimento de CURSOR_FILL_CLASSNAME (acompanha o tema,
// invertido), mas contido dentro da própria caixa do elemento
// (before:inset-0 + overflow-hidden no próprio link) em vez de crescer além
// dela — para botões que já têm fundo/borda próprios (ex: uma pílula sólida
// de CTA), onde a versão que expande (-inset-x-3/-inset-y-2) passaria do
// contorno já existente. before:rounded-full de propósito: sem isso, o
// preenchimento é um retângulo reto só recortado pelo overflow-hidden do
// botão — no meio da animação (antes de cobrir tudo) isso aparece como um
// "wipe" quadrado saindo do ponto do mouse, não como uma mancha redonda
// crescendo. Pensado pra pílulas (rounded-full); se um dia precisar preencher
// uma caixa de cantos retos, vale criar uma variante com before:rounded-xl.
export const CURSOR_FILL_CONTAINED_CLASSNAME =
  `relative isolate overflow-hidden transition-colors before:absolute before:inset-0 before:-z-10 before:scale-0 ${ORIGIN} before:rounded-full before:bg-neutral-900 before:transition-transform before:duration-300 before:ease-out before:content-[''] dark:before:bg-white hover:text-white dark:hover:text-neutral-900 hover:before:scale-100`
