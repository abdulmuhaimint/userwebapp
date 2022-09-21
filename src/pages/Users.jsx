import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { fetchUsers } from "../api/user";
import UserCard from "../components/UserCard/UserCard";
import classes from "./Users.module.css";

let limit = 4;

function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    (async () => {
      const { data, headers } = await fetchUsers(page, limit);
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
    <div style={{ padding: "2rem 2rem" }}>
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
          <UserCard {...user} key={user.id.toString()} />
        ))}
      </div>
      <div className={classes.container}>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          activeClassName={classes.activePage}
        />
      </div>
    </div>
  );
}

export default Users;
