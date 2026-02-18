import { Bar } from "react-chartjs-2";
import { useEffect, useState, useRef } from "react";
import { Chart as ChartJS, ChartArea, ScriptableContext, ChartData } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ChartDataLabels);

interface OneMovieReviewProps {
  userReview: number;
  audienceReview: number;
}

const OneMovieReview: React.FC<OneMovieReviewProps> = ({
  userReview,
  audienceReview,
}) => {
  const chartRef = useRef(null);

  let width: number, height: number, gradient: CanvasGradient;

  const getGradient = (
    ctx: CanvasRenderingContext2D,
    chartArea: ChartArea
  ) => {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(0, 0, 0, 450);
      gradient.addColorStop(0, "rgba(191, 149, 63, 0.7)");
      gradient.addColorStop(0.5, "rgba(191, 149, 63, 0.35)");
      gradient.addColorStop(1, "rgba(191, 149, 63, 0)");
    }
    return gradient;
  };

  const [userData, setUserData] = useState<ChartData<"bar">>({
    labels: ["Me", "TMDB Audience", "Differential"],
    datasets: [
      {
        label: "Rating (out of 10)",
        backgroundColor: function (context: ScriptableContext<"bar">) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return;
          }
          return getGradient(ctx, chartArea);
        },
        data: [
          userReview || 0,
          audienceReview,
          Math.abs(userReview - audienceReview),
        ],
      },
    ],
  });

  useEffect(() => {
    setUserData({
      labels: ["Me", "TMDB Audience", "Differential"],
      datasets: [
        {
          label: "Rating (out of 10)",
          data: [
            userReview.toFixed(1),
            audienceReview.toFixed(1),
            Math.abs(userReview - audienceReview).toFixed(1),
          ] as unknown as number[],
          backgroundColor: function (context: ScriptableContext<"bar">) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) {
              return;
            }
            return getGradient(ctx, chartArea);
          },
          borderWidth: 0,
          borderColor: "#8A6E2F",
        },
      ],
    });
  }, [userReview, audienceReview]);

  return (
    <>
      <Bar
        ref={chartRef}
        id="chart"
        data={userData}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                font: { size: 16 },
                color: "white",
              },
            },
            y: {
              ticks: { display: false },
              grid: { display: false },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "#FFF",
              },
            },
            datalabels: {
              display: true,
              color: "white",
              align: "center",
              padding: 0,
              textStrokeWidth: 0.5,
            },
          },
        }}
      />
    </>
  );
};

export default OneMovieReview;
