import { Post } from "../Post";

export default function Posts({ posts }) {
  return posts.edges.map((post) => (
    <Post
      key={post.id}
      title={post.node.title}
      content={post.node.content}
      date={post.node.date}
      author={post.node.author?.node.name}
      uri={post.node.uri}
      featuredImage={post.node.featuredImage?.node}
    />
  ));
}
