/* eslint-disable react/prop-types */
import { Search } from "lucide-react";

export function SearchBar({ onClick, onChange }) {
  return (
    <div className="flex gap-4 items-center justify-center">
      <input
        type="text"
        placeholder="Enter a city..."
        className="input input-bordered w-full max-w-xs text-black"
        onChange={onChange}
      />
      <div className="btn btn-circle">
        <Search onClick={onClick} />
      </div>
    </div>
  );
}
