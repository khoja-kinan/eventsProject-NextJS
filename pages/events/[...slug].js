import { useRouter } from "next/router";
import useSWR from "swr";
// import { getFilteredEvents } from "../../helpers/api-util";
import EventsList from "../../components/events/EventsList";
import { Fragment, useEffect, useState } from "react";
import ResultsTitle from "../../components/events/ResultsTitle";
import LinkButton from "../../components/elements/LinkButton";
import ErrorAlert from "../../components/elements/error-alert/ErrorAlert";

const FilteredEventPage = (props) => {
  const router = useRouter();
  const [loadedEvents, setLoadedEvents] = useState();
  const filterData = router.query.slug;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    "https://events-project-b1ae2-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = parseInt(filterData[0]);
  const filteredMonth = parseInt(filterData[1]);
  // we can parse to number also by adding
  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredMonth < 1 ||
    filteredMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid Filters !</p>
        </ErrorAlert>
        <div className="center">
          <LinkButton link="/events">Show All Events</LinkButton>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  // const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <div className="center">
          <LinkButton link="/events">Show All Events</LinkButton>
        </div>
      </Fragment>
    );
  }

  const date = new Date(filteredYear, filteredMonth - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventsList items={filteredEvents} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = parseInt(filterData[0]);
//   const filteredMonth = parseInt(filterData[1]);

//   if (
//     isNaN(filteredYear) ||
//     isNaN(filteredMonth) ||
//     filteredMonth < 1 ||
//     filteredMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//       notFound: true,
//       redirect: {
//         destination: "/events",
//       },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: filteredYear,
//     month: filteredMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: filteredYear,
//         month: filteredMonth,
//       },
//     },
//   };
// }
export default FilteredEventPage;
