import EventsList from "../components/events/EventsList";
import { getFeaturedEvents } from "../dummy-data";

const HopmePage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventsList items={featuredEvents} />
    </div>
  );
};

export default HopmePage;
