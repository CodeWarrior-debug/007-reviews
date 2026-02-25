import prisma from "../../lib/prisma";
import { syncMovies } from "../../lib/syncMovies";

const VALID_SORT_FIELDS = [
  "releaseDate",
  "voteAverage",
  "voteCount",
  "popularity",
  "revenue",
  "budget",
  "runtime",
  "bondActor",
  "title",
];

export default async function handler(req, res) {
  try {
    // Sync TMDB data into Postgres
    await syncMovies();

    // Parse sort params from query string
    const sortBy = VALID_SORT_FIELDS.includes(req.query.sortBy)
      ? req.query.sortBy
      : "releaseDate";
    const order = req.query.order === "desc" ? "desc" : "asc";

    const movies = await prisma.movie.findMany({
      orderBy: { [sortBy]: order },
    });

    // Serialize BigInt fields to strings for JSON
    const serialized = movies.map((m) => ({
      ...m,
      budget: m.budget.toString(),
      revenue: m.revenue.toString(),
    }));

    res.status(200).json(serialized);
  } catch (error) {
    console.error("Failed to sync/fetch movies:", error);
    res.status(500).json({ error: "Failed to load movies" });
  }
}
