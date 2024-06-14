
export const highlightText = (text: string, query: string) => {
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} style={{ color: 'blue' }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};
