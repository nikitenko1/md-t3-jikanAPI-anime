import React, { useState } from "react";
import useSWR from "swr";
import { useLocalStorage } from "usehooks-ts";
import { API_ENDPOINT } from "./api/anime";
import Container from "components/Container";
import TopComponent from "components/TopComponent";
import fetcher from "helper/fetcher";

const TopManga = () => {
  const [page, setPage] = useLocalStorage("page", 1);

  const [filter, setFilter] = useState("");

  const { data: topManga } = useSWR(
    `${API_ENDPOINT}top/manga?page=${page}&${filter}?{filter=${filter}`,
    fetcher
  );

  return (
    <Container>
      <TopComponent
        filter={filter}
        setFilter={setFilter}
        page={page}
        setPage={setPage}
        item={topManga?.data}
        isManga={true}
      />
    </Container>
  );
};

export default TopManga;
