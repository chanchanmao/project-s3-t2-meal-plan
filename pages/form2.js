import Layout from "../components/Layout";
import { requiredAuth } from "../utils/ssr";
import Container from "react-bootstrap/Container";
import Head from "next/head";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

export const getServerSideProps = requiredAuth;

function form2(props) {
  const router = useRouter();
  const user = props.user;
  const [username] = useState(props.user.nickname);
  const [mealname, setMealname] = useState("");
  const [day, setDay] = useState("");
  const [type, setType] = useState("");
  const [ingredients, setIngredients] = useState("");
  useEffect(() => {
    setDay(router.query.day);
    setType(router.query.type);
  }, [router.query.day, router.query.type]);
  const saveRecipe = async (e) => {
    e.preventDefault();
    if (mealname == "" || day == "" || type == "" || ingredients == "") {
      alert("Please fill out all fields");
      return;
    }
    await fetch("/api/meal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        mealname: mealname,
        day: day,
        type: type,
        ingredients: ingredients.split(/[ ,]+/),
      }),
    });
    location.reload();
    alert("Added Meal");
    window.location.href = "/";
  };

  return (
    <Layout user={user}>
      <Head>
        <title>Enter a Meal</title>
      </Head>
      <Container>
        {user ? (
          <div>
            <Head>
              <title>Enter Meal</title>
            </Head>
            <div>
              <style jsx>
                {`
                  form {
                    padding-top: 10px;
                  }
                  label {
                    padding-top: 10px;
                    font-weight: 500;
                  }
                  input,
                  textarea {
                    padding: 5px;
                    margin-left: 5px;
                    width: 500px;
                    margin-bottom: 10px;
                  }
                  select {
                    padding: 5px;
                    margin-left: 5px;
                    margin-bottom: 10px;
                  }
                  button {
                    background-color: white;
                    border-radius: 4px;
                    border: 2px solid #699ee7;
                    color: #699ee7;
                    padding: 7px;
                    font-weight: 500;
                  }
                  button:hover {
                    background-color: #699ee7;
                    color: white;
                  }
                `}
              </style>
              <form onSubmit={saveRecipe}>
                <h1>Enter a Meal </h1>
                <label htmlFor="day">Day of the Week</label>
                <br></br>
                <select
                  value={day}
                  onChange={(event) => setDay(event.target.value)}
                >
                  <option value="">Select Day</option>
                  <option value="mon">Monday</option>
                  <option value="tue">Tuesday</option>
                  <option value="wed">Wednesday</option>
                  <option value="thu">Thursday</option>
                  <option value="fri">Friday</option>
                  <option value="sat">Saturday</option>
                  <option value="sun">Sunday</option>
                </select>
                <br></br>
                <label htmlFor="meal">Meal of the Day</label>
                <br></br>
                <select
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                >
                  <option value="">Select Meal</option>
                  <option value="break">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinnr">Dinner</option>
                </select>
                <br></br>
                <label htmlFor="name">Name of Recipe</label>
                <br></br>
                <input
                  value={mealname}
                  onChange={(event) => setMealname(event.target.value)}
                  type="text"
                  placeholder="Name of Recipe"
                  name="name"
                  required
                ></input>
                <br></br>

                <label htmlFor="ingredients">Ingredients</label>
                <br></br>
                <textarea
                  value={ingredients}
                  onChange={(event) => setIngredients(event.target.value)}
                  type="textarea"
                  placeholder="Ingredients required for the recipe"
                  name="ingredients"
                  required
                ></textarea>
                <br></br>
                <button type="submit" variant="outline-primary">
                  Add to Planner
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </Container>
    </Layout>
  );
}

export default form2;
