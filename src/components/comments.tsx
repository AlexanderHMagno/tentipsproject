const DisqusComments = ({ id, title }: { id: string; title: string }) => {
  const disqusShortname = "community-jzzj9whvrj";
  const disqusConfig = {
    url: `https://localhost:3000/blog/${id}`,
    identifier: id, // Single post id
    title: title, // Single post title
  };
  return <div></div>;
};
export default DisqusComments;
