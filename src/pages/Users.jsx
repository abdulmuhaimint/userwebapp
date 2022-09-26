import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { fetchUsers, fetchUsersByName } from "../api/user";
import UserCard from "../components/UserCard/UserCard";
import classes from "./Users.module.css";
import { useNavigate } from "react-router-dom";
import { debounce } from "../helpers/helpers";
import { useForm } from "react-hook-form";

let limit = 4;

function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const searchHandler = useCallback(async () => {
    try {
      let res;

      if (searchValue === "") {
        res = await fetchUsers(page + 1, limit, sortBy, sortOrder);
      } else {
        res = await fetchUsersByName(
          searchValue,
          page + 1,
          limit,
          sortBy,
          sortOrder
        );
      }

      const { data, headers } = res;

      if (headers["x-total-count"]) {
        let total_count = headers["x-total-count"];
        let pagecount = Math.ceil(total_count / limit);
        setPageCount(pagecount);
      }
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }, [page, searchValue, sortBy, sortOrder]);

  //search effect
  useEffect(() => {
    debounce(async () => {
      setPage(0);
      await searchHandler();
    }, 300);
  }, [searchValue]);

  //rest effect

  useEffect(() => {
    (async () => {
      await searchHandler();
    })();
  }, [page, sortBy, sortOrder]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  return (
    <div style={{ padding: "0rem 2rem" }}>
      <h1 style={{ textAlign: "center", margin:"0.5rem" }}>Users</h1>
      <div className={classes.filterContainer}>
        <input
          placeholder="Search by name"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <label htmlFor="sortby">Sort by:</label>
        <select
          id="sortby"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value={"createdAt"}>createdAt</option>
          <option value={"age"}>age</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value={"asc"}>asc</option>
          <option value={"desc"}>desc</option>
        </select>
      </div>
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
              navigate(`/users/${user.id}`);
            }}
          />
        ))}
      </div>
      {/* Pagination component */}
      <div className={classes.container}>
        <div className={classes.leftArrow} onClick={() => setPage(0)}>
          {pageCount > 0 &&"<<"}
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
          {pageCount > 0 &&">>"}
          <Link to={"/users/create"} className={classes.createButton}>
            Create new user
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Users;
