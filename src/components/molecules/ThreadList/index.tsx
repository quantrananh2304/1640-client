import React, { useState } from "react";

import { UserRole } from "~/utils/constant";
import { useThread } from "~/hooks/useThread";
import { Authorization } from "~/wrapper/Authorization";
import loadable from "~/utils/loadable";

const ThreadTable = loadable(
  () => import("~/components/molecules/ThreadList/TableThread")
);
const Filter = loadable(
  () => import("~/components/molecules/ThreadList/Filter")
);

const Threads = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 999,
    sort: "NAME_DESC",
  });
  const { data, isFetching, isLoading, refetch } = useThread(params);
  const dataThread = data?.data.threads;
  return (
    <>
      <Authorization roles={[UserRole.Admin]}>
        <Filter refetch={refetch} />
      </Authorization>

      <ThreadTable
        setParams={setParams}
        threads={dataThread}
        refetch={refetch}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </>
  );
};

export default Threads;
