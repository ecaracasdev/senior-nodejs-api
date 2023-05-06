import { extractConcentration } from "../utils/strings.utils";

describe("extractConcentration", () => {
  test("should extract concentration correctly if it's a .txt file", () => {
    expect(extractConcentration("0 uM.txt")).toBe("0uM");
    expect(extractConcentration("0 uM 001.txt")).toBe("0uM");
    expect(extractConcentration("20uM 001.txt")).toBe("20uM");
    expect(extractConcentration("20uM_001.txt")).toBe("20uM");
    expect(extractConcentration("150uM 001.txt")).toBe("150uM");
    expect(extractConcentration("150 uM_001.txt")).toBe("150uM");
    expect(extractConcentration("150 uM 001.txt")).toBe("150uM");
  });
  
  test("should extract concentration correctly if it's a .csv file", () => {
    expect(extractConcentration("0 uM.csv")).toBe("0uM");
    expect(extractConcentration("0 uM 001.csv")).toBe("0uM");
    expect(extractConcentration("20uM 001.csv")).toBe("20uM");
    expect(extractConcentration("20uM_001.csv")).toBe("20uM");
    expect(extractConcentration("150uM 001.csv")).toBe("150uM");
    expect(extractConcentration("150 uM_001.csv")).toBe("150uM");
    expect(extractConcentration("150 uM 001.csv")).toBe("150uM");
  });
  
  test("should return null for invalid input", () => {
    expect(extractConcentration("0.txt")).toBeNull();
    expect(extractConcentration("")).toBeNull();
    expect(extractConcentration("uM.txt")).toBeNull();
    expect(extractConcentration("20uM_001.")).toBeNull();
    expect(extractConcentration("20uM_001.abc")).toBeNull();
  });
});
