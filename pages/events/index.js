import { Fragment } from "react";
import EventSearch from "../../components/events/EventSearch";
import EventsList from "../../components/events/EventsList";
import { getAllEvents } from "../../dummy-data";
import { useRouter } from "next/router";

const EventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();
  const searchHandler = (year, month) => {
    const path = `events/${year}/${month}`;
    router.push(path);
  };
  return (
    <Fragment>
      <EventSearch onSearch={searchHandler} />
      <EventsList items={events} />
    </Fragment>
  );
};

export default EventsPage;
