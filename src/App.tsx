import { useState } from "react";
import { usePagination } from "@mantine/hooks";

const ITEMS_PER_PAGE = 5;
const mockResults = [
  "Sensei Senseless",
  "Jamal",
  "Ben Dover",
  "Jack Menough",
  "Timothy Bichboy",
  "Glenn Treafuker",
  "Chad Thundercock",
  "Rajesh Hsejar",
  "Caleb Cantroast",
  "Chase Wood",
  "Ray Cist",
  "Jack Hoffmen",
  "E. Norma Scock",
  "Vye Brator",
  "Noah Dultin",
  "Emily Wokerson",
  "Kent Taekehent",
  "Justin Case",
];

function App() {
  const [visibleResults, setVisibleResults] = useState<string[]>(
    mockResults.slice(0, ITEMS_PER_PAGE)
  );

  const pagination = usePagination({
    total: Math.ceil(mockResults.length / ITEMS_PER_PAGE),
    initialPage: 1,
    onChange: (page) => {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;

      setVisibleResults(mockResults.slice(start, end));
    },
  });

  return (
    <div className="h-screen text-center flex flex-col justify-center align-middle gap-5 text-3xl">
      <div>
        {visibleResults.map((result, idx) => {
          return (
            <div key={idx} className="my-5">
              {result}
            </div>
          );
        })}
      </div>
      <div>——————————</div>
      <div className="flex justify-center gap-5">
        <button onClick={pagination.previous}>&lt;</button>
        <div>Current page: {pagination.active}</div>
        <button onClick={pagination.next}>&gt;</button>
      </div>
    </div>
  );
}

export default App;
