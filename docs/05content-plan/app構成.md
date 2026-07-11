# app ディレクトリ 全体設計

**位置づけ**: [`ディレクトリ.md`](./ディレクトリ.md) をベースに `src/app` を再編した構成。`cs`(コンピュータ基礎)と `impl`(実装)を解体・統合し、トピック指向に寄せた。メイン・サブとも並び順は「学ぶべき順」(サイドバー `src/lib/nav.ts` のツリー順と一致)。

**ステータス**: 移設・改名・nav改訂・全リンク/ラベル更新・索引ページ・ビルド確認まで **実装済み(2026-07-11)**。`＋` の項目のみ未執筆。

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
├── 2. network     ネットワーク(OSI・IP・ポート・配線・機器・Wi-Fi)
├── 3. internet    インターネット(DNS・Web・メール・ISP・サーバー概観)
├── 4. dev         開発(環境→言語→FW→DB→キャッシュ)
├── 5. design      設計
├── 6. test        テスト・品質
└── 7. security    セキュリティ

■ フェーズ2 — 情シス/インフラを目指す順(共有セクションの実務パート + 下記)
├── 8. infra       インフラ基盤(仮想化・クラウド/AWS・ストレージ)
└── 9. ops         運用(デプロイ・監視 … + 端末/プリンター等の社内IT運用)

※ search/ はサイト機能のため構成外
```

**二層構造**: `computer`/`network`/`internet`/`security`/`ops` は**フェーズ1で概念、フェーズ2で実務**を同じディレクトリで2回くぐる。`infra` はフェーズ2寄りの基盤セクション。

---

## 1. computer/ — コンピュータ ★旧 hardware

```
computer/
├── page.tsx          ✓ 索引
├── history/  ✓ ← cs/hardware-history   コンピュータの歴史
├── basics/   ✓ ← cs/hardware           PCハードウェアの基礎
├── memory/   ✓ ← cs/memory             メモリの仕組み
├── os/       ✓ ← cs/os                 OSの仕組み
└── (＋ 実機:cpu / gpu / disk / boot〈BIOS/UEFI/TPM/Secure Boot〉)  フェーズ2
```

## 2. network/ — ネットワーク

概論 → 各層 → 物理配線・機器・無線。

```
network/
├── page.tsx          ✓ 索引
├── protocols/ ✓ ← cs/protocols     通信プロトコルとOSI参照モデル(概論)
├── ip/        ✓ ← cs/network       ネットワーク層(IP層)…… IP / サブネット / ルーティング / NAT / DHCP
├── port/      ✓ ← cs/port          トランスポート層 …… TCP / UDP / ポート
├── cabling/   ✓ ← cs/cabling       ケーブルと配線               ┐
├── devices/   ✓ ← cs/net-devices   ネットワーク機器             │ フェーズ2:実務
├── wifi/      ✓ ← cs/wifi          Wi-Fi                        ┘
└── (＋ link:イーサネット/MAC/ARP)
```

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
├── database/        ✓ ← impl/database    データベース …… design / physical
└── cache/           ✓ ← cs/cache         キャッシュの全体像(横断概念)
```

## 5. design/ — 設計

パラダイム → 原則 → 方法論 → アーキ → パターン → イディオム → object → 規約。(既存構成を学習順に整序)

## 6. test/ — テスト・品質

計画 → 戦略 → 技法 → Unit/Integration/E2E → 道具 → パターン → レビュー。

## 7. security/ — セキュリティ

脆弱性(injection/xss/sqli/csrf) → 認証認可(auth→authz→session…) → 横断(cache/logging) → ネットワーク防御。インフラ層(EDR/FW/WAF＋)はフェーズ2。

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
