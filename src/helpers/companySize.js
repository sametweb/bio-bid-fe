export function companySize(size) {
  switch (size) {
    case "A":
      return "Self-employed";
    case "B":
      return "1-10 employees";
    case "C":
      return "11-50 employees";
    case "D":
      return "51-200 employees";
    case "E":
      return "201-500 employees";
    case "F":
      return "501-1000 employees";
    case "G":
      return "1001-5000 employees";
    case "H":
      return "5001-10,000 employees";
    case "I":
      return "10,001+ employees";
    default:
      return null;
  }
}
