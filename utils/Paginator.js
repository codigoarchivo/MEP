import React, { useCallback, useEffect } from "react";

import { useDispatch } from "react-redux";

import { db } from "../firebase/config";

import {
  collection,
  endBefore,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

import { Button, HStack } from "@chakra-ui/react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RepeatIcon,
} from "@chakra-ui/icons";

import { useModality } from "../hooks/useModality";

const Paginator = ({
  list,
  firstVisible,
  lastVisible,
  window,
  word,
  newList,
  nLimit,
  // ordenar
  orHome,
  orPrevious,
  orNext,
  uid,
}) => {
  // dispatch
  const dispatch = useDispatch();
  // modality
  const { modality, setModality } = useModality(true);
  // modality
  const { modality: modality2, setModality: setModality2 } = useModality();
  // modality
  const { modality: modality3, setModality: setModality3 } = useModality(true);

  useEffect(() => {
    if (list.length > 25) {
      setModality(true);
      setModality2(true);
      setModality3(true);
    }
  }, [list, setModality, setModality2, setModality3]);

  const home = useCallback(() => {
    let q = "";
    if (uid !== undefined) {
      q = query(
        collection(db, window),
        where("uid", "==", uid),
        where(word, "!=", "0"),
        orderBy(word, "desc"),
        endBefore(firstVisible),
        limit(nLimit)
      );
    } else {
      q = query(
        collection(db, window),
        orderBy(word, orHome),
        endBefore(firstVisible),
        limit(nLimit)
      );
    }

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, nLimit);

      if (data.length === 0) {
        return setModality(true);
      } else {
        handleModality();
        dispatch(newList(data));
      }
    });
  }, [dispatch, firstVisible, lastVisible, window, word]);

  const previous = useCallback(() => {
    let q = "";
    if (uid !== undefined) {
      q = query(
        collection(db, window),
        where("uid", "==", uid),
        where(word, "!=", "0"),
        orderBy(word, "desc"),
        endBefore(firstVisible),
        limitToLast(nLimit)
      );
    } else {
      q = query(
        collection(db, window),
        orderBy(word, orPrevious),
        endBefore(firstVisible),
        limitToLast(nLimit)
      );
    }

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, nLimit);

      if (data.length !== 0) {
        dispatch(newList(data));
      }
    });
  }, [dispatch, firstVisible, lastVisible, window, word]);

  const next = useCallback(() => {
    let q = "";
    if (uid !== undefined) {
      q = query(
        collection(db, window),
        where("uid", "==", uid),
        where(word, "!=", "0"),
        orderBy(word, "desc"),
        startAfter(lastVisible),
        limit(nLimit)
      );
    } else {
      q = query(
        collection(db, window),
        orderBy(word, orNext),
        startAfter(lastVisible),
        limit(nLimit)
      );
    }

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, nLimit);

      if (data.length !== 0) {
        handleModality();
        dispatch(newList(data));
      }
    });
  }, [dispatch, firstVisible, lastVisible, window, word]);

  const handleModality = () => {
    setModality(false);
    setModality2(false);
    setModality3(false);
  };

  return (
    <HStack spacing={10} justifyContent={"center"} mt={10}>
      <Button
        onClick={home}
        disabled={modality}
        variant={"primary"}
        cursor="pointer"
        rounded="3xl"
        background={"transparent"}
        p={1}
      >
        <RepeatIcon />
      </Button>
      <Button
        onClick={previous}
        disabled={modality3}
        variant={"primary"}
        cursor="pointer"
        rounded="3xl"
        background={"transparent"}
        p={1}
      >
        <ChevronLeftIcon w={6} h={6} />
      </Button>
      <Button
        onClick={next}
        disabled={modality2}
        variant={"primary"}
        cursor="pointer"
        rounded="3xl"
        background={"transparent"}
        p={1}
      >
        <ChevronRightIcon w={6} h={6} />
      </Button>
    </HStack>
  );
};

export default Paginator;
