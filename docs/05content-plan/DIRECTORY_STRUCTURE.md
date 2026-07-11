# Atlas 知識ディレクトリ構成案 v3(トピック単位で開発者視点とインフラ視点を統合・実行済み)

最終更新: 2026-07-11

**位置づけ**: v1(「`infra`という独立セクションを新設し、既存8セクションとは別枠で共存させる」案)を撤回し、v2で「トピック単位で1つのディレクトリに統合する」方針に変更、本v3でその移動計画を確定・実行した。同じトピック(コンピュータ・ネットワーク・サーバー・クラウド・セキュリティ・監視)を開発者側とインフラ側の双方が別の抽象度で扱っているだけなので、**トピック単位で1つのディレクトリに統合**し、その中で「基礎/概念」→「構築/運用」の順に深さを重ねる構成にした。実際のセクション構成は[`03detail-design/site-detail.md`](../03detail-design/site-detail.md)§2・[`src/lib/nav.ts`](../../src/lib/nav.ts)を参照。

**本書のステータス**: §3の移動は2026-07-11に実行済み。既存コンテンツ(`cs`/`aws`/`sec`/`ops`の一部)の物理的な移設・`nav.ts`改修・全リンク更新・ビルド確認まで完了している。`インフラ.md`由来の新規コンテンツ(Wi-Fi・仮想化・ストレージ・クライアント管理・バックアップ・メール・障害対応、および各トピックの「構築・運用」パート)はまだ執筆していない未着手部分(§6参照)。

## 1. 方針

- 「`infra`」のような大きなくくりのディレクトリは作らない。`インフラ.md`の各章(ハードウェア・ネットワーク・サーバー・クラウド・セキュリティ・監視 等)を**第一階層のディレクトリ**としてそのまま独立させる。
- 既存セクション(`cs` `aws` `sec` `ops`)の中に、上記トピックと同じ対象を扱っているページがあれば、そのページを新ディレクトリに**移設**する。開発者視点の既存ページが「概念・仕組み」パート、`インフラ.md`由来の新規ページが「構築・運用」パートを担い、1つのディレクトリの中で深さのグラデーションを作る。
- 移設によって既存セクションの中身が空に近くなる場合は、そのセクション自体を解体・縮小する(`aws`は`cloud`へ、`sec`は`security`へ全面統合。`ops`は監視部分のみ`monitoring`へ移す)。
- 逆に対応する既存コンテンツが存在しないトピック(Wi-Fi・仮想化・ストレージ・クライアント管理・バックアップ・メール・障害対応)は、新規ディレクトリとして単独で追加する(内容はまだ書いていない)。

## 2. 判断が分かれていた点の結論

v2時点で保留していた4点について、フィードバックを受けて以下の通り確定した。

| 論点 | 結論 |
|---|---|
| `cs/web`の扱い | **`internet/web`へ移設した**(実行済み)。`internet`(旧`cs/internet`・`cs/dns`)と内容が重なる部分(DNS・TLS等)があるため、将来`internet`に⑤ISP接続・CDN・プロキシの内容を新規執筆した際は、新しく書く方でカバーし、`internet/web`側の重複箇所は削除する。ただし残った内容(HTTPリクエスト/レスポンス構造、DOM、Cookie、オリジン)をどう配置し直すかは執筆時に改めて検討する |
| `storage`と`impl/database/physical`の関係 | **統合しない。** `storage`のRAIDは情シスとして社内NAS/SANの冗長構成を指すもので、`impl/database/physical`のRAID(DBの物理設計の一部)とは目的が異なる。相互リンクのみ |
| `backup`と`ops/data`の関係 | **統合しない。** 社内データ(NAS等)のバックアップとアプリ/DBのバックアップは別物。相互リンクのみ |
| `monitoring`(旧`ops/monitoring`)と`incident`の境界 | 未確定のまま。`incident`は`インフラ.md`⑱のみでまだ内容がなく、実際にコンテンツを書く段階で改めて整理する |

## 3. 実行した移動計画

### 3.1 ディレクトリ移動(実施済み)

