import { Suspense } from "react";
import { SearchResults } from "@/components/search/search-results";
import { DocsPage, Hero, Eyebrow, Lead } from "@/components/docs/page";

function SearchFallback() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>検索</Eyebrow>
        <Lead>検索キーワードを入力してください</Lead>
      </Hero>
    </DocsPage>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchResults />
    </Suspense>
  );
}
