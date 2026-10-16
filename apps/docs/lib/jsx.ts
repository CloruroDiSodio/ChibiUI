/** Serialises props into a JSX snippet for the live playgrounds. */
/** A raw JSX expression, e.g. `expr('<HeartIcon />')` → `leftIcon={<HeartIcon />}`. */
export interface Expr {
  expr: string;
}
export const expr = (source: string): Expr => ({ expr: source });

export type PropValue = string | number | boolean | Expr | null | undefined;

function formatProp(name: string, value: PropValue): string | null {
  if (value === undefined || value === null || value === false || value === '') return null;
  if (value === true) return name;
  if (typeof value === 'object') return `${name}={${value.expr}}`;
  if (typeof value === 'number') return `${name}={${value}}`;
  // Fall back to a JS string literal when the value contains characters unsafe in JSX attributes.
  return /["{}<>\n]/.test(value) ? `${name}={${JSON.stringify(value)}}` : `${name}="${value}"`;
}

export function jsx(
  tag: string,
  props: Record<string, PropValue>,
  children?: string,
  indent = '',
): string {
  const attrs = Object.entries(props)
    .map(([name, value]) => formatProp(name, value))
    .filter((attr): attr is string => attr !== null);

  const oneLine = `<${tag}${attrs.map((a) => ` ${a}`).join('')}`;
  const open =
    oneLine.length + indent.length > 72
      ? `<${tag}\n${attrs.map((a) => `${indent}  ${a}`).join('\n')}\n${indent}`
      : oneLine;

  if (!children) return `${open}${open === oneLine ? ' ' : ''}/>`;
  return `${open}>\n${children
    .split('\n')
    .map((line) => `${indent}  ${line}`)
    .join('\n')}\n${indent}</${tag}>`;
}

/** Escapes text so it renders literally as JSX children. */
export const jsxText = (text: string) => text.replace(/[{}<>]/g, (char) => `{'${char}'}`);
