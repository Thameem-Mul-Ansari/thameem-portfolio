import { getIconData, iconToSVG, iconToHTML, replaceIDs } from '@iconify/utils';
import { icons as logos } from '@iconify-json/logos';
import { icons as simpleIcons } from '@iconify-json/simple-icons';

const sets: Record<string, any> = { logos, 'simple-icons': simpleIcons };

/** Returns inline SVG markup for the first icon name that exists, or null. Runs at build time only. */
export function resolveIcon(names: string[] = []): { svg: string; mono: boolean } | null {
  for (const full of names) {
    const [prefix, name] = full.split(':');
    const set = sets[prefix];
    if (!set || !name) continue;
    const data = getIconData(set, name);
    if (!data) continue;
    const rendered = iconToSVG(data, { height: '100%' });
    const svg = iconToHTML(replaceIDs(rendered.body), { ...rendered.attributes, 'aria-hidden': 'true', focusable: 'false' });
    return { svg, mono: prefix === 'simple-icons' };
  }
  return null;
}
