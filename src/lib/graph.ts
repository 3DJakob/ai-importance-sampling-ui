export const getOptions = (title: string): any => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: title
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy'
        },
        zoom: {
          wheel: {
            enabled: true,
            modifierKey: 'ctrl'
          },
          pinch: {
            enabled: true
          },
          mode: 'xy'
        }
      }
    },
    elements: {
      point: {
        // @ts-expect-error
        radius: (context) => context.dataIndex === context.dataset?.importanceSamplingToggleIndex ? 16 : 2,
        // @ts-expect-error
        pointStyle: (ctx) => ctx.dataIndex === ctx.chart.data.datasets[ctx.datasetIndex]?.importanceSamplingToggleIndex ? 'star' : 'circle'
      }
    }
  }
}
