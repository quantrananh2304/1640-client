import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useIdeas } from "~/hooks/useIdeas";
import { PARAMS_FILTER } from "~/utils/constant";
import loadable from "~/utils/loadable";

const IdeaList = loadable(
  () => import("~/components/molecules/IdeasList/List")
);
const Filter = loadable(
  () => import("~/components/molecules/IdeasList/Filter")
);

const IdeasList = () => {
  const [params, setParams] = useState({
    ...PARAMS_FILTER,
    sort: "POPULARITY_DESC",
  });
  const { data, isLoading, isFetching, refetch } = useIdeas(params);

  const [searchParam] = useSearchParams();

  const handleFilter = (value: any) => {
    setParams({
      ...PARAMS_FILTER,
      ...value,
    });
  };

  useEffect(() => {
    const thread = searchParam.get("thread");

    if (thread) {
      setParams((prev) => ({
        ...prev,
        thread: [thread],
      }));
    }
  }, []);

  return (
    <>
      <Filter
        onChange={handleFilter}
        afterSuccess={refetch}
        initialThread={searchParam.get("thread") || ""}
      />
      <IdeaList
        dataIdeas={data?.data?.ideas}
        isLoading={isLoading}
        isFetching={isFetching}
        refetch={refetch}
      />
    </>
  );
};

export default IdeasList;
