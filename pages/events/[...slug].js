import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventsList from "../../components/events/EventsList";
import { Fragment } from "react";
import ResultsTitle from "../../components/events/ResultsTitle";
import LinkButton from "../../components/elements/LinkButton";
import ErrorAlert from "../../components/elements/error-alert/ErrorAlert";

const FilteredEventPage = () => {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
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
    filteredMonth > 12
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

  const filteredEvents = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

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

export default FilteredEventPage;
