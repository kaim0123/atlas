# app ディレクトリ 全体設計

**位置づけ**: [`ディレクトリ.md`](./ディレクトリ.md) をベースに `src/app` を再編した構成。`cs`(コンピュータ基礎)と `impl`(実装)を解体・統合し、トピック指向に寄せた。メイン・サブとも並び順は「学ぶべき順」(サイドバー `src/lib/nav.ts` のツリー順と一致)。

**ステータス**: 移設・改名・nav改訂・全リンク/ラベル更新・索引ページ・ビルド確認まで **実装済み(2026-07-11)**。`＋` の項目のみ未執筆。
**技術要素の再編(2026-07-12)**: [`03_技術要素/ディレクトリ.md`](03_技術要素/ディレクトリ.md) に基づき、network を層構成に再編、**`database`・`ui`・`media` の3トップセクションを新設**、security をグループ化。旧 network パス(`protocols`/`port`/`cabling`/`wifi`/`devices`)と `dev/database/design` はクライアントリダイレクトのスタブで旧URL維持(静的エクスポートのため `next.config` redirects は不可)。詳細は本文末尾「技術要素セクション(03)」を参照。

**大方針(トピック指向への再編)**:
- `impl` → `dev` へ統合。
- `hardware` → **`computer`** に改名(OSを含むため)。
- **`サーバー` セクションは解体**。「◯◯サーバー」は各トピックの構築編にすぎないため、サーバー概観(種類の紹介+構築)を**一体のまま `internet/server` へ**置いた(厳密な分割はしない)。
- **メール → `internet/mail`**(SMTP/POP/IMAP はネットサービス)。
- `cloud` → **`infra`(インフラ基盤)** に改名し、**ストレージを吸収**(仮想化・クラウド・ストレージ = アプリが載る基盤)。
- **プリンター・クライアント管理 → `ops`**(社内IT運用/エンドポイント管理)。
- 結果、`server`/`storage`/`workplace` の3トップが消え **トップ9セクション**に。

**凡例**: `✓` 既存(`← 元パス`)/ `＋` 新規執筆 / `…… topics` はページ内で扱う内容。

---

## 全体マップ(学習順・トップ9)

```
Atlas
■ フェーズ1 — アプリ開発者が学ぶ順
├── 1. computer    コンピュータ(歴史・ハード・メモリ・OS)
├── 2. network     ネットワーク(全体像・階層・トポロジ・IP・トランスポート・リンク・アプリ層)
├── 3. internet    インターネット(DNS・Web・メール・ISP・サーバー概観)
├── ★ database     データベース(役割・関係モデル・設計・SQL・トランザクション・索引) ← 技術要素で新設
├── 4. dev         開発(環境→言語→FW→DB追補→キャッシュ)
├── 5. design      設計
├── 6. test        テスト・品質
├── 7. security    セキュリティ(基礎・攻撃・暗号・認証認可・リスク管理・対策)
├── ★ ui           ユーザーインタフェース(UI/UX・GUI・画面設計・Web UI・HCD) ← 技術要素で新設
└── ★ media        情報メディア(全体像・音声・画像・動画・圧縮・グラフィックス) ← 技術要素で新設

■ フェーズ2 — 情シス/インフラを目指す順(共有セクションの実務パート + 下記)
├── 8. infra       インフラ基盤(仮想化・クラウド/AWS・ストレージ)
└── 9. ops         運用(デプロイ・監視 … + 端末/プリンター等の社内IT運用)

※ 先頭に theory(情報科学)、末尾付近に上記を配置。search/ はサイト機能のため構成外
※ nav 上の並び: … internet → database → dev → design → test → security → ui → media → infra → ops
```

**二層構造**: `computer`/`network`/`internet`/`security`/`ops` は**フェーズ1で概念、フェーズ2で実務**を同じディレクトリで2回くぐる。`infra` はフェーズ2寄りの基盤セクション。

---

## 1. computer/ — コンピュータ ★旧 hardware

e-Words「コンピュータシステム」を学習順(A 機械 → B ソフトウェア → C システム構成)で再構成。詳細計画は [`05content-plan/02_コンピュータシステム/ディレクトリ.md`](02_コンピュータシステム/ディレクトリ.md)。

