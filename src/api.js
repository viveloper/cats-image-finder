export const fetchKeywords = async (value) => {
  const res = await fetch(
    `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/keywords?q=${value}`
  );

  if (res.status !== 200) {
    throw new Error('Error occurred!');
  }
  const keywords = await res.json();
  return keywords;
};

export const fetchResults = async (value) => {
  const res = await fetch(
    `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/search?q=${value}`
  );

  if (res.status !== 200) {
    throw new Error('Error occurred!');
  }

  const results = await res.json();
  return results.data;
};
