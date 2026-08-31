import Link from "next/link";
import {posts} from "../../articles/data";

export default function HealthInsuranceCategoryPage(){
  const categoryPosts=posts.filter(post=>post.category==="健康保険・療養費");
  return <>
    <header className="site-header">
      <Link href="/" className="brand">その整骨院、<b>大丈夫？</b></Link>
      <nav><Link href="/">トップへ戻る</Link></nav>
      <span className="header-mark">?</span>
    </header>
    <main className="category-page">
      <div className="breadcrumb"><Link href="/">TOP</Link>　/　健康保険・療養費</div>
      <p className="article-category">CATEGORY</p>
      <h1>健康保険・療養費</h1>
      <p className="category-lead">整骨院で健康保険が使える条件と、患者側で確認したいことを整理します。</p>
      <div className="published-grid">
        {categoryPosts.map((post,index)=><Link className="published-card" href={"/articles/"+post.slug} key={post.slug}>
          <span>0{index+1}</span>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <b>この記事を読む <i>→</i></b>
        </Link>)}
      </div>
    </main>
  </>
}