```
computer/
├── page.tsx          ✓ 索引
├── history/       ✓  コンピュータの歴史(e-Words 範囲外・入口)
├── basics/        ✓  PCハードウェアの基礎(五大装置を Heading 00 に追加)
├── semiconductor/ ✓  半導体(全体像/transistor/logic/adder)   A-2
├── cpu/           ✓  CPUと命令実行                           A-3
│   └── performance/  性能と高速化                            A-4
├── memory/        ✓  メモリの仕組み(+ speed/stack/history/virtual)  A-6
├── io/            ✓  入出力                                  A-7〜A-9
│   ├── bus/          バス
│   ├── interface/    入出力インタフェース(basics の USB 詳細を移設)
│   └── devices/      入出力装置
├── os/            ✓  OSの仕組み(+ kernel/process/syscall/shell/filesystem/歴史)  B
│   └── memory/       記憶管理と仮想記憶(ページング・LRU・スラッシング)  B-3
├── system/           システム構成                            C-1〜C-3
│   ├── architecture/ 処理形態とシステム構成
│   ├── reliability/  信頼性と冗長化
│   └── metrics/      性能と経済性の評価
├── client/        ✓  クライアント管理の実務(io/devices からリンク)
└── printer/       ✓  プリンターの仕組み(io/devices からリンク)
```

## 2. network/ — ネットワーク ★技術要素で層構成に再編

全体像 → 階層モデル → トポロジ・機器 → IP → トランスポート → データリンク/物理 → アプリ層。

```
network/
├── page.tsx          ✓ 索引(学習順に更新)
├── basics/       ＋✓ ネットワークの全体像 …… LAN/WAN / パケット交換 / bps
├── layers/        ✓ ← protocols §01〜03   階層モデル …… OSI 7層 / TCP/IP 4層 / カプセル化
├── topology/      ✓ ← devices             トポロジと接続装置 …… バス/スター等 + ONU/ルータ/スイッチ/FW
├── ip/            ✓ (試験基礎を追記)       IPアドレスと経路 …… IPv4/v6 / サブネット / NAT / DHCP / ルーティング
├── transport/     ✓ ← port §02 + protocols §04  トランスポート層 …… TCP / UDP / ポート番号
├── link/          ✓ ← cabling + protocols §04   データリンク層と物理層 …… MAC/ARP/CSMA-CD/VLAN + ケーブル/光/PoE
│   └── wireless/  ✓ ← wifi                無線LAN(Wi-Fi)
└── applications/ ＋✓ ← protocols §04       アプリケーション層 …… HTTP/メソッド/MIME / メール概要
```
旧パス(リダイレクトのスタブで維持): `protocols`→`layers` / `port`→`transport` / `cabling`→`link` / `wifi`→`link/wireless` / `devices`→`topology`。

## 3. internet/ — インターネット

歴史 → 名前解決 → Web → メール → 外部接続 → サーバー概観。

```
internet/
├── page.tsx          ✓ 索引
├── history/   ✓ ← cs/internet-history   インターネットの歴史
├── dns/       ✓ ← cs/dns                名前解決と配信 …… DNS / CDN / プロキシ
├── web/       ✓ ← cs/web                Webと暗号化通信 …… HTTP / HTTPS / TLS / 証明書
├── mail/      ✓ ← cs/mail               メール …… SMTP/POP/IMAP / SPF/DKIM/DMARC / 迷惑メール
├── isp/       ✓ ← cs/isp                接続方式 …… ISP / PPPoE / IPoE          ┐ フェーズ2
└── server/    ✓ ← cs/server             サーバーの全体像(種類の概観)          │
    └── build/ ✓ ← cs/server-build       サーバー構築の実務                     ┘
```
※ DNS/Web/メール/ファイル/プリント等の「◯◯サーバー」は各トピック内で触れ、`server` は種類の見取り図として一体で置く。

## ★ database/ — データベース(技術要素・新設)

`dev/database` から試験・初学者向けの土台を切り出したトップセクション(nav 上は internet と dev の間)。開発者向けの物理設計・運用・歴史は `dev/database/*` に残す。

