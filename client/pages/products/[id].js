import React, { useEffect, useState } from "react";

import { withRouter } from "next/router";

import { store } from "../../data/store";

const details = ({
  router: {
    query: { id },
  },
}) => {
  const [dId, setDid] = useState("");

  useEffect(() => {
    if (id) {
      setDid(id);
    } else {
      setDid("");
    }
  }, [id, setDid]);

  const res = store.find((x) => x.id === Number(dId));

  return <div>details {res?.nombre}</div>;
};

export default withRouter(details);
