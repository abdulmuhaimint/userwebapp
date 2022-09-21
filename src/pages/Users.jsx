import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { fetchUsers } from "../api/user";
import UserCard from "../components/UserCard/UserCard";
import classes from "./Users.module.css";

let limit = 4;

function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    (async () => {
      const { data, headers } = await fetchUsers(page + 1, limit);
      if (headers["x-total-count"]) {
        let total_count = headers["x-total-count"];
        let pagecount = Math.ceil(total_count / limit);
        setPageCount(pagecount);
      }
      setUsers(data);
    })();
  }, [page]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  return (
    <div style={{ padding: "0rem 2rem" }}>
      <h1 style={{ textAlign: "center" }}>Users</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: "1rem",
        }}
      >
        {users.map((user) => (
          <UserCard
            {...user}
            key={user.id.toString()}
            onClick={() => {
              console.log({ user });
            }}
          />
        ))}
      </div>
      {/* Pagination component */}
      <div className={classes.container}>
        <div className={classes.leftArrow} onClick={() => setPage(0)}>
          {"<<"}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          activeClassName={classes.activePage}
          forcePage={page}
        />
        <div
          className={classes.rightArrow}
          onClick={() => {
            setPage(() => (pageCount > 0 ? pageCount - 1 : pageCount));
          }}
        >
          {">>"}
        </div>
      </div>
    </div>
  );
}

export default Users;
