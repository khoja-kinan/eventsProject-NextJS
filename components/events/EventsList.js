import React from "react";
import EventItem from "./EventItem";
import classes from "./EventList.module.css";
const EventsList = (props) => {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <EventItem key={item.id} event={item} />
      ))}
    </ul>
  );
};

export default EventsList;
