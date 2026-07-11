# Atlas インフラ基本設計

最終更新: 2026-07-10

現在のAtlasは `next build`(静的Export)で生成した `out/` を静的ホスティングへ配置するだけの構成で、専用のインフラ設計を必要としない。デプロイ方式は [`00devflow/STATIC_DEPLOY_PLAN.md`](../00devflow/STATIC_DEPLOY_PLAN.md) を参照。

過去に検討していた「AWS Blocksでホスティング・認証・アップロードを構築する」というクラウド展開設計は、アップロード機能自体をAtlasに実装しない方針([`00devflow/STATIC_DEPLOY_PLAN.md`](../00devflow/STATIC_DEPLOY_PLAN.md))に伴いスコープ外になった。将来アップロード機能を別アプリとして切り出す場合の参考として [`04CICD/CLOUD_DEPLOYMENT_DESIGN.md`](../04CICD/CLOUD_DEPLOYMENT_DESIGN.md) に残してある(旧・本ファイルにあった同内容のv0.2はそちらへ一本化した)。
