import {
  Sigma,
  Cpu,
  MonitorCog,
  Network,
  Globe,
  Database,
  Code2,
  Shapes,
  FlaskConical,
  ShieldCheck,
  AppWindow,
  Palette,
  Server,
  Cloud,
  Activity,
  Settings2,
  Workflow,
  Users,
  Landmark,
  Building2,
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
        title: "システム構成",
        children: [
          { href: "/computer/system/architecture", title: "処理形態とシステム構成" },
          { href: "/computer/system/reliability", title: "信頼性と冗長化" },
          { href: "/computer/system/metrics", title: "性能と経済性の評価" },
        ],
      },
      {
        title: "クライアント管理",
        children: [
          { href: "/computer/client", title: "クライアント管理の実務(総論)" },
          { href: "/computer/client/asset", title: "資産管理 ― 台帳・在庫・棚卸" },
          { href: "/computer/client/kitting", title: "キッティングと配布・回収" },
          { href: "/computer/client/license", title: "ライセンス管理" },
          { href: "/computer/client/security", title: "端末セキュリティ管理" },
          { href: "/computer/client/maintenance", title: "更新管理と保守・故障対応" },
          { href: "/computer/client/disposal", title: "廃棄管理" },
        ],
      },
      { href: "/computer/printer", title: "プリンターの仕組み" },
    ],
  },
  {
    href: "/os",
    title: "OS",
    icon: MonitorCog,
    tree: [
      { href: "/os", title: "OSの仕組み" },
      { href: "/os/kernel", title: "カーネルの役割と設計" },
      { href: "/os/process", title: "プロセスとスレッド" },
      { href: "/os/memory", title: "記憶管理と仮想記憶" },
      { href: "/os/syscall", title: "システムコール" },
      { href: "/os/shell", title: "シェル" },
      { href: "/os/filesystem", title: "ファイルシステム" },
      {
        title: "歴史と系譜",
        children: [
          { href: "/os/unix", title: "UNIXの歴史と哲学" },
          { href: "/os/posix", title: "UNIX・BSD・Linuxの違い" },
          { href: "/os/gnu", title: "GNUとフリーソフトウェア" },
          { href: "/os/linux", title: "Linuxの歴史" },
        ],
      },
    ],
  },
  {
    href: "/network",
    title: "ネットワーク",
    icon: Network,
    tree: [
      { href: "/network/basics", title: "ネットワークの全体像" },
      { href: "/network/layers", title: "階層モデル" },
      { href: "/network/topology", title: "トポロジと接続装置" },
      { href: "/network/ip", title: "IPアドレスと経路" },
      { href: "/network/transport", title: "トランスポート層" },
      {
        title: "データリンク層と物理層",
        children: [
          { href: "/network/link", title: "データリンク層と物理層" },
          { href: "/network/link/wireless", title: "無線LAN(Wi-Fi)" },
        ],
      },
      { href: "/network/applications", title: "アプリケーション層" },
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
      {
        title: "メール",
        children: [
          { href: "/internet/mail", title: "メールの仕組み" },
          { href: "/internet/mail/hosting", title: "会社ドメインのメールを用意する" },
        ],
      },
      { href: "/internet/isp", title: "ISP接続とCDN" },
      { href: "/internet/server", title: "サーバーの全体像" },
      { href: "/internet/server/build", title: "サーバー構築の実務" },
    ],
  },
  {
    href: "/database",
    title: "データベース",
    icon: Database,
    tree: [
      { href: "/database/basics", title: "役割と種類" },
      { href: "/database/model", title: "関係モデルと3層スキーマ" },
      { href: "/database/design", title: "ER図と正規化" },
      { href: "/database/sql", title: "SQLとデータ操作" },
      { href: "/database/transaction", title: "トランザクションと整合性" },
      { href: "/database/advanced/index", title: "索引とアクセス制御" },
      { href: "/database/physical", title: "物理設計と運用" },
      { href: "/database/history", title: "データベースの歴史" },
    ],
  },
  {
    href: "/sdlc",
    title: "開発工程・管理",
    icon: Workflow,
    tree: [
      { href: "/sdlc/overview", title: "開発の全体像" },
      { href: "/sdlc/history", title: "開発手法の変遷" },
      { href: "/sdlc/process", title: "開発プロセスと手法" },
      { href: "/sdlc/process/agile", title: "スクラムとアジャイル実践" },
      { href: "/sdlc/requirements", title: "要件定義" },
      { href: "/sdlc/requirements/modeling", title: "要件の表現方法" },
      { href: "/design", title: "設計（設計セクションへ）" },
      { href: "/dev/implementation", title: "実装（実装セクションへ）" },
      { href: "/test", title: "テスト（テストセクションへ）" },
      { href: "/sdlc/review", title: "レビューと品質確認" },
      { href: "/sdlc/deployment", title: "導入と受入れ" },
      { href: "/sdlc/maintenance", title: "保守" },
      {
        title: "開発管理",
        children: [
          { href: "/sdlc/management/config", title: "構成管理" },
          { href: "/sdlc/management/change", title: "変更管理" },
          { href: "/sdlc/management/ip", title: "知的財産とライセンス" },
        ],
      },
      { href: "/sdlc/process/advanced", title: "プロセス成熟度（発展）" },
    ],
  },
  {
    href: "/dev",
    title: "実装",
    icon: Code2,
    tree: [
      { href: "/dev/workspace", title: "開発環境" },
      { href: "/dev/environments", title: "環境の全体像" },
      { href: "/dev/language-basics", title: "プログラミング言語の仕組み" },
      { href: "/dev/language-basics/history", title: "プログラミング言語の歴史" },
      { href: "/dev/language", title: "JavaScript・TypeScript" },
      { href: "/dev/web-basics", title: "Web基礎" },
      { href: "/dev/runtime", title: "ランタイム" },
      { href: "/dev/http", title: "HTTP通信（Fetch・axios）" },
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
      { href: "/dev/stack", title: "技術スタックの組み合わせ" },
      { href: "/dev/implementation", title: "実装" },
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
      {
        title: "実装パターン・イディオム",
        children: [
          { href: "/design/idioms", title: "実装パターン・イディオム一覧" },
          { href: "/design/idioms/essentials", title: "必修イディオムを深く理解する" },
        ],
      },
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
      { href: "/test/code-review", title: "コードレビュー" },
    ],
  },
  {
    href: "/security",
    title: "セキュリティ",
    icon: ShieldCheck,
    tree: [
      { href: "/security/basics", title: "情報セキュリティの目的と脅威" },
      {
        title: "攻撃手法",
        children: [
          { href: "/security/attacks", title: "攻撃手法の概観" },
          { href: "/security/injection", title: "インジェクション攻撃" },
          { href: "/security/xss", title: "XSSと出力エスケープ" },
          { href: "/security/sqli", title: "SQLインジェクション対策" },
          { href: "/security/csrf", title: "CSRF対策" },
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
      { href: "/security/management", title: "リスクマネジメント" },
      {
        title: "セキュリティ対策・実装",
        children: [
          { href: "/security/countermeasures", title: "セキュリティ対策の概観" },
          { href: "/security/network-defense", title: "ネットワーク層の防御" },
          { href: "/security/headers", title: "セキュリティヘッダ" },
          { href: "/security/cache", title: "キャッシュ制御" },
          { href: "/security/logging", title: "ログ出力設計" },
        ],
      },
    ],
  },
  {
    href: "/ui",
    title: "ユーザーインタフェース",
    icon: AppWindow,
    tree: [
      { href: "/ui/basics", title: "UI・ユーザビリティ・アクセシビリティ" },
      { href: "/ui/gui", title: "GUIの部品" },
      { href: "/ui/design", title: "画面設計と入力チェック" },
      { href: "/ui/web", title: "Web UIデザイン" },
      { href: "/ui/hcd", title: "人間中心設計と評価" },
    ],
  },
  {
    href: "/media",
    title: "情報メディア",
    icon: Palette,
    tree: [
      { href: "/media/basics", title: "マルチメディアの全体像" },
      { href: "/media/audio", title: "音声フォーマット" },
      { href: "/media/image", title: "画像フォーマット" },
      { href: "/media/video", title: "動画フォーマット" },
      { href: "/media/compression", title: "圧縮の考え方" },
      { href: "/media/graphics", title: "色・解像度・グラフィックス応用" },
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
      { href: "/infra/incident", title: "インフラ障害の切り分け" },
    ],
  },
  {
    href: "/cloud",
    title: "クラウド",
    icon: Cloud,
    tree: [
      { href: "/cloud", title: "クラウドの全体像" },
      {
        title: "AWS",
        children: [
          { href: "/cloud/aws", title: "AWS概要" },
          { href: "/cloud/aws/basics", title: "AWSの基礎" },
          {
            title: "コンピューティング",
            children: [
              { href: "/cloud/aws/compute", title: "コンピューティング概要" },
              { href: "/cloud/aws/compute/lambda", title: "Lambda" },
            ],
          },
          {
            title: "ストレージ",
            children: [
              { href: "/cloud/aws/storage", title: "ストレージ概要" },
              { href: "/cloud/aws/storage/s3", title: "S3" },
            ],
          },
          {
            title: "ネットワーキングとコンテンツ配信",
            children: [
              { href: "/cloud/aws/network", title: "ネットワーキングとコンテンツ配信概要" },
              { href: "/cloud/aws/network/route53", title: "Route 53" },
              { href: "/cloud/aws/network/cloudfront", title: "CloudFront" },
              { href: "/cloud/aws/network/acm", title: "ACM" },
            ],
          },
          {
            title: "セキュリティ、アイデンティティ、コンプライアンス",
            children: [
              { href: "/cloud/aws/security", title: "セキュリティ、アイデンティティ、コンプライアンス概要" },
              { href: "/cloud/aws/security/secrets-manager", title: "Secrets Manager" },
            ],
          },
          { href: "/cloud/aws/database", title: "データベース" },
          {
            title: "モニタリングと管理",
            children: [
              { href: "/cloud/aws/monitoring", title: "モニタリングと管理概要" },
              { href: "/cloud/aws/monitoring/cloudwatch", title: "CloudWatch" },
            ],
          },
          { href: "/cloud/aws/container", title: "コンテナ" },
          {
            title: "CI/CD",
            children: [
              { href: "/cloud/aws/cicd", title: "CI/CD概要" },
              { href: "/cloud/aws/cicd/codebuild", title: "CodeBuild" },
              { href: "/cloud/aws/cicd/codepipeline", title: "CodePipeline" },
            ],
          },
          {
            title: "アプリケーション統合",
            children: [
              { href: "/cloud/aws/integration", title: "アプリケーション統合概要" },
              { href: "/cloud/aws/integration/sqs", title: "SQS" },
              { href: "/cloud/aws/integration/sns", title: "SNS" },
              { href: "/cloud/aws/integration/eventbridge", title: "EventBridge" },
            ],
          },
          { href: "/cloud/aws/iac", title: "IaC" },
        ],
      },
      { href: "/cloud/cloudflare", title: "Cloudflare" },
    ],
  },
  {
    href: "/monitoring",
    title: "監視",
    icon: Activity,
    tree: [
      { href: "/monitoring", title: "監視・保守" },
      { href: "/monitoring/infra", title: "インフラの監視" },
    ],
  },
  {
    href: "/ops",
    title: "運用",
    icon: Settings2,
    tree: [
      { href: "/ops/deploy", title: "インフラとデプロイ" },
      { href: "/ops/performance", title: "パフォーマンス" },
      { href: "/ops/data", title: "データ管理" },
      { href: "/ops/analytics", title: "分析・改善" },
      { href: "/ops/content", title: "コンテンツ管理" },
      { href: "/ops/cost", title: "コスト管理" },
      { href: "/ops/compliance", title: "法令・コンプライアンス" },
    ],
  },
  {
    href: "/management",
    title: "マネジメント",
    icon: Users,
    tree: [
      { href: "/management", title: "マネジメントの全体像" },
      { href: "/management/basics", title: "人事マネジメントとは" },
      {
        title: "個人のマネジメント（ミクロ）",
        children: [
          { href: "/management/individual", title: "個人マネジメント概要" },
          { href: "/management/individual/onboarding", title: "採用・オンボーディング・育成" },
          { href: "/management/individual/motivation", title: "モチベーション理論の歴史" },
          { href: "/management/individual/evaluation", title: "人事評価" },
          { href: "/management/individual/capital", title: "個人の力の3つの源泉" },
        ],
      },
      {
        title: "チームのマネジメント（メゾ）",
        children: [
          { href: "/management/team", title: "チームマネジメント概要" },
          {
            title: "リーダーシップ・対人",
            children: [
              { href: "/management/team/leadership", title: "リーダーシップの実践" },
              { href: "/management/team/grid", title: "マネジリアル・グリッド" },
              { href: "/management/team/communication", title: "コミュニケーション" },
              { href: "/management/team/conflict", title: "コンフリクトマネジメント" },
              { href: "/management/team/psychological-safety", title: "心理的安全性" },
              { href: "/management/team/efficacy", title: "組織効力感" },
              { href: "/management/team/rules", title: "ルールと相互理解" },
            ],
          },
          {
            title: "チーム運営（実行）",
            children: [
              { href: "/management/team/operation", title: "チーム運営と3つの力" },
              { href: "/management/team/goals", title: "目標設定" },
              { href: "/management/team/momentum", title: "戦略方針とモメンタム" },
            ],
          },
        ],
      },
      {
        title: "組織のマネジメント（マクロ）",
        children: [
          { href: "/management/org", title: "組織マネジメント概要" },
          { href: "/management/org/theory", title: "組織・リーダーシップ理論の歴史" },
          { href: "/management/org/structure", title: "組織構造とアサイン" },
          { href: "/management/org/system", title: "人事制度" },
          { href: "/management/org/delegation", title: "権限委譲" },
        ],
      },
      { href: "/management/context", title: "経営・社会とのつながり" },
      { href: "/management/theory", title: "マネジメント理論家" },
    ],
  },
  {
    href: "/finance",
    title: "会計・財務",
    icon: Landmark,
    tree: [
      { href: "/finance", title: "会計・財務の全体像" },
      {
        title: "決算書を読む（基礎）",
        children: [
          { href: "/finance/statements", title: "財務三表の全体像" },
          { href: "/finance/pl", title: "損益計算書（PL）― 5つの利益" },
          { href: "/finance/bs", title: "貸借対照表（BS）の読み方" },
          { href: "/finance/cf", title: "キャッシュフローと三表のつながり" },
          { href: "/finance/cost", title: "固定費・変動費・限界利益" },
        ],
      },
      {
        title: "会社を分析する",
        children: [
          { href: "/finance/analysis", title: "三表から会社を診断する" },
          { href: "/finance/metrics", title: "収益性と効率の指標" },
          { href: "/finance/valuation", title: "企業価値と株価（PBR）" },
        ],
      },
      {
        title: "現金で経営を見る",
        children: [
          { href: "/finance/cash", title: "現金がすべて ― 黒字倒産と負債" },
          { href: "/finance/ratios", title: "指標に惑わされない" },
        ],
      },
      { href: "/finance/payroll", title: "粗利益で人件費・給与を設計する" },
      {
        title: "ファイナンス思考",
        children: [
          { href: "/finance/thinking", title: "会計 vs ファイナンス" },
          { href: "/finance/pe", title: "PE・LBO・MBOの仕組み" },
        ],
      },
    ],
  },
  {
    href: "/industry",
    title: "業界",
    icon: Building2,
    tree: [
      { href: "/industry", title: "業界の全体像" },
      {
        title: "製造業",
        children: [
          {
            title: "重工業・素材",
            children: [
              { href: "/industry/steel", title: "鉄鋼・非鉄金属" },
              { href: "/industry/chemical", title: "化学・石油化学" },
              { href: "/industry/paper", title: "紙・パルプ・印刷" },
              { href: "/industry/glass-cement", title: "ゴム・ガラス・セメント" },
            ],
          },
          {
            title: "機械・自動車",
            children: [
              { href: "/industry/machinery", title: "機械・産業機械" },
              { href: "/industry/auto", title: "自動車・自動車部品" },
              { href: "/industry/electronics", title: "電機・電子部品・半導体" },
            ],
          },
          {
            title: "消費財・生活用品",
            children: [
              { href: "/industry/cosmetics", title: "化粧品・生活用品" },
              { href: "/industry/pharma", title: "医薬品" },
              { href: "/industry/apparel", title: "繊維・アパレル" },
              { href: "/industry/food", title: "食品・飲料" },
            ],
          },
        ],
      },
      {
        title: "金融・保険",
        children: [
          { href: "/industry/bank", title: "銀行" },
          { href: "/industry/securities", title: "証券" },
          { href: "/industry/insurance", title: "生命保険・損害保険" },
          { href: "/industry/credit", title: "信販・クレジット・リース" },
        ],
      },
      {
        title: "流通・小売",
        children: [
          { href: "/industry/trading", title: "商社" },
          { href: "/industry/specialty", title: "専門店" },
          { href: "/industry/retail", title: "百貨店・スーパー・コンビニ" },
        ],
      },
      {
        title: "運輸・物流",
        children: [
          { href: "/industry/logistics", title: "倉庫・物流" },
          { href: "/industry/transport", title: "航空・海運・鉄道・陸運" },
        ],
      },
      {
        title: "インフラ・エネルギー",
        children: [
          {
            title: "エネルギー",
            children: [
              { href: "/industry/power", title: "電力・ガス" },
              { href: "/industry/oil", title: "石油・石炭" },
              { href: "/industry/renewables", title: "再生可能エネルギー" },
            ],
          },
          {
            title: "建設・不動産",
            children: [
              { href: "/industry/construction", title: "建設・設備" },
              { href: "/industry/realestate", title: "不動産" },
              { href: "/industry/housing", title: "住宅・住設機器" },
              { href: "/industry/renovation", title: "リフォーム・リノベーション" },
            ],
          },
        ],
      },
      {
        title: "情報通信",
        children: [
          {
            title: "IT・通信",
            children: [
              { href: "/industry/software", title: "ソフトウェア" },
              { href: "/industry/it-services", title: "ITサービス" },
              { href: "/industry/telecom", title: "インターネット・通信" },
            ],
          },
          {
            title: "メディア・エンタメ",
            children: [
              { href: "/industry/entertainment", title: "エンターテインメント" },
              { href: "/industry/mass-media", title: "マスコミ" },
              { href: "/industry/advertising", title: "広告・出版" },
            ],
          },
        ],
      },
      {
        title: "生活・公共サービス",
        children: [
          {
            title: "外食・旅行",
            children: [
              { href: "/industry/restaurant", title: "フードサービス" },
              { href: "/industry/travel", title: "旅行・ホテル" },
            ],
          },
          {
            title: "教育・人材",
            children: [
              { href: "/industry/education", title: "教育" },
              { href: "/industry/staffing", title: "人材サービス" },
              { href: "/industry/consulting", title: "コンサルティング" },
            ],
          },
          {
            title: "公共・医療",
            children: [
              { href: "/industry/healthcare", title: "医療・福祉" },
              { href: "/industry/government", title: "政府・自治体" },
              { href: "/industry/services", title: "その他サービス" },
            ],
          },
        ],
      },
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
