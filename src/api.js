export const fetchKeywords = async (value) => {
  const res = await fetch(
    `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/keywords?q=${value}`
  );
  const keywords = await res.json();
  return keywords;
};

export const fetchResults = async (value) => {
  const res = await fetch(
    `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/search?q=${value}`
  );
  const results = await res.json();
  return results.data;
};
