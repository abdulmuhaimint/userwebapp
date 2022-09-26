import React, { useCallback, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import UserCard from "../components/UserCard/UserCard";
import classes from "./Users.module.css";
import { useNavigate } from "react-router-dom";
import { debounce } from "../helpers/helpers";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  getUsersByName,
  setPage,
  setSearchValue,
  setSortBy,
  setSortOrder,
} from "../redux/slices/usersSlice";

function Users() {
  const limit = useSelector((state) => state.users.limit);
  const users = useSelector((state) => state.users.users);
  const page = useSelector((state) => state.users.page);
  const pageCount = useSelector((state) => state.users.totalPages);
  const sortBy = useSelector((state) => state.users.sortBy);
  const sortOrder = useSelector((state) => state.users.sortOrder);
  const searchValue = useSelector((state) => state.users.searchValue);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const searchHandler = useCallback(async () => {
    try {
      if (searchValue === "") {
        dispatch(getUsers({ page, limit, sortBy, sortOrder }));
      } else {
        dispatch(
          getUsersByName({ page, limit, sortBy, sortOrder, searchValue })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [page, searchValue, sortBy, sortOrder, dispatch, limit]);

  //search effect
  useEffect(() => {
    debounce(async () => {
      dispatch(setPage(0));
      await searchHandler();
    }, 300);
  }, [searchValue, dispatch]);

  //rest effect

  useEffect(() => {
    (async () => {
      await searchHandler();
    })();
  }, [page, sortBy, sortOrder]);

  const handlePageClick = (event) => {
    dispatch(setPage(event.selected));
  };

  return (
    <div style={{ padding: "0rem 2rem" }}>
      <h1 style={{ textAlign: "center", margin: "0.5rem" }}>Users</h1>
      <div className={classes.filterContainer}>
        <input
          placeholder="Search by name"
          onChange={(e) => dispatch(setSearchValue(e.target.value))}
        />
        <label htmlFor="sortby">Sort by:</label>
        <select
          id="sortby"
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
        >
          <option value={"createdAt"}>createdAt</option>
          <option value={"age"}>age</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => dispatch(setSortOrder(e.target.value))}
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
        <div className={classes.leftArrow} onClick={() => dispatch(setPage(0))}>
          {pageCount > 0 && "<<"}
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
            dispatch(
              setPage(() => (pageCount > 0 ? pageCount - 1 : pageCount))
            );
          }}
        >
          {pageCount > 0 && ">>"}
          <Link to={"/users/create"} className={classes.createButton}>
            Create new user
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Users;
