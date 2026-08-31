import Link from "next/link";
import {findPost,posts} from "../data";
import {notFound} from "next/navigation";

export function generateStaticParams(){return posts.map(({slug})=>({slug}))}

const labels:Record<string,string>={
  official:"公的資料では",
  experience:"柔道整復師としての実体験",
  wait:"ちょっと待って",
  check:"患者側で確認すること",
  quote:"この記事のポイント"
};

const readingOrder=[
  {slug:"what-is-seikotsuin",label:"整骨院は本来、何をするところか"},
  {slug:"health-insurance",label:"健康保険が使える条件"},
  {slug:"shoulder-insurance",label:"肩こりで保険が使われた実体験"}
];

export default async function PostPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const post=findPost(slug);
  if(!post)notFound();
  const h2=post.blocks.filter(b=>b.kind==="h2");
  const currentIndex=readingOrder.findIndex(item=>item.slug===post.slug);
  const nextPost=post.next?findPost(post.next):undefined;

  return <>
    <header className="site-header">
      <Link href="/" className="brand">その整骨院、<b>大丈夫？</b></Link>
      <nav><Link href="/">トップへ戻る</Link><a href="#sources">この記事で確認した資料</a></nav>
      <span className="header-mark">?</span>
    </header>
    <main className="article-page">
      <div className="article-progress"><span/></div>
      <div className="breadcrumb"><Link href="/">TOP</Link>　/　{post.category}　/　この記事</div>
      <header className="article-header">
        <p className="article-category">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="lead">{post.description}</p>
        <div className="article-byline"><span>公開日：{post.date}</span><span>執筆：柔道整復師国家資格保有者</span></div>
      </header>

      <section className="reading-path" aria-label="この連載を読む順番">
        <div><b>このテーマを読む順番</b><span>まずは制度の前提から。3本でつながる連載です。</span></div>
        <ol>
          {readingOrder.map((item,index)=>{
            const isCurrent=item.slug===post.slug;
            return <li className={isCurrent?"current":""} key={item.slug}>
              <span>{String(index+1).padStart(2,"0")}</span>
              {isCurrent?<strong>{item.label}<small>いま読んでいる記事</small></strong>:<Link href={"/articles/"+item.slug}>{item.label}<i>→</i></Link>}
            </li>
          })}
        </ol>
      </section>

      <div className="article-layout">
        <aside className="article-toc"><b>目次</b>{h2.map(x=><a href={"#"+encodeURIComponent(x.text)} key={x.text}>{x.text}</a>)}</aside>
        <article className="article-body">
          {post.blocks.map((b,i)=>b.kind==="h2"
            ?<h2 id={encodeURIComponent(b.text)} key={i}>{b.text}</h2>
            :b.kind==="p"
              ?<p key={i}>{b.text}</p>
              :<section key={i} className={"evidence-box "+b.kind}><span>{labels[b.kind]}</span><p>{b.text}</p></section>
          )}

          <section className="continue-reading">
            {nextPost?<>
              <span>ここまで読んだら、次へ</span>
              <h2>制度の説明だけで終わらせないために</h2>
              <p>次の記事では、制度上のルールと、実際の勤務経験との間にあったギャップを扱います。</p>
              <Link href={"/articles/"+nextPost.slug}>次に読む：{nextPost.title}<i>→</i></Link>
            </>:<>
              <span>この連載の現在地</span>
              <h2>次回は「患者照会」を取り上げます</h2>
              <p>保険者から届く確認書類を、患者はなぜ・何を確認すればよいのか。公開準備中です。</p>
              <Link href="/articles/health-insurance">前提から読み直す：整骨院で健康保険が使えるのはどんなとき？<i>←</i></Link>
            </>}
          </section>

          <section className="source-list" id="sources">
            <span>この記事で確認した主な資料</span>
            <div><b>資料名</b><b>発行元</b><b>確認日・種類</b></div>
            <div><a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/jyuudou/index.html" target="_blank">柔道整復師等の施術にかかる療養費の取扱いについて</a><p>厚生労働省</p><p>2026.08.31／公的案内</p></div>
            <div><a href="https://www.mhlw.go.jp/web/t_doc?dataId=00tb0408&dataType=1&pageNo=1" target="_blank">柔道整復師の施術に係る療養費の算定基準の実施上の留意事項等について</a><p>厚生労働省</p><p>2026.08.31／通知</p></div>
          </section>
        </article>
      </div>
    </main>
  </>
}
