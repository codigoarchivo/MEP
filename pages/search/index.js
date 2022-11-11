import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { Box, Container } from "@chakra-ui/react";

import ShopLayout from "../../components/layout/ShopLayout";

import { serchProductList } from "../../actions/product";

import { Paginator } from "../../utils/Paginator";

import { dbProducts } from "../../data/dbProducts";

import { dbSerchAll, dbSerchSelect } from "../../data/dbSerch";

import SearchBase from "../../components/search/SerchBase";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export async function getServerSideProps(ctx) {
  const locale = ctx.locale === "en-US" ? "na.en" : "na.es";

  ctx.res.setHeader("Cache-Control", "public, max-age=86400, must-revalidate");

  const [productSelect, product] = await Promise.all([
    dbSerchSelect(locale, ctx.query.q),
    dbSerchAll(15),
  ]);

  if (product.length === 0 && productSelect.length === 0) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product: productSelect !== null ? productSelect : product,
    },
  };
}

const Search = ({ product }) => {
  // useDispatch
  const dispatch = useDispatch();
  // selector
  const { listSerch } = useSelector(({ serch }) => serch);
  // selector
  const { listData } = useSelector(({ list }) => list);
  // useRouter
  const { locale, query } = useRouter();
  // data
  const [dataAll, setDataAll] = useState([]);

  useEffect(() => {
    if (Object.entries(query).length === 0) {
      dispatch(serchProductList(product));
    } else {
      dispatch(serchProductList(dataAll));
    }
  }, [dispatch, product, dataAll, query]);

  useMemo(() => {
    const serchProductSelector = async () => {
      let newData = [];
      if (!!query.q) {
        newData = listData.filter(
          ({ na }) => na.es === query.q || na.en === query.q
        );
      }

      if (!!query.n) {
        newData = await dbProducts(query.n, "dbProSeven");
      }

      if (!!query.min && !!query.max) {
        newData = await dbProducts(
          "",
          "dbProSix",
          Number(query.min),
          Number(query.max)
        );
      }

      setDataAll(newData);
    };
    serchProductSelector();
  }, [query, listData]);

  return (
    <ShopLayout title={locale === "en-US" ? en.search.sI : es.search.sI}>
      <Container maxW="container.xs">
        <SearchBase product={product} />

        <Box>
          {listSerch.length > 0 && (
            <Paginator
              window={"serchs"}
              word={"cre"}
              list={listSerch}
              firstVisible={listSerch[0].cre}
              lastVisible={listSerch[listSerch.length - 1].cre}
              newList={serchProductList}
              nLimit={4}
              orHome={"desc"}
              orPrevious={"desc"}
              orNext={"desc"}
            />
          )}
        </Box>
      </Container>
    </ShopLayout>
  );
};

Search.propTypes = {
  product: PropTypes.array,
};

export default Search;