| 移動元 | 移動先 |
|---|---|
| `src/app/cs/history` | `src/app/hardware/history` |
| `src/app/cs/memory` | `src/app/hardware/memory` |
| `src/app/cs/protocols` | `src/app/network/protocols` |
| `src/app/cs/port` | `src/app/network/port` |
| `src/app/cs/internet` | `src/app/internet/history` |
| `src/app/cs/dns` | `src/app/internet/dns` |
| `src/app/cs/web` | `src/app/internet/web` |
| `src/app/cs/server` | `src/app/server/basics` |
| `src/app/aws/*`(11サブセクション全体) | `src/app/cloud/aws/*`(内部構成は維持) |
| `src/app/sec/*`(12ページ全体) | `src/app/security/*`(`app`のような中間層は作らずフラットに移設。sec全体がそのままセキュリティ全体の主要コンテンツであるため) |
| `src/app/ops/monitoring` | `src/app/monitoring`(ops内の中間層ではなく、そのままmonitoringのトップページとして昇格) |

`cs`に残ったのは対応する物理的な置き場所を持たない純粋なCS概念のみ: `os` `languages` `languages-history` `cache` `object`(5ページ)。
`ops`に残ったのは監視以外の運用ジャンル: `deploy` `performance` `data` `analytics` `content` `cost` `compliance`(7ページ)。

### 3.2 新規作成したページ

既存コンテンツの移設に伴い、新セクションのトップページ(セクション一覧)が必要になったため、以下を新規作成した(中身は既存ページへのIndexGridのみで、新規の学習コンテンツは含まない)。

- `src/app/hardware/page.tsx`
- `src/app/network/page.tsx`
- `src/app/internet/page.tsx`
- `src/app/server/page.tsx`
- `src/app/cloud/page.tsx`(`cloud/aws`への入口。IaaS/PaaS/SaaS総論等の新規コンテンツは今後執筆)

`security`(旧`sec/page.tsx`)・`monitoring`(旧`ops/monitoring/page.tsx`)はすでに実質的なトップページとして機能していたコンテンツをそのまま流用した。

### 3.3 更新した参照

- `src/lib/nav.ts`: `cs`の`tree`を5項目に縮小、`sec`セクションを削除して`security`セクションを新設(`design`と`test`の間に配置)、`aws`セクションを削除して`cloud`セクションを新設(内部に「AWS」グループとしてネスト)、`monitoring`セクションを新設(現状`tree`は空)、`ops`の`tree`から`monitoring`を除去、`hardware`/`network`/`internet`/`server`セクションを新設
- 全ページ内の`href="/cs/..."` `href="/aws/..."` `href="/sec/..."` `href="/ops/monitoring"`形式のリンク(`Link`・`RelatedLink`)を新しいパスへ一括置換
- 上記のうち移設したページを指す`RelatedLink`の`tag`属性(旧`"1-コンピュータ基礎"`等)を、移設先の新セクション名(`ハードウェア` `ネットワーク` `インターネット` `サーバー` `監視`)に修正
- 移設した各ページの`Eyebrow`・`DocsFooter`のセクション名表記を新セクション名に修正
- `src/app/page.tsx`(ホーム)のセクション一覧を13セクション分に更新
- `src/app/cs/page.tsx`・`src/app/ops/page.tsx`のトピック一覧・本文説明を、移設後の残存ページに合わせて修正
- [`03detail-design/site-detail.md`](../03detail-design/site-detail.md)のセクション一覧、[`05content-plan/PREREQ_GAPS.md`](./PREREQ_GAPS.md)内の`/sec/*` `/cs/web` `/cs/protocols`等のパス参照を更新
- `npx tsc --noEmit`・`npx next build`(静的Export)が通ることを確認済み

## 4. 更新後のセクション一覧(実装済み・13セクション)

