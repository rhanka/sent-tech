export type AnonymizationRule = {
  pattern: string;
  replacement: string;
};

const defaultRules: AnonymizationRule[] = [
  { pattern: '\\b([A-Z][a-z]+\\s[A-Z][a-z]+)\\b', replacement: 'Client stratégique' },
  { pattern: '\\bParis\\b', replacement: 'Métropole française' },
  { pattern: '\\b\\d{2,}k?€\\b', replacement: 'montant confidentiel' }
];

export const anonymizeText = (text: string, rules: AnonymizationRule[] = []): { text: string; substitutions: Array<{ from: string; to: string }> } => {
  const substitutions: Array<{ from: string; to: string }> = [];
  let output = text;
  [...defaultRules, ...rules].forEach((rule) => {
    const regex = new RegExp(rule.pattern, 'gi');
    output = output.replace(regex, (match) => {
      substitutions.push({ from: match, to: rule.replacement });
      return rule.replacement;
    });
  });
  return { text: output, substitutions };
};
