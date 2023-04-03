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
    onChange(page) {
      
    },
  });

  return (
    <div className="h-screen text-center flex flex-col justify-center align-middle gap-5">
      {visibleResults.map((person) => {
        return <div>{person}</div>;
      })}
    </div>
  );
}

export default App;
