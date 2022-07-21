import type { NextPage } from "next";
import Head from "next/head";
import Header from "C:/next-js-blog/blogr/components/Header";
//import Menu from "C:/next-js-blog/blogr/components/Menu";
import { sanityClient, urlFor } from "C:/next-js-blog/blogr/sanity.js";
import BlogPost from "C:/next-js-blog/blogr/components/BlogPost";
import styles from "C:/next-js-blog/blogr/styles/post.module.css";

//const filteredPosts = localStorage.getItem('filteredPosts')

const Post: NextPage = ({post}) => {
  //console.log(post);
  return (
    <div className={styles.postMain}>
      <Head>
        <title>Blogr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <BlogPost post={post} />
    </div>
  );
};

export default Post;

export async function getStaticPaths() {
  const postQuery = `*[_type == 'post']{
		slug{
			current
		}
  }`

  const posts = await sanityClient.fetch(postQuery);

  interface Post{
    slug:{
      current: string
    }
  }

  const paths = posts.map((post: Post) => {
    return {
      params: {
        blogpost: post.slug.current.toString()
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  const postQuery = `*[_type == 'post' && slug.current == $blogpost]{
  _createdAt,
  _id,
  _rev,
  _updatedAt,
  'comments': *[
    _type == 'comment' 
    && post._ref == ^._id 
    && approved == true
  ],
  author,
  body,
  categories,
  description,
  mainImage,
  publishedAt,
  slug,
  title
}`;

  const post = await sanityClient.fetch(postQuery, {
    blogpost: params.blogpost
  });
  //const post = await sanityClient.fetch(postQuery)

  //console.log(postt)

  // const post  = JSON.stringify(postt)

  if (!post) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        post: post[0],
      },
      revalidate: 6000
    };
  }
}
