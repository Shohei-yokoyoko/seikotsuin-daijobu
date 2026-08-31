import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "その整骨院、大丈夫？｜患者側から整骨院を検証する", description: "柔道整復師国家資格を保有し、整骨院勤務経験のある運営者が、制度・公的資料・研究・経験を分けて整骨院の説明を検証します。", other: { "codex-preview": "development" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ja"><body>{children}</body></html>; }
