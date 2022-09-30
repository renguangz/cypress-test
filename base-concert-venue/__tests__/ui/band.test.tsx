import BandPage from "@/pages/bands/[bandId]";
import { readFakeData } from "@/__tests__/__mocks__/fakeData/index";
import { render, screen } from "@testing-library/react";

test("band component displays correct band information", async () => {
  const { fakeBands } = await readFakeData();
  render(<BandPage band={fakeBands[0]} error={null} />);
  const heading = screen.getByRole("heading", { name: /The Wandering Bunnies/i });
  expect(heading).toBeInTheDocument();
});

test('band component display error', () => {
	render(<BandPage band={null} error={"Everything is fine"} />);
	const heading = screen.getByRole('heading', { name: /everything is fine/i });
	expect(heading).toBeInTheDocument();
});
