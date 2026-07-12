"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * 静的エクスポート(output: "export")では next.config の redirects が使えないため、
 * 旧URLに置くクライアントリダイレクト用スタブ。JS無効時はリンクを表示する。
 */
export function RedirectTo({ href }: { href: string }) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <p style={{ padding: "2rem", fontSize: "0.95rem" }}>
      このページは移動しました。自動で転送されない場合は{" "}
      <Link href={href}>こちら</Link> をクリックしてください。
    </p>
  );
}
