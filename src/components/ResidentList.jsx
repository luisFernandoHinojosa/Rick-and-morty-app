import { useEffect, useState } from "react";
import { ResidentCard } from "./ResidentCard";
import  {paginationLogic}  from "../utils/pagination";

export const ResidentList = ({ residents }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {residentsInPage, pages} = paginationLogic(currentPage, residents)

  useEffect(()=>{
    setCurrentPage(1)
  },[residents])
  console.log("residentes ",residents)

  return (
    <section className="overflow-hidden bg2">
      <div>
        <img src="" alt="" />
      </div>
      <section className="grid grid-cols-[repeat(auto-fit,_280px)] justify-center gap-6 max-w-[1000px] py-10 mx-auto">
        {/* justify-center */}
        {residentsInPage.map((resident) => (
          <ResidentCard key={resident} residentEndpoint={resident} />
        ))}
      </section>

      <ul className="text-lg flex gap-3 justify-center flex-wrap pb-10">
        {pages.map((page) => (
          <li key={page}>
            <button className={`text-black p-2 ${page === currentPage?("bg-green-400"):"bg-white"}`} onClick={() => setCurrentPage(page)}>{page}</button>
          </li>
        ))}
      </ul>
    </section>
  );
};
