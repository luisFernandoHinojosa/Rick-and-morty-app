export const SuggestionCard = ({ suggestion, setSearchText, setLocation,currentSuggeSelect}) => {
  return (
    <li
      onClick={() => {
        setSearchText("");//suggestion.name
        setLocation(suggestion);
      }}
      className={`cursor-pointer hover:bg-[#961105]/20 ${currentSuggeSelect&&"bg-[#961105]/20"}`}
    >
      {suggestion.name}
    </li>
  );
};
