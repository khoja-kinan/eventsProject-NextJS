import React from "react";
import Image from "next/image";
import classes from "./EventItem.module.css";
import LinkButton from "../elements/LinkButton";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

const EventItem = (props) => {
  const { id, title, location, date, image } = props.event;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n");
  return (
    <li className={classes.item}>
      <Image src={"/" + image} alt={title} width={350} height={160} />
      {/* <img src={"/" + image} alt={title} /> */}
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>

        <div className={classes.actions}>
          <LinkButton link={`/events/${id}`}>
            Explore Event
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </LinkButton>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
