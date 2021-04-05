import { useState } from "react";
import styles from "./customTable.module.scss";

import { ReactComponent as ArrowDown } from "../assets/arrow-down-outline.svg";
import { ReactComponent as ArrowUp } from "../assets/arrow-up-outline.svg";

const CustomTable = (props) => {
  const { headers, setData, data, defaultSorting } = props;

  const [checkedIndexes, setCheckedIndexes] = useState({});

  const [sortingState, setSortingState] = useState({
    id: defaultSorting,
    dir: "asc",
  });

  const isAsc = sortingState.dir === "asc";

  const sortData = (sortItem, isAsc) => {
    const sortedData = data.sort((a, b) => {
      if (a[sortItem] > b[sortItem]) return isAsc ? -1 : 1;
      if (a[sortItem] < b[sortItem]) return isAsc ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    console.log("ch", checkedIndexes);
  };

  const handleSortingClick = (item) => {
    console.log("index", item.dataIndex);
    setSortingState({ id: item.dataIndex, dir: isAsc ? "desc" : "asc" });
    sortData(item.dataIndex, isAsc);
  };

  const handleCheckboxChange = (event) => {
    console.log(event.target);
    const { name, checked } = event.target;
    setCheckedIndexes({ ...checkedIndexes, [name]: checked });
  };

  const handleDelete = () => {
    const filteredData = data.filter((item) => {
      if (checkedIndexes[item.id]) return false;
      return true;
    });

    setData(filteredData);
  };

  return (
    <div>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr className={styles.row}>
            <td className={styles.column}></td>
            {headers.map((item, idx) => {
              const { sorter, dataIndex } = item;
              return (
                <td key={item.id || idx} className={styles.column}>
                  <div className={styles.headerItem}>
                    <span>{item.title}</span>
                    {sorter && dataIndex === sortingState.id && (
                      <span onClick={() => handleSortingClick(item)}>
                        {isAsc ? (
                          <ArrowDown className={styles.icon} />
                        ) : (
                          <ArrowUp className={styles.icon} />
                        )}
                      </span>
                    )}
                  </div>
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {data.map((item, idx) => {
            return (
              <tr className={styles.row} key={item.id}>
                <td className={styles.column}>
                  <input
                    type="checkbox"
                    name={item.id}
                    onChange={handleCheckboxChange}
                    value={checkedIndexes[item.id]}
                  />
                </td>
                <td className={styles.column}>{item.name}</td>
                <td className={styles.column}>{item.rate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className={styles.btn} onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CustomTable;
