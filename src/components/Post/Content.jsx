const Content = ({ tweet }) => {
  return (
    <>
      {tweet.textContent && <p>{tweet.textContent}</p>}
      {tweet.imageContent && (
        <img
          className="max-h-[300px] object-cover w-full rounded-lg my-2"
          src={tweet.imageContent}
        />
      )}
    </>
  );
};

export default Content;
