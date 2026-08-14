export const formatDate = (dateStr?: string, formatType: "board" | "list" = "board"): string => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    
    if (formatType === "list") {
      const day = date.getDate();
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    }
    
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  } catch {
    return dateStr;
  }
};
