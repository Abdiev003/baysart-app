export const currencyFormat = (num) => {
  return (
    new Intl.NumberFormat("az", {
      style: "currency",
      currency: "AZN",
    })
      .format(num)
      .replace("AZN", "")
      .replace("₼", "")
      .trim() + "₼"
  );
};
