export async function initDataApi() {
  return {
    status: 200,
    data: {
      buttons: [-25, -10, 10, 25],
      bars: [25, 50, 75],
      limit: 230
    },
    message: "Success"
  };
}
