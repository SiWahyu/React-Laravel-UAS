import { useEffect } from "react";
import AppLayouts from "../../components/layouts/AppLayouts";
import { SectionCards } from "../../components/section-card";
import useDashboardStore from "../../stores/useDashboardStore";

const DashboardPage = () => {
  const data = useDashboardStore((state) => state.data);
  const fetchData = useDashboardStore((state) => state.fetchData);
  const loading = useDashboardStore((state) => state.loading);

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppLayouts title={"Data"}>
      {loading ? (
        <div className="grid auto-rows-min gap-4 grid-col-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 mx-6">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <SectionCards data={data} />
        </div>
      )}
    </AppLayouts>
  );
};

export default DashboardPage;