```
database/
├── page.tsx          ✓ 索引
├── basics/       ＋✓ ← dev/database §01     役割と種類 …… DBMSの役割 / 関係DB・NoSQL・分散DB
├── model/        ＋✓ ← dev/database §02〜04  関係モデルと3層スキーマ …… テーブル/キー/制約/関連/関係演算
├── design/        ✓ ← dev/database/design    ER図と正規化 …… エンティティ抽出 / 1〜5NF / 非正規化
├── sql/          ＋✓                          SQLとデータ操作 …… DDL/DML / SELECT / JOIN / GROUP BY / ビュー
├── transaction/  ＋✓ ← 教材 + physical要約     トランザクションと整合性 …… ACID / ロック / ログ / バックアップ
└── advanced/
    └── index/    ＋✓ ← physical §01           索引とアクセス制御 …… B-tree/ハッシュ / GRANT・REVOKE
```

## 4. dev/ — 開発 ★impl を統合

環境 → 言語 → Web → ランタイム → 道具 → FW → DB → 横断概念。

```
dev/
├── page.tsx          ✓ 索引
├── workspace/       ✓ ← dev/env          開発環境(ターミナル/シェル/エディタ)
├── language-basics/ ✓ ← cs/languages     プログラミング言語の仕組み(+ /history)
├── language/        ✓ ← impl/language    JavaScript・TypeScript
├── web-basics/      ✓ ← impl/web-basics  Web基礎(HTML/CSS/DOM)
├── runtime/         ✓ ← impl/runtime     ランタイム
├── tooling/         ✓ ← dev/build        パッケージ管理とビルド
├── framework/       ✓ ← impl/framework   フレームワーク …… React / Next.js / Tailwind
├── database/        ✓ 開発者向け追補ハブに縮小 …… physical(RAID/レプリ/バックアップ) / history。土台は database/ へ委譲
└── cache/           ✓ ← cs/cache         キャッシュの全体像(横断概念)
```

## 5. design/ — 設計

パラダイム → 原則 → 方法論 → アーキ → パターン → イディオム → object → 規約。(既存構成を学習順に整序)

## 6. test/ — テスト・品質

計画 → 戦略 → 技法 → Unit/Integration/E2E → 道具 → パターン → レビュー。

## 7. security/ — セキュリティ ★技術要素でグループ化(フェーズA)

基礎(CIA/脅威/多層防御) → 攻撃手法(概観 + injection/xss/sqli/csrf) → 暗号(crypto/hash) → 認証認可(auth→authz→session…) → リスクマネジメント → 対策・実装(概観 + network-defense/headers/cache/logging)。

```
security/
├── page.tsx          ✓ 索引(20トピックをグループ順に)
├── basics/       ＋✓ 情報セキュリティの目的と脅威 …… CIA / 脅威・脆弱性 / マルウェア / 多層防御(旧indexから移設)
├── attacks/      ＋✓ 攻撃手法の概観 …… 認証破り/フィッシング/MITM/DDoS → injection/xss/sqli/csrf
├── management/   ＋✓ リスクマネジメント …… アセスメント / ISMS / CSIRT / BCP
├── countermeasures/ ＋✓ 対策の概観 …… FW/WAF/IDS-IPS / TLS/IPsec/VPN / 運用
└── (既存16ページはフラット維持。物理移動+リダイレクトのフェーズBは後回し)
```
※ nav はグループ構造に差し替え済み。ファイルの物理移動(`attacks/`・`auth/`・`countermeasures/` 配下へ)は未実施。

## ★ ui/ — ユーザーインタフェース(技術要素・新設)

```
ui/
├── page.tsx      ✓ 索引
├── basics/   ＋✓  UI・ユーザビリティ・アクセシビリティ …… IA(ラベル/チャンク/ナビ) / 音声・画像・自然言語IF
├── gui/      ＋✓  GUIの部品 …… ポインティングデバイス / ラジオ/チェック/リスト/プルダウン
├── design/   ＋✓  画面設計と入力チェック …… 画面構成 / 各種チェック / チェックキャラクタ / コード設計
├── web/      ＋✓  Web UIデザイン …… CSS / ワイヤーフレーム / レスポンシブ/メディアクエリ
└── hcd/      ＋✓  人間中心設計と評価 …… JIS Z 8530 / ユニバーサルD / WCAG / ヒューリスティック評価
```

## ★ media/ — 情報メディア(技術要素・新設)

