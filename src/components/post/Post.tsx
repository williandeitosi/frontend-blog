import style from './Post.module.css';

export function Post() {
  return (
    <div className={style.containerPost}>
      <h1>Title Post</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
        molestias animi, fugit maxime assumenda laborum eaque perspiciatis
        maiores ea nihil nam aut doloremque hic? Nobis dignissimos provident
        dolore unde totam.Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Ullam molestias animi, fugit maxime assumenda laborum eaque
        perspiciatis maiores ea nihil nam aut doloremque hic? Nobis dignissimos
        provident dolore unde totam.
      </p>

      <a href='#'>Ler Mais +</a>
    </div>
  );
}
