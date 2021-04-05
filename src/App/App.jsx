import { useState, useEffect } from "react";

import styles from "./app.module.scss";

import CustomTable from "../components/CustomTable.component";

const INITIAL_HEADERS_STATE = [
  { dataIndex: "name", title: "Name", width: 120, sorter: true },
  { dataIndex: "rate", title: "Rating", width: 120, sorter: true },
];
const INITIAL_DATA_STATE = [
  { name: "React", rate: 120, id: 1 },
  { name: "Vue", rate: 130, id: 2 },
];

const App = () => {
  const [headers, setHeaders] = useState(INITIAL_HEADERS_STATE);
  const [data, setData] = useState(INITIAL_DATA_STATE);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const payload = [
      { name: "Angular", rate: 50, id: 3 },
      { name: "JQuery", rate: 10, id: 4 },
    ];

    if (scrollY > 1 && isFetching) {
      setData([...data, ...payload]);
      setIsFetching(false);
    }
  };

  return (
    <div className={styles.container}>
      <CustomTable
        setData={setData}
        headers={headers}
        data={data}
        defaultSorting="rate"
      />
    </div>
  );
};

export default App;
