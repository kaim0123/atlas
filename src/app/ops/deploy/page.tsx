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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "インフラとデプロイ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>運用</Eyebrow>
        <h1>インフラとデプロイ ― どこで動かし、どう届けるか</h1>
        <Lead>
          コードを書いただけではユーザーには届きません。<Term>どこで動かすか</Term>(インフラ)と<Term>どうやって最新のコードを本番に反映させるか</Term>(デプロイ)は別の問いで、どちらも公開前に決めておく必要があります。
        </Lead>
      </Hero>

      <Heading num="01">どこで動かすか ― ホスティングの選択肢</Heading>
      <p>個人・小規模サイトのホスティングは、大きく「フルマネージドなPaaS」と「クラウドの部品を自分で組む」の2方向に分かれます。Atlas自身は<Term>静的Export</Term>(`next build`で生成したHTML一式をそのまま配信)なので、どちらの方式でも動かせます。</p>

      <table>
        <thead>
          <tr><th>方式</th><th>代表例</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">PaaS(フルマネージド)</td><td>Vercel、Netlify、<Link href="/cloud/cloudflare">Cloudflare Pages</Link></td><td>GitリポジトリをつなぐだけでビルドとCDN配信を代行。Next.jsのISR/Server Actionsなど動的機能もフルサポート</td></tr>
          <tr><td className="hl">クラウドの部品を自分で組む</td><td>S3 + CloudFront、EC2、ECS</td><td>静的ファイルをオブジェクトストレージに置き、CDNを前段に構える。<Link href="/cloud/aws/network">構成の自由度が高い代わりに自分で組む手間が増える</Link></td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        PaaSは「家具付きの賃貸マンション」、クラウドの部品を自分で組む方式は「土地を買って自分で家を建てる」ことに似ています。前者はすぐ住めますが間取りの自由度は低く、後者は自由に設計できる代わりに水道・電気の引き込みまで自分で手配する必要があります。個人サイトなら前者、細かい制御やコスト最適化が必要な規模になったら後者、という判断が一般的です。
      </Analogy>

      <Heading num="02">DNS・SSL/TLS・CDN ― ドメインからページが届くまで</Heading>
      <p>ユーザーがドメイン名を入力してからページが表示されるまでには、<Term>DNS</Term>(ドメイン名をIPアドレスに変換)・<Term>SSL/TLS</Term>(通信の暗号化)・<Term>CDN</Term>(地理的に近い拠点からコンテンツを配信)という3つの仕組みが働いています。この一連の流れの詳細は<Link href="/internet/web">Webの仕組み</Link>で、AWSでの実装(Route 53・ACM・CloudFront)は<Link href="/cloud/aws/network">ネットワーキングとコンテンツ配信</Link>で扱っています。PaaSを使う場合、この3つは基本的に自動で用意されるため、個人サイトで意識するのはカスタムドメインの接続程度です。</p>

      <Heading num="03">Git運用とデプロイフロー</Heading>
      <p>デプロイの起点は基本的に<Term>Gitへのpush</Term>です。個人開発でも、`main`ブランチ = 本番反映という状態を保つために、最低限のルールを決めておくと事故が減ります。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ブランチ戦略</h4>
          <p>`main`は常にデプロイ可能な状態に保ち、作業は`feature/*`ブランチで行ってからPRでマージする。個人開発でも「動く状態のmain」を維持する習慣が事故を防ぐ。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>プレビュー環境</h4>
          <p>PRごとに一時的なプレビューURLを発行できるサービス(Vercel等)を使うと、本番に反映する前に見た目・動作を確認できる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ロールバック</h4>
          <p>デプロイ後に不具合が見つかった場合、直前の正常なビルドに即座に切り戻せる仕組み(1クリックロールバック、Gitのrevert)を用意しておく。</p>
        </Card>
      </CardGrid>

      <Heading num="04">CI/CDとGitHub Actions</Heading>
      <p><Term>CI(継続的インテグレーション)</Term>はpushのたびにビルド・テストを自動実行して問題を早期発見する仕組み、<Term>CD(継続的デリバリー/デプロイ)</Term>はテストを通過したコードを自動で本番に反映する仕組みです。<Term>GitHub Actions</Term>は最も普及しているCI/CDツールの1つで、リポジトリに`.github/workflows/*.yml`を置くだけで「pushされたらテストを実行し、mainへのマージなら本番デプロイする」という一連の流れを自動化できます。AWS環境で同じ役割を担うCodeBuild・CodePipelineの詳細は<Link href="/cloud/aws/cicd">AWSのCI/CD</Link>ページを参照してください。</p>

      <Analogy label="💡 たとえるなら">
        CI/CDのないデプロイは「手作業で毎回ゼロから料理を作る」ようなものです。CI/CDは「レシピ通りに材料を切り、決まった手順で焼き、決まった皿に盛る」工程を自動化した調理ロボットで、人が介在しないぶん手順のブレがなく、失敗にもすぐ気づけます。
      </Analogy>

      <Heading num="まとめ">3つの決定を先に済ませる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ホスティング方式を選ぶ</h4><p>PaaSで簡単に始めるか、クラウドの部品を組んで自由度を取るか。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ドメイン周りを整える</h4><p>DNS・SSL・CDNは多くの場合自動化されているが、仕組みを理解しておく。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>デプロイを自動化する</h4><p>Gitのブランチ戦略とCI/CDで、pushからデプロイまでを再現性のある流れにする。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/network" tag="AWS">ネットワーキングとコンテンツ配信</RelatedLink>
                    <RelatedLink href="/cloud/aws/cicd" tag="AWS">CI/CD</RelatedLink>
                    <RelatedLink href="/sdlc/deployment" tag="開発工程・管理">導入と受入れ</RelatedLink>
                    <RelatedLink href="/sdlc/management/config" tag="開発工程・管理">構成管理</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
