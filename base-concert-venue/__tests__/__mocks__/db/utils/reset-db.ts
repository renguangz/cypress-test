import { filenames, writeJSONToFile } from "@/lib/db/db-utils";
import { readFakeData } from "../../fakeData";

export const resetDB = async () => {
  // failsafe against resetting production db
  const safeToReset = process.env.DB_PATH === "test" || process.env.CYPRESS;
  if (!safeToReset) {
    console.log(
      "Warning: database reset unavailable outside test environment!"
    );
    return;
  }

  const { fakeShows, fakeBands, fakeReservations, fakeUsers } =
    await readFakeData();

  // overwrite data in files
  await Promise.all([
    writeJSONToFile(filenames.bands, fakeBands),
    writeJSONToFile(filenames.shows, fakeShows),
    writeJSONToFile(filenames.reservations, fakeReservations),
    writeJSONToFile(filenames.users, fakeUsers),
  ]);
};
