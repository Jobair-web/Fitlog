'use client';

import { SortOption } from '@/types/workout';

interface Props {
  currentSort: SortOption;
  onSortChange: (option: SortOption) => void;
}

export default function SortDropdown({ currentSort, onSortChange }: Props) {
  return (
    <select
      value={currentSort}
      onChange={(e) => onSortChange(e.target.value as SortOption)}
      className="select select-bordered select-sm w-full max-w-xs"
    >
      <option value="default">Sort by: Default</option>
      <option value="duration-asc">Duration (Shortest First)</option>
      <option value="duration-desc">Duration (Longest First)</option>
      <option value="calories-desc">Calories Burned (High to Low)</option>
    </select>
  );
}