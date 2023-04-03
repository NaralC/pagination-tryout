import {  useState } from "react";
import { usePagination, useClickOutside, useHotkeys } from "@mantine/hooks";

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
  const [isEditingPageNumber, setIsEditingPageNumber] =
    useState<boolean>(false);
  const clickOutsideRef = useClickOutside(() => {
    setIsEditingPageNumber(false);
  });

  const pagination = usePagination({
    total: Math.ceil(mockResults.length / ITEMS_PER_PAGE),
    initialPage: 1,
    onChange: (page) => {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;

      setVisibleResults(mockResults.slice(start, end));
    },
  });

  useHotkeys([
    ["ArrowLeft", pagination.previous],
    ["ArrowRight", pagination.next],
  ]);

  return (
    <div className="flex flex-col justify-center h-screen gap-5 text-3xl text-center align-middle">
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
        <button onClick={pagination.first}>&lt;&lt;</button>
        <button onClick={pagination.previous}>&lt;</button>
        {!isEditingPageNumber ? (
          <div
            onClick={() => {
              setIsEditingPageNumber(true);
            }}
          >
            {pagination.active}
          </div>
        ) : (
          <div ref={clickOutsideRef}>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter")
                console.log()
                  pagination.setPage(Number(e.currentTarget.value));
              }}
              type="number"
              className="w-12 text-center"
              defaultValue={pagination.active}
              min={"1"}
              max={String(pagination.range).at(-1)}
            />
          </div>
        )}

        <button onClick={pagination.next}>&gt;</button>
        <button onClick={pagination.last}>&gt;&gt;</button>
      </div>
    </div>
  );
}

export default App;
