import {
  Sigma,
  Cpu,
  Network,
  Globe,
  Code2,
  Shapes,
  FlaskConical,
  ShieldCheck,
  Server,
  Settings2,
  type LucideIcon,
} from "lucide-react";

export type NavNode = {
  href?: string;
  title: string;
  children?: NavNode[];
};

export type NavSection = {
  href: string;
  title: string;
  icon: LucideIcon;
  tree: NavNode[];
};

export const sections: NavSection[] = [
  {
    href: "/theory",
    title: "情報科学",
    icon: Sigma,
    tree: [
      { href: "/theory/numbers", title: "数と基数変換" },
      { href: "/theory/numbers/floating", title: "浮動小数点と演算精度" },
      { href: "/theory/logic", title: "論理と真理値表" },
      { href: "/theory/probability", title: "確率・統計と情報理論" },
      { href: "/theory/probability/inference", title: "推定と仮説検定" },
      { href: "/theory/encoding", title: "文字コード" },
      { href: "/theory/algorithms", title: "アルゴリズムとデータ構造" },
      { href: "/theory/algorithms/graphs", title: "グラフと最短経路" },
      { href: "/theory/formal", title: "形式言語" },
    ],
  },
  {
    href: "/computer",
    title: "コンピュータ",
    icon: Cpu,
    tree: [
      { href: "/computer/history", title: "コンピュータの歴史" },
      { href: "/computer/basics", title: "PCハードウェアの基礎" },
      {
        title: "半導体",
        children: [
          { href: "/computer/semiconductor", title: "半導体の全体像" },
          { href: "/computer/semiconductor/transistor", title: "トランジスタの正体" },
          { href: "/computer/semiconductor/logic", title: "直列と並列で論理をつくる" },
          { href: "/computer/semiconductor/adder", title: "足し算をつくる" },
        ],
      },
      {
        title: "CPU",
        children: [
          { href: "/computer/cpu", title: "CPUと命令実行" },
          { href: "/computer/cpu/performance", title: "性能と高速化" },
        ],
      },
      {
        title: "メモリ",
        children: [
          { href: "/computer/memory", title: "メモリの仕組み" },
          { href: "/computer/memory/virtual", title: "仮想メモリとソフトウェアの肥大化" },
          { href: "/computer/memory/speed", title: "速さの壁 ― キャッシュ・帯域・HBM" },
          { href: "/computer/memory/stack", title: "スタックと関数呼び出しの舞台裏" },
          { href: "/computer/memory/history", title: "記憶装置の歴史" },
        ],
      },
      {
        title: "入出力",
        children: [
          { href: "/computer/io/bus", title: "バス" },
          { href: "/computer/io/interface", title: "入出力インタフェース" },
          { href: "/computer/io/devices", title: "入出力装置" },
        ],
      },
      {
        title: "OS",
        children: [
          { href: "/computer/os", title: "OSの仕組み" },
          { href: "/computer/os/kernel", title: "カーネルの役割と設計" },
          { href: "/computer/os/process", title: "プロセスとスレッド" },
          { href: "/computer/os/memory", title: "記憶管理と仮想記憶" },
          { href: "/computer/os/syscall", title: "システムコール" },
          { href: "/computer/os/shell", title: "シェル" },
          { href: "/computer/os/filesystem", title: "ファイルシステム" },
          {
            title: "歴史と系譜",
            children: [
              { href: "/computer/os/unix", title: "UNIXの歴史と哲学" },
              { href: "/computer/os/posix", title: "UNIX・BSD・Linuxの違い" },
              { href: "/computer/os/gnu", title: "GNUとフリーソフトウェア" },
              { href: "/computer/os/linux", title: "Linuxの歴史" },
            ],
          },
        ],
      },
      {
        title: "システム構成",
        children: [
          { href: "/computer/system/architecture", title: "処理形態とシステム構成" },
          { href: "/computer/system/reliability", title: "信頼性と冗長化" },
          { href: "/computer/system/metrics", title: "性能と経済性の評価" },
        ],
      },
      { href: "/computer/client", title: "クライアント管理の実務" },
      { href: "/computer/printer", title: "プリンターの仕組み" },
    ],
  },
  {
    href: "/network",
    title: "ネットワーク",
    icon: Network,
    tree: [
      { href: "/network/protocols", title: "通信プロトコル" },
      { href: "/network/ip", title: "IPアドレスとルーティング" },
      { href: "/network/port", title: "ポートの全体像" },
      { href: "/network/cabling", title: "ケーブルと規格" },
      { href: "/network/devices", title: "ネットワーク機器の役割" },
      { href: "/network/wifi", title: "Wi-Fiの仕組み" },
    ],
  },
  {
    href: "/internet",
    title: "インターネット",
    icon: Globe,
    tree: [
      { href: "/internet/history", title: "インターネットの歴史" },
      { href: "/internet/dns", title: "DNS" },
      { href: "/internet/web", title: "Webの仕組み" },
      { href: "/internet/mail", title: "メールの仕組み" },
      { href: "/internet/isp", title: "ISP接続とCDN" },
      { href: "/internet/server", title: "サーバーの全体像" },
      { href: "/internet/server/build", title: "サーバー構築の実務" },
    ],
  },
  {
    href: "/dev",
    title: "開発",
    icon: Code2,
    tree: [
      { href: "/dev/workspace", title: "開発環境" },
      { href: "/dev/environments", title: "環境の全体像" },
      { href: "/dev/language-basics", title: "プログラミング言語の仕組み" },
      { href: "/dev/language-basics/history", title: "プログラミング言語の歴史" },
      { href: "/dev/language", title: "JavaScript・TypeScript" },
      { href: "/dev/web-basics", title: "Web基礎" },
      { href: "/dev/runtime", title: "ランタイム" },
      { href: "/dev/tooling", title: "パッケージ管理とビルド" },
      {
        title: "フレームワーク・ライブラリ",
        children: [
          { href: "/dev/framework", title: "フレームワーク・ライブラリ概要" },
          {
            title: "React",
            children: [
              { href: "/dev/framework/react", title: "React概要" },
              { href: "/dev/framework/react/logic-reuse", title: "ロジックを再利用する" },
              { href: "/dev/framework/react/composition", title: "コンポーネントを組み合わせる" },
              { href: "/dev/framework/react/forms", title: "フォームの値を管理する" },
            ],
          },
          {
            title: "Next.js",
            children: [
              { href: "/dev/framework/nextjs", title: "Next.js概要" },
              { href: "/dev/framework/nextjs/components", title: "Server/Clientコンポーネントの境界" },
              { href: "/dev/framework/nextjs/data", title: "データフェッチ・キャッシュ・再検証" },
              { href: "/dev/framework/nextjs/rendering", title: "配信を最適化する" },
            ],
          },
          { href: "/dev/framework/tailwind", title: "Tailwind CSS" },
        ],
      },
      {
        title: "データベース",
        children: [
          { href: "/dev/database", title: "データベース概要" },
          { href: "/dev/database/design", title: "概念設計と正規化" },
          { href: "/dev/database/physical", title: "物理設計と運用" },
          { href: "/dev/database/history", title: "データベースの歴史" },
        ],
      },
      { href: "/dev/cache", title: "キャッシュの全体像" },
    ],
  },
  {
    href: "/design",
    title: "設計",
    icon: Shapes,
    tree: [
      {
        title: "パラダイム",
        children: [
          { href: "/design/paradigm", title: "パラダイム一覧" },
          { href: "/design/paradigm/procedural", title: "手続き型" },
          { href: "/design/paradigm/structured", title: "構造化" },
          {
            title: "オブジェクト指向",
            children: [
              { href: "/design/paradigm/oop", title: "オブジェクト指向" },
              { href: "/design/paradigm/oop/gof/creation", title: "GoF: 生成を工夫する" },
              { href: "/design/paradigm/oop/gof/structure", title: "GoF: 構造を包む・繋ぐ" },
              { href: "/design/paradigm/oop/gof/algorithms", title: "GoF: 振る舞いをオブジェクト化する" },
              { href: "/design/paradigm/oop/gof/collaboration", title: "GoF: 連携・通知・走査" },
            ],
          },
          {
            title: "関数型",
            children: [
              { href: "/design/paradigm/functional", title: "関数型" },
              { href: "/design/paradigm/functional/foundations", title: "純粋関数とイミュータビリティ" },
              { href: "/design/paradigm/functional/composition", title: "関数を組み合わせる" },
              { href: "/design/paradigm/functional/currying", title: "引数を固定する" },
              { href: "/design/paradigm/functional/safety", title: "安全に分岐する" },
            ],
          },
        ],
      },
      {
        title: "設計原則",
        children: [
          { href: "/design/principles", title: "設計原則一覧" },
          { href: "/design/principles/foundations", title: "黎明期の原則" },
          { href: "/design/principles/cohesion", title: "保守性の基本4原則" },
          { href: "/design/principles/solid", title: "SOLID" },
          { href: "/design/principles/modern", title: "現代の原則" },
        ],
      },
      {
        title: "設計思想・方法論",
        children: [
          { href: "/design/methodology", title: "設計思想・方法論一覧" },
          { href: "/design/methodology/info-hiding", title: "情報隠蔽" },
          { href: "/design/methodology/data-centric", title: "データ中心設計" },
          { href: "/design/methodology/object-centric", title: "オブジェクト中心設計" },
          { href: "/design/methodology/contract", title: "契約による設計" },
          { href: "/design/methodology/responsibility-driven", title: "責務駆動設計" },
          { href: "/design/methodology/use-case-driven", title: "ユースケース中心設計" },
          {
            title: "ドメイン駆動設計",
            children: [
              { href: "/design/methodology/ddd", title: "ドメイン駆動設計" },
              { href: "/design/methodology/ddd/tactical", title: "戦術的DDDをコードに書く" },
            ],
          },
        ],
      },
      {
        title: "アーキテクチャ",
        children: [
          { href: "/design/architecture", title: "アーキテクチャ一覧" },
          {
            title: "システム視点",
            children: [
              { href: "/design/architecture/sys/layered", title: "レイヤードアーキテクチャ" },
              { href: "/design/architecture/sys/pipeline", title: "パイプラインアーキテクチャ" },
              { href: "/design/architecture/sys/microkernel", title: "マイクロカーネルアーキテクチャ" },
              { href: "/design/architecture/sys/soa", title: "オーケストレーション駆動SOA" },
              { href: "/design/architecture/sys/event-driven", title: "イベント駆動アーキテクチャ" },
              { href: "/design/architecture/sys/space-based", title: "スペースベースアーキテクチャ" },
              { href: "/design/architecture/sys/service-based", title: "サービスベースアーキテクチャ" },
              { href: "/design/architecture/sys/microservices", title: "マイクロサービスアーキテクチャ" },
              { href: "/design/architecture/sys/modular-monolith", title: "モジュラーモノリス" },
            ],
          },
          {
            title: "アプリケーション視点",
            children: [
              { href: "/design/architecture/app/layered", title: "レイヤー系" },
              { href: "/design/architecture/app/gui", title: "GUI系" },
              { href: "/design/architecture/app/web", title: "Web系" },
              {
                title: "ドメインモデル系",
                children: [
                  { href: "/design/architecture/app/domain-model", title: "ドメインモデル系" },
                  { href: "/design/architecture/app/domain-model/patterns", title: "業務ロジックの置き場所" },
                ],
              },
              {
                title: "データアクセス系",
                children: [
                  { href: "/design/architecture/app/data-access", title: "データアクセス系" },
                  { href: "/design/architecture/app/data-access/patterns", title: "永続化層の定石" },
                ],
              },
              { href: "/design/architecture/app/domain-centric", title: "ドメイン中心アーキテクチャ系" },
              { href: "/design/architecture/app/cqrs", title: "高度な設計系" },
            ],
          },
        ],
      },
      { href: "/design/patterns", title: "設計パターン(横断インデックス)" },
      { href: "/design/idioms", title: "実装パターン・イディオム" },
      { href: "/design/object", title: "オブジェクトの全体像" },
      {
        title: "コーディング規約・スタイル",
        children: [
          { href: "/design/conventions", title: "コーディング規約・スタイル一覧" },
          { href: "/design/conventions/functions", title: "関数・イベントハンドラの命名" },
          { href: "/design/conventions/variables", title: "変数・略語の命名" },
          { href: "/design/conventions/classes", title: "クラス・接尾辞の命名" },
          { href: "/design/conventions/files", title: "ファイル・ディレクトリの命名" },
        ],
      },
    ],
  },
  {
    href: "/test",
    title: "テスト",
    icon: FlaskConical,
    tree: [
      { href: "/test/quality-plan", title: "品質計画" },
      { href: "/test/strategy", title: "品質戦略とテストピラミッド" },
      { href: "/test/design-techniques", title: "テスト設計技法" },
      { href: "/test/unit", title: "Unitテスト" },
      { href: "/test/integration", title: "Integrationテスト" },
      { href: "/test/e2e", title: "E2Eテスト" },
      { href: "/test/tools", title: "Vitest・Playwright" },
      { href: "/test/patterns", title: "テストパターン" },
      { href: "/test/review", title: "レビュー観点" },
      { href: "/test/code-review", title: "コードレビュー" },
    ],
  },
  {
    href: "/security",
    title: "セキュリティ",
    icon: ShieldCheck,
    tree: [
      {
        title: "攻撃と対策",
        children: [
          { href: "/security/injection", title: "インジェクション攻撃" },
          { href: "/security/xss", title: "XSSと出力エスケープ" },
          { href: "/security/sqli", title: "SQLインジェクション対策" },
          { href: "/security/csrf", title: "CSRF対策" },
        ],
      },
      {
        title: "認証・認可",
        children: [
          { href: "/security/auth", title: "認証" },
          { href: "/security/authz", title: "認可" },
          { href: "/security/session", title: "セッションとCookie管理" },
          { href: "/security/session-cookie", title: "セッション・Cookieの全体像" },
          { href: "/security/token", title: "トークンの全体像" },
          { href: "/security/identity", title: "認証プロトコルの変遷" },
        ],
      },
      {
        title: "暗号技術",
        children: [
          { href: "/security/crypto", title: "暗号の歴史と公開鍵暗号" },
          { href: "/security/hash", title: "ハッシュ関数と衝突攻撃" },
        ],
      },
      {
        title: "防御・運用",
        children: [
          { href: "/security/headers", title: "セキュリティヘッダ" },
          { href: "/security/cache", title: "キャッシュ制御" },
          { href: "/security/logging", title: "ログ出力設計" },
          { href: "/security/network-defense", title: "ネットワーク層の防御" },
        ],
      },
    ],
  },
  {
    href: "/infra",
    title: "インフラ",
    icon: Server,
    tree: [
      { href: "/infra/virtualization", title: "仮想化の仕組み" },
      {
        title: "コンテナ",
        children: [
          { href: "/infra/container", title: "コンテナの仕組み" },
          { href: "/infra/container/docker", title: "Docker" },
          { href: "/infra/container/kubernetes", title: "Kubernetes" },
          { href: "/infra/container/observability", title: "オブザーバビリティ" },
          { href: "/infra/container/security", title: "コンテナセキュリティ" },
        ],
      },
      { href: "/infra/storage", title: "ストレージの仕組み" },
      { href: "/infra/storage/backup", title: "バックアップと復旧" },
      { href: "/infra/monitoring", title: "インフラの監視" },
      { href: "/infra/incident", title: "インフラ障害の切り分け" },
      {
        title: "AWS",
        children: [
          { href: "/infra/aws", title: "AWS概要" },
          { href: "/infra/aws/basics", title: "AWSの基礎" },
          {
            title: "コンピューティング",
            children: [
              { href: "/infra/aws/compute", title: "コンピューティング概要" },
              { href: "/infra/aws/compute/lambda", title: "Lambda" },
            ],
          },
          {
            title: "ストレージ",
            children: [
              { href: "/infra/aws/storage", title: "ストレージ概要" },
              { href: "/infra/aws/storage/s3", title: "S3" },
            ],
          },
          {
            title: "ネットワーキングとコンテンツ配信",
            children: [
              { href: "/infra/aws/network", title: "ネットワーキングとコンテンツ配信概要" },
              { href: "/infra/aws/network/route53", title: "Route 53" },
              { href: "/infra/aws/network/cloudfront", title: "CloudFront" },
              { href: "/infra/aws/network/acm", title: "ACM" },
            ],
          },
          {
            title: "セキュリティ、アイデンティティ、コンプライアンス",
            children: [
              { href: "/infra/aws/security", title: "セキュリティ、アイデンティティ、コンプライアンス概要" },
              { href: "/infra/aws/security/secrets-manager", title: "Secrets Manager" },
            ],
          },
          { href: "/infra/aws/database", title: "データベース" },
          {
            title: "モニタリングと管理",
            children: [
              { href: "/infra/aws/monitoring", title: "モニタリングと管理概要" },
              { href: "/infra/aws/monitoring/cloudwatch", title: "CloudWatch" },
            ],
          },
          { href: "/infra/aws/container", title: "コンテナ" },
          {
            title: "CI/CD",
            children: [
              { href: "/infra/aws/cicd", title: "CI/CD概要" },
              { href: "/infra/aws/cicd/codebuild", title: "CodeBuild" },
              { href: "/infra/aws/cicd/codepipeline", title: "CodePipeline" },
            ],
          },
          {
            title: "アプリケーション統合",
            children: [
              { href: "/infra/aws/integration", title: "アプリケーション統合概要" },
              { href: "/infra/aws/integration/sqs", title: "SQS" },
              { href: "/infra/aws/integration/sns", title: "SNS" },
              { href: "/infra/aws/integration/eventbridge", title: "EventBridge" },
            ],
          },
          { href: "/infra/aws/iac", title: "IaC" },
        ],
      },
    ],
  },
  {
    href: "/ops",
    title: "運用",
    icon: Settings2,
    tree: [
      { href: "/ops/deploy", title: "インフラとデプロイ" },
      { href: "/ops/monitoring", title: "監視・保守" },
      { href: "/ops/performance", title: "パフォーマンス" },
      { href: "/ops/data", title: "データ管理" },
      { href: "/ops/analytics", title: "分析・改善" },
      { href: "/ops/content", title: "コンテンツ管理" },
      { href: "/ops/cost", title: "コスト管理" },
      { href: "/ops/compliance", title: "法令・コンプライアンス" },
    ],
  },
];

function buildLabelMap(): Map<string, string> {
  const map = new Map<string, string>();
  const visit = (nodes: NavNode[]) => {
    for (const node of nodes) {
      if (node.href) map.set(node.href, node.title);
      if (node.children) visit(node.children);
    }
  };
  for (const section of sections) {
    map.set(section.href, section.title);
    visit(section.tree);
  }
  return map;
}

const labelMap = buildLabelMap();

export type BreadcrumbCrumb = { href: string; label: string };

export function getBreadcrumbTrail(pathname: string): BreadcrumbCrumb[] {
  const segments = pathname.split("/").filter(Boolean);
  const trail: BreadcrumbCrumb[] = [];
  let acc = "";
  for (const segment of segments) {
    acc += `/${segment}`;
    trail.push({ href: acc, label: labelMap.get(acc) ?? decodeURIComponent(segment) });
  }
  return trail;
}
