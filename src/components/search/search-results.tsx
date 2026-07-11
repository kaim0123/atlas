"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePagefindSearch } from "@/hooks/use-pagefind-search";
import { DocsPage, Hero, Eyebrow, Lead } from "@/components/docs/page";

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const { results, loading } = usePagefindSearch(query);

  return (
    <DocsPage>
      <Hero>
        <Eyebrow>検索</Eyebrow>
        <Lead>{query ? `「${query}」の検索結果` : "検索キーワードを入力してください"}</Lead>
      </Hero>

      {loading && <p className="text-sm text-muted-foreground">検索中...</p>}

      {!loading && query && results.length === 0 && (
        <p className="text-sm text-muted-foreground">一致するページが見つかりませんでした。</p>
      )}

      <ul className="my-8 flex flex-col gap-3.5">
        {results.map((result) => (
          <li key={result.url}>
            <Link
              href={result.url}
              className="block rounded-xl border border-border bg-card p-[18px] px-5 text-foreground no-underline transition-colors hover:border-primary"
            >
              <h3 className="mb-1.5 text-base font-semibold">
                {result.meta.title ?? result.url}
              </h3>
              <p
                className="m-0 text-[0.85rem] text-muted-foreground [&_mark]:bg-primary/20 [&_mark]:text-foreground"
                dangerouslySetInnerHTML={{ __html: result.excerpt }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </DocsPage>
  );
}
