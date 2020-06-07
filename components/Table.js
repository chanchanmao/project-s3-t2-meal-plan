import { optionalAuth } from "../utils/ssr";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export const getServerSideProps = optionalAuth;

function Table(props) {
  const user = props.user;
  const mealMatrix = props.mealMatrix;

  const removeRecipe = async (e) => {
    e.preventDefault();
    await fetch("/api/meal", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day: e.target.id.slice(0, 3),
        type: e.target.id.slice(3, 9),
      }),
    });
    location.reload();
  };

  function checkDeleteButton(dayy, typee, dayString) {
    if (mealMatrix[dayy][typee].mealname) {
      return (
        <button id={dayString} onClick={removeRecipe}>
          <style jsx>
            {`
              button {
                color: black;
                background-color: lightgray;
                font-size: 12px;
                font-weight: 500;
                text-align: center;
                border: 1px solid lightgray;
                margin-left: 2px;
                margin-top: 2px;
              }
              button:hover {
                background-color: #e76969;
                border: 1px solid #e76969;
                color: white;
              }
              button:hover {
                background-color: Crimson;
              }
            `}
          </style>
          X
        </button>
      );
    }
  }

  function checkAddButton(dayy, typee, stringLink) {
    if (!mealMatrix[dayy][typee]) {
      return (
        <>
          <style jsx>
            {`
              p {
                text-align: center;
              }
              a {
                font-size: 20px;
                color: black;
                padding: 0px 2px 2px 2px;
              }
              a:hover {
                background-color: #95baee;
                font-size: 20px;
                text-decoration: none;
                padding-left: 7px;
                padding-right: 7px;
                color: white;
                font-weight: 700;
              }
            `}
          </style>
          <p>
            <a href={stringLink}>+</a>
          </p>
        </>
      );
    }
  }

  function dayBox(dayy, typee, dayString) {
    // Find the type of meal to output at top of box
    let typeName = "Breakfast";
    if (typee == 1) {
      typeName = "Lunch";
    } else {
      if (typee == 2) {
        typeName = "Dinner";
      }
    }
    // Form string for href
    let stringLink =
      "/form2?day=" + dayString.slice(0, 3) + "&type=" + dayString.slice(3, 9);
    // Return html
    return (
      <div>
        <style jsx>
          {`
            h5 {
              text-decoration: underline;
              color: #151b54;
              text-align: center;
            }
            h6 {
              font-size: 20px;
              color: #5390e3;
              text-align: center;
              positive: relative;
            }
          `}
        </style>
        <h5>{typeName}</h5>

        <h6>{mealMatrix[dayy][typee].mealname}</h6>
        {checkDeleteButton(dayy, typee, dayString)}
        {checkAddButton(dayy, typee, stringLink)}
      </div>
    );
  }

  return (
    <Container user={user}>
      {user ? (
        <>
          <style jsx>
            {`
              h3 {
                padding-top: 15px;
                width: 150px;
                color: #151b54;
                text-align: center;
              }
              td {
                vertical-align: top;
                height: 120px;
                border: 2px solid #151b54;
                background-color: white;
                text-align: center;
              }
              .clear {
                background-color: white;
                border-radius: 4px;
                padding: 7px;
                border: 2px solid #e76969;
                font-size: 16px;
                color: #e76969;
                margin-top: 10px;
                font-weight: 500;
              }
              .clear:hover {
                background-color: #e76969;
                color: white;
              }
            `}
          </style>
          <table>
            <tr>
              <th>
                <h3>MON</h3>
              </th>
              <th>
                <h3>TUES</h3>
              </th>
              <th>
                <h3>WED</h3>
              </th>
              <th>
                <h3>THUR</h3>
              </th>
              <th>
                <h3>FRI</h3>
              </th>
              <th>
                <h3>SAT</h3>
              </th>
              <th>
                <h3>SUN</h3>
              </th>
            </tr>
            <tr>
              <td>{dayBox(0, 0, "monbreak")}</td>
              <td>{dayBox(1, 0, "tuebreak")}</td>
              <td>{dayBox(2, 0, "wedbreak")}</td>
              <td>{dayBox(3, 0, "thubreak")}</td>
              <td>{dayBox(4, 0, "fribreak")}</td>
              <td>{dayBox(5, 0, "satbreak")}</td>
              <td>{dayBox(6, 0, "sunbreak")}</td>
            </tr>

            <tr>
              <td>{dayBox(0, 1, "monlunch")}</td>
              <td>{dayBox(1, 1, "tuelunch")}</td>
              <td>{dayBox(2, 1, "wedlunch")}</td>
              <td>{dayBox(3, 1, "thulunch")}</td>
              <td>{dayBox(4, 1, "frilunch")}</td>
              <td>{dayBox(5, 1, "satlunch")}</td>
              <td>{dayBox(6, 1, "sunlunch")}</td>
            </tr>

            <tr>
              <td>{dayBox(0, 2, "mondinnr")}</td>
              <td>{dayBox(1, 2, "tuedinnr")}</td>
              <td>{dayBox(2, 2, "weddinnr")}</td>
              <td>{dayBox(3, 2, "thudinnr")}</td>
              <td>{dayBox(4, 2, "fridinnr")}</td>
              <td>{dayBox(5, 2, "satdinnr")}</td>
              <td>{dayBox(6, 2, "sundinnr")}</td>
            </tr>
          </table>
          <button id="clearall" onClick={removeRecipe} className="clear">
            Clear all
          </button>
        </>
      ) : (
        <div></div>
      )}
    </Container>
  );
}
export default Table;
