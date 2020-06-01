import React from "react";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import { text } from "@storybook/addon-knobs";

export default {
  title: "Layout",
  component: Layout,
};

export const loggedOutEmpty = () => {
  return <Layout />;
};

export const loggedInWithContentInContainer = () => {
  const content = text("Sample Content", "Weekly Meal Planner goes here");
  const name = text("Name", "Phill Conrad");
  const picture = text(
    "Image URL",
    "https://avatars3.githubusercontent.com/u/1119017"
  );
  const user = { name, picture };
  return (
    <Layout user={user}>
      <Container className="py-3">{content}</Container>
    </Layout>
  );
};
