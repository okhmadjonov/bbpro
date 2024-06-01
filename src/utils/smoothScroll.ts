type ScrollType = "top" | "left" | "right" | "bottom";

export const smoothScroll = (
  type: ScrollType,
  value: number = 0,
  behavior: "auto" | "instant" | "smooth" = "smooth"
): void => {
  const scrollOptions: ScrollToOptions = {
    behavior: behavior,
  };

  switch (type.toLowerCase()) {
    case "top":
      scrollOptions.top = value;
      break;
    case "left":
      scrollOptions.left = value;
      break;
    case "right":
      scrollOptions.left = value;
      break;
    case "bottom":
      scrollOptions.top = value;
      break;
    default:
      throw new Error("Invalid scroll type");
  }
  window.scrollTo(scrollOptions);
};
