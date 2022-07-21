import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/index.module.css";
import Header from "../components/Header";
//import Menu from "../components/Menu";
import Landing from "../components/Landing";
import Top from "../components/Top";
import CategoryMain from "../components/CategoryMain";
import { sanityClient } from "../sanity";
import { Category, Post } from "../types.d";
import MenuBar from '../components/MenuBar'


interface Props {
  categories: Category;
  posts: Post;
}

const Home: NextPage | any = ({ categories, posts }: Props) => {
  //console.log(categories)
  //console.log(posts)
  return (
    <div className={styles.container}>
      <Head>
        <title>Blogr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {/* <Menu /> */}
      <Landing />
      <CategoryMain categories={categories} posts={posts} />
      <Top />
      <MenuBar/>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const categoryQuery = `*[_type == 'category']{
		title,
		image,
		slug{
			current
		},
		_id
	}`;

  const postQuery = `*[_type == 'post']{
		_id,
		title,
		body,
		categories,
		author->{
			name,
			image
		},
		description,
		mainImage,
		slug{
      current
    }
	}`;

  //THE REF OF A POST AND THE ID OF A CATEGORY ARE THE SAME.
  //REMEMBER THIS WHEN YOU TRY TO PULL REQUESTS

  const categories = await sanityClient.fetch(categoryQuery);
  const posts = await sanityClient.fetch(postQuery);

  // identifier = posts.forEach((post)=>{
  //   post.filter((category) => {
  //     return category.title === title;
  //   });
  //   let filteredId = filteredCategory[0]._id;
  //   let filteredPosts = posts.filter((post) => {
  //     return post.categories[0]._ref === filteredId;
  //   });
  // })

  return {
    props: {
      categories: categories,
      posts: posts,
    },
  };
}
