async function getPosts() {
	const res = await fetch('http://localhost:3000/api/posts');
	const data = await res.json();
	return data.data;
}

export default async function Posts() {
	const posts = await getPosts();
	return (
		<div>
			<h1>Posts</h1>
			{posts.map((post) => {
				return (
					<div>
						<div key={post.id}>
							<div>{post.id}</div>
							<div>{post.title}</div>
							<div>{post.body}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
