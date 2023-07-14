import { Fragment } from "react";
import EventSearch from "../../components/events/EventSearch";
import EventsList from "../../components/events/EventsList";
import { getAllEvents } from "../../helpers/api-util";
import { useRouter } from "next/router";
import Head from "next/head";

const EventsPage = (props) => {
  const { events } = props;

  const router = useRouter();
  const searchHandler = (year, month) => {
    const path = `events/${year}/${month}`;
    router.push(path);
  };
  return (
    <Fragment>
      <Head>
        <title>All Events page</title>
        <meta
          name="description"
          content="you can find all events you looking for here !"
        />
      </Head>
      <EventSearch onSearch={searchHandler} />
      <EventsList items={events} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
export default EventsPage;
