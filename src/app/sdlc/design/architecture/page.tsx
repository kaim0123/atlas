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
  title: "システム構成とアーキテクチャ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発技術</Eyebrow>
        <h1>システム構成とアーキテクチャ ― 全体をどう組み立てるか</h1>
        <Lead>
          個々のモジュールの内側だけでなく、システム全体を「どんな部品を、どう配置してつなぐか」という大きな視点でも設計します。ここでは<Term>クライアントサーバ</Term>や<Term>マイクロサービス</Term>といった代表的なシステム構成と、<Term>MVCモデル</Term>などのアーキテクチャパターンの名前と用途を、地図として概観します。
        </Lead>
      </Hero>

      <Heading num="01">代表的なシステム構成</Heading>
      <p>処理をどの装置に分担させるかで、いくつかの典型的な形があります。まずは名前と特徴の対応を押さえます。</p>

      <table>
        <thead>
          <tr><th>構成</th><th>考え方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">クライアントサーバシステム</td><td>要求する側（クライアント）と提供する側（サーバ）に役割を分ける</td></tr>
          <tr><td className="hl">分散処理</td><td>複数のコンピュータに処理を分担させ、負荷や故障に強くする</td></tr>
          <tr><td className="hl">マイクロサービス</td><td>機能ごとに小さな独立したサービスへ分け、個別に開発・配置する</td></tr>
          <tr><td className="hl">SaaS</td><td>ソフトウェアを自前で持たず、ネットワーク越しのサービスとして利用する</td></tr>
        </tbody>
      </table>

      <p>これらを支える共通基盤が<Term>ミドルウェア</Term>（OSとアプリの間を仲立ちするソフトウェア）です。また、センサや機器をネットワークにつなぐ<Term>IoT</Term>も、こうした分散した構成の一形態として位置づけられます。</p>

      <Heading num="02">止まらないための設計 ― フォールトトレラント</Heading>
      <p>一部が故障してもシステム全体を動かし続ける設計思想を<Term>フォールトトレラント設計</Term>といいます。装置を二重化しておく（冗長化）など、故障の発生を前提に「壊れても耐える」構成を作ります。信頼性を高める具体的な方式は<Link href="/computer/system/architecture">処理形態とシステム構成</Link>や<Link href="/computer/system/reliability">信頼性と冗長化</Link>で扱います。</p>

      <Analogy label="💡 たとえるなら">
        フォールトトレラント設計は「エンジンが2つある飛行機」に似ています。片方が止まってもすぐに墜落しないよう、あらかじめ予備を組み込んでおく。「壊れないこと」ではなく「壊れても飛び続けられること」を目指す発想です。
      </Analogy>

      <Heading num="03">アーキテクチャパターンとMVC</Heading>
      <p>よく使われるシステム全体の構造には定石があり、これを<Term>アーキテクチャパターン</Term>と呼びます。代表例が<Term>MVCモデル</Term>で、システムを Model（データ・業務ロジック）・View（表示）・Controller（入力の受け付けと橋渡し）の3つの役割に分けます。表示とロジックを切り離すことで、片方の変更が他方に波及しにくくなります。</p>

      <p>さらに小さな設計単位で繰り返し現れる解法をまとめたものが<Term>デザインパターン</Term>です。本ページでは名前と用途の紹介にとどめ、各パターンの具体的な構造やコード例は<Link href="/design/architecture">アーキテクチャ一覧</Link>や<Link href="/design/patterns">設計パターン</Link>で扱います。</p>

      <Heading num="まとめ">システム構成で押さえたいこと</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>役割で分ける構成</h4><p>クライアントサーバ・分散処理・マイクロサービス・SaaSは、処理の分担のさせ方の違いです。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>壊れても耐える</h4><p>フォールトトレラント設計は、故障を前提に冗長化して動き続けさせる考え方です。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>構造の定石</h4><p>MVCなどのアーキテクチャパターンとデザインパターンは、繰り返し使える構造の型です。</p></Card>
      </CardGrid>

      <RelatedNav>
        <RelatedList>
          <RelatedLink href="/sdlc/design/basics" tag="開発技術">設計の全体像</RelatedLink>
          <RelatedLink href="/design/architecture" tag="設計">アーキテクチャ一覧</RelatedLink>
          <RelatedLink href="/computer/system/architecture" tag="コンピュータ">処理形態とシステム構成</RelatedLink>
        </RelatedList>
      </RelatedNav>

      <DocsFooter>Atlas &middot; 開発技術 &middot; システム構成とアーキテクチャ</DocsFooter>
    </DocsPage>
  );
}
