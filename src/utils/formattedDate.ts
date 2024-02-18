export const formattedDate = (date: string) => {
  const modifyDate = new Date(date);

  return modifyDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
