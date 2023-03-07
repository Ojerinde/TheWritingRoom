import PostItem from "./PostItem";

const AllPosts = () => {
  return (
    <div>
      <h2>All Posts</h2>
      <ul className="post-list">
        {[
          { title: "Joel", author: "Joel", body: "Joel" },
          { title: "Joel", author: "Joel", body: "Joel" },
          { title: "Joel", author: "Joel", body: "Joel" },
        ].map((post) => (
          <PostItem author={post.author} title={post.author} body={post.body} />
        ))}
      </ul>
    </div>
  );
};
export default AllPosts;
