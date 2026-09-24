/**
 * Writes UPNEXT.md: the next posts in the queue with their slides and
 * captions, so the week ahead can be reviewed on GitHub before it goes out.
 * To stop a post, set `hold: true` in its content/posts file (or delete it).
 */
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './posts.mjs';

export async function writeUpNext(count = 10) {
  const queue = JSON.parse(await readFile(path.join(ROOT, 'posts.json'), 'utf8'));
  const statePath = path.join(ROOT, 'published.json');
  const state = existsSync(statePath) ? JSON.parse(await readFile(statePath, 'utf8')) : {};
  const waiting = queue.filter((p) => state[p.id]?.status !== 'published');
  const next = waiting.filter((p) => !p.hold).slice(0, count);
  const held = waiting.filter((p) => p.hold);
  let md = `# Up next\n\nOne post a day, about 11:30am Pacific, in this order. ${queue.length - waiting.length} of ${queue.length} posted so far.\n\nTo stop a post, set \`hold: true\` in its file under \`content/posts\`, or delete the file.\n`;
  next.forEach((p, n) => {
    md += `\n## ${n + 1}. ${p.title}\n\n\`${p.id}\` · ${p.pillar}\n\n`;
    md += p.media.map((_, i) => `<img src="images/${p.id}/${i + 1}.jpg" width="180">`).join(' ') + '\n\n';
    md += p.caption.split('\n').map((l) => `> ${l}`).join('\n') + '\n';
  });
  if (!next.length) md += '\nThe queue is empty. The weekly job adds the next posts.\n';
  if (held.length) md += `\n## On hold\n\n${held.map((p) => `- ${p.title} (\`${p.id}\`)`).join('\n')}\n`;
  await writeFile(path.join(ROOT, 'UPNEXT.md'), md);
}

if (process.argv[1]?.endsWith('upnext.mjs')) await writeUpNext();
