import BackNavigation from "../../components/general/BackNavigation";
import TrendingCategory from "../../components/general/Category";
import Footer from "../../components/general/Footer";
import { useGetMovieNowPlayingPageQuery } from "../../redux/tmdbApi";
import { resetPage } from "../../redux/layoutSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import useUniqueData from "../../hooks/useUniqueData";
import ListingScreen from "../../loaders/screens/ListingScreen";

const NowPlayingMovies = () => {
  const page = useSelector((state) => state.layout.page);
  const { data, isFetching, isLoading } = useGetMovieNowPlayingPageQuery(page);
  const [final, setFinal] = useState([]);
  const dispatch = useDispatch();
  const { uniqueItems } = useUniqueData(final);

  useEffect(() => {
    if (data && !isFetching) {
      setFinal((final) => final.concat(...data.results));
    }
  }, [data, isFetching]);

  // Reset to page 1 when unmounts
  useEffect(() => {
    return () => {
      dispatch(resetPage());
      setFinal([]);
    };
  }, [dispatch]);

  return (
    <div className="w-full">
      {!isLoading && data ?
      <>
      <BackNavigation />
      <TrendingCategory
        data={uniqueItems}
        isFetching={isFetching}
        heading="Movies Now Playing"
        totalPages={data?.total_pages}
        mediaType="movie"
      />
      <Footer />
      </>
      :
      <ListingScreen />
      }
    </div>
  );
}
export default NowPlayingMovies