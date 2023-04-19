import React, { useState } from "react";

import loadable from "~/utils/loadable";
import Svg from "~/components/atoms/Svg";
import { CampaignStatus, DATE, UserRole, campaignIcon } from "~/utils/constant";
import { compareAsc, format } from "date-fns";

import styles from "./styles.module.scss";
import { Authorization } from "~/wrapper/Authorization";
import { useNavigate } from "react-router-dom";

const ModalIdeas = loadable(
  () => import("~/components/molecules/IdeasList/ModalIdeas")
);

interface Props {
  item: any;
  afterSuccess?: () => void;
}
interface Status {
  value: "ACTIVE" | "SOFT_EXPIRED" | "EXPIRED";
}

function Thread(props: Props) {
  const { item, afterSuccess } = props;
  const [visibleModal, setVisibleModal] = useState(false);
  const navigate = useNavigate();

  const status: Status["value"] = item?.status;

  return (
    <>
      <div className={styles.threadContainer}>
        <div className={styles.info}>
          <div
            className={styles.name}
            onClick={() => navigate(`/ideas?thread=${item._id}`)}
          >
            {item?.name ?? ""}
            <Svg
              className={styles.iconActive}
              src={campaignIcon[CampaignStatus[status] ?? -1]}
              alt="status"
            />
          </div>

          <div className={styles.content}>{item?.description}</div>

          <div className={styles.infoGroup}>
            <div className={styles.dateRange}>
              {format(new Date(item?.closureDate), DATE) ?? "-"}
            </div>

            <div className={styles.divider}> &nbsp; - &nbsp; </div>

            <div className={styles.dateRange}>
              {format(new Date(item?.finalClosureDate), DATE) ?? "-"}
            </div>
          </div>
        </div>

        {compareAsc(new Date(item?.finalClosureDate), new Date()) >= 0 ? (
          <Authorization roles={[UserRole.Staff]}>
            <div
              className={styles.btnEdit}
              onClick={() => setVisibleModal(true)}
            >
              Upload idea
            </div>
          </Authorization>
        ) : null}
        <ModalIdeas
          visible={visibleModal}
          setVisible={setVisibleModal}
          campaign={item?._id}
        />
      </div>
    </>
  );
}

export default Thread;
