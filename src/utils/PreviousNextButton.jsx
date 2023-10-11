export const PreviousNextButton = ({currentPage,setCurrentPage, icon, sign}) => {
  return (
    <li>
      <button
        className="text-white font-semibold p-2 bg-purple-400 rounded-lg hover:bg-purple-700 "
        onClick={() => setCurrentPage(
            sign === '+' ? currentPage + 1 : sign === '-' ? currentPage - 1 : currentPage
          )}
      >
        {icon}
      </button>
    </li>
  );
};
