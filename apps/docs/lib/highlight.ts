/**
 * A tiny TSX tokenizer for docs snippets (~1 KB vs. tens of KB for a full highlighter).
 *
 * It returns plain tokens that are rendered as React text nodes, so snippets (including
 * user-typed playground values) are never injected as HTML.
 */
export type TokenType =
  'comment' | 'string' | 'keyword' | 'tag' | 'attr' | 'number' | 'punct' | 'plain';

export interface Token {
  type: TokenType;
  text: string;
}

const KEYWORDS = new Set([
  'import',
  'from',
  'export',
  'default',
  'const',
  'let',
  'function',
  'return',
  'type',
  'interface',
  'async',
  'await',
  'new',
  'true',
  'false',
  'null',
  'undefined',
  'if',
  'else',
]);

const RULES: readonly [TokenType, RegExp][] = [
  ['comment', /^(\/\/[^\n]*|\/\*[\s\S]*?\*\/|\{\/\*[\s\S]*?\*\/\})/],
  ['string', /^("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)/],
  ['tag', /^(<\/?)([A-Za-z][\w.]*)/],
  ['attr', /^[A-Za-z_][\w-]*(?==)/],
  ['number', /^\d+(?:\.\d+)?/],
  ['plain', /^[A-Za-z_$][\w$]*/],
  ['punct', /^[{}()[\]<>/=.,;:?!&|+\-*%@]+/],
  ['plain', /^\s+/],
];

export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let rest = source;
  while (rest.length > 0) {
    let matched = false;
    for (const [type, re] of RULES) {
      const match = re.exec(rest);
      if (!match) continue;
      matched = true;
      if (type === 'tag') {
        tokens.push({ type: 'punct', text: match[1] ?? '' }, { type: 'tag', text: match[2] ?? '' });
      } else if (type === 'plain' && KEYWORDS.has(match[0])) {
        tokens.push({ type: 'keyword', text: match[0] });
      } else {
        tokens.push({ type, text: match[0] });
      }
      rest = rest.slice(match[0].length);
      break;
    }
    if (!matched) {
      tokens.push({ type: 'plain', text: rest[0] ?? '' });
      rest = rest.slice(1);
    }
  }
  return tokens;
}
