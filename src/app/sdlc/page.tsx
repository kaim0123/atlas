import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DocsFooter,
  Analogy,
  IndexGrid,
  IndexCard,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "開発工程・管理",
};

const topics = [
  { href: "/sdlc/overview", title: "開発の全体像", desc: "要件定義から保守まで、システム開発が何段階で進むかの地図" },
  { href: "/sdlc/process", title: "開発プロセスと手法", desc: "ウォーターフォール・プロトタイピング・アジャイルなど、進め方のモデル" },
  { href: "/sdlc/process/agile", title: "スクラムとアジャイル実践", desc: "スクラムの役割・スプリント、XP・TDD・CI/CDの入口" },
  { href: "/sdlc/requirements", title: "要件定義", desc: "機能要件と非機能要件の区別、ステークホルダとの合意" },
  { href: "/sdlc/requirements/modeling", title: "要件の表現方法", desc: "ユースケース・DFD・ER図・UMLで要件を可視化する" },
  { href: "/design", title: "設計", desc: "構造化・データ中心・オブジェクト指向とアーキテクチャ。深掘りは「設計」セクションへ" },
  { href: "/dev/implementation", title: "実装", desc: "コーディング標準・命名規則・構造化プログラミング・部品化" },
  { href: "/test", title: "テスト", desc: "テストの段階と技法、品質の見える化。深掘りは「テスト」セクションへ" },
  { href: "/sdlc/review", title: "レビューと品質確認", desc: "インスペクション・ウォークスルー・工程別レビュー" },
  { href: "/sdlc/deployment", title: "導入と受入れ", desc: "リリースの流れ、受入れテストと検収" },
  { href: "/sdlc/maintenance", title: "保守", desc: "是正・適応・予防保守、リファクタリング・リバースエンジニアリング" },
  { href: "/sdlc/management/config", title: "構成管理", desc: "ソフトウェア構成管理・構成品目・バージョン管理・SBOM" },
  { href: "/sdlc/management/change", title: "変更管理", desc: "変更管理の目的と手順、一貫性の維持" },
  { href: "/sdlc/management/ip", title: "知的財産とライセンス", desc: "著作権・職務著作・特許・ライセンス・DRM" },
  { href: "/sdlc/process/advanced", title: "プロセス成熟度（発展）", desc: "形式手法・SLCP・CMMI・ソフトウェアプロダクトライン" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発工程・管理</Eyebrow>
        <h1>開発工程・管理</h1>
        <Lead>
          ネットワークやデータベースといった<Term>技術要素</Term>を理解したあと、いよいよ「システムをどう作り、どう管理するか」を学びます。<Term>要件定義</Term>で何を作るかを決め、<Term>設計</Term>で仕組みを固め、<Term>実装</Term>し、<Term>テスト</Term>で検証し、<Term>導入・保守</Term>で運用へ渡す ― この開発ライフサイクルの各工程と、工程を横断する<Term>開発管理</Term>の基本を、試験と実務の両面から押さえます。
        </Lead>
      </Hero>

      <Heading num="01">開発技術は「工程」と「管理」の2軸で捉える</Heading>
      <p>本セクションは大きく2つの流れで構成されます。1つは <Term>overview → process → requirements → design → implementation → testing → review → deployment → maintenance</Term> という時間軸に沿った開発の工程。もう1つは、その工程全体を横断してプロジェクトを回す <Term>management</Term>（構成管理・変更管理・知的財産）です。まず全体像をつかんでから、各工程を順に深掘りしていきます。</p>

      <Analogy label="💡 たとえるなら">
        システム開発は「家を建てる」流れに似ています。施主の要望を聞く（要件定義）、図面を引く（設計）、大工が建てる（実装）、検査する（テスト）、引き渡す（導入）、住みながら直す（保守）。そして工期・変更・契約を管理する現場監督の仕事が、開発管理にあたります。
      </Analogy>

      <IndexGrid>
        {topics.map((topic, i) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={String(i + 1).padStart(2, "0")}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <DocsFooter />
    </DocsPage>
  );
}