| # | セクション | 内容 |
|---|---|---|
| 1 | `cs` | OS・プログラミング言語・キャッシュ・オブジェクトという、物理的な置き場所を持たない純粋なCS概念 |
| 2 | `hardware` | コンピュータの歴史・メモリの仕組み(①CPU/BIOS等の実務知識は未執筆) |
| 3 | `network` | 通信プロトコル・ポートの全体像(②IP/サブネット/ルーティング、④機器、⑲ケーブルは未執筆) |
| 4 | `internet` | インターネットの歴史・DNS・Webの仕組み(⑤ISP接続/CDN/プロキシは未執筆) |
| 5 | `server` | サーバーの全体像(⑥Windows Server/AD構築は未執筆) |
| 6 | `dev` | 開発基盤(変更なし) |
| 7 | `impl` | 実装(変更なし) |
| 8 | `design` | 設計(変更なし) |
| 9 | `security` | アプリケーションセキュリティ12ページ(⑬EDR/ゼロトラスト/FW/WAF等は未執筆) |
| 10 | `test` | テスト(変更なし) |
| 11 | `cloud` | AWSサービス群(⑧IaaS/PaaS/SaaS総論・Azure/GCP比較は未執筆) |
| 12 | `monitoring` | メトリクス・ログ・トレース・アラート(⑰SNMP/Syslogは未執筆) |
| 13 | `ops` | 監視以外の運用ジャンル(デプロイ・パフォーマンス・データ管理・分析・コンテンツ・コスト・コンプライアンス) |

## 5. 既存セクションとの境界(重複回避の考え方)

| トピック | 既存パート(移設済み) | 今後書く`インフラ.md`パート | 書き分けの基準 |
|---|---|---|---|
| ハードウェア | `hardware/history` `hardware/memory` | ①CPU・SSD・BIOS/UEFI・TPM等 | コンピュータの成り立ち・メモリ階層という概念 vs 個別部品の実務知識 |
| ネットワーク | `network/protocols` `network/port` | ②IP・サブネット・ルーティング・DHCP、④機器、⑲ケーブル | OSI参照モデル等の概念 vs LAN構築の実務 |
| インターネット | `internet/history` `internet/dns` `internet/web` | ⑤ISP接続・IPv4/IPv6・CDN・プロキシ | アプリ開発者が知るべきWeb/DNSの仕組み vs ISP契約・接続の実務 |
| サーバー | `server/basics` | ⑥Windows Server・Linux・AD構築 | 「サーバーとは何か」の概念 vs 実機の構築・運用 |
| クラウド | `cloud/aws/*` | ⑧IaaS/PaaS/SaaS分類、Azure/GCP比較 | AWS個別サービスの深掘り vs クラウド全体の位置づけ |
| セキュリティ | `security/*`(アプリケーション層12ページ) | ⑬EDR・ゼロトラスト・FW・WAF・IDS/IPS | コードで対処する脆弱性対策 vs ネットワーク/エンドポイントの防御。すでに`security/page.tsx`(旧sec/page.tsx)の多層防御表がOSI全層を俯瞰しているため、新規パートはこの表の「ネットワーク層以下」を深掘りする位置づけになる |
| 監視 | `monitoring`(旧ops/monitoring、メトリクス・ログ・トレース・アラート) | ⑰SNMP・Syslog・死活監視 | アプリケーションの可観測性 vs インフラ機器のヘルスチェック |

`storage`(⑨)・`backup`(⑭)・`wifi`(③)・`virtualization`(⑦)・`client`(⑫⑮)・`mail`(⑯)・`incident`(⑱)は対応する既存コンテンツがないため、執筆時に新規ディレクトリとして追加する(§2の通り、`storage`と`impl/database/physical`、`backup`と`ops/data`は統合せず相互リンクのみ行う)。

## 6. 未着手・今後の作業

- `インフラ.md`由来の新規コンテンツ(上表の「今後書く`インフラ.md`パート」列、および`wifi` `virtualization` `storage` `client` `backup` `mail` `incident`の7セクション)の執筆・`nav.ts`への追記・ホームページへの掲載
- `monitoring`と`incident`の役割分担の最終確認(§2参照)
- `internet/web`のうちDNS/TLS等、将来`internet`の新規パートと重複しうる箇所の整理(§2参照)
