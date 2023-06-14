import { useRouter } from "next/router";
import useSWR from "swr";
import { AiFillEye, AiFillSchedule } from "react-icons/ai";
import { MdOutlineIncompleteCircle, MdCancel } from "react-icons/md";
import { IoPauseCircleSharp } from "react-icons/io5";
import { API_ENDPOINT } from "pages/api/anime";
import AnimeDetailsComponent from "components/AnimeDetailsComponent";
import Loader from "components/Loader";
import fetcher from "helper/fetcher";
import { Stats } from "interface";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

const Stats = () => {
  const router = useRouter();
  const { animeId } = router.query;
  // https://api.jikan.moe/v4/anime/{id} -->// {"data": [{...}]}
  const { data } = useSWR(`${API_ENDPOINT}anime/${animeId}`, fetcher);
  // https://api.jikan.moe/v4/anime/{id}/statistics -->// {"data": [{...}]}
  const { data: animeStats } = useSWR(
    `${API_ENDPOINT}anime/${animeId}/statistics`,
    fetcher
  );

  const { data: anime } = data || {};
  const { data: stats }: { data: Stats } = animeStats || {};

  return (
    <div>
      <AnimeDetailsComponent anime={anime} />
      {stats ? (
        <div className="space-y-4 px-4 pb-4">
          <div className="grid grid-cols-1 justify-center gap-2 xxs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            <div
              className="flex max-w-[200px] cursor-pointer flex-col items-center rounded-lg 
              border border-primary p-4 text-primary hover:animate-bounce xs:p-2"
            >
              <AiFillEye className={`text-5xl `} />
              <p className="text-center  text-sm font-semibold">
                {/* "watching": 0 */}
                Watching: {stats.watching.toLocaleString()}
              </p>
            </div>
            <div
              className="flex max-w-[200px] cursor-pointer flex-col items-center rounded-lg 
              border border-primary p-4 text-primary hover:animate-bounce"
            >
              <MdOutlineIncompleteCircle className="text-5xl " />
              <p className="text-center  text-sm font-semibold">
                {/* "completed": 0 */}
                Completed: {stats.completed.toLocaleString()}
              </p>
            </div>
            <div
              className="flex max-w-[200px] cursor-pointer flex-col items-center rounded-lg 
              border border-primary p-4 text-primary hover:animate-bounce"
            >
              <IoPauseCircleSharp className="text-5xl " />
              <p className="text-center  text-sm font-semibold">
                {/* "on_hold": 0 */}
                On hold: {stats.on_hold.toLocaleString()}
              </p>
            </div>
            <div
              className="flex max-w-[200px]  cursor-pointer flex-col  items-center rounded-lg 
              border border-primary p-4 text-primary hover:animate-bounce"
            >
              <MdCancel className="text-5xl" />
              <p className="text-center text-sm font-semibold">
                {/* "dropped": 0 */}
                Dropped: {stats.dropped.toLocaleString()}
              </p>
            </div>
            <div
              className="flex  max-w-[200px] cursor-pointer flex-col items-center rounded-lg 
              border border-primary p-4 text-center text-primary hover:animate-bounce"
            >
              <AiFillSchedule className="text-5xl" />
              <p className="text-center  text-sm font-semibold">
                {/* "plan_to_watch": 0 */}
                Plan to watch: {stats.plan_to_watch.toLocaleString()}
              </p>
            </div>
          </div>
          <Bar
            data={{
              labels: stats?.scores.map((score) => score.score),
              datasets: [
                {
                  label: "Number of user's voted rating",
                  // "votes": 0
                  data: stats?.scores.map((score) => score.votes),
                  backgroundColor: "#ff0077",
                },
              ],
            }}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Stats;
