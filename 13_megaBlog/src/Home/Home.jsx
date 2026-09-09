import { useState, useEffect } from "react";
import { getPosts } from "../appwrite/config.js";
import Container from "../components/Container/Container.jsx";
import PostCard from "../components/PostCard.jsx";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts().then((response) => {
      if (response) {
        setPosts(response.rows); // Appwrite version ke hisaab se "rows" ya "documents" ho sakta hai
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <p>Loading articles...</p>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No posts found. Login to read/create posts.
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap gap-6">
          {posts.map((post) => (
            <div key={post.$id} className="w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;