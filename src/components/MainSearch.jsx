import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import { getJobsAction } from "../redux/actions";

const MainSearch = () => {
  const [query, setQuery] = useState("");

  const jobs = useSelector((state) => state.search.results);
  const isLoading = useSelector((state) => state.search.isLoading);
  const isError = useSelector((state) => state.search.isError);
  const errorMessage = useSelector((state) => state.search.errorMessage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    dispatch(getJobsAction(query));
  };

  return (
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1>Remote Jobs Search</h1>
          <Button onClick={() => navigate("/favourites")}>Favourites</Button>
        </Col>

        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="type and press Enter"
            />
          </Form>
        </Col>

        <Col xs={10} className="mx-auto mb-5">
          {isLoading && (
            <div className="text-center my-4">
              <Spinner animation="border" variant="primary" />
            </div>
          )}

          {isError && (
            <Alert variant="danger" className="my-3">
              {errorMessage}
            </Alert>
          )}

          {!isLoading &&
            !isError &&
            jobs.map((jobData) => <Job key={jobData._id} data={jobData} />)}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
