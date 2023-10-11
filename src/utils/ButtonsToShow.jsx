import {
  IconArrowBigLeftFilled,
  IconArrowBigRightFilled,
} from "@tabler/icons-react";
import { PreviousNextButton } from "./PreviousNextButton";

export const ButtonsToShow = ({
  pageStart,
  pageEnd,
  currentPage,
  setCurrentPage,
  pages,
}) => {
  return (
    <>
      <ul className="text-lg flex gap-3 justify-center flex-wrap">
        {pageStart > 1 && (
          <PreviousNextButton
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            icon={<IconArrowBigLeftFilled />}
            sign={"-"}
          />
        )}

        {Array.from({ length: pageEnd - pageStart + 1 }).map((_, index) => {
          const page = pageStart + index;
          return (
            <li key={index}>
              <button
                className={`text-blasck font-semibold p-2 rounded-xl ${
                  page === currentPage
                    ? "bg-yellow-200"
                    : "bg-white hover:bg-slate-300 "
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          );
        })}

        {pageEnd < pages.length && (
          <PreviousNextButton
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            icon={<IconArrowBigRightFilled />}
            sign={"+"}
          />
        )}
      </ul>
      <span className="text-white text-center font-semibold">
        <span className="text-blue-400">{currentPage}</span> of{" "}
        <span className="text-blue-400">{pages.length}</span>
      </span>
    </>
  );
};
