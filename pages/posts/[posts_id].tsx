import type { NextPage } from "next";
import styles from "C:/next-js-blog/blogr/styles/posts.module.css";
import Head from "next/head";
import Header from "C:/next-js-blog/blogr/components/Header";
//import Menu from "C:/next-js-blog/blogr/components/Menu";
import PostsMain from "C:/next-js-blog/blogr/components/PostsMain";
import { sanityClient } from "C:/next-js-blog/blogr/sanity.js";
import MenuBar from "../../components/MenuBar";



const BlogPosts: NextPage = ({ posts }: any) => {
  //console.log(posts);
  

  return (
    <div className={styles.posts}>
      <Head>
        <title>Blogr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <PostsMain posts={posts} />
      <MenuBar />
    </div>
  );
};

export default BlogPosts;

export async function getStaticPaths(){
  //THIS BIT OF CODE HERE QUERIES THE CMS FOR THE LIST OF ALL THE CATEGORIES
  const categoryQuery = `*[_type == 'category']{
    _id,
	}`;

  const category = await sanityClient.fetch(categoryQuery);

  interface Categories{
    _id: string,
  }

  //THIS BIT RECIEVES AN ARRAY CONTAINING ALL THE CATEGORIES
  //IT THEN USES THE PARAMETER I SPECIFIED IN THOSE CATEGORIES (IN THIS CASE, THE _ID), TO CREATE A LIST OF ALL POSSIBLE FORWARD SLASHES.
  const paths = category.map((categories: Categories) => {
    return {
      params: {
        posts_id: categories._id.toString()
      },
    };
  });

  //THIS RETURN VALUE BELOW, TELLS NEXT-JS ALL THE ROUTES ITS SUPPOSED TO EXPECT.
  //WHEN YOU MAKE A REQUEST TO ONE OF THESE ROUTES ITS EXPECTING, IT KNOWS T0 SHOW YOU EXACTLY WHAT YOU NEED.
  //WHEN YOU SPECIFY A ROUTE THAT DOESN'T EXIST, THE FALLBACK: BLOCKING PARAMETER DISPLAYS A 404 PAGE.
  return {
    paths,
    fallback: "blocking",
  };
};



export const getStaticProps = async ({ params }: any) => {
  const query = `*[_type == 'post' && categories[0]._ref == $posts_id]{
		title,
    mainImage,
    categories,
		slug{
			current
		},
		_id
	}`

  //975b3af3-14e2-4d74-8e76-ad973b043140

  
  const posts = await sanityClient.fetch(query, {
    posts_id: params?.posts_id
  });
  
  //console.log(params)
  if (!posts) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        posts: posts,
      },
    };
  }
};
