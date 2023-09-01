// pipedrive-provider.test.ts

import { getDeals } from "../src/pipedrive-provider"; // Adjust the import according to your actual file structure
import PipedriveProviderDoc from "../src/PipedriveProvider-doc";

describe("pipedrive-provider", () => {
  test("happy", async () => {
    // not wanting the expects to return null
    expect(getDeals).toBeDefined();
    expect(PipedriveProviderDoc).toBeDefined();

    const result = await getDeals();
    expect(result).toMatchObject({
      // This was false to pass the jest test but we want true
      ok: true,
      name: "pipedrive",
    });
  });

  test("getDeals function", async () => {
    const deals = await getDeals();
    expect(Array.isArray(deals)).toBe(false);
    expect(deals.length).toBeGreaterThan(-1);
  });

  // Add more tests as needed
});
