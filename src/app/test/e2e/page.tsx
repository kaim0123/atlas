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
  Aside,
  RelatedNav,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "E2Eテスト",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>E2Eテスト ― ユーザーの動線を、ユーザーと同じ経路で確認する</h1>
        <Lead>
          <Link href="/test/unit">Unitテスト</Link>や<Link href="/test/integration">Integrationテスト</Link>がどれだけ充実していても、「ログインボタンの位置がずれてクリックできない」「画面遷移の途中で読み込みが終わらない」といった不具合は、実際にブラウザを操作しない限り見つかりません。<Term>E2E(End to End)テスト</Term>は、ユーザーが実際にたどる操作を、実際のブラウザ上で再現する層です。
        </Lead>
      </Hero>

      <Heading num="01">なぜテストピラミッドの頂点は薄くするのか</Heading>
      <p>E2Eテストは最も「本物」に近く信頼性の高いテストですが、その分コストも高くつきます。ブラウザの起動や画面遷移が挟まるため実行が遅く、ネットワークの遅延やアニメーションのタイミングに左右されて<Term>フレーキー(不安定)</Term>になりやすく、失敗したときの原因調査も「どこで止まったか」から追う必要があり時間がかかります。だからこそ、業務上重要な代表的な動線(会員登録からログイン、購入完了まで、など)に絞り込み、細かい分岐やエッジケースはUnit・Integrationに任せるのがテストピラミッドの考え方です。</p>

      <Heading num="02">ページオブジェクトパターン ― 画面の構造をテストコードから切り離す</Heading>
      <p>E2Eテストのコードに、CSSセレクタやボタンの文言を直接書き並べていくと、画面のちょっとしたリニューアルのたびに大量のテストが壊れてしまいます。<Term>ページオブジェクトパターン</Term>は、「この画面にはこういう要素があり、こう操作できる」という画面の構造を専用のクラス(ページオブジェクト)にまとめ、テストコード自体はそのページオブジェクトのメソッドを呼ぶだけにする設計です。</p>

      <Analogy label="💡 たとえるなら">
        ページオブジェクトパターンは「案内係」を挟むようなものです。お客(テストコード)は「ログインボタンを押して」と案内係(ページオブジェクト)に頼むだけで、実際にどのセレクタのどのボタンを押すかは案内係が知っています。ボタンの見た目や場所が変わっても、案内係の中身を直すだけで、お客側の指示の仕方は変わりません。
      </Analogy>

      <p>この構造にしておくと、画面のマークアップが変わった際の修正箇所がページオブジェクト1箇所に閉じ込められ、同じ画面を使う複数のテストコードを直さずに済みます。</p>

      <Heading num="03">テストデータ戦略 ― E2Eはどのデータで動かすか</Heading>
      <p>E2Eテストは実際のシステム全体(場合によってはDBや外部連携も含む)を通して動くため、どんなデータを使うかが結果を大きく左右します。代表的な戦略は次の2つです。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>テスト実行前にAPIでデータを作る</h4><p>画面操作でデータを用意すると時間がかかるため、テスト対象の画面操作の前段階(ログイン後の初期データなど)はAPIを直接叩いて素早く準備します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>テストごとに専用のアカウント・データを使う</h4><p>複数のテストが同じデータを共有すると、並列実行時にデータの奪い合いが起きます。テストごとに固有のユーザーやレコードを用意し、独立性を保ちます。</p></Card>
      </CardGrid>
      <p>いずれも<Link href="/test/integration">Integrationテスト</Link>のテストデータの扱いと考え方は同じで、「独立性」「再現可能な初期状態」「個人情報を使わない」という原則がここでも当てはまります。</p>

      <Heading num="04">モック・スパイ・スタブ ― E2Eでも使うテストダブル</Heading>
      <p><Link href="/test/unit">Unitテスト</Link>の章で扱った<Term>テストダブル</Term>(スタブ・モック・スパイ・フェイク)は、E2Eテストでも使われます。決済代行会社のような外部サービスは、E2Eであっても本番に課金してしまうため本物を呼ぶわけにいきません。こうした境界では、ブラウザから見て「本物と同じレスポンスを返すが、実際には課金しないモックサーバー」に差し替えます。E2Eでのテストダブルの使いどころを見極めるポイントは次の通りです。</p>

      <table>
        <thead>
          <tr><th>対象</th><th>本物を使うか</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">自社のフロントエンド・API</td><td>本物</td><td>これ自体がテスト対象のため</td></tr>
          <tr><td className="hl">自社のDB</td><td>本物(テスト用)</td><td>実際の保存・取得の挙動を確認するため</td></tr>
          <tr><td className="hl">外部の決済・課金API</td><td>モック</td><td>実際に課金・請求が発生してしまうため</td></tr>
          <tr><td className="hl">メール送信</td><td>モックまたはテスト用受信箱</td><td>実際のメール配信基盤を消費しないため</td></tr>
        </tbody>
      </table>

      <Aside label="判断の合言葉">
        「本物を使うことで初めて意味のある確認ができるか」「本物を使うと副作用(課金・外部送信・不可逆な変更)が発生するか」の2点で判断します。前者ならなるべく本物、後者ならモックに倒すのが基本方針です。
      </Aside>

      <Heading num="まとめ">E2Eテストで押さえたい観点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>代表的な動線に絞る</h4><p>実行が遅く不安定になりやすいため、業務上重要な経路だけをE2Eで厚くカバーします。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>画面構造をページオブジェクトに閉じ込める</h4><p>リニューアルのたびにテストコード全体が壊れる事態を防ぎます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>データの独立性を保つ</h4><p>APIでの事前準備とテストごとの専用データで、並列実行でも安定させます。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>副作用のある外部依存はモックする</h4><p>課金や外部送信が絡む境界だけ、意図的に本物を避けます。</p></Card>
      </CardGrid>

      <RelatedNav>
        <RelatedList>
          <RelatedLink href="/test/integration" tag="テスト">Integrationテスト</RelatedLink>
          <RelatedLink href="/test/quality-plan" tag="テスト">品質計画</RelatedLink>
          <RelatedLink href="/test/strategy" tag="テスト">テストの段階</RelatedLink>
        </RelatedList>
      </RelatedNav>

      <DocsFooter>Atlas &middot; テスト &middot; E2Eテスト</DocsFooter>
    </DocsPage>
  );
}
