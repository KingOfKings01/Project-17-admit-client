import ShowtimeForm from "../Components/Showtime/ShowtimeForm";
import ShowtimeList from "../Components/Showtime/ShowtimeList";

export default function Showtime() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Showtime Management</h1>
      <ShowtimeForm />
      <ShowtimeList />
    </>
  );
}
