import { useEffect, useState } from "react";
import { ResidentCard } from "./ResidentCard";
import { paginationLogic } from "../utils/pagination";
import { ButtonsToShow } from "../utils/ButtonsToShow";
import { PreviousNextButton } from "../utils/PreviousNextButton";
import {
  IconArrowBigLeftFilled,
  IconArrowBigRightFilled,
} from "@tabler/icons-react";

export const ResidentList = ({ residents }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { residentsInPage, pages, pageStart, pageEnd } = paginationLogic(
    currentPage,
    residents
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [residents]);
  console.log("residentes ", residents);
  console.log("pages", pages);

  return (
    <section className="overflow-hidden bg2">
      <div className="">
        {residents.length === 0 ? (
          <div className="grid items-center  justify-center w-full h-[200px]">
            <div className="text-white text-2xl font-semibold">
              Population without residents 🥺
            </div>
          </div>
        ) : (
          <>
          <div className="grid justify-center  gap-2 mt-14">
              {
                <ButtonsToShow
                  pageStart={pageStart}
                  pageEnd={pageEnd}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pages={pages}
                />
              }
            </div>
            <section className="grid justify-center grid-cols-[repeat(auto-fit,_300px)] md:grid-cols-[repeat(auto-fit,_280px)] gap-6 max-w-[1000px] pb-10 mx-auto ">
              {residentsInPage.map((resident) => (
                <ResidentCard key={resident} residentEndpoint={resident} />
              ))}
            </section>

            <div className="grid justify-center pb-10 gap-2">
              {
                <ButtonsToShow
                  pageStart={pageStart}
                  pageEnd={pageEnd}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pages={pages}
                />
              }
            </div>
          </>
        )}
      </div>
    </section>
  );
};
