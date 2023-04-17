import React from "react";

import Svg from "~/components/atoms/Svg";
import { DATE, departmentStatusIcon } from "~/utils/constant";
import { format } from "date-fns";

import styles from "./styles.module.scss";
import { toggleDepartmentStatus } from "~/api/department";

interface Props {
  item: any;
  afterSuccess?: () => void;
  refetch: any;
}

function Department(props: Props) {
  const { item } = props;

  const handleToggleStatus = async () => {
    const { _id, status } = item;

    try {
      const res = await toggleDepartmentStatus(
        _id,
        status === "ACTIVE" ? "deactivate" : "activate"
      );

      if (res && res.errorCode === 0 && !res.errors.length) {
        props.refetch();
      } else {
        // make error toast
      }
    } catch (error) {
      // make error toast
    }
  };

  return (
    <>
      <div className={styles.departmentContainer}>
        <div className={styles.info}>
          <div className={styles.name}>
            {item?.name ?? ""}
            <Svg
              className={styles.iconActive}
              src={departmentStatusIcon[item.status]}
              alt="status"
            />
          </div>

          <div className={styles.content}>{item?.description}</div>

          <div className={styles.infoGroup}>
            <div className={styles.dateRange}>
              {format(new Date(item?.createdAt), DATE) ?? "-"}
            </div>
          </div>
        </div>

        <div className={styles.btnEdit} onClick={handleToggleStatus}>
          {item.status === "ACTIVE" ? "Deactivate" : "Activate"}
        </div>
      </div>
    </>
  );
}

export default Department;
