import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DocsFooter,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  RelatedNav,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "テストの段階",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発技術</Eyebrow>
        <h1>テストの段階 ― 範囲を広げながら検証する</h1>
        <Lead>
          テストは一度にまとめて行うのではなく、<Term>単体 → 結合 → システム → 受入れ</Term>と、検証する範囲を少しずつ広げながら進めます。小さな部品の確認から始めて、最後にシステム全体・利用者の視点へと積み上げていく ― この段階の順序と各段階の狙いを押さえます。
        </Lead>
      </Hero>

      <Heading num="01">テストの段階</Heading>
      <p>各段階は「何を検証するか」の粒度で分かれます。下流に行くほど検証範囲が広がり、視点も開発者から利用者へ移っていきます。</p>

      <table>
        <thead>
          <tr><th>段階</th><th>検証範囲</th><th>ポイント</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">単体テスト</td><td>個々のモジュール・関数</td><td>周辺を<Term>ドライバ</Term>（呼び出し役）や<Term>スタブ</Term>（呼ばれる役の代用）で模擬する</td></tr>
          <tr><td className="hl">結合テスト</td><td>モジュール間の連携</td><td>上位から繋ぐ<Term>トップダウン</Term>、下位から繋ぐ<Term>ボトムアップ</Term>など</td></tr>
          <tr><td className="hl">システムテスト</td><td>システム全体</td><td>機能・非機能（性能・セキュリティ）要件を全体で検証</td></tr>
          <tr><td className="hl">受入れテスト</td><td>利用者の視点</td><td>発注者・利用者が「納品してよいか」を判断する</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        テストの段階は「車の検査」に似ています。まず部品単体を調べ（単体）、組み付けた機構の連動を見て（結合）、完成車として走行試験し（システム）、最後に購入者が試乗して納得するか確認する（受入れ）。範囲を広げながら、別々の欠陥を捕まえていきます。
      </Analogy>

      <Heading num="02">スタブとドライバ ― 足りない部品を補う</Heading>
      <p>単体・結合テストでは、テスト対象の周りにまだ完成していない部品があります。これを補うのが<Term>スタブ</Term>と<Term>ドライバ</Term>です。テスト対象を呼び出す上位モジュールの代役が<strong>ドライバ</strong>、テスト対象が呼び出す下位モジュールの代役が<strong>スタブ</strong>。トップダウン結合では下位をスタブで、ボトムアップ結合では上位をドライバで補います。</p>

      <Heading num="03">回帰テスト ― 直したはずが壊していないか</Heading>
      <p>変更や修正を加えたあと、既存の機能が壊れていないかを再度確認するのが<Term>回帰テスト</Term>（リグレッションテスト）です。保守や機能追加のたびに繰り返すため、自動化の効果が大きい領域でもあります。</p>

      <p>ここまでは「どの範囲を検証するか」という段階の話でした。「どんなケースを作れば効率よく欠陥を見つけられるか」という技法は、<Link href="/sdlc/testing/techniques">テスト技法</Link>で扱います。また、Vitest や Playwright を使った実務的な Unit/Integration/E2E の書き方は<Link href="/test">テスト</Link>セクションが担当します。</p>

      <Heading num="まとめ">テストの段階で押さえたいこと</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>範囲を広げて積み上げる</h4><p>単体 → 結合 → システム → 受入れの順に、検証範囲と視点が広がります。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>スタブとドライバ</h4><p>未完成の部品を代役で補い、テスト対象だけを先に検証できるようにします。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>回帰テストで守る</h4><p>変更のたびに、既存機能が壊れていないかを再確認します。</p></Card>
      </CardGrid>

      <RelatedNav>
        <RelatedList>
          <RelatedLink href="/sdlc/testing/techniques" tag="開発技術">テスト技法</RelatedLink>
          <RelatedLink href="/test/unit" tag="テスト">Unitテスト</RelatedLink>
          <RelatedLink href="/test/strategy" tag="テスト">品質戦略とテストピラミッド</RelatedLink>
        </RelatedList>
      </RelatedNav>

      <DocsFooter>Atlas &middot; 開発技術 &middot; テストの段階</DocsFooter>
    </DocsPage>
  );
}
