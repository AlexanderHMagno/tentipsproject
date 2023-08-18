const DisqusComments = ({ id, title }: { id: string; title: string }) => {
  const disqusShortname = "community-jzzj9whvrj";
  const disqusConfig = {
    url: `${process.env.PROJECT_URL}/blog/${id}`,
    identifier: id, // Single post id
    title: title, // Single post title
  };
  return <div></div>;
};
export default DisqusComments;
