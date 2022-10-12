import React from 'react';
import { Row, Navbar, Form, Table, Dropdown, CloseButton, Container, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ItemsTable.css'

export const ItemsTable = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Filter bar */}
      <Row className='my-1 px-2'>
        <Navbar className='rounded-1' style={{ backgroundColor: "var(--bg-color-basic)" }} expand="lg">
          <Container fluid>
            <Stack direction='horizontal'>
              <Form className='d-flex col-md-10'>
                <Form.Control
                  type="search"
                  placeholder="Filter by keyword"
                  className="d-flex itemTableSearch"
                  aria-label="Search"
                  size="sm"
                />
              </Form>
              <div id="itemsFilters">
                <Dropdown className='mx-1 filterDropdown'>
                  <Dropdown.Toggle className="filters">
                    Type
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='filtersMenu'>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mx-1 filterDropdown'>
                  <Dropdown.Toggle className="filters">
                    Assigned to
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='filtersMenu'>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mx-1 filterDropdown'>
                  <Dropdown.Toggle className="filters">
                    States
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='filtersMenu'>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mx-1 filterDropdown'>
                  <Dropdown.Toggle className="filters">
                    Area
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='filtersMenu'>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mx-1 filterDropdown'>
                  <Dropdown.Toggle className="filters">
                    Tags
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='filtersMenu'>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <CloseButton className='px-3' style={{ hight: "2rem", lineHight: "2rem" }} />
              </div>
            </Stack>
          </Container>
        </Navbar>
      </Row>
      {/* table */}
      <Row className='px-2'>
        <Table responsive hover="ture" borderless onClick={() => navigate("/create/Bug")}>
          <thead>
            <tr className='tableRow'>
              <th>ID</th>
              <th>Title</th>
              <th>Assigned To</th>
              <th>State</th>
              <th>Area Path</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody className='tableBody'>
            <tr>
              <td>66</td>
              <td>test description</td>
              <td>Wilson Wu</td>
              <td>New</td>
              <td>iMooGoo</td>
              <td></td>
            </tr>
            <tr>
              <td>65</td>
              <td>This is a bug report</td>
              <td>Unassigned</td>
              <td>New</td>
              <td>iMooGoo</td>
              <td></td>
            </tr>
            <tr>
              <td>63</td>
              <td>Todo Task</td>
              <td>Unassigned</td>
              <td>New</td>
              <td>iMooGoo</td>
              <td></td>
            </tr>
          </tbody>
        </Table>

      </Row>
    </>
  )
}