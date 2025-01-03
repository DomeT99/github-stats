import { FC } from "react";
import {
  PullRequestState,
  RepositoryOrder,
  RepositoryRenderFormat,
} from "@/types/github";

type ReposFiltersProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  pullRequestState: PullRequestState;
  setpullRequestState: React.Dispatch<React.SetStateAction<PullRequestState>>;
  repositoriesOrder: RepositoryOrder;
  setRepositoriesOrder: React.Dispatch<React.SetStateAction<RepositoryOrder>>;
  baseYear: number;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  format: RepositoryRenderFormat;
  setFormat: React.Dispatch<React.SetStateAction<RepositoryRenderFormat>>;
  hideOwnRepo: boolean;
  setHideOwnRepo: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ReposFilters: FC<ReposFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  pullRequestState,
  setpullRequestState,
  repositoriesOrder,
  setRepositoriesOrder,
  baseYear,
  year,
  setYear,
  format,
  setFormat,
  hideOwnRepo,
  setHideOwnRepo,
}) => {
  const YEARS_RANGE = 4;
  const FORMAT_OPTIONS = ["cards", "text", "json"] as const;

  const handleYearChange = (selectedYear: number) => {
    setYear(selectedYear);
  };

  const handleFormatChange = (selectedFormat: RepositoryRenderFormat) => {
    setFormat(selectedFormat);
  };

  const handleHideOwnRepoChange = () => {
    setHideOwnRepo((prevHideOwnRepo) => !prevHideOwnRepo);
  };

  const handlePullRequestStateChange = (selectedState: PullRequestState) => {
    setpullRequestState(selectedState);
  };

  const handleRepositoriesOrderChange = (selectedOrder: RepositoryOrder) => {
    setRepositoriesOrder(selectedOrder);
  };

  return (
    <div className="flex justify-between sm:gap-0 sm:flex-row flex-col gap-3">
      <div className="sm:text-left text-center">
        <div>Select Year</div>
        <div className="join">
          {Array.from({ length: YEARS_RANGE }).map((_, i) => {
            const radioYear = baseYear - YEARS_RANGE + i + 1;
            return (
              <input
                key={i}
                className="join-item btn"
                type="radio"
                name="year"
                aria-label={radioYear.toString()}
                onChange={() => handleYearChange(radioYear)}
                checked={year === radioYear}
              />
            );
          })}
        </div>
        <div className="sm:flex-row flex-col flex">
          <div className="my-5 mr-2 flex flex-col sm:items-start items-center">
            <label className="mb-2">Search</label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="my-5 mr-2 flex flex-col sm:items-start items-center">
            <label className="mb-2">State of PR</label>
            <select
              className="select select-bordered w-full max-w-md"
              value={pullRequestState}
              onChange={(e) =>
                handlePullRequestStateChange(e.target.value as PullRequestState)
              }
            >
              <option value={null!} selected></option>
              <option value="OPEN">Open</option>
              <option value="MERGED">Merged</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
          <div className="my-5 flex flex-col sm:items-start items-center">
            <label className="mb-2">Order by</label>
            <select
              className="select select-bordered w-full max-w-md"
              value={repositoriesOrder}
              onChange={(e) =>
                handleRepositoriesOrderChange(e.target.value as RepositoryOrder)
              }
            >
              <option value="OWNER">Owner</option>
              <option value="REPOSITORY">Repository</option>
              <option value="PRASCENDING">N° PR Ascending</option>
              <option value="PRDESCENDING" selected>
                N° PR Descending
              </option>
            </select>
          </div>
        </div>

        <div className="flex sm:items-start items-center justify-center md:justify-start">
          <input
            type="checkbox"
            name="hide-own-repo"
            checked={hideOwnRepo}
            onChange={handleHideOwnRepoChange}
            className="checkbox checkbox-sm checkbox-primary"
          />
          <label className="ml-2">Hide own repositories</label>
        </div>
      </div>

      <div className="sm:text-right text-center">
        <div>Select Format</div>
        <div className="join">
          {FORMAT_OPTIONS.map((formatOption: RepositoryRenderFormat) => (
            <input
              key={formatOption}
              className="join-item btn"
              type="radio"
              name="format"
              aria-label={formatOption}
              onChange={() => handleFormatChange(formatOption)}
              checked={format === formatOption}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
