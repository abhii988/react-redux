import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./shop.css";
import {
  deleteItem,
  edit,
  dataLoader,
  getUser,
  errors,
} from "../redux/actions";
import { store } from "../redux/store";
import { Table, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import DeleteConfirmation from "./DeleteConfirmation";
import Count from "./Count";
//https://picsum.photos/500?random=1

const Shop = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.totalItems);
  const add = () => {
    navigate("/shop/add");
  };
  // console.log(data, "data");
  const [activeLink, setActiveLink] = useState();
  const fetchButton = () => {
    store.dispatch(errors(null));
    store.dispatch(getUser());
    // store.dispatch(fetchData()).catch((err) => {
    //   setError(err.message);
    // });
    store.dispatch(dataLoader(true));
  };
  const handleDelete = (id) => {
    store.dispatch(deleteItem({ id: id }));
    setShow(false);
  };
  const handleEdit = (item) => {
    store.dispatch(edit(item));
    navigate(`/shop/edit/${item.id}`);
  };
  let value = [{ id: "" }];
  value = [data.items[0]];

  const icons = [
    "fas fa-circle-user fa-2x",
    "fas fa-envelope-open-text fa-2x",
    "fas fa-mobile-screen fa-2x",
    "fas fa-calendar-alt fa-2x",
    "fas fa-solid fa-location-dot fa-2x",
    "fas fa-lock fa-2x",
  ];
  const activeLinkHandler = (index) => {
    setActiveLink(index);
  };
  const Phrase = ({ user }) => {
    const phrases = [
      `Hi! My name is ${user.fname} ${user.lname}.`,
      `My email is ${user.email}.`,
      `My phone number is ${user.phone}.`,
      `My DOB is ${user.dob}.`,
      `My address is ${user.city}, ${user.country}.`,
      `My username is "${user.username}" & password is "${user.password}".`,
    ];
    return <h3 className="phrase">{phrases[activeLink]}</h3>;
  };
  //Delete Confirmation Code:
  const [show, setShow] = useState(false);
  const [toDelete, setToDelete] = useState("");
  const handleClose = () => setShow(false);
  const showDeleteModal = (item) => {
    setToDelete(item);
    setShow(true);
  };
  //Delete Confirmation
  //Pagination Code:
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(data.items.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  //Pagination

  //Search Code
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = data.items.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(data.items);
    }
  };
  //Search

  return (
    <div className="asd">
      <h1>User's List:</h1>
      <br />
      <Button
        variant="light"
        disabled={data.isLoading}
        onClick={!data.isLoading ? fetchButton : null}
        className="btns"
      >
        {data.isLoading ? "Loading???" : "Fetch User"} &#9850;
      </Button>{" "}
      <Button variant="light" onClick={add} className="btns">
        Add User &#10011;
      </Button>{" "}
      <hr />
      <div className="control-group">
        <div className="form-control">
          <Count
            count={
              filteredResults && searchInput === ""
                ? data.items.length
                : filteredResults.length
            }
          />
          <input
            icon="search"
            placeholder="Search..."
            onChange={(e) => searchItems(e.target.value)}
            id="search"
          />
        </div>
      </div>
      {data.errorMessage === null ? (
        <div>
          {data.items.length > 0 ? (
            <div>
              {data.isLoading ? (
                <div className="loader" />
              ) : (
                <div className="app_user">
                  {value.map((val) => (
                    <div key={val.id}>
                      <Fragment>
                        <img src={val.image} alt={val.fname} />
                        <Phrase user={val} />
                        <div className="app_icons">
                          {icons.map((icon, index) => (
                            <i
                              className={icon}
                              key={index}
                              onMouseEnter={() => activeLinkHandler(index)}
                              style={
                                activeLink === index
                                  ? { color: "#f67e7e" }
                                  : null
                              }
                            ></i>
                          ))}
                        </div>
                      </Fragment>
                    </div>
                  ))}
                </div>
              )}
              <br />
              <hr />
              <Table striped hover variant="success" className="lol">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Name</th>
                    <th>E-Mail Address</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {data.items.map((item) => (*/}
                  {searchInput.length > 0 ? (
                    filteredResults.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{data.items.indexOf(item) + 1}</td>
                          <td>
                            <Link
                              to={`/shop/${item.id}`}
                              style={{ textDecoration: "underline" }}
                            >
                              {item.fname} {item.lname}
                            </Link>
                          </td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>
                            <Button
                              variant="info"
                              className="action_btn"
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="info"
                              className="action_btn"
                              // onClick={() => handleDelete(item.id)}
                              onClick={() => showDeleteModal(item)}
                            >
                              Delete
                            </Button>
                            <DeleteConfirmation
                              show={show}
                              handleClose={handleClose}
                              handleDelete={handleDelete}
                              toDelete={toDelete}
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <>
                      {data.items
                        .slice(pagesVisited, pagesVisited + usersPerPage)
                        .map((item) => {
                          return (
                            <tr key={item.id}>
                              <td>{data.items.indexOf(item) + 1}</td>
                              <td>
                                <Link
                                  to={`/shop/${item.id}`}
                                  style={{ textDecoration: "underline" }}
                                >
                                  {item.fname} {item.lname}
                                </Link>
                              </td>
                              <td>{item.email}</td>
                              <td>{item.phone}</td>
                              <td>
                                <Button
                                  variant="info"
                                  className="action_btn"
                                  onClick={() => handleEdit(item)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="info"
                                  className="action_btn"
                                  onClick={() => showDeleteModal(item)}
                                >
                                  Delete
                                </Button>
                                <DeleteConfirmation
                                  show={show}
                                  handleClose={handleClose}
                                  handleDelete={handleDelete}
                                  toDelete={toDelete}
                                />
                              </td>
                            </tr>
                          );
                        })}
                    </>
                  )}
                </tbody>
              </Table>
              <div className="pagination">
                <ReactPaginate
                  previousLabel={"Prev"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBtn"}
                  previousLinkClassName={"previousBtn"}
                  nextLinkClassName={"nextBtn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
              </div>
            </div>
          ) : (
            <h1 style={{ textAlign: "centre", display: "block" }}>no data</h1>
          )}
        </div>
      ) : (
        <h1 style={{ textAlign: "centre", display: "block" }}>
          {data.errorMessage}
        </h1>
      )}
    </div>
  );
};

export default Shop;