```
media/
├── page.tsx        ✓ 索引
├── basics/     ＋✓  マルチメディアの全体像 …… ハイパーメディア / コンテナvsコーデック / ストリーミング
├── audio/      ＋✓  音声フォーマット …… PCM(標本化/量子化/符号化) / WAV/MP3/MIDI
├── image/      ＋✓  画像フォーマット …… ラスタvsベクター / JPEG/PNG/GIF / 解像度
├── video/      ＋✓  動画フォーマット …… フレーム/fps / MPEG/H.264/HEVC / 4K/8K
├── compression/＋✓  圧縮の考え方 …… 可逆vs非可逆 / 圧縮率 / ZIP
└── graphics/   ＋✓  色・解像度・グラフィックス応用 …… RGB/CMY / 階調 / CG/CAD/XR/メタバース
```
※ `theory/probability`(情報理論)・`theory/encoding`(文字コード) と相互リンク。

## 8. infra/ — インフラ基盤 ★旧 cloud(+ storage 吸収)

仮想化 → ストレージ → クラウド(AWS)。

```
infra/
├── page.tsx          ✓ 索引(IaaS/PaaS/SaaS総論を内包)
├── virtualization/  ✓ ← cs/virtualization   仮想化 …… Hyper-V/VMware/Proxmox / Docker/LXC/K8s
├── storage/         ✓ ← cs/storage          ストレージ …… NAS/SAN/RAID/iSCSI/NFS/SMB
│   └── backup/      ✓ ← cs/backup           バックアップ …… 3-2-1 / 世代管理 / DR / BCP
└── aws/             ✓ ← cloud/aws           AWS …… basics/compute/container/network/storage/
                                             database/security/iac/cicd/integration/monitoring
```

## 9. ops/ — 運用・保守

環境 → デプロイ → 監視 → 運用各論 → 社内IT運用(端末/プリンター) → インフラ運用。

```
ops/
├── page.tsx          ✓ 索引
├── environments/ ✓ ← dev/environments   環境の全体像(dev/stg/prod)
├── deploy/       ✓   インフラとデプロイ
├── monitoring/   ✓   監視・保守
├── performance/ ✓  data/ ✓  analytics/ ✓  content/ ✓  cost/ ✓  compliance/ ✓
├── client/       ✓ ← cs/client(旧workplace)  クライアント管理 …… キッティング/資産管理/MDM/更新管理
├── printer/      ✓ ← cs/printer(旧workplace) プリンター …… 共有/ドライバー/スキャン
├── infra-monitoring/ ✓   インフラの監視 …… 死活監視 / SNMP / Syslog   ┐ フェーズ2
└── incident/         ✓   インフラ障害の切り分け(物理→NW→DNS→サーバー→アプリ) ┘
```

---

## ▲ 整理点

- `infra/storage`(社内NAS/SANのRAID)と `dev/database`(DB物理設計のRAID)… 統合せず相互リンクのみ
- `security` にインフラ層(EDR/FW/WAF)を追記する際は、`page.tsx` の多層防御表の「ネットワーク層以下」を深掘り
- `ops/infra-monitoring` は当面 `monitoring` と別ページ(統合は保留)
- `dev/language-basics`(言語の仕組み)と `dev/language`(JS/TS)は当面別ページ
- `search/` … 全文検索などサイト機能。トップ9の知識ツリーとは別レイヤー

---

## 移設サマリ(今回の再編分)

| 旧 | → 新 |
|---|---|
| server/(basics+build) | internet/server(+/build) ※分割せず一体 |
| workplace/mail | internet/mail |
| workplace/printer | ops/printer |
| workplace/client | ops/client |
| cloud/ | infra/(改名) |
| cloud/aws | infra/aws |
| cloud/virtualization | infra/virtualization |
| storage/ | infra/storage |
| storage/backup | infra/storage/backup |
| **消滅トップ**: server / storage / workplace | **改名**: cloud→infra |
| network/protocols | network/layers(+ ip/transport/applications/link に分割) |
| network/port | network/transport |
| network/cabling | network/link |
| network/wifi | network/link/wireless |
| network/devices | network/topology |
| dev/database/design | database/design |
| **新設トップ(技術要素)**: database / ui / media | — |
