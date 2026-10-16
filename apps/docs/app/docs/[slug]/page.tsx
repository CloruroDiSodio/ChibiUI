import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CodeBlock } from '@/components/code-block';
import { playgrounds } from '@/components/playgrounds';
import { PageHeader, Section } from '@/components/prose';
import { PropTable } from '@/components/prop-table';
import { components, getComponent } from '@/lib/registry';
import { usageSnippets } from '@/lib/snippets';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Only the known component pages exist; anything else is a static 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return components.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const doc = getComponent((await params).slug);
  return doc ? { title: doc.name, description: doc.summary } : {};
}

export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getComponent(slug);
  const Playground = playgrounds[slug];
  if (!doc || !Playground) notFound();

  const importCode = `import {\n${doc.exports.map((e) => `  ${e},`).join('\n')}\n} from '${doc.importPath}';`;

  return (
    <article>
      <PageHeader
        eyebrow={doc.primitive ? `Built on ${doc.primitive}` : 'Component'}
        title={doc.name}
      >
        {doc.summary}
      </PageHeader>

      <Section id="playground" title="Playground">
        <Playground />
      </Section>

      <Section id="import" title="Import">
        <CodeBlock code={importCode} />
      </Section>

      {usageSnippets[slug]?.length ? (
        <Section id="examples" title="Examples">
          {usageSnippets[slug].map((snippet) => (
            <CodeBlock key={snippet.title} title={snippet.title} code={snippet.code} />
          ))}
        </Section>
      ) : null}

      <Section id="accessibility" title="Accessibility">
        <ul className="m-0 flex flex-col gap-2 pl-5">
          {doc.a11y.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </Section>

      <Section id="api" title="API reference">
        {doc.props.map((group) => (
          <PropTable key={group.component} component={group.component} rows={group.rows} />
        ))}
      </Section>
    </article>
  );
}
