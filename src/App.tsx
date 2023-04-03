import { useState } from "react";
import {
  usePagination,
  useClickOutside,
  getHotkeyHandler,
  useHotkeys,
} from "@mantine/hooks";

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
  const clickOutsideRef = useClickOutside(() => setIsEditingPageNumber(false));

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
          <input
            onKeyDown={(e) => {
              getHotkeyHandler([
                [
                  "Enter",
                  () => {
                    // console.log(Number(e.currentTarget.value))
                    pagination.setPage(1);
                  },
                ],
              ]);
            }}
            type="number"
            className="w-12 text-center"
            ref={clickOutsideRef}
            defaultValue={pagination.active}
            max={String(pagination.range).at(-1)}
          />
        )}

        <button onClick={pagination.next}>&gt;</button>
        <button onClick={pagination.last}>&gt;&gt;</button>
      </div>
    </div>
  );
}

export default App;
