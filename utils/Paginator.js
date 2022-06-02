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
} from "firebase/firestore";

import { Button, HStack } from "@chakra-ui/react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RepeatIcon,
} from "@chakra-ui/icons";

import { useModality } from "../hooks/useModality";

import { listDataCategory } from "../actions/category";

const Paginator = ({ list, firstVisible, lastVisible, window, word }) => {
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
    const q = query(
      collection(db, window),
      orderBy(word, "asc"),
      endBefore(firstVisible),
      limit(2)
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, 2);

      if (data.length === 0) {
        return setModality(true);
      } else {
        handleModality();
        dispatch(listDataCategory(data));
      }
    });
  }, [dispatch, firstVisible, lastVisible, window, word]);

  const previous = useCallback(() => {
    const q = query(
      collection(db, window),
      orderBy(word, "asc"),
      endBefore(firstVisible),
      limitToLast(2)
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, 2);

      if (data.length !== 0) {
        dispatch(listDataCategory(data));
      }
    });
  }, [dispatch, firstVisible, lastVisible, window, word]);

  const next = useCallback(() => {
    const q = query(
      collection(db, window),
      orderBy(word, "asc"),
      startAfter(lastVisible),
      limit(2)
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, 2);

      if (data.length !== 0) {
        handleModality();
        dispatch(listDataCategory(data));
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
