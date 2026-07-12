# ネットワーク｜TCPとUDP

> 分割元: [`00_分割元_ネットワーク基礎.md`](../00_分割元_ネットワーク基礎.md) §3
> 対応ページ（実装済み）: [`/network/transport`](../../../../src/app/network/transport/page.tsx)

信頼性のある転送（TCP）と軽量な転送（UDP）の使い分け、ポート番号を整理します。

---

## 3. TCPとUDP

- **TCP**: コネクション型。順序保証・再送で信頼できる転送。Web（HTTP）、メール送信に使う。
- **UDP**: コネクション不要。ヘッダが軽く、遅延を抑えたい用途（音声・動画、DNS問い合わせ）に使う。
- **ポート番号**: 同一IP上でどのアプリ向けか識別。80=HTTP、443=HTTPS、25=SMTPなど。

---

## この先どこで使うか

- 住所づけ（IP・サブネット）→ [`IPアドレスと経路.md`](IPアドレスと経路.md)（`network/ip/`）
- HTTP・メールなどアプリケーション層の代表例 → [`/network/applications`](../../../../src/app/network/applications/page.tsx)
- セキュリティの考え方（CIA・脅威）→ [`/security/basics`](../../../../src/app/security/basics/page.tsx)
